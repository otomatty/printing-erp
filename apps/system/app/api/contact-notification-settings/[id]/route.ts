import { z } from 'zod';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { NextResponse } from 'next/server';

type Props = {
  params: {
    id: string;
  };
};

/**
 * GET: 指定IDの通知設定を取得
 */
export async function GET(request: Request, { params }: Props) {
  const { id } = params;

  // IDのバリデーション
  if (!id || !z.string().uuid().safeParse(id).success) {
    return NextResponse.json(
      { success: false, error: '無効なIDです。' },
      { status: 400 }
    );
  }

  try {
    const client = getSupabaseServerClient();
    const { data, error } = await client
      .schema('system')
      .from('contact_notification_settings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('通知設定取得エラー:', error);
      return NextResponse.json(
        { success: false, error: '設定の取得に失敗しました。' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: '設定が見つかりません。' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error('予期せぬエラー (GET):', e);
    return NextResponse.json(
      { success: false, error: '予期せぬエラーが発生しました。' },
      { status: 500 }
    );
  }
}

/**
 * DELETE: 通知設定を削除
 */
export async function DELETE(request: Request, { params }: Props) {
  const { id } = params;

  // IDのバリデーション
  if (!id || !z.string().uuid().safeParse(id).success) {
    return NextResponse.json(
      { success: false, error: '無効なIDです。' },
      { status: 400 }
    );
  }

  try {
    const client = getSupabaseServerClient();
    const { error } = await client
      .schema('system')
      .from('contact_notification_settings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('通知設定削除エラー:', error);
      return NextResponse.json(
        { success: false, error: '設定の削除に失敗しました。' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '通知設定を削除しました。',
    });
  } catch (e) {
    console.error('予期せぬエラー (DELETE):', e);
    return NextResponse.json(
      { success: false, error: '予期せぬエラーが発生しました。' },
      { status: 500 }
    );
  }
}
