/**
 * ダッシュボード - 売上グラフコンポーネント
 * 月次売上のグラフを表示（現在はプレースホルダー）
 */
'use client';

import { BarChart } from 'lucide-react';

export default function DashboardSalesChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">月次売上</h2>
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded border">
        <div className="text-center">
          <BarChart size={48} className="mx-auto text-gray-400" />
          <p className="mt-2 text-gray-500">
            グラフデータはプロトタイプでは表示されません
          </p>
        </div>
      </div>
    </div>
  );
}
