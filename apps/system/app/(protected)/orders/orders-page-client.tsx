'use client';

import {
  ShoppingCart,
  Search,
  Plus,
  Filter,
  ChevronDown,
  Eye,
  FileText,
  Clock,
  CheckCircle,
  X,
  Calendar,
  Package,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';
import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlIndicator,
} from '~/components/custom/segmented-controle';

interface Order {
  id: string;
  customer: string;
  title: string;
  amount: number;
  status: 'pending' | 'in_progress' | 'completed' | 'delivered' | 'canceled';
  createdAt: string;
  deadline: string;
}

export default function OrdersPageClient() {
  const [view, setView] = useState<'list' | 'stats'>('list');

  // モックデータ
  const orders: Order[] = [
    {
      id: 'ORD-2023-0001',
      customer: '株式会社サンプル',
      title: 'チラシ印刷 A4 両面フルカラー 1,000部',
      amount: 27500,
      status: 'in_progress',
      createdAt: '2023/07/05',
      deadline: '2023/07/25',
    },
    {
      id: 'ORD-2023-0002',
      customer: '○○商事',
      title: '名刺印刷 両面フルカラー 100枚',
      amount: 5500,
      status: 'completed',
      createdAt: '2023/07/06',
      deadline: '2023/07/20',
    },
    {
      id: 'ORD-2023-0003',
      customer: '△△印刷',
      title: 'パンフレット A4 8P フルカラー 500部',
      amount: 49500,
      status: 'pending',
      createdAt: '2023/07/10',
      deadline: '2023/08/01',
    },
    {
      id: 'ORD-2023-0004',
      customer: '××デザイン事務所',
      title: 'ポスター B2 片面フルカラー 50枚',
      amount: 33000,
      status: 'delivered',
      createdAt: '2023/06/25',
      deadline: '2023/07/15',
    },
    {
      id: 'ORD-2023-0005',
      customer: '□□出版',
      title: '冊子 A5 32P フルカラー 300部',
      amount: 132000,
      status: 'canceled',
      createdAt: '2023/06/01',
      deadline: '2023/07/01',
    },
  ];

  // ステータスに応じたアイコンとカラーを返す関数
  const getStatusDetails = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock size={16} />,
          color: 'bg-yellow-100 text-yellow-800',
          label: '準備中',
        };
      case 'in_progress':
        return {
          icon: <Package size={16} />,
          color: 'bg-blue-100 text-blue-800',
          label: '製造中',
        };
      case 'completed':
        return {
          icon: <CheckCircle size={16} />,
          color: 'bg-green-100 text-green-800',
          label: '製造完了',
        };
      case 'delivered':
        return {
          icon: <CheckCircle size={16} />,
          color: 'bg-emerald-100 text-emerald-800',
          label: '納品済',
        };
      case 'canceled':
        return {
          icon: <X size={16} />,
          color: 'bg-red-100 text-red-800',
          label: 'キャンセル',
        };
      default:
        return {
          icon: <Clock size={16} />,
          color: 'bg-gray-100 text-gray-800',
          label: '不明',
        };
    }
  };

  // 各ステータスの件数を集計
  const statusCounts = {
    pending: orders.filter((o) => o.status === 'pending').length,
    in_progress: orders.filter((o) => o.status === 'in_progress').length,
    completed: orders.filter((o) => o.status === 'completed').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
  };

  const headerControls = (
    <SegmentedControl
      value={view}
      onValueChange={(value) => setView(value as 'list' | 'stats')}
    >
      <SegmentedControlIndicator />
      <SegmentedControlItem value="list">一覧</SegmentedControlItem>
      <SegmentedControlItem value="stats">統計</SegmentedControlItem>
    </SegmentedControl>
  );

  return (
    <>
      <PageHeader
        title="受注管理"
        description="受注を管理することができます。"
        backLink={{ href: '/', label: 'ホームに戻る' }}
        actions={
          <div className="flex flex-col items-end gap-2">
            {headerControls}
            <div className="flex gap-2">
              <Link href="/quotes">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center"
                >
                  <FileText className="mr-1" size={16} />
                  見積一覧
                </button>
              </Link>
              <Link href="/orders/new">
                <button
                  type="button"
                  className="bg-primary text-white px-4 py-2 rounded-md flex items-center"
                >
                  <Plus className="mr-1" size={16} />
                  新規受注登録
                </button>
              </Link>
            </div>
          </div>
        }
      />

      <Container>
        {view === 'stats' ? (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">準備中</p>
                <p className="text-2xl font-bold">{statusCounts.pending}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Package className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">製造中</p>
                <p className="text-2xl font-bold">{statusCounts.in_progress}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">製造完了</p>
                <p className="text-2xl font-bold">{statusCounts.completed}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div className="bg-emerald-100 p-3 rounded-full mr-4">
                <CheckCircle className="text-emerald-600" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">納品済</p>
                <p className="text-2xl font-bold">{statusCounts.delivered}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    受注ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    顧客
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    タイトル
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    金額
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    作成日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    期限
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => {
                  const { icon, color, label } = getStatusDetails(order.status);
                  return (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        ¥{order.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
                        >
                          {icon}
                          <span className="ml-1">{label}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.deadline}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </>
  );
}
