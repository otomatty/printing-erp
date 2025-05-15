'use client';

import { useState } from 'react';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';
import {
  Calculator,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Download,
  Clock,
  CheckCircle,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { EstimateDialog } from './_components/estimate-dialog';

interface Estimate {
  id: string;
  estimateNumber: string;
  customerName: string;
  projectName: string;
  totalAmount: number;
  status: 'DRAFT' | 'SENT' | 'APPROVED' | 'REJECTED' | 'EXPIRED' | 'ORDERED';
  issueDate: string;
  validUntil: string | null;
}

interface EstimatesPageClientProps {
  estimates: Estimate[];
}

export default function EstimatesPageClient({
  estimates,
}: EstimatesPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Estimate['status'] | ''>('');

  const filteredEstimates = estimates.filter((est) => {
    if (statusFilter && est.status !== statusFilter) return false;
    const lower = searchTerm.toLowerCase();
    if (
      searchTerm &&
      !est.estimateNumber.toLowerCase().includes(lower) &&
      !est.customerName.toLowerCase().includes(lower) &&
      !est.projectName.toLowerCase().includes(lower)
    ) {
      return false;
    }
    return true;
  });

  const getStatusDetails = (status: Estimate['status']) => {
    switch (status) {
      case 'DRAFT':
        return {
          icon: <Clock size={16} />,
          color: 'bg-gray-100 text-gray-800',
          label: '下書き',
        };
      case 'SENT':
        return {
          icon: <CheckCircle size={16} />,
          color: 'bg-blue-100 text-blue-800',
          label: '送信済み',
        };
      case 'APPROVED':
        return {
          icon: <CheckCircle size={16} />,
          color: 'bg-green-100 text-green-800',
          label: '承認済み',
        };
      case 'REJECTED':
        return {
          icon: <X size={16} />,
          color: 'bg-red-100 text-red-800',
          label: '却下',
        };
      case 'EXPIRED':
        return {
          icon: <Clock size={16} />,
          color: 'bg-orange-100 text-orange-800',
          label: '期限切れ',
        };
      case 'ORDERED':
        return {
          icon: <CheckCircle size={16} />,
          color: 'bg-purple-100 text-purple-800',
          label: '受注済み',
        };
      default:
        return {
          icon: <Clock size={16} />,
          color: 'bg-gray-100 text-gray-800',
          label: '不明',
        };
    }
  };

  return (
    <>
      <PageHeader
        title="見積り管理"
        description="見積りを管理することができます。"
        backLink={{ href: '/', label: 'ホームに戻る' }}
        actions={<EstimateDialog />}
      />
      <Container>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Calculator className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">見積り数</p>
                <p className="text-2xl font-bold">{filteredEstimates.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="relative flex-1 min-w-[200px]">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="見積番号、顧客名、プロジェクト名で検索..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
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

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as Estimate['status'] | '')
                  }
                  className="border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-primary"
                >
                  <option value="">すべてのステータス</option>
                  <option value="DRAFT">下書き</option>
                  <option value="SENT">送信済み</option>
                  <option value="APPROVED">承認済み</option>
                  <option value="REJECTED">却下</option>
                  <option value="EXPIRED">期限切れ</option>
                  <option value="ORDERED">受注済み</option>
                </select>

                <button
                  type="button"
                  className="border px-4 py-2 rounded-md flex items-center hover:bg-gray-50"
                >
                  <span>作成日順</span>
                  <ChevronDown size={16} className="ml-1 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead className="bg-gray-50">
                  <tr className="text-left text-gray-500 text-sm">
                    <th className="px-4 py-3 font-medium">見積番号</th>
                    <th className="px-4 py-3 font-medium">顧客名</th>
                    <th className="px-4 py-3 font-medium">プロジェクト名</th>
                    <th className="px-4 py-3 font-medium">金額</th>
                    <th className="px-4 py-3 font-medium">ステータス</th>
                    <th className="px-4 py-3 font-medium">発行日</th>
                    <th className="px-4 py-3 font-medium">有効期限</th>
                    <th className="px-4 py-3 font-medium">アクション</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEstimates.map((est) => {
                    const { icon, color, label } = getStatusDetails(est.status);
                    return (
                      <tr key={est.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium">
                          {est.estimateNumber}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {est.customerName}
                        </td>
                        <td className="px-4 py-3 text-sm">{est.projectName}</td>
                        <td className="px-4 py-3 text-sm">
                          ¥{est.totalAmount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`flex items-center gap-1 px-2 py-1 rounded-full ${color} text-xs`}
                          >
                            {icon}
                            {label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {new Date(est.issueDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {est.validUntil
                            ? new Date(est.validUntil).toLocaleDateString()
                            : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex gap-2">
                            <Link href={`/estimates/${est.id}` as string}>
                              <button
                                type="button"
                                className="text-primary hover:text-blue-800 flex items-center"
                                title="詳細"
                              >
                                <Eye size={16} />
                              </button>
                            </Link>
                            <button
                              type="button"
                              className="text-gray-600 hover:text-gray-800 flex items-center"
                              title="PDFダウンロード"
                            >
                              <Download size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4 px-4">
              <p className="text-sm text-gray-500">
                全{filteredEstimates.length}件中 1-{filteredEstimates.length}
                件を表示
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
      </Container>
    </>
  );
}
