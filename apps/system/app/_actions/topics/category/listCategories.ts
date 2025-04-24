'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { ensureAdmin } from '../../ensureAdmin';

/**
 * トピックカテゴリ一覧を取得する
 */
export async function listCategories() {
  // 管理者権限チェック
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { categories: [], error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase
      .from('topics_categories')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching topic categories:', error);
      return { categories: [], error: error.message };
    }

    return { categories: data || [], error: null };
  } catch (error) {
    console.error('Error fetching topic categories:', error);
    return { categories: [], error: 'カテゴリの取得中にエラーが発生しました' };
  }
}
