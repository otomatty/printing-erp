'use client';

import { BarChart, LineChart, PieChart } from 'lucide-react';

// 顧客分析データのモック
const topCustomers = [
  {
    id: 'cus-001',
    name: '株式会社サンプル',
    sales: 3250000,
    orders: 15,
    growth: 12.5,
  },
  { id: 'cus-002', name: '○○商事', sales: 2100000, orders: 8, growth: 5.2 },
  { id: 'cus-003', name: '△△印刷', sales: 1850000, orders: 12, growth: -3.8 },
  {
    id: 'cus-004',
    name: '××デザイン事務所',
    sales: 1420000,
    orders: 6,
    growth: 22.4,
  },
  { id: 'cus-005', name: '□□出版', sales: 980000, orders: 5, growth: 8.1 },
];

export function CustomersAnalytics() {
  return (
    <>
      {/* サマリーカード */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-1">登録顧客数</h3>
          <p className="text-2xl font-bold">128</p>
          <p className="text-sm text-green-600 mt-1">+12% 前年比</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-1">アクティブ顧客</h3>
          <p className="text-2xl font-bold">86</p>
          <p className="text-sm text-green-600 mt-1">67% の顧客が活動中</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-1">平均取引額</h3>
          <p className="text-2xl font-bold">¥245,800</p>
          <p className="text-sm text-red-600 mt-1">-3% 前月比</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-1">顧客獲得コスト</h3>
          <p className="text-2xl font-bold">¥48,500</p>
          <p className="text-sm text-green-600 mt-1">-8% 前四半期比</p>
        </div>
      </div>

      {/* グラフエリア */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium flex items-center">
              <LineChart className="mr-2" size={20} />
              売上推移
            </h2>
            <select className="text-sm border rounded p-1">
              <option value="year">年間</option>
              <option value="quarter">四半期</option>
              <option value="month">月間</option>
            </select>
          </div>
          <div className="aspect-video bg-gray-50 flex items-center justify-center">
            <p className="text-gray-400">売上推移グラフ（実装予定）</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium flex items-center">
              <PieChart className="mr-2" size={20} />
              顧客セグメント
            </h2>
            <select className="text-sm border rounded p-1">
              <option value="industry">業種別</option>
              <option value="size">規模別</option>
              <option value="region">地域別</option>
            </select>
          </div>
          <div className="aspect-video bg-gray-50 flex items-center justify-center">
            <p className="text-gray-400">顧客セグメントグラフ（実装予定）</p>
          </div>
        </div>
      </div>

      {/* 売上上位顧客リスト */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium flex items-center">
            <BarChart className="mr-2" size={20} />
            売上上位顧客
          </h2>
          <select className="text-sm border rounded p-1">
            <option value="sales">売上高順</option>
            <option value="orders">注文数順</option>
            <option value="growth">成長率順</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-2 text-sm font-medium text-gray-500">
                  顧客名
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-500">
                  売上高
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-500">
                  注文数
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-500">
                  前年比成長率
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{customer.name}</td>
                  <td className="px-4 py-3">
                    ¥{customer.sales.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{customer.orders}件</td>
                  <td
                    className={`px-4 py-3 ${customer.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {customer.growth >= 0 ? '+' : ''}
                    {customer.growth}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 注目顧客セクション */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2">フォローが必要な顧客</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-2">
              <p className="font-medium">××デザイン事務所</p>
              <p className="text-sm text-gray-500">
                最終取引から3ヶ月経過。定期発注が途絶えています。
              </p>
            </li>
            <li className="py-2">
              <p className="font-medium">□□出版</p>
              <p className="text-sm text-gray-500">
                問い合わせに対する返信待ち。納期についての懸念あり。
              </p>
            </li>
            <li className="py-2">
              <p className="font-medium">△△印刷</p>
              <p className="text-sm text-gray-500">
                前回の注文で品質クレームあり。フォローアップが必要。
              </p>
            </li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2">新規・追加販売機会</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-2">
              <p className="font-medium">株式会社サンプル</p>
              <p className="text-sm text-gray-500">
                カタログ印刷を定期発注中。関連するポスター制作も提案可能。
              </p>
            </li>
            <li className="py-2">
              <p className="font-medium">○○商事</p>
              <p className="text-sm text-gray-500">
                新製品発表会を計画中。販促資材の一括受注の可能性あり。
              </p>
            </li>
            <li className="py-2">
              <p className="font-medium">△△印刷</p>
              <p className="text-sm text-gray-500">
                現在の外注先に不満あり。工程管理のアウトソーシング提案可能。
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
