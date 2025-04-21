import Link from 'next/link';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';
import { Button } from '@kit/ui/button';
import { Badge } from '@kit/ui/badge';
import { Checkbox } from '@kit/ui/checkbox';
import type { ProductionJob } from '../../_data';
import { getProcessDetails } from '../../_data';

type DelayedJobsTableProps = {
  jobs: ProductionJob[];
  selectedJobs: string[];
  onToggleSelection: (jobId: string) => void;
};

export function DelayedJobsTable({
  jobs,
  selectedJobs,
  onToggleSelection,
}: DelayedJobsTableProps) {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="rounded-full bg-yellow-100 p-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-yellow-600" />
        </div>
        <h3 className="text-lg font-medium mb-1">遅延案件はありません</h3>
        <p className="text-sm text-muted-foreground">
          現在、遅延している製造案件はありません。
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">選択</TableHead>
          <TableHead>案件ID</TableHead>
          <TableHead>案件名</TableHead>
          <TableHead>顧客名</TableHead>
          <TableHead>納期</TableHead>
          <TableHead>現在工程</TableHead>
          <TableHead>担当者</TableHead>
          <TableHead>進捗</TableHead>
          <TableHead>アクション</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => {
          const process = getProcessDetails(job.currentProcess);
          const isSelected = selectedJobs.includes(job.id);

          return (
            <TableRow
              key={job.id}
              className={isSelected ? 'bg-muted/50' : undefined}
            >
              <TableCell>
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => onToggleSelection(job.id)}
                />
              </TableCell>
              <TableCell>{job.id}</TableCell>
              <TableCell>
                <Link
                  href={`/production/${job.id}`}
                  className="text-blue-500 hover:underline font-medium"
                >
                  {job.title}
                </Link>
              </TableCell>
              <TableCell>{job.customerName}</TableCell>
              <TableCell className="text-red-600 font-medium">
                {job.dueDate}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={process.color}>
                  {process.label}
                </Badge>
              </TableCell>
              <TableCell>{job.assignedTo}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                  <span className="text-sm">{job.progress}%</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/production/${job.id}`}>詳細</Link>
                  </Button>
                  <Button
                    size="sm"
                    variant={isSelected ? 'default' : 'outline'}
                    className="gap-1"
                    onClick={() => onToggleSelection(job.id)}
                  >
                    {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                    {isSelected ? '選択済' : '選択'}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
