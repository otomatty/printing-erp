'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@kit/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@kit/ui/alert-dialog';

import { deleteCategory } from '~/actions/news';

interface DeleteCategoryButtonProps {
  categoryId: string;
  categoryName: string;
}

/**
 * カテゴリ削除ボタンと確認ダイアログ
 */
export default function DeleteCategoryButton({
  categoryId,
  categoryName,
}: DeleteCategoryButtonProps) {
  const router = useRouter();
  const [isPending, setPending] = useState(false);

  const handleDelete = async () => {
    try {
      setPending(true);
      const result = await deleteCategory(categoryId);

      if (result.success) {
        toast.success('カテゴリを削除しました');
        router.refresh();
      } else {
        toast.error(`削除エラー: ${result.error}`);
      }
    } catch (error) {
      console.error('Delete category error:', error);
      toast.error('カテゴリの削除中にエラーが発生しました');
    } finally {
      setPending(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-destructive hover:text-destructive"
          title={`${categoryName}を削除`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>カテゴリを削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            「{categoryName}
            」を削除します。このカテゴリを使用しているお知らせは「カテゴリなし」になります。この操作は元に戻せません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>キャンセル</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? '削除中...' : '削除する'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
