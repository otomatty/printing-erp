'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@kit/ui/button';
import { ResponsiveDialog } from '@kit/ui/responsive-dialog';
import FaqForm from './faq-form';

interface AddFaqDialogProps {
  pageId: string;
}

export default function AddFaqDialog({ pageId }: AddFaqDialogProps) {
  return (
    <ResponsiveDialog
      trigger={
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-1" />
          よくある質問を追加する
        </Button>
      }
      title="よくある質問を追加する"
      description="よくある質問を追加します"
    >
      {({ close }) => <FaqForm pageId={pageId} onSuccess={close} />}
    </ResponsiveDialog>
  );
}
