-- お問い合わせ関連テーブル作成、RLSポリシー設定、インデックス作成

-- 1. テーブル作成
-- 共通の問い合わせ情報テーブル
CREATE TABLE IF NOT EXISTS system.contact_inquiries (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_type text NOT NULL,
    name text NOT NULL,
    company_name text,
    email text NOT NULL,
    phone text,
    preferred_contact text,
    address text,
    postal_code text,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- 印刷サービス問い合わせ詳細テーブル
CREATE TABLE IF NOT EXISTS system.print_services_inquiries (
    id uuid PRIMARY KEY REFERENCES system.contact_inquiries(id) ON DELETE CASCADE,
    printing_type text,
    print_inquiry_type text, -- 例: 'estimate', 'order', 'question'
    contents text,
    deadline text, -- 例: 'YYYY-MM-DD', '約X週間後' など柔軟性を持たせるためtext
    has_design_data boolean
);

-- デジタルサービス問い合わせ詳細テーブル
CREATE TABLE IF NOT EXISTS system.digital_services_inquiries (
    id uuid PRIMARY KEY REFERENCES system.contact_inquiries(id) ON DELETE CASCADE,
    digital_service_type text NOT NULL, -- 例: 'ai-estimate', 'standard-form', 'meeting'
    estimate_params jsonb, -- AI見積もり用パラメータ
    project_description text -- 通常問い合わせ/ミーティング依頼の内容
);

-- 一般問い合わせ詳細テーブル
CREATE TABLE IF NOT EXISTS system.general_inquiries (
    id uuid PRIMARY KEY REFERENCES system.contact_inquiries(id) ON DELETE CASCADE,
    inquiry_content text NOT NULL -- 一般問い合わせは内容必須とする
);

-- ミーティング予約テーブル
CREATE TABLE IF NOT EXISTS system.meeting_reservations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id uuid NOT NULL REFERENCES system.contact_inquiries(id) ON DELETE CASCADE,
    meeting_datetime timestamptz,
    meeting_method text, -- 例: 'online', 'offline'
    meeting_url text, -- オンラインミーティング用URL
    notes text,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- 2. RLS (Row Level Security) ポリシーの設定
-- 注意: ここでは基本的な「認証済みユーザーは全アクセス可能」ポリシーを設定します。
--       実際の運用に合わせて、より詳細なポリシー（例：担当者のみアクセス可能など）を検討・実装してください。

-- contact_inquiries テーブル
ALTER TABLE system.contact_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to contact_inquiries"
    ON system.contact_inquiries
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- print_services_inquiries テーブル
ALTER TABLE system.print_services_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to print_services_inquiries"
    ON system.print_services_inquiries
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- digital_services_inquiries テーブル
ALTER TABLE system.digital_services_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to digital_services_inquiries"
    ON system.digital_services_inquiries
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- general_inquiries テーブル
ALTER TABLE system.general_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to general_inquiries"
    ON system.general_inquiries
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- meeting_reservations テーブル
ALTER TABLE system.meeting_reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to meeting_reservations"
    ON system.meeting_reservations
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- 3. インデックス作成
-- パフォーマンス向上のため、検索条件になりやすいカラムにインデックスを作成します。

-- contact_inquiries テーブル
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_email ON system.contact_inquiries (email);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_inquiry_type ON system.contact_inquiries (inquiry_type);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON system.contact_inquiries (created_at);

-- meeting_reservations テーブル
CREATE INDEX IF NOT EXISTS idx_meeting_reservations_inquiry_id ON system.meeting_reservations (inquiry_id);
CREATE INDEX IF NOT EXISTS idx_meeting_reservations_meeting_datetime ON system.meeting_reservations (meeting_datetime);


-- 以上 