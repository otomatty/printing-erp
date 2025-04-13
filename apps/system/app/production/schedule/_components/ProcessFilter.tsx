import { Card, CardContent } from '@kit/ui/card';
import { Label } from '@kit/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import { Switch } from '@kit/ui/switch';
import { Checkbox } from '@kit/ui/checkbox';

// フィルターの型定義
interface ProductionFilter {
  status?: string;
  processes?: string[];
  equipments?: string[];
  showDelayed?: boolean;
  showAvailableOnly?: boolean;
}

type ProcessFilterProps = {
  onFilterChange: (filters: ProductionFilter) => void;
};

// 工程リスト
const PROCESSES = [
  { id: 'prepress', label: '製版' },
  { id: 'printing', label: '印刷' },
  { id: 'cutting', label: '断裁' },
  { id: 'binding', label: '製本' },
  { id: 'finishing', label: '仕上げ' },
  { id: 'shipping', label: '出荷' },
];

export function ProcessFilter({ onFilterChange }: ProcessFilterProps) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 工程フィルター */}
          <div className="space-y-2">
            <Label htmlFor="process-filter">表示する工程</Label>
            <div className="grid grid-cols-2 gap-2">
              {PROCESSES.map((process) => (
                <div key={process.id} className="flex items-center space-x-2">
                  <Checkbox id={`process-${process.id}`} defaultChecked />
                  <Label
                    htmlFor={`process-${process.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {process.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* ステータスフィルター */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="status-filter">ステータス</Label>
              <Select defaultValue="all">
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="すべてのステータス" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="scheduled">予定</SelectItem>
                  <SelectItem value="in_progress">進行中</SelectItem>
                  <SelectItem value="delayed">遅延</SelectItem>
                  <SelectItem value="completed">完了</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-delayed-only" className="cursor-pointer">
                遅延案件のみ表示
              </Label>
              <Switch id="show-delayed-only" />
            </div>
          </div>

          {/* 設備フィルター */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="equipment-filter">設備</Label>
              <Select defaultValue="all">
                <SelectTrigger id="equipment-filter">
                  <SelectValue placeholder="すべての設備" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="printing_machine_1">印刷機1</SelectItem>
                  <SelectItem value="printing_machine_2">印刷機2</SelectItem>
                  <SelectItem value="cutter_1">断裁機1</SelectItem>
                  <SelectItem value="binder_1">製本機1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-available-only" className="cursor-pointer">
                空き設備のみ表示
              </Label>
              <Switch id="show-available-only" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
