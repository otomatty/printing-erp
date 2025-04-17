'use client';

import { useAtom } from 'jotai';
import { Card } from '@kit/ui/card';
import { Badge } from '@kit/ui/badge';
import { Separator } from '@kit/ui/separator';
import {
  proposedFeaturesAtom,
  selectedFeatureIdsAtom,
  currentStepAtom,
  formDataAtom,
} from '~/store/estimate';
import { CheckCircle, ChevronsRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@kit/ui/alert';
import { useMemo } from 'react';

export function ModernEstimateStep() {
  const [selectedFeatureIds] = useAtom(selectedFeatureIdsAtom);
  const [proposedFeatures] = useAtom(proposedFeaturesAtom);
  const [formData] = useAtom(formDataAtom);
  const [_, setCurrentStep] = useAtom(currentStepAtom);

  // 実装要件関連の追加費用
  const implementationCosts = useMemo(() => {
    if (!formData.implementationRequirements) {
      return null;
    }

    // formDataから実装要件のコスト情報を取得
    // 型定義を拡張したため、直接アクセス可能
    return {
      designCost: {
        amount: formData.implementationRequirements.designCost?.amount || 0,
        duration: formData.implementationRequirements.designCost?.duration || 0,
      },
      assetsCost: {
        amount: formData.implementationRequirements.assetsCost?.amount || 0,
        duration: formData.implementationRequirements.assetsCost?.duration || 0,
      },
      contentCost: {
        amount: formData.implementationRequirements.contentCost?.amount || 0,
        duration:
          formData.implementationRequirements.contentCost?.duration || 0,
      },
      totalAdditionalCost:
        formData.implementationRequirements.totalAdditionalCost || 0,
      additionalDuration:
        formData.implementationRequirements.additionalDuration || 0,
    };
  }, [formData.implementationRequirements]);

  // 開発部分と実装要件関連の合計額を先に計算
  const developmentPrice = useMemo(() => {
    return proposedFeatures
      .filter((f) => selectedFeatureIds.includes(f.id))
      .reduce((sum, f) => sum + f.price, 0);
  }, [proposedFeatures, selectedFeatureIds]);

  const designPrice = useMemo(() => {
    return implementationCosts ? implementationCosts.totalAdditionalCost : 0;
  }, [implementationCosts]);

  // 開発部分（機能選択）の合計金額
  const getDevelopmentPrice = () => {
    return developmentPrice;
  };

  // デザイン部分の合計金額（実装要件からの追加費用）
  const getDesignPrice = () => {
    return designPrice;
  };

  // 従来の開発手法による合計金額（開発 + デザイン）
  const getTraditionalTotalPrice = () => {
    return developmentPrice + designPrice;
  };

  // 従来の開発手法による開発期間
  const getTraditionalTotalDuration = () => {
    const developmentDuration = proposedFeatures
      .filter((f) => selectedFeatureIds.includes(f.id))
      .reduce((sum, f) => sum + f.duration, 0);

    const designDuration = implementationCosts
      ? implementationCosts.additionalDuration
      : 0;

    return developmentDuration + designDuration;
  };

  // 最新の開発手法による合計金額
  // 開発部分のみ50%割引、デザイン部分はそのまま
  const getModernTotalPrice = (installments: number) => {
    const developmentPrice = getDevelopmentPrice();
    const designPrice = getDesignPrice();

    // 開発部分のみ割引適用
    let discountedDevelopmentPrice = Math.round(developmentPrice * 0.5);

    // 一括払いの場合はさらに5%オフ（開発部分のみ）
    if (installments === 1) {
      discountedDevelopmentPrice = Math.round(
        discountedDevelopmentPrice * 0.95
      );
    }

    // 開発部分の割引価格 + デザイン部分（割引なし）
    return discountedDevelopmentPrice + designPrice;
  };

  // 実際の割引率を計算（加重平均）
  const getActualDiscountRate = (installments: number) => {
    const developmentPrice = getDevelopmentPrice();
    const designPrice = getDesignPrice();
    const traditionalTotal = developmentPrice + designPrice;

    if (traditionalTotal === 0) return 50; // デフォルト値

    // 開発部分の割引後価格
    let discountedDevelopmentPrice = developmentPrice * 0.5;
    if (installments === 1) {
      discountedDevelopmentPrice = discountedDevelopmentPrice * 0.95;
    }

    // 割引後の総額
    const modernTotal = discountedDevelopmentPrice + designPrice;

    // 割引率 = (1 - 割引後価格/元の価格) * 100
    const discountRate = (1 - modernTotal / traditionalTotal) * 100;

    return Math.round(discountRate);
  };

  // 月々の支払い金額を計算
  const getMonthlyPayment = (installments: number) => {
    const totalPrice = getModernTotalPrice(installments);
    return Math.ceil(totalPrice / installments);
  };

  // 削減額
  const getSavings = (installments: number) => {
    return getTraditionalTotalPrice() - getModernTotalPrice(installments);
  };

  // 分割払いのオプションを動的に生成
  const installmentOptions = useMemo(() => {
    const baseOptions = [
      { value: 1, label: '一括払い (5%割引)' },
      { value: 3, label: '3回払い' },
      { value: 6, label: '6回払い' },
      { value: 12, label: '12回払い' },
    ];

    // 開発費用（50%割引）
    const discountedDevelopmentPrice = developmentPrice * 0.5;
    // 合計（12回払い）
    const totalPrice = discountedDevelopmentPrice + designPrice;
    const monthlyPayment12 = Math.ceil(totalPrice / 12);

    // 月額が10万円以上の場合、追加のオプションを提供
    if (monthlyPayment12 >= 100000) {
      // 24回払いを追加
      baseOptions.push({ value: 24, label: '24回払い' });

      // 月額が20万円以上なら36回払いも追加
      if (monthlyPayment12 >= 200000) {
        baseOptions.push({ value: 36, label: '36回払い' });
      }
    }

    return baseOptions;
  }, [developmentPrice, designPrice]);

  const handleNext = () => {
    setCurrentStep('user-info');
  };

  // 実際の割引率
  const actualDiscountRate = getActualDiscountRate(1);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-muted-foreground mb-6">
          最新の開発技術とアジャイル開発プロセスを活用することで、従来の開発手法と比較して
          大幅なコストと期間の削減が可能です。
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8 relative">
          <Card className="p-4 bg-muted/30">
            <h4 className="text-lg font-medium mb-2">従来の開発手法</h4>
            <Separator className="my-2" />
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">合計金額：</p>
                <p className="text-2xl font-bold line-through decoration-red-500/70">
                  {getTraditionalTotalPrice().toLocaleString()}円
                </p>
                {getDesignPrice() > 0 && (
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>
                      開発費用: {getDevelopmentPrice().toLocaleString()}円
                    </div>
                    <div>
                      デザイン費用: {getDesignPrice().toLocaleString()}円
                    </div>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">想定期間：</p>
                <p className="text-lg font-medium line-through decoration-red-500/70">
                  約{getTraditionalTotalDuration().toFixed(1)}日
                </p>
              </div>
            </div>
          </Card>

          {/* 矢印アイコン - モバイルでは非表示 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center bg-white rounded-full p-2 shadow-md z-10">
            <ChevronsRight className="h-6 w-6 text-primary" />
          </div>

          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-medium text-primary">
                最新の開発手法
              </h4>
              <Badge className="bg-primary/90">{actualDiscountRate}%オフ</Badge>
            </div>
            <Separator className="my-2" />
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">合計金額：</p>
                <p className="text-2xl font-bold text-primary">
                  {getModernTotalPrice(1).toLocaleString()}円
                </p>
                {getDesignPrice() > 0 && (
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>
                      開発費用:{' '}
                      {Math.round(
                        getDevelopmentPrice() * 0.5 * 0.95
                      ).toLocaleString()}
                      円 (52.5%オフ)
                    </div>
                    <div>
                      デザイン費用: {getDesignPrice().toLocaleString()}円
                      (割引なし)
                    </div>
                  </div>
                )}
                <p className="text-sm text-green-600 font-medium">
                  ※一括払いで5%割引適用済み (開発費用のみ)
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">コスト削減額：</p>
                <p className="text-lg font-medium text-green-600">
                  -{getSavings(1).toLocaleString()}円
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Alert className="bg-green-50 border-green-200 mb-8">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">コスト削減効果</AlertTitle>
          <AlertDescription className="text-green-700">
            従来の開発手法と比較して
            <span className="font-bold">{actualDiscountRate}%</span>
            のコスト削減を実現します。
            <br />
            これは合計
            <span className="font-bold">
              {getSavings(1).toLocaleString()}円
            </span>
            の削減額に相当します。
          </AlertDescription>
        </Alert>

        <div className="bg-white p-6 rounded-lg border mb-6">
          <h4 className="text-lg font-bold mb-4">お支払いプラン一覧</h4>

          <div className="grid gap-4">
            <div className="grid grid-cols-4 gap-2 font-medium text-sm text-muted-foreground border-b pb-2">
              <div>お支払いプラン</div>
              <div>月々のお支払い</div>
              <div>お支払い回数</div>
              <div>お支払い総額</div>
            </div>

            {installmentOptions.map((option) => (
              <div
                key={option.value}
                className="grid grid-cols-4 gap-2 py-3 border-b last:border-0"
              >
                <div className="font-medium">{option.label}</div>
                <div className="font-bold text-primary">
                  {getMonthlyPayment(option.value).toLocaleString()}円
                </div>
                <div>{option.value === 1 ? '一括' : `${option.value}回`}</div>
                <div>
                  {getModernTotalPrice(option.value).toLocaleString()}円
                  {option.value === 1 && (
                    <span className="text-xs text-green-600 block">
                      (5%割引適用)
                    </span>
                  )}
                </div>
              </div>
            ))}

            <p className="text-sm text-muted-foreground mt-4">
              ※
              分割払いは開発開始時から月々定額でのお支払いとなります。お支払い方法の詳細はお問い合わせください。
              {installmentOptions.length > 4 && (
                <span>
                  {' '}
                  月々の支払い金額が大きい場合は、より長期の分割払いプランもご用意しています。
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
