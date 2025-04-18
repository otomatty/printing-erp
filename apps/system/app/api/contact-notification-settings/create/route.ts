import { z } from 'zod';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import type { Database } from '@kit/supabase/database';
import { type NextRequest, NextResponse } from 'next/server';

// 新規作成時の入力スキーマ
const CreateSettingSchema = z.object({
  name: z.string().min(1, '設定名は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  inquiryType: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === '' ? null : val)),
  isActive: z.boolean().default(true),
});

/**
 * POST: 新しい通知設定を追加
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedFields = CreateSettingSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          error: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const client = getSupabaseServerClient();
    const { data, error } = await client
      .schema('system')
      .from('contact_notification_settings')
      .insert({
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        inquiry_type: validatedFields.data.inquiryType,
        is_active: validatedFields.data.isActive,
      })
      .select()
      .single();

    if (error) {
      console.error('通知設定追加エラー:', error);
      // UNIQUE制約違反の場合
      if (error.code === '23505') {
        return NextResponse.json(
          {
            success: false,
            error: '同じメールアドレスが既に登録されています。',
          },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, error: '設定の追加に失敗しました。' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data, message: '通知設定を追加しました。' },
      { status: 201 }
    );
  } catch (e) {
    console.error('予期せぬエラー (POST):', e);
    return NextResponse.json(
      { success: false, error: '予期せぬエラーが発生しました。' },
      { status: 500 }
    );
  }
}
