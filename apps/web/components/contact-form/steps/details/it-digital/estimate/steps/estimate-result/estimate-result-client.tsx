'use client';

import { useState, useTransition } from 'react';
import { useAtom } from 'jotai';
import { Button } from '@kit/ui/button';
import { Download, Send, Check } from 'lucide-react';
import { formDataAtom } from '~/store/estimate';
import type { EstimateWithItems, EstimateFormData } from '~/types/estimate';

interface EstimateActionsProps {
  isPdfGenerating: boolean;
  pdfUrl: string | null;
  onGeneratePdf: () => Promise<{
    buffer: Buffer | null;
    estimateData: EstimateWithItems;
  } | null>;
  onSendInquiry: () => void;
  onSetFlexibleDeadline: () => void;
  hasRushFee: boolean;
}

/**
 * 見積もり結果のクライアント側アクション（PDFダウンロードなど）を扱うコンポーネント
 */
export function EstimateResultActions({
  isPdfGenerating: initialLoading,
  pdfUrl: initialUrl,
  onGeneratePdf,
  onSendInquiry,
  onSetFlexibleDeadline,
  hasRushFee,
}: EstimateActionsProps) {
  const [formData, setFormData] = useAtom(formDataAtom);
  const [isPending, startTransition] = useTransition();
  const [isDownloading, setIsDownloading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(initialUrl);
  const isPdfGenerating = isDownloading || isPending;

  // PDFダウンロードハンドラー
  const handleDownloadPDF = async () => {
    if (isDownloading) return;

    setIsDownloading(true);

    try {
      startTransition(async () => {
        // サーバーアクションを実行
        const result = await onGeneratePdf();

        if (result?.buffer) {
          // ArrayBufferに変換
          const arrayBuffer = result.buffer.buffer;

          // Blobを作成してURLを生成
          const blob = new Blob([new Uint8Array(arrayBuffer)], {
            type: 'application/pdf',
          });
          const url = URL.createObjectURL(blob);

          // URLを状態に保存
          setPdfUrl(url);

          // ダウンロード処理
          const a = document.createElement('a');
          a.href = url;
          a.download = `見積書_${result.estimateData.estimateNumber}.pdf`;
          a.click();
        }
      });
    } catch (error) {
      console.error('PDFダウンロードエラー:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // 開発期間を柔軟に設定
  const handleSetFlexibleDeadline = () => {
    // deadlineをflexibleに設定
    setFormData((prev: EstimateFormData) => ({
      ...prev,
      deadline: 'flexible',
    }));

    // コールバック呼び出し
    if (onSetFlexibleDeadline) {
      onSetFlexibleDeadline();
    }
  };

  // 問い合わせ送信
  const handleSendInquiry = () => {
    // TODO: 問い合わせフォームへの遷移処理
    console.log('Send inquiry');
  };

  return (
    <>
      {hasRushFee && (
        <div className="mb-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSetFlexibleDeadline}
          >
            <Check className="w-4 h-4 mr-2" />
            適切な開発期間にする
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row">
        <Button
          onClick={handleDownloadPDF}
          disabled={isPdfGenerating}
          className="w-full md:w-auto"
        >
          {isPdfGenerating ? (
            <span className="flex items-center space-x-2">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <title>Loading...</title>
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>生成中...</span>
            </span>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              PDFでダウンロード
            </>
          )}
        </Button>
        <Button className="w-full md:flex-1" onClick={handleSendInquiry}>
          <Send className="w-4 h-4 mr-2" />
          問い合わせる
        </Button>
      </div>
    </>
  );
}
