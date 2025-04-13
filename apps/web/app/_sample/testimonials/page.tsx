import Introduction from './_components/Introduction';
import TestimonialsList from './_components/TestimonialsList';
import PageHero from '~/components/custom/page-hero';
import CtaSection from '~/components/custom/cta-section';

export const metadata = {
  title: 'お客様の声 | ニイヌマ企画印刷',
  description:
    'ニイヌマ企画印刷のサービスをご利用いただいたお客様からのフィードバックをご紹介します。実際のお客様の声を通して、私たちのサービス品質をご確認ください。',
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        title="お客様の声"
        subtitle="ニイヌマ企画印刷をご利用いただいたお客様からのフィードバックをご紹介します"
      />
      <Introduction />
      <TestimonialsList />
      <CtaSection message="お客様のニーズに合わせた最適なソリューションをご提案いたします。ご質問、お見積りのご依頼など、お気軽にお問い合わせください。" />
    </>
  );
}
