'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { EyeOff } from 'lucide-react';
import { DropdownMenuItem } from '@kit/ui/dropdown-menu';

import { unpublishNews } from '~/_actions/news';

interface UnpublishNewsButtonProps {
  newsId: string;
}

export default function UnpublishNewsButton({
  newsId,
}: UnpublishNewsButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleUnpublish = () => {
    startTransition(async () => {
      try {
        const result = await unpublishNews(newsId);

        if (result.success) {
          toast.success('お知らせを非公開にしました');
          router.refresh();
        } else {
          toast.error(`非公開エラー: ${result.error}`);
        }
      } catch (error) {
        toast.error('お知らせの非公開処理中にエラーが発生しました');
        console.error('Unpublish news error:', error);
      }
    });
  };

  return (
    <DropdownMenuItem
      onSelect={(e) => {
        e.preventDefault();
        handleUnpublish();
      }}
      disabled={isPending}
    >
      <EyeOff className="h-4 w-4 mr-2" />
      {isPending ? '処理中...' : '非公開にする'}
    </DropdownMenuItem>
  );
}
