import PageHero from '~/components/custom/page-hero';
import CtaSection from '~/components/custom/cta-section';
import { getPublishedNews, getNewsCategories } from '~/actions/news';
import NewsList from './_components/news-list';

/**
 * 検索パラメータの型
 */
interface SearchParams {
  page?: string;
  categorySlug?: string;
}

/**
 * お知らせ一覧ページのプロパティ
 */
interface NewsPageProps {
  searchParams: Promise<SearchParams>;
}

export const metadata = {
  title: 'お知らせ一覧 | ニイヌマ企画印刷',
  description:
    '印刷会社ニイヌマ企画の最新情報、お知らせ、イベント情報などをご紹介しています。',
};

export default async function NewsPage({ searchParams }: NewsPageProps) {
  // 検索パラメータを取得
  const params = await searchParams;

  // ページ番号を取得（デフォルトは1ページ目）
  const page = params.page ? Number.parseInt(params.page, 10) : 1;

  // カテゴリーでフィルタリング
  const categorySlug = params.categorySlug;

  // お知らせデータを取得
  const { news, total, error } = await getPublishedNews({
    page,
    limit: 10,
    categorySlug,
  });

  // カテゴリ一覧を取得
  const { categories } = await getNewsCategories();

  return (
    <div>
      <PageHero
        title="お知らせ"
        subtitle="最新のニュースやお知らせをご紹介します"
      />
      <NewsList
        news={news}
        total={total}
        currentPage={page}
        categories={categories}
        currentCategory={categorySlug}
      />
      <CtaSection
        title="お問い合わせ"
        message="お知らせに関するご質問やお問い合わせは、こちらからお気軽にご連絡ください。"
      />
    </div>
  );
}
