'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, type LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Card, CardContent } from '@kit/ui/card';

// ユーザーに関連付けられたアイテム
export interface QuickAccessItem {
  id: string;
  itemId: string;
  isVisible: boolean | null;
  displayOrder: number;
  title: string;
  description: string;
  icon: string;
  href: string;
  categoryId: string;
}

// 利用可能なアイテム（未関連付け）
export interface AvailableQuickAccessItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  categoryId: string;
  isDefault: boolean | null;
  isEnabled: boolean | null;
  systemDisplayOrder: number;
  userSettingId: string | null;
  isVisible: boolean | null;
  userDisplayOrder: number | null;
}

interface SortableItemProps {
  item: QuickAccessItem | AvailableQuickAccessItem;
  section: 'user-items' | 'available-items';
}

type IconType = keyof typeof LucideIcons;

export function SortableQuickAccessItem({ item, section }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `${section}-${item.id}`,
    data: {
      item,
      section,
      sortable: {
        containerId: `Sortable-${section === 'user-items' ? 1 : 2}`,
        index: 0,
        items: [],
      },
    },
  });

  // アイコン名から実際のコンポーネントを取得
  const getIconComponent = (iconName: string): React.ReactNode => {
    const Icon = LucideIcons[iconName as IconType] as LucideIcon;
    return Icon ? <Icon size={24} /> : <Plus size={24} />;
  };

  // カテゴリIDに基づいた色クラスを取得
  const getCategoryColor = (categoryId: string): string => {
    const colorMap: Record<string, string> = {
      sales: 'bg-blue-100 text-primary',
      design: 'bg-purple-100 text-purple-600',
      production: 'bg-green-100 text-green-600',
      shipping: 'bg-amber-100 text-amber-600',
      admin: 'bg-gray-200 text-gray-700',
    };

    return colorMap[categoryId] || 'bg-gray-100 text-gray-600';
  };

  // セクションに基づいたボーダーの色クラス
  const getBorderClass = () => {
    if (isDragging) return 'border-blue-400 border-2 shadow-lg';
    return section === 'user-items'
      ? 'border-gray-200'
      : 'border-gray-200 border-dashed';
  };

  // ドラッグ中の透明度
  const getOpacityStyle = () => {
    if (isDragging) return 0.4; // ドラッグ中は薄く表示（元の位置で）
    return 1;
  };

  return (
    <Card
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: getOpacityStyle(),
        zIndex: isDragging ? 999 : 1,
      }}
      className={`bg-white p-0 relative group ${getBorderClass()} hover:shadow-md transition-all duration-200`}
      data-section={section}
      data-item-id={item.id}
    >
      {/* ドラッグハンドル - 常に表示するように変更 */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 cursor-grab active:cursor-grabbing bg-gray-50 rounded-full p-1 opacity-50 group-hover:opacity-100 transition-opacity z-10"
      >
        <GripVertical size={16} className="text-gray-400" />
      </div>

      <CardContent className="flex flex-col items-center p-4 text-center">
        <div
          className={`p-3 rounded-full ${getCategoryColor(item.categoryId)} mb-3`}
        >
          {getIconComponent(item.icon)}
        </div>
        <h3 className="font-medium text-sm">{item.title}</h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {item.description}
        </p>
      </CardContent>
    </Card>
  );
}
