import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Edit,
  Eye,
  FileText,
  Package,
  Printer,
  Send,
  ShoppingCart,
  Truck,
  User,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import { Card } from '@kit/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';

// 受注詳細のモックデータ
const orderData = {
  id: 'ORD-2023-0001',
  number: 'ORD-2023-0001',
  status: 'in_progress',
  title: 'チラシ印刷 A4 両面フルカラー 1,000部',
  customer: {
    id: 'cus-001',
    name: '株式会社サンプル',
    contact: '山田太郎',
    email: 'yamada@sample.co.jp',
    phone: '03-1234-5678',
    address: '東京都新宿区西新宿1-1-1',
  },
  quoteId: 'QT-2023-0001',
  createdAt: '2023年7月5日',
  deadline: '2023年7月25日',
  items: [
    {
      id: 'item-1',
      name: 'A4チラシ 両面フルカラー',
      description:
        '用紙：コート紙 90kg\n印刷：オフセット印刷 両面4色\n加工：断裁、納品',
      quantity: 1000,
      unit: '部',
      unitPrice: 25,
      amount: 25000,
      taxRate: 10,
    },
  ],
  subtotal: 25000,
  tax: 2500,
  total: 27500,
  deliveryMethod: '配送',
  deliveryNote: '午前中希望',
  paymentMethod: '請求書払い',
  paymentDue: '納品月末締め翌月末払い',
  note: '特急対応ありがとうございます。',
  process: {
    currentStep: 2,
    steps: [
      {
        id: 1,
        name: '受付',
        status: 'completed',
        date: '2023年7月5日',
        staff: '佐藤',
        note: '受注確定',
      },
      {
        id: 2,
        name: '製版',
        status: 'completed',
        date: '2023年7月10日',
        staff: '鈴木',
        note: 'データチェック完了',
      },
      {
        id: 3,
        name: '印刷',
        status: 'in_progress',
        date: '2023年7月15日',
        staff: '田中',
        note: '印刷中',
      },
      {
        id: 4,
        name: '加工',
        status: 'pending',
        date: '',
        staff: '',
        note: '',
      },
      {
        id: 5,
        name: '検品',
        status: 'pending',
        date: '',
        staff: '',
        note: '',
      },
      {
        id: 6,
        name: '出荷',
        status: 'pending',
        date: '',
        staff: '',
        note: '',
      },
    ],
  },
  history: [
    {
      id: 'hist-1',
      date: '2023年7月5日 10:00',
      user: '佐藤',
      action: '受注登録',
      comment: '見積QT-2023-0001から変換',
    },
    {
      id: 'hist-2',
      date: '2023年7月5日 10:30',
      user: '佐藤',
      action: '製造指示書発行',
      comment: '',
    },
    {
      id: 'hist-3',
      date: '2023年7月10日 14:00',
      user: '鈴木',
      action: '製版完了',
      comment: 'データチェック完了',
    },
    {
      id: 'hist-4',
      date: '2023年7月15日 09:00',
      user: '田中',
      action: '印刷開始',
      comment: '',
    },
  ],
};

export default async function OrderDetailPage({
  params,
}: { params: Promise<{ id: string }> }) {
  // 実際の実装では、params.idを使用して受注データを取得する
  const resolvedParams = await params;
  const order = orderData;

  // ステータスによって表示を変える
  const statusLabels = {
    pending: { label: '準備中', class: 'bg-yellow-500' },
    in_progress: { label: '製造中', class: 'bg-blue-500' },
    completed: { label: '製造完了', class: 'bg-green-500' },
    delivered: { label: '納品済', class: 'bg-emerald-500' },
    canceled: { label: 'キャンセル', class: 'bg-red-500' },
  };

  const statusInfo = statusLabels[order.status as keyof typeof statusLabels];

  // 工程ステップの状態によってスタイルを変える
  const getStepStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50 text-green-700';
      case 'in_progress':
        return 'border-blue-500 bg-blue-50 text-blue-700';
      default:
        return 'border-gray-300 bg-gray-50 text-gray-500';
    }
  };

  // 工程ステップのアイコンを取得
  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-300" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">受注詳細</h1>
          <Badge className={statusInfo.class}>{statusInfo.label}</Badge>
          <div className="text-sm text-gray-500">#{order.number}</div>
        </div>
        <div className="flex gap-2">
          <Link href={`/orders/${order.id}/process`}>
            <Button variant="outline" size="sm">
              <Package className="mr-2 h-4 w-4" />
              工程管理
            </Button>
          </Link>
          <Link href={`/orders/${order.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              編集
            </Button>
          </Link>
          <Button variant="default" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            製造指示書
          </Button>
        </div>
      </div>

      {/* コンテンツ */}
      <Tabs defaultValue="details">
        <TabsList className="mb-4">
          <TabsTrigger value="details">基本情報</TabsTrigger>
          <TabsTrigger value="process">工程管理</TabsTrigger>
          <TabsTrigger value="history">履歴</TabsTrigger>
        </TabsList>

        {/* 基本情報タブ */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 受注情報 */}
            <Card className="p-4 col-span-2">
              <h3 className="font-medium mb-4">受注情報</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">受注番号</p>
                  <p>{order.number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ステータス</p>
                  <Badge className={statusInfo.class}>{statusInfo.label}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">受注日</p>
                  <p>{order.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">納期</p>
                  <p>{order.deadline}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">タイトル</p>
                  <p className="font-medium">{order.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">納品方法</p>
                  <p>{order.deliveryMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">納品備考</p>
                  <p>{order.deliveryNote}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">支払い方法</p>
                  <p>{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">支払い条件</p>
                  <p>{order.paymentDue}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">備考</p>
                  <div className="whitespace-pre-line text-sm border p-2 rounded-md mt-1 bg-gray-50">
                    {order.note || '特記事項はありません。'}
                  </div>
                </div>
              </div>
            </Card>

            {/* 顧客情報 */}
            <Card className="p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <User className="mr-2 h-4 w-4" />
                顧客情報
              </h3>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Link href={`/customers/${order.customer.id}`}>
                    <span className="font-medium text-primary hover:underline">
                      {order.customer.name}
                    </span>
                  </Link>
                </div>
                <p className="text-sm">{order.customer.address}</p>
              </div>
              <div className="text-sm space-y-1">
                <p className="flex items-center">
                  <span className="text-gray-500 mr-2">担当者:</span>
                  {order.customer.contact}
                </p>
                <p className="flex items-center">
                  <span className="text-gray-500 mr-2">Email:</span>
                  <a
                    href={`mailto:${order.customer.email}`}
                    className="text-primary hover:underline"
                  >
                    {order.customer.email}
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="text-gray-500 mr-2">電話:</span>
                  {order.customer.phone}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  顧客詳細を表示
                </Button>
              </div>
            </Card>

            {/* 受注明細 */}
            <Card className="p-4 col-span-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">明細情報</h3>
                <div className="flex items-center gap-2">
                  <Link href={`/quotes/${order.quoteId}`}>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      見積書表示
                    </Button>
                  </Link>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>商品/サービス</TableHead>
                    <TableHead className="text-center">数量</TableHead>
                    <TableHead className="text-right">単価</TableHead>
                    <TableHead className="text-center">税率</TableHead>
                    <TableHead className="text-right">金額</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="align-top">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500 whitespace-pre-line">
                          {item.description}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {item.quantity.toLocaleString()} {item.unit}
                      </TableCell>
                      <TableCell className="text-right">
                        ¥{item.unitPrice.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.taxRate}%
                      </TableCell>
                      <TableCell className="text-right">
                        ¥{item.amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <tfoot>
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-2 text-right font-medium"
                    >
                      小計
                    </td>
                    <td className="px-4 py-2 text-right">
                      ¥{order.subtotal.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-2 text-right font-medium"
                    >
                      消費税
                    </td>
                    <td className="px-4 py-2 text-right">
                      ¥{order.tax.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td
                      colSpan={4}
                      className="px-4 py-2 text-right font-medium"
                    >
                      合計金額
                    </td>
                    <td className="px-4 py-2 text-right font-bold">
                      ¥{order.total.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </Card>
          </div>
        </TabsContent>

        {/* 工程管理タブ */}
        <TabsContent value="process" className="space-y-6">
          <Card className="p-4">
            <h3 className="font-medium mb-6 flex items-center">
              <Package className="mr-2 h-4 w-4" />
              製造工程
            </h3>

            {/* 工程ステップ */}
            <div className="relative">
              {/* 進捗バー */}
              <div className="absolute top-5 left-7 h-full w-0.5 bg-gray-200 -z-10" />

              {/* 工程ステップのリスト */}
              <div className="space-y-8">
                {order.process.steps.map((step) => (
                  <div key={step.id} className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      {getStepStatusIcon(step.status)}
                    </div>
                    <div
                      className={`flex-grow border rounded-md p-4 ${getStepStatusStyle(
                        step.status
                      )}`}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium">{step.name}</h4>
                        <Badge
                          variant={
                            step.status === 'completed'
                              ? 'default'
                              : step.status === 'in_progress'
                                ? 'default'
                                : 'outline'
                          }
                        >
                          {step.status === 'completed'
                            ? '完了'
                            : step.status === 'in_progress'
                              ? '作業中'
                              : '未着手'}
                        </Badge>
                      </div>
                      {step.status !== 'pending' && (
                        <div className="mt-2 text-sm space-y-1">
                          <p>
                            <span className="text-gray-500 mr-2">担当:</span>
                            {step.staff}
                          </p>
                          <p>
                            <span className="text-gray-500 mr-2">日時:</span>
                            {step.date}
                          </p>
                          {step.note && (
                            <p>
                              <span className="text-gray-500 mr-2">備考:</span>
                              {step.note}
                            </p>
                          )}
                        </div>
                      )}
                      {step.status === 'pending' && (
                        <div className="mt-2">
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            ステップを開始
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button variant="default">
                <Truck className="mr-2 h-4 w-4" />
                納品完了にする
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* 履歴タブ */}
        <TabsContent value="history">
          <Card className="p-4">
            <h3 className="font-medium mb-4 flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              受注履歴
            </h3>
            <div className="space-y-4">
              {order.history.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b last:border-0"
                >
                  <div className="min-w-32">
                    <p className="text-sm">{item.date}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{item.action}</Badge>
                      <span className="text-sm">{item.user}</span>
                    </div>
                    {item.comment && (
                      <p className="text-sm text-gray-600 mt-1">
                        {item.comment}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
