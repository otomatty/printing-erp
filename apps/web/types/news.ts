/**
 * お知らせの型定義
 */
export interface News {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  slug: string;
  published_at: string | null;
  status: string;
  is_featured: boolean | null;
  category_id: string | null;
  thumbnail_url: string | null;
  publish_end_date: string | null;
  created_at: string;
  updated_at: string;
  category?: {
    name: string;
    slug: string;
  } | null;
  attachments?: {
    id: string;
    file_path: string;
    file_name: string;
  }[];
}

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
 * カテゴリの型定義
 */
export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order?: number;
}
