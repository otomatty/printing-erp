import { Suspense } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@kit/ui/button';
import { ResponsiveDialog } from '@kit/ui/responsive-dialog';
import PageForm from './_components/page-form';
import PageList from './_components/page-list';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';

export default function SamplePage() {
  return (
    <>
      <PageHeader
        title="サンプルページ管理"
        description="製品サンプルを表示するページを管理します"
        backLink={{ href: '/', label: 'ホームに戻る' }}
        actions={
          <ResponsiveDialog
            trigger={
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                新規サンプルページ
              </Button>
            }
            title="新規サンプルページ作成"
            description="製品サンプルを表示するページを作成します"
          >
            <PageForm />
          </ResponsiveDialog>
        }
      />

      <Container>
        <Suspense fallback={<div>読み込み中...</div>}>
          <PageList />
        </Suspense>
      </Container>
    </>
  );
}
