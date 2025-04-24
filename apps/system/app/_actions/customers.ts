'use server';

import 'server-only';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import type { Database } from '@kit/supabase/database';

// customers テーブルの Row 型
type CustomerRow = Database['system']['Tables']['customers']['Row'];

/**
 * 顧客一覧を取得します。管理者権限が必要です。
 * @returns {Promise<Customer[]>}
 */
export async function fetchCustomers(): Promise<Customer[]> {
  const client = getSupabaseServerClient<Database>();
  const { data, error } = await client
    .schema('system')
    .from('customers')
    .select('*');

  if (error) {
    console.error('fetchCustomers error:', error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    name: row.name,
    contact: row.contact,
    email: row.email,
    phone: row.phone ?? '',
    lastOrder: row.last_order ?? '',
  }));
}

// 顧客の型定義
export interface Customer {
  /** 顧客ID */
  id: string;
  /** 顧客名 */
  name: string;
  /** 担当者名 */
  contact: string;
  /** メールアドレス */
  email: string;
  /** 電話番号 */
  phone: string;
  /** 最終注文日 */
  lastOrder: string;
}
