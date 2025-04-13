import PageHero from '~/components/custom/page-hero';
import CtaSection from '~/components/custom/cta-section';
import NewsDetail from '../_components/NewsDetail';
import { newsItems } from '../_components/newsData';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const newsItem = newsItems.find((item) => item.id === resolvedParams.id);

  if (!newsItem) {
    return {
      title: 'お知らせが見つかりません | ニイヌマ企画印刷',
      description: 'お探しのお知らせは見つかりませんでした。',
    };
  }

  return {
    title: `${newsItem.title} | ニイヌマ企画印刷`,
    description: newsItem.excerpt,
  };
}

export async function generateStaticParams() {
  return newsItems.map((item) => ({
    id: item.id,
  }));
}

export default async function NewsDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const newsItem = newsItems.find((item) => item.id === resolvedParams.id);

  if (!newsItem) {
    notFound();
  }

  return (
    <div>
      <PageHero title="お知らせ" subtitle={newsItem.title} />
      <NewsDetail newsItem={newsItem} />
      <CtaSection
        title="お問い合わせ"
        message="お知らせに関するご質問やお問い合わせは、こちらからお気軽にご連絡ください。"
      />
    </div>
  );
}
