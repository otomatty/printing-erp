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
  ArrowUpDown,
  Box,
  FileText,
  Filter,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Undo,
  Download,
  ArrowDownToLine,
  AlertTriangle,
} from 'lucide-react';

// 在庫アイテムのモックデータ
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
  },
  {
    id: 'INV-P-002',
    name: 'マットコート紙 A3 110kg',
    category: 'paper',
    unit: '枚',
    currentStock: 3000,
    minStock: 1000,
    reorderLevel: 1500,
    location: 'A-1-3',
    lastUpdated: '2023/07/08',
    status: 'in_stock',
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
  },
  {
    id: 'INV-P-004',
    name: '再生紙 A4 70kg',
    category: 'paper',
    unit: '枚',
    currentStock: 8000,
    minStock: 1500,
    reorderLevel: 3000,
    location: 'A-2-2',
    lastUpdated: '2023/07/05',
    status: 'in_stock',
  },
  {
    id: 'INV-I-001',
    name: 'プロセスブラックインク',
    category: 'ink',
    unit: '缶',
    currentStock: 5,
    minStock: 3,
    reorderLevel: 5,
    location: 'B-1-1',
    lastUpdated: '2023/07/12',
    status: 'in_stock',
  },
  {
    id: 'INV-I-002',
    name: 'プロセスシアンインク',
    category: 'ink',
    unit: '缶',
    currentStock: 2,
    minStock: 3,
    reorderLevel: 5,
    location: 'B-1-2',
    lastUpdated: '2023/07/12',
    status: 'low_stock',
  },
  {
    id: 'INV-I-003',
    name: 'プロセスマゼンタインク',
    category: 'ink',
    unit: '缶',
    currentStock: 4,
    minStock: 3,
    reorderLevel: 5,
    location: 'B-1-3',
    lastUpdated: '2023/07/12',
    status: 'in_stock',
  },
  {
    id: 'INV-I-004',
    name: 'プロセスイエローインク',
    category: 'ink',
    unit: '缶',
    currentStock: 1,
    minStock: 3,
    reorderLevel: 5,
    location: 'B-1-4',
    lastUpdated: '2023/07/12',
    status: 'low_stock',
  },
  {
    id: 'INV-S-001',
    name: '無線綴じ用接着剤',
    category: 'supply',
    unit: '本',
    currentStock: 12,
    minStock: 5,
    reorderLevel: 8,
    location: 'C-1-1',
    lastUpdated: '2023/07/01',
    status: 'in_stock',
  },
  {
    id: 'INV-S-002',
    name: '中綴じホッチキス',
    category: 'supply',
    unit: '箱',
    currentStock: 0,
    minStock: 3,
    reorderLevel: 5,
    location: 'C-1-2',
    lastUpdated: '2023/06/28',
    status: 'out_of_stock',
  },
];

// ステータスに応じたバッジの色とラベルを返す関数
const getStatusDetails = (status: string) => {
  switch (status) {
    case 'in_stock':
      return { color: 'bg-green-100 text-green-800', label: '在庫あり' };
    case 'low_stock':
      return { color: 'bg-yellow-100 text-yellow-800', label: '残り僅か' };
    case 'out_of_stock':
      return { color: 'bg-red-100 text-red-800', label: '在庫切れ' };
    case 'on_order':
      return { color: 'bg-blue-100 text-blue-800', label: '発注中' };
    default:
      return { color: 'bg-gray-100 text-gray-800', label: '不明' };
  }
};

// カテゴリ別集計・アラート
const paperItems = inventoryItems.filter((i) => i.category === 'paper');
const inkItems = inventoryItems.filter((i) => i.category === 'ink');
const supplyItems = inventoryItems.filter((i) => i.category === 'supply');
const lowStockItems = inventoryItems.filter((i) => i.status === 'low_stock');
const outOfStockItems = inventoryItems.filter(
  (i) => i.status === 'out_of_stock'
);

export default function InventoryPageClient() {
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
      <Button variant="outline" size="sm">
        <ArrowDownToLine className="mr-2 h-4 w-4" />
        データ出力
      </Button>
      <Link href="/system/inventory/orders">
        <Button variant="outline" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          発注管理
        </Button>
      </Link>
      <Link href="/system/inventory/receive">
        <Button variant="outline" size="sm">
          <Truck className="mr-2 h-4 w-4" />
          入荷登録
        </Button>
      </Link>
      <Link href="/system/inventory/new">
        <Button variant="default" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          新規資材登録
        </Button>
      </Link>
    </>
  );

  const reportActions = <></>; // no extra actions for report

  return (
    <>
      <PageHeader
        title="在庫管理"
        description="資材の在庫状況を管理できます。"
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
            {/* 統計カード */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
              <Card className="p-4 flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FileText className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">用紙</p>
                  <p className="text-2xl font-bold">{paperItems.length}</p>
                </div>
              </Card>
              <Card className="p-4 flex items-center">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Box className="text-indigo-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">インク</p>
                  <p className="text-2xl font-bold">{inkItems.length}</p>
                </div>
              </Card>
              <Card className="p-4 flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Package className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">資材</p>
                  <p className="text-2xl font-bold">{supplyItems.length}</p>
                </div>
              </Card>
              <Card className="p-4 flex items-center">
                <div
                  className={`$ {(lowStockItems.length||outOfStockItems.length)>0?'bg-red-100':'bg-green-100'} p-3 rounded-full mr-4`}
                >
                  <AlertTriangle
                    className={`${(lowStockItems.length || outOfStockItems.length) > 0 ? 'text-red-600' : 'text-green-600'}`}
                    size={24}
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">在庫アラート</p>
                  <p className="text-2xl font-bold">
                    {lowStockItems.length + outOfStockItems.length}
                  </p>
                </div>
              </Card>
            </div>

            {/* 検索・フィルターツールバー */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="relative flex-1 min-w-[200px]">
                <Input
                  type="text"
                  placeholder="資材名、ID、ロケーションで検索..."
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
                  <option value="all">全てのステータス</option>
                  <option value="in_stock">在庫あり</option>
                  <option value="low_stock">残り僅か</option>
                  <option value="out_of_stock">在庫切れ</option>
                  <option value="on_order">発注中</option>
                </select>
                <select className="h-9 rounded-md border border-input px-3 py-1 text-sm">
                  <option value="id_asc">ID（昇順）</option>
                  <option value="id_desc">ID（降順）</option>
                  <option value="name_asc">資材名（昇順）</option>
                  <option value="name_desc">資材名（降順）</option>
                  <option value="stock_asc">在庫量（昇順）</option>
                  <option value="stock_desc">在庫量（降順）</option>
                </select>
              </div>
            </div>

            {/* タブとテーブル */}
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">全ての資材</TabsTrigger>
                <TabsTrigger value="paper">用紙</TabsTrigger>
                <TabsTrigger value="ink">インク</TabsTrigger>
                <TabsTrigger value="supply">資材</TabsTrigger>
                <TabsTrigger value="alert">アラート</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>
                        資材名
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </TableHead>
                      <TableHead>カテゴリ</TableHead>
                      <TableHead className="text-right">
                        現在庫
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </TableHead>
                      <TableHead className="text-right">単位</TableHead>
                      <TableHead className="text-right">最小在庫</TableHead>
                      <TableHead className="text-right">発注点</TableHead>
                      <TableHead>ロケーション</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead className="w-[100px]">最終更新日</TableHead>
                      <TableHead className="w-[150px]">アクション</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryItems.map((item) => {
                      const { color, label } = getStatusDetails(item.status);
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.id}
                          </TableCell>
                          <TableCell>
                            <Link href={`/system/inventory/${item.id}`}>
                              <span className="text-primary hover:underline">
                                {item.name}
                              </span>
                            </Link>
                          </TableCell>
                          <TableCell>
                            {item.category === 'paper'
                              ? '用紙'
                              : item.category === 'ink'
                                ? 'インク'
                                : '資材'}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {item.currentStock.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.unit}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.minStock.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.reorderLevel.toLocaleString()}
                          </TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>
                            <Badge className={color}>{label}</Badge>
                          </TableCell>
                          <TableCell>{item.lastUpdated}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Link href={`/system/inventory/${item.id}`}>
                                <Button variant="outline" size="sm">
                                  <Settings className="mr-2 h-4 w-4" />
                                  詳細
                                </Button>
                              </Link>
                              <Button variant="outline" size="sm">
                                <Undo className="mr-2 h-4 w-4" />
                                戻る
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <>
            {/* 統計カード */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
              <Card className="p-4 flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FileText className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">用紙</p>
                  <p className="text-2xl font-bold">{paperItems.length}</p>
                </div>
              </Card>
              <Card className="p-4 flex items-center">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Box className="text-indigo-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">インク</p>
                  <p className="text-2xl font-bold">{inkItems.length}</p>
                </div>
              </Card>
              <Card className="p-4 flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Package className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">資材</p>
                  <p className="text-2xl font-bold">{supplyItems.length}</p>
                </div>
              </Card>
              <Card className="p-4 flex items-center">
                <div
                  className={`$ {(lowStockItems.length||outOfStockItems.length)>0?'bg-red-100':'bg-green-100'} p-3 rounded-full mr-4`}
                >
                  <AlertTriangle
                    className={`${(lowStockItems.length || outOfStockItems.length) > 0 ? 'text-red-600' : 'text-green-600'}`}
                    size={24}
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">在庫アラート</p>
                  <p className="text-2xl font-bold">
                    {lowStockItems.length + outOfStockItems.length}
                  </p>
                </div>
              </Card>
            </div>

            {/* 検索・フィルターツールバー */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="relative flex-1 min-w-[200px]">
                <Input
                  type="text"
                  placeholder="資材名、ID、ロケーションで検索..."
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
                  <option value="all">全てのステータス</option>
                  <option value="in_stock">在庫あり</option>
                  <option value="low_stock">残り僅か</option>
                  <option value="out_of_stock">在庫切れ</option>
                  <option value="on_order">発注中</option>
                </select>
                <select className="h-9 rounded-md border border-input px-3 py-1 text-sm">
                  <option value="id_asc">ID（昇順）</option>
                  <option value="id_desc">ID（降順）</option>
                  <option value="name_asc">資材名（昇順）</option>
                  <option value="name_desc">資材名（降順）</option>
                  <option value="stock_asc">在庫量（昇順）</option>
                  <option value="stock_desc">在庫量（降順）</option>
                </select>
              </div>
            </div>

            {/* タブとテーブル */}
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">全ての資材</TabsTrigger>
                <TabsTrigger value="paper">用紙</TabsTrigger>
                <TabsTrigger value="ink">インク</TabsTrigger>
                <TabsTrigger value="supply">資材</TabsTrigger>
                <TabsTrigger value="alert">アラート</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>
                        資材名
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </TableHead>
                      <TableHead>カテゴリ</TableHead>
                      <TableHead className="text-right">
                        現在庫
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </TableHead>
                      <TableHead className="text-right">単位</TableHead>
                      <TableHead className="text-right">最小在庫</TableHead>
                      <TableHead className="text-right">発注点</TableHead>
                      <TableHead>ロケーション</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead className="w-[100px]">最終更新日</TableHead>
                      <TableHead className="w-[150px]">アクション</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryItems.map((item) => {
                      const { color, label } = getStatusDetails(item.status);
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.id}
                          </TableCell>
                          <TableCell>
                            <Link href={`/system/inventory/${item.id}`}>
                              <span className="text-primary hover:underline">
                                {item.name}
                              </span>
                            </Link>
                          </TableCell>
                          <TableCell>
                            {item.category === 'paper'
                              ? '用紙'
                              : item.category === 'ink'
                                ? 'インク'
                                : '資材'}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {item.currentStock.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.unit}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.minStock.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.reorderLevel.toLocaleString()}
                          </TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>
                            <Badge className={color}>{label}</Badge>
                          </TableCell>
                          <TableCell>{item.lastUpdated}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Link href={`/system/inventory/${item.id}`}>
                                <Button variant="outline" size="sm">
                                  <Settings className="mr-2 h-4 w-4" />
                                  詳細
                                </Button>
                              </Link>
                              <Button variant="outline" size="sm">
                                <Undo className="mr-2 h-4 w-4" />
                                戻る
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </>
        )}
      </Container>
    </>
  );
}
