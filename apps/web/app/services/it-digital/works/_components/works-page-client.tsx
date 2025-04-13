'use client';

import React, { useState } from 'react';
import Container from '~/components/custom/container';
import PageHero from '~/components/custom/page-hero';
import CtaSection from '~/components/custom/cta-section';
import WorksFilter from './works-filter';
import WorksList from './works-list';
import ServiceCTA from '~/components/services/service-cta';
import { works } from '~/data/works';

const WorksPageClient = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  // フィルタリングされた実績リスト
  const filteredWorks = works.filter((work) => {
    const categoryMatch =
      selectedCategory === 'all' || work.category === selectedCategory;
    const industryMatch =
      selectedIndustry === 'all' || work.industry === selectedIndustry;
    return categoryMatch && industryMatch;
  });

  return (
    <div>
      <PageHero
        title="実績紹介"
        subtitle="お客様の課題解決に貢献したプロジェクト事例"
      />

      <section className="py-16">
        <Container>
          <div className="mb-12">
            <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
              様々な業種・規模のお客様のIT課題を解決してきた実績をご紹介します。
              制作したホームページ、開発したシステム、コンサルティングによる業務改善など、
              お客様のビジネス成長に貢献した事例をぜひご覧ください。
            </p>

            {/* フィルタリングセクション */}
            <WorksFilter
              selectedCategory={selectedCategory}
              selectedIndustry={selectedIndustry}
              setSelectedCategory={setSelectedCategory}
              setSelectedIndustry={setSelectedIndustry}
            />

            {/* 実績リスト */}
            <WorksList works={filteredWorks} />
          </div>
        </Container>
      </section>

      {/* お問い合わせセクション */}
      <ServiceCTA />

      <CtaSection />
    </div>
  );
};

export default WorksPageClient;
