import { z } from 'zod';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import type { Database } from '@kit/supabase/database';
import { type NextRequest, NextResponse } from 'next/server';

// 更新時の入力スキーマ
const UpdateSettingSchema = z.object({
  name: z.string().min(1, '設定名は必須です').optional(),
  email: z.string().email('有効なメールアドレスを入力してください').optional(),
  inquiryType: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === '' ? null : val))
    .nullable(),
  isActive: z.boolean().optional(),
});

/**
 * PUT: 既存の通知設定を更新
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    // IDのバリデーション
    if (!id || !z.string().uuid().safeParse(id).success) {
      return NextResponse.json(
        { success: false, error: '無効なIDです。' },
        { status: 400 }
      );
    }

    // 更新データのバリデーション
    const validatedFields = UpdateSettingSchema.safeParse(updateData);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          error: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // 更新データがない場合
    if (Object.keys(validatedFields.data).length === 0) {
      return NextResponse.json({
        success: true,
        message: '更新するデータがありませんでした。',
      });
    }

    const client = getSupabaseServerClient();
    const { data, error } = await client
      .schema('system')
      .from('contact_notification_settings')
      .update({
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        inquiry_type: validatedFields.data.inquiryType,
        is_active: validatedFields.data.isActive,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('通知設定更新エラー:', error);
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
        { success: false, error: '設定の更新に失敗しました。' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: '更新対象の設定が見つかりません。' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: '通知設定を更新しました。',
    });
  } catch (e) {
    console.error('予期せぬエラー (PUT):', e);
    return NextResponse.json(
      { success: false, error: '予期せぬエラーが発生しました。' },
      { status: 500 }
    );
  }
}
