import CreateTopicClient from './topics-page-client';
import { listCategories } from '~/_actions/topics/index';

/**
 * トピック新規作成ページ
 */
export default async function CreateTopicPage() {
  // カテゴリ一覧を取得
  const { categories, error } = await listCategories();

  if (error) {
    return <div className="text-destructive mt-4">エラー: {error}</div>;
  }

  return <CreateTopicClient categories={categories} />;
}
