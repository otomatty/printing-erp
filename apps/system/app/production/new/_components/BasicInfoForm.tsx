import { CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { Button } from '@kit/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@kit/ui/popover';
import { Calendar } from '@kit/ui/calendar';
import { useState } from 'react';
import { ja } from 'date-fns/locale';
import { format } from 'date-fns';

export function BasicInfoForm() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">基本情報</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">製品名 / タイトル</Label>
          <Input
            id="title"
            name="title"
            placeholder="例: A4チラシ 両面4色 1,000部"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="orderId">受注ID</Label>
            <Input id="orderId" name="orderId" placeholder="例: ORD-2023-124" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerName">顧客名</Label>
            <Input
              id="customerName"
              name="customerName"
              placeholder="例: 株式会社サンプル"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">開始日</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, 'yyyy/MM/dd', { locale: ja })
                  ) : (
                    <span>日付を選択</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  locale={ja}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <input
              type="hidden"
              name="startDate"
              value={startDate ? format(startDate, 'yyyy/MM/dd') : ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">納期</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? (
                    format(dueDate, 'yyyy/MM/dd', { locale: ja })
                  ) : (
                    <span>日付を選択</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  locale={ja}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <input
              type="hidden"
              name="dueDate"
              value={dueDate ? format(dueDate, 'yyyy/MM/dd') : ''}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="priority">優先度</Label>
            <Select name="priority">
              <SelectTrigger id="priority">
                <SelectValue placeholder="優先度を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">低</SelectItem>
                <SelectItem value="medium">中</SelectItem>
                <SelectItem value="high">高</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignedTo">担当者</Label>
            <Input
              id="assignedTo"
              name="assignedTo"
              placeholder="例: 田中印刷課"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
