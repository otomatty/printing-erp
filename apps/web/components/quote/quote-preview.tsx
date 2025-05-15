'use client';

import { FileDown, Printer } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface QuotePreviewProps {
  quoteData: {
    id: string;
    number: string;
    title: string;
    customer: {
      name: string;
      address: string;
      contact: string;
      email: string;
    };
    createdAt: string;
    validUntil: string;
    items: {
      id: string;
      name: string;
      description?: string;
      quantity: number;
      unitPrice: number;
      taxRate: number;
      amount: number;
    }[];
    subtotal: number;
    tax: number;
    total: number;
    notes?: string;
  };
}

export default function QuotePreview({ quoteData }: QuotePreviewProps) {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* ツールバー */}
      <div className="bg-white border-b p-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
          >
            -
          </button>
          <span className="text-sm">{Math.round(scale * 100)}%</span>
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
          >
            +
          </button>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded text-sm"
          >
            <Printer size={16} />
            <span>印刷</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1 px-3 py-1 bg-primary text-white hover:bg-primary/90 rounded text-sm"
          >
            <FileDown size={16} />
            <span>PDFダウンロード</span>
          </button>
        </div>
      </div>

      {/* プレビュー領域 */}
      <div className="flex-grow bg-gray-100 p-4 overflow-auto">
        <div
          className="bg-white mx-auto shadow-md relative"
          style={{
            width: `${210 * scale}mm`, // A4サイズ（210mm x 297mm）
            height: `${297 * scale}mm`,
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          {/* 見積書 */}
          <div className="p-12 h-full">
            {/* ヘッダー */}
            <div className="flex justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-1">御見積書</h1>
                <p className="text-sm">見積番号: {quoteData.number}</p>
                <p className="text-sm">
                  発行日: {formatDate(quoteData.createdAt)}
                </p>
                <p className="text-sm">
                  有効期限: {formatDate(quoteData.validUntil)}
                </p>
              </div>
              <div className="text-right">
                <div className="mb-4">
                  <Image
                    src="/images/logo.png"
                    alt="Company Logo"
                    width={150}
                    height={50}
                    className="ml-auto"
                  />
                </div>
                <p className="font-bold text-lg">印刷会社株式会社</p>
                <p className="text-sm">〒123-4567</p>
                <p className="text-sm">東京都千代田区神田1-2-3</p>
                <p className="text-sm">TEL: 03-1234-5678</p>
                <p className="text-sm">Email: info@ninuma-print.co.jp</p>
              </div>
            </div>

            {/* 顧客情報 */}
            <div className="mb-8">
              <p className="text-xl font-bold mb-2">
                {quoteData.customer.name} 御中
              </p>
              <p className="text-sm">
                〒{quoteData.customer.address.substring(0, 8)}
              </p>
              <p className="text-sm">{quoteData.customer.address}</p>
              <p className="text-sm">担当: {quoteData.customer.contact} 様</p>
            </div>

            {/* 件名 */}
            <div className="mb-6">
              <p className="text-lg">下記の通りお見積り申し上げます。</p>
              <div className="mt-2 border-2 border-gray-800 inline-block px-4 py-1">
                <p className="font-bold">件名: {quoteData.title}</p>
              </div>
            </div>

            {/* 見積明細 */}
            <div className="mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">
                      品名
                    </th>
                    <th className="border border-gray-300 p-2 text-center w-24">
                      数量
                    </th>
                    <th className="border border-gray-300 p-2 text-right w-28">
                      単価
                    </th>
                    <th className="border border-gray-300 p-2 text-center w-14">
                      税率
                    </th>
                    <th className="border border-gray-300 p-2 text-right w-32">
                      金額
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {quoteData.items.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 p-2">
                        <div className="font-medium">{item.name}</div>
                        {item.description && (
                          <div className="text-sm text-gray-600">
                            {item.description}
                          </div>
                        )}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {item.quantity.toLocaleString()}
                      </td>
                      <td className="border border-gray-300 p-2 text-right">
                        ¥{item.unitPrice.toLocaleString()}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {item.taxRate}%
                      </td>
                      <td className="border border-gray-300 p-2 text-right">
                        ¥{item.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan={4}
                      className="border border-gray-300 p-2 text-right font-medium"
                    >
                      小計
                    </td>
                    <td className="border border-gray-300 p-2 text-right">
                      ¥{quoteData.subtotal.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={4}
                      className="border border-gray-300 p-2 text-right font-medium"
                    >
                      消費税
                    </td>
                    <td className="border border-gray-300 p-2 text-right">
                      ¥{quoteData.tax.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td
                      colSpan={4}
                      className="border border-gray-300 p-2 text-right font-bold"
                    >
                      合計金額
                    </td>
                    <td className="border border-gray-300 p-2 text-right font-bold">
                      ¥{quoteData.total.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* 備考 */}
            <div className="mb-6">
              <h3 className="font-bold mb-2">備考</h3>
              <div className="border border-gray-300 p-3 bg-gray-50 min-h-24 whitespace-pre-line">
                {quoteData.notes || '特記事項はありません。'}
              </div>
            </div>

            {/* 印鑑エリア（代表取締役印） */}
            <div className="absolute bottom-12 right-12">
              <div className="border border-gray-300 p-4 w-32 h-32 flex flex-col items-center justify-center">
                <div className="text-sm mb-4">代表取締役</div>
                <div className="w-16 h-16 rounded-full border border-red-600 flex items-center justify-center text-red-600">
                  印
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
