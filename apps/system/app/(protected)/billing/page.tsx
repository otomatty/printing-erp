import {
  ArrowUpDown,
  Check,
  Clock,
  CreditCard,
  Download,
  Eye,
  FileText,
  Filter,
  Plus,
  Search,
  Settings,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import { Card } from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';

// 請求書のモックデータ
const invoices = [
  {
    id: 'INV-2023-0001',
    customer: '株式会社サンプル',
    orderId: 'ORD-2023-0001',
    title: 'チラシ印刷 A4 両面フルカラー 1,000部',
    status: 'paid',
    amount: 27500,
    issuedAt: '2023/07/26',
    dueDate: '2023/08/31',
    paidAt: '2023/08/15',
  },
  {
    id: 'INV-2023-0002',
    customer: '××デザイン事務所',
    orderId: 'ORD-2023-0006',
    title: '会社案内パンフレット A4 12P 500部',
    status: 'sent',
    amount: 165000,
    issuedAt: '2023/07/23',
    dueDate: '2023/08/31',
    paidAt: null,
  },
  {
    id: 'INV-2023-0003',
    customer: '□□出版',
    orderId: 'ORD-2023-0007',
    title: '雑誌広告 1P',
    status: 'sent',
    amount: 220000,
    issuedAt: '2023/07/21',
    dueDate: '2023/08/20',
    paidAt: null,
  },
  {
    id: 'INV-2023-0004',
    customer: '○○商会',
    orderId: 'ORD-2023-0008',
    title: 'ポスター B1 片面カラー 10枚',
    status: 'overdue',
    amount: 33000,
    issuedAt: '2023/07/19',
    dueDate: '2023/08/18',
    paidAt: null,
  },
  {
    id: 'INV-2023-0005',
    customer: '◇◇カンパニー',
    orderId: 'ORD-2023-0009',
    title: '名刺 両面フルカラー 10名様分',
    status: 'draft',
    amount: 22000,
    issuedAt: null,
    dueDate: null,
    paidAt: null,
  },
];

// ステータスに応じたアイコンとカラーを返す関数
const getStatusDetails = (status: string) => {
  switch (status) {
    case 'draft':
      return {
        icon: <FileText size={16} />,
        color: 'bg-gray-100 text-gray-800',
        label: '下書き',
      };
    case 'sent':
      return {
        icon: <Check size={16} />,
        color: 'bg-blue-100 text-blue-800',
        label: '送信済み',
      };
    case 'paid':
      return {
        icon: <Check size={16} />,
        color: 'bg-green-100 text-green-800',
        label: '入金済み',
      };
    case 'overdue':
      return {
        icon: <X size={16} />,
        color: 'bg-red-100 text-red-800',
        label: '期限超過',
      };
    case 'canceled':
      return {
        icon: <X size={16} />,
        color: 'bg-orange-100 text-orange-800',
        label: 'キャンセル',
      };
    default:
      return {
        icon: <FileText size={16} />,
        color: 'bg-gray-100 text-gray-800',
        label: '不明',
      };
  }
};

// ステータスによる請求書のグループ化
const draftInvoices = invoices.filter((invoice) => invoice.status === 'draft');
const sentInvoices = invoices.filter((invoice) => invoice.status === 'sent');
const paidInvoices = invoices.filter((invoice) => invoice.status === 'paid');
const overdueInvoices = invoices.filter(
  (invoice) => invoice.status === 'overdue'
);

// 売掛金額の計算
const totalReceivables = invoices
  .filter((invoice) => ['sent', 'overdue'].includes(invoice.status))
  .reduce((sum, invoice) => sum + invoice.amount, 0);

export default function BillingPage() {
  return (
    <div className="space-y-6 p-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">請求・入金管理</h1>
        <div className="flex gap-2">
          <Link href="/system/billing/new">
            <Button variant="default" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              新規請求書作成
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            設定
          </Button>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center">
          <div className="bg-gray-100 p-3 rounded-full mr-4">
            <FileText className="text-gray-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">下書き</p>
            <p className="text-2xl font-bold">{draftInvoices.length}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Clock className="text-primary" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">送信済み</p>
            <p className="text-2xl font-bold">{sentInvoices.length}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <X className="text-red-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">期限超過</p>
            <p className="text-2xl font-bold">{overdueInvoices.length}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <CreditCard className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">売掛金合計</p>
            <p className="text-2xl font-bold">
              ¥{totalReceivables.toLocaleString()}
            </p>
          </div>
        </Card>
      </div>

      {/* 検索・フィルターツールバー */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Input
            type="text"
            placeholder="請求番号、顧客名、タイトルで検索..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            フィルタ
          </Button>

          <select className="h-9 rounded-md border border-input px-3 py-1 text-sm">
            <option value="all">すべての請求書</option>
            <option value="draft">下書き</option>
            <option value="sent">送信済み</option>
            <option value="paid">入金済み</option>
            <option value="overdue">期限超過</option>
          </select>

          <select className="h-9 rounded-md border border-input px-3 py-1 text-sm">
            <option value="latest">新しい順</option>
            <option value="oldest">古い順</option>
            <option value="amount">金額順</option>
            <option value="dueDate">期限順</option>
          </select>
        </div>
      </div>

      {/* 請求書テーブル */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">請求番号</TableHead>
            <TableHead>顧客名</TableHead>
            <TableHead>タイトル</TableHead>
            <TableHead>
              <div className="flex items-center">
                ステータス
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-right">
              <div className="flex items-center justify-end">
                金額
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="w-[100px]">
              <div className="flex items-center">
                発行日
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="w-[100px]">
              <div className="flex items-center">
                支払期限
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="w-[120px]">アクション</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => {
            const { icon, color, label } = getStatusDetails(invoice.status);
            return (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-2">{invoice.title}</span>
                    {invoice.status === 'overdue' && (
                      <Badge className="bg-red-500">期限超過</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={color
                      .replace('bg-', 'bg-')
                      .replace('text-', 'text-')}
                  >
                    {label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ¥{invoice.amount.toLocaleString()}
                </TableCell>
                <TableCell>{invoice.issuedAt || '-'}</TableCell>
                <TableCell
                  className={
                    invoice.status === 'overdue'
                      ? 'text-red-600 font-medium'
                      : ''
                  }
                >
                  {invoice.dueDate || '-'}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Link href={`/system/billing/${invoice.id}`}>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                    {invoice.status === 'sent' && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-green-600"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
