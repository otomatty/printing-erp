/**
 * ダッシュボード - クイックアクセスコンポーネント
 * よく使う機能へのショートカットを表示
 */
'use client';

import { useState } from 'react';
import { Plus, Settings, type LucideIcon, PackagePlus } from 'lucide-react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { Button } from '@kit/ui/button';
import { QuickAccessEdit } from './quick-access-edit';
import type { QuickAccessItem } from './sortable-quick-access-item';
import { useRouter } from 'next/navigation';

interface DashboardQuickAccessProps {
  quickAccessItems: QuickAccessItem[];
}

// Lucideアイコンの動的インポート用マッピング
type IconType = keyof typeof LucideIcons;

export default function DashboardQuickAccess({
  quickAccessItems,
}: DashboardQuickAccessProps) {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [items, setItems] = useState(quickAccessItems);

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

  // 編集モードの完了処理
  const handleEditComplete = (updatedItems: QuickAccessItem[]) => {
    setItems(updatedItems);
    setIsEditMode(false);
    router.refresh();
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">よく使う機能</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditMode(!isEditMode)}
        >
          <Settings className="mr-2 h-4 w-4" />
          {isEditMode ? 'プレビュー' : 'カスタマイズ'}
        </Button>
      </div>

      {isEditMode ? (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <QuickAccessEdit items={items} onComplete={handleEditComplete} />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow text-center">
          <PackagePlus size={48} className="mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">
            よく使う機能を追加しよう
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            よく使う機能を登録すると、この場所からすぐにアクセスできます。
          </p>
          <Button onClick={() => setIsEditMode(true)}>追加する</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center text-center"
            >
              <div
                className={`p-3 rounded-full ${getCategoryColor(item.categoryId)} mb-3`}
              >
                {getIconComponent(item.icon)}
              </div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
