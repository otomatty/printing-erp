import PageHero from '~/components/custom/page-hero';
import CtaSection from '~/components/custom/cta-section';
import NewsItems from './_components/NewsItems';

export const metadata = {
  title: 'お知らせ | ニイヌマ企画印刷',
  description: 'ニイヌマ企画印刷からの最新のお知らせや更新情報をご紹介します。',
};

export default function NewsPage() {
  return (
    <div>
      <PageHero
        title="お知らせ"
        subtitle="ニイヌマ企画印刷からの最新情報をご紹介します"
      />
      <NewsItems />
      <CtaSection
        title="お問い合わせ"
        message="お知らせに関するご質問やお問い合わせは、こちらからお気軽にご連絡ください。"
      />
    </div>
  );
}
