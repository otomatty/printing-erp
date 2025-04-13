import {
  ArrowLeft,
  Calculator,
  Calendar,
  CheckCircle,
  Copy,
  Download,
  Edit,
  FileText,
  Mail,
  Printer,
  ShoppingCart,
  User,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import { Card } from '@kit/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';
import {
  ClipboardCopy,
  Clock,
  CreditCard,
  Eye,
  MoreHorizontal,
  Send,
  Trash,
} from 'lucide-react';
import Image from 'next/image';
import QuotePreview from '@/components/Quote/QuotePreview';

// 見積詳細のモックデータ
const quoteData = {
  id: 'QT-2023-0001',
  status: 'sent', // draft, sent, accepted, rejected, expired
  title: 'チラシ印刷 A4 両面フルカラー 1,000部',
  customer: {
    id: 'cus-001',
    name: '株式会社サンプル',
    contact: '山田太郎',
    email: 'yamada@sample.co.jp',
    phone: '03-1234-5678',
  },
  createdAt: '2023年7月1日',
  validUntil: '2023年7月31日',
  subtotal: 25000,
  tax: 2500,
  total: 27500,
  cost: 15000,
  profit: 10000,
  profitRate: 40,
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
  notes:
    '・データ入稿締切：2023年7月15日\n・納期：2023年7月25日\n・お支払い条件：納品後翌月末払い',
  revisions: [
    {
      id: 'rev-1',
      date: '2023年7月1日',
      user: '佐藤',
      action: '作成',
    },
    {
      id: 'rev-2',
      date: '2023年7月3日',
      user: '佐藤',
      action: 'メール送信',
    },
  ],
};

// ステータスに応じたアイコンとカラーを返す関数
const getStatusDetails = (status: string) => {
  switch (status) {
    case 'draft':
      return {
        icon: <Calculator size={16} />,
        color: 'bg-gray-100 text-gray-800',
        label: '下書き',
      };
    case 'sent':
      return {
        icon: <CheckCircle size={16} />,
        color: 'bg-blue-100 text-blue-800',
        label: '送信済み',
      };
    case 'accepted':
      return {
        icon: <CheckCircle size={16} />,
        color: 'bg-green-100 text-green-800',
        label: '承認済み',
      };
    case 'rejected':
      return {
        icon: <X size={16} />,
        color: 'bg-red-100 text-red-800',
        label: '却下',
      };
    case 'expired':
      return {
        icon: <Calendar size={16} />,
        color: 'bg-orange-100 text-orange-800',
        label: '期限切れ',
      };
    default:
      return {
        icon: <Calculator size={16} />,
        color: 'bg-gray-100 text-gray-800',
        label: '不明',
      };
  }
};

export default async function QuoteDetailPage({
  params,
}: { params: Promise<{ id: string }> }) {
  // 実際の実装では、paramsのIDを使用して見積データを取得する
  const resolvedParams = await params;
  const quote = quoteData;
  const { icon, color, label } = getStatusDetails(quote.status);

  const statusLabels = {
    draft: { label: '下書き', class: 'bg-gray-500' },
    sent: { label: '送信済', class: 'bg-blue-500' },
    accepted: { label: '承認済', class: 'bg-green-500' },
    rejected: { label: '却下', class: 'bg-red-500' },
    expired: { label: '期限切れ', class: 'bg-amber-500' },
  };

  const statusInfo = statusLabels[quote.status as keyof typeof statusLabels];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(
      date.getMinutes()
    ).padStart(2, '0')}`;
  };

  const isExpired = new Date(quote.validUntil) < new Date();

  return (
    <div className="space-y-6 p-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/system/quotes">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">見積詳細</h1>
          <Badge className={statusInfo.class}>{statusInfo.label}</Badge>
          {isExpired && (
            <Badge
              variant="outline"
              className="text-amber-500 border-amber-500"
            >
              期限切れ
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Copy className="mr-2 h-4 w-4" />
            複製
          </Button>
          <Link href={`/system/quotes/${quote.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              編集
            </Button>
          </Link>
          <Button variant="default" size="sm">
            <Send className="mr-2 h-4 w-4" />
            送信
          </Button>
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
            {/* 見積情報 */}
            <Card className="p-4 col-span-2">
              <h3 className="font-medium mb-4">見積情報</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">見積番号</p>
                  <p>{quote.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ステータス</p>
                  <Badge className={statusInfo.class}>{statusInfo.label}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">作成日</p>
                  <p>{formatDate(quote.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">有効期限</p>
                  <p className={isExpired ? 'text-red-500' : ''}>
                    {formatDate(quote.validUntil)}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">タイトル</p>
                  <p className="font-medium">{quote.title}</p>
                </div>
                <div className="col-span-2 mt-2">
                  <p className="text-sm text-gray-500">備考</p>
                  <div className="whitespace-pre-line text-sm border p-2 rounded-md mt-1 bg-gray-50">
                    {quote.notes}
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
                  <Link href={`/system/customers/${quote.customer.id}`}>
                    <span className="font-medium text-primary hover:underline">
                      {quote.customer.name}
                    </span>
                  </Link>
                </div>
                <p className="text-sm">{quote.customer.contact}</p>
              </div>
              <div className="text-sm space-y-1">
                <p className="flex items-center">
                  <span className="text-gray-500 mr-2">Email:</span>
                  <a
                    href={`mailto:${quote.customer.email}`}
                    className="text-primary hover:underline"
                  >
                    {quote.customer.email}
                  </a>
                </p>
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  顧客詳細を表示
                </Button>
              </div>
            </Card>

            {/* 見積明細 */}
            <Card className="p-4 col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">見積明細</h3>
                <Link href={`/system/quotes/${quote.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    明細を編集
                  </Button>
                </Link>
              </div>
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
                  {quote.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3">
                        <div className="font-medium">{item.name}</div>
                        {item.description && (
                          <div className="text-xs text-gray-500">
                            {item.description}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {item.quantity.toLocaleString()}
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
                      ¥{quote.subtotal.toLocaleString()}
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
                      ¥{quote.tax.toLocaleString()}
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
                      ¥{quote.total.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </Card>

            {/* 原価情報 */}
            <Card className="p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                原価・収益情報
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">原価合計</p>
                  <p className="font-medium">¥{quote.cost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">利益</p>
                  <p className="font-medium">
                    ¥{quote.profit.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">利益率</p>
                  <p className="font-medium">{quote.profitRate}%</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  <Edit className="mr-2 h-4 w-4" />
                  原価を編集
                </Button>
              </div>
            </Card>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">
              <ClipboardCopy className="mr-2 h-4 w-4" />
              コピーして新規作成
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 hover:bg-red-50"
            >
              <Trash className="mr-2 h-4 w-4" />
              削除
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              PDFダウンロード
            </Button>
            <Button variant="default" size="sm">
              <Send className="mr-2 h-4 w-4" />
              送信
            </Button>
          </div>
        </TabsContent>

        {/* プレビュータブ */}
        <TabsContent value="preview" className="h-[calc(100vh-250px)]">
          <QuotePreview
            quoteData={{
              ...quote,
              number: quote.id,
              customer: {
                ...quote.customer,
                address: '東京都千代田区○○', // 適切な住所を設定
              },
              notes: quote.notes || '',
            }}
          />
        </TabsContent>

        {/* 履歴タブ */}
        <TabsContent value="history">
          <Card className="p-4">
            <h3 className="font-medium mb-4 flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              見積履歴
            </h3>
            <div className="space-y-4">
              {quote.revisions.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b last:border-0"
                >
                  <div className="min-w-32">
                    <p className="text-sm">{formatDateTime(item.date)}</p>
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
