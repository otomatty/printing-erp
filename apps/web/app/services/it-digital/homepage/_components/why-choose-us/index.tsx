'use client';

import type React from 'react';
import Container from '~/components/custom/container';
import PartnershipSection from '../../../_common/partnership';
import { relationshipMetrics } from '../../_data/whyChooseUsData';
import SectionTitle from '../../../_common/section-title';
import {
  PresentationSlider,
  type PresentationSlide,
} from '~/components/services/presentation-slider';
import ReasonCardsSection from './reason-cards-section';
import HomepageComparisonTable from './homepage-comparison-table';
import DevelopmentPrinciplesSection from './development-principles-section';

const whyChooseUsSlides: PresentationSlide[] = [
  {
    id: 'reasons',
    title: '選ばれる理由',
    description: '私たちが選ばれる理由をカード形式でご紹介',
    image: '/images/it-digital/homepage/homepage-merit.webp', // 仮画像パス
    detailContent: <ReasonCardsSection />,
  },
  {
    id: 'comparison',
    title: '制作方法の比較',
    description: '他社との比較で強みが一目瞭然',
    image: '/images/it-digital/homepage/homepage-compare.webp', // 仮画像パス
    detailContent: <HomepageComparisonTable />,
  },
  {
    id: 'principles',
    title: '制作5つの約束',
    description: '私たちの制作思想・原則',
    image: '/images/it-digital/homepage/homepage-promise.webp', // 仮画像パス
    detailContent: <DevelopmentPrinciplesSection />,
  },
];

const HomepageWhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-primary/5">
      <Container>
        <SectionTitle
          title="ニイヌマ企画印刷が"
          highlightedText="選ばれる理由"
          description="私たちはただホームページを作るだけでなく、お客様の事業の成功を一緒に考えるパートナーとして選ばれ続けています"
        />
      </Container>
      <div className="mb-16">
        <PresentationSlider slides={whyChooseUsSlides} />
      </div>
      <Container>
        <PartnershipSection
          accentColor="blue"
          serviceType="ホームページ"
          titlePrefix="制作会社"
          metrics={relationshipMetrics}
          hasPadding={true}
        />
      </Container>
    </section>
  );
};

export default HomepageWhyChooseUsSection;
