import { z } from 'zod';

/**
 * お知らせフォームデータのバリデーションスキーマ
 */
export const newsFormSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  content: z.string().min(1, '本文は必須です'),
  summary: z.string().optional(),
  slug: z
    .string()
    .min(1, 'スラッグは必須です')
    .regex(/^[a-z0-9-]+$/, 'スラッグは小文字英数字とハイフンのみ使用可能です'),
  published_at: z
    .string()
    .transform((val) => (val === '' ? null : val))
    .nullable()
    .optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  is_featured: z.boolean().default(false),
  category_id: z.string().uuid().nullable(),
  thumbnail_url: z.string().nullable().optional(),
  publish_end_date: z
    .string()
    .transform((val) => (val === '' ? null : val))
    .nullable()
    .optional(),
});

/**
 * お知らせフォームデータの型
 */
export type NewsFormData = z.infer<typeof newsFormSchema>;

/**
 * カテゴリフォームデータのバリデーションスキーマ
 */
export const categoryFormSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  slug: z
    .string()
    .min(1, 'スラッグは必須です')
    .regex(/^[a-z0-9-]+$/, 'スラッグは小文字英数字とハイフンのみ使用可能です'),
  description: z.string().optional(),
  display_order: z.number().int().optional(),
});

/**
 * カテゴリフォームデータの型
 */
export type CategoryFormData = z.infer<typeof categoryFormSchema>;

/**
 * カテゴリのインターフェイス
 * データベースのnews_categoriesテーブルに対応
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  display_order: number | null;
}

/**
 * 添付ファイルのメタデータ型
 */
export interface AttachmentMetadata {
  id: string;
  news_id: string | null;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

/**
 * お知らせ検索パラメータの型
 */
export interface NewsSearchParams {
  page?: number;
  limit?: number;
  status?: 'draft' | 'published' | 'archived' | 'all';
  categoryId?: string;
  query?: string;
  orderBy?: 'created_at' | 'updated_at' | 'published_at';
  order?: 'asc' | 'desc';
}
