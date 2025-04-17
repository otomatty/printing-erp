import {
  Calculator,
  Search,
  Plus,
  Filter,
  ChevronDown,
  Eye,
  Download,
  Clock,
  CheckCircle,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { Container } from '~/components/custom/container';

interface Quote {
  id: string;
  customer: string;
  title: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  createdAt: string;
  validUntil: string;
}

export default function QuotesPage() {
  // モックデータ
  const quotes: Quote[] = [
    {
      id: 'QT-2023-0001',
      customer: '株式会社サンプル',
      title: 'チラシ印刷 A4 両面フルカラー 1,000部',
      amount: 25000,
      status: 'accepted',
      createdAt: '2023/07/01',
      validUntil: '2023/07/31',
    },
    {
      id: 'QT-2023-0002',
      customer: '○○商事',
      title: '名刺印刷 両面フルカラー 100枚',
      amount: 5000,
      status: 'sent',
      createdAt: '2023/07/04',
      validUntil: '2023/08/04',
    },
    {
      id: 'QT-2023-0003',
      customer: '△△印刷',
      title: 'パンフレット A4 8P フルカラー 500部',
      amount: 45000,
      status: 'draft',
      createdAt: '2023/07/05',
      validUntil: '2023/08/05',
    },
    {
      id: 'QT-2023-0004',
      customer: '××デザイン事務所',
      title: 'ポスター B2 片面フルカラー 50枚',
      amount: 30000,
      status: 'rejected',
      createdAt: '2023/06/20',
      validUntil: '2023/07/20',
    },
    {
      id: 'QT-2023-0005',
      customer: '□□出版',
      title: '冊子 A5 32P フルカラー 300部',
      amount: 120000,
      status: 'expired',
      createdAt: '2023/05/15',
      validUntil: '2023/06/15',
    },
  ];

  // ステータスに応じたアイコンとカラーを返す関数
  const getStatusDetails = (status: Quote['status']) => {
    switch (status) {
      case 'draft':
        return {
          icon: <Clock size={16} />,
          color: 'bg-gray-100 text-gray-800',
          label: '下書き',
        };
      case 'sent':
        return {
          icon: <CheckCircle size={16} />,
          color: 'bg-blue-100 text-blue-800',
          label: '送信済み',
        };
      case 'accepted':
        return {
          icon: <CheckCircle size={16} />,
          color: 'bg-green-100 text-green-800',
          label: '承認済み',
        };
      case 'rejected':
        return {
          icon: <X size={16} />,
          color: 'bg-red-100 text-red-800',
          label: '却下',
        };
      case 'expired':
        return {
          icon: <Clock size={16} />,
          color: 'bg-orange-100 text-orange-800',
          label: '期限切れ',
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
    <Container>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Calculator className="mr-2" />
            見積り管理
          </h1>
          <Link href="/system/quotes/new">
            <button
              type="button"
              className="bg-primary text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus className="mr-1" size={16} />
              新規見積り作成
            </button>
          </Link>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Calculator className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">今月の見積り数</p>
              <p className="text-2xl font-bold">4</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">承認率</p>
              <p className="text-2xl font-bold">75%</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">未対応見積り</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="見積番号、顧客名、タイトルで検索..."
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
                <option value="draft">下書き</option>
                <option value="sent">送信済み</option>
                <option value="accepted">承認済み</option>
                <option value="rejected">却下</option>
                <option value="expired">期限切れ</option>
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
                  <th className="px-4 py-3 font-medium">タイトル</th>
                  <th className="px-4 py-3 font-medium">金額</th>
                  <th className="px-4 py-3 font-medium">ステータス</th>
                  <th className="px-4 py-3 font-medium">作成日</th>
                  <th className="px-4 py-3 font-medium">有効期限</th>
                  <th className="px-4 py-3 font-medium">アクション</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {quotes.map((quote) => {
                  const { icon, color, label } = getStatusDetails(quote.status);

                  return (
                    <tr key={quote.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">
                        {quote.id}
                      </td>
                      <td className="px-4 py-3 text-sm">{quote.customer}</td>
                      <td className="px-4 py-3 text-sm">{quote.title}</td>
                      <td className="px-4 py-3 text-sm">
                        ¥{quote.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`flex items-center gap-1 px-2 py-1 rounded-full ${color} text-xs`}
                        >
                          {icon}
                          {label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{quote.createdAt}</td>
                      <td className="px-4 py-3 text-sm">{quote.validUntil}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <Link href={`/system/quotes/${quote.id}`}>
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
    </Container>
  );
}
