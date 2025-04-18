import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

/**
 * 利用可能なクイックアクセスアイテムを取得するAPIエンドポイント
 */
export async function GET() {
  console.log('API: getUserAvailableQuickAccessItems 開始');
  try {
    const supabase = getSupabaseServerClient();
    console.log('API: Supabaseクライアント取得完了');

    // 現在のユーザーIDを取得
    console.log('API: ユーザー情報取得開始');
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error('API: 認証エラー', authError);
      return NextResponse.json(
        {
          success: false,
          error: `認証エラー: ${authError.message}`,
          items: [],
        },
        { status: 401 }
      );
    }

    if (!user) {
      console.error('API: ユーザーが見つかりません');
      return NextResponse.json(
        { success: false, error: 'ユーザーが見つかりません', items: [] },
        { status: 401 }
      );
    }

    console.log(`API: ユーザー取得成功 ID=${user.id}`);

    // 管理者ユーザーIDを取得
    console.log('API: 管理者ユーザー取得開始');
    const { data: adminUser, error: adminError } = await supabase
      .schema('system')
      .from('admin_users')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (adminError) {
      console.error('API: 管理者ユーザー取得エラー', adminError);
      return NextResponse.json(
        {
          success: false,
          error: `管理者ユーザーの取得に失敗: ${adminError.message}`,
          items: [],
        },
        { status: 400 }
      );
    }

    if (!adminUser) {
      console.error('API: 管理者ユーザーが見つかりません');
      return NextResponse.json(
        {
          success: false,
          error: '管理者ユーザーが見つかりません',
          items: [],
        },
        { status: 403 }
      );
    }

    console.log(`API: 管理者ユーザー取得成功 ID=${adminUser.id}`);

    // ユーザーが既に関連付けているアイテムIDを取得
    console.log('API: 関連付け済みアイテム取得開始');
    const { data: userItems, error: userItemsError } = await supabase
      .schema('system')
      .from('admin_quick_access')
      .select('item_id')
      .eq('admin_user_id', adminUser.id);

    if (userItemsError) {
      console.error('API: ユーザー関連アイテム取得エラー', userItemsError);
      return NextResponse.json(
        {
          success: false,
          error: `ユーザー設定の取得に失敗: ${userItemsError.message}`,
          items: [],
        },
        { status: 400 }
      );
    }

    // 関連付け済みのアイテムIDの配列
    const linkedItemIds = userItems?.map((item) => item.item_id) || [];
    console.log(`API: 関連付け済みアイテム数=${linkedItemIds.length}`);
    if (linkedItemIds.length > 0) {
      console.log(
        `API: 関連付け済みアイテムIDs=${JSON.stringify(linkedItemIds)}`
      );
    }

    // すべての有効なアイテムを取得
    console.log('API: すべての有効なアイテム取得開始');
    try {
      const { data: allItems, error: availableError } = await supabase
        .schema('system')
        .from('quick_access_items')
        .select('*')
        .eq('is_enabled', true)
        .order('display_order');

      if (availableError) {
        console.error('API: アイテム取得エラー', availableError);
        return NextResponse.json(
          {
            success: false,
            error: `利用可能なアイテムの取得に失敗: ${availableError.message}`,
            items: [],
          },
          { status: 400 }
        );
      }

      if (!allItems || allItems.length === 0) {
        console.log('API: 有効なアイテムが見つかりません');
        return NextResponse.json(
          {
            success: false,
            error: '有効なアイテムが見つかりません',
            items: [],
          },
          { status: 404 }
        );
      }

      console.log(`API: 全アイテム取得成功 件数=${allItems.length}`);

      // クライアント側でフィルタリング - すでに関連付けされているアイテムを除外
      console.log('API: フィルタリング開始');
      const filteredItems = allItems.filter(
        (item) => !linkedItemIds.includes(item.id)
      );

      console.log(`API: フィルタリング後のアイテム数=${filteredItems.length}`);

      // 結果を整形
      console.log('API: 結果整形開始');
      const items = filteredItems.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        icon: item.icon,
        href: item.href,
        categoryId: item.category_id,
        isDefault: item.is_default,
        isEnabled: item.is_enabled,
        systemDisplayOrder: item.display_order,
        userSettingId: null,
        isVisible: null,
        userDisplayOrder: null,
      }));

      console.log(
        `API: getUserAvailableQuickAccessItems 完了 結果件数=${items.length}`
      );
      return NextResponse.json({ success: true, items });
    } catch (queryError) {
      console.error('API: データベースクエリ実行エラー', queryError);
      return NextResponse.json(
        {
          success: false,
          error: `データベースクエリの実行中にエラーが発生: ${
            queryError instanceof Error ? queryError.message : '不明なエラー'
          }`,
          items: [],
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(
      'API: getUserAvailableQuickAccessItems 予期せぬエラー',
      error
    );
    const errorMessage =
      error instanceof Error ? error.message : '不明なエラー';
    return NextResponse.json(
      {
        success: false,
        error: `クイックアクセスアイテム取得中に予期せぬエラーが発生しました: ${errorMessage}`,
        items: [],
      },
      { status: 500 }
    );
  }
}
