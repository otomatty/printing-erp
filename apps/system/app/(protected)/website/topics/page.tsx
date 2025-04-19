import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@kit/ui/button';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';

interface Topic {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt: string;
  updatedAt: string;
}

const mockTopics: Topic[] = [
  {
    id: '1',
    title: 'プロトタイプ投稿',
    description: 'これはプロトタイプ用のトピックスです。',
    status: 'published',
    publishedAt: '2024-06-01',
    updatedAt: '2024-06-02',
  },
  {
    id: '2',
    title: '下書きサンプル',
    description: 'これは下書き状態のトピックス例です。',
    status: 'draft',
    publishedAt: '2024-05-20',
    updatedAt: '2024-05-21',
  },
];

export default function TopicsPage() {
  return (
    <>
      <PageHeader
        title="トピックス管理"
        description="ブログコンテンツを管理します"
        actions={
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/website/topics/create">
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
          <div className="grid gap-4 md:grid-cols-2">
            {mockTopics.map(
              ({ id, title, description, status, publishedAt }) => (
                <div key={id} className="border rounded p-4">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {status === 'published'
                      ? '公開中'
                      : status === 'draft'
                        ? '下書き'
                        : 'アーカイブ'}
                    <span className="mx-1">|</span>
                    <time dateTime={publishedAt}>{publishedAt}</time>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
