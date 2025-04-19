'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// TODO: APIから取得するデータ
const mockData = [
  { month: '1月', count: 65 },
  { month: '2月', count: 59 },
  { month: '3月', count: 80 },
  { month: '4月', count: 81 },
  { month: '5月', count: 56 },
  { month: '6月', count: 55 },
];

export function InquiryTrends() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>月別問い合わせ件数</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  name="問い合わせ件数"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* TODO: 他のトレンド分析グラフを追加 */}
    </div>
  );
}
