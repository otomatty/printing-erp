'use client';

import type React from 'react';
import Container from '~/components/custom/container';
import SectionTitle from '../../../_common/section-title';
import {
  PresentationSlider,
  type PresentationSlide,
} from '~/components/services/presentation-slider';
import ComparisonSection from './comparison';
import RoiSection from './roi';
import ApproachSection from './approach';

// スライダーで表示するコンテンツの定義
const slides: PresentationSlide[] = [
  {
    id: 'comparison',
    title: '他社とコストを比較',
    description:
      '一般的なホームページ制作会社よりも大幅にコストを抑えた制作が可能',
    image: '/images/it-digital/homepage/chart.webp', // 仮画像パス
    detailContent: <ComparisonSection />,
  },
  {
    id: 'roi',
    title: '投資対効果（ROI）の比較',
    description: '3年間の投資回収シミュレーションで明確な違いが見える',
    image: '/images/it-digital/homepage/roi.webp', // 仮画像パス
    detailContent: <RoiSection />,
  },
  {
    id: 'approach',
    title: 'なぜ低コストで実現できるのか？',
    description:
      '私たちの効率的な制作方法があなたのホームページコストを削減します',
    image: '/images/it-digital/homepage/approach.webp', // 仮画像パス
    detailContent: <ApproachSection />,
  },
];

export const HomepageCostPerformanceSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <SectionTitle
          title="低コストで実現する"
          highlightedText="高品質"
          afterHighlightedText="ホームページ"
          description="従来型制作会社の半分以下のコストで、ビジネス効果の高いホームページを実現します。テンプレートサービスの安さと制作会社の品質、それぞれの良いところを組み合わせた最適なホームページ制作を提供します。"
        />
      </Container>
      <PresentationSlider slides={slides} />
    </section>
  );
};

export default HomepageCostPerformanceSection;
