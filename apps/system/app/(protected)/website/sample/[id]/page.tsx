import { notFound } from 'next/navigation';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';
import { getSamplePageById, getSampleItems } from '~/_actions/sample';
import AddSampleDialog from '../_components/add-sample-dialog';
import SampleItemsList from '../_components/sample-items-list';

interface SampleDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function SampleDetailPage({
  params,
}: SampleDetailPageProps) {
  const { id } = await params;
  // ページ情報取得
  const { page, error: pageError } = await getSamplePageById(id);
  if (!page || pageError) {
    return notFound();
  }

  // サンプル項目取得
  const { sampleItems, error: itemsError } = await getSampleItems(page.id);
  if (itemsError) {
    return <div className="text-destructive mt-4">エラー: {itemsError}</div>;
  }

  return (
    <>
      <PageHeader
        title={page.title || page.slug}
        description={page.description || ''}
        backLink={{ href: '/website/sample', label: 'サンプルページ一覧' }}
        actions={<AddSampleDialog pageId={page.id} />}
      />

      <Container>
        {sampleItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            サンプル項目がありません。
          </div>
        ) : (
          <SampleItemsList sampleItems={sampleItems} />
        )}
      </Container>
    </>
  );
}
