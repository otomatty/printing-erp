'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { ensureAdmin } from '../../ensureAdmin';

/**
 * トピックタグ一覧を取得する
 */
export async function listTags() {
  // 管理者権限チェック
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { tags: [], error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase
      .from('topics_tags')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching topic tags:', error);
      return { tags: [], error: error.message };
    }

    return { tags: data || [], error: null };
  } catch (error) {
    console.error('Error fetching topic tags:', error);
    return { tags: [], error: 'タグの取得中にエラーが発生しました' };
  }
}
