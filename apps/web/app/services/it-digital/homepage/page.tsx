import React from 'react';
import type { Metadata } from 'next';

// インポート済みのコンポーネント
import HomepageHeroSection from './_components/hero';
import HomepageChallengesSection from './_components/challenges';
import { HomepageServicesSection } from './_components/services';
import HomepageCostPerformanceSection from './_components/cost-performance';
import HomepageBenefitsSection from './_components/benefits';
import HomepageWhyChooseUsSection from './_components/why-choose-us';
import HomepageWorkflowSection from './_components/workflow';
import HomepagePricingSection from './_components/pricing';
import MobileEstimateButton from '~/components/custom/mobile-estimate-button';
import FAQSection from '~/components/custom/faq/faq-section';
import { homepageFAQs } from './_data/faqData';
import CtaSection from '~/components/custom/cta-section';

export const metadata: Metadata = {
  title: 'ホームページ制作 | ニイヌマ企画印刷',
  description:
    'お客様のビジネスを成功に導くホームページ制作をご提供します。デザイン性と機能性を兼ね備えた、集客・売上アップにつながるWebサイトを制作いたします。',
};

export default function HomepagePage() {
  return (
    <main>
      {/* 1. ヒーローセクション */}
      <HomepageHeroSection />

      {/* 2. ビジネスにおける課題と解決方法 */}
      <HomepageChallengesSection />

      {/* 3. サービス紹介 */}
      <HomepageServicesSection />

      {/* 4. コストパフォーマンス */}
      <HomepageCostPerformanceSection />

      {/* 6. 導入企業が実感した4つのメリット */}
      <HomepageBenefitsSection />

      {/* 7. 選ばれる理由 */}
      <HomepageWhyChooseUsSection />

      {/* 8. 仕事の流れ */}
      <HomepageWorkflowSection />

      {/* 9. 料金表 */}
      <HomepagePricingSection id="pricing" />

      {/* 10. よくあるご質問 - HomepageFaqSection の代わりに FAQSection を直接使用 */}
      <FAQSection
        faqs={homepageFAQs}
        title="よくあるご質問"
        withQAStyle={true}
      />

      {/* 11. CTA */}
      <CtaSection
        title="ホームページ制作のご相談はこちら"
        message="ホームページ制作について、お気軽にご相談ください"
        buttons={[{ text: '無料相談・お見積り', href: '/contact' }]}
      />

      {/* モバイル用見積りボタン */}
      <MobileEstimateButton href="/estimate?type=homepage" />
    </main>
  );
}
