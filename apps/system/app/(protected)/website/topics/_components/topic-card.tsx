'use client';

import { Button } from '@kit/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@kit/ui/card';
import { Badge } from '@kit/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import {
  Eye,
  Pencil,
  Trash,
  Globe,
  Archive,
  MoreVertical,
  ExternalLink,
  EyeOff,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@kit/ui/dropdown-menu';
import {
  publishTopic,
  unpublishTopic,
  deleteTopic,
} from '~/_actions/topics/index';

// トピックの公開状態
export type TopicStatus = 'draft' | 'published' | 'archived';

export interface TopicCardProps {
  id: string;
  title: string;
  excerpt?: string | null;
  slug: string;
  status: TopicStatus;
  publishedAt?: string | null;
  updatedAt: string;
  categoryName?: string | null;
  tags?: Array<{ id: string; name: string; slug: string }>;
}

// ステータスバッジ取得
function getStatusBadge(status: TopicStatus) {
  switch (status) {
    case 'published':
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <Globe className="h-3 w-3 mr-1" /> 公開中
        </Badge>
      );
    case 'draft':
      return (
        <Badge variant="outline" className="text-muted-foreground">
          下書き
        </Badge>
      );
    case 'archived':
      return (
        <Badge variant="secondary">
          <Archive className="h-3 w-3 mr-1" /> アーカイブ
        </Badge>
      );
    default:
      return null;
  }
}

// 環境変数からサイトURL取得
const getWebsiteUrl = () =>
  process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:2120';

export default function TopicCard({
  id,
  title,
  excerpt,
  slug,
  status,
  publishedAt,
  updatedAt,
  categoryName,
  tags,
}: TopicCardProps) {
  const formattedDate = publishedAt
    ? formatDistanceToNow(new Date(publishedAt), {
        addSuffix: true,
        locale: ja,
      })
    : null;
  const updatedDate = formatDistanceToNow(new Date(updatedAt), {
    addSuffix: true,
    locale: ja,
  });

  async function handleStatusToggle() {
    if (status === 'published') {
      await unpublishTopic(id);
    } else {
      await publishTopic(id);
    }
  }

  async function handleDelete() {
    await deleteTopic(id);
  }

  const publicUrl = `${getWebsiteUrl()}/topics/${slug}`;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 flex justify-between items-start">
        <div className="space-y-1.5">
          <h3 className="text-lg font-semibold line-clamp-2">
            <Link href={`/website/topics/${id}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
            {getStatusBadge(status)}
            {categoryName && (
              <Badge variant="outline" className="text-xs">
                {categoryName}
              </Badge>
            )}
            {tags?.map((tag) => (
              <Badge key={tag.id} variant="outline" className="text-xs">
                {tag.name}
              </Badge>
            ))}
            <span className="text-xs">
              {formattedDate
                ? `公開: ${formattedDate}`
                : `更新: ${updatedDate}`}
            </span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">メニューを開く</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/website/topics/${id}`}>
                {' '}
                <Eye className="h-4 w-4 mr-2" /> 詳細を見る
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/website/topics/${id}/edit`}>
                {' '}
                <Pencil className="h-4 w-4 mr-2" /> 編集する
              </Link>
            </DropdownMenuItem>
            {status === 'published' && (
              <DropdownMenuItem asChild>
                <a href={publicUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" /> ホームページで見る
                </a>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleStatusToggle}>
              {status === 'published' ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" /> 非公開にする
                </>
              ) : (
                <>
                  <Globe className="h-4 w-4 mr-2" /> 公開する
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4 mr-2" /> 削除する
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {excerpt}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link
          href={`/website/topics/${id}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          詳細を見る &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
}
