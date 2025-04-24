'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Eye } from 'lucide-react';
import { DropdownMenuItem } from '@kit/ui/dropdown-menu';

import { publishNews } from '~/_actions/news';

interface PublishNewsButtonProps {
  newsId: string;
}

export default function PublishNewsButton({ newsId }: PublishNewsButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handlePublish = () => {
    startTransition(async () => {
      try {
        const result = await publishNews(newsId);

        if (result.success) {
          toast.success('お知らせを公開しました');
          router.refresh();
        } else {
          toast.error(`公開エラー: ${result.error}`);
        }
      } catch (error) {
        toast.error('お知らせの公開中にエラーが発生しました');
        console.error('Publish news error:', error);
      }
    });
  };

  return (
    <DropdownMenuItem
      onSelect={(e) => {
        e.preventDefault();
        handlePublish();
      }}
      disabled={isPending}
    >
      <Eye className="h-4 w-4 mr-2" />
      {isPending ? '処理中...' : '公開する'}
    </DropdownMenuItem>
  );
}
