import PageHero from '~/components/custom/page-hero';
import CtaSection from '~/components/custom/cta-section';
import CompanyInfo from './_components/info';
import CompanyPhilosophy from './_components/philosophy';
import CompanyAccess from './_components/access';

export const metadata = {
  title: '私たちについて | ニイヌマ企画印刷',
  description:
    'ニイヌマ企画印刷の私たちについてページです。会社の基本情報、理念、沿革などをご覧いただけます。',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="私たちについて"
        subtitle="ニイヌマ企画印刷の基本情報や理念、沿革についてご紹介します"
      />
      <CompanyInfo />
      <CompanyPhilosophy />
      <CompanyAccess />
      <CtaSection message="ニイヌマ企画印刷について詳しく知りたい方は、お気軽にお問い合わせください。" />
    </>
  );
}
