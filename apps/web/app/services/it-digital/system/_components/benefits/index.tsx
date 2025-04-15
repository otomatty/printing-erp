'use client';

import type React from 'react';
import Container from '~/components/custom/container';
import { AlertTriangle } from 'lucide-react';
import BenefitCard from './benefit-card';
import AchievementCard from './achievement-card';
import { benefitsData, achievementsData } from './data';

const SystemBenefitsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-4">
          業務システムで<span className="text-primary">こんなメリット</span>
          が生まれます
        </h2>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-lg text-gray-700">
            実際にシステムを導入されたお客様から喜ばれている、
            日々の業務がラクになる具体的なメリットをご紹介します。
          </p>
        </div>
        <div className="mt-4 bg-yellow-50 border border-yellow-300 rounded-md p-4 max-w-5xl mx-auto mb-12">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
            <p className="text-sm text-yellow-800 text-left">
              ここでご紹介する数値や事例は、実際に私たちが手がけたプロジェクトの実績に基づいています。業種や規模により効果は異なる場合があります。
            </p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {benefitsData.map((benefit) => (
            <BenefitCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              example={benefit.example}
            />
          ))}
        </div>
        {/* 導入企業の成果 */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-6">
            導入した会社の<span className="text-primary">うれしい変化</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {achievementsData.map((achievement) => (
              <AchievementCard
                key={achievement.percentage}
                percentage={achievement.percentage}
                description={achievement.description}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SystemBenefitsSection;
