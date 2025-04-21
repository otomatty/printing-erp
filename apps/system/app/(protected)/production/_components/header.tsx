import Link from 'next/link';
import { Calendar, Plus, Settings } from 'lucide-react';
import { Button } from '@kit/ui/button';

export function Header() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold">製造管理</h1>
      <div className="flex gap-2">
        <Link href="/production/schedule">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            スケジュール
          </Button>
        </Link>
        <Link href="/production/equipment">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            設備管理
          </Button>
        </Link>
        <Link href="/production/new">
          <Button variant="default" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            新規製造案件
          </Button>
        </Link>
      </div>
    </div>
  );
}
