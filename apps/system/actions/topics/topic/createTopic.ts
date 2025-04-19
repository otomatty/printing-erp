'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { z } from 'zod';
import { ensureAdmin } from '../../ensureAdmin';
import { topicFormSchema, type TopicFormData } from '../../../types/topics';

/**
 * トピックを作成する
 */
export async function createTopic(formData: TopicFormData) {
  // 管理者確認
  const { isAdmin, userId, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    // バリデーション
    const validated = topicFormSchema.parse(formData);

    const supabase = await getSupabaseServerClient();

    // スラッグの一意性チェック
    const { data: existing } = await supabase
      .from('topics')
      .select('id')
      .eq('slug', validated.slug)
      .maybeSingle();

    if (existing) {
      return { success: false, error: 'このスラッグは既に使用されています' };
    }

    // 公開日時の調整
    const now = new Date().toISOString();
    const publishedAt =
      validated.status === 'published'
        ? validated.published_at || now
        : validated.published_at;

    // レコード作成
    const { data, error } = await supabase
      .from('topics')
      .insert({
        ...validated,
        published_at: publishedAt,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating topic:', error);
      return { success: false, error: error.message };
    }

    // キャッシュ更新
    revalidatePath('/website/topics');

    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'バリデーションエラー',
        validationErrors: error.errors,
      };
    }
    console.error('Error creating topic:', error);
    return { success: false, error: 'トピックの作成中にエラーが発生しました' };
  }
}
