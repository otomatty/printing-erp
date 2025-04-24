'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { revalidatePath } from 'next/cache';
import { ensureAdmin } from '../../ensureAdmin';
import {
  topicCategoryFormSchema,
  type TopicCategoryFormData,
} from '../../../../types/topics';
import { z } from 'zod';

/**
 * トピックカテゴリを更新する
 */
export async function updateCategory(
  id: string,
  formData: TopicCategoryFormData
) {
  // 管理者権限チェック
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    // 入力バリデーション
    const validated = topicCategoryFormSchema.parse(formData);

    const supabase = await getSupabaseServerClient();

    // 既存カテゴリ取得
    const { data: existing, error: fetchError } = await supabase
      .from('topics_categories')
      .select('slug')
      .eq('id', id)
      .single();
    if (fetchError || !existing) {
      return { success: false, error: 'カテゴリが見つかりませんでした' };
    }

    // slug変更時の一意性チェック
    if (existing.slug !== validated.slug) {
      const { data: slugExists } = await supabase
        .from('topics_categories')
        .select('id')
        .eq('slug', validated.slug)
        .maybeSingle();
      if (slugExists) {
        return { success: false, error: 'このスラッグは既に使用されています' };
      }
    }

    // データ更新
    const { data, error } = await supabase
      .from('topics_categories')
      .update(validated)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating topic category:', error);
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
    console.error('Error updating topic category:', error);
    return { success: false, error: 'カテゴリの更新中にエラーが発生しました' };
  }
}
