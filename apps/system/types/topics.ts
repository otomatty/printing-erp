import { z } from 'zod';

/**
 * トピックの公開状態を表す列挙型スキーマ
 */
export const topicStatusEnum = z.enum(['draft', 'published', 'archived']);
export type TopicStatus = z.infer<typeof topicStatusEnum>;

/**
 * トピック作成／更新用フォームデータの Zod スキーマ
 */
export const topicFormSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  slug: z.string().min(1, 'スラッグは必須です'),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  thumbnail_url: z.string().url('有効なURLを指定してください').optional(),
  status: topicStatusEnum.default('draft'),
  published_at: z.string().optional().nullable(),
  category_id: z.string().uuid('正しいカテゴリIDを指定してください'),
  tag_ids: z.array(z.string().uuid()).optional(),
});
export type TopicFormData = z.infer<typeof topicFormSchema>;

/**
 * トピック検索用パラメータの Zod スキーマ
 */
export const topicSearchParamsSchema = z.object({
  page: z.number().optional(),
  status: z.string().optional(),
  categoryId: z.string().optional(),
  query: z.string().optional(),
});
export type TopicSearchParams = z.infer<typeof topicSearchParamsSchema>;

/**
 * データベース上のトピックレコードを表す型定義
 */
export interface Topic {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  thumbnail_url: string | null;
  status: TopicStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category_id: string;
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

/**
 * カテゴリ作成／更新用フォームデータの Zod スキーマ
 */
export const topicCategoryFormSchema = z.object({
  name: z.string().min(1, 'カテゴリ名は必須です'),
  slug: z.string().min(1, 'スラッグは必須です'),
});
export type TopicCategoryFormData = z.infer<typeof topicCategoryFormSchema>;

/**
 * タグ作成／更新用フォームデータの Zod スキーマ
 */
export const topicTagFormSchema = z.object({
  name: z.string().min(1, 'タグ名は必須です'),
  slug: z.string().min(1, 'スラッグは必須です'),
});
export type TopicTagFormData = z.infer<typeof topicTagFormSchema>;
