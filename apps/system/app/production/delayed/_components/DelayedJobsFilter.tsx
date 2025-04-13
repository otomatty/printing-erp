import { Search } from 'lucide-react';
import { Input } from '@kit/ui/input';
import { Button } from '@kit/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import { Label } from '@kit/ui/label';
import type { Dispatch, SetStateAction } from 'react';

type DelayedJobsFilterProps = {
  searchValue: string;
  onSearchChange: Dispatch<SetStateAction<string>>;
};

export function DelayedJobsFilter({
  searchValue,
  onSearchChange,
}: DelayedJobsFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="案件名、顧客名、担当者などで検索"
          className="max-w-sm"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Button>
          <Search className="h-4 w-4 mr-2" />
          検索
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="w-48 space-y-1">
          <Label htmlFor="process-filter">工程</Label>
          <Select>
            <SelectTrigger id="process-filter">
              <SelectValue placeholder="すべての工程" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての工程</SelectItem>
              <SelectItem value="prepress">製版</SelectItem>
              <SelectItem value="printing">印刷</SelectItem>
              <SelectItem value="cutting">断裁</SelectItem>
              <SelectItem value="binding">製本</SelectItem>
              <SelectItem value="finishing">仕上げ</SelectItem>
              <SelectItem value="shipping">出荷</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-48 space-y-1">
          <Label htmlFor="priority-filter">優先度</Label>
          <Select>
            <SelectTrigger id="priority-filter">
              <SelectValue placeholder="すべての優先度" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての優先度</SelectItem>
              <SelectItem value="high">高</SelectItem>
              <SelectItem value="medium">中</SelectItem>
              <SelectItem value="low">低</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-48 space-y-1">
          <Label htmlFor="due-date-filter">納期</Label>
          <Select>
            <SelectTrigger id="due-date-filter">
              <SelectValue placeholder="納期でフィルター" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての納期</SelectItem>
              <SelectItem value="today">今日まで</SelectItem>
              <SelectItem value="tomorrow">明日まで</SelectItem>
              <SelectItem value="this-week">今週中</SelectItem>
              <SelectItem value="next-week">来週中</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
