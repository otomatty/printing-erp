import PageHero from '~/components/custom/page-hero';
import CtaSection from '~/components/custom/cta-section';
import NewsDetail from '../_components/news-detail';
import { getNewsDetail, getLatestNews } from '~/actions/news';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const { news, error } = await getNewsDetail(resolvedParams.slug);

  if (!news || error) {
    return {
      title: 'お知らせが見つかりません | ニイヌマ企画印刷',
      description: 'お探しのお知らせは見つかりませんでした。',
    };
  }

  return {
    title: `${news.title} | ニイヌマ企画印刷`,
    description: news.summary || news.title,
  };
}

// 将来的にはISRやSSGを実装する場合はここでパスを生成
// export async function generateStaticParams() {
//   // 全ての記事のslugを取得して、静的ページを生成
// }

export default async function NewsDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { news, error } = await getNewsDetail(resolvedParams.slug);

  // 最新のニュース3件を取得（現在の記事を除く）
  const { news: latestNews } = await getLatestNews(4);

  // 現在の記事を除外した最新記事を準備
  const relatedNews = latestNews
    .filter((item) => item.slug !== resolvedParams.slug)
    .slice(0, 3);

  if (!news || error) {
    notFound();
  }

  return (
    <div>
      <PageHero title="お知らせ" subtitle={news.title} />
      <NewsDetail news={news} relatedNews={relatedNews} />
      <CtaSection
        title="お問い合わせ"
        message="お知らせに関するご質問やお問い合わせは、こちらからお気軽にご連絡ください。"
      />
    </div>
  );
}
