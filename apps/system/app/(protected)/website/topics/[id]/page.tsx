import EditTopicClient from './topics-page-client';
import { getTopicById, listCategories } from '~/_actions/topics/index';

/**
 * 特集記事編集ページ
 */
export default async function EditTopicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { topic, error: topicError } = await getTopicById(id);
  if (topicError || !topic) {
    return <div className="text-destructive mt-4">エラー: {topicError}</div>;
  }

  const { categories, error: categoriesError } = await listCategories();
  if (categoriesError) {
    return (
      <div className="text-destructive mt-4">エラー: {categoriesError}</div>
    );
  }

  return (
    <EditTopicClient
      initialData={{
        ...topic,
        category_id: topic.category?.id || '',
      }}
      categories={categories}
    />
  );
}
