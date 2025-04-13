/**
 * ダッシュボード - クイックアクセスコンポーネント
 * よく使う機能へのショートカットを表示
 */
'use client';

import {
  Plus,
  Search,
  Printer,
  Calculator,
  ClipboardList,
  CreditCard,
} from 'lucide-react';

interface QuickAccess {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

export default function DashboardQuickAccess() {
  // クイックアクセスアイテム
  const quickAccessItems: QuickAccess[] = [
    {
      id: 'qa-1',
      title: '新規注文',
      description: '注文情報を登録',
      icon: <Plus size={24} />,
      href: '/system/orders/new',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 'qa-2',
      title: '顧客検索',
      description: '顧客情報を検索',
      icon: <Search size={24} />,
      href: '/system/customers',
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 'qa-3',
      title: '印刷予定',
      description: '今日の印刷スケジュール',
      icon: <Printer size={24} />,
      href: '/system/production',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      id: 'qa-4',
      title: '見積作成',
      description: '新規見積りを作成',
      icon: <Calculator size={24} />,
      href: '/system/quotes/new',
      color: 'bg-amber-100 text-amber-600',
    },
    {
      id: 'qa-5',
      title: '在庫確認',
      description: '在庫状況を確認',
      icon: <ClipboardList size={24} />,
      href: '/system/inventory',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      id: 'qa-6',
      title: '請求書発行',
      description: '請求書の作成と管理',
      icon: <CreditCard size={24} />,
      href: '/system/billing',
      color: 'bg-red-100 text-red-600',
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">クイックアクセス</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickAccessItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center text-center"
          >
            <div className={`p-3 rounded-full ${item.color} mb-3`}>
              {item.icon}
            </div>
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
