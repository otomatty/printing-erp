'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { ensureAdmin } from '../../ensureAdmin';

/**
 * トピックを非公開にする
 */
export async function unpublishTopic(id: string) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    // 下書き状態に更新
    const { data, error } = await supabase
      .from('topics')
      .update({ status: 'draft' })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error unpublishing topic:', error);
      return { success: false, error: error.message };
    }

    // キャッシュを更新
    revalidatePath('/website/topics');
    revalidatePath(`/website/topics/${data.slug}`);

    return { success: true, data };
  } catch (error) {
    console.error('Error unpublishing topic:', error);
    return {
      success: false,
      error: 'トピックの非公開設定中にエラーが発生しました',
    };
  }
}
