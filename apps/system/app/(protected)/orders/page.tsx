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

interface Order {
  id: string;
  customer: string;
  title: string;
  amount: number;
  status: 'pending' | 'in_progress' | 'completed' | 'delivered' | 'canceled';
  createdAt: string;
  deadline: string;
}

export default function OrdersPage() {
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
    pending: orders.filter((order) => order.status === 'pending').length,
    in_progress: orders.filter((order) => order.status === 'in_progress')
      .length,
    completed: orders.filter((order) => order.status === 'completed').length,
    delivered: orders.filter((order) => order.status === 'delivered').length,
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <ShoppingCart className="mr-2" />
          受注管理
        </h1>
        <div className="flex gap-2">
          <Link href="/system/quotes">
            <button
              type="button"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center"
            >
              <FileText className="mr-1" size={16} />
              見積一覧
            </button>
          </Link>
          <Link href="/system/orders/new">
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

      {/* 統計カード */}
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

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="受注番号、顧客名、タイトルで検索..."
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
              <option value="pending">準備中</option>
              <option value="in_progress">製造中</option>
              <option value="completed">製造完了</option>
              <option value="delivered">納品済</option>
              <option value="canceled">キャンセル</option>
            </select>

            <button
              type="button"
              className="border px-4 py-2 rounded-md flex items-center hover:bg-gray-50"
            >
              <Calendar size={16} className="mr-1 text-gray-500" />
              納期順
            </button>

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
                <th className="px-4 py-3 font-medium">受注番号</th>
                <th className="px-4 py-3 font-medium">顧客名</th>
                <th className="px-4 py-3 font-medium">タイトル</th>
                <th className="px-4 py-3 font-medium">金額</th>
                <th className="px-4 py-3 font-medium">ステータス</th>
                <th className="px-4 py-3 font-medium">受注日</th>
                <th className="px-4 py-3 font-medium">納期</th>
                <th className="px-4 py-3 font-medium">アクション</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => {
                const { icon, color, label } = getStatusDetails(order.status);

                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 text-sm">{order.customer}</td>
                    <td className="px-4 py-3 text-sm">{order.title}</td>
                    <td className="px-4 py-3 text-sm">
                      ¥{order.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`flex items-center gap-1 px-2 py-1 rounded-full ${color} text-xs`}
                      >
                        {icon}
                        {label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{order.createdAt}</td>
                    <td className="px-4 py-3 text-sm">{order.deadline}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <Link href={`/system/orders/${order.id}`}>
                          <button
                            type="button"
                            className="text-primary hover:text-blue-800 flex items-center"
                            title="詳細"
                          >
                            <Eye size={16} />
                          </button>
                        </Link>
                        <Link href={`/system/orders/${order.id}/process`}>
                          <button
                            type="button"
                            className="text-gray-600 hover:text-gray-800 flex items-center"
                            title="工程管理"
                          >
                            <Package size={16} />
                          </button>
                        </Link>
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
  );
}
