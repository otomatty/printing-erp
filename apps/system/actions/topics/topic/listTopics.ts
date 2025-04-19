'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import {
  topicSearchParamsSchema,
  type TopicSearchParams,
} from '../../../types/topics';

/**
 * トピック一覧取得（フィルタ・ページネーション対応）
 */
export async function listTopics(rawParams: TopicSearchParams) {
  // パラメータのバリデーション
  const { page, status, categoryId, query } =
    topicSearchParamsSchema.parse(rawParams);

  const pageNum = page ? Number.parseInt(String(page), 10) : 1;
  const limit = 10;
  const from = (pageNum - 1) * limit;
  const to = pageNum * limit - 1;

  const supabase = await getSupabaseServerClient();
  let builder = supabase
    .from('topics')
    .select(
      '*, topics_categories(name, slug), tags:topics_tags(id, name, slug)',
      { count: 'exact' }
    );

  if (status && status !== 'all') {
    builder = builder.eq('status', status);
  }
  if (categoryId) {
    builder = builder.eq('category_id', categoryId);
  }
  if (query) {
    builder = builder.ilike('title', `%${query}%`);
  }

  builder = builder.order('updated_at', { ascending: false }).range(from, to);

  const { data, count, error } = await builder;
  if (error) {
    console.error('Error fetching topics:', error);
    return { topics: [], total: 0, error: error.message };
  }

  return { topics: data ?? [], total: count ?? 0, error: null };
}
