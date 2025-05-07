'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { z } from 'zod';
import { ensureAdmin } from './ensureAdmin';
import type { SampleFormData, SampleItem } from '../../types/sample';
import { sampleFormSchema } from '../../types/sample';
import type { PageFormData, Page } from '../../types/faq';
import { pageFormSchema } from '../../types/faq';

/**
 * 指定ページのサンプル項目を取得する
 */
export async function getSampleItems(pageId: string) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { sampleItems: [], error: authError };
  }
  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase
      .from('sample_items')
      .select('*')
      .eq('page_id', pageId)
      .order('sort_order', { ascending: true });
    if (error) {
      console.error('Error fetching sample items:', error);
      return { sampleItems: [], error: error.message };
    }
    return { sampleItems: data || [], error: null };
  } catch (error) {
    console.error('Error fetching sample items:', error);
    return {
      sampleItems: [],
      error: 'サンプル項目の取得中にエラーが発生しました',
    };
  }
}

/**
 * サンプル項目を作成する
 */
export async function createSampleItem(formData: SampleFormData) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const validatedData = sampleFormSchema.parse(formData);
    const supabase = await getSupabaseServerClient();

    // ページ slug 取得
    const { data: page, error: pageError } = await supabase
      .from('pages')
      .select('slug')
      .eq('id', validatedData.page_id)
      .single();
    if (pageError || !page) {
      return { success: false, error: 'ページが見つかりませんでした' };
    }

    const { data, error } = await supabase
      .from('sample_items')
      .insert(validatedData)
      .select()
      .single();
    if (error) {
      console.error('Error creating sample item:', error);
      return { success: false, error: error.message };
    }

    revalidatePath(page.slug);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'バリデーションエラー',
        validationErrors: error.errors,
      };
    }
    console.error('Error creating sample item:', error);
    return {
      success: false,
      error: 'サンプル項目の作成中にエラーが発生しました',
    };
  }
}

/**
 * サンプル項目を更新する
 */
export async function updateSampleItem(id: string, formData: SampleFormData) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const validatedData = sampleFormSchema.parse(formData);
    const supabase = await getSupabaseServerClient();

    // 既存サンプル取得
    const { data: existing, error: fetchError } = await supabase
      .from('sample_items')
      .select('page_id')
      .eq('id', id)
      .single();
    if (fetchError || !existing) {
      return { success: false, error: 'サンプル項目が見つかりませんでした' };
    }

    const { data, error } = await supabase
      .from('sample_items')
      .update(validatedData)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      console.error('Error updating sample item:', error);
      return { success: false, error: error.message };
    }

    // キャッシュ再検証：古いページ
    const { data: pageOld, error: pageErrorOld } = await supabase
      .from('pages')
      .select('slug')
      .eq('id', existing.page_id)
      .single();
    if (!pageErrorOld && pageOld) {
      revalidatePath(pageOld.slug);
    }

    // キャッシュ再検証：新しいページ
    if (existing.page_id !== validatedData.page_id) {
      const { data: pageNew, error: pageErrorNew } = await supabase
        .from('pages')
        .select('slug')
        .eq('id', validatedData.page_id)
        .single();
      if (!pageErrorNew && pageNew) {
        revalidatePath(pageNew.slug);
      }
    } else if (pageOld) {
      revalidatePath(pageOld.slug);
    }

    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'バリデーションエラー',
        validationErrors: error.errors,
      };
    }
    console.error('Error updating sample item:', error);
    return {
      success: false,
      error: 'サンプル項目の更新中にエラーが発生しました',
    };
  }
}

/**
 * サンプル項目を削除する
 */
export async function deleteSampleItem(id: string) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    // 削除前にサンプル取得
    const { data: item, error: fetchError } = await supabase
      .from('sample_items')
      .select('page_id')
      .eq('id', id)
      .single();
    if (fetchError || !item) {
      return { success: false, error: 'サンプル項目が見つかりませんでした' };
    }

    const { error } = await supabase.from('sample_items').delete().eq('id', id);
    if (error) {
      console.error('Error deleting sample item:', error);
      return { success: false, error: error.message };
    }

    const { data: page, error: pageError } = await supabase
      .from('pages')
      .select('slug')
      .eq('id', item.page_id)
      .single();
    if (!pageError && page) {
      revalidatePath(page.slug);
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting sample item:', error);
    return {
      success: false,
      error: 'サンプル項目の削除中にエラーが発生しました',
    };
  }
}

/**
 * サンプル項目をIDから取得する
 */
export async function getSampleItemById(id: string) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { sample: null, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();
    const { data: sample, error } = await supabase
      .from('sample_items')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error('Error fetching sample item by id:', error);
      return {
        sample: null,
        error: error.message || 'サンプル項目の取得中にエラーが発生しました',
      };
    }
    return { sample, error: null };
  } catch (error) {
    console.error('Error fetching sample item by id:', error);
    return {
      sample: null,
      error: 'サンプル項目の取得中にエラーが発生しました',
    };
  }
}

/**
 * サンプルページ一覧を取得する
 */
export async function getSamplePages() {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { pages: [], error: authError };
  }
  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('page_type', 'sample')
      .order('slug', { ascending: true });
    if (error) {
      console.error('Error fetching sample pages:', error);
      return { pages: [], error: error.message };
    }
    return { pages: data || [], error: null };
  } catch (error) {
    console.error('Error fetching sample pages:', error);
    return { pages: [], error: 'サンプルページの取得中にエラーが発生しました' };
  }
}

/**
 * サンプルページを作成する
 */
export async function createSamplePage(formData: PageFormData) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }
  try {
    const validatedData = pageFormSchema.parse(formData);
    const supabase = await getSupabaseServerClient();
    const { data: existing } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', validatedData.slug)
      .eq('page_type', 'sample')
      .maybeSingle();
    if (existing) {
      return { success: false, error: 'このスラッグは既に使用されています' };
    }
    const { data, error } = await supabase
      .from('pages')
      .insert({ ...validatedData, page_type: 'sample' })
      .select()
      .single();
    if (error) {
      console.error('Error creating sample page:', error);
      return { success: false, error: error.message };
    }
    revalidatePath(validatedData.slug);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'バリデーションエラー',
        validationErrors: error.errors,
      };
    }
    console.error('Error creating sample page:', error);
    return {
      success: false,
      error: 'サンプルページの作成中にエラーが発生しました',
    };
  }
}

/**
 * サンプルページを更新する
 */
export async function updateSamplePage(id: string, formData: PageFormData) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }
  try {
    const validatedData = pageFormSchema.parse(formData);
    const supabase = await getSupabaseServerClient();
    const { data: existingPage, error: fetchError } = await supabase
      .from('pages')
      .select('slug, page_type')
      .eq('id', id)
      .single();
    if (fetchError || !existingPage || existingPage.page_type !== 'sample') {
      return { success: false, error: 'サンプルページが見つかりませんでした' };
    }
    if (existingPage.slug !== validatedData.slug) {
      const { data: slugExists } = await supabase
        .from('pages')
        .select('id')
        .eq('slug', validatedData.slug)
        .eq('page_type', 'sample')
        .maybeSingle();
      if (slugExists) {
        return { success: false, error: 'このスラッグは既に使用されています' };
      }
    }
    const { data, error } = await supabase
      .from('pages')
      .update(validatedData)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      console.error('Error updating sample page:', error);
      return { success: false, error: error.message };
    }
    revalidatePath(existingPage.slug);
    revalidatePath(data.slug);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'バリデーションエラー',
        validationErrors: error.errors,
      };
    }
    console.error('Error updating sample page:', error);
    return {
      success: false,
      error: 'サンプルページの更新中にエラーが発生しました',
    };
  }
}

/**
 * サンプルページを削除する
 */
export async function deleteSamplePage(id: string) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }
  try {
    const supabase = await getSupabaseServerClient();
    const { data: page, error: fetchError } = await supabase
      .from('pages')
      .select('slug, page_type')
      .eq('id', id)
      .single();
    if (fetchError || !page || page.page_type !== 'sample') {
      return { success: false, error: 'サンプルページが見つかりませんでした' };
    }
    const { error } = await supabase.from('pages').delete().eq('id', id);
    if (error) {
      console.error('Error deleting sample page:', error);
      return { success: false, error: error.message };
    }
    revalidatePath(page.slug);
    return { success: true };
  } catch (error) {
    console.error('Error deleting sample page:', error);
    return {
      success: false,
      error: 'サンプルページの削除中にエラーが発生しました',
    };
  }
}

/**
 * スラッグからサンプルページを取得する
 */
export async function getSamplePageBySlug(slug: string) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { page: null, error: authError };
  }
  try {
    const supabase = await getSupabaseServerClient();
    const filterSlug = slug.startsWith('/') ? slug : `/${slug}`;
    const { data: page, error } = await supabase
      .from('pages')
      .select('*')
      .eq('page_type', 'sample')
      .eq('slug', filterSlug)
      .maybeSingle();
    if (error) {
      console.error('Error fetching sample page by slug:', error);
      return {
        page: null,
        error: error.message || 'サンプルページの取得中にエラーが発生しました',
      };
    }
    if (!page) {
      return { page: null, error: 'サンプルページが見つかりませんでした' };
    }
    return { page, error: null };
  } catch (error) {
    console.error('Error fetching sample page by slug:', error);
    return {
      page: null,
      error: 'サンプルページの取得中にエラーが発生しました',
    };
  }
}

/**
 * IDからサンプルページを取得する
 */
export async function getSamplePageById(id: string) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { page: null, error: authError };
  }
  try {
    const supabase = await getSupabaseServerClient();
    const { data: page, error } = await supabase
      .from('pages')
      .select('*')
      .eq('page_type', 'sample')
      .eq('id', id)
      .maybeSingle();
    if (error) {
      console.error('Error fetching sample page by ID:', error);
      return {
        page: null,
        error: error.message || 'サンプルページの取得中にエラーが発生しました',
      };
    }
    if (!page) {
      return { page: null, error: 'サンプルページが見つかりませんでした' };
    }
    return { page, error: null };
  } catch (error) {
    console.error('Error fetching sample page by ID:', error);
    return {
      page: null,
      error: 'サンプルページの取得中にエラーが発生しました',
    };
  }
}
