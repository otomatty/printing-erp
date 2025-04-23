// お問い合わせの状態
export type InquiryStatus =
  | 'new' // 新規
  | 'in_progress' // 対応中
  | 'waiting' // 顧客からの回答待ち
  | 'resolved' // 解決済み
  | 'closed'; // 完了（クローズ）

// お問い合わせの種類
export type InquiryType =
  | 'quote_request' // 見積依頼
  | 'product_inquiry' // 製品相談
  | 'order_status' // 注文状況
  | 'complaint' // 苦情・クレーム
  | 'support' // サポート
  | 'other'; // その他

// お問い合わせの優先度
export type PriorityLevel =
  | 'low' // 低
  | 'medium' // 中
  | 'high' // 高
  | 'urgent'; // 緊急

// お問い合わせの受付チャネル
export type InquirySource = 'web' | 'phone' | 'email' | 'other';

// お問い合わせレスポンスの型
export interface InquiryResponse {
  id: string;
  inquiry_id: string;
  content: string;
  created_at: string; // ISO形式の日付文字列
  created_by: string;
  is_internal: boolean; // 内部メモかどうか
  attachments?: string[]; // 添付ファイルのURLまたはパス
}

// お問い合わせの型
export interface Inquiry {
  /** 問い合わせID */
  id: string;
  /** 受付チャネル */
  source: InquirySource;
  /** 会社名 */
  company_name?: string;
  /** 希望連絡方法 */
  preferred_contact?: string;
  /** 題名 */
  subject: string;
  /** 本文 */
  content: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  status: InquiryStatus;
  /** サービスカテゴリ (service_type) */
  type: InquiryType;
  /** お問い合わせサブ種別 (inquiry_type) */
  inquiry_type: string;
  /** 優先度 */
  priority: PriorityLevel;
  assigned_to: string | null; // 担当者ID
  assigned_to_name: string | null; // 担当者名
  created_at: string; // ISO形式の日付文字列
  updated_at: string; // ISO形式の日付文字列
  responses: InquiryResponse[];
  related_quote_id?: string; // 関連する見積ID
  related_order_id?: string; // 関連する注文ID
  tags?: string[]; // タグ（カテゴリ分けなど）
  follow_up_date?: string; // フォローアップ予定日
}

// お問い合わせ統計の型
export interface InquiryStats {
  total: number;
  by_status: Record<InquiryStatus, number>;
  by_type: Record<InquiryType, number>;
  by_priority: Record<PriorityLevel, number>;
  overdue: number;
  avg_response_time: number; // 時間単位
  avg_resolution_time: number; // 時間単位
}

// 担当者の稼働状況の型
export interface AgentWorkload {
  agent_id: string;
  agent_name: string;
  assigned_inquiries: number;
  open_inquiries: number;
  resolved_today: number;
  avg_resolution_time: number; // 時間単位
}
