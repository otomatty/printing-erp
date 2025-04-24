'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { revalidatePath } from 'next/cache';
import { ensureAdmin } from '../../ensureAdmin';

/**
 * トピックタグを削除する
 */
export async function deleteTag(id: string) {
  // 管理者権限チェック
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    // このタグを使用しているトピック数を確認
    const { count, error: countError } = await supabase
      .from('topics_tags_map')
      .select('*', { count: 'exact', head: true })
      .eq('tag_id', id);

    if (countError) {
      console.error('Error checking tag usage:', countError);
      return { success: false, error: countError.message };
    }

    if (count && count > 0) {
      return {
        success: false,
        error: 'このタグを使用しているトピックがあるため削除できません',
        topicCount: count,
      };
    }

    // タグ削除
    const { error } = await supabase.from('topics_tags').delete().eq('id', id);
    if (error) {
      console.error('Error deleting topic tag:', error);
      return { success: false, error: error.message };
    }

    // キャッシュ再検証
    revalidatePath('/website/topics');

    return { success: true };
  } catch (error) {
    console.error('Error deleting topic tag:', error);
    return { success: false, error: 'タグの削除中にエラーが発生しました' };
  }
}
