'use client';

import { useState, useTransition } from 'react';
import { useAtom } from 'jotai';
import { Button } from '@kit/ui/button';
import { Download, Send, ArrowLeft } from 'lucide-react';
import { currentStepAtom } from '~/store/estimate';
import type { EstimateWithItems } from '~/types/estimate';

interface EstimateActionsProps {
  isPdfGenerating: boolean;
  estimateData: EstimateWithItems;
  pdfUrl: string | null;
  onGeneratePdf: () => Promise<{
    buffer: Buffer | null;
    estimateData: EstimateWithItems;
  } | null>;
  onSendInquiry: () => void;
  onAdjustDeadline: () => void;
  hasRushFee: boolean;
}

/**
 * 見積もり結果のクライアント側アクション（PDFダウンロードなど）を扱うコンポーネント
 */
export function EstimateResultActions({
  isPdfGenerating: initialLoading,
  estimateData,
  pdfUrl: initialUrl,
  onGeneratePdf,
  onSendInquiry,
  onAdjustDeadline,
  hasRushFee,
}: EstimateActionsProps) {
  const [, setCurrentStep] = useAtom(currentStepAtom);
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

  // 開発期間調整へ戻る
  const handleAdjustDeadline = () => {
    setCurrentStep('deadline');
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
            onClick={handleAdjustDeadline}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            開発期間を調整する
          </Button>
        </div>
      )}

      <div className="flex gap-4">
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
        <Button className="flex-1" onClick={handleSendInquiry}>
          <Send className="w-4 h-4 mr-2" />
          問い合わせる
        </Button>
      </div>
    </>
  );
}
