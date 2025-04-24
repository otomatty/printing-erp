import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Button } from '@kit/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { Badge } from '@kit/ui/badge';
import { Separator } from '@kit/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';
import {
  Edit,
  MoreHorizontal,
  Calendar,
  Tag,
  Clock,
  Star,
  File,
} from 'lucide-react';

import { getNewsById } from '~/_actions/news';
import DeleteNewsButton from '../_components/delete-news-button';
import PublishNewsButton from '../_components/publish-news-button';
import UnpublishNewsButton from '../_components/unpublish-news-button';
import RichTextViewer from '../_components/rich-text-viewer';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';

/**
 * お知らせ詳細ページのパラメータ
 */
interface NewsDetailPageProps {
  params: {
    id: string;
  };
}

/**
 * お知らせのステータスバッジ
 */
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'published':
      return <Badge className="bg-green-500">公開中</Badge>;
    case 'draft':
      return <Badge variant="outline">下書き</Badge>;
    case 'archived':
      return <Badge variant="secondary">アーカイブ</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

/**
 * お知らせ詳細ページ
 */
export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = params;

  // お知らせ詳細を取得
  const { news, error } = await getNewsById(id);

  // お知らせが見つからない場合は404
  if (!news || error) {
    return notFound();
  }

  // 公開期間の表示文字列を生成
  const publishPeriod = () => {
    const startDate = news.published_at
      ? format(new Date(news.published_at), 'PPP', { locale: ja })
      : '未設定';

    const endDate = news.publish_end_date
      ? format(new Date(news.publish_end_date), 'PPP', { locale: ja })
      : '無期限';

    return `${startDate} 〜 ${endDate}`;
  };

  return (
    <>
      <PageHeader
        title={news.title}
        description={news.summary || ''}
        backLink={{
          href: '/website/news',
          label: 'お知らせ一覧',
        }}
        actions={
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href={`/website/news/${id}/edit`}>
                <Edit className="h-4 w-4 mr-1" />
                編集
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">その他のアクション</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {news.status !== 'published' ? (
                  <PublishNewsButton newsId={id} />
                ) : (
                  <UnpublishNewsButton newsId={id} />
                )}
                <DeleteNewsButton newsId={id} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      />

      <Container>
        <div className="space-y-6">
          {/* ステータスバッジ表示 */}
          <div className="flex items-center gap-2">
            <StatusBadge status={news.status} />
            {news.is_featured && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                注目記事
              </Badge>
            )}
          </div>

          {/* メタ情報 */}
          <Card>
            <CardHeader>
              <CardTitle>お知らせ情報</CardTitle>
              <CardDescription>
                公開情報や作成日時などの管理情報
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    公開期間
                  </div>
                  <div className="text-sm">{publishPeriod()}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    カテゴリ
                  </div>
                  <div className="text-sm">
                    {news.category?.name || 'カテゴリなし'}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    作成日時
                  </div>
                  <div className="text-sm">
                    {format(new Date(news.created_at), 'PPP p', { locale: ja })}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    最終更新
                  </div>
                  <div className="text-sm">
                    {format(new Date(news.updated_at), 'PPP p', { locale: ja })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* コンテンツ表示 */}
          <Card>
            <CardHeader>
              <CardTitle>コンテンツ</CardTitle>
              <CardDescription>お知らせの本文</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="prose max-w-none pt-6">
              <RichTextViewer content={news.content} />
            </CardContent>
          </Card>

          {/* 添付ファイル */}
          {news.attachments && news.attachments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>添付ファイル</CardTitle>
                <CardDescription>
                  このお知らせに添付されているファイル
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {news.attachments.map((attachment) => (
                    <li key={attachment.id} className="flex items-center gap-2">
                      <Link
                        href={`/api/news/attachments/${attachment.id}`}
                        target="_blank"
                        className="text-primary hover:underline flex items-center"
                      >
                        <File className="h-4 w-4 mr-2" />
                        {attachment.file_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
    </>
  );
}
