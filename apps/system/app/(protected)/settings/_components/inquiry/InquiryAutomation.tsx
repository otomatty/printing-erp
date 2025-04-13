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
import { Label } from '@kit/ui/label';
import { Switch } from '@kit/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import { Input } from '@kit/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@kit/ui/dialog';
import { AlertCircle, Plus, Pencil, Trash2, Zap, Users } from 'lucide-react';

interface AutoRule {
  id: number;
  name: string;
  condition: string;
  action: string;
  active: boolean;
}

export function InquiryAutomation() {
  const [autoResponseEnabled, setAutoResponseEnabled] = useState(true);
  const [autoAssignEnabled, setAutoAssignEnabled] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentRule, setCurrentRule] = useState<AutoRule | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [rules, setRules] = useState<AutoRule[]>([
    {
      id: 1,
      name: '高優先度の自動割り当て',
      condition: '優先度が「高」または「最高」',
      action: '田中マネージャーに割り当て',
      active: true,
    },
    {
      id: 2,
      name: '製品仕様の自動応答',
      condition: 'タイトルまたは内容に「仕様」を含む',
      action: '「製品仕様」テンプレートで自動応答',
      active: true,
    },
    {
      id: 3,
      name: '納期確認の割り当て',
      condition: '種別が「納期確認」',
      action: '製造部チームに割り当て',
      active: false,
    },
    {
      id: 4,
      name: '見積依頼の割り当て',
      condition: '種別が「見積依頼」',
      action: '営業チームに割り当て',
      active: true,
    },
  ]);

  const handleAddRule = () => {
    setIsEditMode(false);
    setCurrentRule({
      id: 0,
      name: '',
      condition: '',
      action: '',
      active: true,
    });
    setIsDialogOpen(true);
  };

  const handleEditRule = (rule: AutoRule) => {
    setIsEditMode(true);
    setCurrentRule(rule);
    setIsDialogOpen(true);
  };

  const handleSaveRule = () => {
    if (
      !currentRule ||
      !currentRule.name ||
      !currentRule.condition ||
      !currentRule.action
    ) {
      return;
    }

    if (isEditMode) {
      setRules(rules.map((r) => (r.id === currentRule.id ? currentRule : r)));
    } else {
      const newId = Math.max(0, ...rules.map((r) => r.id)) + 1;
      setRules([...rules, { ...currentRule, id: newId }]);
    }

    setIsDialogOpen(false);
  };

  const handleDeleteRule = (id: number) => {
    setRules(rules.filter((r) => r.id !== id));
  };

  const handleToggleActive = (id: number) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>問い合わせ自動化設定</CardTitle>
        <CardDescription>
          問い合わせの自動割り当てと自動応答のルールを設定します。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-response"
              checked={autoResponseEnabled}
              onCheckedChange={setAutoResponseEnabled}
            />
            <Label htmlFor="auto-response" className="font-medium">
              自動応答を有効にする
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-assign"
              checked={autoAssignEnabled}
              onCheckedChange={setAutoAssignEnabled}
            />
            <Label htmlFor="auto-assign" className="font-medium">
              自動割り当てを有効にする
            </Label>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">自動化ルール</h3>
            <Button size="sm" onClick={handleAddRule}>
              <Plus className="h-4 w-4 mr-1" />
              ルール追加
            </Button>
          </div>

          <div className="space-y-2">
            {rules.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                自動化ルールが設定されていません
              </div>
            ) : (
              rules.map((rule) => (
                <div
                  key={rule.id}
                  className={`border rounded-md p-3 ${rule.active ? '' : 'bg-muted/30 border-dashed'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium flex items-center">
                        {rule.action.includes('割り当て') ? (
                          <Users className="h-4 w-4 mr-1 text-blue-500" />
                        ) : (
                          <Zap className="h-4 w-4 mr-1 text-amber-500" />
                        )}
                        {rule.name}
                        {!rule.active && (
                          <span className="ml-2 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                            無効
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        条件：{rule.condition}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        アクション：{rule.action}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleActive(rule.id)}
                      >
                        {rule.active ? '無効化' : '有効化'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditRule(rule)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleDeleteRule(rule.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex items-center text-blue-600 gap-2 p-2 bg-blue-50 rounded-md text-sm">
          <AlertCircle className="h-4 w-4" />
          <p>
            自動化ルールは上から順に評価され、最初に条件が一致したルールが適用されます。
          </p>
        </div>
      </CardContent>

      {/* ルール編集ダイアログ */}
      {currentRule && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? 'ルールを編集' : '新規ルールを追加'}
              </DialogTitle>
              <DialogDescription>
                問い合わせの自動処理ルールを設定します
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rule-name">ルール名</Label>
                <Input
                  id="rule-name"
                  value={currentRule.name}
                  onChange={(e) =>
                    setCurrentRule({ ...currentRule, name: e.target.value })
                  }
                  placeholder="高優先度の自動割り当て"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rule-condition">条件</Label>
                <Select
                  value={currentRule.condition}
                  onValueChange={(value) =>
                    setCurrentRule({ ...currentRule, condition: value })
                  }
                >
                  <SelectTrigger id="rule-condition">
                    <SelectValue placeholder="条件を選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="優先度が「高」または「最高」">
                      優先度が「高」または「最高」
                    </SelectItem>
                    <SelectItem value="タイトルまたは内容に「仕様」を含む">
                      タイトルまたは内容に「仕様」を含む
                    </SelectItem>
                    <SelectItem value="種別が「納期確認」">
                      種別が「納期確認」
                    </SelectItem>
                    <SelectItem value="種別が「見積依頼」">
                      種別が「見積依頼」
                    </SelectItem>
                    <SelectItem value="種別が「クレーム」">
                      種別が「クレーム」
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rule-action">アクション</Label>
                <Select
                  value={currentRule.action}
                  onValueChange={(value) =>
                    setCurrentRule({ ...currentRule, action: value })
                  }
                >
                  <SelectTrigger id="rule-action">
                    <SelectValue placeholder="アクションを選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="田中マネージャーに割り当て">
                      田中マネージャーに割り当て
                    </SelectItem>
                    <SelectItem value="佐藤担当者に割り当て">
                      佐藤担当者に割り当て
                    </SelectItem>
                    <SelectItem value="製造部チームに割り当て">
                      製造部チームに割り当て
                    </SelectItem>
                    <SelectItem value="営業チームに割り当て">
                      営業チームに割り当て
                    </SelectItem>
                    <SelectItem value="「製品仕様」テンプレートで自動応答">
                      「製品仕様」テンプレートで自動応答
                    </SelectItem>
                    <SelectItem value="「初期応答」テンプレートで自動応答">
                      「初期応答」テンプレートで自動応答
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="rule-active"
                  checked={currentRule.active}
                  onCheckedChange={(checked) =>
                    setCurrentRule({ ...currentRule, active: checked })
                  }
                />
                <Label htmlFor="rule-active">ルールを有効にする</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  キャンセル
                </Button>
                <Button onClick={handleSaveRule}>保存</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
