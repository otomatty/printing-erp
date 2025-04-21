import Link from 'next/link';
import { ArrowLeft, Calendar, Pencil, Printer } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@kit/ui/button';
import { Badge } from '@kit/ui/badge';
import { Card } from '@kit/ui/card';
import type { ProductionJob } from '../../_data';
import { getStatusDetails } from '../../_data';

type ProductionDetailsHeaderProps = {
  job: ProductionJob;
};

export function ProductionDetailsHeader({ job }: ProductionDetailsHeaderProps) {
  const statusInfo = getStatusDetails(job.status);

  // statusIconの生成
  let StatusIcon: LucideIcon;
  switch (statusInfo.iconName) {
    case 'Calendar':
      StatusIcon = Calendar;
      break;
    case 'Clock':
      StatusIcon = Printer;
      break;
    default:
      StatusIcon = Printer;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Link href="/production">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold flex-1">{job.title}</h1>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Pencil className="h-4 w-4" />
          編集
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-semibold">{job.id}</h2>
              <Badge className={statusInfo.color}>
                <span className="flex items-center">
                  <StatusIcon className="h-4 w-4 mr-1" />
                  {statusInfo.label}
                </span>
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">
              <span className="font-medium">関連注文：</span>
              <Link
                href={`/orders/${job.orderId}`}
                className="text-primary hover:underline"
              >
                {job.orderId}
              </Link>
            </p>
            <p className="text-sm text-muted-foreground mb-1">
              <span className="font-medium">顧客：</span>
              <Link
                href={`/customers/${job.customerName}`}
                className="text-primary hover:underline"
              >
                {job.customerName}
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">担当者：</span>
              {job.assignedTo}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="min-w-[120px]">
              <p className="text-xs text-muted-foreground">開始日</p>
              <p className="font-medium">{job.startDate}</p>
            </div>
            <div className="min-w-[120px]">
              <p className="text-xs text-muted-foreground">納期</p>
              <p className="font-medium">{job.dueDate}</p>
            </div>
            <div className="min-w-[120px]">
              <p className="text-xs text-muted-foreground">進捗</p>
              <div className="flex items-center gap-2">
                <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      job.status === 'delayed'
                        ? 'bg-red-500'
                        : job.status === 'completed'
                          ? 'bg-gray-500'
                          : 'bg-green-500'
                    }`}
                    style={{ width: `${job.progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{job.progress}%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
