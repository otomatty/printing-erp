'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Button } from '@kit/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import { DownloadIcon, RefreshCcw } from 'lucide-react';

// モックデータ
const monthlyData = [
  { name: '1月', count: 45 },
  { name: '2月', count: 52 },
  { name: '3月', count: 48 },
  { name: '4月', count: 61 },
  { name: '5月', count: 58 },
  { name: '6月', count: 65 },
  { name: '7月', count: 72 },
  { name: '8月', count: 68 },
  { name: '9月', count: 74 },
  { name: '10月', count: 80 },
  { name: '11月', count: 85 },
  { name: '12月', count: 92 },
];

const categoryData = [
  { name: '見積依頼', value: 120, color: '#8884d8' },
  { name: '納期確認', value: 85, color: '#82ca9d' },
  { name: '製品仕様', value: 65, color: '#ffc658' },
  { name: 'クレーム', value: 25, color: '#ff8042' },
  { name: 'その他', value: 55, color: '#0088fe' },
];

const responseTimeData = [
  { name: '1時間以内', '平均応答時間(分)': 35 },
  { name: '1-2時間', '平均応答時間(分)': 95 },
  { name: '2-4時間', '平均応答時間(分)': 180 },
  { name: '4-8時間', '平均応答時間(分)': 320 },
  { name: '8時間以上', '平均応答時間(分)': 610 },
];

const satisfactionData = [
  { name: '非常に満足', value: 42, color: '#22c55e' },
  { name: '満足', value: 35, color: '#84cc16' },
  { name: '普通', value: 15, color: '#facc15' },
  { name: '不満', value: 6, color: '#f97316' },
  { name: '非常に不満', value: 2, color: '#ef4444' },
];

const staffPerformanceData = [
  {
    name: '佐藤',
    解決率: 94,
    平均応答時間: 35,
    顧客満足度: 92,
  },
  {
    name: '田中',
    解決率: 88,
    平均応答時間: 42,
    顧客満足度: 85,
  },
  {
    name: '鈴木',
    解決率: 92,
    平均応答時間: 38,
    顧客満足度: 90,
  },
  {
    name: '渡辺',
    解決率: 82,
    平均応答時間: 55,
    顧客満足度: 78,
  },
  {
    name: '伊藤',
    解決率: 96,
    平均応答時間: 31,
    顧客満足度: 95,
  },
];

export function InquiryAnalytics() {
  const [period, setPeriod] = useState('year');
  const [dataType, setDataType] = useState('volume');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">問い合わせ分析</h2>
        <div className="flex space-x-2">
          <Select defaultValue={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="期間" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">直近1週間</SelectItem>
              <SelectItem value="month">直近1ヶ月</SelectItem>
              <SelectItem value="quarter">直近3ヶ月</SelectItem>
              <SelectItem value="year">年間</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <DownloadIcon className="h-4 w-4 mr-2" />
            レポート出力
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">今月の問い合わせ総数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92</div>
            <p className="text-xs text-muted-foreground">前月比 +8.2%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">平均初回応答時間</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.8時間</div>
            <p className="text-xs text-muted-foreground">目標: 2時間以内</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">顧客満足度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">前月比 +3.5%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="volume"
        className="w-full"
        value={dataType}
        onValueChange={setDataType}
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="volume">問い合わせ量</TabsTrigger>
          <TabsTrigger value="category">カテゴリ分析</TabsTrigger>
          <TabsTrigger value="response">応答時間</TabsTrigger>
          <TabsTrigger value="satisfaction">顧客満足度</TabsTrigger>
        </TabsList>

        <TabsContent value="volume">
          <Card>
            <CardHeader>
              <CardTitle>月別問い合わせ数推移</CardTitle>
              <CardDescription>
                月ごとの問い合わせ数の推移を表示します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                      name="問い合わせ数"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>総問い合わせ数: 800件 (年間)</p>
                <p>月平均: 66.7件</p>
                <p>成長率: +10.5% (前年比)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="category">
          <Card>
            <CardHeader>
              <CardTitle>問い合わせカテゴリ分布</CardTitle>
              <CardDescription>
                問い合わせ種別ごとの割合を表示します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${entry.name}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h4 className="font-medium mb-2">カテゴリ分析</h4>
                  <ul className="space-y-3">
                    {categoryData.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: item.color }}
                          />
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{item.value}件</span>
                          <span className="text-xs text-muted-foreground">
                            {(
                              (item.value /
                                categoryData.reduce(
                                  (sum, i) => sum + i.value,
                                  0
                                )) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="response">
          <Card>
            <CardHeader>
              <CardTitle>応答時間分析</CardTitle>
              <CardDescription>
                問い合わせへの応答時間統計を表示します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={responseTimeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="平均応答時間(分)"
                      fill="#3b82f6"
                      name="平均応答時間(分)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium">平均初回応答時間</h4>
                  <p className="text-2xl font-bold">1時間48分</p>
                  <p className="text-xs text-muted-foreground">
                    目標: 2時間以内 (目標達成中)
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">平均解決時間</h4>
                  <p className="text-2xl font-bold">8時間36分</p>
                  <p className="text-xs text-muted-foreground">
                    目標: 12時間以内 (目標達成中)
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">SLA達成率</h4>
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-xs text-muted-foreground">
                    目標: 90%以上 (目標達成中)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="satisfaction">
          <Card>
            <CardHeader>
              <CardTitle>顧客満足度分析</CardTitle>
              <CardDescription>
                問い合わせ対応に対する顧客満足度を表示します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={satisfactionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {satisfactionData.map((entry) => (
                          <Cell key={`cell-${entry.name}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h4 className="font-medium mb-2">スタッフパフォーマンス</h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={staffPerformanceData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="顧客満足度" fill="#22c55e" />
                        <Bar dataKey="解決率" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm">
                <h4 className="font-medium mb-1">顧客満足度サマリー</h4>
                <p>
                  顧客満足度: <span className="font-bold">87%</span>{' '}
                  (非常に満足・満足の合計)
                </p>
                <p>
                  不満率: <span className="font-bold">8%</span>{' '}
                  (不満・非常に不満の合計)
                </p>
                <p className="mt-2">
                  主な改善要望:
                  <span className="text-muted-foreground ml-2">
                    応答時間の短縮(32%)、専門知識の向上(28%)、フォローアップの強化(18%)
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
