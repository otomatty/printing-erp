export type MonthlyKpiData = {
  month: string;
  csat: number; // 顧客満足度 (%)
  repeatRate: number; // リピートオーダー率 (%)
  newCustomers: number; // 新規顧客獲得数
};

export const monthlyKpiData: MonthlyKpiData[] = [
  { month: '7月', csat: 78, repeatRate: 58, newCustomers: 14 },
  { month: '8月', csat: 80, repeatRate: 60, newCustomers: 17 },
  { month: '9月', csat: 84, repeatRate: 65, newCustomers: 20 },
  { month: '10月', csat: 82, repeatRate: 63, newCustomers: 18 },
  { month: '11月', csat: 86, repeatRate: 68, newCustomers: 22 },
  { month: '12月', csat: 88, repeatRate: 70, newCustomers: 24 },
  { month: '1月', csat: 82, repeatRate: 60, newCustomers: 18 },
  { month: '2月', csat: 78, repeatRate: 55, newCustomers: 12 },
  { month: '3月', csat: 85, repeatRate: 65, newCustomers: 20 },
  { month: '4月', csat: 80, repeatRate: 58, newCustomers: 15 },
  { month: '5月', csat: 88, repeatRate: 70, newCustomers: 22 },
  { month: '6月', csat: 90, repeatRate: 75, newCustomers: 25 },
];
