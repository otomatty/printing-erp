'use client';

import { Filter, Search } from 'lucide-react';
import Link from 'next/link';

// 顧客対応記録のモックデータ
const interactionsData = [
  {
    id: 'int-001',
    customerId: 'cus-001',
    customerName: '株式会社サンプル',
    contactName: '山田太郎',
    interactionType: '電話',
    subject: '納期確認の問い合わせ',
    date: '2023/06/15 14:30',
    staff: '佐藤',
  },
  {
    id: 'int-002',
    customerId: 'cus-002',
    customerName: '○○商事',
    contactName: '佐藤次郎',
    interactionType: 'メール',
    subject: '価格見積りの依頼',
    date: '2023/06/14 10:15',
    staff: '鈴木',
  },
  {
    id: 'int-003',
    customerId: 'cus-001',
    customerName: '株式会社サンプル',
    contactName: '山田太郎',
    interactionType: '訪問',
    subject: '新規プロジェクト打ち合わせ',
    date: '2023/06/10 13:00',
    staff: '高橋',
  },
  {
    id: 'int-004',
    customerId: 'cus-003',
    customerName: '△△印刷',
    contactName: '鈴木花子',
    interactionType: '電話',
    subject: 'クレーム対応',
    date: '2023/06/08 09:45',
    staff: '佐藤',
  },
  {
    id: 'int-005',
    customerId: 'cus-004',
    customerName: '××デザイン事務所',
    contactName: '高橋一郎',
    interactionType: 'メール',
    subject: '発注確定連絡',
    date: '2023/06/05 16:20',
    staff: '鈴木',
  },
];

export function CustomersInteractions() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="キーワードで検索..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <div className="flex gap-2">
          <select className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2">
            <option value="">すべての顧客</option>
            <option value="cus-001">株式会社サンプル</option>
            <option value="cus-002">○○商事</option>
            <option value="cus-003">△△印刷</option>
            <option value="cus-004">××デザイン事務所</option>
            <option value="cus-005">□□出版</option>
          </select>
          <select className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2">
            <option value="">すべての対応種別</option>
            <option value="電話">電話</option>
            <option value="メール">メール</option>
            <option value="訪問">訪問</option>
            <option value="来社">来社</option>
          </select>
          <button
            type="button"
            className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
          >
            <Filter size={16} />
            詳細条件
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-500 text-sm">
              <th className="px-4 py-3 font-medium">日時</th>
              <th className="px-4 py-3 font-medium">顧客名</th>
              <th className="px-4 py-3 font-medium">担当者</th>
              <th className="px-4 py-3 font-medium">種別</th>
              <th className="px-4 py-3 font-medium">件名</th>
              <th className="px-4 py-3 font-medium">対応者</th>
              <th className="px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {interactionsData.map((interaction) => (
              <tr key={interaction.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{interaction.date}</td>
                <td className="px-4 py-3 font-medium text-primary">
                  <Link href={`/system/customers/${interaction.customerId}`}>
                    {interaction.customerName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm">{interaction.contactName}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      interaction.interactionType === '電話'
                        ? 'bg-blue-100 text-blue-800'
                        : interaction.interactionType === 'メール'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {interaction.interactionType}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{interaction.subject}</td>
                <td className="px-4 py-3 text-sm">{interaction.staff}</td>
                <td className="px-4 py-3 text-sm">
                  <Link
                    href={`/system/customers/interactions/${interaction.id}`}
                    className="text-primary hover:text-blue-800"
                  >
                    詳細
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 px-4">
        <p className="text-sm text-gray-500">
          全{interactionsData.length}件中 1-5件を表示
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 py-1 border rounded-md bg-gray-50 text-gray-400"
            disabled
          >
            前へ
          </button>
          <button
            type="button"
            className="px-3 py-1 border rounded-md bg-white"
          >
            1
          </button>
          <button
            type="button"
            className="px-3 py-1 border rounded-md bg-gray-50"
          >
            2
          </button>
          <button
            type="button"
            className="px-3 py-1 border rounded-md bg-gray-50"
          >
            3
          </button>
          <button
            type="button"
            className="px-3 py-1 border rounded-md bg-gray-50 text-gray-400"
          >
            次へ
          </button>
        </div>
      </div>
    </div>
  );
}
