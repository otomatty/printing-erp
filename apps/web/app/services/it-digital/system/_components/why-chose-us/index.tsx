'use client';

import type React from 'react';
import Container from '~/components/custom/container';
import PartnershipSection from '../../../_common/partnership';
import { relationshipMetrics } from '../../_data/whyChooseUsData';
import ReasonCardsSection from './reason-cards-section';
import SystemComparisonTable from './system-comparison-table';
import DevelopmentPrinciplesSection from './development-principles-section';
import SectionTitle from '../../../_common/section-title';
import {
  PresentationSlider,
  type PresentationSlide,
} from '~/components/services/presentation-slider';

const whyChooseUsSlides: PresentationSlide[] = [
  {
    id: 'reasons',
    title: '選ばれる理由',
    description: '私たちが選ばれる理由をカード形式でご紹介',
    image: '/images/why-choose-us/reason-cards.jpg', // 仮画像パス
    detailContent: <ReasonCardsSection />,
  },
  {
    id: 'comparison',
    title: '導入方法の比較',
    description: '他社との比較で強みが一目瞭然',
    image: '/images/why-choose-us/comparison-table.jpg', // 仮画像パス
    detailContent: <SystemComparisonTable />,
  },
  {
    id: 'principles',
    title: '開発5つの約束',
    description: '私たちの開発思想・原則',
    image: '/images/why-choose-us/development-principles.jpg', // 仮画像パス
    detailContent: <DevelopmentPrinciplesSection />,
  },
];

const SystemWhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-primary/5">
      <SectionTitle
        title="ニイヌマ企画印刷が"
        highlightedText="選ばれる理由"
        description="私たちはただシステムを作るだけでなく、お客様の事業の成功を一緒に考えるパートナーとして選ばれ続けています"
      />
      <div className="mb-16">
        <PresentationSlider slides={whyChooseUsSlides} />
      </div>
      <Container>
        <PartnershipSection
          accentColor="blue"
          serviceType="システム"
          titlePrefix="システム会社"
          metrics={relationshipMetrics}
          hasPadding={true}
        />
      </Container>
    </section>
  );
};

export default SystemWhyChooseUsSection;
