import { ArrowLeft, Filter, Download, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@kit/ui/button';
import { Badge } from '@kit/ui/badge';

type DelayedJobsHeaderProps = {
  count: number;
  selectedCount: number;
  onUrgentAction: () => void;
};

export function DelayedJobsHeader({
  count,
  selectedCount,
  onUrgentAction,
}: DelayedJobsHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Link href="/system/production">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">遅延案件一覧</h1>
        <Badge className="ml-2 bg-red-100 text-red-800">{count} 件</Badge>
      </div>
      <div className="flex gap-2">
        {selectedCount > 0 && (
          <Button variant="destructive" size="sm" onClick={onUrgentAction}>
            <AlertCircle className="h-4 w-4 mr-2" />
            緊急対応 ({selectedCount})
          </Button>
        )}
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          フィルター
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          エクスポート
        </Button>
      </div>
    </div>
  );
}
