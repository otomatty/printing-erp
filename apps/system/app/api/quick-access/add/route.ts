import { type NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

/**
 * クイックアクセスアイテムを追加するAPIエンドポイント
 */
export async function POST(request: NextRequest) {
  console.log('API: addQuickAccessItem 開始');
  try {
    // リクエストからアイテムIDを取得
    const body = await request.json();
    const { itemId } = body;

    if (!itemId) {
      return NextResponse.json(
        { success: false, error: 'アイテムIDは必須です' },
        { status: 400 }
      );
    }

    console.log(`API: 追加するアイテムID=${itemId}`);

    const supabase = getSupabaseServerClient();

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

    // 最大の表示順序を取得
    const { data: maxOrder } = await supabase
      .schema('system')
      .from('admin_quick_access')
      .select('display_order')
      .eq('admin_user_id', adminUser.id)
      .order('display_order', { ascending: false })
      .limit(1);

    const nextOrder = (maxOrder?.[0]?.display_order ?? 0) + 1;

    // 新しいアイテムを追加
    const { error: insertError } = await supabase
      .schema('system')
      .from('admin_quick_access')
      .insert({
        admin_user_id: adminUser.id,
        item_id: itemId,
        display_order: nextOrder,
        is_visible: true,
      });

    if (insertError) {
      console.error('API: アイテム追加エラー', insertError);
      return NextResponse.json(
        {
          success: false,
          error: `アイテムの追加に失敗しました: ${insertError.message}`,
        },
        { status: 500 }
      );
    }

    // 追加後にユーザーのクイックアクセスアイテムを取得して返す
    const { data: userItems, error: userItemsError } = await supabase
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

    if (userItemsError) {
      console.error('API: ユーザーアイテム取得エラー', userItemsError);
      return NextResponse.json(
        {
          success: true,
          message: 'アイテムは追加されましたが、最新データの取得に失敗しました',
        },
        { status: 200 }
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

    console.log('API: addQuickAccessItem 完了');
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error('API: addQuickAccessItem 予期せぬエラー', error);
    const errorMessage =
      error instanceof Error ? error.message : '不明なエラー';
    return NextResponse.json(
      {
        success: false,
        error: `クイックアクセスアイテム追加中に予期せぬエラーが発生しました: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
