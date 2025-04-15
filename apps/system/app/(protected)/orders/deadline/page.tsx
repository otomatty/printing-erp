import {
  ArrowLeft,
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Filter,
  ListFilter,
  Package,
  Search,
  AlertTriangle,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';

// 受注リストのモックデータ
const orders = [
  {
    id: 'ORD-2023-0001',
    customer: '株式会社サンプル',
    title: 'チラシ印刷 A4 両面フルカラー 1,000部',
    status: 'in_progress',
    createdAt: '2023/07/05',
    deadline: '2023/07/25',
    currentStep: '印刷',
    progress: 40,
    isUrgent: false,
    isDelayed: false,
  },
  {
    id: 'ORD-2023-0006',
    customer: '××デザイン事務所',
    title: '会社案内パンフレット A4 12P 500部',
    status: 'in_progress',
    createdAt: '2023/07/10',
    deadline: '2023/07/22',
    currentStep: '製版',
    progress: 20,
    isUrgent: true,
    isDelayed: false,
  },
  {
    id: 'ORD-2023-0007',
    customer: '□□出版',
    title: '雑誌広告 1P',
    status: 'in_progress',
    createdAt: '2023/07/08',
    deadline: '2023/07/20',
    currentStep: '製版',
    progress: 30,
    isUrgent: true,
    isDelayed: false,
  },
  {
    id: 'ORD-2023-0003',
    customer: '△△印刷',
    title: 'パンフレット A4 8P フルカラー 500部',
    status: 'pending',
    createdAt: '2023/07/10',
    deadline: '2023/08/01',
    currentStep: '受付',
    progress: 10,
    isUrgent: false,
    isDelayed: false,
  },
  {
    id: 'ORD-2023-0008',
    customer: '○○商会',
    title: 'ポスター B1 片面カラー 10枚',
    status: 'in_progress',
    createdAt: '2023/07/01',
    deadline: '2023/07/18',
    currentStep: '印刷',
    progress: 50,
    isUrgent: true,
    isDelayed: true,
  },
  {
    id: 'ORD-2023-0009',
    customer: '◇◇カンパニー',
    title: '名刺 両面フルカラー 10名様分',
    status: 'in_progress',
    createdAt: '2023/07/02',
    deadline: '2023/07/15',
    currentStep: '加工',
    progress: 70,
    isUrgent: false,
    isDelayed: true,
  },
];

// カレンダーのモックデータ（7月分）
const calendarData = [
  // 前月（6月）の最終週
  { day: 25, month: 6, events: [] },
  { day: 26, month: 6, events: [] },
  { day: 27, month: 6, events: [] },
  { day: 28, month: 6, events: [] },
  { day: 29, month: 6, events: [] },
  { day: 30, month: 6, events: [] },
  // 7月
  { day: 1, month: 7, events: [] },
  { day: 2, month: 7, events: [] },
  { day: 3, month: 7, events: [] },
  { day: 4, month: 7, events: [] },
  { day: 5, month: 7, events: [] },
  { day: 6, month: 7, events: [] },
  { day: 7, month: 7, events: [] },
  { day: 8, month: 7, events: [] },
  { day: 9, month: 7, events: [] },
  { day: 10, month: 7, events: [] },
  { day: 11, month: 7, events: [] },
  { day: 12, month: 7, events: [] },
  { day: 13, month: 7, events: [] },
  { day: 14, month: 7, events: [] },
  {
    day: 15,
    month: 7,
    isToday: true,
    events: [
      {
        id: 'ORD-2023-0009',
        title: '名刺 両面フルカラー 10名様分',
        customer: '◇◇カンパニー',
        isDelayed: true,
      },
    ],
  },
  { day: 16, month: 7, events: [] },
  { day: 17, month: 7, events: [] },
  {
    day: 18,
    month: 7,
    events: [
      {
        id: 'ORD-2023-0008',
        title: 'ポスター B1 片面カラー 10枚',
        customer: '○○商会',
        isUrgent: true,
      },
    ],
  },
  { day: 19, month: 7, events: [] },
  {
    day: 20,
    month: 7,
    events: [
      {
        id: 'ORD-2023-0007',
        title: '雑誌広告 1P',
        customer: '□□出版',
        isUrgent: true,
      },
    ],
  },
  { day: 21, month: 7, events: [] },
  {
    day: 22,
    month: 7,
    events: [
      {
        id: 'ORD-2023-0006',
        title: '会社案内パンフレット A4 12P 500部',
        customer: '××デザイン事務所',
        isUrgent: true,
      },
    ],
  },
  { day: 23, month: 7, events: [] },
  { day: 24, month: 7, events: [] },
  {
    day: 25,
    month: 7,
    events: [
      {
        id: 'ORD-2023-0001',
        title: 'チラシ印刷 A4 両面フルカラー 1,000部',
        customer: '株式会社サンプル',
      },
    ],
  },
  { day: 26, month: 7, events: [] },
  { day: 27, month: 7, events: [] },
  { day: 28, month: 7, events: [] },
  { day: 29, month: 7, events: [] },
  { day: 30, month: 7, events: [] },
  { day: 31, month: 7, events: [] },
  // 翌月（8月）の初週
  {
    day: 1,
    month: 8,
    events: [
      {
        id: 'ORD-2023-0003',
        title: 'パンフレット A4 8P フルカラー 500部',
        customer: '△△印刷',
      },
    ],
  },
  { day: 2, month: 8, events: [] },
  { day: 3, month: 8, events: [] },
  { day: 4, month: 8, events: [] },
  { day: 5, month: 8, events: [] },
];

// 現在日付を今日は7/15と仮定
const today = new Date(2023, 6, 15);

export default function DeadlineManagementPage() {
  // 今週の受注を抽出
  const thisWeekOrders = orders.filter((order) => {
    const deadline = new Date(order.deadline);
    const diffDays = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffDays >= 0 && diffDays <= 7;
  });

  // 遅延している受注を抽出
  const delayedOrders = orders.filter((order) => order.isDelayed);

  // 来週の受注を抽出
  const nextWeekOrders = orders.filter((order) => {
    const deadline = new Date(order.deadline);
    const diffDays = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffDays > 7 && diffDays <= 14;
  });

  return (
    <div className="space-y-6 p-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/system/orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">納期管理</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            納期アラート設定
          </Button>
        </div>
      </div>

      {/* アラート */}
      {delayedOrders.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
          <AlertTriangle className="text-red-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-red-800">
              遅延中の受注が {delayedOrders.length} 件あります
            </h3>
            <p className="text-red-700 text-sm mt-1">
              以下の受注が納期を過ぎているか、進捗が予定より遅れています。至急対応が必要です。
            </p>
            <ul className="mt-2 space-y-1 text-sm text-red-700">
              {delayedOrders.map((order) => (
                <li key={order.id}>
                  <Link href={`/system/orders/${order.id}`}>
                    <span className="hover:underline">
                      {order.id}: {order.title} (
                      {new Date(order.deadline).toLocaleDateString('ja-JP')})
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 統計カード */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <AlertTriangle className="text-red-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">遅延中</p>
            <p className="text-2xl font-bold">{delayedOrders.length}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center">
          <div className="bg-yellow-100 p-3 rounded-full mr-4">
            <Clock className="text-yellow-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">今週納期</p>
            <p className="text-2xl font-bold">{thisWeekOrders.length}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Calendar className="text-primary" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">来週納期</p>
            <p className="text-2xl font-bold">{nextWeekOrders.length}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <Package className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">進行中の受注</p>
            <p className="text-2xl font-bold">
              {orders.filter((order) => order.status === 'in_progress').length}
            </p>
          </div>
        </Card>
      </div>

      {/* タブコンテンツ */}
      <Tabs defaultValue="list">
        <TabsList className="mb-4">
          <TabsTrigger value="list">リスト表示</TabsTrigger>
          <TabsTrigger value="calendar">カレンダー表示</TabsTrigger>
        </TabsList>

        {/* リスト表示タブ */}
        <TabsContent value="list" className="space-y-4">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Input
                type="text"
                placeholder="受注番号、顧客名、タイトルで検索..."
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
                <option value="all">すべての受注</option>
                <option value="delay">遅延中</option>
                <option value="thisWeek">今週納期</option>
                <option value="nextWeek">来週納期</option>
              </select>

              <select className="h-9 rounded-md border border-input px-3 py-1 text-sm">
                <option value="deadline">納期順</option>
                <option value="created">作成日順</option>
                <option value="progress">進捗順</option>
              </select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">受注番号</TableHead>
                <TableHead>顧客名</TableHead>
                <TableHead>タイトル</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>現在工程</TableHead>
                <TableHead>進捗</TableHead>
                <TableHead className="w-[100px]">受注日</TableHead>
                <TableHead className="w-[100px]">納期</TableHead>
                <TableHead className="w-[80px]">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    <div
                      className={`flex items-center ${
                        order.isUrgent
                          ? 'text-red-700 font-medium'
                          : order.isDelayed
                            ? 'text-red-600'
                            : ''
                      }`}
                    >
                      {order.title}
                      {order.isUrgent && (
                        <Badge className="ml-2 bg-red-500">急ぎ</Badge>
                      )}
                      {order.isDelayed && (
                        <Badge className="ml-2 bg-red-600">遅延</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        order.status === 'in_progress'
                          ? 'bg-blue-500'
                          : order.status === 'completed'
                            ? 'bg-green-500'
                            : order.status === 'pending'
                              ? 'bg-yellow-500'
                              : order.status === 'canceled'
                                ? 'bg-red-500'
                                : ''
                      }
                    >
                      {order.status === 'in_progress'
                        ? '製造中'
                        : order.status === 'completed'
                          ? '製造完了'
                          : order.status === 'pending'
                            ? '準備中'
                            : order.status === 'delivered'
                              ? '納品済'
                              : order.status === 'canceled'
                                ? 'キャンセル'
                                : ''}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.currentStep}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                          className={`h-2.5 rounded-full ${
                            order.isDelayed
                              ? 'bg-red-500'
                              : order.progress > 60
                                ? 'bg-green-500'
                                : 'bg-blue-500'
                          }`}
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                      <span className="text-xs">{order.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {order.createdAt}
                  </TableCell>
                  <TableCell
                    className={`whitespace-nowrap font-medium ${
                      order.isDelayed || order.isUrgent ? 'text-red-600' : ''
                    }`}
                  >
                    {order.deadline}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Link href={`/system/orders/${order.id}`}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* カレンダー表示タブ */}
        <TabsContent value="calendar">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                納期カレンダー
              </h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium">2023年7月</span>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-1" />
                  <span>納期</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-1" />
                  <span>遅延/緊急</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1" />
                  <span>完了</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-gray-200 border rounded-md overflow-hidden">
              {/* 曜日ヘッダー */}
              <div className="bg-gray-100 p-2 text-center font-medium">月</div>
              <div className="bg-gray-100 p-2 text-center font-medium">火</div>
              <div className="bg-gray-100 p-2 text-center font-medium">水</div>
              <div className="bg-gray-100 p-2 text-center font-medium">木</div>
              <div className="bg-gray-100 p-2 text-center font-medium">金</div>
              <div className="bg-gray-100 p-2 text-center font-medium text-red-600">
                土
              </div>
              <div className="bg-gray-100 p-2 text-center font-medium text-red-600">
                日
              </div>

              {/* カレンダー日付 */}
              {calendarData.map((date, index) => {
                const isOtherMonth = date.month !== 7;
                const isWeekend = index % 7 === 5 || index % 7 === 6;

                return (
                  <div
                    key={`${date.month}-${date.day}`}
                    className={`bg-white p-2 min-h-28 ${
                      isOtherMonth ? 'bg-gray-50' : ''
                    } ${date.isToday ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div
                      className={`text-sm font-medium ${
                        isOtherMonth ? 'text-gray-400' : ''
                      } ${isWeekend ? 'text-red-600' : ''}`}
                    >
                      {date.month}/{date.day}
                    </div>
                    <div className="mt-1 space-y-1">
                      {date.events.map((event) => (
                        <Link
                          href={`/system/orders/${event.id}`}
                          key={event.id}
                        >
                          <div
                            className={`p-1 rounded text-xs break-words cursor-pointer hover:opacity-80 ${
                              ('isDelayed' in event && event.isDelayed) ||
                              ('isUrgent' in event && event.isUrgent)
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {event.customer}
                            <br />
                            {event.title.length > 15
                              ? `${event.title.substring(0, 15)}...`
                              : event.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
