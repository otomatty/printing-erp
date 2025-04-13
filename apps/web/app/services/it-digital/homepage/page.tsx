import React from 'react';
import type { Metadata } from 'next';

// インポート済みのコンポーネント
import HomepageHeroSection from './_components/HomepageHeroSection';
import HomepageChallengesSection from './_components/HomepageChallengesSection';
import { HomepageServicesSection } from './_components/HomepageServicesSection';
import HomepageCostPerformanceSection from './_components/HomepageCostPerformanceSection';
import HomepageBenefitsSection from './_components/HomepageBenefitsSection';
import HomepageCaseStudiesSection from './_components/HomepageCaseStudiesSection';
import HomepageWhyChooseUsSection from './_components/HomepageWhyChooseUsSection';
import HomepageWorkflowSection from './_components/HomepageWorkflowSection';
import HomepagePricingSection from './_components/HomepagePricingSection';
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

      {/* 7. 実績とお客様の声 */}
      <HomepageCaseStudiesSection />

      {/* 8. 選ばれる理由 */}
      <HomepageWhyChooseUsSection />

      {/* 9. 仕事の流れ */}
      <HomepageWorkflowSection />

      {/* 10. 料金表 */}
      <HomepagePricingSection id="pricing" />

      {/* 11. よくある質問 - HomepageFaqSection の代わりに FAQSection を直接使用 */}
      <FAQSection
        faqs={homepageFAQs}
        title="ホームページ制作のよくあるご質問"
        withQAStyle={false}
      />

      {/* 12. CTA */}
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
