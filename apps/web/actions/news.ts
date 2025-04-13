'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';

/**
 * お知らせ一覧の取得パラメータ
 */
export interface NewsListParams {
  /** ページ番号 (1から開始) */
  page?: number;
  /** 1ページあたりの件数 */
  limit?: number;
  /** カテゴリスラッグによるフィルタリング */
  categorySlug?: string;
}

/**
 * お知らせの型定義
 */
export interface News {
  id: string;
  title: string;
  summary: string | null;
  slug: string;
  published_at: string;
  status: string;
  is_featured: boolean;
  category_id: string | null;
  thumbnail_url: string | null;
  publish_end_date: string | null;
  created_at: string;
  updated_at: string;
  category?: {
    name: string;
    slug: string;
  };
}

/**
 * 公開済みのお知らせ一覧を取得する
 */
export async function getPublishedNews({
  page = 1,
  limit = 10,
  categorySlug,
}: NewsListParams = {}) {
  const supabase = await getSupabaseServerClient();

  // 開始位置を計算
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // クエリを構築
  let query = supabase
    .from('news')
    .select(`
      *,
      category:news_categories(name, slug)
    `)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .or(
      `publish_end_date.is.null,publish_end_date.gt.${new Date().toISOString()}`
    )
    .order('published_at', { ascending: false })
    .range(from, to);

  // カテゴリでフィルタリング（指定がある場合）
  if (categorySlug) {
    const { data: category } = await supabase
      .from('news_categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();

    if (category) {
      query = query.eq('category_id', category.id);
    }
  }

  // クエリ実行
  const { data, error, count } = await query.returns<News[]>();

  if (error) {
    console.error('Error fetching published news:', error);
    return { news: [], total: 0, error: error.message };
  }

  // 総件数取得のためのカウントクエリ
  let countQuery = supabase
    .from('news')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .or(
      `publish_end_date.is.null,publish_end_date.gt.${new Date().toISOString()}`
    );

  if (categorySlug && data && data.length > 0 && data[0]?.category_id) {
    countQuery = countQuery.eq('category_id', data[0].category_id);
  }

  const { count: total } = await countQuery;

  return {
    news: data || [],
    total: total || 0,
    error: null,
  };
}

/**
 * お知らせの詳細を取得する
 */
export async function getNewsDetail(slug: string) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from('news')
    .select(`
      *,
      category:news_categories(name, slug),
      attachments:news_attachments(*)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .or(
      `publish_end_date.is.null,publish_end_date.gt.${new Date().toISOString()}`
    )
    .single();

  if (error) {
    console.error(`Error fetching news detail for slug ${slug}:`, error);
    return { news: null, error: error.message };
  }

  return { news: data, error: null };
}

/**
 * 最新のお知らせをN件取得する（トップページ用）
 */
export async function getLatestNews(limit = 3) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from('news')
    .select(`
      *,
      category:news_categories(name, slug)
    `)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .or(
      `publish_end_date.is.null,publish_end_date.gt.${new Date().toISOString()}`
    )
    .order('published_at', { ascending: false })
    .limit(limit)
    .returns<News[]>();

  if (error) {
    console.error('Error fetching latest news:', error);
    return { news: [], error: error.message };
  }

  return { news: data || [], error: null };
}

/**
 * 特集お知らせを取得する
 */
export async function getFeaturedNews() {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from('news')
    .select(`
      *,
      category:news_categories(name, slug)
    `)
    .eq('status', 'published')
    .eq('is_featured', true)
    .lte('published_at', new Date().toISOString())
    .or(
      `publish_end_date.is.null,publish_end_date.gt.${new Date().toISOString()}`
    )
    .order('published_at', { ascending: false })
    .returns<News[]>();

  if (error) {
    console.error('Error fetching featured news:', error);
    return { news: [], error: error.message };
  }

  return { news: data || [], error: null };
}

/**
 * 添付ファイルのダウンロードURLを生成する
 */
export async function getAttachmentDownloadUrl(attachmentId: string) {
  const supabase = await getSupabaseServerClient();

  // まず添付ファイル情報を取得
  const { data: attachment, error: attachmentError } = await supabase
    .from('news_attachments')
    .select('file_path, file_name')
    .eq('id', attachmentId)
    .single();

  if (attachmentError || !attachment) {
    console.error(
      `Error fetching attachment ${attachmentId}:`,
      attachmentError
    );
    return {
      url: null,
      error: attachmentError?.message || '添付ファイルが見つかりません',
    };
  }

  // 添付ファイルが公開済みお知らせに属しているか確認
  const { data: belongsToPublishedNews, error: newsCheckError } = await supabase
    .from('news_attachments')
    .select(`
      news_id,
      news!inner(
        status,
        published_at,
        publish_end_date
      )
    `)
    .eq('id', attachmentId)
    .eq('news.status', 'published')
    .lte('news.published_at', new Date().toISOString())
    .or(
      `news.publish_end_date.is.null,news.publish_end_date.gt.${new Date().toISOString()}`
    )
    .maybeSingle();

  if (newsCheckError || !belongsToPublishedNews) {
    console.error(
      `Attachment ${attachmentId} does not belong to a published news:`,
      newsCheckError
    );
    return {
      url: null,
      error: '無効な添付ファイルまたはアクセス権限がありません',
    };
  }

  // ファイルへの一時的な署名付きURLを生成
  const { data: urlData, error: urlError } = await supabase.storage
    .from('news-attachments')
    .createSignedUrl(attachment.file_path, 60); // 60秒間有効

  if (urlError || !urlData) {
    console.error(
      `Error generating signed URL for ${attachment.file_path}:`,
      urlError
    );
    return {
      url: null,
      error: urlError?.message || 'ダウンロードURLの生成に失敗しました',
    };
  }

  return {
    url: urlData.signedUrl,
    fileName: attachment.file_name,
    error: null,
  };
}

/**
 * カテゴリ一覧を取得する
 */
export async function getNewsCategories() {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from('news_categories')
    .select('id, name, slug, description')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching news categories:', error);
    return { categories: [], error: error.message };
  }

  return { categories: data || [], error: null };
}
