import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  FileText,
  PlusCircle,
  Save,
  Search,
  Send,
  Trash2,
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

// 顧客のモックデータ
const customers = [
  {
    id: 'cus-001',
    name: '株式会社サンプル',
    contact: '山田太郎',
    email: 'yamada@sample.co.jp',
  },
  {
    id: 'cus-002',
    name: '株式会社テスト',
    contact: '鈴木一郎',
    email: 'suzuki@test.co.jp',
  },
  {
    id: 'cus-003',
    name: '有限会社デモ',
    contact: '佐藤次郎',
    email: 'sato@demo.co.jp',
  },
];

// 見積のモックデータ
const quotes = [
  {
    id: 'QT-2023-0001',
    title: 'チラシ印刷 A4 両面フルカラー 1,000部',
    customer: '株式会社サンプル',
    amount: 27500,
    status: 'approved',
    createdAt: '2023-07-01',
  },
  {
    id: 'QT-2023-0002',
    title: '名刺印刷 両面フルカラー 100枚',
    customer: '株式会社テスト',
    amount: 5500,
    status: 'approved',
    createdAt: '2023-07-03',
  },
];

export default function NewOrderPage() {
  // 新規受注番号（実際には自動生成されるべき）
  const newOrderNumber = 'ORD-2023-0002';

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
          <h1 className="text-xl font-bold">新規受注登録</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            下書き保存
          </Button>
          <Button variant="default">
            <Send className="mr-2 h-4 w-4" />
            受注確定
          </Button>
        </div>
      </div>

      {/* タブコンテンツ */}
      <div className="space-y-6">
        {/* 見積から作成するセクション */}
        <Card className="p-4">
          <h3 className="font-medium mb-4 flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            見積から作成
          </h3>
          <div className="mb-4">
            <div className="flex mb-4">
              <Input
                type="text"
                placeholder="見積番号または顧客名で検索"
                className="max-w-sm"
              />
              <Button variant="outline" className="ml-2">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">見積番号</TableHead>
                    <TableHead>タイトル</TableHead>
                    <TableHead>顧客名</TableHead>
                    <TableHead className="text-right">金額</TableHead>
                    <TableHead className="w-[100px]">状態</TableHead>
                    <TableHead className="w-[100px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell>{quote.id}</TableCell>
                      <TableCell>{quote.title}</TableCell>
                      <TableCell>{quote.customer}</TableCell>
                      <TableCell className="text-right">
                        ¥{quote.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">承認済</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="default" size="sm">
                          選択
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>

        {/* 基本情報セクション */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 受注情報 */}
          <Card className="p-4 col-span-2">
            <h3 className="font-medium mb-4">受注情報</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="orderNumber">受注番号</Label>
                <Input
                  id="orderNumber"
                  type="text"
                  value={newOrderNumber}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="orderDate">受注日</Label>
                <div className="relative">
                  <Input id="orderDate" type="date" />
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>
              <div>
                <Label htmlFor="deadline">納期</Label>
                <div className="relative">
                  <Input id="deadline" type="date" />
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>
              <div className="col-span-2">
                <Label htmlFor="title">タイトル</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="受注のタイトルを入力"
                />
              </div>
              <div>
                <Label htmlFor="deliveryMethod">納品方法</Label>
                <select
                  id="deliveryMethod"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="pickup">店頭渡し</option>
                  <option value="delivery">配送</option>
                  <option value="installation">設置納品</option>
                </select>
              </div>
              <div>
                <Label htmlFor="deliveryNote">納品備考</Label>
                <Input
                  id="deliveryNote"
                  type="text"
                  placeholder="納品に関する備考"
                />
              </div>
              <div>
                <Label htmlFor="paymentMethod">支払い方法</Label>
                <select
                  id="paymentMethod"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="cash">現金</option>
                  <option value="credit">クレジットカード</option>
                  <option value="bank">銀行振込</option>
                  <option value="invoice">請求書払い</option>
                </select>
              </div>
              <div>
                <Label htmlFor="paymentDue">支払い条件</Label>
                <select
                  id="paymentDue"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="immediate">即時払い</option>
                  <option value="30days">納品後30日以内</option>
                  <option value="endOfMonth">納品月末締め翌月末払い</option>
                </select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="note">備考</Label>
                <Textarea
                  id="note"
                  placeholder="受注に関する備考を入力"
                  className="min-h-[100px]"
                />
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
              <Label htmlFor="customer">顧客選択</Label>
              <div className="relative">
                <select
                  id="customer"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">顧客を選択...</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="contactPerson">担当者</Label>
              <Input
                id="contactPerson"
                type="text"
                placeholder="担当者名を入力"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="担当者のメールアドレスを入力"
              />
            </div>
            <div className="flex justify-end mt-2">
              <Link href="/system/customers/new">
                <Button variant="outline" size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  新規顧客登録
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* 受注明細 */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">受注明細</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">商品/サービス</TableHead>
                <TableHead className="w-[100px] text-center">数量</TableHead>
                <TableHead className="w-[100px] text-right">単価</TableHead>
                <TableHead className="w-[80px] text-center">税率</TableHead>
                <TableHead className="text-right">金額</TableHead>
                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* 入力行 */}
              <TableRow>
                <TableCell>
                  <Input type="text" placeholder="商品またはサービス名" />
                  <Textarea
                    placeholder="詳細説明"
                    className="mt-2 min-h-[60px] text-sm"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Input type="number" min="1" defaultValue="1" />
                    <select className="ml-1 w-16 h-10 rounded-md border border-input bg-background px-2 py-2 text-xs">
                      <option value="部">部</option>
                      <option value="枚">枚</option>
                      <option value="個">個</option>
                      <option value="式">式</option>
                    </select>
                  </div>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="0"
                    step="100"
                    className="text-right"
                  />
                </TableCell>
                <TableCell>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-2 py-2 text-sm">
                    <option value="10">10%</option>
                    <option value="8">8%</option>
                    <option value="0">0%</option>
                  </select>
                </TableCell>
                <TableCell className="text-right">
                  <Input
                    type="text"
                    readOnly
                    value="¥0"
                    className="text-right"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
            <tfoot>
              <tr>
                <td colSpan={6} className="px-4 py-2">
                  <Button variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    明細を追加
                  </Button>
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="px-4 py-2 text-right font-medium">
                  小計
                </td>
                <td className="px-4 py-2 text-right">¥0</td>
                <td />
              </tr>
              <tr>
                <td colSpan={4} className="px-4 py-2 text-right font-medium">
                  消費税
                </td>
                <td className="px-4 py-2 text-right">¥0</td>
                <td />
              </tr>
              <tr className="bg-gray-50">
                <td colSpan={4} className="px-4 py-2 text-right font-medium">
                  合計金額
                </td>
                <td className="px-4 py-2 text-right font-bold">¥0</td>
                <td />
              </tr>
            </tfoot>
          </Table>
        </Card>
      </div>
    </div>
  );
}
