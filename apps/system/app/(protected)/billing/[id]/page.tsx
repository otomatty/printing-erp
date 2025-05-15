import {
  ArrowLeft,
  Check,
  Clock,
  CreditCard,
  Download,
  Edit,
  FileText,
  Info,
  Mail,
  MoreHorizontal,
  Package,
  Printer,
  Send,
  User,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import { Card } from '@kit/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';

// 請求書詳細のモックデータ
const invoiceData = {
  id: 'INV-2023-0002',
  status: 'sent', // draft, sent, paid, overdue, canceled
  title: '会社案内パンフレット A4 12P 500部',
  customer: {
    id: 'cus-002',
    name: '××デザイン事務所',
    contact: '佐藤花子',
    email: 'sato@xx-design.co.jp',
    phone: '03-9876-5432',
    address: '東京都渋谷区○○1-2-3',
    taxId: 'T1234567890123',
  },
  order: {
    id: 'ORD-2023-0006',
    status: 'in_progress',
  },
  issuedAt: '2023年7月23日',
  dueDate: '2023年8月31日',
  paidAt: null,
  paymentMethod: '銀行振込',
  paymentTerms: '請求書発行後30日以内',
  subtotal: 150000,
  tax: 15000,
  total: 165000,
  items: [
    {
      id: 'item-1',
      name: '会社案内パンフレット A4 12P',
      description:
        '用紙：コート紙 135kg\n印刷：オフセット印刷 両面4色\n加工：無線綴じ、PP加工',
      quantity: 500,
      unit: '部',
      unitPrice: 300,
      amount: 150000,
      taxRate: 10,
    },
  ],
  notes:
    '・ご不明点がございましたら、担当営業までお問い合わせください。\n・お支払いは請求書記載の銀行口座にお振込みください。',
  bankInfo: {
    bankName: 'サンプル銀行',
    branchName: '本店',
    accountType: '普通',
    accountNumber: '1234567',
    accountName: 'ニイヌマキカク（カ',
  },
  history: [
    {
      id: 'his-1',
      date: '2023年7月23日 15:30',
      user: '田中',
      action: '請求書作成',
    },
    {
      id: 'his-2',
      date: '2023年7月23日 16:15',
      user: '田中',
      action: 'メール送信',
    },
  ],
};

// ステータスに応じたアイコンとカラーを返す関数
const getStatusDetails = (status: string) => {
  switch (status) {
    case 'draft':
      return {
        icon: <FileText size={16} />,
        color: 'bg-gray-100 text-gray-800',
        label: '下書き',
      };
    case 'sent':
      return {
        icon: <Check size={16} />,
        color: 'bg-blue-100 text-blue-800',
        label: '送信済み',
      };
    case 'paid':
      return {
        icon: <Check size={16} />,
        color: 'bg-green-100 text-green-800',
        label: '入金済み',
      };
    case 'overdue':
      return {
        icon: <X size={16} />,
        color: 'bg-red-100 text-red-800',
        label: '期限超過',
      };
    case 'canceled':
      return {
        icon: <X size={16} />,
        color: 'bg-orange-100 text-orange-800',
        label: 'キャンセル',
      };
    default:
      return {
        icon: <FileText size={16} />,
        color: 'bg-gray-100 text-gray-800',
        label: '不明',
      };
  }
};

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 実際の実装では、paramsのIDを使用して請求書データを取得する
  const resolvedParams = await params;
  const invoice = invoiceData;
  const { icon, color, label } = getStatusDetails(invoice.status);

  // 支払い期限が過ぎているかどうかをチェック
  const isOverdue =
    !invoice.paidAt &&
    new Date(invoice.dueDate) < new Date() &&
    invoice.status !== 'paid';

  // 支払い状況ステータス
  const paymentStatus = invoice.paidAt
    ? '入金済み'
    : isOverdue
      ? '期限超過'
      : '未入金';
  const paymentStatusColor = invoice.paidAt
    ? 'bg-green-100 text-green-800'
    : isOverdue
      ? 'bg-red-100 text-red-800'
      : 'bg-yellow-100 text-yellow-800';

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
          <h1 className="text-xl font-bold">請求書詳細</h1>
          <Badge
            className={color.replace('bg-', 'bg-').replace('text-', 'text-')}
          >
            {label}
          </Badge>
          {isOverdue && (
            <Badge variant="outline" className="text-red-500 border-red-500">
              期限超過
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            印刷
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            PDFダウンロード
          </Button>
          {invoice.status === 'draft' && (
            <Link href={`/billing/${invoice.id}/edit`}>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                編集
              </Button>
            </Link>
          )}
          {invoice.status !== 'paid' && invoice.status !== 'canceled' && (
            <Button variant="default" size="sm">
              <Send className="mr-2 h-4 w-4" />
              送信
            </Button>
          )}
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* コンテンツ */}
      <Tabs defaultValue="details">
        <TabsList className="mb-4">
          <TabsTrigger value="details">情報</TabsTrigger>
          <TabsTrigger value="preview">プレビュー</TabsTrigger>
          <TabsTrigger value="history">履歴</TabsTrigger>
        </TabsList>

        {/* 情報タブ */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 請求書情報 */}
            <Card className="p-4 col-span-2">
              <h3 className="font-medium mb-4">請求書情報</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">請求書番号</p>
                  <p>{invoice.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ステータス</p>
                  <Badge
                    className={color
                      .replace('bg-', 'bg-')
                      .replace('text-', 'text-')}
                  >
                    {label}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">発行日</p>
                  <p>{invoice.issuedAt}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">支払期限</p>
                  <p className={isOverdue ? 'text-red-500' : ''}>
                    {invoice.dueDate}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">タイトル</p>
                  <p className="font-medium">{invoice.title}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">受注番号</p>
                  <p>
                    <Link
                      href={`/orders/${invoice.order.id}`}
                      className="text-primary hover:underline"
                    >
                      {invoice.order.id}
                    </Link>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">受注ステータス</p>
                  <Badge
                    className={
                      invoice.order.status === 'in_progress'
                        ? 'bg-blue-500'
                        : invoice.order.status === 'completed'
                          ? 'bg-green-500'
                          : 'bg-yellow-500'
                    }
                  >
                    {invoice.order.status === 'in_progress'
                      ? '製造中'
                      : invoice.order.status === 'completed'
                        ? '製造完了'
                        : '準備中'}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">お支払い方法</p>
                    <p>{invoice.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">お支払い条件</p>
                    <p>{invoice.paymentTerms}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t">
                <p className="text-sm text-gray-500 mb-2">お振込先</p>
                <div className="text-sm bg-gray-50 p-3 rounded-md">
                  <p>
                    {invoice.bankInfo.bankName} {invoice.bankInfo.branchName}
                  </p>
                  <p>
                    {invoice.bankInfo.accountType}{' '}
                    {invoice.bankInfo.accountNumber}
                  </p>
                  <p>{invoice.bankInfo.accountName}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t">
                <p className="text-sm text-gray-500 mb-2">備考</p>
                <div className="whitespace-pre-line text-sm border p-2 rounded-md mt-1 bg-gray-50">
                  {invoice.notes}
                </div>
              </div>
            </Card>

            {/* 顧客・支払い情報 */}
            <Card className="p-4">
              {/* 顧客情報 */}
              <h3 className="font-medium mb-4 flex items-center">
                <User className="mr-2 h-4 w-4" />
                請求先
              </h3>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Link href={`/customers/${invoice.customer.id}`}>
                    <span className="font-medium text-primary hover:underline">
                      {invoice.customer.name}
                    </span>
                  </Link>
                </div>
                <p className="text-sm">{invoice.customer.contact}</p>
                <p className="text-sm mt-2">{invoice.customer.address}</p>
                <p className="text-sm mt-2">
                  <span className="text-gray-500">事業者番号: </span>
                  {invoice.customer.taxId}
                </p>
              </div>
              <div className="text-sm space-y-1 mb-4">
                <p className="flex items-center">
                  <span className="text-gray-500 mr-2">Email:</span>
                  <a
                    href={`mailto:${invoice.customer.email}`}
                    className="text-primary hover:underline"
                  >
                    {invoice.customer.email}
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="text-gray-500 mr-2">Tel:</span>
                  {invoice.customer.phone}
                </p>
              </div>

              {/* 支払い状況 */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-4 flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  入金ステータス
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">ステータス</p>
                    <Badge className={paymentStatusColor}>
                      {paymentStatus}
                    </Badge>
                  </div>
                  {invoice.paidAt && (
                    <div>
                      <p className="text-sm text-gray-500">入金日</p>
                      <p className="font-medium">{invoice.paidAt}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">請求金額</p>
                    <p className="font-medium text-lg">
                      ¥{invoice.total.toLocaleString()}
                    </p>
                  </div>
                </div>

                {!invoice.paidAt && (
                  <div className="mt-4 pt-4 border-t">
                    <Button variant="default" size="sm" className="w-full">
                      <Check className="mr-2 h-4 w-4" />
                      入金処理
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* 請求明細 */}
            <Card className="p-4 col-span-2">
              <h3 className="font-medium mb-4">請求明細</h3>
              <table className="w-full">
                <thead className="bg-gray-50 text-xs">
                  <tr>
                    <th className="px-4 py-2 text-left">項目</th>
                    <th className="px-4 py-2 text-center">数量</th>
                    <th className="px-4 py-2 text-right">単価</th>
                    <th className="px-4 py-2 text-center">税率</th>
                    <th className="px-4 py-2 text-right">金額</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3">
                        <div className="font-medium">{item.name}</div>
                        {item.description && (
                          <div className="text-xs text-gray-500 whitespace-pre-line">
                            {item.description}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {item.quantity.toLocaleString()}
                        {item.unit}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        ¥{item.unitPrice.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">{item.taxRate}%</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        ¥{item.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="text-sm">
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-2 text-right font-medium"
                    >
                      小計
                    </td>
                    <td className="px-4 py-2 text-right">
                      ¥{invoice.subtotal.toLocaleString()}
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
                      ¥{invoice.tax.toLocaleString()}
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
                      ¥{invoice.total.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </Card>

            {/* 支払い情報 */}
            <Card className="p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <Info className="mr-2 h-4 w-4" />
                支払い期日情報
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">発行日:</span>
                  <span>{invoice.issuedAt}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">支払期限:</span>
                  <span className={isOverdue ? 'text-red-500 font-medium' : ''}>
                    {invoice.dueDate}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">お支払い方法:</span>
                  <span>{invoice.paymentMethod}</span>
                </div>
                {invoice.paidAt && (
                  <div className="flex justify-between items-center text-green-600">
                    <span className="text-sm">入金日:</span>
                    <span className="font-medium">{invoice.paidAt}</span>
                  </div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center font-medium">
                  <span>残金:</span>
                  <span className={invoice.paidAt ? 'text-green-600' : ''}>
                    {invoice.paidAt
                      ? '¥0'
                      : `¥${invoice.total.toLocaleString()}`}
                  </span>
                </div>
              </div>
              {!invoice.paidAt && (
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="mr-2 h-4 w-4" />
                    リマインド送信
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* プレビュータブ */}
        <TabsContent value="preview" className="h-[calc(100vh-250px)]">
          <Card className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">請求書プレビュー</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  印刷
                </Button>
              </div>
            </div>
            <div className="flex-1 border rounded-md p-8 bg-white overflow-auto">
              {/* 請求書プレビュー（実際の実装ではここにPDFビューワーやHTMLレンダリングを行う） */}
              <div className="mx-auto max-w-3xl">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h1 className="text-2xl font-bold">請求書</h1>
                    <p className="text-gray-600">{invoice.id}</p>
                  </div>
                  <div className="text-right">
                    <div className="mb-2">
                      <p className="font-bold text-xl">印刷会社</p>
                      <p className="text-sm">
                        〒100-0001 東京都千代田区○○1-1-1
                      </p>
                      <p className="text-sm">Tel: 03-1234-5678</p>
                      <p className="text-sm">Email: info@example.com</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">発行日:</p>
                      <p>{invoice.issuedAt}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">支払期限:</p>
                      <p
                        className={isOverdue ? 'text-red-500 font-medium' : ''}
                      >
                        {invoice.dueDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="font-bold mb-2 text-gray-700">請求先:</h2>
                  <p className="font-medium">{invoice.customer.name}</p>
                  <p>{invoice.customer.contact} 様</p>
                  <p>{invoice.customer.address}</p>
                  <p>Tel: {invoice.customer.phone}</p>
                  <p>Email: {invoice.customer.email}</p>
                </div>

                <table className="w-full border-collapse mb-8">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">項目</th>
                      <th className="border p-2 text-center">数量</th>
                      <th className="border p-2 text-right">単価</th>
                      <th className="border p-2 text-center">税率</th>
                      <th className="border p-2 text-right">金額</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item) => (
                      <tr key={item.id}>
                        <td className="border p-2">
                          <div>{item.name}</div>
                          <div className="text-xs text-gray-500">
                            {item.description}
                          </div>
                        </td>
                        <td className="border p-2 text-center">
                          {item.quantity.toLocaleString()}
                          {item.unit}
                        </td>
                        <td className="border p-2 text-right">
                          ¥{item.unitPrice.toLocaleString()}
                        </td>
                        <td className="border p-2 text-center">
                          {item.taxRate}%
                        </td>
                        <td className="border p-2 text-right">
                          ¥{item.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colSpan={4}
                        className="border p-2 text-right font-medium"
                      >
                        小計
                      </td>
                      <td className="border p-2 text-right">
                        ¥{invoice.subtotal.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={4}
                        className="border p-2 text-right font-medium"
                      >
                        消費税
                      </td>
                      <td className="border p-2 text-right">
                        ¥{invoice.tax.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td
                        colSpan={4}
                        className="border p-2 text-right font-medium"
                      >
                        合計金額
                      </td>
                      <td className="border p-2 text-right font-bold">
                        ¥{invoice.total.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>

                <div className="mb-8">
                  <h2 className="font-bold mb-2 text-gray-700">
                    お支払い情報:
                  </h2>
                  <p className="mb-1">支払方法: {invoice.paymentMethod}</p>
                  <p className="mb-1">支払条件: {invoice.paymentTerms}</p>
                  <div className="mt-2 p-2 border rounded bg-gray-50">
                    <p className="font-medium">振込先:</p>
                    <p>
                      {invoice.bankInfo.bankName} {invoice.bankInfo.branchName}
                    </p>
                    <p>
                      {invoice.bankInfo.accountType}{' '}
                      {invoice.bankInfo.accountNumber}
                    </p>
                    <p>{invoice.bankInfo.accountName}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h2 className="font-bold mb-2 text-gray-700">備考:</h2>
                  <p className="whitespace-pre-line text-sm">{invoice.notes}</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* 履歴タブ */}
        <TabsContent value="history">
          <Card className="p-4">
            <h3 className="font-medium mb-4 flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              請求履歴
            </h3>
            <div className="space-y-4">
              {invoice.history.map((item) => (
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
