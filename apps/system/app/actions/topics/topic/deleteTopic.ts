'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { ensureAdmin } from '../../ensureAdmin';

/**
 * トピックを削除する
 */
export async function deleteTopic(id: string) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    // 削除前にスラッグを取得してキャッシュ無効化用に使用
    const { data: topicData, error: fetchError } = await supabase
      .from('topics')
      .select('slug')
      .eq('id', id)
      .single();
    if (fetchError || !topicData) {
      return { success: false, error: 'トピックが見つかりませんでした' };
    }

    // トピックを削除（関連テーブルはCASCADE設定を想定）
    const { error } = await supabase.from('topics').delete().eq('id', id);
    if (error) {
      console.error('Error deleting topic:', error);
      return { success: false, error: error.message };
    }

    // キャッシュを更新
    revalidatePath('/website/topics');
    revalidatePath(`/website/topics/${topicData.slug}`);

    return { success: true };
  } catch (error) {
    console.error('Error deleting topic:', error);
    return { success: false, error: 'トピックの削除中にエラーが発生しました' };
  }
}
