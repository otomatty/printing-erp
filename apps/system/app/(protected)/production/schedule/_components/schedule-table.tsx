import { Card } from '@kit/ui/card';
import { Badge } from '@kit/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kit/ui/tooltip';
import type { ProductionJob, Equipment } from '../../_data';
import Link from 'next/link';

type ScheduleTableProps = {
  date: Date;
  productionJobs: ProductionJob[];
  equipments: Equipment[];
};

type TimeSlot = {
  time: string;
  label: string;
};

// 時間帯の設定
const TIME_SLOTS: TimeSlot[] = [
  { time: '08:00', label: '8:00' },
  { time: '09:00', label: '9:00' },
  { time: '10:00', label: '10:00' },
  { time: '11:00', label: '11:00' },
  { time: '12:00', label: '12:00' },
  { time: '13:00', label: '13:00' },
  { time: '14:00', label: '14:00' },
  { time: '15:00', label: '15:00' },
  { time: '16:00', label: '16:00' },
  { time: '17:00', label: '17:00' },
];

// 工程の設定
const PROCESSES = [
  { id: 'prepress', label: '製版' },
  { id: 'printing', label: '印刷' },
  { id: 'cutting', label: '断裁' },
  { id: 'binding', label: '製本' },
  { id: 'finishing', label: '仕上げ' },
  { id: 'shipping', label: '出荷' },
];

export function ScheduleTable({
  date,
  productionJobs,
  equipments,
}: ScheduleTableProps) {
  // 各工程で作業中の案件を取得するモック関数
  const getJobsForProcess = (processId: string, timeSlot: string) => {
    // 実際の実装では、日付と時間帯に基づいて案件を絞り込む
    return productionJobs
      .filter(
        (job) =>
          job.currentProcess === processId && job.status === 'in_progress'
      )
      .slice(0, Math.floor(Math.random() * 3)); // モック用にランダムに0-2件表示
  };

  // 工程別の設備稼働状況を取得するモック関数
  const getEquipmentsForProcess = (processId: string) => {
    // 実際の実装では、工程IDに基づいて設備を絞り込む
    return equipments.filter((eq) => eq.type.includes(processId));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 w-20">時間</th>
            {PROCESSES.map((process) => (
              <th key={process.id} className="border p-2 min-w-[200px]">
                <div className="flex items-center justify-between">
                  <span>{process.label}</span>
                  <div className="text-xs text-muted-foreground">
                    {getEquipmentsForProcess(process.id).length}台
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIME_SLOTS.map((slot, index) => (
            <tr key={slot.time} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="border p-2 text-center font-medium">
                {slot.label}
              </td>

              {PROCESSES.map((process) => {
                const jobsInSlot = getJobsForProcess(process.id, slot.time);

                return (
                  <td
                    key={`${process.id}-${slot.time}`}
                    className="border p-1 relative"
                  >
                    <div className="min-h-[40px]">
                      {jobsInSlot.length > 0 ? (
                        <div className="space-y-1">
                          {jobsInSlot.map((job) => (
                            <TooltipProvider key={job.id}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link
                                    href={`/production/${job.id}`}
                                    className={`
                                      block p-1 rounded text-xs
                                      ${
                                        job.status === 'delayed'
                                          ? 'bg-red-100 text-red-800 border border-red-200'
                                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                                      }
                                    `}
                                  >
                                    <div className="flex justify-between">
                                      <span className="truncate max-w-[120px]">
                                        {job.title}
                                      </span>
                                      <Badge className="ml-1 text-[0.65rem] px-1 py-0">
                                        {job.progress}%
                                      </Badge>
                                    </div>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="p-1">
                                    <p className="font-bold">{job.title}</p>
                                    <p className="text-xs">
                                      顧客: {job.customerName}
                                    </p>
                                    <p className="text-xs">
                                      納期: {job.dueDate}
                                    </p>
                                    <p className="text-xs">
                                      担当: {job.assignedTo}
                                    </p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </div>
                      ) : (
                        <div className="h-full w-full" />
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
