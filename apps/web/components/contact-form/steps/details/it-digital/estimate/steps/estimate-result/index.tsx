'use server';

import { Card } from '@kit/ui/card';
import { Badge } from '@kit/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@kit/ui/alert';
import { generatePdfAction } from '~/actions/estimate/generatePdf';
import { calculateRushFee } from '../../_utils/calculateRushFee';
import { calculateImplementationCosts } from '../../_utils/calculateImplementationCosts';
import { v4 as uuidv4 } from 'uuid';
import { EstimateResultActions } from './estimate-result-client';
import { cookies } from 'next/headers';
import { getAtomValue } from '~/utils/get-atom-value';
import {
  formDataAtom,
  proposedFeaturesAtom,
  selectedFeatureIdsAtom,
} from '~/store/estimate';
import type {
  EstimateWithItems,
  EstimateItem,
  ProjectType,
  Deadline,
  ImplementationCosts,
  EstimateFormData,
  FeatureProposal,
} from '~/types/estimate';

/**
 * 見積もり結果表示およびPDFダウンロード/問い合わせを行うステップコンポーネント
 */
export async function EstimateResultStep() {
  // サーバーサイドでatomから値を取得
  const cookieStore = await cookies();
  const formData = getAtomValue<EstimateFormData>(formDataAtom, cookieStore);
  const proposedFeatures = getAtomValue<FeatureProposal[]>(
    proposedFeaturesAtom,
    cookieStore
  );
  const selectedFeatureIds = getAtomValue<string[]>(
    selectedFeatureIdsAtom,
    cookieStore
  );

  if (!formData || !proposedFeatures || !selectedFeatureIds) {
    return (
      <div className="text-center py-6">
        <p>
          見積もりデータの読み込みに失敗しました。最初からやり直してください。
        </p>
      </div>
    );
  }

  const selectedFeatures = proposedFeatures.filter((f) =>
    selectedFeatureIds.includes(f.id)
  );

  // 機能の基本費用と期間を計算
  const basePrice = selectedFeatures.reduce((sum, f) => sum + f.price, 0);
  const baseDuration = selectedFeatures.reduce((sum, f) => sum + f.duration, 0);

  // 実装要件による追加コストと期間を計算
  let implementationCosts: ImplementationCosts | null = null;
  try {
    implementationCosts = calculateImplementationCosts(formData);
  } catch (error) {
    console.error('実装要件コスト計算エラー:', error);
  }

  // 合計金額と期間を計算
  const totalPrice =
    basePrice + (implementationCosts?.totalAdditionalCost || 0);
  const totalDuration =
    baseDuration + (implementationCosts?.additionalDuration || 0);

  // 特急料金の計算
  const rushFeeCalculation = calculateRushFee(
    totalPrice,
    totalDuration,
    formData.deadline
  );

  // PDF生成のサーバーアクション
  async function generatePdf() {
    'use server';

    if (!implementationCosts || !rushFeeCalculation) {
      console.error('必要なデータが不足しています。');
      return null;
    }

    try {
      const featureItems: EstimateItem[] = selectedFeatures.map((feature) => ({
        id: feature.id,
        name: feature.name,
        description: feature.description,
        unitPrice: feature.price,
        quantity: 1,
        amount: feature.price,
        note: feature.isRequired ? '必須機能' : undefined,
      }));

      const implementationCostItems: EstimateItem[] = [];
      if (implementationCosts.designCost.amount > 0) {
        implementationCostItems.push({
          id: 'impl-design',
          name: 'デザイン関連費用',
          description: implementationCosts.designCost.reason,
          unitPrice: implementationCosts.designCost.amount,
          quantity: 1,
          amount: implementationCosts.designCost.amount,
          note: `期間影響: ${implementationCosts.designCost.duration}日`,
        });
      }
      if (implementationCosts.assetsCost.amount > 0) {
        implementationCostItems.push({
          id: 'impl-assets',
          name: 'アセット関連費用',
          description: implementationCosts.assetsCost.reason,
          unitPrice: implementationCosts.assetsCost.amount,
          quantity: 1,
          amount: implementationCosts.assetsCost.amount,
          note: `期間影響: ${implementationCosts.assetsCost.duration}日`,
        });
      }
      if (implementationCosts.contentCost.amount > 0) {
        implementationCostItems.push({
          id: 'impl-content',
          name: 'コンテンツ関連費用',
          description: implementationCosts.contentCost.reason,
          unitPrice: implementationCosts.contentCost.amount,
          quantity: 1,
          amount: implementationCosts.contentCost.amount,
          note: `期間影響: ${implementationCosts.contentCost.duration}日`,
        });
      }

      const estimateDataForPdf: EstimateWithItems = {
        id: uuidv4(),
        estimateNumber: `EST-${new Date().toISOString().slice(0, 10)}`,
        issueDate: new Date(),
        customerName: formData?.customerName || 'お客様',
        projectName: `プロジェクト見積もり (${formData?.projectType})`,
        projectType: formData?.projectType as ProjectType,
        deadline: formData?.deadline as Deadline,
        description: formData?.description,
        validUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        paymentTerms: '納品後30日以内にお支払いください。',
        salesPerson: '担当: 新沼 企画',
        totalAmount: rushFeeCalculation.totalPrice,
        totalDuration: totalDuration,
        rushFee: rushFeeCalculation.rushFee,
        rushFeeNote:
          rushFeeCalculation.rushFee > 0
            ? rushFeeCalculation.reason
            : undefined,
        notes: [
          'この見積もりは概算です。',
          '詳細な要件定義後に最終的な金額と期間が確定します。',
        ],
        items: [...featureItems, ...implementationCostItems],
      };

      const pdfBuffer = await generatePdfAction(estimateDataForPdf);
      return { buffer: pdfBuffer, estimateData: estimateDataForPdf };
    } catch (error) {
      console.error('PDFダウンロード処理エラー:', error);
      return null;
    }
  }

  // PDF生成・表示用のクライアントコンポーネントに渡すestimateDataの作成
  const estimateData: EstimateWithItems = {
    id: uuidv4(),
    estimateNumber: `EST-${new Date().toISOString().slice(0, 10)}`,
    issueDate: new Date(),
    customerName: formData.customerName || 'お客様',
    projectName: `プロジェクト見積もり (${formData.projectType})`,
    projectType: formData.projectType as ProjectType,
    deadline: formData.deadline as Deadline,
    description: formData.description,
    totalAmount: rushFeeCalculation.totalPrice,
    totalDuration: totalDuration,
    items: [],
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">見積もり概要</h3>
        <Card className="p-4 space-y-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              プロジェクトの種類
            </div>
            <div className="font-medium">
              {formData.projectType === 'website'
                ? 'Webサイト'
                : formData.projectType === 'business_system'
                  ? '業務システム'
                  : formData.projectType === 'application'
                    ? 'Webアプリケーション'
                    : 'その他'}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">開発期間</div>
            <div className="font-medium">
              {formData.deadline === 'asap'
                ? 'できるだけ早く'
                : formData.deadline === '1month'
                  ? '1ヶ月以内'
                  : formData.deadline === '3months'
                    ? '3ヶ月以内'
                    : formData.deadline === '6months'
                      ? '6ヶ月以内'
                      : '柔軟に対応可能'}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              プロジェクトの概要
            </div>
            <div className="font-medium whitespace-pre-wrap">
              {formData.description}
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">選択された機能</h3>
        <div className="grid gap-4">
          {selectedFeatures.map((feature) => (
            <Card key={feature.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-medium">{feature.name}</div>
                    {feature.isRequired && <Badge>必須</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {feature.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {feature.price.toLocaleString()}円
                  </div>
                  <div className="text-sm text-muted-foreground">
                    約{feature.duration.toFixed(1)}日
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {implementationCosts &&
        (implementationCosts.designCost.amount > 0 ||
          implementationCosts.assetsCost.amount > 0 ||
          implementationCosts.contentCost.amount > 0) && (
          <div>
            <h3 className="text-lg font-bold mb-4">追加実装要件</h3>
            <div className="grid gap-4">
              {implementationCosts &&
                implementationCosts.designCost.amount > 0 && (
                  <Card className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-medium">デザイン関連</div>
                        <p className="text-sm text-muted-foreground">
                          {implementationCosts?.designCost.reason}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {implementationCosts?.designCost.amount.toLocaleString()}
                          円
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              {implementationCosts &&
                implementationCosts.assetsCost.amount > 0 && (
                  <Card className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-medium">アセット関連</div>
                        <p className="text-sm text-muted-foreground">
                          {implementationCosts?.assetsCost.reason}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {implementationCosts?.assetsCost.amount.toLocaleString()}
                          円
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              {implementationCosts &&
                implementationCosts.contentCost.amount > 0 && (
                  <Card className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-medium">コンテンツ関連</div>
                        <p className="text-sm text-muted-foreground">
                          {implementationCosts?.contentCost.reason}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {implementationCosts?.contentCost.amount.toLocaleString()}
                          円
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
            </div>
          </div>
        )}

      <Card className="p-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-bold mb-1">見積もり合計</h3>
            <p className="text-sm text-muted-foreground">
              選択した機能と追加実装要件の合計金額と想定開発期間
            </p>
          </div>
          <div className="text-right">
            {rushFeeCalculation.rushFee > 0 ? (
              <>
                <div className="text-base line-through text-muted-foreground mb-1">
                  {rushFeeCalculation.basePrice.toLocaleString()}円
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
              <div className="text-2xl font-bold mb-1">
                {rushFeeCalculation.totalPrice.toLocaleString()}円
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
          estimateData={estimateData}
          pdfUrl={null}
          onGeneratePdf={generatePdf}
          onSendInquiry={() => {
            // 問い合わせ処理
          }}
          onAdjustDeadline={() => {
            // 開発期間調整
          }}
          hasRushFee={rushFeeCalculation.rushFee > 0}
        />
      </Card>

      <div className="text-sm text-muted-foreground">
        <p>※ この見積もりは概算です。</p>
        <p>
          実際の開発費用や期間は、詳細な要件定義や技術的な制約によって変動する可能性があります。
        </p>
        <p>
          正確な見積もりをご希望の場合は、問い合わせフォームよりご連絡ください。
        </p>
      </div>
    </div>
  );
}
