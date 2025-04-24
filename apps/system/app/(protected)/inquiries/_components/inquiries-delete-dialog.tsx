'use client';

import { useState, useTransition, type ReactNode } from 'react';
import { useSetAtom } from 'jotai';
import { inquiriesAtom } from '~/store/inquiries';
import { deleteInquiry } from '~/_actions/inquiries';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@kit/ui/alert-dialog';

interface InquiriesDeleteDialogProps {
  inquiryId: string;
  children: ReactNode;
}

export function InquiriesDeleteDialog({
  inquiryId,
  children,
}: InquiriesDeleteDialogProps) {
  const setInquiries = useSetAtom(inquiriesAtom);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteInquiry(inquiryId);
        setInquiries((prev) => prev.filter((inq) => inq.id !== inquiryId));
        toast.success('お問い合わせを削除しました');
      } catch (error) {
        console.error('InquiriesDeleteDialog delete error:', error);
        toast.error('お問い合わせの削除中にエラーが発生しました');
      } finally {
        setOpen(false);
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>お問い合わせを削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            この操作は取り消せません。完全に削除されます。
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
