import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@kit/ui/button';
import type { ProductionJob } from '../_data';

type DelayedJobsAlertProps = {
  delayedJobs: ProductionJob[];
};

export function DelayedJobsAlert({ delayedJobs }: DelayedJobsAlertProps) {
  if (delayedJobs.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
      <AlertTriangle className="text-red-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
      <div>
        <h3 className="font-medium text-red-800">
          {delayedJobs.length}件の遅延案件があります
        </h3>
        <p className="text-red-700 text-sm mt-1">
          納期が過ぎている、または進捗が予定より遅れています。早急に対応が必要です。
        </p>
        <div className="flex gap-2 mt-2">
          <Link href="/production/delayed">
            <Button
              variant="outline"
              size="sm"
              className="h-7 bg-white text-red-600 border-red-300 hover:bg-red-50"
            >
              遅延案件を確認
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
