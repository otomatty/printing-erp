'use client';

import type React from 'react';
import Container from '~/components/custom/container';
import SectionHeader from './section-header';
import ChallengeCard from './challenge-card';
import SolutionCard from './solution-card';
import { challengesData } from './data';

/**
 * ホームページ課題セクションコンポーネント
 * ホームページに関する課題をカードで表示し、解決策を提案する
 */
const HomepageChallengesSection: React.FC = () => {
  return (
    <section id="challenges" className="py-16 lg:py-32 bg-gray-50">
      <Container>
        {/* セクションヘッダー */}
        <SectionHeader
          title="こんな"
          highlightedText="困りごと"
          description="多くの中小企業様が抱えている、ホームページやホームページに関する「あるある」な悩みをご紹介します。"
        />

        {/* 課題カードのグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-4 mb-8">
          {challengesData.map((challenge) => (
            <ChallengeCard key={challenge.category} challenge={challenge} />
          ))}
        </div>

        {/* 解決策提示カード */}
        <SolutionCard />
      </Container>
    </section>
  );
};

export default HomepageChallengesSection;
