'use client';

import { useRouter } from 'next/navigation';
import { Plus, Pencil } from 'lucide-react';
import { Button } from '@kit/ui/button';
import { ResponsiveDialog } from '@kit/ui/responsive-dialog';

import CategoryForm from './category-form';
import type { Category } from '~/types/news';

interface CategoryDialogProps {
  category?: Category;
}

/**
 * カテゴリ作成・編集ダイアログ
 */
export default function CategoryDialog({ category }: CategoryDialogProps) {
  const router = useRouter();
  const isEdit = !!category;

  const handleSuccess = () => {
    router.refresh();
  };

  return (
    <ResponsiveDialog
      trigger={
        isEdit ? (
          <Button size="icon" variant="ghost" title={`${category.name}を編集`}>
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            カテゴリを追加
          </Button>
        )
      }
      title={isEdit ? 'カテゴリを編集' : 'カテゴリを追加'}
      description={
        isEdit
          ? `「${category.name}」の情報を編集します`
          : 'お知らせ用の新しいカテゴリを作成します'
      }
    >
      {({ close }) => (
        <CategoryForm
          categoryId={isEdit ? category.id : undefined}
          defaultValues={
            isEdit
              ? {
                  name: category.name,
                  slug: category.slug,
                  description: category.description || '',
                  display_order: category.display_order || 0,
                }
              : undefined
          }
          onSuccess={() => {
            handleSuccess();
            close();
          }}
          onCancel={close}
        />
      )}
    </ResponsiveDialog>
  );
}
