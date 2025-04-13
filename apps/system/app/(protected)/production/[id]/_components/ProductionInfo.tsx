import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Badge } from '@kit/ui/badge';
import type { ProductionJob } from '../../_data';
import { getProcessDetails, getPriorityDetails } from '../../_data';

type ProductionInfoProps = {
  job: ProductionJob;
};

export function ProductionInfo({ job }: ProductionInfoProps) {
  // ステータスの表示形式を設定
  const statusMap = {
    scheduled: { label: '予定', color: 'bg-blue-100 text-blue-800' },
    in_progress: { label: '進行中', color: 'bg-green-100 text-green-800' },
    delayed: { label: '遅延', color: 'bg-red-100 text-red-800' },
    completed: { label: '完了', color: 'bg-gray-100 text-gray-800' },
  };

  // 進行状況のプロセス名を取得
  const process = getProcessDetails(job.currentProcess);

  // 優先度の詳細を取得
  const priority = getPriorityDetails(job.priority);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">案件情報</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 案件タイトルと状態 */}
        <div>
          <h3 className="text-lg font-bold">{job.title}</h3>
          <div className="flex gap-2 mt-2">
            <Badge
              variant="outline"
              className={`${statusMap[job.status]?.color || 'bg-gray-100'}`}
            >
              {statusMap[job.status]?.label || '不明'}
            </Badge>
            <Badge variant="outline" className={`${priority.color}`}>
              {priority.label}
            </Badge>
          </div>
        </div>

        {/* 詳細情報 */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="text-muted-foreground">案件ID:</div>
          <div>{job.id}</div>

          <div className="text-muted-foreground">受注ID:</div>
          <div>{job.orderId}</div>

          <div className="text-muted-foreground">顧客名:</div>
          <div>{job.customerName}</div>

          <div className="text-muted-foreground">開始日:</div>
          <div>{job.startDate}</div>

          <div className="text-muted-foreground">納期:</div>
          <div className="font-medium">{job.dueDate}</div>

          <div className="text-muted-foreground">担当者:</div>
          <div>{job.assignedTo}</div>

          <div className="text-muted-foreground">現在の工程:</div>
          <div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {process.label}
            </Badge>
          </div>

          <div className="text-muted-foreground">進捗率:</div>
          <div>{job.progress}%</div>
        </div>

        {/* 進捗バー */}
        <div className="mt-2">
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                job.status === 'delayed'
                  ? 'bg-red-500'
                  : job.status === 'completed'
                    ? 'bg-gray-500'
                    : 'bg-blue-500'
              }`}
              style={{ width: `${job.progress}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
