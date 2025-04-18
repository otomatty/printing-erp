import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import type { InquiryStats as StatsType } from '../_data';
import {
  Briefcase,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
} from 'lucide-react';

type InquiryStatsProps = {
  stats: StatsType;
};

export function InquiryStats({ stats }: InquiryStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* 総問い合わせ件数 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">総問い合わせ</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">
            未対応: {stats.by_status.new}件
          </p>
        </CardContent>
      </Card>

      {/* 進行中の問い合わせ */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">対応中</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.by_status.in_progress}
          </div>
          <p className="text-xs text-muted-foreground">
            待機中: {stats.by_status.waiting}件
          </p>
        </CardContent>
      </Card>

      {/* 解決済み問い合わせ */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">解決済み</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.by_status.resolved + stats.by_status.closed}
          </div>
          <p className="text-xs text-muted-foreground">
            今月: {stats.by_status.resolved + stats.by_status.closed}件
          </p>
        </CardContent>
      </Card>

      {/* 期限切れ問い合わせ */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">遅延対応</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.overdue}</div>
          <p className="text-xs text-muted-foreground">
            平均応答時間: {stats.avg_response_time}時間
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
