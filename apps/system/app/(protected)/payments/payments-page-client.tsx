'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';
import { Button } from '@kit/ui/button';
import { Input } from '@kit/ui/input';
import { Badge } from '@kit/ui/badge';
import { Card } from '@kit/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@kit/ui/table';
import {
  ArrowLeft,
  ArrowUpDown,
  Calendar,
  Check,
  CreditCard,
  Download,
  Eye,
  Filter,
  Plus,
  Search,
  X,
} from 'lucide-react';

// 入金記録のモックデータ
const payments = [
  {
    id: 'PAY-2023-0001',
    invoiceId: 'INV-2023-0001',
    customer: '株式会社サンプル',
    orderId: 'ORD-2023-0001',
    title: 'チラシ印刷 A4 両面フルカラー 1,000部',
    amount: 27500,
    method: 'bank_transfer',
    status: 'completed',
    paidAt: '2023/08/15',
    dueDate: '2023/08/31',
    receivedBy: '田中',
  },
  {
    id: 'PAY-2023-0002',
    invoiceId: 'INV-2023-0003',
    customer: '□□出版',
    orderId: 'ORD-2023-0007',
    title: '雑誌広告 1P',
    amount: 220000,
    method: 'credit_card',
    status: 'completed',
    paidAt: '2023/08/10',
    dueDate: '2023/08/20',
    receivedBy: 'システム',
  },
  {
    id: 'PAY-2023-0003',
    invoiceId: 'INV-2023-0002',
    customer: '××デザイン事務所',
    orderId: 'ORD-2023-0006',
    title: '会社案内パンフレット A4 12P 500部',
    amount: 165000,
    method: null,
    status: 'pending',
    paidAt: null,
    dueDate: '2023/08/31',
    receivedBy: null,
  },
  {
    id: 'PAY-2023-0004',
    invoiceId: 'INV-2023-0004',
    customer: '○○商会',
    orderId: 'ORD-2023-0008',
    title: 'ポスター B1 片面カラー 10枚',
    amount: 33000,
    method: null,
    status: 'overdue',
    paidAt: null,
    dueDate: '2023/08/18',
    receivedBy: null,
  },
];

// 支払い方法の表示名
const paymentMethodLabels = {
  bank_transfer: '銀行振込',
  credit_card: 'クレジットカード',
  cash: '現金',
};

// ステータスごとの集計
const completedPayments = payments.filter((p) => p.status === 'completed');
const pendingPayments = payments.filter((p) => p.status === 'pending');
const overduePayments = payments.filter((p) => p.status === 'overdue');

// 合計金額の計算
const totalReceived = completedPayments.reduce((sum, p) => sum + p.amount, 0);
const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
const totalOverdue = overduePayments.reduce((sum, p) => sum + p.amount, 0);

export default function PaymentsPageClient() {
  const actions = (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        入金データ出力
      </Button>
      <Button variant="default" size="sm">
        <Plus className="mr-2 h-4 w-4" />
        入金記録
      </Button>
    </div>
  );

  return (
    <>
      <PageHeader
        title="入金管理"
        description="入金状況を確認・管理できます。"
        backLink={{ href: '/system/billing', label: '請求管理に戻る' }}
        actions={actions}
      />

      <Container>
        {/* 統計カード */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Check className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">入金済</p>
              <p className="text-2xl font-bold">
                ¥{totalReceived.toLocaleString()}
              </p>
            </div>
          </Card>
          <Card className="p-4 flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <Calendar className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">入金待ち</p>
              <p className="text-2xl font-bold">
                ¥{totalPending.toLocaleString()}
              </p>
            </div>
          </Card>
          <Card className="p-4 flex items-center">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <X className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">入金遅延</p>
              <p className="text-2xl font-bold">
                ¥{totalOverdue.toLocaleString()}
              </p>
            </div>
          </Card>
          <Card className="p-4 flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <CreditCard className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">今月入金合計</p>
              <p className="text-2xl font-bold">
                ¥{totalReceived.toLocaleString()}
              </p>
            </div>
          </Card>
        </div>

        {/* タブ */}
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">すべての入金</TabsTrigger>
            <TabsTrigger value="completed">入金済</TabsTrigger>
            <TabsTrigger value="pending">入金待ち</TabsTrigger>
            <TabsTrigger value="overdue">入金遅延</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* 検索・フィルターツールバー */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="relative flex-1 min-w-[200px]">
                <Input
                  type="text"
                  placeholder="請求書番号、顧客名、タイトルで検索..."
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
                  <option value="all">すべての支払方法</option>
                  <option value="bank_transfer">銀行振込</option>
                  <option value="credit_card">クレジットカード</option>
                  <option value="cash">現金</option>
                </select>
                <select className="h-9 rounded-md border border-input px-3 py-1 text-sm">
                  <option value="latest">新しい順</option>
                  <option value="oldest">古い順</option>
                  <option value="amount_high">金額（高い順）</option>
                  <option value="amount_low">金額（低い順）</option>
                </select>
              </div>
            </div>

            {/* 入金テーブル */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">入金ID</TableHead>
                  <TableHead className="w-[120px]">請求書番号</TableHead>
                  <TableHead>顧客名</TableHead>
                  <TableHead>タイトル</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      ステータス
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>支払方法</TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end">
                      金額
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px]">
                    <div className="flex items-center">
                      入金日
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[120px]">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>
                      <Link
                        href={`/system/billing/${payment.invoiceId}`}
                        className="text-primary hover:underline"
                      >
                        {payment.invoiceId}
                      </Link>
                    </TableCell>
                    <TableCell>{payment.customer}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">{payment.title}</span>
                        {payment.status === 'overdue' && (
                          <Badge className="bg-red-500">遅延</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          payment.status === 'completed'
                            ? 'bg-green-500'
                            : payment.status === 'pending'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }
                      >
                        {payment.status === 'completed'
                          ? '入金済'
                          : payment.status === 'pending'
                            ? '入金待ち'
                            : '入金遅延'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {payment.method
                        ? paymentMethodLabels[
                            payment.method as keyof typeof paymentMethodLabels
                          ]
                        : '-'}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ¥{payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{payment.paidAt || '-'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Link href={`/system/billing/${payment.invoiceId}`}>
                          <Eye
                            className="text-primary hover:text-primary"
                            size={18}
                          />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Container>
    </>
  );
}
