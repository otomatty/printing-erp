import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Truck,
  ShoppingCart,
  Package,
  History,
  Settings,
  BarChart,
  ArrowDownToLine,
  ArrowUpFromLine,
  Edit,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import { Card } from '@kit/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';

// 在庫アイテムの詳細情報（モックデータ）
const inventoryItems = [
  {
    id: 'INV-P-001',
    name: 'コート紙 A4 90kg',
    category: 'paper',
    unit: '枚',
    currentStock: 5000,
    minStock: 1000,
    reorderLevel: 2000,
    location: 'A-1-2',
    lastUpdated: '2023/07/10',
    status: 'in_stock',
    supplier: '用紙商事株式会社',
    supplierCode: 'SUP-001',
    unitPrice: 10,
    description:
      '高級印刷向けコート紙。A4サイズ、90kg。光沢があり、カラー印刷に適しています。',
    leadTime: '3-5日',
    createdAt: '2023/01/15',
    dimensions: '210mm x 297mm',
    weight: '90kg',
    notes: '湿度の高い場所での保管は避けること。',
  },
  {
    id: 'INV-P-003',
    name: '上質紙 A4 68kg',
    category: 'paper',
    unit: '枚',
    currentStock: 900,
    minStock: 1000,
    reorderLevel: 2000,
    location: 'A-2-1',
    lastUpdated: '2023/07/15',
    status: 'low_stock',
    supplier: '用紙商事株式会社',
    supplierCode: 'SUP-001',
    unitPrice: 8,
    description: '一般的な印刷用上質紙。A4サイズ、68kg。',
    leadTime: '3-5日',
    createdAt: '2023/01/20',
    dimensions: '210mm x 297mm',
    weight: '68kg',
    notes: '',
  },
];

// 入出庫履歴のモックデータ
const inventoryHistory = [
  {
    id: 'TRX-001',
    date: '2023/07/10',
    type: 'in',
    amount: 2000,
    remainingStock: 5000,
    reference: 'PO-2023-056',
    note: '発注書#56からの入荷',
    user: '田中太郎',
  },
  {
    id: 'TRX-002',
    date: '2023/07/05',
    type: 'out',
    amount: 500,
    remainingStock: 3000,
    reference: 'ORD-2023-124',
    note: '注文#124の生産に使用',
    user: '佐藤花子',
  },
  {
    id: 'TRX-003',
    date: '2023/06/28',
    type: 'out',
    amount: 800,
    remainingStock: 3500,
    reference: 'ORD-2023-118',
    note: '注文#118の生産に使用',
    user: '佐藤花子',
  },
  {
    id: 'TRX-004',
    date: '2023/06/20',
    type: 'in',
    amount: 3000,
    remainingStock: 4300,
    reference: 'PO-2023-049',
    note: '発注書#49からの入荷',
    user: '田中太郎',
  },
  {
    id: 'TRX-005',
    date: '2023/06/15',
    type: 'adjust',
    amount: -100,
    remainingStock: 1300,
    reference: 'ADJ-2023-012',
    note: '棚卸調整: 破損品の廃棄',
    user: '山田次郎',
  },
];

// 月別使用量のモックデータ
const monthlyUsage = [
  { month: '1月', usage: 1800 },
  { month: '2月', usage: 2200 },
  { month: '3月', usage: 1950 },
  { month: '4月', usage: 2100 },
  { month: '5月', usage: 2500 },
  { month: '6月', usage: 2300 },
  { month: '7月', usage: 1800 },
];

// ステータスに応じたバッジの色とラベルを返す関数
const getStatusDetails = (status: string) => {
  switch (status) {
    case 'in_stock':
      return {
        color: 'bg-green-100 text-green-800',
        label: '在庫あり',
      };
    case 'low_stock':
      return {
        color: 'bg-yellow-100 text-yellow-800',
        label: '残り僅か',
      };
    case 'out_of_stock':
      return {
        color: 'bg-red-100 text-red-800',
        label: '在庫切れ',
      };
    case 'on_order':
      return {
        color: 'bg-blue-100 text-blue-800',
        label: '発注中',
      };
    default:
      return {
        color: 'bg-gray-100 text-gray-800',
        label: '不明',
      };
  }
};

export default async function InventoryDetailPage({
  params,
}: { params: Promise<{ id: string }> }) {
  // IDに基づいて在庫アイテムを検索
  const resolvedParams = await params;
  const item = inventoryItems.find((item) => item.id === resolvedParams.id);

  // アイテムが見つからない場合は404
  if (!item) {
    notFound();
  }

  const { color, label } = getStatusDetails(item.status);

  // 月間平均使用量
  const avgMonthlyUsage =
    monthlyUsage.reduce((sum, month) => sum + month.usage, 0) /
    monthlyUsage.length;

  // 現在の在庫でまかなえる月数（概算）
  const estimatedMonths = Math.floor(item.currentStock / avgMonthlyUsage);

  return (
    <div className="space-y-6 p-6">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center">
          <Link href="/inventory">
            <Button variant="outline" size="icon" className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">{item.name}</h1>
          <Badge className={`ml-4 ${color}`}>{label}</Badge>
        </div>
        <div className="flex gap-2">
          <Link href={`/inventory/orders/new?item=${item.id}`}>
            <Button variant="outline" size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" />
              発注する
            </Button>
          </Link>
          <Link href={`/inventory/${item.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              編集
            </Button>
          </Link>
          <Link href={`/inventory/${item.id}/stock`}>
            <Button variant="default" size="sm">
              <Package className="mr-2 h-4 w-4" />
              在庫操作
            </Button>
          </Link>
        </div>
      </div>

      {/* アラート通知（在庫が少ない場合） */}
      {item.status === 'low_stock' && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start">
          <AlertTriangle className="text-amber-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800">在庫僅少</h3>
            <p className="text-amber-700 text-sm mt-1">
              現在の在庫量 ({item.currentStock.toLocaleString()} {item.unit})
              が最小在庫量 ({item.minStock.toLocaleString()} {item.unit})
              を下回っています。 早めの発注をお勧めします。
            </p>
            <div className="flex gap-2 mt-2">
              <Link href={`/inventory/orders/new?item=${item.id}`}>
                <Button variant="outline" size="sm" className="h-7 bg-white">
                  <ShoppingCart className="mr-1 h-3 w-3" />
                  発注する
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 在庫概要カード */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <Package className="mr-2 h-5 w-5 text-gray-500" />
            現在庫情報
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">現在庫</p>
              <p className="text-2xl font-bold">
                {item.currentStock.toLocaleString()} {item.unit}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">最小在庫</p>
                <p className="text-lg font-medium">
                  {item.minStock.toLocaleString()} {item.unit}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">発注点</p>
                <p className="text-lg font-medium">
                  {item.reorderLevel.toLocaleString()} {item.unit}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">保管場所</p>
              <p className="text-lg font-medium">{item.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">最終更新</p>
              <p className="text-lg">{item.lastUpdated}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <Truck className="mr-2 h-5 w-5 text-gray-500" />
            調達情報
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">取引先</p>
              <p className="text-lg font-medium">{item.supplier}</p>
              <p className="text-sm text-gray-500">
                （コード: {item.supplierCode}）
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">単価</p>
                <p className="text-lg font-medium">
                  ¥{item.unitPrice.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">調達リードタイム</p>
                <p className="text-lg font-medium">{item.leadTime}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <BarChart className="mr-2 h-5 w-5 text-gray-500" />
            使用状況
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">月間平均使用量</p>
              <p className="text-2xl font-bold">
                {avgMonthlyUsage.toLocaleString()} {item.unit}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">在庫残月数（概算）</p>
              <p className="text-lg font-medium flex items-center">
                <Clock className="mr-1 h-4 w-4 text-gray-400" />約{' '}
                {estimatedMonths} ヶ月分
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">直近の入庫</p>
              <p className="text-lg font-medium">
                {inventoryHistory.find((h) => h.type === 'in')?.date || 'なし'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* タブコンテンツ */}
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">詳細情報</TabsTrigger>
          <TabsTrigger value="history">入出庫履歴</TabsTrigger>
          <TabsTrigger value="usage">使用状況分析</TabsTrigger>
        </TabsList>

        {/* 詳細情報タブ */}
        <TabsContent value="details" className="space-y-4 mt-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">資材詳細</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">ID</p>
                  <p className="text-base">{item.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">カテゴリ</p>
                  <p className="text-base">
                    {item.category === 'paper'
                      ? '用紙'
                      : item.category === 'ink'
                        ? 'インク'
                        : '資材'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">登録日</p>
                  <p className="text-base">{item.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">サイズ</p>
                  <p className="text-base">{item.dimensions}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">重量</p>
                  <p className="text-base">{item.weight}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">説明</p>
                  <p className="text-base">{item.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">備考</p>
                  <p className="text-base">{item.notes || '特になし'}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">在庫操作</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-28 flex flex-col items-center justify-center space-y-2"
              >
                <ArrowDownToLine className="h-8 w-8 text-green-600" />
                <span>入庫登録</span>
              </Button>
              <Button
                variant="outline"
                className="h-28 flex flex-col items-center justify-center space-y-2"
              >
                <ArrowUpFromLine className="h-8 w-8 text-red-600" />
                <span>出庫登録</span>
              </Button>
              <Button
                variant="outline"
                className="h-28 flex flex-col items-center justify-center space-y-2"
              >
                <Settings className="h-8 w-8 text-primary" />
                <span>在庫調整</span>
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* 入出庫履歴タブ */}
        <TabsContent value="history" className="mt-4">
          <Card className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">日付</TableHead>
                  <TableHead className="w-[100px]">取引ID</TableHead>
                  <TableHead className="w-[100px]">種別</TableHead>
                  <TableHead className="text-right">数量</TableHead>
                  <TableHead className="text-right">残在庫</TableHead>
                  <TableHead>参照</TableHead>
                  <TableHead>備考</TableHead>
                  <TableHead>担当者</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryHistory.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell>{history.date}</TableCell>
                    <TableCell className="font-medium">{history.id}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          history.type === 'in'
                            ? 'bg-green-100 text-green-800'
                            : history.type === 'out'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                        }
                      >
                        {history.type === 'in'
                          ? '入庫'
                          : history.type === 'out'
                            ? '出庫'
                            : '調整'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {history.type === 'in' ? '+' : '-'}
                      {history.amount.toLocaleString()} {item.unit}
                    </TableCell>
                    <TableCell className="text-right">
                      {history.remainingStock.toLocaleString()} {item.unit}
                    </TableCell>
                    <TableCell>{history.reference}</TableCell>
                    <TableCell>{history.note}</TableCell>
                    <TableCell>{history.user}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* 使用状況分析タブ */}
        <TabsContent value="usage" className="mt-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">月別使用量</h3>
            <div className="h-64 flex items-end justify-around">
              {monthlyUsage.map((month) => (
                <div key={month.month} className="flex flex-col items-center">
                  <div
                    className="bg-blue-500 w-12 rounded-t-md"
                    style={{
                      height: `${(month.usage / Math.max(...monthlyUsage.map((m) => m.usage))) * 180}px`,
                    }}
                  />
                  <p className="mt-2 text-sm">{month.month}</p>
                  <p className="text-xs text-gray-500">
                    {month.usage.toLocaleString()}
                    {item.unit}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">平均月間使用量</p>
                <p className="text-xl font-bold">
                  {avgMonthlyUsage.toLocaleString()} {item.unit}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">現在庫でまかなえる期間</p>
                <p className="text-xl font-bold">約 {estimatedMonths} ヶ月</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">推奨発注時期</p>
                <p className="text-xl font-bold">
                  {item.status === 'low_stock' || item.status === 'out_of_stock'
                    ? '今すぐ'
                    : `約 ${Math.max(0, estimatedMonths - 1)} ヶ月後`}
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
