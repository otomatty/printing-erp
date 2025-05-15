import PageHero from '~/components/custom/page-hero';
import CtaSection from '~/components/custom/cta-section';
import CompanyInfo from './_components/info';
import CompanyPhilosophy from './_components/philosophy';
import CompanyAccess from './_components/access';

export const metadata = {
  title: '私たちについて | 印刷会社',
  description:
    '印刷会社についてページです。会社の基本情報、理念、沿革などをご覧いただけます。',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="私たちについて"
        subtitle="印刷会社報や理念、沿革についてご紹介します"
      />
      <CompanyInfo />
      <CompanyPhilosophy />
      <CompanyAccess />
      <CtaSection message="印刷会社詳しく知りたい方は、お気軽にお問い合わせください。" />
    </>
  );
}
