import PageHero from '~/components/custom/page-hero';
import CtaSection from '~/components/custom/cta-section';
import CompanyInfo from './_components/info';
import CompanyPhilosophy from './_components/philosophy';
import CompanyAccess from './_components/access';

export const metadata = {
  title: '会社概要 | ニイヌマ企画印刷',
  description:
    'ニイヌマ企画印刷の会社概要ページです。会社の基本情報、理念、沿革などをご覧いただけます。',
};

export default function CompanyPage() {
  return (
    <>
      <PageHero
        title="私たちについて"
        subtitle="私たちの会社理念や歩み、組織体制についてご紹介します"
      />
      <CompanyInfo />
      <CompanyPhilosophy />
      <CompanyAccess />
      <CtaSection message="会社概要や私たちの理念について詳しく知りたい方は、お気軽にお問い合わせください。" />
    </>
  );
}
