import PageHero from '~/components/custom/page-hero';
import CtaSection from '~/components/custom/cta-section';
import ServicesOverview from './_components/services-overview';
import ServiceDetails from '~/components/services/service-details';
import WorkflowSteps from './_components/workflow-steps';
import Faq from './_components/faq';

export const metadata = {
  title: 'サービス | ニイヌマ企画印刷',
  description:
    'ニイヌマ企画印刷の提供する印刷サービス、デザイン制作、看板・サイン、販促物制作などのサービス一覧です。',
};

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        title="サービス"
        subtitle="ニイヌマ企画印刷の提供するサービスをご紹介します"
      />
      <ServicesOverview />
      <ServiceDetails />
      <WorkflowSteps />
      <Faq />
      <CtaSection
        title="サービスについてのお問い合わせ"
        message="各サービスの詳細や料金、納期などについてご質問がございましたら、お気軽にお問い合わせください。専門スタッフが丁寧にご対応いたします。"
      />
    </div>
  );
}
