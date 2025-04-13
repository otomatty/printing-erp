'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { Button } from '@kit/ui/button';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';
import { AlertCircle, ArrowUpRight } from 'lucide-react';

// モックデータ
const statusData = [
  { name: '未対応', value: 12, color: '#ef4444' },
  { name: '対応中', value: 18, color: '#3b82f6' },
  { name: '保留', value: 7, color: '#f59e0b' },
  { name: '完了', value: 42, color: '#22c55e' },
];

const priorityData = [
  { name: '最高', value: 5, color: '#dc2626' },
  { name: '高', value: 15, color: '#ea580c' },
  { name: '中', value: 38, color: '#0284c7' },
  { name: '低', value: 21, color: '#64748b' },
];

const responseTimeData = [
  { name: '1時間以内', count: 24 },
  { name: '1-2時間', count: 18 },
  { name: '2-4時間', count: 12 },
  { name: '4-8時間', count: 8 },
  { name: '8時間以上', count: 6 },
];

const weeklyTrendData = [
  { day: '月', count: 15 },
  { day: '火', count: 12 },
  { day: '水', count: 18 },
  { day: '木', count: 22 },
  { day: '金', count: 20 },
  { day: '土', count: 9 },
  { day: '日', count: 8 },
];

export function InquiryDashboard() {
  const [timeframe, setTimeframe] = useState('week');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>問い合わせダッシュボード</CardTitle>
          <CardDescription>問い合わせの概要と統計情報</CardDescription>
        </div>
        <Tabs
          defaultValue="week"
          className="w-[400px]"
          value={timeframe}
          onValueChange={setTimeframe}
        >
          <TabsList>
            <TabsTrigger value="day">今日</TabsTrigger>
            <TabsTrigger value="week">今週</TabsTrigger>
            <TabsTrigger value="month">今月</TabsTrigger>
            <TabsTrigger value="quarter">四半期</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">問い合わせ状況</h3>
              <div className="text-right text-sm">
                <div className="font-medium">合計: 79</div>
                <div className="text-muted-foreground">完了率: 53%</div>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {statusData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">優先度分布</h3>
              <div className="text-right text-sm text-muted-foreground">
                最高優先度: 5件（6%）
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {priorityData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">初回応答時間</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={responseTimeData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" name="件数" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">問い合わせ傾向</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyTrendData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                >
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" name="件数" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6 pt-4 border-t">
          <div className="flex items-center text-amber-600 gap-2 p-2 bg-amber-50 rounded-md text-sm">
            <AlertCircle className="h-4 w-4" />
            <p>SLA違反: 3件の問い合わせが目標応答時間を超過しています</p>
          </div>
          <Button variant="outline" size="sm">
            詳細レポート
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
