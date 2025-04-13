import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpDown,
  Box,
  CheckCircle,
  ChevronRight,
  Clock,
  Filter,
  FileText,
  Plus,
  Search,
  Truck,
  ShoppingCart,
  AlertTriangle,
} from 'lucide-react';
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
import { Badge } from '@kit/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';

// 発注リストのモックデータ
const purchaseOrders = [
  {
    id: 'PO-2023-059',
    date: '2023/07/18',
    supplierId: 'SUP-001',
    supplierName: '用紙商事株式会社',
    status: 'ordered',
    totalAmount: 85000,
    itemCount: 3,
    expectedArrival: '2023/07/25',
    createdBy: '田中太郎',
  },
  {
    id: 'PO-2023-058',
    date: '2023/07/15',
    supplierId: 'SUP-003',
    supplierName: '印刷機材センター',
    status: 'in_transit',
    totalAmount: 32500,
    itemCount: 2,
    expectedArrival: '2023/07/21',
    createdBy: '田中太郎',
  },
  {
    id: 'PO-2023-057',
    date: '2023/07/12',
    supplierId: 'SUP-002',
    supplierName: 'インク商事株式会社',
    status: 'received',
    totalAmount: 48000,
    itemCount: 4,
    expectedArrival: '2023/07/19',
    createdBy: '山田次郎',
  },
  {
    id: 'PO-2023-056',
    date: '2023/07/10',
    supplierId: 'SUP-001',
    supplierName: '用紙商事株式会社',
    status: 'received',
    totalAmount: 120000,
    itemCount: 5,
    expectedArrival: '2023/07/17',
    createdBy: '田中太郎',
  },
  {
    id: 'PO-2023-055',
    date: '2023/07/05',
    supplierId: 'SUP-004',
    supplierName: '製本資材工業',
    status: 'received',
    totalAmount: 18500,
    itemCount: 2,
    expectedArrival: '2023/07/12',
    createdBy: '佐藤花子',
  },
  {
    id: 'PO-2023-054',
    date: '2023/07/01',
    supplierId: 'SUP-002',
    supplierName: 'インク商事株式会社',
    status: 'cancelled',
    totalAmount: 35000,
    itemCount: 3,
    expectedArrival: '2023/07/08',
    createdBy: '山田次郎',
  },
];

// 発注ステータスに応じたバッジの色とラベルを返す関数
const getStatusDetails = (status: string) => {
  switch (status) {
    case 'draft':
      return {
        color: 'bg-gray-100 text-gray-800',
        label: '下書き',
        icon: <FileText className="h-4 w-4 mr-1" />,
      };
    case 'ordered':
      return {
        color: 'bg-blue-100 text-blue-800',
        label: '発注済',
        icon: <ShoppingCart className="h-4 w-4 mr-1" />,
      };
    case 'in_transit':
      return {
        color: 'bg-indigo-100 text-indigo-800',
        label: '輸送中',
        icon: <Truck className="h-4 w-4 mr-1" />,
      };
    case 'received':
      return {
        color: 'bg-green-100 text-green-800',
        label: '入荷済',
        icon: <CheckCircle className="h-4 w-4 mr-1" />,
      };
    case 'cancelled':
      return {
        color: 'bg-red-100 text-red-800',
        label: 'キャンセル',
        icon: <AlertTriangle className="h-4 w-4 mr-1" />,
      };
    default:
      return {
        color: 'bg-gray-100 text-gray-800',
        label: '不明',
        icon: <FileText className="h-4 w-4 mr-1" />,
      };
  }
};

// ステータス別の集計
const draftOrders = purchaseOrders.filter((order) => order.status === 'draft');
const orderedOrders = purchaseOrders.filter(
  (order) => order.status === 'ordered'
);
const inTransitOrders = purchaseOrders.filter(
  (order) => order.status === 'in_transit'
);
const receivedOrders = purchaseOrders.filter(
  (order) => order.status === 'received'
);
const cancelledOrders = purchaseOrders.filter(
  (order) => order.status === 'cancelled'
);

// 合計金額の計算
const totalOrderedAmount = [...orderedOrders, ...inTransitOrders].reduce(
  (sum, order) => sum + order.totalAmount,
  0
);

export default function InventoryOrdersPage() {
  return (
    <div className="space-y-6 p-6">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center">
          <Link href="/system/inventory">
            <Button variant="outline" size="icon" className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">発注管理</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/system/inventory/orders/new">
            <Button variant="default" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              新規発注
            </Button>
          </Link>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <ShoppingCart className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">発注中</p>
            <p className="text-2xl font-bold">{orderedOrders.length}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center">
          <div className="bg-indigo-100 p-3 rounded-full mr-4">
            <Truck className="text-indigo-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">輸送中</p>
            <p className="text-2xl font-bold">{inTransitOrders.length}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <CheckCircle className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">入荷済</p>
            <p className="text-2xl font-bold">{receivedOrders.length}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center">
          <div className="bg-amber-100 p-3 rounded-full mr-4">
            <Box className="text-amber-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">発注総額</p>
            <p className="text-2xl font-bold">
              ¥{totalOrderedAmount.toLocaleString()}
            </p>
          </div>
        </Card>
      </div>

      {/* タブ */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">全ての発注</TabsTrigger>
          <TabsTrigger value="ordered">発注済</TabsTrigger>
          <TabsTrigger value="in_transit">輸送中</TabsTrigger>
          <TabsTrigger value="received">入荷済</TabsTrigger>
          <TabsTrigger value="cancelled">キャンセル</TabsTrigger>
        </TabsList>

        {/* 検索・フィルターツールバー */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Input
              type="text"
              placeholder="発注番号、取引先で検索..."
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
              <option value="recent">最近の発注順</option>
              <option value="oldest">古い発注順</option>
              <option value="amount_high">金額（高い順）</option>
              <option value="amount_low">金額（低い順）</option>
            </select>
          </div>
        </div>

        {/* 全ての発注タブ */}
        <TabsContent value="all">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">発注番号</TableHead>
                <TableHead className="w-[100px]">日付</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    取引先
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end">
                    金額
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-center">アイテム数</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>予定入荷日</TableHead>
                <TableHead>担当者</TableHead>
                <TableHead className="w-[100px]">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((order) => {
                const { color, label, icon } = getStatusDetails(order.status);
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <Link href={`/system/inventory/orders/${order.id}`}>
                        <span className="text-primary hover:underline">
                          {order.id}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <div>
                        <p>{order.supplierName}</p>
                        <p className="text-xs text-gray-500">
                          {order.supplierId}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ¥{order.totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {order.itemCount}
                    </TableCell>
                    <TableCell>
                      <Badge className={color}>
                        <span className="flex items-center">
                          {icon}
                          {label}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {order.expectedArrival}
                      {order.status === 'in_transit' && (
                        <p className="text-xs text-indigo-600 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          もうすぐ到着
                        </p>
                      )}
                    </TableCell>
                    <TableCell>{order.createdBy}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Link href={`/system/inventory/orders/${order.id}`}>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TabsContent>

        {/* 発注済タブ */}
        <TabsContent value="ordered">
          <p className="text-center text-gray-500 py-6">
            「発注済」ステータスの発注のみ表示されます。
          </p>
        </TabsContent>

        {/* 輸送中タブ */}
        <TabsContent value="in_transit">
          <p className="text-center text-gray-500 py-6">
            「輸送中」ステータスの発注のみ表示されます。
          </p>
        </TabsContent>

        {/* 入荷済タブ */}
        <TabsContent value="received">
          <p className="text-center text-gray-500 py-6">
            「入荷済」ステータスの発注のみ表示されます。
          </p>
        </TabsContent>

        {/* キャンセルタブ */}
        <TabsContent value="cancelled">
          <p className="text-center text-gray-500 py-6">
            「キャンセル」ステータスの発注のみ表示されます。
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
