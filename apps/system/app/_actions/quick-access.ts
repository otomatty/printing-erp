'use server';

import type { Database } from '@kit/supabase/database';

// モックデータ定義 (supabase Database 型定義を使用)
const mockQuickAccessItems: Database['system']['Tables']['quick_access_items']['Row'][] =
  [
    {
      id: 'dashboard',
      title: 'ダッシュボード',
      description: 'システムの主要指標を表示',
      icon: 'home',
      href: '/dashboard',
      category_id: 'general',
      display_order: 1,
      is_default: true,
      is_enabled: true,
      created_at: null,
      updated_at: null,
    },
    {
      id: 'settings',
      title: '設定',
      description: 'システム設定を行う',
      icon: 'cog',
      href: '/settings',
      category_id: 'admin',
      display_order: 2,
      is_default: false,
      is_enabled: true,
      created_at: null,
      updated_at: null,
    },
  ];
const mockAdminQuickAccess: Database['system']['Tables']['admin_quick_access']['Row'][] =
  [
    {
      id: 'qa1',
      admin_user_id: 'admin1',
      item_id: 'dashboard',
      is_visible: true,
      display_order: 1,
      created_at: '2025-06-01T10:00:00Z',
      updated_at: '2025-06-01T10:00:00Z',
    },
    {
      id: 'qa2',
      admin_user_id: 'admin1',
      item_id: 'settings',
      is_visible: true,
      display_order: 2,
      created_at: '2025-06-01T10:05:00Z',
      updated_at: '2025-06-01T10:05:00Z',
    },
  ];

/**
 * 現在のユーザーに関連づけられたクイックアクセス一覧を取得
 * @returns クイックアクセスアイテムの配列
 */
export async function getUserQuickAccess() {
  // モック: ユーザーのクイックアクセスを返す
  const items = mockAdminQuickAccess
    .filter((u) => u.is_visible)
    .sort((a, b) => a.display_order - b.display_order)
    .map((u) => {
      const item = mockQuickAccessItems.find((i) => i.id === u.item_id);
      if (!item) {
        console.error(`Item with id ${u.item_id} not found`);
        return null;
      }
      return {
        id: u.id,
        itemId: u.item_id,
        isVisible: u.is_visible ?? false,
        displayOrder: u.display_order,
        title: item.title,
        description: item.description,
        icon: item.icon,
        href: item.href,
        categoryId: item.category_id,
      };
    });
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
  // モック: 常に成功
  return { success: true };
}

/**
 * クイックアクセスアイテムの表示順序を更新
 * @param items 順序更新するアイテムの配列 (id, displayOrder のペア)
 */
export async function updateQuickAccessOrder(
  items: { id: string; displayOrder: number }[]
) {
  // モック: 常に成功
  return { success: true };
}

/**
 * システムで利用可能なすべてのクイックアクセスアイテムを取得（管理者用）
 */
export async function getAllQuickAccessItems() {
  // モック: 全てのクイックアクセスアイテムを返す
  return { success: true, items: mockQuickAccessItems };
}

/**
 * 現在のユーザーのカスタマイズ設定を含む全クイックアクセスアイテムを取得
 * 管理設定画面用（表示・非表示にかかわらず全てのアイテムを取得）
 */
export async function getUserAllQuickAccessItems() {
  // モック: 全アイテムとユーザー設定をマージして返す
  const items = mockQuickAccessItems
    .sort((a, b) => a.display_order - b.display_order)
    .map((item) => {
      const setting = mockAdminQuickAccess.find((u) => u.item_id === item.id);
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        icon: item.icon,
        href: item.href,
        categoryId: item.category_id,
        isDefault: item.is_default ?? false,
        isEnabled: item.is_enabled ?? false,
        systemDisplayOrder: item.display_order,
        userSettingId: setting?.id ?? null,
        isVisible: setting?.is_visible ?? null,
        userDisplayOrder: setting?.display_order ?? null,
      };
    });
  return { success: true, items };
}

/**
 * 新しいクイックアクセスアイテムを管理ユーザーに追加
 */
export async function addQuickAccessItem(itemId: string) {
  // モック: 常に成功
  return { success: true };
}

/**
 * ユーザーのクイックアクセスアイテム設定を削除
 */
export async function removeQuickAccessItem(id: string) {
  // モック: 常に成功
  return { success: true };
}

/**
 * 現在のユーザーがまだ関連付けていないクイックアクセスアイテムを取得
 * （ドラッグアンドドロップUI用）
 */
export async function getUserAvailableQuickAccessItems() {
  // モック: ユーザーに紐づいていないアイテムを返す
  const available = mockQuickAccessItems.filter(
    (item) => !mockAdminQuickAccess.some((u) => u.item_id === item.id)
  );
  const items = available.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    icon: item.icon,
    href: item.href,
    categoryId: item.category_id,
    isDefault: item.is_default ?? false,
    isEnabled: item.is_enabled ?? false,
    systemDisplayOrder: item.display_order,
    userSettingId: null,
    isVisible: null,
    userDisplayOrder: null,
  }));
  return { success: true, items };
}
