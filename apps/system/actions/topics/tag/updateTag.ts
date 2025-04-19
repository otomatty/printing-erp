'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { revalidatePath } from 'next/cache';
import { ensureAdmin } from '../../ensureAdmin';
import {
  topicTagFormSchema,
  type TopicTagFormData,
} from '../../../types/topics';
import { z } from 'zod';

/**
 * トピックタグを更新する
 */
export async function updateTag(id: string, formData: TopicTagFormData) {
  // 管理者権限チェック
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    // 入力バリデーション
    const validated = topicTagFormSchema.parse(formData);

    const supabase = await getSupabaseServerClient();

    // 既存タグ取得
    const { data: existing, error: fetchError } = await supabase
      .from('topics_tags')
      .select('slug')
      .eq('id', id)
      .single();
    if (fetchError || !existing) {
      return { success: false, error: 'タグが見つかりませんでした' };
    }

    // slug変更時の一意性チェック
    if (existing.slug !== validated.slug) {
      const { data: slugExists } = await supabase
        .from('topics_tags')
        .select('id')
        .eq('slug', validated.slug)
        .maybeSingle();
      if (slugExists) {
        return { success: false, error: 'このスラッグは既に使用されています' };
      }
    }

    // タグ更新
    const { data, error } = await supabase
      .from('topics_tags')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      console.error('Error updating topic tag:', error);
      return { success: false, error: error.message };
    }

    // キャッシュ再検証
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
    console.error('Error updating topic tag:', error);
    return { success: false, error: 'タグの更新中にエラーが発生しました' };
  }
}
