'use client';

import { useRouter } from 'next/navigation';
import { PlusCircle } from 'lucide-react';
import { Button } from '@kit/ui/button';
import { ResponsiveDialog } from '@kit/ui/responsive-dialog';
import { InquiryForm } from './inquiry-form';

// お問い合わせ新規作成用ダイアログコンポーネント
export function InquiryDialog() {
  const router = useRouter();

  const handleSuccess = () => {
    router.refresh();
  };

  return (
    <ResponsiveDialog
      trigger={
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          新規作成
        </Button>
      }
      title="お問い合わせを追加"
      description="新しいお問い合わせを登録します"
    >
      {({ close }) => (
        <InquiryForm
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
