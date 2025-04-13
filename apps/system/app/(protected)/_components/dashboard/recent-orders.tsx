/**
 * ダッシュボード - 最近の注文コンポーネント
 * 直近の注文一覧を表示
 */
'use client';

import { Clock } from 'lucide-react';

interface RecentOrder {
  id: string;
  title: string;
  customer: string;
  status: string;
  timeAgo: string;
}

export default function DashboardRecentOrders() {
  // モックデータ - 最近の注文
  const recentOrders: RecentOrder[] = [
    {
      id: 'ord-2023-001',
      title: 'チラシ印刷 #2023',
      customer: '株式会社サンプル',
      status: '製作中',
      timeAgo: '2日前',
    },
    {
      id: 'ord-2023-002',
      title: 'チラシ印刷 #2024',
      customer: '○○商事',
      status: '受付済み',
      timeAgo: '2日前',
    },
    {
      id: 'ord-2023-003',
      title: 'チラシ印刷 #2025',
      customer: '△△印刷',
      status: '配送待ち',
      timeAgo: '2日前',
    },
    {
      id: 'ord-2023-004',
      title: 'チラシ印刷 #2026',
      customer: '××デザイン事務所',
      status: '製作中',
      timeAgo: '2日前',
    },
    {
      id: 'ord-2023-005',
      title: 'チラシ印刷 #2027',
      customer: '□□出版',
      status: '受付済み',
      timeAgo: '2日前',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">最近の注文</h2>
      <div className="space-y-3">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between border-b pb-3 last:border-0"
          >
            <div>
              <p className="font-medium">{order.title}</p>
              <p className="text-sm text-gray-500">{order.customer}</p>
            </div>
            <div className="flex items-center">
              <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                {order.status}
              </span>
              <Clock className="ml-2 text-gray-400" size={16} />
              <span className="text-xs text-gray-500 ml-1">
                {order.timeAgo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
