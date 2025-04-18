import { type NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

/**
 * クイックアクセスアイテムを削除するAPIエンドポイント
 */
export async function DELETE(request: NextRequest) {
  console.log('API: removeQuickAccessItem 開始');

  // URLからアイテムIDを取得
  const id = request.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'アイテムIDは必須です' },
      { status: 400 }
    );
  }

  console.log(`API: 削除するアイテムID=${id}`);

  try {
    const supabase = getSupabaseServerClient();

    // 認証チェック
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: '認証エラー' },
        { status: 401 }
      );
    }

    // 本当にこのユーザーのアイテムかどうか確認（セキュリティのため）
    const { data: adminUser, error: adminError } = await supabase
      .schema('system')
      .from('admin_users')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (adminError || !adminUser) {
      return NextResponse.json(
        { success: false, error: '管理者ユーザーが見つかりません' },
        { status: 403 }
      );
    }

    // アイテムの所有権チェック
    const { data: targetItem, error: targetError } = await supabase
      .schema('system')
      .from('admin_quick_access')
      .select('admin_user_id')
      .eq('id', id)
      .single();

    if (targetError) {
      return NextResponse.json(
        { success: false, error: 'アイテムが見つかりません' },
        { status: 404 }
      );
    }

    if (targetItem.admin_user_id !== adminUser.id) {
      return NextResponse.json(
        { success: false, error: 'このアイテムを削除する権限がありません' },
        { status: 403 }
      );
    }

    // アイテムを削除
    const { error } = await supabase
      .schema('system')
      .from('admin_quick_access')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('API: アイテム削除エラー', error);
      return NextResponse.json(
        {
          success: false,
          error: `アイテムの削除に失敗しました: ${error.message}`,
        },
        { status: 500 }
      );
    }

    console.log('API: removeQuickAccessItem 完了');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API: removeQuickAccessItem 予期せぬエラー', error);
    const errorMessage =
      error instanceof Error ? error.message : '不明なエラー';
    return NextResponse.json(
      {
        success: false,
        error: `クイックアクセスアイテム削除中に予期せぬエラーが発生しました: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
