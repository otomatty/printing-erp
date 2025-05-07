import { z } from 'zod';

/**
 * サンプル項目フォームデータのバリデーションスキーマ
 */
export const sampleFormSchema = z.object({
  page_id: z.string().uuid('ページIDが不正です'),
  name: z.string().min(1, 'サンプル名は必須です'),
  description: z.string().optional(),
  image_url: z.string().url('画像URLが不正です').optional(),
  material: z.string().optional(),
  thickness: z.string().optional(),
  color_count: z.number().int().optional(),
  color_mode: z.string().optional(),
  size_width: z.number().optional(),
  size_height: z.number().optional(),
  file_url: z.string().url('ファイルURLが不正です').optional(),
  cost_estimate: z.number().optional(),
  sort_order: z.number().int().optional(),
  is_active: z.boolean().optional(),
});

/**
 * サンプル項目フォームデータの型
 */
export type SampleFormData = z.infer<typeof sampleFormSchema>;

/**
 * サンプル項目のインターフェース
 */
export interface SampleItem {
  id: string;
  page_id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  material: string | null;
  thickness: string | null;
  color_count: number | null;
  color_mode: string | null;
  size_width: number | null;
  size_height: number | null;
  file_url: string | null;
  cost_estimate: number | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
