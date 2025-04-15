'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import Container from '~/components/custom/container';
import SectionTitle from '../../../_common/section-title';
import ChallengeBubble from './challenge-bubble';
import SolutionCard from './solution-card';
import { challengesData } from './data';

/**
 * システム課題セクションコンポーネント
 * 業務上の課題をアニメーション付きで表示し、解決策を提案する
 */
const SystemChallengesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animationDuration = 8; // 切り替え間隔を8秒に変更

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % challengesData.length);
    }, animationDuration * 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Linterエラー対応: challengesDataが空の場合を考慮 (実際にはほぼ起こらないが念のため)
  if (challengesData.length === 0) {
    return null; // データがない場合は何も表示しない
  }

  const currentChallenge = challengesData[currentIndex] || challengesData[0]; // フォールバック値を追加

  return (
    <section id="challenges" className="py-16 lg:py-32 bg-gray-50">
      <Container>
        {/* セクションヘッダー */}
        <SectionTitle
          title="業務の"
          highlightedText="よくある困りごと"
          description="中小企業・小規模事業者様によく聞かれる「あるある」な業務の悩み。あなたの会社にも当てはまるものはありませんか？"
        />

        {/* チャレンジの吹き出し */}
        {currentChallenge && (
          <ChallengeBubble currentChallenge={currentChallenge} />
        )}

        {/* 解決策提示カード */}
        <SolutionCard />
      </Container>
    </section>
  );
};

export default SystemChallengesSection;
