import Link from 'next/link';
import { Edit, MoreVertical, Trash } from 'lucide-react';
import { Button } from '@kit/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@kit/ui/dropdown-menu';
import { ResponsiveDialog } from '@kit/ui/responsive-dialog';
import PageForm from './page-form';
import { PageDeleteDialog } from './page-delete-dialog';
import { getPages } from '~/actions/faq';
import type { Page as PageType } from '~/types/faq';
import { Card, CardHeader, CardContent } from '@kit/ui/card';

export default async function PageList() {
  const { pages, error } = await getPages();
  if (error) {
    return <div className="text-destructive mt-4">エラー: {error}</div>;
  }
  if (pages.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        ページが見つかりませんでした。
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {pages.map((page: PageType) => (
        <Card key={page.id} className="overflow-hidden">
          <CardHeader className="p-4 flex flex-row justify-between items-start">
            <div className="space-y-1.5">
              <Link href={`/website/faq/${page.id}`}>
                <h3 className="text-lg font-semibold">
                  {page.title || page.slug}
                </h3>
                <p className="text-sm text-muted-foreground">{page.slug}</p>
              </Link>
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
                  <ResponsiveDialog
                    trigger={
                      <button
                        className="flex w-full items-center"
                        type="button"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        編集
                      </button>
                    }
                    title="FAQページ編集"
                    description={`${page.title || page.slug}を編集します`}
                  >
                    <PageForm
                      pageId={page.id}
                      defaultValues={{
                        slug: page.slug,
                        title: page.title ?? '',
                        description: page.description ?? '',
                      }}
                    />
                  </ResponsiveDialog>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <PageDeleteDialog pageId={page.id}>
                    <button
                      className="flex w-full items-center text-destructive"
                      type="button"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      削除
                    </button>
                  </PageDeleteDialog>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          {page.description && (
            <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
              {page.description}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
