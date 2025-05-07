'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@kit/ui/button';
import { ResponsiveDialog } from '@kit/ui/responsive-dialog';

interface AddSampleDialogProps {
  pageId: string;
}

export default function AddSampleDialog({ pageId }: AddSampleDialogProps) {
  return (
    <ResponsiveDialog
      trigger={
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-1" />
          サンプルを追加
        </Button>
      }
      title="サンプルを追加"
      description="新しいサンプル項目を追加します。"
    >
      <div className="p-4 text-center text-muted-foreground">
        追加フォームは未実装です。
      </div>
    </ResponsiveDialog>
  );
}
