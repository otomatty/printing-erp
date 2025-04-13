import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@kit/ui/button';

type ScheduleHeaderProps = {
  currentDate: Date;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
};

export function ScheduleHeader({
  currentDate,
  onPrevDay,
  onNextDay,
  onToday,
}: ScheduleHeaderProps) {
  // 日付のフォーマット
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }).format(date);
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div className="flex items-center gap-2">
        <Link href="/system/production">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">製造スケジュール</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={onPrevDay}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          className="font-medium px-4"
          onClick={onToday}
        >
          本日
        </Button>

        <div className="text-lg font-medium min-w-[200px] text-center">
          {formatDate(currentDate)}
        </div>

        <Button variant="outline" size="icon" onClick={onNextDay}>
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button variant="outline" className="ml-2">
          <Calendar className="h-4 w-4 mr-2" />
          月表示
        </Button>

        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          エクスポート
        </Button>
      </div>
    </div>
  );
}
