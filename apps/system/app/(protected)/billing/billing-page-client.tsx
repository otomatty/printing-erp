'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';
import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlIndicator,
} from '~/components/custom/segmented-controle';
import { Button } from '@kit/ui/button';
import { Input } from '@kit/ui/input';
import { Badge } from '@kit/ui/badge';
import { Card } from '@kit/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@kit/ui/table';
import {
  ArrowUpDown,
  PlusCircle,
  Settings,
  Search,
  Filter,
  Eye,
  Download,
  Check,
  FileText,
  Clock,
  X,
  CreditCard,
  Printer,
} from 'lucide-react';

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

// 集計用データ
const draftInvoices = invoices.filter((i) => i.status === 'draft');
const sentInvoices = invoices.filter((i) => i.status === 'sent');
const overdueInvoices = invoices.filter((i) => i.status === 'overdue');
const totalReceivables = invoices
  .filter((i) => ['sent', 'overdue'].includes(i.status))
  .reduce((sum, i) => sum + i.amount, 0);

export default function BillingPageClient() {
  const [view, setView] = useState<'list' | 'report'>('list');

  const headerControls = (
    <SegmentedControl
      value={view}
      onValueChange={(v) => setView(v as 'list' | 'report')}
    >
      <SegmentedControlIndicator />
      <SegmentedControlItem value="list">一覧</SegmentedControlItem>
      <SegmentedControlItem value="report">統計</SegmentedControlItem>
    </SegmentedControl>
  );

  const listActions = (
    <>
      <Link href="/system/billing/new">
        <Button variant="default" size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          新規請求書作成
        </Button>
      </Link>
      <Button variant="outline" size="sm">
        <Settings className="mr-2 h-4 w-4" />
        設定
      </Button>
    </>
  );

  const reportActions = (
    <>
      <Button variant="outline" size="sm">
        <Printer className="mr-2 h-4 w-4" />
        印刷
      </Button>
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        エクスポート
      </Button>
    </>
  );

  return (
    <>
      <PageHeader
        title="請求・入金管理"
        description="請求書と入金状況を管理できます。"
        backLink={{ href: '/system', label: 'ダッシュボードに戻る' }}
        actions={
          <div className="flex flex-col gap-2 items-end">
            {headerControls}
            <div className="flex items-center gap-2">
              {view === 'list' ? listActions : reportActions}
            </div>
          </div>
        }
      />

      <Container>
        {view === 'list' ? (
          <>
            {/* 検索・フィルターツールバー */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="relative flex-1 min-w-[200px]">
                <Input
                  type="text"
                  placeholder="請求番号、顧客名、タイトルで検索..."
                  className="pl-10"
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
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
                  const { icon, color, label } = getStatusDetails(
                    invoice.status
                  );
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
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
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              詳細
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </>
        ) : (
          <>
            {/* 統計情報 */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[200px]">
                <Card className="p-4">
                  <h3 className="text-lg font-medium mb-2">下書き請求書</h3>
                  <p className="text-sm text-gray-500">
                    {draftInvoices.length}冊
                  </p>
                </Card>
              </div>
              <div className="flex-1 min-w-[200px]">
                <Card className="p-4">
                  <h3 className="text-lg font-medium mb-2">送信済み請求書</h3>
                  <p className="text-sm text-gray-500">
                    {sentInvoices.length}冊
                  </p>
                </Card>
              </div>
              <div className="flex-1 min-w-[200px]">
                <Card className="p-4">
                  <h3 className="text-lg font-medium mb-2">期限超過請求書</h3>
                  <p className="text-sm text-gray-500">
                    {overdueInvoices.length}冊
                  </p>
                </Card>
              </div>
              <div className="flex-1 min-w-[200px]">
                <Card className="p-4">
                  <h3 className="text-lg font-medium mb-2">総受入可能額</h3>
                  <p className="text-sm text-gray-500">
                    ¥{totalReceivables.toLocaleString()}
                  </p>
                </Card>
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
}
