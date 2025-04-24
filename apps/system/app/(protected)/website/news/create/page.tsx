import { getCategories } from '~/_actions/news';
import NewsForm from '../_components/news-form';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';

/**
 * お知らせ新規作成ページ
 */
export default async function CreateNewsPage() {
  // カテゴリ一覧を取得
  const { categories, error } = await getCategories();

  if (error) {
    return <div>エラー: {error}</div>;
  }

  return (
    <>
      <PageHeader
        title="新規お知らせ作成"
        description="ホームページに掲載する新しいお知らせを作成します"
        backLink={{
          href: '/website/news',
          label: 'お知らせ一覧',
        }}
      />

      <Container>
        <NewsForm categories={categories} />
      </Container>
    </>
  );
}
