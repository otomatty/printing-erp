+'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import type { InquiryStats as StatsType } from '../_data';

interface InquiryStatsProps {
  stats: StatsType;
}

export function InquiryStats({ stats }: InquiryStatsProps) {
  const statCards = [
    {
      title: '総問い合わせ数',
      value: stats.total,
      description: '全期間',
    },
    {
      title: '対応中',
      value: stats.by_status.in_progress,
      description: '現在進行中の案件',
    },
    {
      title: '新規（今月）',
      value: stats.by_status.new,
      description: '今月の新規問い合わせ',
    },
    {
      title: '平均対応時間',
      value: `${stats.avg_response_time}時間`,
      description: '初回返信までの平均時間',
    },
  ];

  return (
    <>
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
