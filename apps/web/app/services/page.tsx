import PageHero from '~/components/custom/page-hero';
import CtaSection from '~/components/custom/cta-section';
import ServicesOverview from './_components/services-overview';
import ServiceDetails from '~/components/services/service-details';
import WorkflowSteps from './_components/workflow-steps';
import { FAQSection } from '~/components/custom/faq';
import { getFaqItemsByPageSlug } from '~/actions/faq';

export const metadata = {
  title: 'サービス | 印刷会社',
  description:
    '印刷会社の提供する印刷サービス、デザイン制作、看板・サイン、販促物制作などのサービス一覧です。',
};

export default async function ServicesPage() {
  const { faqs, error } = await getFaqItemsByPageSlug('/services');
  if (error) console.error('Error fetching FAQs:', error);

  return (
    <div>
      <PageHero
        title="サービス"
        subtitle="印刷会社の提供するサービスをご紹介します"
      />
      <ServicesOverview />
      <ServiceDetails />
      <WorkflowSteps />
      <FAQSection
        title="よくあるご質問"
        faqs={faqs}
        withBackground={false}
        withQAStyle={true}
      />
      <CtaSection
        title="サービスについてのお問い合わせ"
        message="各サービスの詳細や料金、納期などについてご質問がございましたら、お気軽にお問い合わせください。専門スタッフが丁寧にご対応いたします。"
      />
    </div>
  );
}
