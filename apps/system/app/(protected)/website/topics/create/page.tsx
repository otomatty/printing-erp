import { listCategories } from '~/actions/topics/index';
import TopicInfoForm from '../_components/topic-info-form';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';

/**
 * トピック新規作成ページ
 */
export default async function CreateTopicPage() {
  // カテゴリ一覧を取得
  const { categories, error } = await listCategories();

  if (error) {
    return <div className="text-destructive mt-4">エラー: {error}</div>;
  }

  return (
    <>
      <PageHeader
        title="新規トピックス作成"
        description="ホームページの特集記事を作成します"
        backLink={{ href: '/website/topics', label: 'トピックス一覧' }}
      />
      <Container>
        <TopicInfoForm categories={categories} />
      </Container>
    </>
  );
}
