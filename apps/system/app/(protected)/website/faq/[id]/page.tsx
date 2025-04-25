import { notFound } from 'next/navigation';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';
import { getPageById, getFaqItems } from '~/_actions/faq';
import AddFaqDialog from '../_components/add-faq-dialog';
import FaqItemsList from '../_components/faq-items-list';

interface FaqDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function FaqDetailPage({ params }: FaqDetailPageProps) {
  const { id } = await params;
  // ページ情報取得
  const { page, error: pageError } = await getPageById(id);
  if (!page || pageError) {
    return notFound();
  }

  // FAQ項目取得
  const { faqItems, error: faqError } = await getFaqItems(page.id);
  if (faqError) {
    return <div className="text-destructive mt-4">エラー: {faqError}</div>;
  }

  return (
    <>
      <PageHeader
        title={page.title || page.slug}
        description={page.description || ''}
        backLink={{ href: '/website/faq', label: 'FAQ一覧' }}
        actions={<AddFaqDialog pageId={page.id} />}
      />

      <Container>
        {faqItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            よくある質問の項目がありません。
          </div>
        ) : (
          <FaqItemsList faqItems={faqItems} />
        )}
      </Container>
    </>
  );
}
