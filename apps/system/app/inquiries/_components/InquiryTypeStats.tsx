import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import type { InquiryStats } from '../_data';
import { getTypeDetails } from '../_data';
import { Progress } from '@kit/ui/progress';

type InquiryTypeStatsProps = {
  stats: InquiryStats;
};

export function InquiryTypeStats({ stats }: InquiryTypeStatsProps) {
  // 種類ごとの件数を取得し、降順でソート
  const typeEntries = Object.entries(stats.by_type)
    .map(([typeId, count]) => ({
      typeId,
      count,
      details: getTypeDetails(typeId),
    }))
    .sort((a, b) => b.count - a.count);

  // 総件数に対する割合を計算
  const calculatePercentage = (count: number) => {
    return stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">問い合わせ種類</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {typeEntries.map(({ typeId, count, details }) => {
            const percentage = calculatePercentage(count);
            return (
              <div key={typeId} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="font-medium">{details.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">
                      {count}件
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({percentage}%)
                    </span>
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
