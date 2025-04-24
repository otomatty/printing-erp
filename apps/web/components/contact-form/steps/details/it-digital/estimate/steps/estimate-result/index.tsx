'use client';

import { generatePdfAction } from '~/actions/estimate/generatePdf';
import { calculateRushFee } from '../../_utils/calculateRushFee';
import { calculateImplementationCosts } from '../../_utils/calculateImplementationCosts';
import { v4 as uuidv4 } from 'uuid';
import { useAtom, useSetAtom } from 'jotai';
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
} from '~/types/estimate';
import { useCallback, useEffect } from 'react';
import {
  EstimateSummary,
  FeatureList,
  ImplementationRequirements,
  TotalSummary,
} from './components';
import { indicatorStepAtom } from '~/store/contact-form';

/**
 * 見積もり結果表示およびPDFダウンロード/問い合わせを行うステップコンポーネント
 */
export function EstimateResultStep() {
  const setIndicatorStep = useSetAtom(indicatorStepAtom);
  useEffect(() => {
    setIndicatorStep('confirmation');
  }, [setIndicatorStep]);

  // クライアントサイドでatomから値を取得
  const [formData] = useAtom(formDataAtom);
  const [proposedFeatures] = useAtom(proposedFeaturesAtom);
  const [selectedFeatureIds] = useAtom(selectedFeatureIdsAtom);

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

  // デザイン部分の追加コスト
  const designAdditionalPrice = implementationCosts?.totalAdditionalCost || 0;
  const additionalDuration = implementationCosts?.additionalDuration || 0;

  // 従来の合計金額と期間を計算
  const traditionalTotalPrice = basePrice + designAdditionalPrice;
  const totalDuration = baseDuration + additionalDuration;

  // 最新の開発手法による割引を計算
  const calculateModernPrice = useCallback(() => {
    // 開発部分のみ50%割引
    const discountedDevelopment = Math.round(basePrice * 0.5);
    // 一括払いの場合、開発部分のみさらに5%割引
    const finalDevelopmentPrice = Math.round(discountedDevelopment * 0.95);
    // デザイン部分は割引なし
    return finalDevelopmentPrice + designAdditionalPrice;
  }, [basePrice, designAdditionalPrice]);

  // 割引率を計算
  const calculateDiscountRate = useCallback(() => {
    if (traditionalTotalPrice === 0) return 0;

    const modernPrice = calculateModernPrice();
    return Math.round((1 - modernPrice / traditionalTotalPrice) * 100);
  }, [traditionalTotalPrice, calculateModernPrice]);

  // 最新開発手法での価格
  const modernTotalPrice = calculateModernPrice();
  // 実際の割引率
  const actualDiscountRate = calculateDiscountRate();

  // 特急料金の計算（modernTotalPriceを使用）
  const rushFeeCalculation = calculateRushFee(
    modernTotalPrice, // 従来価格ではなく最新手法での価格を使用
    totalDuration,
    formData.deadline
  );

  // PDF生成のサーバーアクション
  const generatePdf = async () => {
    // より堅牢なチェック - 必要なデータが揃っていることを確認
    if (!rushFeeCalculation) {
      console.error('特急料金の計算結果が不足しています。');
      return null;
    }

    try {
      const featureItems: EstimateItem[] = selectedFeatures.map((feature) => ({
        id: feature.id,
        name: feature.name,
        description: feature.description,
        unitPrice: Math.round(feature.price * 0.5 * 0.95), // 割引後の単価
        quantity: 1,
        amount: Math.round(feature.price * 0.5 * 0.95), // 割引後の金額
        note: feature.isRequired ? '必須機能' : '任意機能',
        duration: feature.duration, // 工数（日数）を追加
      }));

      // 実装コスト項目を追加する関数
      const createImplementationItems = (): EstimateItem[] => {
        const items: EstimateItem[] = [];

        // implementationCostsが存在し、各プロパティが存在して金額が正の数の場合のみ追加
        if (implementationCosts) {
          const { designCost, assetsCost, contentCost } = implementationCosts;

          // デザインコスト
          if (designCost && designCost.amount > 0) {
            items.push({
              id: 'impl-design',
              name: 'デザイン関連費用',
              description: designCost.reason || 'デザイン関連の追加コスト',
              unitPrice: designCost.amount,
              quantity: 1,
              amount: designCost.amount,
              note: `期間影響: ${designCost.duration}日（割引対象外）`,
              duration: designCost.duration,
            });
          }

          // アセットコスト
          if (assetsCost && assetsCost.amount > 0) {
            items.push({
              id: 'impl-assets',
              name: 'アセット関連費用',
              description: assetsCost.reason || 'アセット関連の追加コスト',
              unitPrice: assetsCost.amount,
              quantity: 1,
              amount: assetsCost.amount,
              note: `期間影響: ${assetsCost.duration}日（割引対象外）`,
              duration: assetsCost.duration,
            });
          }

          // コンテンツコスト
          if (contentCost && contentCost.amount > 0) {
            items.push({
              id: 'impl-content',
              name: 'コンテンツ関連費用',
              description: contentCost.reason || 'コンテンツ関連の追加コスト',
              unitPrice: contentCost.amount,
              quantity: 1,
              amount: contentCost.amount,
              note: `期間影響: ${contentCost.duration}日（割引対象外）`,
              duration: contentCost.duration,
            });
          }
        }

        return items;
      };

      // 実装コスト項目を生成
      const implementationCostItems = createImplementationItems();

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
        salesPerson: 'ニイヌマ企画印刷',
        totalAmount: rushFeeCalculation.totalPrice,
        originalPrice: traditionalTotalPrice,
        totalDuration: totalDuration,
        rushFee: rushFeeCalculation.rushFee,
        rushFeeNote:
          rushFeeCalculation.rushFee > 0
            ? rushFeeCalculation.reason
            : undefined,
        notes: [
          'この見積もりは概算です。',
          '詳細な要件定義後に最終的な金額と期間が確定します。',
          '最新の開発手法により、開発費用は52.5%割引されています（デザイン費用は割引対象外）。',
          `合計${actualDiscountRate}%のコスト削減を実現しました。`,
        ],
        items: [...featureItems, ...implementationCostItems],
        implementationRequirements: formData.implementationRequirements,
      };

      // サーバーアクションをimportしてそのまま呼び出す
      const pdfBuffer = await generatePdfAction(estimateDataForPdf);
      return { buffer: pdfBuffer, estimateData: estimateDataForPdf };
    } catch (error) {
      console.error('PDFの生成に失敗しました:', error);
      return null;
    }
  };

  // 開発期間を柔軟に設定するための処理
  const handleSetFlexibleDeadline = () => {
    // 開発期間をflexibleに設定して、特急料金を再計算
    const newRushFee = calculateRushFee(
      modernTotalPrice,
      totalDuration,
      'flexible'
    );

    // コンソールに新しい計算結果を表示（デバッグ用）
    console.log('適切な開発期間に設定:', newRushFee);
  };

  return (
    <div className="space-y-6">
      {/* 見積もり概要 */}
      <EstimateSummary
        projectType={formData.projectType}
        deadline={formData.deadline}
        description={formData.description}
      />

      {/* 機能一覧 */}
      <FeatureList features={selectedFeatures} />

      {/* 実装要件 */}
      <ImplementationRequirements costs={implementationCosts} />

      {/* 合計金額 */}
      <TotalSummary
        traditionalTotalPrice={traditionalTotalPrice}
        modernTotalPrice={modernTotalPrice}
        actualDiscountRate={actualDiscountRate}
        totalDuration={totalDuration}
        rushFeeCalculation={rushFeeCalculation}
        generatePdf={generatePdf}
        onSetFlexibleDeadline={handleSetFlexibleDeadline}
      />

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
