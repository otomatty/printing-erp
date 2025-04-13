import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { Textarea } from '@kit/ui/textarea';
import { Checkbox } from '@kit/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';

export function ProductSpecsForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">製品仕様</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="size">サイズ</Label>
            <Select name="size">
              <SelectTrigger id="size">
                <SelectValue placeholder="サイズを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a4">A4</SelectItem>
                <SelectItem value="a3">A3</SelectItem>
                <SelectItem value="b5">B5</SelectItem>
                <SelectItem value="b4">B4</SelectItem>
                <SelectItem value="other">その他</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">部数</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="例: 1000"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="color_front">表面色数</Label>
            <Select name="color_front">
              <SelectTrigger id="color_front">
                <SelectValue placeholder="色数を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1色</SelectItem>
                <SelectItem value="2">2色</SelectItem>
                <SelectItem value="4">4色</SelectItem>
                <SelectItem value="special">特色</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="color_back">裏面色数</Label>
            <Select name="color_back">
              <SelectTrigger id="color_back">
                <SelectValue placeholder="色数を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">なし</SelectItem>
                <SelectItem value="1">1色</SelectItem>
                <SelectItem value="2">2色</SelectItem>
                <SelectItem value="4">4色</SelectItem>
                <SelectItem value="special">特色</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="paper">用紙</Label>
          <Select name="paper">
            <SelectTrigger id="paper">
              <SelectValue placeholder="用紙を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coat_90">コート紙 90kg</SelectItem>
              <SelectItem value="coat_110">コート紙 110kg</SelectItem>
              <SelectItem value="mat_90">マット紙 90kg</SelectItem>
              <SelectItem value="mat_110">マット紙 110kg</SelectItem>
              <SelectItem value="other">その他</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>加工</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="process_mat" name="process[]" value="mat" />
              <label htmlFor="process_mat" className="text-sm">
                マットPP加工
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="process_gloss" name="process[]" value="gloss" />
              <label htmlFor="process_gloss" className="text-sm">
                グロスPP加工
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="process_folding" name="process[]" value="folding" />
              <label htmlFor="process_folding" className="text-sm">
                折り加工
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="process_die" name="process[]" value="die" />
              <label htmlFor="process_die" className="text-sm">
                型抜き
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">特記事項</Label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="製品に関する特記事項や注意点"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}
