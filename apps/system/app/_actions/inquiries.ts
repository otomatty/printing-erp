// モック用サーバーアクション
// (removed 'use client' directive to allow server-side invocation)

import type {
  Inquiry,
  InquiryStats,
  AgentWorkload,
} from '../../types/inquiries';

// モックデータ定義
const mockInquiries: Inquiry[] = [
  {
    id: 'inq1',
    source: 'web',
    subject: 'テストお問い合わせ',
    content: 'これはテストのお問い合わせです。',
    customer_id: 'c1',
    customer_name: '山田太郎',
    company_name: 'テスト会社',
    customer_email: 'taro@example.com',
    customer_phone: '090-1234-5678',
    preferred_contact: undefined,
    status: 'new',
    type: 'other',
    inquiry_type: '',
    priority: 'low',
    assigned_to: null,
    assigned_to_name: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    responses: [],
    related_quote_id: undefined,
    related_order_id: undefined,
    tags: undefined,
    follow_up_date: undefined,
  },
  {
    id: 'inq2',
    source: 'email',
    subject: '製品について',
    content: '製品に関するお問い合わせです。',
    customer_id: 'c2',
    customer_name: '鈴木次郎',
    company_name: undefined,
    customer_email: 'jiro@example.com',
    customer_phone: undefined,
    preferred_contact: undefined,
    status: 'in_progress',
    type: 'product_inquiry',
    inquiry_type: '',
    priority: 'high',
    assigned_to: 'admin1',
    assigned_to_name: '佐藤花子',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    responses: [],
    related_quote_id: undefined,
    related_order_id: undefined,
    tags: undefined,
    follow_up_date: undefined,
  },
  {
    id: 'inq3',
    source: 'phone',
    subject: '注文状況の確認',
    content: '注文のステータスを教えてください。',
    customer_id: 'c3',
    customer_name: '田中三郎',
    company_name: '三郎商事',
    customer_email: 'saburo@example.com',
    customer_phone: '080-9876-5432',
    preferred_contact: undefined,
    status: 'resolved',
    type: 'order_status',
    inquiry_type: '',
    priority: 'medium',
    assigned_to: null,
    assigned_to_name: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    responses: [],
    related_quote_id: undefined,
    related_order_id: undefined,
    tags: undefined,
    follow_up_date: undefined,
  },
];

const mockStats: InquiryStats = {
  total: mockInquiries.length,
  by_status: {
    new: 1,
    in_progress: 1,
    waiting: 0,
    resolved: 1,
    closed: 0,
  },
  by_type: {
    quote_request: 0,
    product_inquiry: 1,
    order_status: 1,
    complaint: 0,
    support: 0,
    other: 1,
  },
  by_priority: {
    low: 1,
    medium: 1,
    high: 1,
    urgent: 0,
  },
  overdue: 0,
  avg_response_time: 0,
  avg_resolution_time: 0,
};

const mockWorkloads: AgentWorkload[] = [];

// 取得系モック
export async function fetchInquiries(): Promise<Inquiry[]> {
  return mockInquiries;
}

export async function fetchInquiryStats(): Promise<InquiryStats> {
  return mockStats;
}

export async function fetchInquiryById(id: string): Promise<Inquiry | null> {
  return mockInquiries.find((inq) => inq.id === id) ?? null;
}

export async function fetchAgentWorkloads(): Promise<AgentWorkload[]> {
  return mockWorkloads;
}

export async function fetchInquiryAssignees(
  inquiryId: string
): Promise<string[]> {
  return ['admin1'];
}

// 通知用関数
function notify(message: string) {
  alert(message);
}

// 送信系モック
export async function createInquiry(): Promise<{ success: boolean }> {
  notify('お問い合わせを作成しました');
  return { success: true };
}

export async function updateInquiry(): Promise<{ success: boolean }> {
  notify('お問い合わせを更新しました');
  return { success: true };
}

export async function deleteInquiry(): Promise<{ success: boolean }> {
  notify('お問い合わせを削除しました');
  return { success: true };
}

export async function addInquiryAssignee(): Promise<{ success: boolean }> {
  notify('担当者を追加しました');
  return { success: true };
}

export async function removeInquiryAssignee(): Promise<{ success: boolean }> {
  notify('担当者を削除しました');
  return { success: true };
}
