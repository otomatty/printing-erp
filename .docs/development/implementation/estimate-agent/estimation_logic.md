# 見積もりロジックとワークフロー設計

## 1. 概要

既存プロジェクトデータ (`project_templates`) を活用したRAGベースの見積もりシステム。
ユーザー入力と過去データに基づき、機能リスト、必要性判断、工数予測、コスト算出を行うMastra Workflowを構築する。
**単なるプロンプトベースの見積もりから、実績データ（現時点ではテンプレートの `estimated_hours`）に基づく精度の高い見積もりを目指す。**

## 2. データの準備と活用

### 2.1 活用するデータ
- **`project_templates` テーブル:**
  - `name`, `category`, `description`: プロジェクト概要の把握と類似検索に使用。
  - `features` (JSONB): 過去の機能詳細情報。**構造（`name`, `description`, `estimated_hours`, `complexity`）を最大限活用する。**
  - `actual_hours`, `actual_cost`: **将来的には**実績データとして活用。（現在は `features` 内の `estimated_hours` を参照）
  - `content_embedding`: プロジェクト全体の概要に基づくベクトル。類似プロジェクト検索に使用。
- **`project_categories` テーブル:** システムカテゴリごとの特性やキーワード情報。（将来的に活用）
- **`question_templates` テーブル:** システムカテゴリに応じた追加質問生成に使用。（フェーズ3以降）

### 2.2 データの前処理・考慮事項
- **`features` JSON の活用:** `features` 内の `description` を用いた **機能単位のベクトル検索 (RAG)** を実装し、精度を向上させる。（将来的な改善）
- **Embedding戦略:** 現在は `content_embedding` (プロジェクト概要) のみ。将来的には `features` 内の各機能 `description` の Embedding も生成・活用し、機能単位の類似度検索を可能にする。
- **実績工数データの不在:** 現状、真の実績工数 (`actual_hours`) がテンプレートに存在しない、または少ない。まずは `features` 内の `estimated_hours` を「過去の見積もり工数」として参照する。

## 3. 見積もりワークフロー (Mastra Workflow)

**現状の問題点:** 初期実装では機能リストが冗長になりがち。工数見積もりが単純な名前参照に留まる可能性がある。

**改善方針:** 各ステップの入出力を明確化し、特に機能生成と工数見積もりの精度向上を図る。`features` JSON 構造を積極的に活用する。

### Step 1: 要件分析 (`analyzeRequirements`)
1.  **入力:** `userInput` (ユーザーの初期要件文字列)。 **(`projectType` はこのステップでは直接使用しない)**
2.  **処理:**
    *   `userInput` の Embedding を生成 (Gemini)。
    *   `content_embedding` を使用して `project_templates` から類似プロジェクトをベクトル検索 (RAG)。
3.  **出力:** `similarProjects` (類似プロジェクトテンプレートのリスト `ProjectTemplateWithSimilarity[]`)。
4.  **改善点:** 検索結果が多すぎる場合は、類似度閾値や件数 (`matchThreshold`, `matchCount`) を調整する。

### Step 2: 機能リスト生成 (`generateFeatures`)
1.  **現状の問題点:** 単純なプロンプトでは関連機能が網羅的にリストアップされ、量が過剰になる。システムタイプによる考慮がない。
2.  **入力:** `userInput`, `projectType` (ワークフローのトリガーから渡される)、`similarProjects` (Step 1の結果)。
3.  **処理 (改善):**
    *   LLM (Gemini) へのプロンプトを `projectType` に基づいて動的に生成する。
        *   **ペルソナ設定:** `projectType` に応じて「Webサイト構築の専門家」「業務システム開発の専門家」などを設定。
        *   **指示の具体化:** 「主要な機能候補を **${projectType} に適したカテゴリ** ごとに 3〜5個程度提案してください」のように、量と質、**コンテキスト**を制御。
        *   **コンテキスト強化:** `userInput`, `projectType`, `similarProjects` の情報を含める。
        *   **構造化出力:** 機能名、簡単な機能概要、カテゴリをセットで JSON 形式 (`{ category: string, feature: string, description: string }[]`) で出力させる。**(Gemini は JSON モードを直接サポートしないため、プロンプトでの指示と出力のパース処理で対応)**
4.  **出力:** `generatedFeatures` (カテゴリ、機能名、概要を含むオブジェクトの配列)。

### Step 2.5: 機能必要性判断 (`assessFeatureNecessity`)
1.  **入力:** `userInput`, `projectType` (ワークフローのトリガーから)、`generatedFeatures` (Step 2の結果)。 **(projectType も考慮に入れる)**
2.  **処理:**
    *   LLM (Gemini) へのプロンプトを作成。
        *   **コンテキスト:** `userInput`, `projectType`, `generatedFeatures` の各機能（名前と概要）を提示。
        *   **指示:** 「このユーザー要件 (**${projectType}** 向け) に対し、この機能は**本当に必要不可欠 (Must Have) か**どうかを理由と共に判断してください。必要不可欠でない場合は `false` としてください。」
        *   **構造化出力:** JSON 形式 (`{ feature: string, isNecessary: boolean, reason: string }[]`) で出力させる。
3.  **出力:** `assessedFeatures` (必要性判断結果付きの機能リスト)。

### Step 3: 工数見積もり (`estimateEffort`)
1.  **課題:** 過去の**実績工数**データが不足している。類似機能の特定精度が重要。
2.  **入力:** `assessedFeatures` (**Step 2.5 の全結果** `{ feature: string, description: string, isNecessary: boolean, ... }[]`)、`similarProjects` (Step 1の結果)。 **(機能の必要性(`isNecessary`)フラグも入力に含まれる)**
3.  **処理 (改善 - 正規化DB + ベクトル検索):**
    *   `assessedFeatures` の**各機能** (**必要性に関わらず全て**) についてループ処理:
        *   機能概要 (`description`) から Embedding を生成 (Gemini)。
        *   生成した Embedding を使用し、**`estimate_agent.template_features` テーブル**の `description_embedding` カラムに対してベクトル検索を実行。意味的に類似する過去の機能テンプレート (`template_features` レコード) を検索する。
            *   **検索対象:** 現状は**全ての `template_features`** を対象とする。
            *   **類似度閾値:** 一定の類似度以下のものは除外する (例: `cosine_distance` が 0.7 未満など)。
            *   **取得件数:** 類似度上位 N 件 (例: 3件) を取得する。
    *   **工数参照と計算:**
        *   取得した類似機能テンプレート (`template_features` レコード群) の `estimated_hours` を参照する。
        *   **複数候補が見つかった場合:** 取得した類似機能の `estimated_hours` の**平均値**を当該機能の予測工数とする。
        *   **類似機能が見つからなかった場合 (フォールバック):** 予め定義した**デフォルト工数** (例: 8時間) を予測工数とする。
    *   **(追加) LLMによる直接推論:** RAGでの類似機能検索が不安定、または類似機能が見つからなかった場合の代替・フォールバックとして、LLMに直接工数を推論させる。
        *   **入力:** 機能名、機能説明、プロジェクトカテゴリ、プロジェクト名、（あれば）複雑度など。
        *   **処理:** LLM (例: Gemini)に対し、「この機能（{機能名}、説明: {機能説明}）は、{カテゴリ}カテゴリの{プロジェクト名}プロジェクトにおいて、開発に**何時間**かかりそうか、理由と共に推論してください。単純な作業なら4時間、標準的なら8時間、複雑なら16時間を目安としてください。」のようなプロンプトで指示を出す。
        *   **出力:** 推論された工数（時間）と、その根拠。
        *   **課題:** プロンプトエンジニアリングによる精度・安定性の確保、推論コスト。
    *   **(将来的な改善):**
        *   ベクトル検索の対象を `similarProjects` に関連する `template_features` に絞り込む。
        *   類似機能が見つからない場合に LLM に工数推論を依頼する。
        *   機能の `complexity` など他の要素も工数計算に加味する。
4.  **出力:** `estimatedFeatures` (**全ての機能**に対する機能名、**必要性フラグ(`isNecessary`)**、参照した過去機能名(見つからない場合はnull)、予測工数、見積もり根拠(`estimationBasis`)、LLM理由(`reason`) を含むオブジェクトの配列 `{ feature: string, isNecessary: boolean, referenceFeatureName: string | null, estimatedHours: number | null, estimationBasis: 'rag' | 'llm' | 'default', reason: string | null }[]`)。

### Step 4: コスト算出 (`calculateCost`)
1.  **入力:** `estimatedFeatures` (Step 3の**全機能**の結果)、`hourlyRate` (時間単価 - **トリガーデータから取得**)。
2.  **処理:**
    *   `estimatedFeatures` をループ処理。
    *   各機能の `isNecessary` フラグに基づいて、**必要工数 (`requiredHours`)** と **任意工数 (`optionalHours`)** をそれぞれ集計する。
    *   `hourlyRate` を用いて、**必要コスト (`requiredCost`)** と **任意コスト (`optionalCost`)** を算出する。
    *   必要合計と任意合計から、**全体合計 (`grandTotalHours`, `grandTotalCost`)** を算出する。
3.  **出力:** `finalEstimate` (必要/任意/全体の合計工数とコスト、および機能ごとの必要性フラグ、工数、コスト内訳を含むオブジェクト `{ requiredHours: number, requiredCost: number, optionalHours: number, optionalCost: number, grandTotalHours: number, grandTotalCost: number, usedHourlyRate: number, breakdown: { feature: string, isNecessary: boolean, hours: number | null, cost: number | null, ... }[] }`)。

### Step 5: 見積もり結果の提示 (`presentEstimate` - Workflow外 or Agent責務)
1.  ワークフローの最終結果 (`finalEstimate`) をユーザーに分かりやすく提示する。(Agentの応答生成などで対応)

## 4. 精度向上のための施策 (将来)

### 4.1 フィードバックループ
- 実際のプロジェクト完了後の**実績工数・コスト**データを `project_templates` の `actual_hours`, `actual_cost` に反映する仕組み。
- 見積もり精度（予測工数 vs 実績工数）を定期的に評価し、モデルやロジックを改善。

### 4.2 RAG の高度化
- **機能単位の Embedding:** `project_templates.features` 内の各機能 `description` から Embedding を生成し、専用のベクトルインデックスを構築する。
- **高度な工数推論:** Step 3 で、LLM に類似機能データと機能要件を提示し、「この機能の工数は何時間になりそうか、その理由は？」と直接推論させる。

## 5. 技術的な考慮事項

### 5.1 RAG実装のポイント
- **Embedding モデル選定:** Gemini Embedding (`gemini-embedding-exp-03-07`) の特性を理解し、適切な `taskType` を指定する。
- **検索戦略:** プロジェクト全体 (概要) と機能単位での検索を使い分ける。
- **コンテキスト管理:** LLM への入力（プロンプト）が長くなりすぎないように、RAG で取得する情報量を適切に制御する。

### 5.2 プロンプトエンジニアリング
- **構造化出力:** JSON モードを積極的に活用し、LLM の出力を安定させる。
- **Few-shot プロンプティング:** 期待する出力形式の例をプロンプトに含める。
- **段階的指示 (Chain of Thought):** 複雑な推論（特に工数見積もり）では、思考プロセスを段階的に指示する。
- **役割設定:** LLM に適切な役割（例: システムアナリスト、プロジェクトマネージャー）を与える。 