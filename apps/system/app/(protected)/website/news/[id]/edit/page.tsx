import { notFound } from 'next/navigation';
import { getCategories, getNewsById } from '~/_actions/news';
import NewsForm from '../../_components/news-form';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';

/**
 * お知らせ編集ページのパラメータ
 */
interface EditNewsPageProps {
  params: {
    id: string;
  };
}

/**
 * お知らせ編集ページ
 */
export default async function EditNewsPage({ params }: EditNewsPageProps) {
  const { id } = params;

  // お知らせとカテゴリ一覧を並行して取得
  const [newsResult, categoriesResult] = await Promise.all([
    getNewsById(id),
    getCategories(),
  ]);

  // お知らせが見つからない場合は404
  if (!newsResult.news || newsResult.error) {
    return notFound();
  }

  // カテゴリ取得エラー
  if (categoriesResult.error) {
    return <div>エラー: {categoriesResult.error}</div>;
  }

  const { news } = newsResult;
  const { categories } = categoriesResult;

  return (
    <>
      <PageHeader
        title="お知らせ編集"
        description={`「${news.title}」を編集しています`}
        backLink={{
          href: `/website/news/${id}`,
          label: 'お知らせ詳細',
        }}
      />

      <Container>
        <NewsForm
          newsId={id}
          categories={categories}
          defaultValues={{
            title: news.title,
            content: news.content,
            summary: news.summary || '',
            slug: news.slug,
            status: news.status as 'draft' | 'published' | 'archived',
            is_featured: news.is_featured || false,
            category_id: news.category_id,
            thumbnail_url: news.thumbnail_url,
            published_at: news.published_at || '',
            publish_end_date: news.publish_end_date,
          }}
        />
      </Container>
    </>
  );
}
