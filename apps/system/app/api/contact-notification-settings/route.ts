import { getSupabaseServerClient } from '@kit/supabase/server-client';
import type { Database } from '@kit/supabase/database';
import { NextResponse } from 'next/server';

// DBのテーブル型
type NotificationSetting =
  Database['system']['Tables']['contact_notification_settings']['Row'];

/**
 * GET: すべての通知設定を取得
 */
export async function GET() {
  try {
    const client = getSupabaseServerClient();
    const { data, error } = await client
      .schema('system')
      .from('contact_notification_settings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('通知設定取得エラー:', error);
      return NextResponse.json(
        { success: false, error: '設定の取得に失敗しました。' },
        { status: 500 }
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
