import React from 'react';
import type { Metadata } from 'next';

// インポート済みのコンポーネント
import SystemHeroSection from './_components/hero';
import SystemChallengesSection from './_components/challenges';
import { SystemServicesSection } from './_components/services';
import SystemCostPerformanceSection from './_components/cost-performance';
import SystemBenefitsSection from './_components/benefits';
import SystemWhyChooseUsSection from './_components/why-chose-us';
import SystemWorkflowSection from './_components/workflow';
import SystemPricingSection from './_components/pricing';
import MobileEstimateButton from '~/components/custom/mobile-estimate-button';
import FAQSection from '~/components/custom/faq/faq-section';
import { systemFAQs } from './_data/faqData';
import CtaSection from '~/components/custom/cta-section';
export const metadata: Metadata = {
  title: '業務システム開発 | ニイヌマ企画印刷',
  description:
    'お客様のビジネスに最適な業務システムの開発・導入をサポートします。業務効率化からコスト削減まで、幅広いニーズに対応したシステム開発サービスをご提供します。',
};

export default function SystemPage() {
  return (
    <main>
      {/* 1. ヒーローセクション */}
      <SystemHeroSection />

      {/* 2. ビジネスにおける課題と解決方法 */}
      <SystemChallengesSection />

      {/* 3. サービス紹介 */}
      <SystemServicesSection />

      {/* 4. コストパフォーマンス */}
      <SystemCostPerformanceSection />

      {/* 6. 導入企業が実感した4つのメリット */}
      <SystemBenefitsSection />

      {/* 8. 選ばれる理由 */}
      <SystemWhyChooseUsSection />

      {/* 9. 仕事の流れ */}
      <SystemWorkflowSection />

      {/* 10. 料金表 */}
      <SystemPricingSection id="pricing" />

      {/* 11. よくある質問 - SystemFaqSection の代わりに FAQSection を直接使用 */}
      <FAQSection faqs={systemFAQs} title="よくあるご質問" withQAStyle={true} />

      {/* 12. CTA */}
      <CtaSection
        title="無料相談はこちら"
        message="AI技術を活用した業務システム開発について、お気軽にご相談ください"
        buttons={[{ text: '無料相談・お見積り', href: '/contact' }]}
      />

      {/* モバイル用見積りボタン */}
      <MobileEstimateButton href="/estimate?type=system" />
    </main>
  );
}
