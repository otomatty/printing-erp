export type WeeklyGaugeData = {
  current: number; // 今週の売上実績
  target: number; // 今週の売上目標
};
export const weeklyGaugeData: WeeklyGaugeData = {
  current: 5200,
  target: 8000,
};

export type WeeklyDonutData = {
  week: string; // 4週間の相対ラベル
  ratio: number; // 達成率 (%)
};
export const weeklyDonutData: WeeklyDonutData[] = [
  { week: '4週前', ratio: 75 },
  { week: '3週前', ratio: 82 },
  { week: '2週前', ratio: 68 },
  { week: '先週', ratio: 90 },
];

export type WeekdayDistributionData = {
  day: string; // 曜日
  sales: number; // 曜日別売上
};
export const weekdayDistributionData: WeekdayDistributionData[] = [
  { day: '月', sales: 1200 },
  { day: '火', sales: 950 },
  { day: '水', sales: 1100 },
  { day: '木', sales: 1300 },
  { day: '金', sales: 1700 },
  { day: '土', sales: 800 },
  { day: '日', sales: 600 },
];

export type MonthlyCsatDistribution = {
  category: string; // CSATカテゴリ
  value: number; // 件数または割合(%)
};
export const monthlyCsatDistribution: MonthlyCsatDistribution[] = [
  { category: '満足', value: 60 },
  { category: 'やや満足', value: 30 },
  { category: '不満足', value: 10 },
];

export type MonthlyRepeatProgress = {
  value: number; // 実績(%)
  target: number; // 目標(%)
};
export const monthlyRepeatProgress: MonthlyRepeatProgress = {
  value: 75,
  target: 80,
};

export type MonthlyNewCustomersGauge = {
  value: number; // 新規顧客獲得数
  target: number; // 目標件数
};
export const monthlyNewCustomersGauge: MonthlyNewCustomersGauge = {
  value: 15,
  target: 20,
};
