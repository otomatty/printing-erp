'use client';

import type React from 'react';
import { useState, useEffect, useMemo } from 'react';
import SectionTitle from '../../../_common/section-title';

import {
  calculateRoiData,
  defaultRoiParams,
  type RoiPeriod,
  getRoiRecoveryData,
} from '~/utils/roi-calculation';
import {
  PresentationSlider,
  type PresentationSlide,
} from '~/components/services/presentation-slider';
import ComparisonSection from './comparison';
import RoiSection from './roi';
import ApproachSection from './approach';

const slides: PresentationSlide[] = [
  {
    id: 'comparison',
    title: '従来のシステム開発と比較',
    description: '一般的な業務システム開発よりも圧倒的なコスト効率を実現',
    image: '/images/it-digital/system/chart.webp', // 仮画像パス
    detailContent: <ComparisonSection />,
  },
  {
    id: 'roi',
    title: '投資対効果（ROI）の比較',
    description: '初期開発費と月額運用費を含めた投資回収シミュレーション',
    image: '/images/it-digital/system/graph.webp', // 仮画像パス
    detailContent: <RoiSection />,
  },
  {
    id: 'approach',
    title: 'なぜこの価格が実現できるのか？',
    description:
      '私たちは最新の方法で開発コストを大幅に削減し、お客様に還元しています',
    image: '/images/it-digital/system/approach.webp', // 仮画像パス
    detailContent: <ApproachSection />,
  },
];

const SystemCostPerformanceSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [roiPeriod, setRoiPeriod] = useState<RoiPeriod>('18m'); // ROI表示期間の状態

  // ROIデータを期間に応じてメモ化
  const currentRoiData = useMemo(
    () => calculateRoiData(roiPeriod, defaultRoiParams),
    [roiPeriod]
  );

  // 画面幅を監視してモバイルかどうかを判定
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // md ブレークポイント
    };

    // 初期チェック
    checkIfMobile();

    // リサイズイベントでのチェック
    window.addEventListener('resize', checkIfMobile);

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // 期間に応じた結論テキストを生成
  const getRoiConclusion = () => {
    const recoveryData = getRoiRecoveryData(currentRoiData);
    if (!recoveryData) return null;

    const {
      lastData,
      traditionalRecoveryMonthData,
      ninumaRecoveryMonthData,
      lastTraditionalBalance,
      lastNinumaBalance,
    } = recoveryData;

    return (
      <>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2" />
          <span>
            従来型：
            {lastTraditionalBalance < 0 ? (
              <>
                <strong>{lastData.month}後も投資回収できず</strong> (
                {Math.round(lastTraditionalBalance)}万円)
              </>
            ) : traditionalRecoveryMonthData ? (
              <>
                <strong>
                  {traditionalRecoveryMonthData.month}頃に投資回収
                </strong>{' '}
                ({lastData.month}時点: {Math.round(lastTraditionalBalance)}万円)
              </>
            ) : (
              'データが不足しています'
            )}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-600 rounded-full mr-2" />
          <span>
            ニイヌマ企画印刷：
            {lastNinumaBalance < 0 ? (
              <>
                <strong>{lastData.month}後も投資回収できず</strong> (
                {Math.round(lastNinumaBalance)}万円)
              </>
            ) : ninumaRecoveryMonthData ? (
              <>
                <strong>{ninumaRecoveryMonthData.month}頃に投資回収</strong>し、
                {lastData.month}時点では{Math.round(lastNinumaBalance)}
                万円の利益
              </>
            ) : (
              'データが不足しています'
            )}
          </span>
        </div>
      </>
    );
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <SectionTitle
        title="コストを"
        highlightedText="最大60%"
        afterHighlightedText="低減する次世代のシステム開発"
        description="従来の業務システム開発と比較して、より短期間で、より低コストで、より高い投資対効果を実現します"
      />
      <PresentationSlider slides={slides} />
    </section>
  );
};

export default SystemCostPerformanceSection;
