/**
 * ダッシュボード - ステータスカードコンポーネント
 * 主要指標を表示するカード群
 */
'use client';

import { FileText, Users, Package, Calendar } from 'lucide-react';

export default function DashboardStats() {
  // 実際のシステムでは、ここでデータを取得します
  const mockStats = {
    pendingOrders: 12,
    activeCustomers: 48,
    lowStockItems: 5,
    scheduledJobs: 8,
  };

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">統計</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">未処理の注文</p>
              <p className="text-3xl font-bold mt-1">
                {mockStats.pendingOrders}
              </p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <FileText className="text-primary" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <a href="/orders" className="text-sm text-primary hover:underline">
              すべての注文を見る →
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">アクティブな顧客</p>
              <p className="text-3xl font-bold mt-1">
                {mockStats.activeCustomers}
              </p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <Users className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <a
              href="/customers"
              className="text-sm text-green-600 hover:underline"
            >
              顧客リストを見る →
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">在庫が少ない商品</p>
              <p className="text-3xl font-bold mt-1">
                {mockStats.lowStockItems}
              </p>
            </div>
            <div className="bg-yellow-100 p-2 rounded-full">
              <Package className="text-yellow-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <a
              href="/inventory"
              className="text-sm text-yellow-600 hover:underline"
            >
              在庫管理へ →
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">予定されている作業</p>
              <p className="text-3xl font-bold mt-1">
                {mockStats.scheduledJobs}
              </p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <Calendar className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <a
              href="/production"
              className="text-sm text-purple-600 hover:underline"
            >
              生産スケジュールを見る →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
