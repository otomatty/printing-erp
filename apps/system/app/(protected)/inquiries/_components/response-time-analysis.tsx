'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// TODO: APIから取得するデータ
const mockData = [
  {
    priority: '緊急',
    avgResponseTime: 1.5,
    targetTime: 2,
  },
  {
    priority: '高',
    avgResponseTime: 4,
    targetTime: 4,
  },
  {
    priority: '中',
    avgResponseTime: 8,
    targetTime: 8,
  },
  {
    priority: '低',
    avgResponseTime: 24,
    targetTime: 24,
  },
];

export function ResponseTimeAnalysis() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>優先度別平均対応時間</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priority" />
                <YAxis
                  label={{
                    value: '時間',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="avgResponseTime"
                  name="平均対応時間"
                  fill="#8884d8"
                />
                <Bar dataKey="targetTime" name="目標時間" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* TODO: 他の対応時間分析を追加 */}
    </div>
  );
}
