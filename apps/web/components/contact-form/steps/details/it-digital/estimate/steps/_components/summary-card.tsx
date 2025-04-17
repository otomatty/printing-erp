'use client';

import { Card } from '@kit/ui/card';
import { Separator } from '@kit/ui/separator';
import { Button } from '@kit/ui/button';
import { useAtom } from 'jotai';
import {
  proposedFeaturesAtom,
  selectedFeatureIdsAtom,
  currentStepAtom,
} from '~/store/estimate';
import type { ReactNode } from 'react';

type SummaryCardProps = {
  onNext?: () => void;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  totalPrice?: number;
  totalDuration?: number;
  className?: string;
  cardClassName?: string;
  children?: ReactNode;
  showModernOption?: boolean;
  modernTitle?: string;
  modernDescription?: string;
  useCustomPrice?: boolean;
  useCustomDuration?: boolean;
};

export function SummaryCard({
  onNext,
  title = '従来の開発手法',
  subtitle,
  buttonText = '最新の開発手法で見積もりを出す',
  totalPrice,
  totalDuration,
  className = '',
  cardClassName = '',
  children,
  showModernOption = true,
  modernTitle = '最新の開発手法',
  modernDescription = '最新の開発手法では、従来の開発手法よりもコストを大幅に削減できます。',
  useCustomPrice = false,
  useCustomDuration = false,
}: SummaryCardProps) {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
  const [selectedFeatureIds] = useAtom(selectedFeatureIdsAtom);
  const [proposedFeatures] = useAtom(proposedFeaturesAtom);

  const calculateTotalPrice = () => {
    if (useCustomPrice && totalPrice !== undefined) {
      return totalPrice;
    }

    return proposedFeatures
      .filter((f) => selectedFeatureIds.includes(f.id))
      .reduce((sum, f) => sum + f.price, 0);
  };

  const calculateTotalDuration = () => {
    if (useCustomDuration && totalDuration !== undefined) {
      return totalDuration;
    }

    return proposedFeatures
      .filter((f) => selectedFeatureIds.includes(f.id))
      .reduce((sum, f) => sum + f.duration, 0);
  };

  // スクロール処理
  const scrollToTop = () => {
    const yOffset = 300; // 下に300px余分にスクロールするオフセット
    window.scrollTo({ top: 0 + yOffset, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      setCurrentStep('modern-estimate');
    }

    // ステップ変更後にスクロール処理を実行
    setTimeout(scrollToTop, 100);
  };

  return (
    <div
      className={`lg:fixed lg:right-8 lg:top-1/2 lg:-translate-y-1/2 lg:w-80 fixed bottom-0 left-0 right-0 lg:bottom-auto lg:left-auto z-10 ${className}`}
    >
      <Card
        className={`p-4 shadow-lg border-primary/20 lg:rounded-md rounded-b-none ${cardClassName}`}
      >
        <div className="space-y-2 rounded-sm text-muted-foreground">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          {subtitle && <p className="text-sm mb-2">{subtitle}</p>}
          <div>
            <p className="font-medium text-sm mb-1">合計金額：</p>
            <p className="text-2xl font-bold">
              {calculateTotalPrice().toLocaleString()}円
            </p>
          </div>
          <div>
            <p className="font-medium text-sm mb-1">想定期間：</p>
            <p className="text-lg font-bold">
              約{calculateTotalDuration().toFixed(1)}日
            </p>
          </div>
        </div>

        {children && (
          <>
            <Separator className="my-4" />
            <div className="mb-4">{children}</div>
          </>
        )}

        {showModernOption && (
          <>
            <Separator className="my-4" />
            <div className="space-y-2 mb-4">
              <h3 className="text-lg font-bold mb-2 text-primary">
                {modernTitle}
              </h3>
              <p className="text-sm text-muted-foreground">
                {modernDescription}
              </p>
            </div>
          </>
        )}

        <Button className="w-full" size="lg" onClick={handleNext}>
          {buttonText}
        </Button>
      </Card>
    </div>
  );
}
