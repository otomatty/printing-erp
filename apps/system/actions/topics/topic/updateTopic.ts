'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { z } from 'zod';
import { ensureAdmin } from '../../ensureAdmin';
import { topicFormSchema, type TopicFormData } from '../../../types/topics';

/**
 * トピックを更新する
 */
export async function updateTopic(id: string, formData: TopicFormData) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    // バリデーション
    const validated = topicFormSchema.parse(formData);

    const supabase = await getSupabaseServerClient();

    // 既存トピック取得
    const { data: existingTopic, error: fetchError } = await supabase
      .from('topics')
      .select('status, published_at, slug')
      .eq('id', id)
      .single();
    if (fetchError || !existingTopic) {
      return { success: false, error: 'トピックが見つかりませんでした' };
    }

    // スラッグが変更された場合、一意性チェック
    if (existingTopic.slug !== validated.slug) {
      const { data: existingSlug } = await supabase
        .from('topics')
        .select('id')
        .eq('slug', validated.slug)
        .maybeSingle();
      if (existingSlug) {
        return { success: false, error: 'このスラッグは既に使用されています' };
      }
    }

    // 公開日時の調整
    const wasPublished = existingTopic.status === 'published';
    const isPublished = validated.status === 'published';
    const now = new Date().toISOString();
    let publishedAt = validated.published_at;
    if (!wasPublished && isPublished && !publishedAt) {
      publishedAt = now;
    }

    // データ更新
    const { data, error } = await supabase
      .from('topics')
      .update({ ...validated, published_at: publishedAt })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating topic:', error);
      return { success: false, error: error.message };
    }

    // キャッシュを更新
    revalidatePath('/website/topics');
    revalidatePath(`/website/topics/${data.slug}`);

    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'バリデーションエラー',
        validationErrors: error.errors,
      };
    }
    console.error('Error updating topic:', error);
    return { success: false, error: 'トピックの更新中にエラーが発生しました' };
  }
}
