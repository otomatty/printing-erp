'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { revalidatePath } from 'next/cache';
import { ensureAdmin } from '../../ensureAdmin';

/**
 * トピックカテゴリを削除する
 */
export async function deleteCategory(id: string) {
  // 管理者権限チェック
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    // 選択中のカテゴリが使われているトピック数を確認
    const { count, error: countError } = await supabase
      .from('topics')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', id);

    if (countError) {
      console.error('Error checking category usage:', countError);
      return { success: false, error: countError.message };
    }

    if (count && count > 0) {
      return {
        success: false,
        error: 'このカテゴリを使用しているトピックがあるため削除できません',
        topicCount: count,
      };
    }

    // カテゴリ削除
    const { error } = await supabase
      .from('topics_categories')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting topic category:', error);
      return { success: false, error: error.message };
    }

    // キャッシュ再検証
    revalidatePath('/website/topics');

    return { success: true };
  } catch (error) {
    console.error('Error deleting topic category:', error);
    return { success: false, error: 'カテゴリの削除中にエラーが発生しました' };
  }
}
