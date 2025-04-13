'use client';

import { Button } from '@kit/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@kit/ui/card';
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
import { publishNews, unpublishNews } from '~/actions/news';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';

type NewsStatus = 'draft' | 'published' | 'archived';

/**
 * お知らせカードのプロパティ
 */
export interface NewsCardProps {
  id: string;
  title: string;
  summary?: string | null;
  slug: string;
  status: NewsStatus;
  publishedAt?: string | null;
  updatedAt: string;
  categoryName?: string | null;
  thumbnailUrl?: string | null;
  isFeatured?: boolean;
}

/**
 * ステータスに応じたバッジを取得
 */
function getStatusBadge(status: NewsStatus) {
  switch (status) {
    case 'published':
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <Globe className="h-3 w-3 mr-1" />
          公開中
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
          <Archive className="h-3 w-3 mr-1" />
          アーカイブ
        </Badge>
      );
    default:
      return null;
  }
}

// 環境変数からホームページのURLを取得
const getWebsiteUrl = () => {
  return process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:2120';
};

export default function NewsCard({
  id,
  title,
  summary,
  slug,
  status,
  publishedAt,
  updatedAt,
  categoryName,
  thumbnailUrl,
  isFeatured,
}: NewsCardProps) {
  // 日付をフォーマット
  const formattedDate = publishedAt
    ? formatDistanceToNow(new Date(publishedAt), {
        addSuffix: true,
        locale: ja,
      })
    : null;

  // 更新日時
  const updatedDateText = formatDistanceToNow(new Date(updatedAt), {
    addSuffix: true,
    locale: ja,
  });

  // ステータス切り替えのアクションハンドラー
  async function handleStatusToggle() {
    if (status === 'published') {
      await unpublishNews(id);
    } else {
      await publishNews(id);
    }
  }

  // ホームページ上の記事URL
  const publicNewsUrl = `${getWebsiteUrl()}/news/${slug}`;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 flex flex-row justify-between items-start">
        <div className="space-y-1.5">
          <h3 className="text-lg font-semibold line-clamp-2">
            <Link href={`/website/news/${id}`} className="hover:underline">
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
            {isFeatured && (
              <Badge className="bg-amber-500 hover:bg-amber-600 text-xs">
                特集
              </Badge>
            )}
            <span className="text-xs">
              {formattedDate
                ? `公開: ${formattedDate}`
                : `更新: ${updatedDateText}`}
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
              <Link href={`/website/news/${id}`}>
                <Eye className="h-4 w-4 mr-2" />
                詳細を見る
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/website/news/${id}/edit`}>
                <Pencil className="h-4 w-4 mr-2" />
                編集する
              </Link>
            </DropdownMenuItem>
            {status === 'published' && (
              <DropdownMenuItem asChild>
                <a
                  href={publicNewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  ホームページで見る
                </a>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleStatusToggle}>
              {status === 'published' ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  非公開にする
                </>
              ) : (
                <>
                  <Globe className="h-4 w-4 mr-2" />
                  公開する
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash className="h-4 w-4 mr-2" />
              削除する
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {summary && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {summary}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link
          href={`/website/news/${id}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          詳細を見る &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
}
