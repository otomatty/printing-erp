'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { revalidatePath } from 'next/cache';
import { ensureAdmin } from '../../ensureAdmin';
import {
  topicCategoryFormSchema,
  type TopicCategoryFormData,
} from '../../../types/topics';
import { z } from 'zod';

/**
 * トピックカテゴリを作成する
 */
export async function createCategory(formData: TopicCategoryFormData) {
  // 管理者権限チェック
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    // 入力バリデーション
    const validated = topicCategoryFormSchema.parse(formData);

    const supabase = await getSupabaseServerClient();

    // slug の一意性チェック
    const { data: existing } = await supabase
      .from('topics_categories')
      .select('id')
      .eq('slug', validated.slug)
      .maybeSingle();
    if (existing) {
      return { success: false, error: 'このスラッグは既に使用されています' };
    }

    // カテゴリ作成
    const { data, error } = await supabase
      .from('topics_categories')
      .insert(validated)
      .select()
      .single();
    if (error) {
      console.error('Error creating topic category:', error);
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
    console.error('Error creating topic category:', error);
    return { success: false, error: 'カテゴリの作成中にエラーが発生しました' };
  }
}
