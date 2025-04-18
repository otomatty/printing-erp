'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

/**
 * 現在のユーザーに関連づけられたクイックアクセス一覧を取得
 * @returns クイックアクセスアイテムの配列
 */
export async function getUserQuickAccess() {
  const supabase = getSupabaseServerClient();

  // 現在のユーザーIDを取得
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: '認証エラー', items: [] };
  }

  // 管理者ユーザーIDを取得
  const { data: adminUser, error: adminError } = await supabase
    .schema('system')
    .from('admin_users')
    .select('id')
    .eq('auth_user_id', user.id)
    .single();

  if (adminError || !adminUser) {
    return {
      success: false,
      error: '管理者ユーザーが見つかりません',
      items: [],
    };
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
    return {
      success: false,
      error: 'クイックアクセスの取得に失敗しました',
      items: [],
    };
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

  return { success: true, items };
}

/**
 * クイックアクセスアイテムの表示/非表示を切り替える
 * @param itemId アイテムID
 * @param isVisible 表示状態
 */
export async function toggleQuickAccessVisibility(
  id: string,
  isVisible: boolean
) {
  const supabase = getSupabaseServerClient();

  const { error } = await supabase
    .schema('system')
    .from('admin_quick_access')
    .update({ is_visible: isVisible })
    .eq('id', id);

  if (error) {
    return { success: false, error: '設定の更新に失敗しました' };
  }

  revalidatePath('/');
  return { success: true };
}

/**
 * クイックアクセスアイテムの表示順序を更新
 * @param items 順序更新するアイテムの配列 (id, displayOrder のペア)
 */
export async function updateQuickAccessOrder(
  items: { id: string; displayOrder: number }[]
) {
  const supabase = getSupabaseServerClient();

  try {
    // 一つずつ更新
    for (const item of items) {
      const { error } = await supabase
        .schema('system')
        .from('admin_quick_access')
        .update({ display_order: item.displayOrder })
        .eq('id', item.id);

      if (error) throw error;
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: '表示順序の更新に失敗しました' };
  }
}

/**
 * システムで利用可能なすべてのクイックアクセスアイテムを取得（管理者用）
 */
export async function getAllQuickAccessItems() {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .schema('system')
    .from('quick_access_items')
    .select('*')
    .order('display_order');

  if (error) {
    return {
      success: false,
      error: 'アイテムの取得に失敗しました',
      items: [],
    };
  }

  return { success: true, items: data };
}

/**
 * 現在のユーザーのカスタマイズ設定を含む全クイックアクセスアイテムを取得
 * 管理設定画面用（表示・非表示にかかわらず全てのアイテムを取得）
 */
export async function getUserAllQuickAccessItems() {
  const supabase = getSupabaseServerClient();

  // 現在のユーザーIDを取得
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: '認証エラー', items: [] };
  }

  // 管理者ユーザーIDを取得
  const { data: adminUser, error: adminError } = await supabase
    .schema('system')
    .from('admin_users')
    .select('id')
    .eq('auth_user_id', user.id)
    .single();

  if (adminError || !adminUser) {
    return {
      success: false,
      error: '管理者ユーザーが見つかりません',
      items: [],
    };
  }

  // すべてのクイックアクセスアイテムを取得
  const { data: allItems, error: allItemsError } = await supabase
    .schema('system')
    .from('quick_access_items')
    .select('*')
    .order('display_order');

  if (allItemsError) {
    return { success: false, error: 'アイテムの取得に失敗しました', items: [] };
  }

  // ユーザーのカスタマイズ設定を取得
  const { data: userSettings, error: settingsError } = await supabase
    .schema('system')
    .from('admin_quick_access')
    .select('*')
    .eq('admin_user_id', adminUser.id);

  if (settingsError) {
    return { success: false, error: '設定の取得に失敗しました', items: [] };
  }

  // 結果を結合
  const result = allItems.map((item) => {
    const userSetting = userSettings.find((s) => s.item_id === item.id);

    return {
      // アイテム情報
      id: item.id,
      title: item.title,
      description: item.description,
      icon: item.icon,
      href: item.href,
      categoryId: item.category_id,
      isDefault: item.is_default,
      isEnabled: item.is_enabled,
      systemDisplayOrder: item.display_order,

      // ユーザー設定（存在すれば）
      userSettingId: userSetting?.id || null,
      isVisible: userSetting ? userSetting.is_visible : null,
      userDisplayOrder: userSetting ? userSetting.display_order : null,
    };
  });

  return { success: true, items: result };
}

/**
 * 新しいクイックアクセスアイテムを管理ユーザーに追加
 */
export async function addQuickAccessItem(itemId: string) {
  const supabase = getSupabaseServerClient();

  // 現在のユーザーIDを取得
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: '認証エラー' };
  }

  // 管理者ユーザーIDを取得
  const { data: adminUser, error: adminError } = await supabase
    .schema('system')
    .from('admin_users')
    .select('id')
    .eq('auth_user_id', user.id)
    .single();

  if (adminError || !adminUser) {
    return { success: false, error: '管理者ユーザーが見つかりません' };
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
    return { success: false, error: 'アイテムの追加に失敗しました' };
  }

  revalidatePath('/');
  return { success: true };
}

/**
 * ユーザーのクイックアクセスアイテム設定を削除
 */
export async function removeQuickAccessItem(id: string) {
  const supabase = getSupabaseServerClient();

  const { error } = await supabase
    .schema('system')
    .from('admin_quick_access')
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, error: 'アイテムの削除に失敗しました' };
  }

  revalidatePath('/');
  return { success: true };
}

/**
 * 現在のユーザーがまだ関連付けていないクイックアクセスアイテムを取得
 * （ドラッグアンドドロップUI用）
 */
export async function getUserAvailableQuickAccessItems() {
  console.log('DEBUG: getUserAvailableQuickAccessItems 開始');
  try {
    const supabase = getSupabaseServerClient();
    console.log('DEBUG: Supabaseクライアント取得完了');

    // 現在のユーザーIDを取得
    console.log('DEBUG: ユーザー情報取得開始');
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error('DEBUG: 認証エラー', authError);
      return {
        success: false,
        error: `認証エラー: ${authError.message}`,
        items: [],
      };
    }

    if (!user) {
      console.error('DEBUG: ユーザーが見つかりません');
      return { success: false, error: 'ユーザーが見つかりません', items: [] };
    }

    console.log(`DEBUG: ユーザー取得成功 ID=${user.id}`);

    // 管理者ユーザーIDを取得
    console.log('DEBUG: 管理者ユーザー取得開始');
    const { data: adminUser, error: adminError } = await supabase
      .schema('system')
      .from('admin_users')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (adminError) {
      console.error('DEBUG: 管理者ユーザー取得エラー', adminError);
      return {
        success: false,
        error: `管理者ユーザーの取得に失敗: ${adminError.message}`,
        items: [],
      };
    }

    if (!adminUser) {
      console.error('DEBUG: 管理者ユーザーが見つかりません');
      return {
        success: false,
        error: '管理者ユーザーが見つかりません',
        items: [],
      };
    }

    console.log(`DEBUG: 管理者ユーザー取得成功 ID=${adminUser.id}`);

    // ユーザーが既に関連付けているアイテムIDを取得
    console.log('DEBUG: 関連付け済みアイテム取得開始');
    const { data: userItems, error: userItemsError } = await supabase
      .schema('system')
      .from('admin_quick_access')
      .select('item_id')
      .eq('admin_user_id', adminUser.id);

    if (userItemsError) {
      console.error('DEBUG: ユーザー関連アイテム取得エラー', userItemsError);
      return {
        success: false,
        error: `ユーザー設定の取得に失敗: ${userItemsError.message}`,
        items: [],
      };
    }

    // 関連付け済みのアイテムIDの配列
    const linkedItemIds = userItems?.map((item) => item.item_id) || [];
    console.log(`DEBUG: 関連付け済みアイテム数=${linkedItemIds.length}`);
    if (linkedItemIds.length > 0) {
      console.log(
        `DEBUG: 関連付け済みアイテムIDs=${JSON.stringify(linkedItemIds)}`
      );
    }

    // すべての有効なアイテムを取得
    console.log('DEBUG: すべての有効なアイテム取得開始');
    try {
      const { data: allItems, error: availableError } = await supabase
        .schema('system')
        .from('quick_access_items')
        .select('*')
        .eq('is_enabled', true)
        .order('display_order');

      if (availableError) {
        console.error('DEBUG: アイテム取得エラー', availableError);
        return {
          success: false,
          error: `利用可能なアイテムの取得に失敗: ${availableError.message}`,
          items: [],
        };
      }

      if (!allItems || allItems.length === 0) {
        console.log('DEBUG: 有効なアイテムが見つかりません');
        return {
          success: false,
          error: '有効なアイテムが見つかりません',
          items: [],
        };
      }

      console.log(`DEBUG: 全アイテム取得成功 件数=${allItems.length}`);

      // クライアント側でフィルタリング - すでに関連付けされているアイテムを除外
      console.log('DEBUG: フィルタリング開始');
      const filteredItems =
        allItems.filter((item) => !linkedItemIds.includes(item.id)) || [];

      console.log(
        `DEBUG: フィルタリング後のアイテム数=${filteredItems.length}`
      );

      // 結果を整形
      console.log('DEBUG: 結果整形開始');
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
        `DEBUG: getUserAvailableQuickAccessItems 完了 結果件数=${items.length}`
      );
      return { success: true, items };
    } catch (queryError) {
      console.error('DEBUG: データベースクエリ実行エラー', queryError);
      return {
        success: false,
        error: `データベースクエリの実行中にエラーが発生: ${queryError instanceof Error ? queryError.message : '不明なエラー'}`,
        items: [],
      };
    }
  } catch (error) {
    console.error(
      'DEBUG: getUserAvailableQuickAccessItems 予期せぬエラー',
      error
    );
    const errorMessage =
      error instanceof Error ? error.message : '不明なエラー';
    return {
      success: false,
      error: `クイックアクセスアイテム取得中に予期せぬエラーが発生しました: ${errorMessage}`,
      items: [],
    };
  }
}
