import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

/**
 * 現在のユーザーのクイックアクセスアイテムを取得するAPIエンドポイント
 */
export async function GET() {
  console.log('API: getUserQuickAccess 開始');
  try {
    const supabase = getSupabaseServerClient();

    // 現在のユーザーIDを取得
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: '認証エラー', items: [] },
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
        {
          success: false,
          error: '管理者ユーザーが見つかりません',
          items: [],
        },
        { status: 403 }
      );
    }

    // ユーザーのクイックアクセス設定を取得
    const { data: userItems, error: itemsError } = await supabase
      .schema('system')
      .from('admin_quick_access')
      .select(`
        id,
        is_visible,
        display_order,
        item_id,
        quick_access_items:item_id (
          id,
          title,
          description,
          icon,
          href,
          category_id
        )
      `)
      .eq('admin_user_id', adminUser.id)
      .eq('is_visible', true)
      .order('display_order');

    if (itemsError) {
      return NextResponse.json(
        {
          success: false,
          error: 'クイックアクセスの取得に失敗しました',
          items: [],
        },
        { status: 500 }
      );
    }

    // 結果を整形
    const items = userItems.map((item) => ({
      id: item.id,
      itemId: item.item_id,
      isVisible: item.is_visible,
      displayOrder: item.display_order,
      title: item.quick_access_items.title,
      description: item.quick_access_items.description,
      icon: item.quick_access_items.icon,
      href: item.quick_access_items.href,
      categoryId: item.quick_access_items.category_id,
    }));

    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error('API: getUserQuickAccess 予期せぬエラー', error);
    const errorMessage =
      error instanceof Error ? error.message : '不明なエラー';
    return NextResponse.json(
      {
        success: false,
        error: `クイックアクセス取得中に予期せぬエラーが発生しました: ${errorMessage}`,
        items: [],
      },
      { status: 500 }
    );
  }
}

/**
 * クイックアクセスアイテムを追加するAPIエンドポイント
 */
export async function POST(request: Request) {
  console.log('API: addQuickAccessItem 開始');
  try {
    const supabase = getSupabaseServerClient();
    const body = await request.json();
    const { itemId } = body;

    if (!itemId) {
      return NextResponse.json(
        { success: false, error: 'アイテムIDが必要です' },
        { status: 400 }
      );
    }

    // 現在のユーザーIDを取得
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

    // 現在の最大表示順序を取得
    const { data: maxOrderItem } = await supabase
      .schema('system')
      .from('admin_quick_access')
      .select('display_order')
      .eq('admin_user_id', adminUser.id)
      .order('display_order', { ascending: false })
      .limit(1)
      .single();

    const newOrder = (maxOrderItem?.display_order || 0) + 1;

    // すでに登録されているか確認
    const { data: existingItem, error: existingError } = await supabase
      .schema('system')
      .from('admin_quick_access')
      .select('id')
      .eq('admin_user_id', adminUser.id)
      .eq('item_id', itemId)
      .maybeSingle();

    if (existingItem) {
      // すでに存在する場合は表示をtrueに更新
      const { data: updatedItem, error: updateError } = await supabase
        .schema('system')
        .from('admin_quick_access')
        .update({ is_visible: true, display_order: newOrder })
        .eq('id', existingItem.id)
        .select()
        .single();

      if (updateError) {
        return NextResponse.json(
          { success: false, error: 'アイテムの更新に失敗しました' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'アイテムを表示に設定しました',
        item: updatedItem,
      });
    }

    // 新規追加
    const { data: newItem, error: insertError } = await supabase
      .schema('system')
      .from('admin_quick_access')
      .insert({
        admin_user_id: adminUser.id,
        item_id: itemId,
        is_visible: true,
        display_order: newOrder,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { success: false, error: 'アイテムの追加に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'アイテムを追加しました',
      item: newItem,
    });
  } catch (error) {
    console.error('API: addQuickAccessItem 予期せぬエラー', error);
    const errorMessage =
      error instanceof Error ? error.message : '不明なエラー';
    return NextResponse.json(
      {
        success: false,
        error: `アイテム追加中に予期せぬエラーが発生しました: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}

/**
 * クイックアクセスアイテムを削除するAPIエンドポイント
 */
export async function DELETE(request: Request) {
  console.log('API: removeQuickAccessItem 開始');
  try {
    const supabase = getSupabaseServerClient();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'アイテムIDが必要です' },
        { status: 400 }
      );
    }

    // 現在のユーザーIDを取得
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

    // 実際には削除せず、is_visibleをfalseに設定
    const { data: updatedItem, error: updateError } = await supabase
      .schema('system')
      .from('admin_quick_access')
      .update({ is_visible: false })
      .eq('id', id)
      .eq('admin_user_id', adminUser.id) // セキュリティのため自分のアイテムのみ更新可能
      .select()
      .single();

    if (updateError) {
      return NextResponse.json(
        { success: false, error: 'アイテムの削除に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'アイテムを削除しました',
      item: updatedItem,
    });
  } catch (error) {
    console.error('API: removeQuickAccessItem 予期せぬエラー', error);
    const errorMessage =
      error instanceof Error ? error.message : '不明なエラー';
    return NextResponse.json(
      {
        success: false,
        error: `アイテム削除中に予期せぬエラーが発生しました: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}

/**
 * クイックアクセスアイテムの順序を更新するAPIエンドポイント
 */
export async function PUT(request: Request) {
  console.log('API: updateQuickAccessOrder 開始');
  try {
    const supabase = getSupabaseServerClient();
    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: '更新するアイテムがありません' },
        { status: 400 }
      );
    }

    // 現在のユーザーIDを取得
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

    // トランザクション的に全てのアイテムを更新
    const updates = items.map(async (item, index) => {
      const { data, error } = await supabase
        .schema('system')
        .from('admin_quick_access')
        .update({ display_order: index + 1 })
        .eq('id', item.id)
        .eq('admin_user_id', adminUser.id); // セキュリティのため自分のアイテムのみ更新可能

      if (error) {
        throw new Error(
          `アイテム(ID: ${item.id})の順序更新に失敗: ${error.message}`
        );
      }
      return data;
    });

    // 全ての更新を実行
    await Promise.all(updates);

    return NextResponse.json({
      success: true,
      message: 'アイテム順序を更新しました',
    });
  } catch (error) {
    console.error('API: updateQuickAccessOrder 予期せぬエラー', error);
    const errorMessage =
      error instanceof Error ? error.message : '不明なエラー';
    return NextResponse.json(
      {
        success: false,
        error: `アイテム順序更新中に予期せぬエラーが発生しました: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
