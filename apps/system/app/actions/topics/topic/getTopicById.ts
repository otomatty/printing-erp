'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { ensureAdmin } from '../../ensureAdmin';

/**
 * 特定のトピックを取得する
 */
export async function getTopicById(id: string) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { topic: null, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase
      .from('topics')
      .select(`
        *,
        category:topics_categories(*),
        tags:topics_tags(name, slug)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error || !data) {
      console.error(`Error fetching topic with ID ${id}:`, error);
      return { topic: null, error: 'トピックが見つかりませんでした' };
    }

    return { topic: data, error: null };
  } catch (error) {
    console.error(`Error fetching topic with ID ${id}:`, error);
    return { topic: null, error: 'トピックの取得中にエラーが発生しました' };
  }
}
