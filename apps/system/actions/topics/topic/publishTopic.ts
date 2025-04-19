'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { ensureAdmin } from '../../ensureAdmin';

/**
 * トピックを公開する
 */
export async function publishTopic(id: string, publishDate?: Date) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();
    const publishedAt = publishDate
      ? publishDate.toISOString()
      : new Date().toISOString();

    const { data, error } = await supabase
      .from('topics')
      .update({ status: 'published', published_at: publishedAt })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error publishing topic:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/website/topics');
    revalidatePath(`/website/topics/${data.slug}`);

    return { success: true, data };
  } catch (error) {
    console.error('Error publishing topic:', error);
    return { success: false, error: 'トピックの公開中にエラーが発生しました' };
  }
}
