'use server';

import 'server-only';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { checkIsAdmin } from '@kit/next/actions';
import type { Database } from '@kit/supabase/database';
import type {
  Inquiry,
  InquiryResponse,
  InquiryStats,
  AgentWorkload,
  InquiryStatus,
  InquiryType,
  PriorityLevel,
  InquirySource,
} from '../../types/inquiries';

// inquiries テーブルの Row 型
type InquiryRow = Database['public']['Tables']['inquiries']['Row'];
type AssigneeRow = Database['public']['Tables']['inquiry_assignees']['Row'];
type AdminUser = Database['system']['Tables']['admin_users']['Row'];

/**
 * お問い合わせ一覧を取得します。管理者権限が必要です。
 * @returns {Promise<{ data: Inquiry[] | null; error: Error | null }>}
 */
export async function fetchInquiries(): Promise<Inquiry[]> {
  const client = getSupabaseServerClient<Database>();
  const { data, error } = await client.from('inquiries').select('*');

  if (error) {
    console.error('fetchInquiries error:', error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    source: row.source as InquirySource,
    subject: '', // サブテーブルや詳細取得で補完予定
    content: '', // サブテーブルや詳細取得で補完予定
    customer_id: row.id,
    customer_name: row.name,
    company_name: row.company_name ?? undefined,
    customer_email: row.email,
    customer_phone: row.phone ?? undefined,
    preferred_contact: row.preferred_contact ?? undefined,
    status: row.status as InquiryStatus,
    type: row.service_type as InquiryType,
    inquiry_type: row.inquiry_type,
    priority: row.priority as PriorityLevel,
    assigned_to: null,
    assigned_to_name: null,
    created_at: row.created_at,
    updated_at: row.updated_at,
    responses: [] as InquiryResponse[],
    related_quote_id: undefined,
    related_order_id: undefined,
    tags: undefined,
    follow_up_date: undefined,
  }));
}

/**
 * お問い合わせ統計を取得します。管理者権限が必要です。
 * @returns {Promise<{ data: { total: number; by_status: { new: number; in_progress: number } } | null; error: Error | null }>}
 */
export async function fetchInquiryStats(): Promise<InquiryStats> {
  const inquiries = await fetchInquiries();
  const stats: InquiryStats = {
    total: inquiries.length,
    by_status: {} as Record<InquiryStatus, number>,
    by_type: {} as Record<InquiryType, number>,
    by_priority: {} as Record<PriorityLevel, number>,
    overdue: 0,
    avg_response_time: 0,
    avg_resolution_time: 0,
  };

  for (const inq of inquiries) {
    stats.by_status[inq.status] = (stats.by_status[inq.status] || 0) + 1;
    stats.by_type[inq.type] = (stats.by_type[inq.type] || 0) + 1;
    stats.by_priority[inq.priority] =
      (stats.by_priority[inq.priority] || 0) + 1;
  }

  return stats;
}

/**
 * 指定したIDのお問い合わせを取得します。管理者権限が必要です。
 * @param {string} id - 問い合わせID
 * @returns {Promise<{ data: Inquiry | null; error: Error | null }>}
 */
export async function fetchInquiryById(id: string): Promise<Inquiry | null> {
  const client = getSupabaseServerClient<Database>();
  const { data, error } = await client
    .from('inquiries')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('fetchInquiryById error:', error);
    return null;
  }

  return {
    id: data.id,
    source: data.source as InquirySource,
    subject: '',
    content: '',
    customer_id: data.id,
    customer_name: data.name,
    company_name: data.company_name ?? undefined,
    customer_email: data.email,
    customer_phone: data.phone ?? undefined,
    preferred_contact: data.preferred_contact ?? undefined,
    status: data.status as InquiryStatus,
    type: data.service_type as InquiryType,
    inquiry_type: data.inquiry_type,
    priority: data.priority as PriorityLevel,
    assigned_to: null,
    assigned_to_name: null,
    created_at: data.created_at,
    updated_at: data.updated_at,
    responses: [] as InquiryResponse[],
    related_quote_id: undefined,
    related_order_id: undefined,
    tags: undefined,
    follow_up_date: undefined,
  };
}

/** 担当者稼働状況を取得（未実装: 必要に応じて拡張） */
export async function fetchAgentWorkloads(): Promise<AgentWorkload[]> {
  // TODO: system.admin_users や responses テーブル等と JOIN して集計
  return [];
}

/**
 * DB の InquiryRow をアプリケーションの Inquiry 型にマッピングします
 */
function mapRowToInquiry(row: InquiryRow): Inquiry {
  return {
    id: row.id,
    source: row.source as InquirySource,
    subject: '',
    content: '',
    customer_id: row.id,
    customer_name: row.name,
    company_name: row.company_name ?? undefined,
    customer_email: row.email,
    customer_phone: row.phone ?? undefined,
    preferred_contact: row.preferred_contact ?? undefined,
    status: row.status as InquiryStatus,
    type: row.service_type as InquiryType,
    inquiry_type: row.inquiry_type,
    priority: row.priority as PriorityLevel,
    assigned_to: null,
    assigned_to_name: null,
    created_at: row.created_at,
    updated_at: row.updated_at,
    responses: [] as InquiryResponse[],
    related_quote_id: undefined,
    related_order_id: undefined,
    tags: undefined,
    follow_up_date: undefined,
  };
}

/**
 * お問い合わせを作成します（管理者権限）
 */
export async function createInquiry(
  newInquiry: Omit<InquiryRow, 'id' | 'created_at' | 'updated_at'>
): Promise<Inquiry> {
  await checkIsAdmin();
  const client = getSupabaseServerClient<Database>();
  const { data, error } = await client
    .from('inquiries')
    .insert(newInquiry)
    .select('*')
    .single();
  if (error || !data) {
    console.error('createInquiry error:', error);
    throw error;
  }
  return mapRowToInquiry(data);
}

/**
 * お問い合わせを更新します（管理者権限）
 */
export async function updateInquiry(
  id: string,
  updates: Partial<InquiryRow>
): Promise<Inquiry | null> {
  await checkIsAdmin();
  const client = getSupabaseServerClient<Database>();
  const { data, error } = await client
    .from('inquiries')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();
  if (error || !data) {
    console.error('updateInquiry error:', error);
    return null;
  }
  return mapRowToInquiry(data);
}

/**
 * お問い合わせを削除します（管理者権限）
 * @throws {Error} 削除に失敗した場合にエラーを投げます
 */
export async function deleteInquiry(id: string): Promise<void> {
  await checkIsAdmin();
  const client = getSupabaseServerClient<Database>();
  const { error } = await client.from('inquiries').delete().eq('id', id);
  if (error) {
    console.error('deleteInquiry error:', error);
    throw new Error(error.message || 'お問い合わせの削除に失敗しました');
  }
}

// 新規: 特定のお問い合わせに紐づく担当者ID一覧を取得
export async function fetchInquiryAssignees(
  inquiryId: string
): Promise<string[]> {
  await checkIsAdmin();
  const client = getSupabaseServerClient<Database>();
  const { data, error } = await client
    .from('inquiry_assignees')
    .select('admin_user_id')
    .eq('inquiry_id', inquiryId);
  if (error || !data) {
    console.error('fetchInquiryAssignees error:', error);
    return [];
  }
  return data.map((row) => row.admin_user_id);
}

// 新規: お問い合わせに担当者を追加
export async function addInquiryAssignee(
  inquiryId: string,
  adminUserId: string
): Promise<void> {
  await checkIsAdmin();
  const client = getSupabaseServerClient<Database>();
  const { error } = await client
    .from('inquiry_assignees')
    .insert({ inquiry_id: inquiryId, admin_user_id: adminUserId });
  if (error) throw error;
}

// 新規: お問い合わせから担当者を削除
export async function removeInquiryAssignee(
  inquiryId: string,
  adminUserId: string
): Promise<void> {
  await checkIsAdmin();
  const client = getSupabaseServerClient<Database>();
  const { error } = await client
    .from('inquiry_assignees')
    .delete()
    .eq('inquiry_id', inquiryId)
    .eq('admin_user_id', adminUserId);
  if (error) throw error;
}
