'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { Label } from '@kit/ui/label';
import { Switch } from '@kit/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import { AlertCircle } from 'lucide-react';

interface ResponseTimeItem {
  id: number;
  priority: string;
  time: string;
}

export function ResponseTimeSettings() {
  const [priorityBased, setPriorityBased] = useState(true);
  const [defaultResponseTime, setDefaultResponseTime] = useState('4');
  const [slaItems, setSlaItems] = useState<ResponseTimeItem[]>([
    { id: 1, priority: '最高', time: '1' },
    { id: 2, priority: '高', time: '2' },
    { id: 3, priority: '中', time: '4' },
    { id: 4, priority: '低', time: '8' },
  ]);

  const handleTimeChange = (id: number, value: string) => {
    setSlaItems(
      slaItems.map((item) => (item.id === id ? { ...item, time: value } : item))
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SLA設定</CardTitle>
        <CardDescription>
          問い合わせ対応のサービスレベル合意（SLA）を設定します。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>初回応答目標時間</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Select
                  value={defaultResponseTime}
                  onValueChange={setDefaultResponseTime}
                  disabled={priorityBased}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="時間を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1時間以内</SelectItem>
                    <SelectItem value="2">2時間以内</SelectItem>
                    <SelectItem value="4">4時間以内</SelectItem>
                    <SelectItem value="8">8時間以内</SelectItem>
                    <SelectItem value="24">24時間以内</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="priority-based"
                  checked={priorityBased}
                  onCheckedChange={setPriorityBased}
                />
                <Label htmlFor="priority-based" className="text-sm">
                  優先度に基づいて変動
                </Label>
              </div>
            </div>
          </div>

          {priorityBased && (
            <div className="space-y-2">
              <Label>優先度ごとの応答目標時間</Label>
              <table className="w-full">
                <thead className="bg-muted">
                  <tr className="text-left text-muted-foreground text-sm">
                    <th className="px-3 py-2 font-medium">優先度</th>
                    <th className="px-3 py-2 font-medium">応答目標時間</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted">
                  {slaItems.map((sla) => (
                    <tr key={sla.id}>
                      <td className="px-3 py-2">{sla.priority}</td>
                      <td className="px-3 py-2">
                        <Select
                          value={sla.time}
                          onValueChange={(value) =>
                            handleTimeChange(sla.id, value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="時間を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1時間以内</SelectItem>
                            <SelectItem value="2">2時間以内</SelectItem>
                            <SelectItem value="4">4時間以内</SelectItem>
                            <SelectItem value="8">8時間以内</SelectItem>
                            <SelectItem value="24">24時間以内</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex items-center text-amber-600 gap-2 p-2 bg-amber-50 rounded-md text-sm">
            <AlertCircle className="h-4 w-4" />
            <p>
              SLA設定を変更すると、新しい問い合わせに対してのみ適用されます。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
