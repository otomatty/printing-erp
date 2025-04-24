import TopicsPageClient from './topics-page-client';
import { listCategories, listTags, listTopics } from '~/_actions/topics/index';
import type { Topic } from '~/types/topics';

export const dynamic = 'force-dynamic';

export default async function TopicsPage() {
  // カテゴリ、タグ、記事の取得
  const [catRes, tagRes, topicsRes] = await Promise.all([
    listCategories(),
    listTags(),
    listTopics({}),
  ]);
  const { categories, error: catError } = catRes;
  const { tags, error: tagError } = tagRes;
  const { topics, error: topicsError } = topicsRes;

  if (catError || tagError || topicsError) {
    return (
      <div className="text-destructive mt-4">
        エラー: {catError || tagError || topicsError}
      </div>
    );
  }

  return (
    <TopicsPageClient categories={categories} tags={tags} topics={topics} />
  );
}
