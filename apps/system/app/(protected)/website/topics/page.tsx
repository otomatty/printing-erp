import Link from 'next/link';
import { Suspense } from 'react';
import { Plus, Tag } from 'lucide-react';
import { Button } from '@kit/ui/button';
import { Pagination } from '@kit/ui/pagination';
import { listTopics, listCategories } from '~/actions/topics/index';
import TopicCard from './_components/topic-card';
import TopicFilters from './_components/topic-filters';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';
import type { TopicStatus } from '~/types/topics';

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
 * トピックス一覧本体（Suspenseで分離）
 */
async function TopicsList({
  searchParams,
}: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const page = params.page ? Number.parseInt(params.page, 10) : 1;
  const status = (params.status || 'all') as
    | 'all'
    | 'published'
    | 'draft'
    | 'archived';
  const categoryId = params.categoryId;
  const query = params.query;

  const { topics, total, error } = await listTopics({
    page,
    status,
    categoryId,
    query,
  });
  const totalPages = Math.ceil(total / 10);

  if (error) {
    return <div className="text-destructive mt-4">エラー: {error}</div>;
  }

  if (topics.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        トピックスが見つかりませんでした。
      </div>
    );
  }

  const createPageBaseUrl = () => {
    const urlParams = new URLSearchParams();
    if (params.status) urlParams.set('status', params.status);
    if (params.categoryId) urlParams.set('categoryId', params.categoryId);
    if (params.query) urlParams.set('query', params.query);
    const qs = urlParams.toString();
    return `?${qs}${qs ? '&' : ''}page=`;
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            id={topic.id}
            title={topic.title}
            excerpt={topic.excerpt}
            slug={topic.slug}
            status={topic.status as TopicStatus}
            publishedAt={topic.published_at || undefined}
            updatedAt={topic.updated_at}
            categoryName={topic.topics_categories?.name}
            tags={topic.tags}
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
 * トピックス一覧ページ
 */
export default async function TopicsPage({
  searchParams,
}: { searchParams: Promise<SearchParams> }) {
  const { categories, error: catError } = await listCategories();

  if (catError) {
    return <div className="text-destructive mt-4">エラー: {catError}</div>;
  }

  return (
    <>
      <PageHeader
        title="トピックス管理"
        description="ホームページのトピックスを管理します"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/website/topics/categories">
                <Tag className="h-4 w-4 mr-1" /> カテゴリ管理
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/website/topics/tags">
                <Tag className="h-4 w-4 mr-1" /> タグ管理
              </Link>
            </Button>
            <Button asChild>
              <Link href="/website/topics/create">
                <Plus className="h-4 w-4 mr-1" /> 新規作成
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
          <TopicFilters categories={categories} />
          <Suspense
            fallback={<div className="py-8 text-center">読み込み中...</div>}
          >
            <TopicsList searchParams={searchParams} />
          </Suspense>
        </div>
      </Container>
    </>
  );
}
