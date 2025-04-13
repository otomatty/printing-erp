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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

// モックデータ
const typeDistribution = [
  { name: '見積依頼', value: 35, color: '#3b82f6' },
  { name: '注文相談', value: 25, color: '#22c55e' },
  { name: '納期確認', value: 20, color: '#eab308' },
  { name: '製品仕様', value: 10, color: '#f97316' },
  { name: 'クレーム', value: 5, color: '#ef4444' },
  { name: 'その他', value: 5, color: '#a855f7' },
];

const statusDistribution = [
  { name: '未対応', value: 15, color: '#ef4444' },
  { name: '対応中', value: 35, color: '#3b82f6' },
  { name: '回答済み', value: 45, color: '#22c55e' },
  { name: '保留', value: 5, color: '#f97316' },
];

const priorityDistribution = [
  { name: '最高', value: 5, color: '#ef4444' },
  { name: '高', value: 25, color: '#f97316' },
  { name: '中', value: 55, color: '#eab308' },
  { name: '低', value: 15, color: '#a855f7' },
];

const sourceDistribution = [
  { name: 'Webサイト', value: 55, color: '#3b82f6' },
  { name: '電話', value: 25, color: '#22c55e' },
  { name: 'メール', value: 15, color: '#eab308' },
  { name: '来店', value: 5, color: '#a855f7' },
];

export function InquiryDistribution() {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>問い合わせ分布</CardTitle>
            <CardDescription>問い合わせデータの分布状況</CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="集計期間を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">直近1週間</SelectItem>
              <SelectItem value="month">直近1ヶ月</SelectItem>
              <SelectItem value="quarter">直近3ヶ月</SelectItem>
              <SelectItem value="year">直近1年</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="type" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="type">種別分布</TabsTrigger>
            <TabsTrigger value="status">状態分布</TabsTrigger>
            <TabsTrigger value="priority">優先度分布</TabsTrigger>
            <TabsTrigger value="source">問合せ元分布</TabsTrigger>
          </TabsList>

          <TabsContent value="type">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={typeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {typeDistribution.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}件`, '件数']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">種別内訳</h3>
                <div className="space-y-2">
                  {typeDistribution.map((item) => (
                    <div
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
                      <div className="flex space-x-2">
                        <span className="font-medium">{item.value}件</span>
                        <span className="text-muted-foreground">
                          {Math.round(
                            (item.value /
                              typeDistribution.reduce(
                                (a, b) => a + b.value,
                                0
                              )) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t mt-4">
                  <div className="flex justify-between">
                    <span>合計</span>
                    <span className="font-bold">
                      {typeDistribution.reduce((a, b) => a + b.value, 0)}件
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="status">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {statusDistribution.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}件`, '件数']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">状態内訳</h3>
                <div className="space-y-2">
                  {statusDistribution.map((item) => (
                    <div
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
                      <div className="flex space-x-2">
                        <span className="font-medium">{item.value}件</span>
                        <span className="text-muted-foreground">
                          {Math.round(
                            (item.value /
                              statusDistribution.reduce(
                                (a, b) => a + b.value,
                                0
                              )) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t mt-4">
                  <div className="flex justify-between">
                    <span>合計</span>
                    <span className="font-bold">
                      {statusDistribution.reduce((a, b) => a + b.value, 0)}件
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="priority">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={priorityDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {priorityDistribution.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}件`, '件数']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">優先度内訳</h3>
                <div className="space-y-2">
                  {priorityDistribution.map((item) => (
                    <div
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
                      <div className="flex space-x-2">
                        <span className="font-medium">{item.value}件</span>
                        <span className="text-muted-foreground">
                          {Math.round(
                            (item.value /
                              priorityDistribution.reduce(
                                (a, b) => a + b.value,
                                0
                              )) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t mt-4">
                  <div className="flex justify-between">
                    <span>合計</span>
                    <span className="font-bold">
                      {priorityDistribution.reduce((a, b) => a + b.value, 0)}件
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="source">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {sourceDistribution.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}件`, '件数']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">問合せ元内訳</h3>
                <div className="space-y-2">
                  {sourceDistribution.map((item) => (
                    <div
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
                      <div className="flex space-x-2">
                        <span className="font-medium">{item.value}件</span>
                        <span className="text-muted-foreground">
                          {Math.round(
                            (item.value /
                              sourceDistribution.reduce(
                                (a, b) => a + b.value,
                                0
                              )) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t mt-4">
                  <div className="flex justify-between">
                    <span>合計</span>
                    <span className="font-bold">
                      {sourceDistribution.reduce((a, b) => a + b.value, 0)}件
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
