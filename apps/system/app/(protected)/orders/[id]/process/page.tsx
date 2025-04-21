import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Edit,
  FileText,
  PackageCheck,
  Plus,
  Save,
  Send,
  ShoppingCart,
  Truck,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import { Card } from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { Textarea } from '@kit/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@kit/ui/dialog';

// 受注詳細のモックデータ
const orderData = {
  id: 'ORD-2023-0001',
  number: 'ORD-2023-0001',
  status: 'in_progress',
  title: 'チラシ印刷 A4 両面フルカラー 1,000部',
  customer: {
    name: '株式会社サンプル',
  },
  quoteId: 'QT-2023-0001',
  createdAt: '2023年7月5日',
  deadline: '2023年7月25日',
  process: {
    currentStep: 2,
    steps: [
      {
        id: 1,
        name: '受付',
        description: '受注情報の確認と製造指示書の作成',
        status: 'completed',
        date: '2023年7月5日',
        startTime: '10:00',
        endTime: '10:30',
        staff: '佐藤',
        note: '受注確定',
        scheduledStart: '2023-07-05T10:00',
        scheduledEnd: '2023-07-05T10:30',
      },
      {
        id: 2,
        name: '製版',
        description: '印刷用データの確認と製版作業',
        status: 'completed',
        date: '2023年7月10日',
        startTime: '09:00',
        endTime: '14:00',
        staff: '鈴木',
        note: 'データチェック完了',
        scheduledStart: '2023-07-10T09:00',
        scheduledEnd: '2023-07-10T15:00',
      },
      {
        id: 3,
        name: '印刷',
        description: '印刷機によるチラシの印刷',
        status: 'in_progress',
        date: '2023年7月15日',
        startTime: '09:00',
        endTime: '',
        staff: '田中',
        note: '印刷中',
        scheduledStart: '2023-07-15T09:00',
        scheduledEnd: '2023-07-16T12:00',
      },
      {
        id: 4,
        name: '加工',
        description: '断裁など仕上げ加工',
        status: 'pending',
        date: '',
        startTime: '',
        endTime: '',
        staff: '',
        note: '',
        scheduledStart: '2023-07-17T09:00',
        scheduledEnd: '2023-07-17T17:00',
      },
      {
        id: 5,
        name: '検品',
        description: '品質チェックと数量確認',
        status: 'pending',
        date: '',
        startTime: '',
        endTime: '',
        staff: '',
        note: '',
        scheduledStart: '2023-07-18T09:00',
        scheduledEnd: '2023-07-18T12:00',
      },
      {
        id: 6,
        name: '出荷',
        description: '梱包と出荷準備',
        status: 'pending',
        date: '',
        startTime: '',
        endTime: '',
        staff: '',
        note: '',
        scheduledStart: '2023-07-20T09:00',
        scheduledEnd: '2023-07-20T12:00',
      },
    ],
  },
};

// スタッフのモックデータ
const staffList = [
  { id: 'staff-1', name: '佐藤' },
  { id: 'staff-2', name: '鈴木' },
  { id: 'staff-3', name: '田中' },
  { id: 'staff-4', name: '高橋' },
  { id: 'staff-5', name: '伊藤' },
];

export default async function OrderProcessPage({
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
          <Link href={`/orders/${order.id}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">工程管理</h1>
          <Badge className={statusInfo.class}>{statusInfo.label}</Badge>
          <div className="text-sm text-gray-500">#{order.number}</div>
        </div>
        <div className="flex gap-2">
          <Link href={`/orders/${order.id}`}>
            <Button variant="outline" size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" />
              受注詳細
            </Button>
          </Link>
          <Button variant="default" size="sm">
            <Truck className="mr-2 h-4 w-4" />
            納品完了にする
          </Button>
        </div>
      </div>

      {/* 受注基本情報 */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">受注番号</p>
            <p className="font-medium">{order.number}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">顧客名</p>
            <p className="font-medium">{order.customer.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">タイトル</p>
            <p className="font-medium">{order.title}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">納期</p>
            <p className="font-medium text-red-600">{order.deadline}</p>
          </div>
        </div>
      </Card>

      {/* 工程進捗表示 */}
      <Card className="p-4">
        <h3 className="font-medium mb-4 flex items-center">
          <PackageCheck className="mr-2 h-5 w-5" />
          製造工程進捗
        </h3>

        {/* 進捗バー */}
        <div className="mb-8 relative pt-2">
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{
                width: `${
                  (order.process.steps.filter(
                    (step) => step.status === 'completed'
                  ).length /
                    order.process.steps.length) *
                  100
                }%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>0%</span>
            <span>100%</span>
          </div>
          <div className="absolute top-0 left-0 w-full flex justify-between">
            {order.process.steps.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col items-center"
                style={{
                  left: `${(index / (order.process.steps.length - 1)) * 100}%`,
                }}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    step.status === 'completed'
                      ? 'bg-green-500'
                      : step.status === 'in_progress'
                        ? 'bg-blue-500'
                        : 'bg-gray-300'
                  }`}
                >
                  {step.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 text-white" />
                  ) : (
                    <span className="text-white text-xs">{step.id}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 工程テーブル */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">工程</TableHead>
              <TableHead>工程名</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>担当者</TableHead>
              <TableHead>予定日時</TableHead>
              <TableHead>実績日時</TableHead>
              <TableHead className="w-[100px]">アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.process.steps.map((step) => (
              <TableRow key={step.id}>
                <TableCell className="font-medium">{step.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{step.name}</div>
                  <div className="text-xs text-gray-500">
                    {step.description}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      step.status === 'completed'
                        ? 'default'
                        : step.status === 'in_progress'
                          ? 'default'
                          : 'outline'
                    }
                    className={
                      step.status === 'completed'
                        ? 'bg-green-500'
                        : step.status === 'in_progress'
                          ? 'bg-blue-500'
                          : ''
                    }
                  >
                    {step.status === 'completed'
                      ? '完了'
                      : step.status === 'in_progress'
                        ? '作業中'
                        : '未着手'}
                  </Badge>
                </TableCell>
                <TableCell>{step.staff || '-'}</TableCell>
                <TableCell>
                  {step.scheduledStart
                    ? `${new Date(step.scheduledStart).toLocaleDateString(
                        'ja-JP',
                        {
                          month: 'numeric',
                          day: 'numeric',
                        }
                      )} ${new Date(step.scheduledStart).toLocaleTimeString(
                        'ja-JP',
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        }
                      )} 〜 ${new Date(step.scheduledEnd).toLocaleTimeString(
                        'ja-JP',
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        }
                      )}`
                    : '-'}
                </TableCell>
                <TableCell>
                  {step.date
                    ? `${step.date} ${step.startTime}${
                        step.endTime ? ` 〜 ${step.endTime}` : ''
                      }`
                    : '-'}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={
                            step.status === 'pending' &&
                            order.process.steps.findIndex(
                              (s) => s.id === step.id
                            ) >
                              order.process.steps.findIndex(
                                (s) => s.status === 'in_progress'
                              ) +
                                1
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>
                            工程{step.id}: {step.name}
                          </DialogTitle>
                          <DialogDescription>
                            この工程の進捗情報を更新してください。
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor={`status-${step.id}`}
                              className="text-right"
                            >
                              ステータス
                            </Label>
                            <select
                              id={`status-${step.id}`}
                              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              defaultValue={step.status}
                            >
                              <option value="pending">未着手</option>
                              <option value="in_progress">作業中</option>
                              <option value="completed">完了</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor={`staff-${step.id}`}
                              className="text-right"
                            >
                              担当者
                            </Label>
                            <select
                              id={`staff-${step.id}`}
                              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              defaultValue={step.staff}
                            >
                              <option value="">担当者を選択...</option>
                              {staffList.map((staff) => (
                                <option key={staff.id} value={staff.name}>
                                  {staff.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor={`date-${step.id}`}
                              className="text-right"
                            >
                              日付
                            </Label>
                            <Input
                              id={`date-${step.id}`}
                              type="date"
                              className="col-span-3"
                              defaultValue={
                                step.date
                                  ? step.date
                                      .replace(/年|月/g, '-')
                                      .replace(/日/g, '')
                                  : ''
                              }
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor={`startTime-${step.id}`}
                              className="text-right"
                            >
                              開始時間
                            </Label>
                            <Input
                              id={`startTime-${step.id}`}
                              type="time"
                              className="col-span-3"
                              defaultValue={step.startTime}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor={`endTime-${step.id}`}
                              className="text-right"
                            >
                              終了時間
                            </Label>
                            <Input
                              id={`endTime-${step.id}`}
                              type="time"
                              className="col-span-3"
                              defaultValue={step.endTime}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor={`note-${step.id}`}
                              className="text-right"
                            >
                              備考
                            </Label>
                            <Textarea
                              id={`note-${step.id}`}
                              className="col-span-3"
                              defaultValue={step.note}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">保存</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* 工程スケジュール */}
      <Card className="p-4">
        <h3 className="font-medium mb-4 flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          スケジュール
        </h3>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="bg-white border rounded-md">
              <div className="grid grid-cols-7 gap-px bg-gray-200">
                {['月', '火', '水', '木', '金', '土', '日'].map((day) => (
                  <div
                    key={day}
                    className="bg-gray-50 p-2 text-center text-sm font-medium"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-px bg-gray-200">
                {Array.from({ length: 28 }, (_, i) => {
                  const day = i + 1;
                  // 受注の納期が7/25なので、それを過ぎたら赤色にする
                  const isAfterDeadline = day > 25;
                  // 今日は7/15と仮定
                  const isToday = day === 15;
                  // 土日判定（簡易的に偶数週の土日を判定）
                  const isWeekend = day % 7 === 2 || day % 7 === 3;

                  return (
                    <div
                      key={day}
                      className={`bg-white p-2 min-h-24 ${
                        isAfterDeadline ? 'bg-red-50' : ''
                      } ${isToday ? 'ring-2 ring-blue-500' : ''} ${
                        isWeekend ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span
                          className={`text-sm font-medium ${
                            isAfterDeadline ? 'text-red-600' : ''
                          }`}
                        >
                          7/{day}
                        </span>
                        {day === 25 && (
                          <Badge className="bg-red-500">納期</Badge>
                        )}
                      </div>
                      {/* その日のタスクを表示 */}
                      {day === 5 && (
                        <div className="bg-green-100 p-1 rounded text-xs mb-1">
                          受付
                        </div>
                      )}
                      {day === 10 && (
                        <div className="bg-green-100 p-1 rounded text-xs mb-1">
                          製版
                        </div>
                      )}
                      {day === 15 && (
                        <div className="bg-blue-100 p-1 rounded text-xs mb-1">
                          印刷開始
                        </div>
                      )}
                      {day === 16 && (
                        <div className="bg-blue-100 p-1 rounded text-xs mb-1">
                          印刷完了予定
                        </div>
                      )}
                      {day === 17 && (
                        <div className="bg-gray-100 p-1 rounded text-xs mb-1">
                          加工予定
                        </div>
                      )}
                      {day === 18 && (
                        <div className="bg-gray-100 p-1 rounded text-xs mb-1">
                          検品予定
                        </div>
                      )}
                      {day === 20 && (
                        <div className="bg-gray-100 p-1 rounded text-xs mb-1">
                          出荷予定
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
