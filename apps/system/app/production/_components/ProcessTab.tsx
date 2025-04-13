import { Box, Layers, Printer, Calendar } from 'lucide-react';
import { Card } from '@kit/ui/card';
import { Button } from '@kit/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';
import type { ProductionJob, ProcessSchedule } from '../_data';

type ProcessTabProps = {
  productionJobs: ProductionJob[];
  processSchedule: ProcessSchedule[];
};

export function ProcessTab({
  productionJobs,
  processSchedule,
}: ProcessTabProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Box className="mr-2 h-4 w-4 text-indigo-500" />
            製版
          </h3>
          <p className="text-3xl font-bold">
            {
              productionJobs.filter(
                (job) =>
                  job.currentProcess === 'prepress' &&
                  job.status !== 'completed'
              ).length
            }
          </p>
          <p className="text-xs text-gray-500 mt-1">案件数</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Printer className="mr-2 h-4 w-4 text-blue-500" />
            印刷
          </h3>
          <p className="text-3xl font-bold">
            {
              productionJobs.filter(
                (job) =>
                  job.currentProcess === 'printing' &&
                  job.status !== 'completed'
              ).length
            }
          </p>
          <p className="text-xs text-gray-500 mt-1">案件数</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Layers className="mr-2 h-4 w-4 text-yellow-500" />
            断裁
          </h3>
          <p className="text-3xl font-bold">
            {
              productionJobs.filter(
                (job) =>
                  job.currentProcess === 'cutting' && job.status !== 'completed'
              ).length
            }
          </p>
          <p className="text-xs text-gray-500 mt-1">案件数</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Layers className="mr-2 h-4 w-4 text-orange-500" />
            製本
          </h3>
          <p className="text-3xl font-bold">
            {
              productionJobs.filter(
                (job) =>
                  job.currentProcess === 'binding' && job.status !== 'completed'
              ).length
            }
          </p>
          <p className="text-xs text-gray-500 mt-1">案件数</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Box className="mr-2 h-4 w-4 text-green-500" />
            仕上げ
          </h3>
          <p className="text-3xl font-bold">
            {
              productionJobs.filter(
                (job) =>
                  job.currentProcess === 'finishing' &&
                  job.status !== 'completed'
              ).length
            }
          </p>
          <p className="text-xs text-gray-500 mt-1">案件数</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Box className="mr-2 h-4 w-4 text-purple-500" />
            出荷
          </h3>
          <p className="text-3xl font-bold">
            {
              productionJobs.filter(
                (job) =>
                  job.currentProcess === 'shipping' &&
                  job.status !== 'completed'
              ).length
            }
          </p>
          <p className="text-xs text-gray-500 mt-1">案件数</p>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-medium mb-4">今日の工程スケジュール</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">時間</TableHead>
              <TableHead>製版</TableHead>
              <TableHead>印刷</TableHead>
              <TableHead>断裁</TableHead>
              <TableHead>製本</TableHead>
              <TableHead>仕上げ</TableHead>
              <TableHead>出荷</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processSchedule.map((schedule) => {
              const scheduleId = `schedule-${schedule.time}`;
              return (
                <TableRow key={scheduleId}>
                  <TableCell className="font-medium">{schedule.time}</TableCell>
                  <TableCell
                    className={
                      schedule.prepress.length > 0 ? 'bg-indigo-50' : ''
                    }
                  >
                    {schedule.prepress.join(', ')}
                  </TableCell>
                  <TableCell
                    className={schedule.printing.length > 0 ? 'bg-blue-50' : ''}
                  >
                    {schedule.time === '13:00-14:00' ||
                    schedule.time === '14:00-15:00' ? (
                      <span className="line-through text-blue-400">
                        {schedule.printing.join(', ')}
                      </span>
                    ) : (
                      schedule.printing.join(', ')
                    )}
                  </TableCell>
                  <TableCell
                    className={
                      schedule.cutting.length > 0 ? 'bg-yellow-50' : ''
                    }
                  >
                    {schedule.cutting.join(', ')}
                  </TableCell>
                  <TableCell
                    className={
                      schedule.binding.length > 0 ? 'bg-orange-50' : ''
                    }
                  >
                    {schedule.binding.join(', ')}
                  </TableCell>
                  <TableCell
                    className={
                      schedule.finishing.length > 0 ? 'bg-green-50' : ''
                    }
                  >
                    {schedule.finishing.join(', ')}
                  </TableCell>
                  <TableCell
                    className={
                      schedule.shipping.length > 0 ? 'bg-purple-50' : ''
                    }
                  >
                    {schedule.shipping.join(', ')}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            スケジュール詳細を表示
          </Button>
        </div>
      </Card>
    </div>
  );
}
