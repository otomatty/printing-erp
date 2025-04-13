import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Label } from '@kit/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';

export function ProcessSettingsForm() {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">工程設定</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="process_prepress">前工程（データ・版下）</Label>
              <Select name="process_prepress">
                <SelectTrigger id="process_prepress">
                  <SelectValue placeholder="担当を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team_a">Aチーム</SelectItem>
                  <SelectItem value="team_b">Bチーム</SelectItem>
                  <SelectItem value="sato">佐藤</SelectItem>
                  <SelectItem value="suzuki">鈴木</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="process_printing">印刷</Label>
              <Select name="process_printing">
                <SelectTrigger id="process_printing">
                  <SelectValue placeholder="担当を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team_a">Aチーム</SelectItem>
                  <SelectItem value="team_b">Bチーム</SelectItem>
                  <SelectItem value="tanaka">田中</SelectItem>
                  <SelectItem value="yamada">山田</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="process_cutting">断裁</Label>
              <Select name="process_cutting">
                <SelectTrigger id="process_cutting">
                  <SelectValue placeholder="担当を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team_c">Cチーム</SelectItem>
                  <SelectItem value="ito">伊藤</SelectItem>
                  <SelectItem value="kato">加藤</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="process_binding">製本</Label>
              <Select name="process_binding">
                <SelectTrigger id="process_binding">
                  <SelectValue placeholder="担当を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team_d">Dチーム</SelectItem>
                  <SelectItem value="nakamura">中村</SelectItem>
                  <SelectItem value="kobayashi">小林</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="process_finishing">仕上げ</Label>
              <Select name="process_finishing">
                <SelectTrigger id="process_finishing">
                  <SelectValue placeholder="担当を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team_e">Eチーム</SelectItem>
                  <SelectItem value="takahashi">高橋</SelectItem>
                  <SelectItem value="watanabe">渡辺</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="process_shipping">出荷</Label>
              <Select name="process_shipping">
                <SelectTrigger id="process_shipping">
                  <SelectValue placeholder="担当を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team_f">Fチーム</SelectItem>
                  <SelectItem value="yamamoto">山本</SelectItem>
                  <SelectItem value="inoue">井上</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
