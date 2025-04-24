import { z } from 'zod';

/**
 * ページフォームデータのバリデーションスキーマ
 */
export const pageFormSchema = z.object({
  slug: z.string().min(1, 'スラッグは必須です'),
  title: z.string().optional(),
  description: z.string().optional(),
});

/**
 * ページフォームデータの型
 */
export type PageFormData = z.infer<typeof pageFormSchema>;

/**
 * ページのインターフェース
 */
export interface Page {
  id: string;
  slug: string;
  title: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * FAQ項目フォームデータのバリデーションスキーマ
 */
export const faqFormSchema = z.object({
  page_id: z.string().uuid('ページIDが不正です'),
  question: z.string().min(1, '質問は必須です'),
  answer: z.string().min(1, '回答は必須です'),
  sort_order: z.number().int().optional(),
  is_active: z.boolean().optional(),
});

/**
 * FAQ項目フォームデータの型
 */
export type FaqFormData = z.infer<typeof faqFormSchema>;

/**
 * FAQ項目のインターフェース
 */
export interface FaqItem {
  id: string;
  page_id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
