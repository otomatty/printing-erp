# データベース設計: 業務システム自動見積もりAIエージェント

**使用技術:** Supabase (PostgreSQL)

## 1. 概要

この文書は、業務システム自動見積もりAIエージェントのデータベース設計を定義します。Supabaseの機能を最大限に活用し、効率的かつセキュアなデータ構造を目指します。

## 2. テーブル構造

### 2.1. `users` (ユーザー情報)

Supabaseの認証機能で使用しているusersテーブルを使用する

### 2.2. `clients` (クライアント情報)

見積もり対象となるクライアント情報を管理するテーブル。

```sql
-- スキーマ作成
CREATE SCHEMA IF NOT EXISTS estimate_agent;

CREATE TABLE estimate_agent.clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT,
  phone TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- RLS
ALTER TABLE estimate_agent.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ユーザーは自分のクライアントのみ操作可能" ON estimate_agent.clients
  FOR ALL USING (auth.uid() = user_id);
```

### 2.3. `estimates` (見積もり)

見積もりの基本情報を管理するテーブル。ユーザー登録後の正式な見積もりデータを保持します。

```sql
CREATE TABLE estimate_agent.estimates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  client_id UUID REFERENCES estimate_agent.clients,
  title TEXT NOT NULL,
  description TEXT,
  
  -- ユーザーが入力した初期要件（テキストエリアの内容）
  initial_requirements TEXT NOT NULL,
  
  total_amount INTEGER,  -- 税抜き合計額（セント単位）
  status TEXT NOT NULL DEFAULT 'draft', -- draft, requirements, questions, features, review, completed
  expiry_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  -- システムが生成した最終PDF見積書のURLなど
  pdf_url TEXT,
  
  -- メタデータ（検索用など）
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- 匿名セッション用ID（セッションID）
  session_id TEXT
);

-- RLS
ALTER TABLE estimate_agent.estimates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ユーザーは自分の見積もりのみ操作可能" ON estimate_agent.estimates
  FOR ALL USING (
    (auth.uid() = user_id) OR 
    (user_id IS NULL AND session_id = current_setting('app.current_session_id', true)::text)
  );
```

### 2.4. `temporary_estimates` (一時見積もり)

匿名ユーザーの見積もりデータを一時的に保存するテーブル。メールアドレス提供やユーザー登録が完了した後に、正式な`estimates`テーブルに移行します。

```sql
CREATE TABLE estimate_agent.temporary_estimates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id TEXT NOT NULL,
  email TEXT, -- 見積もりプロセス終了時に収集したメールアドレス
  
  title TEXT NOT NULL DEFAULT '無題の見積もり',
  description TEXT,
  
  -- ユーザーが入力した初期要件（テキストエリアの内容）
  initial_requirements TEXT NOT NULL,
  
  total_amount INTEGER,  -- 税抜き合計額（セント単位）
  status TEXT NOT NULL DEFAULT 'draft', -- draft, requirements, questions, features, review, completed
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  -- 有効期限（一時データの自動削除用）
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '7 days') NOT NULL,
  
  -- システムが生成した最終PDF見積書のURLなど
  pdf_url TEXT,
  
  -- メタデータ（検索用など）
  metadata JSONB DEFAULT '{}'::jsonb
);

-- RLS
ALTER TABLE estimate_agent.temporary_estimates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "セッションIDで一時見積もりにアクセス" ON estimate_agent.temporary_estimates
  FOR ALL USING (session_id = current_setting('app.current_session_id', true)::text);

-- 期限切れデータの自動削除用インデックス
CREATE INDEX idx_temporary_estimates_expires_at ON estimate_agent.temporary_estimates(expires_at);
```

### 2.5. `questions` (質問管理)

一時見積もりと正式な見積もりの両方に対応する質問と回答を管理する統合テーブル。

```sql
CREATE TABLE estimate_agent.questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  -- 見積もりIDは temporary_estimate_id か estimate_id のどちらか一方だけセット
  estimate_id UUID REFERENCES estimate_agent.estimates ON DELETE CASCADE,
  temporary_estimate_id UUID REFERENCES estimate_agent.temporary_estimates ON DELETE CASCADE,
  
  -- 質問内容
  question TEXT NOT NULL,
  
  -- ユーザーの回答
  answer TEXT,
  
  -- 質問タイプ (text, textarea, select, radio, checkbox, number)
  type estimate_agent.question_type NOT NULL DEFAULT 'text'::estimate_agent.question_type,
  
  -- 選択肢リスト
  options JSONB,
  
  -- バリデーションルール
  validation_rules JSONB,
  
  -- 順序（表示順）
  position INTEGER NOT NULL DEFAULT 0,
  
  -- 回答済みフラグ
  is_answered BOOLEAN DEFAULT false,
  
  -- AI生成の元になった質問テンプレートID（該当する場合）
  template_id UUID REFERENCES estimate_agent.question_templates,
  
  -- 質問カテゴリ
  category TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  -- 制約：どちらかのIDが必須、かつ両方は設定できない
  CONSTRAINT one_estimate_reference CHECK (
    (estimate_id IS NULL AND temporary_estimate_id IS NOT NULL) OR
    (estimate_id IS NOT NULL AND temporary_estimate_id IS NULL)
  )
);

-- RLS
ALTER TABLE estimate_agent.questions ENABLE ROW LEVEL SECURITY;

-- 一時見積もりの質問へのアクセス
CREATE POLICY "セッションIDで一時見積もり質問にアクセス" ON estimate_agent.questions
  USING (
    temporary_estimate_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM estimate_agent.temporary_estimates 
      WHERE estimate_agent.temporary_estimates.id = temporary_estimate_id 
      AND estimate_agent.temporary_estimates.session_id = current_setting('app.current_session_id', true)::text
    )
  );

-- 正式な見積もりの質問へのアクセス
CREATE POLICY "ユーザーは自分の見積もり質問のみ操作可能" ON estimate_agent.questions
  USING (
    estimate_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM estimate_agent.estimates 
      WHERE estimate_agent.estimates.id = estimate_id 
      AND (
        estimate_agent.estimates.user_id = auth.uid() 
        OR (
          estimate_agent.estimates.user_id IS NULL 
          AND estimate_agent.estimates.session_id = current_setting('app.current_session_id', true)::text
        )
      )
    )
  );

-- インデックス
CREATE INDEX idx_questions_estimate_id ON estimate_agent.questions(estimate_id);
CREATE INDEX idx_questions_temporary_estimate_id ON estimate_agent.questions(temporary_estimate_id);
```

### 2.6. `estimate_items` (見積もり項目)

各見積もりに含まれる機能項目とそのコストを管理するテーブル。

```sql
CREATE TABLE estimate_agent.estimate_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  estimate_id UUID REFERENCES estimate_agent.estimates ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL, -- セント単位
  is_required BOOLEAN DEFAULT true, -- 必須機能かどうか
  complexity TEXT, -- low, medium, high などの難易度
  estimated_hours INTEGER, -- 概算工数（時間）
  
  -- ユーザーが選択したかどうか（機能選択ステップで使用）
  is_selected BOOLEAN DEFAULT true,
  
  -- 順序
  position INTEGER NOT NULL DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- RLS
ALTER TABLE estimate_agent.estimate_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ユーザーは自分の見積もり項目のみ操作可能" ON estimate_agent.estimate_items
  USING (EXISTS (
    SELECT 1 FROM estimate_agent.estimates 
    WHERE estimate_agent.estimates.id = estimate_id 
    AND (
      estimate_agent.estimates.user_id = auth.uid() 
      OR (
        estimate_agent.estimates.user_id IS NULL 
        AND estimate_agent.estimates.session_id = current_setting('app.current_session_id', true)::text
      )
    )
  ));
```

### 2.7. `project_templates` (プロジェクトテンプレート)

過去の実績や一般的な業務システムの機能テンプレートを管理するテーブル（RAG用）。

```sql
CREATE TABLE estimate_agent.project_templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES estimate_agent.project_categories(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  description TEXT,
  -- features JSONB NOT NULL, -- 正規化のため削除
  
  -- 実績データ
  actual_hours INTEGER, -- 実際にかかった工数
  actual_cost INTEGER, -- 実際のコスト
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  -- ベクトル検索用 (text-embedding-004 を想定)
  content_embedding vector(768)  -- 次元数を 768 に変更
);

-- ベクトル検索用インデックス
CREATE INDEX project_templates_embedding_idx ON estimate_agent.project_templates
  USING ivfflat (content_embedding vector_cosine_ops)
  WITH (lists = 100);

-- RLS
ALTER TABLE estimate_agent.project_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "共通テンプレートは閲覧可能" ON estimate_agent.project_templates
  FOR SELECT USING (user_id IS NULL);
CREATE POLICY "ユーザーは自分のテンプレートのみ操作可能" ON estimate_agent.project_templates
  FOR ALL USING (user_id IS NULL OR auth.uid() = user_id);
```

### 2.8. `template_features` (プロジェクトテンプレートの機能詳細)

`project_templates` に紐づく個別の機能詳細と、その機能説明のベクトル (Embedding) を管理するテーブル。

```sql
CREATE TABLE estimate_agent.template_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_template_id UUID NOT NULL REFERENCES estimate_agent.project_templates(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  estimated_hours INTEGER,
  unit_price INTEGER,
  complexity TEXT,
  description_embedding VECTOR(768), -- 次元数を 768 に変更
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- ベクトル検索用インデックス (機能説明)
CREATE INDEX template_features_embedding_idx ON estimate_agent.template_features
  USING ivfflat (description_embedding vector_cosine_ops)
  WITH (lists = 100);

-- 機能名での検索用にインデックス追加
CREATE INDEX idx_template_features_name ON estimate_agent.template_features (name);
-- 外部キーにもインデックス追加
CREATE INDEX idx_template_features_project_template_id ON estimate_agent.template_features (project_template_id);

-- RLS
ALTER TABLE estimate_agent.template_features ENABLE ROW LEVEL SECURITY;

-- 関連するプロジェクトテンプレートが参照可能であれば、その機能も参照可能にするポリシー
CREATE POLICY "関連プロジェクトの機能は参照可能" ON estimate_agent.template_features
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM estimate_agent.project_templates pt
      WHERE pt.id = template_features.project_template_id
    )
  );

-- 関連するプロジェクトテンプレートの所有者であれば、機能の操作も可能にするポリシー
CREATE POLICY "関連プロジェクト所有者は機能操作可能" ON estimate_agent.template_features
  FOR ALL USING (
    EXISTS (
      SELECT 1
      FROM estimate_agent.project_templates pt
      WHERE pt.id = template_features.project_template_id AND (pt.user_id IS NULL OR auth.uid() = pt.user_id)
    )
  );
```

### 2.9. `question_templates` (質問テンプレート)

システム種類ごとに適切な質問テンプレートを管理するテーブル。

```sql
CREATE TABLE estimate_agent.question_templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question TEXT NOT NULL,
  description TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  is_required BOOLEAN DEFAULT true,
  
  -- この質問が適用される条件（キーワードなど）
  conditions JSONB,
  
  -- 質問タイプ（text, single_choice, multiple_choice, number）
  type estimate_agent.question_type NOT NULL DEFAULT 'text'::estimate_agent.question_type,
  
  -- 選択肢リスト (select, radio, checkbox の場合)
  options JSONB,
  
  -- バリデーションルール
  validation_rules JSONB,
  
  -- カテゴリID
  category_id UUID REFERENCES estimate_agent.project_categories(id) ON UPDATE CASCADE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- question_type のENUM型定義
CREATE TYPE estimate_agent.question_type AS ENUM ('text', 'single_choice', 'multiple_choice', 'number');

-- RLS
ALTER TABLE estimate_agent.question_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "質問テンプレートは全ユーザーが参照可能" ON estimate_agent.question_templates
  FOR SELECT USING (true);
```

### 2.10. `project_categories` (システムカテゴリ)

業務システムのカテゴリ（CRM、在庫管理、予約システムなど）を管理するテーブル。

```sql
CREATE TABLE estimate_agent.project_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  
  -- カテゴリを識別するためのキーワード
  keywords JSONB,
  
  -- デフォルトの質問セット
  default_questions JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- RLS
ALTER TABLE estimate_agent.project_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "システムカテゴリは全ユーザーが参照可能" ON estimate_agent.project_categories
  FOR SELECT USING (true);
```

### 2.11. `email_notifications` (メール通知)

見積もり完了後に送信するメール通知の記録を管理するテーブル。

```sql
CREATE TABLE estimate_agent.email_notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL,
  temporary_estimate_id UUID REFERENCES estimate_agent.temporary_estimates,
  estimate_id UUID REFERENCES estimate_agent.estimates,
  sent_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, sent, failed
  content JSONB, -- 送信したメールの内容
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- RLS
ALTER TABLE estimate_agent.email_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "管理者のみ全メール通知を参照可能" ON estimate_agent.email_notifications
  FOR SELECT USING (auth.role() = 'admin');
CREATE POLICY "セッションIDに関連するメール通知を参照可能" ON estimate_agent.email_notifications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM estimate_agent.temporary_estimates 
      WHERE estimate_agent.temporary_estimates.id = temporary_estimate_id 
      AND estimate_agent.temporary_estimates.session_id = current_setting('app.current_session_id', true)::text
    )
    OR
    EXISTS (
      SELECT 1 FROM estimate_agent.estimates 
      WHERE estimate_agent.estimates.id = estimate_id AND estimate_agent.estimates.user_id = auth.uid()
    )
  );
```

## ビジネス分析テーブル

新たなビジネス価値評価機能をサポートするため、以下のテーブルを追加します。

### business_analyses テーブル

ビジネス分析結果を保存するテーブルです。

| カラム | 型 | 説明 |
| --- | --- | --- |
| id | uuid | プライマリキー |
| estimate_id | uuid | 対応する見積もりID (estimates.id への外部キー) |
| temporary_estimate_id | uuid | 対応する一時見積もりID (temporary_estimates.id への外部キー) |
| created_at | timestamptz | 作成日時 |
| updated_at | timestamptz | 更新日時 |
| cost_optimization | jsonb | コスト最適化分析結果 |
| roi_analysis | jsonb | ROI（投資対効果）分析結果 |
| efficiency_prediction | jsonb | 業務効率化予測結果 |
| scalability_analysis | jsonb | 拡張性分析結果 |
| industry | text | 分析に使用した業界情報 |
| company_size | integer | 分析に使用した企業規模（従業員数） |
| current_process_hours | integer | 現在の業務プロセスにかかる時間（年間） |
| session_id | text | 関連するセッションID（認証されていないユーザー用） |

**DDL:**

```sql
CREATE TABLE estimate_agent.business_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  estimate_id UUID REFERENCES estimate_agent.estimates(id) ON DELETE CASCADE,
  temporary_estimate_id UUID REFERENCES estimate_agent.temporary_estimates(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  cost_optimization JSONB,
  roi_analysis JSONB,
  efficiency_prediction JSONB,
  scalability_analysis JSONB,
  industry TEXT,
  company_size INTEGER,
  current_process_hours INTEGER,
  session_id TEXT
);

CREATE INDEX idx_business_analyses_estimate_id ON estimate_agent.business_analyses(estimate_id);
CREATE INDEX idx_business_analyses_temporary_estimate_id ON estimate_agent.business_analyses(temporary_estimate_id);

-- RLS
ALTER TABLE estimate_agent.business_analyses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ユーザーは自分の分析のみ参照可能" ON estimate_agent.business_analyses
  FOR ALL USING (
    (estimate_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM estimate_agent.estimates WHERE estimate_agent.estimates.id = estimate_id AND estimate_agent.estimates.user_id = auth.uid()
    ))
    OR
    (temporary_estimate_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM estimate_agent.temporary_estimates 
      WHERE estimate_agent.temporary_estimates.id = temporary_estimate_id 
      AND estimate_agent.temporary_estimates.session_id = current_setting('app.current_session_id', true)::text
    ))
    OR
    (session_id = current_setting('app.current_session_id', true)::text)
  );
```

### business_analysis_reports テーブル

ビジネス分析レポート（PDF形式など）を保存するテーブルです。

| カラム | 型 | 説明 |
| --- | --- | --- |
| id | uuid | プライマリキー |
| business_analysis_id | uuid | 対応するビジネス分析ID (business_analyses.id への外部キー) |
| created_at | timestamptz | 作成日時 |
| report_url | text | レポートURL |
| report_type | text | レポートタイプ（'pdf', 'xlsx'など） |
| session_id | text | 関連するセッションID（認証されていないユーザー用） |

**DDL:**

```sql
CREATE TABLE estimate_agent.business_analysis_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_analysis_id UUID NOT NULL REFERENCES estimate_agent.business_analyses(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  report_url TEXT NOT NULL,
  report_type TEXT NOT NULL,
  session_id TEXT
);

CREATE INDEX idx_business_analysis_reports_analysis_id ON estimate_agent.business_analysis_reports(business_analysis_id);

-- RLS
ALTER TABLE estimate_agent.business_analysis_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ユーザーは自分の分析レポートのみ参照可能" ON estimate_agent.business_analysis_reports
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM estimate_agent.business_analyses
      WHERE estimate_agent.business_analyses.id = business_analysis_id
      AND (
        (estimate_agent.business_analyses.estimate_id IS NOT NULL AND EXISTS (
          SELECT 1 FROM estimate_agent.estimates 
          WHERE estimate_agent.estimates.id = estimate_agent.business_analyses.estimate_id 
          AND estimate_agent.estimates.user_id = auth.uid()
        ))
        OR
        (estimate_agent.business_analyses.temporary_estimate_id IS NOT NULL AND EXISTS (
          SELECT 1 FROM estimate_agent.temporary_estimates 
          WHERE estimate_agent.temporary_estimates.id = estimate_agent.business_analyses.temporary_estimate_id 
          AND estimate_agent.temporary_estimates.session_id = current_setting('app.current_session_id', true)::text
        ))
        OR
        (estimate_agent.business_analyses.session_id = current_setting('app.current_session_id', true)::text)
      )
    )
    OR
    (session_id = current_setting('app.current_session_id', true)::text)
  );
```

### industry_benchmarks テーブル

業界ごとのベンチマークデータを保存するテーブルです。ROI計算などで使用します。

| カラム | 型 | 説明 |
| --- | --- | --- |
| id | uuid | プライマリキー |
| industry | text | 業界名 |
| created_at | timestamptz | 作成日時 |
| updated_at | timestamptz | 更新日時 |
| average_savings_rate | float | 平均コスト削減率 |
| average_roi | float | 平均ROI |
| efficiency_metrics | jsonb | 効率化指標 |
| data_source | text | データソース情報 |

**DDL:**

```sql
CREATE TABLE estimate_agent.industry_benchmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  industry TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  average_savings_rate FLOAT NOT NULL,
  average_roi FLOAT NOT NULL,
  efficiency_metrics JSONB,
  data_source TEXT
);

CREATE INDEX idx_industry_benchmarks_industry ON estimate_agent.industry_benchmarks(industry);
```

## 3. 匿名ユーザーのデータフロー

匿名ユーザーでも見積もりプロセスを開始できるように、以下のデータフローを実装します：

1. **セッション開始とIDの生成:**
   - 匿名ユーザーが見積もりページにアクセスした時点でセッションIDを生成
   - このIDをブラウザのローカルストレージやCookieに保存
   - Supabaseの`app.current_session_id`設定に保存（RLSで使用）

2. **初期要件入力:**
   - ユーザーがテキストエリアに要件概要を入力
   - `temporary_estimates.initial_requirements` に保存

3. **質問生成と回答:**
   - AIが初期要件を分析し、必要な質問リストを一括生成
   - 生成された質問は `temporary_estimate_questions` テーブルに保存
   - ユーザーは質問リストに対して回答を入力
   - 回答は `temporary_estimate_questions.answer` に保存

4. **機能洗い出し → コスト概算:**
   - 初期要件と質問への回答を元に、AIが必要機能リストを生成
   - `project_templates` から関連する過去データを RAG で検索
   - 抽出した機能を `temporary_estimate_items` として保存

5. **機能選択:**
   - ユーザーが `temporary_estimate_items` から必要な機能を選択

6. **見積もり結果表示:**
   - 選択された機能に基づき、最終見積もり金額を算出
   - ビジネス分析データを `business_analyses` テーブルに保存（`temporary_estimate_id` を設定）
   - 見積書PDFを生成し、URLを`temporary_estimates.pdf_url`に保存

7. **メールアドレス収集:**
   - 見積もり結果表示画面で「見積書と詳細な分析資料をメールで受け取る」オプションを提示
   - ユーザーが入力したメールアドレスを `temporary_estimates.email` に保存
   - メール送信情報を `email_notifications` テーブルに記録

8. **アカウント登録への誘導:**
   - メール内でアカウント登録リンクを提供
   - ユーザーがアカウント登録すると、一時データを正式なテーブルに移行

## 4. 一時データから正式データへの移行

ユーザーがアカウント登録した場合、一時データを正式なテーブルに移行する手順：

```sql
-- 関数定義例：一時見積もりデータを正式なテーブルに移行
CREATE OR REPLACE FUNCTION estimate_agent.migrate_temporary_estimate_to_permanent(
  p_temp_estimate_id UUID,
  p_user_id UUID
) RETURNS UUID AS $$
DECLARE
  v_estimate_id UUID;
  v_client_id UUID;
BEGIN
  -- クライアント情報の作成（あれば）
  IF EXISTS (SELECT 1 FROM estimate_agent.temporary_estimates WHERE id = p_temp_estimate_id AND email IS NOT NULL) THEN
    INSERT INTO estimate_agent.clients (user_id, name, email)
    SELECT 
      p_user_id,
      'Guest Client', -- デフォルト名、後で更新可能
      email
    FROM estimate_agent.temporary_estimates
    WHERE id = p_temp_estimate_id
    RETURNING id INTO v_client_id;
  END IF;

  -- 見積もりの移行
  INSERT INTO estimate_agent.estimates (
    user_id, client_id, title, description, initial_requirements,
    total_amount, status, pdf_url, metadata, session_id
  )
  SELECT 
    p_user_id, 
    v_client_id,
    title, 
    description, 
    initial_requirements,
    total_amount, 
    status, 
    pdf_url, 
    metadata, 
    session_id
  FROM estimate_agent.temporary_estimates
  WHERE id = p_temp_estimate_id
  RETURNING id INTO v_estimate_id;

  -- 見積もり項目の移行
  INSERT INTO estimate_agent.estimate_items (
    estimate_id, name, description, quantity, unit_price,
    is_required, complexity, estimated_hours, is_selected, position
  )
  SELECT 
    v_estimate_id,
    name, 
    description, 
    quantity, 
    unit_price,
    is_required, 
    complexity, 
    estimated_hours, 
    is_selected, 
    position
  FROM estimate_agent.temporary_estimate_items
  WHERE temporary_estimate_id = p_temp_estimate_id;

  -- 質問の移行
  INSERT INTO estimate_agent.estimate_questions (
    estimate_id, question, answer, position,
    is_answered, template_id, category
  )
  SELECT 
    v_estimate_id,
    question, 
    answer, 
    position,
    is_answered, 
    template_id, 
    category
  FROM estimate_agent.temporary_estimate_questions
  WHERE temporary_estimate_id = p_temp_estimate_id;

  -- ビジネス分析の移行
  UPDATE estimate_agent.business_analyses
  SET estimate_id = v_estimate_id
  WHERE temporary_estimate_id = p_temp_estimate_id;

  -- 一時データは自動削除されるため、明示的に削除する必要はない

  RETURN v_estimate_id;
END;
$$ LANGUAGE plpgsql;
```

## 5. バッチ処理

以下のバッチ処理を定期的に実行して、データの整合性を維持します：

### 5.1. 期限切れ一時データの削除

```sql
-- 期限切れの一時見積もりデータを削除するバッチ処理（毎日実行）
CREATE OR REPLACE FUNCTION estimate_agent.cleanup_expired_temporary_estimates() RETURNS integer AS $$
DECLARE
  v_count integer;
BEGIN
  WITH deleted AS (
    DELETE FROM estimate_agent.temporary_estimates
    WHERE expires_at < NOW()
    RETURNING id
  )
  SELECT COUNT(*) INTO v_count FROM deleted;
  
  RETURN v_count;
END;
$$ LANGUAGE plpgsql;
```

### 5.2. メール通知の送信

```sql
-- 保留中のメール通知を処理するバッチ関数（定期的に実行）
CREATE OR REPLACE FUNCTION estimate_agent.process_pending_email_notifications() RETURNS integer AS $$
DECLARE
  v_count integer := 0;
  v_record record;
BEGIN
  FOR v_record IN 
    SELECT id, email, temporary_estimate_id, estimate_id
    FROM estimate_agent.email_notifications
    WHERE status = 'pending'
    LIMIT 100
  LOOP
    -- ここでメール送信処理を実行（Edge Functionなどで実装）
    -- 実際のコードでは、メール送信APIの呼び出しが入る
    
    -- ステータス更新（サンプル）
    UPDATE estimate_agent.email_notifications
    SET status = 'sent', sent_at = NOW()
    WHERE id = v_record.id;
    
    v_count := v_count + 1;
  END LOOP;
  
  RETURN v_count;
END;
$$ LANGUAGE plpgsql;
```

## 6. Mastraワークフロー構成

匿名ユーザーに対応した見積もりワークフローのサンプル：

```typescript
// 匿名セッション情報をコンテキストに設定
const setupSessionContext = new Step({
  id: "setupSessionContext",
  execute: async ({ context, mastra }) => {
    // クライアントからセッションIDを取得（ないなら生成）
    const sessionId = context.get("sessionId") || generateUUID();
    
    // Supabaseの設定にセッションIDを保存
    supabase.rpc('set_app_setting', {
      name: 'current_session_id',
      value: sessionId
    });
    
    return {
      sessionId,
      isNewSession: !context.get("sessionId")
    };
  }
});

// 一時見積もりデータを作成
const createTemporaryEstimate = new Step({
  id: "createTemporaryEstimate",
  execute: async ({ context, mastra }) => {
    const initialRequirements = context.get("initialRequirements");
    const sessionId = context.getStepResult<{ sessionId: string }>("setupSessionContext").sessionId;
    
    // 一時見積もりを作成
    const { data: tempEstimate, error } = await supabase
      .from('temporary_estimates')
      .insert({
        session_id: sessionId,
        initial_requirements: initialRequirements,
        status: 'draft'
      })
      .select()
      .single();
      
    if (error) throw new Error(`見積もり作成エラー: ${error.message}`);
    
    return {
      temporaryEstimateId: tempEstimate.id
    };
  }
});

// メールアドレス保存ステップ
const saveEmailAddress = new Step({
  id: "saveEmailAddress",
  execute: async ({ context, mastra }) => {
    const email = context.get("email");
    const temporaryEstimateId = context.get("temporaryEstimateId");
    
    if (!email || !temporaryEstimateId) {
      return { success: false, error: "必要な情報が不足しています" };
    }
    
    // メールアドレスを一時見積もりに保存
    const { error: updateError } = await supabase
      .from('temporary_estimates')
      .update({ email })
      .eq('id', temporaryEstimateId);
      
    if (updateError) {
      return { success: false, error: updateError.message };
    }
    
    // メール通知エントリを作成
    const { error: notificationError } = await supabase
      .from('email_notifications')
      .insert({
        email,
        temporary_estimate_id: temporaryEstimateId,
        status: 'pending',
        content: { type: 'estimate_completed' }
      });
      
    return {
      success: !notificationError,
      error: notificationError?.message
    };
  }
});

// その他のステップは前述の実装と同様...
```

## 7. 注意点・課題

- **セッションの維持:** ブラウザを閉じたり、デバイスを変えたりした場合のセッション情報の維持方法（URLパラメータにIDを含めるなど）
- **一時データの有効期限:** 期限を適切に設定し、不要なデータの蓄積を防ぐ
- **アカウント登録への誘導:** メリットを明確に伝え、ユーザー登録率を高める工夫
- **メール配信の設定:** SPF/DKIM/DMARCなどを適切に設定し、スパム扱いを避ける
- **RLSポリシーのテスト:** 複雑なポリシーのため、十分なテストが必要
- **データ移行の整合性:** 一時データから正式データへの移行時にデータが欠損しないよう注意

---

**（補足: この修正版のデータベース設計は、認証なしでも見積もりプロセスを開始でき、プロセス完了後にメールアドレスを収集し、最終的にはユーザー登録への誘導ができる設計になっています。RLSポリシーも匿名セッション用に拡張されています。）** 