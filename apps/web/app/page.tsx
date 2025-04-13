import HeroSection from './_components/hero';
import NewsSection from './_components/news';
import ServiceDetails from '~/components/services/service-details';
import RecoverySection from './_components/recovery';
import CtaSection from './_components/cta';
import IntroductionSection from './_components/introduction';
import { getLatestNews, getFeaturedNews } from '~/actions/news';

export default async function Home() {
  // 最新のお知らせを取得（最大5件）
  const { news: latestNews, error: latestNewsError } = await getLatestNews(5);

  // 特集記事を取得
  const { news: featuredNews, error: featuredNewsError } =
    await getFeaturedNews();

  return (
    <div className="flex flex-col">
      <HeroSection />
      <IntroductionSection />
      <ServiceDetails />
      <NewsSection latestNews={latestNews} featuredNews={featuredNews} />
      <RecoverySection />
      <CtaSection />
    </div>
  );
}
