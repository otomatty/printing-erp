'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { z } from 'zod';
import { ensureAdmin } from './ensureAdmin';
import type { PageFormData, FaqFormData, Page, FaqItem } from '../../types/faq';
import { pageFormSchema, faqFormSchema } from '../../types/faq';

/**
 * ページ一覧を取得する
 */
export async function getPages() {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { pages: [], error: authError };
  }
  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('slug', { ascending: true });
    if (error) {
      console.error('Error fetching pages:', error);
      return { pages: [], error: error.message };
    }
    return { pages: data || [], error: null };
  } catch (error) {
    console.error('Error fetching pages:', error);
    return { pages: [], error: 'ページの取得中にエラーが発生しました' };
  }
}

/**
 * ページを作成する
 */
export async function createPage(formData: PageFormData) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const validatedData = pageFormSchema.parse(formData);
    const supabase = await getSupabaseServerClient();

    // スラッグの一意性チェック
    const { data: existing } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', validatedData.slug)
      .maybeSingle();

    if (existing) {
      return { success: false, error: 'このスラッグは既に使用されています' };
    }

    const { data, error } = await supabase
      .from('pages')
      .insert(validatedData)
      .select()
      .single();

    if (error) {
      console.error('Error creating page:', error);
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
    console.error('Error creating page:', error);
    return { success: false, error: 'ページの作成中にエラーが発生しました' };
  }
}

/**
 * ページを更新する
 */
export async function updatePage(id: string, formData: PageFormData) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const validatedData = pageFormSchema.parse(formData);
    const supabase = await getSupabaseServerClient();

    // 既存ページ取得
    const { data: existingPage, error: fetchError } = await supabase
      .from('pages')
      .select('slug')
      .eq('id', id)
      .single();

    if (fetchError || !existingPage) {
      return { success: false, error: 'ページが見つかりませんでした' };
    }

    // スラッグ変更時の一意性チェック
    if (existingPage.slug !== validatedData.slug) {
      const { data: slugExists } = await supabase
        .from('pages')
        .select('id')
        .eq('slug', validatedData.slug)
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
      console.error('Error updating page:', error);
      return { success: false, error: error.message };
    }

    // キャッシュ再検証
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
    console.error('Error updating page:', error);
    return { success: false, error: 'ページの更新中にエラーが発生しました' };
  }
}

/**
 * ページを削除する
 */
export async function deletePage(id: string) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    // 削除前にスラッグ取得
    const { data: page, error: fetchError } = await supabase
      .from('pages')
      .select('slug')
      .eq('id', id)
      .single();

    if (fetchError || !page) {
      return { success: false, error: 'ページが見つかりませんでした' };
    }

    const { error } = await supabase.from('pages').delete().eq('id', id);

    if (error) {
      console.error('Error deleting page:', error);
      return { success: false, error: error.message };
    }

    revalidatePath(page.slug);

    return { success: true };
  } catch (error) {
    console.error('Error deleting page:', error);
    return { success: false, error: 'ページの削除中にエラーが発生しました' };
  }
}

/**
 * 指定ページのFAQを取得する
 */
export async function getFaqItems(pageId: string) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { faqItems: [], error: authError };
  }
  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase
      .from('faq_items')
      .select('*')
      .eq('page_id', pageId)
      .order('sort_order', { ascending: true });
    if (error) {
      console.error('Error fetching FAQ items:', error);
      return { faqItems: [], error: error.message };
    }
    return { faqItems: data || [], error: null };
  } catch (error) {
    console.error('Error fetching FAQ items:', error);
    return { faqItems: [], error: 'FAQ項目の取得中にエラーが発生しました' };
  }
}

/**
 * FAQ項目を作成する
 */
export async function createFaqItem(formData: FaqFormData) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const validatedData = faqFormSchema.parse(formData);
    const supabase = await getSupabaseServerClient();

    // ページslug取得
    const { data: page, error: pageError } = await supabase
      .from('pages')
      .select('slug')
      .eq('id', validatedData.page_id)
      .single();

    if (pageError || !page) {
      return { success: false, error: 'ページが見つかりませんでした' };
    }

    const { data, error } = await supabase
      .from('faq_items')
      .insert(validatedData)
      .select()
      .single();

    if (error) {
      console.error('Error creating FAQ item:', error);
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
    console.error('Error creating FAQ item:', error);
    return { success: false, error: 'FAQ項目の作成中にエラーが発生しました' };
  }
}

/**
 * FAQ項目を更新する
 */
export async function updateFaqItem(id: string, formData: FaqFormData) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }
  try {
    const validatedData = faqFormSchema.parse(formData);
    const supabase = await getSupabaseServerClient();

    // 既存FAQ取得
    const { data: existingFaq, error: fetchError } = await supabase
      .from('faq_items')
      .select('page_id')
      .eq('id', id)
      .single();

    if (fetchError || !existingFaq) {
      return { success: false, error: 'FAQ項目が見つかりませんでした' };
    }

    const { data, error } = await supabase
      .from('faq_items')
      .update(validatedData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating FAQ item:', error);
      return { success: false, error: error.message };
    }

    // キャッシュ再検証：古いページ
    const { data: pageOld, error: pageErrorOld } = await supabase
      .from('pages')
      .select('slug')
      .eq('id', existingFaq.page_id)
      .single();
    if (!pageErrorOld && pageOld) {
      revalidatePath(pageOld.slug);
    }

    // キャッシュ再検証：新しいページ
    if (existingFaq.page_id !== validatedData.page_id) {
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
    console.error('Error updating FAQ item:', error);
    return { success: false, error: 'FAQ項目の更新中にエラーが発生しました' };
  }
}

/**
 * FAQ項目を削除する
 */
export async function deleteFaqItem(id: string) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }
  try {
    const supabase = await getSupabaseServerClient();

    // 削除前にFAQ取得
    const { data: faq, error: fetchError } = await supabase
      .from('faq_items')
      .select('page_id')
      .eq('id', id)
      .single();

    if (fetchError || !faq) {
      return { success: false, error: 'FAQ項目が見つかりませんでした' };
    }

    const { error } = await supabase.from('faq_items').delete().eq('id', id);

    if (error) {
      console.error('Error deleting FAQ item:', error);
      return { success: false, error: error.message };
    }

    const { data: page, error: pageError } = await supabase
      .from('pages')
      .select('slug')
      .eq('id', faq.page_id)
      .single();
    if (!pageError && page) {
      revalidatePath(page.slug);
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting FAQ item:', error);
    return { success: false, error: 'FAQ項目の削除中にエラーが発生しました' };
  }
}

/**
 * スラッグからページを取得する
 */
export async function getPageBySlug(slug: string) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { page: null, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();
    // Ensure slug starts with '/'
    const filterSlug = slug.startsWith('/') ? slug : `/${slug}`;
    // Use maybeSingle to avoid error when no rows found
    const { data: page, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', filterSlug)
      .maybeSingle();
    if (error) {
      console.error('Error fetching page by slug:', error);
      return {
        page: null,
        error: error.message || 'ページの取得中にエラーが発生しました',
      };
    }
    if (!page) {
      // No matching page
      return { page: null, error: 'ページが見つかりませんでした' };
    }

    return { page, error: null };
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    return { page: null, error: 'ページの取得中にエラーが発生しました' };
  }
}

/**
 * FAQ項目をIDから取得する
 */
export async function getFaqItemById(id: string) {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { faq: null, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();
    const { data: faq, error } = await supabase
      .from('faq_items')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error('Error fetching FAQ item by id:', error);
      return {
        faq: null,
        error: error.message || 'FAQ項目の取得中にエラーが発生しました',
      };
    }
    return { faq, error: null };
  } catch (error) {
    console.error('Error fetching FAQ item by id:', error);
    return { faq: null, error: 'FAQ項目の取得中にエラーが発生しました' };
  }
}

/**
 * ページをIDから取得する
 */
export async function getPageById(
  id: string
): Promise<{ page: Page | null; error: string | null }> {
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { page: null, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();
    const { data: page, error } = await supabase
      .from('pages')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) {
      console.error('Error fetching page by ID:', error);
      return {
        page: null,
        error: error.message || 'ページの取得中にエラーが発生しました',
      };
    }
    if (!page) {
      return { page: null, error: 'ページが見つかりませんでした' };
    }

    return { page, error: null };
  } catch (error) {
    console.error('Error fetching page by ID:', error);
    return { page: null, error: 'ページの取得中にエラーが発生しました' };
  }
}
