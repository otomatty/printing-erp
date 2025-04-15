import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Plus } from 'lucide-react';
import type {
  QuickAccessItem,
  AvailableQuickAccessItem,
} from './sortable-quick-access-item';

/**
 * ドラッグ＆ドロップで操作する際のデータ型
 */
export type DragItemData = {
  item: QuickAccessItem | AvailableQuickAccessItem;
  section: 'user-items' | 'available-items';
};

/**
 * 非同期更新用のデータ型
 */
export type PendingUpdateData =
  | { type: 'add'; data: string }
  | { type: 'remove'; data: string }
  | { type: 'reorder'; data: { id: string; displayOrder: number }[] };

/**
 * IDプレフィックスを正確に削除する関数
 */
export function extractItemId(fullId: string): string {
  // 既知のプレフィックスパターン
  const prefixes = ['user-items-', 'available-items-'];

  // いずれかのプレフィックスで始まる場合は削除
  for (const prefix of prefixes) {
    if (fullId.startsWith(prefix)) {
      return fullId.substring(prefix.length);
    }
  }

  // プレフィックスがない場合はそのまま返す
  return fullId;
}

/**
 * アイコン名から実際のコンポーネントを取得
 */
export function getIconComponent(iconName: string, size = 24): React.ReactNode {
  const IconType = iconName as keyof typeof LucideIcons;
  const Icon = LucideIcons[IconType] as LucideIcon;
  return Icon ? <Icon size={size} /> : <Plus size={size} />;
}

/**
 * カテゴリIDに基づいた色クラスを取得
 */
export function getCategoryColor(categoryId: string): string {
  const colorMap: Record<string, string> = {
    sales: 'bg-blue-100 text-primary',
    design: 'bg-purple-100 text-purple-600',
    production: 'bg-green-100 text-green-600',
    shipping: 'bg-amber-100 text-amber-600',
    admin: 'bg-gray-200 text-gray-700',
  };

  return colorMap[categoryId] || 'bg-gray-100 text-gray-600';
}

/**
 * セクション識別子をIDから抽出
 */
export function getSectionFromId(
  id: string
): 'user-items' | 'available-items' | string {
  return id.startsWith('user-items')
    ? 'user-items'
    : id.startsWith('available-items')
      ? 'available-items'
      : id;
}

/**
 * 削除されたアイテムを「追加可能なアイテム」形式に変換
 */
export function convertToAvailableItem(
  removedItem: QuickAccessItem
): AvailableQuickAccessItem {
  return {
    id: removedItem.itemId,
    title: removedItem.title,
    description: removedItem.description,
    icon: removedItem.icon,
    href: removedItem.href,
    categoryId: removedItem.categoryId,
    isDefault: false,
    isEnabled: true,
    systemDisplayOrder: 0,
    userSettingId: null,
    isVisible: null,
    userDisplayOrder: null,
  };
}

/**
 * アイテムの表示順序を更新
 */
export function updateItemDisplayOrders(
  items: QuickAccessItem[]
): { id: string; displayOrder: number }[] {
  return items.map((item, index) => ({
    id: item.id,
    displayOrder: index + 1,
  }));
}
