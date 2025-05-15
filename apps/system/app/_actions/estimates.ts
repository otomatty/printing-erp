'use server';

import 'server-only';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import type { Database } from '@kit/supabase/database';

// estimates テーブルの Row 型
type EstimateRow = Database['public']['Tables']['estimates']['Row'];

/**
 * 全ての見積もりを取得します。
 * @returns {Promise<EstimateRow[]>}
 */
export async function fetchEstimates(): Promise<EstimateRow[]> {
  const client = getSupabaseServerClient<Database>();
  const { data, error } = await client
    .from('estimates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('fetchEstimates error:', error);
    return [];
  }
  return data;
}

/**
 * 指定したIDの見積もりを取得します。
 * @param {string} id
 * @returns {Promise<EstimateRow | null>}
 */
export async function fetchEstimateById(
  id: string
): Promise<EstimateRow | null> {
  const client = getSupabaseServerClient<Database>();
  const { data, error } = await client
    .from('estimates')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('fetchEstimateById error:', error);
    return null;
  }
  return data;
}

/**
 * 新しい見積もりを作成します。
 * @param {Omit<EstimateRow, 'id' | 'created_at' | 'updated_at'>} newEstimate
 * @returns {Promise<EstimateRow>}
 */
export async function createEstimate(
  newEstimate: Omit<EstimateRow, 'id' | 'created_at' | 'updated_at'>
): Promise<EstimateRow> {
  const client = getSupabaseServerClient<Database>();
  const { data, error } = await client
    .from('estimates')
    .insert(newEstimate)
    .select('*')
    .single();

  if (error || !data) {
    console.error('createEstimate error:', error);
    throw error;
  }
  return data;
}

/**
 * 既存の見積もりを更新します。
 * @param {string} id
 * @param {Partial<Omit<EstimateRow, 'id' | 'created_at' | 'updated_at'>>} updates
 * @returns {Promise<EstimateRow | null>}
 */
export async function updateEstimate(
  id: string,
  updates: Partial<Omit<EstimateRow, 'id' | 'created_at' | 'updated_at'>>
): Promise<EstimateRow | null> {
  const client = getSupabaseServerClient<Database>();
  const { data, error } = await client
    .from('estimates')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();

  if (error || !data) {
    console.error('updateEstimate error:', error);
    return null;
  }
  return data;
}

/**
 * 指定したIDの見積もりを削除します。
 * @param {string} id
 * @throws {Error} 削除に失敗した場合
 */
export async function deleteEstimate(id: string): Promise<void> {
  const client = getSupabaseServerClient<Database>();
  const { error } = await client.from('estimates').delete().eq('id', id);

  if (error) {
    console.error('deleteEstimate error:', error);
    throw new Error(error.message || '見積もりの削除に失敗しました');
  }
}
