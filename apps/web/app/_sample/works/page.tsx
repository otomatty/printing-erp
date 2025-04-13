import Introduction from './_components/Introduction';
import FilterableWorksList from './_components/FilterableWorksList';
import PageHero from '~/components/custom/page-hero';
import CtaSection from '~/components/custom/cta-section';

export const metadata = {
  title: '制作事例 | ニイヌマ企画印刷',
  description:
    'ニイヌマ企画印刷の高品質な印刷物とデザインの実績をご紹介します。企業パンフレット、名刺、チラシなど幅広い制作事例をご覧いただけます。',
};

export default function WorksPage() {
  return (
    <>
      <PageHero
        title="制作事例"
        subtitle="ニイヌマ企画印刷の高品質な印刷物とデザインの実績をご紹介します"
      />
      <Introduction />
      <FilterableWorksList />
      <CtaSection message="ご希望の印刷物や制作物についてのご相談、お見積りのご依頼など、お気軽にお問い合わせください。経験豊富なスタッフが丁寧にサポートいたします。" />
    </>
  );
}
