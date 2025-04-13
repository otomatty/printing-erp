import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { Button } from '@kit/ui/button';
import { Badge } from '@kit/ui/badge';
import type { ProductionJob } from '../../_data';

type ProcessTimelineProps = {
  job: ProductionJob;
};

// 工程のリスト
const PROCESSES = [
  { id: 'prepress', label: '製版', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'printing', label: '印刷', color: 'bg-blue-100 text-blue-800' },
  { id: 'cutting', label: '断裁', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'binding', label: '製本', color: 'bg-orange-100 text-orange-800' },
  { id: 'finishing', label: '仕上げ', color: 'bg-green-100 text-green-800' },
  { id: 'shipping', label: '出荷', color: 'bg-purple-100 text-purple-800' },
  { id: 'completed', label: '完了', color: 'bg-gray-100 text-gray-800' },
];

// 工程の状態を判定する関数
const getProcessStatus = (processId: string, currentProcess: string) => {
  const processIndex = PROCESSES.findIndex((p) => p.id === processId);
  const currentIndex = PROCESSES.findIndex((p) => p.id === currentProcess);

  if (currentProcess === 'completed') return 'completed';
  if (processIndex < currentIndex) return 'completed';
  if (processIndex === currentIndex) return 'in_progress';
  return 'pending';
};

export function ProcessTimeline({ job }: ProcessTimelineProps) {
  // 現在の工程インデックス
  const currentProcessIndex = PROCESSES.findIndex(
    (p) => p.id === job.currentProcess
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">工程管理</CardTitle>
          <CardDescription>製造の進捗状況と各工程の詳細</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* プログレスライン */}
            <div className="absolute top-5 left-5 h-full w-0.5 bg-gray-200" />

            {/* 工程リスト */}
            <div className="space-y-8 relative">
              {PROCESSES.filter((p) => p.id !== 'completed').map(
                (process, index) => {
                  const status = getProcessStatus(
                    process.id,
                    job.currentProcess
                  );

                  return (
                    <div key={process.id} className="relative pl-12">
                      {/* 進捗状態アイコン */}
                      <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-gray-200">
                        {status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : status === 'in_progress' ? (
                          <Clock className="w-5 h-5 text-blue-500" />
                        ) : (
                          <div className="w-3 h-3 bg-gray-300 rounded-full" />
                        )}
                      </div>

                      {/* 工程情報 */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{process.label}</h3>
                            <Badge className={process.color}>
                              {status === 'completed'
                                ? '完了'
                                : status === 'in_progress'
                                  ? '進行中'
                                  : '予定'}
                            </Badge>
                            {index === currentProcessIndex &&
                              job.status === 'delayed' && (
                                <Badge className="bg-red-100 text-red-800">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  遅延
                                </Badge>
                              )}
                          </div>
                          {status === 'completed' && (
                            <p className="text-sm text-muted-foreground mt-1">
                              完了日：2023/07/15
                            </p>
                          )}
                          {status === 'in_progress' && (
                            <p className="text-sm text-muted-foreground mt-1">
                              開始日：2023/07/12
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={status === 'pending'}
                          >
                            詳細
                          </Button>
                          {status === 'in_progress' && (
                            <Button size="sm">完了にする</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">工程メモ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">印刷工程メモ</p>
            <div className="bg-gray-50 p-3 rounded-md text-sm">
              <p>2023/07/12 - インク濃度を標準より10%上げて印刷</p>
              <p>2023/07/13 - 3色目の印刷時に用紙ジャム発生、解消済み</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">その他共有事項</p>
            <div className="bg-gray-50 p-3 rounded-md text-sm">
              <p>
                ・顧客からの追加指示：仕上がりの色味について細かく確認が必要
              </p>
              <p>・断裁時にサンプルを5部取り置きすること</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
