import { Button } from '@kit/ui/button';
import { Card } from '@kit/ui/card';
import { Label } from '@kit/ui/label';
import {
  ArrowLeft,
  Calculator,
  CreditCard,
  Edit,
  Plus,
  Save,
  Send,
  Trash,
  User,
} from 'lucide-react';
import Link from 'next/link';

// モックデータ
const quoteData = {
  id: 'q-123456',
  number: 'Q-2023-12345',
  status: 'draft',
  title: '企業パンフレット印刷 A4カラー 1000部',
  customer: {
    id: 'cust-123',
    name: '株式会社ABC商事',
    address: '123-4567 東京都新宿区西新宿1-1-1',
    contact: '山田太郎',
    email: 'yamada@abc-shoji.co.jp',
  },
  createdAt: '2023-10-01',
  validUntil: '2023-10-31',
  items: [
    {
      id: 'item-1',
      name: 'A4カラーパンフレット印刷',
      description: 'コート紙128g/㎡、カラー4色、両面印刷',
      quantity: 1000,
      unitPrice: 150,
      taxRate: 10,
      amount: 150000,
    },
    {
      id: 'item-2',
      name: 'デザイン料',
      description: 'パンフレットデザイン（4ページ分）',
      quantity: 1,
      unitPrice: 50000,
      taxRate: 10,
      amount: 50000,
    },
    {
      id: 'item-3',
      name: '納品料',
      quantity: 1,
      unitPrice: 5000,
      taxRate: 10,
      amount: 5000,
    },
  ],
  subtotal: 205000,
  tax: 20500,
  total: 225500,
  cost: 123000,
  profit: 102500,
  profitRate: 40,
  notes:
    '・納期：校了後7営業日\n・お支払い条件：納品月末締め翌月末払い\n・見積有効期限：発行日より30日間',
};

export default async function EditQuotePage({
  params,
}: { params: Promise<{ id: string }> }) {
  // 実際の実装では、params.idを使用して見積データを取得する
  const resolvedParams = await params;
  const quote = quoteData;

  return (
    <div className="space-y-6 p-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href={`/quotes/${quote.id}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">見積編集</h1>
          <div className="text-sm text-gray-500">#{quote.number}</div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calculator className="mr-2 h-4 w-4" />
            原価計算
          </Button>
          <Button variant="destructive" size="sm">
            <Trash className="mr-2 h-4 w-4" />
            削除
          </Button>
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            保存
          </Button>
          <Button variant="default" size="sm">
            <Send className="mr-2 h-4 w-4" />
            保存して送信
          </Button>
        </div>
      </div>

      {/* フォーム */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 左側 */}
        <div className="md:col-span-2 space-y-6">
          {/* 基本情報 */}
          <Card className="p-4">
            <h2 className="font-medium mb-4">基本情報</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  見積番号
                </Label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-gray-50"
                  value={quote.number}
                  readOnly
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  作成日
                </Label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md"
                  defaultValue={quote.createdAt}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  有効期限
                </Label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md"
                  defaultValue={quote.validUntil}
                />
              </div>
              <div className="md:col-span-3">
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  タイトル
                </Label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  defaultValue={quote.title}
                />
              </div>
            </div>
          </Card>

          {/* 顧客情報 */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium flex items-center">
                <User className="mr-2 h-4 w-4" />
                顧客情報
              </h2>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                変更
              </Button>
            </div>
            <div className="flex items-center mb-3">
              <span className="text-primary font-medium">
                {quote.customer.name}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  担当者
                </Label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  defaultValue={quote.customer.contact}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  メールアドレス
                </Label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md"
                  defaultValue={quote.customer.email}
                />
              </div>
            </div>
          </Card>

          {/* 明細 */}
          <Card className="p-4">
            <h2 className="font-medium mb-4">見積明細</h2>
            <div className="space-y-4">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs">
                  <tr>
                    <th className="px-3 py-2 text-left">項目</th>
                    <th className="px-3 py-2 text-center w-24">数量</th>
                    <th className="px-3 py-2 text-right w-28">単価</th>
                    <th className="px-3 py-2 text-center w-16">税率</th>
                    <th className="px-3 py-2 text-right w-28">金額</th>
                    <th className="px-3 py-2 w-12" />
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {quote.items.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-3 py-3">
                        <input
                          type="text"
                          className="w-full p-1.5 border rounded-md"
                          defaultValue={item.name}
                        />
                        <input
                          type="text"
                          className="w-full p-1.5 border rounded-md mt-1 text-sm text-gray-500"
                          defaultValue={item.description || ''}
                          placeholder="詳細説明（オプション）"
                        />
                      </td>
                      <td className="px-3 py-3">
                        <input
                          type="number"
                          className="w-full p-1.5 border rounded-md text-center"
                          defaultValue={item.quantity}
                          min="1"
                        />
                      </td>
                      <td className="px-3 py-3">
                        <div className="relative">
                          <span className="absolute left-3 top-2.5">¥</span>
                          <input
                            type="number"
                            className="w-full p-1.5 pl-6 border rounded-md text-right"
                            defaultValue={item.unitPrice}
                            min="0"
                          />
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <select
                          className="w-full p-1.5 border rounded-md text-center"
                          defaultValue={item.taxRate}
                        >
                          <option value="10">10%</option>
                          <option value="8">8%</option>
                          <option value="0">0%</option>
                        </select>
                      </td>
                      <td className="px-3 py-3">
                        <div className="relative">
                          <span className="absolute left-3 top-2.5">¥</span>
                          <input
                            type="number"
                            className="w-full p-1.5 pl-6 border rounded-md text-right bg-gray-50"
                            defaultValue={item.amount}
                            readOnly
                          />
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  明細を追加
                </Button>
              </div>

              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">小計</span>
                    <span className="font-medium">
                      ¥{quote.subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">消費税</span>
                    <span className="font-medium">
                      ¥{quote.tax.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span className="font-medium">合計</span>
                    <span className="font-bold">
                      ¥{quote.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* 備考 */}
          <Card className="p-4">
            <h2 className="font-medium mb-4">備考</h2>
            <textarea
              className="w-full p-2 border rounded-md h-32"
              defaultValue={quote.notes}
              placeholder="納期、支払条件など補足情報を入力してください"
            />
          </Card>
        </div>

        {/* 右側 */}
        <div className="space-y-6">
          {/* 原価情報 */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                原価情報
              </h2>
              <Button variant="outline" size="sm">
                <Calculator className="mr-2 h-4 w-4" />
                詳細計算
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  原価合計
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">¥</span>
                  <input
                    type="number"
                    className="w-full p-2 pl-8 border rounded-md"
                    defaultValue={quote.cost}
                    min="0"
                  />
                </div>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  利益率（%）
                </Label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  defaultValue={quote.profitRate}
                  min="0"
                  max="100"
                />
                <div className="mt-1 flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="80"
                    step="5"
                    defaultValue={quote.profitRate}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">利益</span>
                  <span className="font-medium">
                    ¥{quote.profit.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">利益率</span>
                  <span className="font-medium">{quote.profitRate}%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* プレビューとアクション */}
          <Card className="p-4">
            <h2 className="font-medium mb-4">プレビューとアクション</h2>
            <div className="space-y-4">
              <Link href={`/quotes/${quote.id}`}>
                <Button variant="outline" className="w-full">
                  変更をキャンセル
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                プレビュー表示
              </Button>
              <Button variant="outline" className="w-full">
                <Save className="mr-2 h-4 w-4" />
                下書きとして保存
              </Button>
              <Button variant="default" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                保存して送信
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
