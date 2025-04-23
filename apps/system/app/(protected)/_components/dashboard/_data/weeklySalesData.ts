export type WeeklySalesData = {
  week: string;
  sales: number;
};

// 52週分のモックデータを動的に生成
export const weeklySalesData: WeeklySalesData[] = Array.from(
  { length: 52 },
  (_, i) => ({
    week: `${i + 1}週`,
    sales: Math.floor(3000 + Math.random() * 5000), // 3000〜8000のランダム値
  })
);
