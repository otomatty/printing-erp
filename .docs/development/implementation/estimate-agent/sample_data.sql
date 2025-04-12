-- サンプルデータ: 業務システム自動見積もりAIエージェント
-- 作成日: YYYY-MM-DD

-- 注意: このファイルはSupabaseのSQLエディタでそのまま実行できます。
-- 順序に注意して実行してください（project_categories → question_templates → project_templates）

-- =====================
-- スキーマの作成
-- =====================
CREATE SCHEMA IF NOT EXISTS estimate_agent;

-- =====================
-- ロールの設定
-- =====================

-- postgres ロールに estimate_agent スキーマの使用権限を付与
GRANT USAGE ON SCHEMA estimate_agent TO postgres;

-- スキーマ内の全てのテーブルに対する全権限を付与
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA estimate_agent TO postgres;

-- （念のため）スキーマ内の全てのシーケンスに対する全権限を付与
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA estimate_agent TO postgres;

-- （念のため）スキーマ内の全ての関数に対する全権限を付与
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA estimate_agent TO postgres;

-- これでサービスロール（postgres）が estimate_agent スキーマにフルアクセスできるはずよ

-- =====================
-- テーブル定義
-- =====================

-- project_categories: システムカテゴリ
CREATE TABLE estimate_agent.project_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  keywords JSONB,
  default_questions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- question_templates: 質問テンプレート
CREATE TABLE estimate_agent.question_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  description TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  is_required BOOLEAN DEFAULT true,
  conditions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- project_templates: プロジェクトテンプレート
CREATE TABLE estimate_agent.project_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  actual_hours INTEGER,
  actual_cost INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  content_embedding VECTOR(768)
);

-- ベクトル検索用インデックス
CREATE INDEX project_templates_embedding_idx ON estimate_agent.project_templates
  USING ivfflat (content_embedding vector_cosine_ops)
  WITH (lists = 100);

-- template_features: プロジェクトテンプレートの機能詳細
CREATE TABLE estimate_agent.template_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_template_id UUID NOT NULL REFERENCES estimate_agent.project_templates(id) ON DELETE CASCADE, -- 親テンプレートが消えたら子機能も消す
  name TEXT NOT NULL,
  description TEXT,
  estimated_hours INTEGER,
  unit_price INTEGER,
  complexity TEXT,
  description_embedding VECTOR(768), -- 次元数を 768 に変更
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 機能名での検索用にインデックス追加（いるかもしれないから一応）
CREATE INDEX idx_template_features_name ON estimate_agent.template_features (name);
-- 外部キーにもインデックス追加
CREATE INDEX idx_template_features_project_template_id ON estimate_agent.template_features (project_template_id);

-- description_embedding カラムにベクトル検索用のインデックスを作成
CREATE INDEX template_features_embedding_idx ON estimate_agent.template_features
  USING ivfflat (description_embedding vector_cosine_ops)
  WITH (lists = 100); -- lists の数はデータ量に応じて調整するのよ？

-- =====================
-- RLSポリシー
-- =====================

-- project_categories
ALTER TABLE estimate_agent.project_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "システムカテゴリは全ユーザーが参照可能" ON estimate_agent.project_categories
  FOR SELECT USING (true);

-- question_templates
ALTER TABLE estimate_agent.question_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "質問テンプレートは全ユーザーが参照可能" ON estimate_agent.question_templates
  FOR SELECT USING (true);

-- project_templates
ALTER TABLE estimate_agent.project_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "共通テンプレートは閲覧可能" ON estimate_agent.project_templates
  FOR SELECT USING (user_id IS NULL);
CREATE POLICY "ユーザーは自分のテンプレートのみ操作可能" ON estimate_agent.project_templates
  FOR ALL USING (user_id IS NULL OR auth.uid() = user_id);

-- template_features (追加分)
ALTER TABLE estimate_agent.template_features ENABLE ROW LEVEL SECURITY;

-- 関連するプロジェクトテンプレートが参照可能であれば、その機能も参照可能にするポリシー
CREATE POLICY "関連プロジェクトの機能は参照可能" ON estimate_agent.template_features
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM estimate_agent.project_templates pt
      WHERE pt.id = template_features.project_template_id
      -- project_templates の SELECT ポリシーに合わせて user_id IS NULL or auth.uid() = user_id でも良いけど、
      -- とりあえず SELECT 可能かどうかで判断しておくわ。
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

-- =====================
-- データ移行 (既存の features JSONB から template_features へ)
-- ※ このセクションは、既存の project_templates.features データがある場合にのみ実行すること。
-- =====================

-- 注意: このクエリを実行する前に、必ずバックアップを取ること！ アンタならやりかねないから念を押しておくわよ！

-- まず、一時的に project_templates テーブルから features カラムを読み取るための準備
-- （もし ALTER TABLE で features カラムを削除済みなら、このINSERTはエラーになるか、
--   バックアップから features カラムを復元する必要があるわよ）

-- この INSERT 文は、`project_templates` テーブルに `features` カラムが存在する前提で書かれているわ。
-- もし `ALTER TABLE ... DROP COLUMN features;` を先に実行してしまったら、
-- この INSERT 文を実行する前に `features` カラムを（一時的にでも）戻さないとダメよ。
INSERT INTO estimate_agent.template_features (
  project_template_id,
  name,
  description,
  estimated_hours,
  unit_price,
  complexity,
  description_embedding, -- ここは NULL で挿入されるわ。後で別途生成・更新が必要よ！
  created_at,
  updated_at
)
SELECT
  pt.id AS project_template_id,
  (feat->>'name')::TEXT,
  (feat->>'description')::TEXT,
  (feat->>'estimated_hours')::INTEGER,
  (feat->>'unit_price')::INTEGER,
  (feat->>'complexity')::TEXT,
  NULL, -- Embedding は後で生成
  pt.created_at, -- 親テンプレートの作成日時を引き継ぐ (まあ、適当だけど)
  pt.updated_at -- 親テンプレートの更新日時を引き継ぐ
FROM
  estimate_agent.project_templates pt,
  -- features カラムの JSON 配列を個別の行に展開する
  jsonb_array_elements(pt.features) AS feat -- ここでエラーが出るなら features カラムがないってことよ
WHERE
  -- features カラムが NULL でなく、かつ JSON 配列であることを確認
  pt.features IS NOT NULL AND jsonb_typeof(pt.features) = 'array';


-- データ移行が終わったら、project_templates テーブルの features カラムは不要になる
-- 必要ならコメントアウトを外して実行しなさい。でも、ちゃんと移行できたか確認してからよ！
-- ALTER TABLE estimate_agent.project_templates DROP COLUMN features;

-- =====================
-- サンプルデータ (初期データ投入用 - features カラム削除後の形式)
-- =====================

-- project_categories (変更なし)
INSERT INTO estimate_agent.project_categories (id, name, description, keywords, default_questions)
VALUES
    (
        gen_random_uuid(), 
        '顧客管理システム (CRM)', 
        '顧客情報、商談、問い合わせなどを管理するシステム',
        '["顧客", "CRM", "顧客管理", "商談", "問い合わせ", "売上管理", "商談管理", "コンタクト", "連絡先"]',
        '[
            "既存システムの有無と移行データの規模",
            "管理する顧客数の規模（概算）",
            "必要なユーザー権限レベル数",
            "顧客データの項目数と複雑さ",
            "商談/案件管理の有無",
            "売上情報連携の有無",
            "外部システム連携の有無",
            "モバイル対応の必要性",
            "レポート・分析機能の要件"
        ]'::jsonb
    ),
    (
        gen_random_uuid(), 
        '在庫管理システム', 
        '商品、在庫、発注、入出庫を管理するシステム',
        '["在庫", "倉庫", "SKU", "バーコード", "入出庫", "棚卸", "発注", "仕入れ", "商品管理"]',
        '[
            "管理する商品数（SKU数）",
            "倉庫・保管場所の数",
            "バーコード管理の必要性",
            "発注管理機能の有無",
            "仕入先管理の有無",
            "複数倉庫対応の必要性",
            "在庫アラート機能の要件",
            "棚卸機能の必要性",
            "モバイル/ハンディ端末対応の有無"
        ]'::jsonb
    ),
    (
        gen_random_uuid(), 
        '予約・スケジュール管理システム', 
        '予約、スケジュール、リソース管理を行うシステム',
        '["予約", "スケジュール", "カレンダー", "空き状況", "リソース", "アポイント", "イベント", "シフト"]',
        '[
            "予約対象（人・設備・部屋など）の数と種類",
            "同時管理するカレンダー数",
            "予約の単位時間（15分刻み、1時間刻みなど）",
            "予約確認フローの有無",
            "顧客による自己予約機能の必要性",
            "定期予約機能の必要性",
            "通知機能の要件",
            "決済連携の有無",
            "モバイル対応の必要性"
        ]'::jsonb
    ),
    (
        gen_random_uuid(), 
        '業務ワークフローシステム', 
        '申請、承認、タスク管理などの業務フローを管理するシステム',
        '["ワークフロー", "承認", "申請", "決裁", "稟議", "タスク管理", "業務フロー", "BPM"]',
        '[
            "管理するワークフロー種類の数",
            "承認階層の最大数",
            "ユーザー権限レベルの数",
            "承認条件の複雑さ",
            "申請フォームのカスタマイズ要件",
            "通知機能の要件",
            "期限管理機能の必要性",
            "履歴管理の要件",
            "分析・レポート機能の要件"
        ]'::jsonb
    ),
    (
        gen_random_uuid(), 
        'プロジェクト管理システム', 
        'プロジェクト、タスク、リソースなどを管理するシステム',
        '["プロジェクト", "タスク", "ガントチャート", "進捗", "WBS", "マイルストーン", "プロマネ", "PM"]',
        '[
            "同時管理するプロジェクト数",
            "平均的なタスク数/プロジェクト",
            "ガントチャート機能の必要性",
            "リソース管理の要件",
            "コスト管理機能の必要性",
            "マイルストーン管理の要件",
            "ファイル共有機能の必要性",
            "外部システム連携の有無",
            "モバイル対応の必要性"
        ]'::jsonb
    );


-- question_templates (変更なし)
INSERT INTO estimate_agent.question_templates (id, category, question, description, position, is_required, conditions)
VALUES
    -- ... (既存の INSERT 文をそのままここに持ってくる) ...
    -- 共通質問 (カテゴリ: 'common')
    (
        gen_random_uuid(),
        'common',
        'このシステムを利用するユーザー数はどのくらいを想定していますか？',
        'システム規模とライセンス数の算出に必要です',
        10,
        true,
        NULL
    ),
    (
        gen_random_uuid(),
        'common',
        'システムへのアクセス方法について、どのような要件がありますか？（ブラウザ、専用アプリ、スマートフォン対応など）',
        '開発プラットフォームと対応範囲を決定するための質問です',
        20,
        true,
        NULL
    ),
    (
        gen_random_uuid(),
        'common',
        '既存システムからのデータ移行は必要ですか？必要な場合、どのようなデータをどの程度の量、移行する予定ですか？',
        'データ移行の複雑さと工数を見積もるための質問です',
        30,
        true,
        NULL
    ),
    (
        gen_random_uuid(),
        'common',
        '導入予定時期はいつ頃を想定していますか？',
        '開発スケジュールの制約条件を確認するための質問です',
        40,
        true,
        NULL
    ),
    (
        gen_random_uuid(),
        'common',
        '他システムとの連携は必要ですか？必要な場合、どのようなシステムとどのようなデータを連携する予定ですか？',
        'API開発や連携機能の工数を見積もるための質問です',
        50,
        true,
        NULL
    ),
    
    -- 顧客管理システム (CRM) 向け質問
    (
        gen_random_uuid(),
        'crm',
        '顧客データとして管理したい項目は何ですか？（例：基本情報、取引履歴、対応履歴、ファイル添付など）',
        'データモデルの複雑さと規模を把握するための質問です',
        60,
        true,
        '{"categoryMatches": ["顧客管理", "CRM"]}'::jsonb
    ),
    (
        gen_random_uuid(),
        'crm',
        '商談/案件管理機能は必要ですか？必要な場合、どのような情報を管理したいですか？',
        '商談管理機能の要件を確認する質問です',
        70,
        true,
        '{"categoryMatches": ["顧客管理", "CRM"]}'::jsonb
    ),
    (
        gen_random_uuid(),
        'crm',
        '顧客とのコミュニケーション履歴（メール、電話など）の管理は必要ですか？',
        'コミュニケーション履歴管理機能の要件を確認する質問です',
        80,
        false,
        '{"categoryMatches": ["顧客管理", "CRM"]}'::jsonb
    ),
    (
        gen_random_uuid(),
        'crm',
        '売上情報や請求書情報の管理は必要ですか？',
        '財務関連機能の要件を確認する質問です',
        90,
        false,
        '{"categoryMatches": ["顧客管理", "CRM"]}'::jsonb
    ),
    (
        gen_random_uuid(),
        'crm',
        'マーケティングキャンペーン管理機能は必要ですか？',
        'マーケティング機能の要件を確認する質問です',
        100,
        false,
        '{"categoryMatches": ["顧客管理", "CRM"]}'::jsonb
    ),
    
    -- 在庫管理システム向け質問
    (
        gen_random_uuid(),
        'inventory',
        '何種類の商品（SKU）を管理する予定ですか？',
        'データボリュームとパフォーマンス要件を確認する質問です',
        60,
        true,
        '{"categoryMatches": ["在庫", "倉庫", "商品管理"]}'::jsonb
    ),
    (
        gen_random_uuid(),
        'inventory',
        '複数の倉庫や保管場所の管理は必要ですか？必要な場合、何ヶ所程度を想定していますか？',
        'ロケーション管理機能の要件を確認する質問です',
        70,
        true,
        '{"categoryMatches": ["在庫", "倉庫", "商品管理"]}'::jsonb
    ),
    (
        gen_random_uuid(),
        'inventory',
        'バーコードやQRコードを使用した在庫管理は必要ですか？',
        'スキャンおよびコード管理機能の要件を確認する質問です',
        80,
        false,
        '{"categoryMatches": ["在庫", "倉庫", "商品管理"]}'::jsonb
    ),
    (
        gen_random_uuid(),
        'inventory',
        '発注管理機能は必要ですか？必要な場合、発注ワークフローについても説明してください。',
        '発注管理機能の要件を確認する質問です',
        90,
        false,
        '{"categoryMatches": ["在庫", "倉庫", "商品管理"]}'::jsonb
    ),
    (
        gen_random_uuid(),
        'inventory',
        '在庫アラート機能（在庫が少なくなった際の通知など）は必要ですか？',
        'アラート機能の要件を確認する質問です',
        100,
        false,
        '{"categoryMatches": ["在庫", "倉庫", "商品管理"]}'::jsonb
    ),
    
    -- 予約システム向け質問
    (
        gen_random_uuid(),
        'booking',
        '何を予約対象としますか？（例：部屋、設備、人員、サービスなど）',
        '予約対象の種類と特性を把握するための質問です',
        60,
        true,
        '{"categoryMatches": ["予約", "スケジュール", "カレンダー"]}'::jsonb
    ),
    (
        gen_random_uuid(),
        'booking',
        '予約の最小単位時間はいくらですか？（例：15分刻み、30分刻み、1時間刻みなど）',
        '予約スケジューリングの粒度を確認する質問です',
        70,
        true,
        '{"categoryMatches": ["予約", "スケジュール", "カレンダー"]}'::jsonb
    ),
    (
        gen_random_uuid(),
        'booking',
        'お客様自身が予約できるセルフサービス機能は必要ですか？',
        'セルフサービス予約機能の要件を確認する質問です',
        80,
        false,
        '{"categoryMatches": ["予約", "スケジュール", "カレンダー"]}'::jsonb
    ),
    (
        gen_random_uuid(),
        'booking',
        '予約確認や通知機能は必要ですか？（例：メール通知、SMS通知など）',
        '通知機能の要件を確認する質問です',
        90,
        false,
        '{"categoryMatches": ["予約", "スケジュール", "カレンダー"]}'::jsonb
    ),
    (
        gen_random_uuid(),
        'booking',
        'オンライン決済機能は必要ですか？',
        '決済機能の要件を確認する質問です',
        100,
        false,
        '{"categoryMatches": ["予約", "スケジュール", "カレンダー"]}'::jsonb
    );

-- project_templates (features カラムなしの形式)
-- 注意: ここでは project_templates の INSERT 文だけ記述し、
--       対応する template_features の INSERT 文は別途記述するわよ。
INSERT INTO estimate_agent.project_templates (id, user_id, name, category, description, actual_hours, actual_cost, content_embedding)
VALUES
    (
        '00000000-0000-0000-0000-000000000001', -- 固定UUID (サンプル用)
        NULL, -- NULLは共通テンプレート
        '小規模CRMシステム（顧客50社以下）',
        'crm',
        '小規模企業向けの基本的な顧客管理システム。顧客情報、対応履歴の管理が中心。',
        130, -- 実際工数（時間）
        1300000, -- 実際コスト（円）
        NULL -- エンベディングは後で生成
    ),
    (
        '00000000-0000-0000-0000-000000000002', -- 固定UUID (サンプル用)
        NULL,
        '中規模CRMシステム（顧客500社程度）',
        'crm',
        '中規模企業向けの顧客管理システム。顧客情報、商談管理、活動管理、レポート機能を含む。',
        430, -- 実際工数（時間）
        4150000, -- 実際コスト（円）
        NULL
    ),
    (
        '00000000-0000-0000-0000-000000000003', -- 固定UUID (サンプル用)
        NULL,
        '基本的な在庫管理システム',
        'inventory',
        '小規模事業者向けの基本的な在庫管理システム。商品、在庫数、入出庫管理の基本機能を含む。',
        170, -- 実際工数（時間）
        1650000, -- 実際コスト（円）
        NULL
    ),
    (
        '00000000-0000-0000-0000-000000000004', -- 固定UUID (サンプル用)
        NULL,
        '高度な在庫管理システム（バーコード対応）',
        'inventory',
        '中規模事業者向けの高度な在庫管理システム。バーコード対応、複数倉庫管理、発注管理などを含む。',
        620, -- 実際工数（時間）
        6100000, -- 実際コスト（円）
        NULL
    ),
    (
        '00000000-0000-0000-0000-000000000005', -- 固定UUID (サンプル用)
        NULL,
        '基本的な予約システム',
        'booking',
        '小規模サービス事業者向けの基本的な予約管理システム。リソース予約、カレンダー表示の基本機能を含む。',
        180, -- 実際工数（時間）
        1700000, -- 実際コスト（円）
        NULL
    );

-- template_features (各プロジェクトテンプレートに対応する機能データ)
-- 注意: description_embedding は NULL で挿入されるわ。別途生成が必要よ！
INSERT INTO estimate_agent.template_features (project_template_id, name, description, estimated_hours, unit_price, complexity, description_embedding)
VALUES
    -- 小規模CRMシステム (ID: ...0001)
    ('00000000-0000-0000-0000-000000000001', 'ユーザー認証・権限管理', 'ログイン機能とユーザー権限の管理', 20, 200000, 'low', NULL),
    ('00000000-0000-0000-0000-000000000001', '顧客基本情報管理', '顧客の基本情報（会社名、担当者、連絡先など）の登録・編集・検索', 40, 400000, 'medium', NULL),
    ('00000000-0000-0000-0000-000000000001', '対応履歴管理', '顧客とのやり取りの履歴を記録・管理する機能', 30, 300000, 'medium', NULL),
    ('00000000-0000-0000-0000-000000000001', 'レポート・検索機能', '顧客データの検索、基本的なレポート出力機能', 25, 250000, 'medium', NULL),
    ('00000000-0000-0000-0000-000000000001', 'データインポート', 'CSVからの顧客データインポート機能', 15, 150000, 'low', NULL),

    -- 中規模CRMシステム (ID: ...0002)
    ('00000000-0000-0000-0000-000000000002', 'ユーザー認証・権限管理', '複数権限レベルを持つユーザー管理システム', 30, 300000, 'medium', NULL),
    ('00000000-0000-0000-0000-000000000002', '顧客情報管理（高度）', '顧客情報の詳細管理、履歴管理、添付ファイル管理', 60, 600000, 'high', NULL),
    ('00000000-0000-0000-0000-000000000002', '商談・案件管理', '商談の進捗管理、確度管理、予算管理などの機能', 70, 700000, 'high', NULL),
    ('00000000-0000-0000-0000-000000000002', '活動管理・カレンダー連携', '営業活動の記録、スケジュール管理、カレンダー連携', 50, 500000, 'medium', NULL),
    ('00000000-0000-0000-0000-000000000002', '高度なレポート・分析機能', 'カスタマイズ可能なレポート、ダッシュボード、分析機能', 80, 800000, 'high', NULL),
    ('00000000-0000-0000-0000-000000000002', 'メール連携', 'メールの送受信履歴の管理、テンプレート機能', 40, 400000, 'medium', NULL),
    ('00000000-0000-0000-0000-000000000002', 'データインポート・エクスポート', '様々な形式でのデータ入出力機能', 25, 250000, 'medium', NULL),
    ('00000000-0000-0000-0000-000000000002', 'モバイル対応', 'スマートフォン・タブレット向けレスポンシブ対応', 60, 600000, 'high', NULL),

    -- 基本的な在庫管理システム (ID: ...0003)
    ('00000000-0000-0000-0000-000000000003', 'ユーザー認証・権限管理', 'ログイン機能とユーザー権限の管理', 20, 200000, 'low', NULL),
    ('00000000-0000-0000-0000-000000000003', '商品マスタ管理', '商品情報の登録・編集・検索機能', 35, 350000, 'medium', NULL),
    ('00000000-0000-0000-0000-000000000003', '在庫数管理', '現在庫数の管理、閾値設定とアラート機能', 30, 300000, 'medium', NULL),
    ('00000000-0000-0000-0000-000000000003', '入出庫管理', '入庫・出庫処理と履歴管理', 40, 400000, 'medium', NULL),
    ('00000000-0000-0000-0000-000000000003', '基本レポート機能', '在庫状況、入出庫履歴などの基本レポート', 25, 250000, 'medium', NULL),
    ('00000000-0000-0000-0000-000000000003', 'データインポート', 'CSVからの商品データインポート機能', 15, 150000, 'low', NULL),

    -- 高度な在庫管理システム (ID: ...0004)
    ('00000000-0000-0000-0000-000000000004', 'ユーザー認証・権限管理', '複数権限レベルを持つユーザー管理システム', 30, 300000, 'medium', NULL),
    ('00000000-0000-0000-0000-000000000004', '商品マスタ管理（高度）', '商品情報の詳細管理、カテゴリ、タグ、画像管理', 60, 600000, 'high', NULL),
    ('00000000-0000-0000-0000-000000000004', 'バーコード・QRコード管理', 'バーコード/QRコード生成、スキャン機能、ラベル印刷', 80, 800000, 'high', NULL),
    ('00000000-0000-0000-0000-000000000004', '複数倉庫・ロケーション管理', '複数倉庫、棚・位置管理、在庫移動機能', 70, 700000, 'high', NULL),
    ('00000000-0000-0000-0000-000000000004', '入出庫管理（高度）', '入出庫ワークフロー、承認フロー、履歴管理', 60, 600000, 'high', NULL),
    ('00000000-0000-0000-0000-000000000004', '発注管理', '発注処理、発注書生成、仕入先管理', 50, 500000, 'medium', NULL),
    ('00000000-0000-0000-0000-000000000004', '在庫分析・予測', '在庫回転率分析、需要予測、発注点算出', 90, 900000, 'high', NULL),
    ('00000000-0000-0000-0000-000000000004', 'モバイル・ハンディ端末対応', 'スマートフォン/タブレット対応、専用ハンディ端末連携', 100, 1000000, 'high', NULL),
    ('00000000-0000-0000-0000-000000000004', '高度なレポート・ダッシュボード', 'カスタマイズ可能なレポート、リアルタイムダッシュボード', 70, 700000, 'high', NULL),

    -- 基本的な予約システム (ID: ...0005)
    ('00000000-0000-0000-0000-000000000005', 'ユーザー認証・権限管理', 'ログイン機能とユーザー権限の管理', 20, 200000, 'low', NULL),
    ('00000000-0000-0000-0000-000000000005', 'リソース管理', '予約対象となるリソース（部屋、人員など）の管理', 30, 300000, 'medium', NULL),
    ('00000000-0000-0000-0000-000000000005', 'カレンダー表示', '予約状況をカレンダー形式で表示する機能', 40, 400000, 'medium', NULL),
    ('00000000-0000-0000-0000-000000000005', '予約登録・編集・キャンセル', '予約の基本的な操作機能', 35, 350000, 'medium', NULL),
    ('00000000-0000-0000-0000-000000000005', '顧客管理（基本）', '予約者の基本情報管理', 25, 250000, 'low', NULL),
    ('00000000-0000-0000-0000-000000000005', 'メール通知', '予約確認・変更通知などの基本的なメール送信機能', 20, 200000, 'low', NULL);



-- 注意: ベクトルエンベディングの生成は別途必要です。
-- 以下は、機能説明のエンベディングを生成・更新するコードの例です。
-- このコメントはSQLの一部ではありません。

/*
// クライアントサイドでの実装例 - Gemini APIを使用
// Geminiの最新エンベディングモデル gemini-embedding-exp-03-07 を使用

// APIキーの設定
const GEMINI_API_KEY = 'あなたのGemini APIキー'; // 実際の環境で設定してください

// 機能テンプレートのエンベディング生成
async function generateFeatureEmbeddings() {
  const features = await supabase
    .from('template_features')
    .select('id, description'); // id と description のみ取得

  for (const feature of features.data) {
    if (!feature.description) {
        console.log(`Feature ${feature.id} に description がないのでスキップします`);
        continue;
    }

    const textToEmbed = feature.description; // description を直接エンベディング
    
    try {
      // Gemini APIを使ってエンベディングを生成
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-exp-03-07:embedContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'models/gemini-embedding-exp-03-07',
            content: {
              parts: [{ text: textToEmbed }]
            },
            taskType: 'SEMANTIC_SIMILARITY' // 意味的類似性検索に最適化
          })
        }
      );
      
      const data = await response.json();
      // Gemini Embedding API v1beta では embedding は data.embedding?.values に格納されるわ
      const embedding = data.embedding?.values || []; 
      
      // エンベディングを更新
      await supabase
        .from('template_features')
        .update({ description_embedding: embedding })
        .eq('id', feature.id);
        
      console.log(`Feature ${feature.id} の description_embedding を更新しました`);
    } catch (error) {
      console.error(`Feature ${feature.id} のエンベディング生成に失敗: ${error.message}`);
    }
  }
}

// 実行
// generateFeatureEmbeddings(); 
*/

-- =====================
-- 初期ユーザーの登録 (変更なし)
-- =====================
-- 注意: Supabase Auth UIを使うか、APIを使って実際のユーザーを登録し、
-- そのUUIDを使って以下のようなクエリを実行します。

/*
INSERT INTO public.users (id, email, full_name, company_name, role, created_at, updated_at)
VALUES 
(
  'ここにAuthから取得したUUID', 
  'example@example.com',
  'サンプル ユーザー',
  'サンプル株式会社',
  'admin',
  now(),
  now()
);
*/ 