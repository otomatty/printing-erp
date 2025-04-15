import {
  MessageSquare,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Mail,
  Phone,
  PlusCircle,
  BarChart,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@kit/ui/button';
import {
  fetchInquiries,
  fetchInquiryStats,
  getStatusDetails,
  getPriorityDetails,
  type Inquiry,
} from './_data';

export const dynamic = 'force-dynamic';

export default async function InquiriesPage() {
  // データの取得
  const [inquiries, stats] = await Promise.all([
    fetchInquiries(),
    fetchInquiryStats(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <MessageSquare className="mr-2" />
          お問い合わせ管理
        </h1>
        <div className="flex gap-2">
          <Link href="/system/inquiries/reports">
            <Button variant="outline">
              <BarChart className="h-4 w-4 mr-2" />
              レポート
            </Button>
          </Link>
          <Link href="/system/inquiries/new">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              新規作成
            </Button>
          </Link>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <MessageSquare className="text-primary" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">全件数</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="bg-yellow-100 p-3 rounded-full mr-4">
            <MessageSquare className="text-yellow-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">対応中</p>
            <p className="text-2xl font-bold">{stats.by_status.in_progress}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <MessageSquare className="text-red-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">未対応</p>
            <p className="text-2xl font-bold">{stats.by_status.new}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="問い合わせ番号、名前、メールで検索..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="border px-4 py-2 rounded-md flex items-center hover:bg-gray-50"
            >
              <Filter size={16} className="mr-1 text-gray-500" />
              絞り込み
            </button>

            <select className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">すべてのステータス</option>
              <option value="new">新規</option>
              <option value="in_progress">対応中</option>
              <option value="waiting">回答待ち</option>
              <option value="resolved">解決済み</option>
              <option value="closed">完了</option>
            </select>

            <select className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">すべての優先度</option>
              <option value="urgent">緊急</option>
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>

            <button
              type="button"
              className="border px-4 py-2 rounded-md flex items-center hover:bg-gray-50"
            >
              <span>日付順</span>
              <ChevronDown size={16} className="ml-1 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500 text-sm">
                <th className="px-4 py-3 font-medium">問い合わせ番号</th>
                <th className="px-4 py-3 font-medium">お名前</th>
                <th className="px-4 py-3 font-medium">連絡先</th>
                <th className="px-4 py-3 font-medium">件名</th>
                <th className="px-4 py-3 font-medium">ステータス</th>
                <th className="px-4 py-3 font-medium">優先度</th>
                <th className="px-4 py-3 font-medium">日付</th>
                <th className="px-4 py-3 font-medium">担当者</th>
                <th className="px-4 py-3 font-medium">アクション</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inquiries.map((inquiry) => {
                const { label: statusLabel, color: statusColor } =
                  getStatusDetails(inquiry.status);
                const { label: priorityLabel, color: priorityColor } =
                  getPriorityDetails(inquiry.priority);

                return (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">
                      <Link
                        href={`/system/inquiries/${inquiry.id}`}
                        className="text-gray-900 hover:text-primary"
                      >
                        {inquiry.id}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {inquiry.customer_name}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex flex-col">
                        <span className="flex items-center">
                          <Mail size={14} className="mr-1 text-gray-400" />
                          {inquiry.customer_email}
                        </span>
                        {inquiry.customer_phone && (
                          <span className="flex items-center mt-1">
                            <Phone size={14} className="mr-1 text-gray-400" />
                            {inquiry.customer_phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td
                      className="px-4 py-3 text-sm max-w-xs truncate"
                      title={inquiry.subject}
                    >
                      <Link
                        href={`/system/inquiries/${inquiry.id}`}
                        className="text-gray-900 hover:text-primary"
                      >
                        {inquiry.subject}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full ${statusColor} text-xs`}
                      >
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full ${priorityColor} text-xs`}
                      >
                        {priorityLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(inquiry.created_at).toLocaleDateString('ja-JP')}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {inquiry.assigned_to_name || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Link
                        href={`/system/inquiries/${inquiry.id}`}
                        className="text-primary hover:text-blue-800 flex items-center"
                      >
                        <Eye size={16} className="mr-1" />
                        詳細
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 px-4">
          <p className="text-sm text-gray-500">
            全{inquiries.length}件中 1-{Math.min(10, inquiries.length)}件を表示
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
