import { getCategories } from '~/_actions/news';
import SortableCategoriesList from './_components/sortable-categories-list';
import CategoryDialog from './_components/category-dialog';
import { Container } from '~/components/custom/container';
import { PageHeader } from '~/components/custom/page-header';
/**
 * カテゴリ一覧ページ
 */
export default async function CategoriesPage() {
  // カテゴリ一覧の取得
  const { categories, error } = await getCategories();

  if (error) {
    return <div className="text-destructive">エラー: {error}</div>;
  }

  return (
    <>
      <PageHeader
        title="カテゴリ管理"
        description="お知らせのカテゴリを管理します"
        actions={<CategoryDialog />}
        backLink={{
          href: '/website/news',
          label: 'お知らせ一覧',
        }}
      />
      <Container>
        <div className="space-y-6">
          <div className="mb-2 text-sm text-muted-foreground">
            ドラッグ&ドロップで表示順を変更できます
          </div>

          <SortableCategoriesList categories={categories} />
        </div>
      </Container>
    </>
  );
}
