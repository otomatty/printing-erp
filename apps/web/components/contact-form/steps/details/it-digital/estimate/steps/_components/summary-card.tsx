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
import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

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

  // 折りたたみ状態管理（スマホでは折りたたみ）
  const [collapsed, setCollapsed] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCollapsed(false);
      else setCollapsed(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        className={`p-4 shadow-lg border-primary/20 lg:rounded-md rounded-b-none max-h-[80vh] overflow-y-auto overscroll-y-contain ${cardClassName}`}
      >
        {/* タイトルと合計金額は常に表示 */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{title}</h3>
          {/* 折りたたみトグル（モバイルのみ） */}
          <button
            type="button"
            className="lg:hidden focus:outline-none"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
        {/* 合計金額 */}
        <div className="mt-2">
          <p className="font-medium text-sm mb-1">合計金額：</p>
          <p className="text-2xl font-bold">
            {calculateTotalPrice().toLocaleString()}円
          </p>
        </div>
        {/* 折りたたみ時にも次へボタンを表示（モバイルのみ） */}
        {collapsed && (
          <Button
            className="w-full mt-4 lg:hidden"
            size="lg"
            onClick={handleNext}
          >
            {buttonText}
          </Button>
        )}
        {/* 折りたたみ解除時に詳細を表示 */}
        {!collapsed && (
          <>
            {/* 想定期間 */}
            <div>
              <p className="font-medium text-sm mb-1">想定期間：</p>
              <p className="text-lg font-bold">
                約{calculateTotalDuration().toFixed(1)}日
              </p>
            </div>
            {/* 子コンテンツ */}
            {children && (
              <>
                <Separator className="my-4" />
                <div className="mb-4">{children}</div>
              </>
            )}
            {/* 最新手法オプション */}
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
            {/* 実行ボタン */}
            <Button className="w-full" size="lg" onClick={handleNext}>
              {buttonText}
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}
