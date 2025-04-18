import { type NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

/**
 * クイックアクセスアイテムの表示順序を更新するAPIエンドポイント
 */
export async function POST(request: NextRequest) {
  console.log('API: updateQuickAccessOrder 開始');
  try {
    // リクエストからアイテムの順序情報を取得
    const body = await request.json();
    const items = body.items as { id: string; displayOrder: number }[];

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: '有効なアイテム順序データが必要です' },
        { status: 400 }
      );
    }

    console.log(`API: 更新するアイテム数=${items.length}`);

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

    // 管理者ユーザーIDを取得
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

    // 所有権確認（すべてのアイテムがこのユーザーのものか確認）
    const itemIds = items.map((item) => item.id);
    const { data: userItems, error: userItemsError } = await supabase
      .schema('system')
      .from('admin_quick_access')
      .select('id, admin_user_id')
      .in('id', itemIds);

    if (userItemsError) {
      console.error('API: ユーザーアイテム確認エラー', userItemsError);
      return NextResponse.json(
        {
          success: false,
          error: `ユーザーアイテムの確認に失敗しました: ${userItemsError.message}`,
        },
        { status: 500 }
      );
    }

    // すべてのアイテムがこのユーザーのものか確認
    const unauthorizedItems = userItems.filter(
      (item) => item.admin_user_id !== adminUser.id
    );
    if (unauthorizedItems.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'いくつかのアイテムを更新する権限がありません',
        },
        { status: 403 }
      );
    }

    // トランザクションは使えないので、1つずつ更新
    const updateResults = [];
    for (const item of items) {
      const { error } = await supabase
        .schema('system')
        .from('admin_quick_access')
        .update({ display_order: item.displayOrder })
        .eq('id', item.id);

      if (error) {
        console.error(`API: アイテム${item.id}の更新エラー`, error);
        updateResults.push({
          id: item.id,
          success: false,
          error: error.message,
        });
      } else {
        updateResults.push({
          id: item.id,
          success: true,
        });
      }
    }

    // 更新に失敗したアイテムがあるか確認
    const failedUpdates = updateResults.filter((result) => !result.success);
    if (failedUpdates.length > 0) {
      console.error('API: 一部のアイテム更新に失敗', failedUpdates);
      return NextResponse.json(
        {
          success: false,
          error: `${failedUpdates.length}個のアイテムの更新に失敗しました`,
          details: failedUpdates,
        },
        { status: 500 }
      );
    }

    console.log('API: updateQuickAccessOrder 完了');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API: updateQuickAccessOrder 予期せぬエラー', error);
    const errorMessage =
      error instanceof Error ? error.message : '不明なエラー';
    return NextResponse.json(
      {
        success: false,
        error: `クイックアクセスアイテム順序更新中に予期せぬエラーが発生しました: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
