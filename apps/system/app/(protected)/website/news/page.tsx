import Link from 'next/link';
import { Suspense } from 'react';
import { Plus, Tag } from 'lucide-react';
import { Button } from '@kit/ui/button';
import { Pagination } from '@kit/ui/pagination';
import { searchNews, getCategories } from '~/actions/news';
import NewsCard from './_components/news-card';
import NewsFilters from './_components/news-filters';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';

/**
 * 検索パラメータの型
 */
interface SearchParams {
  page?: string;
  status?: string;
  categoryId?: string;
  query?: string;
}

/**
 * お知らせ一覧ページのプロパティ
 */
interface NewsPageProps {
  searchParams: Promise<SearchParams>;
}

/**
 * お知らせリスト本体（Suspenseで囲むため分離）
 */
async function NewsList({
  searchParams,
}: { searchParams: Promise<SearchParams> }) {
  // searchParamsをawaitしてからプロパティにアクセス
  const params = await searchParams;

  // 検索条件の組み立て
  const page = params.page ? Number.parseInt(params.page) : 1;
  const status = (params.status || 'all') as
    | 'all'
    | 'published'
    | 'draft'
    | 'archived';
  const categoryId = params.categoryId;
  const query = params.query;

  // お知らせデータの取得
  const { news, total, error } = await searchNews({
    page,
    limit: 10,
    status,
    categoryId,
    query,
  });

  // 総ページ数の計算
  const totalPages = Math.ceil(total / 10);

  if (error) {
    return <div className="text-destructive mt-4">エラー: {error}</div>;
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        お知らせが見つかりませんでした。
      </div>
    );
  }

  // ページングURLのベース部分を構築
  const createPageBaseUrl = () => {
    const urlParams = new URLSearchParams();
    if (params.status) urlParams.set('status', params.status);
    if (params.categoryId) urlParams.set('categoryId', params.categoryId);
    if (params.query) urlParams.set('query', params.query);

    const queryString = urlParams.toString();
    return `?${queryString}${queryString ? '&' : ''}page=`;
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        {news.map((item) => (
          <NewsCard
            key={item.id}
            id={item.id}
            title={item.title}
            summary={item.summary}
            slug={item.slug}
            status={item.status as 'draft' | 'published' | 'archived'}
            publishedAt={item.published_at}
            updatedAt={item.updated_at}
            categoryName={item.category?.name}
            thumbnailUrl={item.thumbnail_url}
            isFeatured={!!item.is_featured}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          baseUrl={createPageBaseUrl()}
          className="my-6"
        />
      )}
    </div>
  );
}

/**
 * お知らせ一覧ページ
 */
export default async function NewsPage({ searchParams }: NewsPageProps) {
  // カテゴリ情報の取得
  const { categories } = await getCategories();

  return (
    <>
      <PageHeader
        title="お知らせ管理"
        description="ホームページに掲載するお知らせを管理します"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/website/news/categories">
                <Tag className="h-4 w-4 mr-1" />
                カテゴリ管理
              </Link>
            </Button>
            <Button asChild>
              <Link href="/website/news/create">
                <Plus className="h-4 w-4 mr-1" />
                新規作成
              </Link>
            </Button>
          </div>
        }
        backLink={{
          href: '/',
          label: 'ホームに戻る',
        }}
      />

      <Container>
        <div className="space-y-6">
          <NewsFilters categories={categories} />

          <Suspense fallback={<div>読み込み中...</div>}>
            <NewsList searchParams={searchParams} />
          </Suspense>
        </div>
      </Container>
    </>
  );
}
