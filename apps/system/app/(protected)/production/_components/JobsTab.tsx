import Link from 'next/link';
import {
  ArrowUpDown,
  Filter,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Input } from '@kit/ui/input';
import { Button } from '@kit/ui/button';
import { Badge } from '@kit/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';
import type { ProductionJob } from '../_data';
import {
  getProcessDetails,
  getPriorityDetails,
  getStatusDetails,
} from '../_data';

type JobsTabProps = {
  productionJobs: ProductionJob[];
};

export function JobsTab({ productionJobs }: JobsTabProps) {
  return (
    <div>
      {/* 検索・フィルターツールバー */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Input
            type="text"
            placeholder="案件名、注文ID、顧客名で検索..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            フィルタ
          </Button>

          <select className="h-9 rounded-md border border-input px-3 py-1 text-sm">
            <option value="all">全てのステータス</option>
            <option value="scheduled">予定</option>
            <option value="in_progress">進行中</option>
            <option value="delayed">遅延</option>
            <option value="completed">完了</option>
          </select>

          <select className="h-9 rounded-md border border-input px-3 py-1 text-sm">
            <option value="due_date_asc">納期（近い順）</option>
            <option value="due_date_desc">納期（遠い順）</option>
            <option value="priority_desc">優先度（高い順）</option>
            <option value="progress_asc">進捗（少ない順）</option>
            <option value="progress_desc">進捗（多い順）</option>
          </select>
        </div>
      </div>

      {/* 製造案件テーブル */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">案件ID</TableHead>
            <TableHead className="w-[120px]">注文ID</TableHead>
            <TableHead>
              <div className="flex items-center">
                タイトル
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>顧客</TableHead>
            <TableHead>ステータス</TableHead>
            <TableHead>現在工程</TableHead>
            <TableHead>
              <div className="flex items-center justify-center">
                進捗
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                納期
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>担当者</TableHead>
            <TableHead>優先度</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productionJobs.map((job) => {
            const statusInfo = getStatusDetails(job.status);
            const processDetails = getProcessDetails(job.currentProcess);
            const priorityDetails = getPriorityDetails(job.priority);
            const isOverdue =
              new Date(job.dueDate) < new Date() && job.status !== 'completed';

            // statusIconの生成
            let StatusIcon: LucideIcon;
            switch (statusInfo.iconName) {
              case 'Calendar':
                StatusIcon = Calendar;
                break;
              case 'Clock':
                StatusIcon = Clock;
                break;
              case 'CheckCircle':
                StatusIcon = CheckCircle;
                break;
              case 'AlertTriangle':
                StatusIcon = AlertTriangle;
                break;
              default:
                StatusIcon = HelpCircle;
            }

            return (
              <TableRow key={job.id}>
                <TableCell className="font-medium">
                  <Link href={`/system/production/${job.id}`}>
                    <span className="text-primary hover:underline">
                      {job.id}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/system/orders/${job.orderId}`}>
                    <span className="text-primary hover:underline">
                      {job.orderId}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.customerName}</TableCell>
                <TableCell>
                  <Badge className={statusInfo.color}>
                    <span className="flex items-center">
                      <StatusIcon className="h-4 w-4 mr-1" />
                      {statusInfo.label}
                    </span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={processDetails.color}>
                    {processDetails.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
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
                  <p className="text-xs text-center mt-1">{job.progress}%</p>
                </TableCell>
                <TableCell
                  className={isOverdue ? 'text-red-600 font-medium' : ''}
                >
                  {job.dueDate}
                  {isOverdue && (
                    <div className="text-xs flex items-center text-red-600 mt-1">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      期限超過
                    </div>
                  )}
                </TableCell>
                <TableCell>{job.assignedTo}</TableCell>
                <TableCell>
                  <Badge className={priorityDetails.color}>
                    {priorityDetails.label}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
