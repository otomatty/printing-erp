import { Suspense } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@kit/ui/button';
import { ResponsiveDialog } from '@kit/ui/responsive-dialog';
import PageForm from './_components/page-form';
import PageList from './_components/page-list';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="ページ管理(よくある質問)"
        description="ホームページのよくある質問が登録されているページを管理します"
        backLink={{ href: '/', label: 'ホームに戻る' }}
        actions={
          <ResponsiveDialog
            trigger={
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                新規ページ
              </Button>
            }
            title="新規ページ作成"
            description="ホームページに表示するページを作成します"
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
