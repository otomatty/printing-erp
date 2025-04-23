/**
 * ダッシュボード - 売上グラフコンポーネント
 * 月次売上のグラフを表示（現在はプレースホルダー）
 */
'use client';

import { memo, useState } from 'react';
import {
  BarChart,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { weeklySalesData } from './_data/weeklySalesData';
import { monthlyKpiData } from './_data/monthlyKpiData';
import {
  weeklyGaugeData,
  weeklyDonutData,
  weekdayDistributionData,
  monthlyCsatDistribution,
  monthlyRepeatProgress,
  monthlyNewCustomersGauge,
} from './_data/summaryData';
import { Card, CardHeader, CardTitle, CardContent } from '@kit/ui/card';

export default memo(function DashboardSalesChart() {
  const [tab, setTab] = useState<'weekly' | 'monthly'>('weekly');
  return (
    <div>
      {/* タブ切替 */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 -mb-px  ${tab === 'weekly' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
          onClick={() => setTab('weekly')}
          type="button"
        >
          週次売上
        </button>
        <button
          type="button"
          className={`px-4 py-2 -mb-px ${tab === 'monthly' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
          onClick={() => setTab('monthly')}
        >
          月次KPI
        </button>
      </div>

      {/* 週次表示 */}
      {tab === 'weekly' && (
        <>
          {/* サマリーチャート: 週次 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="h-80 p-4">
              <CardHeader>
                <CardTitle className="text-sm">今週の売上達成率</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <RadialBarChart
                  width={160}
                  height={160}
                  cx="50%"
                  cy="50%"
                  innerRadius="80%"
                  outerRadius="100%"
                  barSize={10}
                  data={[
                    {
                      value: Math.min(
                        (weeklyGaugeData.current / weeklyGaugeData.target) *
                          100,
                        100
                      ),
                    },
                  ]}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar background dataKey="value" fill="var(--primary)" />
                </RadialBarChart>
                <p className="mt-2 text-sm text-gray-600">{`${weeklyGaugeData.current} / ${weeklyGaugeData.target}`}</p>
              </CardContent>
            </Card>
            <Card className="h-80 p-4">
              <CardHeader>
                <CardTitle className="text-sm">直近4週 達成率</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <PieChart width={160} height={160}>
                  <Pie
                    data={weeklyDonutData}
                    dataKey="ratio"
                    nameKey="week"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    fill="var(--primary)"
                    label
                  />
                </PieChart>
              </CardContent>
            </Card>
            <Card className="h-80 p-4">
              <CardHeader>
                <CardTitle className="text-sm">曜日別売上構成</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <PieChart width={160} height={160}>
                  <Pie
                    data={weekdayDistributionData}
                    dataKey="sales"
                    nameKey="day"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    fill="#8884d8"
                    label={({ name }) => name}
                  />
                </PieChart>
              </CardContent>
            </Card>
          </div>
          {/* メインチャート: 週次売上 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">週次売上</h2>
            <div className="h-64 bg-gray-50 rounded border">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklySalesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="week"
                    stroke="#888888"
                    tickFormatter={(value: string) => {
                      const w = Number.parseInt(value.replace('週', ''), 10);
                      const m = Math.min(12, Math.ceil((w * 12) / 52));
                      return `${m}月`;
                    }}
                  />
                  <YAxis stroke="#888888" />
                  <Tooltip />
                  <Bar dataKey="sales" name="売上" fill="var(--primary)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* 月次表示 */}
      {tab === 'monthly' && (
        <>
          {/* サマリーチャート: 月次 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="h-80 p-4">
              <CardHeader>
                <CardTitle className="text-sm">顧客満足度内訳</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <PieChart width={160} height={160}>
                  <Pie
                    data={monthlyCsatDistribution}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                  >
                    {monthlyCsatDistribution.map((entry, idx) => (
                      <Cell
                        key={entry.category}
                        fill={['#00AEEF', '#EC008C', '#FFF500'][idx]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </CardContent>
            </Card>
            <Card className="h-80 p-4">
              <CardHeader>
                <CardTitle className="text-sm">リピート率進捗</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <RadialBarChart
                  width={160}
                  height={160}
                  cx="50%"
                  cy="50%"
                  innerRadius="80%"
                  outerRadius="100%"
                  barSize={10}
                  data={[
                    {
                      value: Math.min(
                        monthlyRepeatProgress.value,
                        monthlyRepeatProgress.target
                      ),
                    },
                  ]}
                  startAngle={180}
                  endAngle={0}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, monthlyRepeatProgress.target]}
                    angleAxisId={0}
                    tick={false}
                  />
                  <RadialBar background dataKey="value" fill="#EC008C" />
                </RadialBarChart>
                <p className="mt-2 text-sm text-gray-600">{`${monthlyRepeatProgress.value}% / ${monthlyRepeatProgress.target}%`}</p>
              </CardContent>
            </Card>
            <Card className="h-80 p-4">
              <CardHeader>
                <CardTitle className="text-sm">新規顧客獲得数</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <RadialBarChart
                  width={160}
                  height={160}
                  cx="50%"
                  cy="50%"
                  innerRadius="80%"
                  outerRadius="100%"
                  barSize={10}
                  data={[
                    {
                      value: Math.min(
                        (monthlyNewCustomersGauge.value /
                          monthlyNewCustomersGauge.target) *
                          100,
                        100
                      ),
                    },
                  ]}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar background dataKey="value" fill="#FFF500" />
                </RadialBarChart>
                <p className="mt-2 text-sm text-gray-600">{`${monthlyNewCustomersGauge.value} / ${monthlyNewCustomersGauge.target}`}</p>
              </CardContent>
            </Card>
          </div>
          {/* メインチャート: 月次KPI */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">月次KPI</h2>
            <div className="h-64 bg-gray-50 rounded border">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyKpiData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip />
                  <Legend
                    iconType="circle"
                    iconSize={10}
                    formatter={(value) => (
                      <span style={{ color: '#000' }}>{value}</span>
                    )}
                  />
                  <Area
                    type="monotone"
                    dataKey="csat"
                    name="顧客満足度 (%)"
                    stroke="#00AEEF"
                    fill="#00AEEF"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="repeatRate"
                    name="リピートオーダー率 (%)"
                    stroke="#EC008C"
                    fill="#EC008C"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="newCustomers"
                    name="新規顧客獲得数"
                    stroke="#FFF500"
                    fill="#FFF500"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
});
