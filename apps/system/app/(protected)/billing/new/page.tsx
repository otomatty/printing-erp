import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronsUpDown,
  Clock,
  FileText,
  Plus,
  Search,
  Trash,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';

// 受注リストのモックデータ
const orders = [
  {
    id: 'ORD-2023-0001',
    customer: '株式会社サンプル',
    title: 'チラシ印刷 A4 両面フルカラー 1,000部',
    status: 'completed',
    amount: 27500,
    createdAt: '2023/07/05',
    completedAt: '2023/07/20',
  },
  {
    id: 'ORD-2023-0007',
    customer: '□□出版',
    title: '雑誌広告 1P',
    status: 'completed',
    amount: 220000,
    createdAt: '2023/07/08',
    completedAt: '2023/07/18',
  },
  {
    id: 'ORD-2023-0006',
    customer: '××デザイン事務所',
    title: '会社案内パンフレット A4 12P 500部',
    status: 'in_progress',
    amount: 165000,
    createdAt: '2023/07/10',
    completedAt: null,
  },
];

// 顧客リストのモックデータ
const customers = [
  {
    id: 'cus-001',
    name: '株式会社サンプル',
    contact: '山田太郎',
    email: 'yamada@sample.co.jp',
    phone: '03-1234-5678',
    address: '東京都新宿区○○1-2-3',
  },
  {
    id: 'cus-002',
    name: '××デザイン事務所',
    contact: '佐藤花子',
    email: 'sato@xx-design.co.jp',
    phone: '03-9876-5432',
    address: '東京都渋谷区○○1-2-3',
  },
  {
    id: 'cus-003',
    name: '□□出版',
    contact: '鈴木一郎',
    email: 'suzuki@dd-pub.co.jp',
    phone: '03-5555-5555',
    address: '東京都文京区○○1-2-3',
  },
];

export default function NewInvoicePage() {
  // 実際の実装では、useState を使ってフォームの状態を管理します
  // ここではサーバーコンポーネントなので、静的な UI 表示のみ

  // 今日の日付をフォーマット
  const today = new Date();
  const formattedDate = `${today.getFullYear()}/${String(
    today.getMonth() + 1
  ).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;

  // 支払期限日（30日後）をフォーマット
  const dueDate = new Date();
  dueDate.setDate(today.getDate() + 30);
  const formattedDueDate = `${dueDate.getFullYear()}/${String(
    dueDate.getMonth() + 1
  ).padStart(2, '0')}/${String(dueDate.getDate()).padStart(2, '0')}`;

  // 請求書番号を生成
  const invoiceNumber = `INV-${today.getFullYear()}-${String(
    orders.length + 1
  ).padStart(4, '0')}`;

  return (
    <div className="space-y-6 p-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/billing">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">新規請求書作成</h1>
          <Badge className="bg-gray-100 text-gray-800">下書き</Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            プレビュー
          </Button>
          <Button variant="default" size="sm">
            <Check className="mr-2 h-4 w-4" />
            保存
          </Button>
        </div>
      </div>

      {/* タブ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 基本情報 */}
        <Card className="p-4 lg:col-span-2">
          <h3 className="font-medium mb-4">基本情報</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="invoice-number">請求書番号</Label>
              <Input
                id="invoice-number"
                defaultValue={invoiceNumber}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="invoice-status">ステータス</Label>
              <Select defaultValue="draft">
                <SelectTrigger id="invoice-status" className="mt-1">
                  <SelectValue placeholder="ステータスを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">下書き</SelectItem>
                  <SelectItem value="sent">送信済み</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="issue-date">発行日</Label>
              <div className="relative mt-1">
                <Input id="issue-date" defaultValue={formattedDate} />
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <Label htmlFor="due-date">支払期限</Label>
              <div className="relative mt-1">
                <Input id="due-date" defaultValue={formattedDueDate} />
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="title">タイトル</Label>
              <Input
                id="title"
                placeholder="例：会社案内パンフレット印刷 500部"
                className="mt-1"
              />
            </div>
          </div>

          <div className="border-t pt-4 mt-6">
            <h3 className="font-medium mb-4">受注から作成</h3>
            <p className="text-sm text-gray-500 mb-3">
              既存の受注データから請求書を自動生成できます
            </p>

            <div className="relative mb-4">
              <Input placeholder="受注番号、タイトルで検索..." />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <div className="border rounded-md mb-4">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">選択</th>
                    <th className="px-4 py-2 text-left font-medium">
                      受注番号
                    </th>
                    <th className="px-4 py-2 text-left font-medium">顧客名</th>
                    <th className="px-4 py-2 text-left font-medium">
                      タイトル
                    </th>
                    <th className="px-4 py-2 text-right font-medium">金額</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-4 py-2">
                        <input
                          type="radio"
                          name="order"
                          value={order.id}
                          className="h-4 w-4 rounded-full border-gray-300"
                        />
                      </td>
                      <td className="px-4 py-2 font-medium">{order.id}</td>
                      <td className="px-4 py-2">{order.customer}</td>
                      <td className="px-4 py-2">{order.title}</td>
                      <td className="px-4 py-2 text-right">
                        ¥{order.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              選択した受注から作成
            </Button>
          </div>
        </Card>

        {/* 顧客・支払い情報 */}
        <Card className="p-4">
          <h3 className="font-medium mb-4 flex items-center">
            <User className="mr-2 h-4 w-4" />
            請求先
          </h3>

          <div className="mb-4">
            <Label htmlFor="customer-select">顧客を選択</Label>
            <Select>
              <SelectTrigger id="customer-select" className="mt-1">
                <SelectValue placeholder="顧客を選択してください" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-md p-3 bg-gray-50 mb-4">
            <p className="font-medium">××デザイン事務所</p>
            <p className="text-sm">佐藤花子 様</p>
            <p className="text-sm mt-1">東京都渋谷区○○1-2-3</p>
            <p className="text-sm mt-2">
              <span className="text-gray-500">Email: </span>
              sato@xx-design.co.jp
            </p>
            <p className="text-sm">
              <span className="text-gray-500">Tel: </span>03-9876-5432
            </p>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-4 flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              支払い条件
            </h3>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="payment-method">お支払方法</Label>
                <Select defaultValue="bank">
                  <SelectTrigger id="payment-method" className="mt-1">
                    <SelectValue placeholder="お支払方法を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">銀行振込</SelectItem>
                    <SelectItem value="credit">クレジットカード</SelectItem>
                    <SelectItem value="cash">現金</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="payment-terms">お支払条件</Label>
                <Select defaultValue="30days">
                  <SelectTrigger id="payment-terms" className="mt-1">
                    <SelectValue placeholder="お支払条件を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">即時支払い</SelectItem>
                    <SelectItem value="15days">15日以内</SelectItem>
                    <SelectItem value="30days">30日以内</SelectItem>
                    <SelectItem value="end_of_month">
                      月末締め翌月末払い
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* 請求明細 */}
        <Card className="p-4 lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">請求明細</h3>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              明細を追加
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs">
                <tr>
                  <th className="px-4 py-2 text-left">項目</th>
                  <th className="px-4 py-2 w-24 text-right">数量</th>
                  <th className="px-4 py-2 w-16 text-center">単位</th>
                  <th className="px-4 py-2 w-32 text-right">単価</th>
                  <th className="px-4 py-2 w-24 text-center">税率</th>
                  <th className="px-4 py-2 w-32 text-right">金額</th>
                  <th className="px-4 py-2 w-16" />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">
                    <div>
                      <Input
                        placeholder="品目名"
                        defaultValue="会社案内パンフレット A4 12P"
                      />
                      <Textarea
                        placeholder="詳細説明（オプション）"
                        className="mt-2 text-sm h-20"
                        defaultValue="用紙：コート紙 135kg&#13;印刷：オフセット印刷 両面4色&#13;加工：無線綴じ、PP加工"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      type="number"
                      min="1"
                      defaultValue="500"
                      className="text-right"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input defaultValue="部" />
                  </td>
                  <td className="px-4 py-2">
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">¥</span>
                      <Input
                        type="number"
                        min="0"
                        defaultValue="300"
                        className="pl-7 text-right"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <Select defaultValue="10">
                      <SelectTrigger>
                        <SelectValue placeholder="税率" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0%</SelectItem>
                        <SelectItem value="8">8%</SelectItem>
                        <SelectItem value="10">10%</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-2">
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">¥</span>
                      <Input
                        type="number"
                        min="0"
                        defaultValue="150000"
                        className="pl-7 text-right"
                        readOnly
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              </tbody>
              <tfoot className="text-sm">
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-right font-medium">
                    小計
                  </td>
                  <td className="px-4 py-2">
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">¥</span>
                      <Input
                        type="number"
                        min="0"
                        defaultValue="150000"
                        className="pl-7 text-right"
                        readOnly
                      />
                    </div>
                  </td>
                  <td />
                </tr>
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-right font-medium">
                    消費税
                  </td>
                  <td className="px-4 py-2">
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">¥</span>
                      <Input
                        type="number"
                        min="0"
                        defaultValue="15000"
                        className="pl-7 text-right"
                        readOnly
                      />
                    </div>
                  </td>
                  <td />
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan={5} className="px-4 py-2 text-right font-medium">
                    合計金額
                  </td>
                  <td className="px-4 py-2">
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">¥</span>
                      <Input
                        type="number"
                        min="0"
                        defaultValue="165000"
                        className="pl-7 text-right font-medium"
                        readOnly
                      />
                    </div>
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>

        {/* 備考 */}
        <Card className="p-4 lg:col-span-3">
          <h3 className="font-medium mb-4">備考</h3>
          <Textarea
            placeholder="備考欄に表示するメッセージを入力してください"
            className="min-h-32"
            defaultValue="・ご不明点がございましたら、担当営業までお問い合わせください。&#13;・お支払いは請求書記載の銀行口座にお振込みください。"
          />
        </Card>

        {/* ボタン */}
        <div className="lg:col-span-3 flex justify-end gap-2">
          <Button variant="outline" size="lg">
            キャンセル
          </Button>
          <Button variant="outline" size="lg">
            下書き保存
          </Button>
          <Button size="lg">請求書を作成</Button>
        </div>
      </div>
    </div>
  );
}
