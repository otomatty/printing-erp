import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@kit/ui/button';

export function NewJobHeader() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Link href="/production">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">新規製造案件登録</h1>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">下書き保存</Button>
        <Button type="submit" form="new-job-form">
          登録する
        </Button>
      </div>
    </div>
  );
}
