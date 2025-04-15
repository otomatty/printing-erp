import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Eye,
  BarChart,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

interface Customer {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  lastOrder: string;
}

export default function CustomersPage() {
  // モックデータ
  const customers: Customer[] = [
    {
      id: 'cus-001',
      name: '株式会社サンプル',
      contact: '山田太郎',
      email: 'yamada@sample.co.jp',
      phone: '03-1234-5678',
      lastOrder: '2023/05/15',
    },
    {
      id: 'cus-002',
      name: '○○商事',
      contact: '佐藤次郎',
      email: 'sato@example.com',
      phone: '03-8765-4321',
      lastOrder: '2023/06/20',
    },
    {
      id: 'cus-003',
      name: '△△印刷',
      contact: '鈴木花子',
      email: 'suzuki@example.com',
      phone: '03-2345-6789',
      lastOrder: '2023/06/01',
    },
    {
      id: 'cus-004',
      name: '××デザイン事務所',
      contact: '高橋一郎',
      email: 'takahashi@example.com',
      phone: '03-3456-7890',
      lastOrder: '2023/05/28',
    },
    {
      id: 'cus-005',
      name: '□□出版',
      contact: '田中真理',
      email: 'tanaka@example.com',
      phone: '03-4567-8901',
      lastOrder: '2023/06/15',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Users className="mr-2" />
          顧客管理
        </h1>
        <div className="flex space-x-2">
          <Link
            href="/system/customers/interactions"
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md flex items-center"
          >
            <MessageSquare className="mr-1" size={16} />
            対応記録
          </Link>
          <Link
            href="/system/customers/analytics"
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md flex items-center"
          >
            <BarChart className="mr-1" size={16} />
            顧客分析
          </Link>
          <Link
            href="/system/customers/new"
            className="bg-primary text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus className="mr-1" size={16} />
            新規顧客登録
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="顧客名や担当者名で検索..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
          <select className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">すべての顧客</option>
            <option value="active">アクティブな顧客</option>
            <option value="inactive">非アクティブな顧客</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500 text-sm">
                <th className="px-4 py-3 font-medium">顧客ID</th>
                <th className="px-4 py-3 font-medium">顧客名</th>
                <th className="px-4 py-3 font-medium">担当者</th>
                <th className="px-4 py-3 font-medium">連絡先</th>
                <th className="px-4 py-3 font-medium">最終注文日</th>
                <th className="px-4 py-3 font-medium">アクション</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{customer.id}</td>
                  <td className="px-4 py-3 font-medium">{customer.name}</td>
                  <td className="px-4 py-3 text-sm">{customer.contact}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex flex-col">
                      <span className="flex items-center">
                        <Mail size={14} className="mr-1 text-gray-400" />
                        {customer.email}
                      </span>
                      <span className="flex items-center mt-1">
                        <Phone size={14} className="mr-1 text-gray-400" />
                        {customer.phone}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{customer.lastOrder}</td>
                  <td className="px-4 py-3 text-sm">
                    <Link
                      href={`/system/customers/${customer.id}`}
                      className="text-primary hover:text-blue-800 flex items-center"
                    >
                      <Eye size={16} className="mr-1" />
                      詳細
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 px-4">
          <p className="text-sm text-gray-500">全5件中 1-5件を表示</p>
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
              className="px-3 py-1 border rounded-md bg-gray-50 text-gray-400"
              disabled
            >
              次へ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
