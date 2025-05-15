'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Button } from '@kit/ui/button';
import { ResponsiveDialog } from '@kit/ui/responsive-dialog';
import { EstimateForm } from './estimate-form';

// 見積り新規作成用ダイアログコンポーネント
export function EstimateDialog() {
  const router = useRouter();

  const handleSuccess = () => {
    router.refresh();
  };

  return (
    <ResponsiveDialog
      trigger={
        <Button>
          <Plus className="mr-1" size={16} />
          新規見積り作成
        </Button>
      }
      title="見積りを追加"
      description="新しい見積りを登録します"
    >
      {({ close }) => (
        <EstimateForm
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
