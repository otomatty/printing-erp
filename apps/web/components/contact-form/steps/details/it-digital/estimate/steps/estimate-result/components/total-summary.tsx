'use client';

import { Card } from '@kit/ui/card';
import { Alert, AlertDescription } from '@kit/ui/alert';
import { AlertTriangle } from 'lucide-react';
import type { EstimateWithItems } from '~/types/estimate';
import { EstimateResultActions } from '../estimate-result-client';

export interface TotalSummaryProps {
  traditionalTotalPrice: number;
  modernTotalPrice: number;
  actualDiscountRate: number;
  totalDuration: number;
  rushFeeCalculation: {
    totalPrice: number;
    rushFee: number;
    reason: string;
    isTimelineDangerous?: boolean | undefined;
  };
  generatePdf: () => Promise<{
    buffer: Buffer | null;
    estimateData: EstimateWithItems;
  } | null>;
  onSetFlexibleDeadline: () => void;
}

/**
 * 見積もり合計を表示するコンポーネント
 */
export function TotalSummary({
  traditionalTotalPrice,
  modernTotalPrice,
  actualDiscountRate,
  totalDuration,
  rushFeeCalculation,
  generatePdf,
  onSetFlexibleDeadline,
}: TotalSummaryProps) {
  // 削減額の計算
  const savings = traditionalTotalPrice - modernTotalPrice;

  return (
    <Card className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold mb-1">見積もり合計</h3>
          <p className="text-sm text-muted-foreground">
            選択した機能と追加実装要件の合計金額と想定開発期間
          </p>
        </div>
        <div className="text-left md:text-right">
          <div className="text-base line-through text-muted-foreground mb-1">
            従来価格: {traditionalTotalPrice.toLocaleString()}円
          </div>
          <div className="text-sm text-green-600 mb-1">
            削減額: {savings.toLocaleString()}円（{actualDiscountRate}%オフ）
          </div>
          {rushFeeCalculation.rushFee > 0 ? (
            <>
              <div className="text-base line-through text-muted-foreground mb-1">
                {modernTotalPrice.toLocaleString()}円
              </div>
              <div className="text-2xl font-bold mb-1 text-primary">
                {rushFeeCalculation.totalPrice.toLocaleString()}円
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                （特急料金：{rushFeeCalculation.rushFee.toLocaleString()}
                円）
              </div>
            </>
          ) : (
            <div className="text-2xl font-bold mb-1 text-primary">
              {modernTotalPrice.toLocaleString()}円
            </div>
          )}
          <div className="text-sm text-muted-foreground">
            想定開発期間：約{totalDuration.toFixed(1)}日
          </div>
        </div>
      </div>

      {rushFeeCalculation.rushFee > 0 && (
        <div className="space-y-4 mb-6">
          {rushFeeCalculation.isTimelineDangerous ? (
            <Alert
              variant="destructive"
              className="bg-destructive/10 border-none"
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{rushFeeCalculation.reason}</AlertDescription>
            </Alert>
          ) : (
            <div className="p-3 bg-primary/5 rounded-md text-sm">
              {rushFeeCalculation.reason}
            </div>
          )}
        </div>
      )}

      {/* クライアントコンポーネントに処理を委譲 */}
      <EstimateResultActions
        isPdfGenerating={false}
        pdfUrl={null}
        onGeneratePdf={generatePdf}
        onSendInquiry={() => {
          // 問い合わせ処理
        }}
        onSetFlexibleDeadline={onSetFlexibleDeadline}
        hasRushFee={rushFeeCalculation.rushFee > 0}
      />
    </Card>
  );
}
