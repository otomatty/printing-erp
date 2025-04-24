'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import type { FAQItem } from '../types/faq';

/**
 * 指定したページのスラッグから FAQ 項目を取得する
 * @param slug ページの URL スラッグ
 * @returns { faqs: FAQItem[], error: string | null }
 */
export async function getFaqItemsByPageSlug(
  slug: string
): Promise<{ faqs: FAQItem[]; error: string | null }> {
  const supabase = await getSupabaseServerClient();

  // ページ ID を取得
  const { data: page, error: pageError } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', slug)
    .single();

  if (pageError || !page) {
    console.error(`Error fetching page for slug ${slug}:`, pageError);
    return {
      faqs: [],
      error: pageError?.message || 'ページが見つかりませんでした',
    };
  }

  // FAQ 項目を取得
  const { data: faqItems, error: faqError } = await supabase
    .from('faq_items')
    .select('question, answer')
    .eq('page_id', page.id)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .returns<FAQItem[]>();

  if (faqError) {
    console.error(`Error fetching FAQs for page ${slug}:`, faqError);
    return { faqs: [], error: faqError.message };
  }

  return { faqs: faqItems || [], error: null };
}
