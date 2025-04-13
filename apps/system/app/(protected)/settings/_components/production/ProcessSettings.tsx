'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@kit/ui/dialog';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { Button } from '@kit/ui/button';
import {
  Plus,
  Edit,
  Trash2,
  MoveUp,
  MoveDown,
  ListFilter,
  Settings2,
} from 'lucide-react';
import { Switch } from '@kit/ui/switch';
import { Textarea } from '@kit/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';
import { Badge } from '@kit/ui/badge';

interface Process {
  id: string;
  name: string;
  description: string;
  estimatedTime: number;
  timeUnit: string;
  requiresApproval: boolean;
  order: number;
  category: string;
  status: 'active' | 'inactive';
  responsibleRoles: string[];
}

export function ProcessSettings() {
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const [processes, setProcesses] = useState<Process[]>([
    {
      id: 'p1',
      name: 'デザイン作成',
      description: '顧客要望に基づいたデザインの作成',
      estimatedTime: 2,
      timeUnit: 'days',
      requiresApproval: true,
      order: 1,
      category: 'design',
      status: 'active',
      responsibleRoles: ['デザイナー'],
    },
    {
      id: 'p2',
      name: 'デザイン修正',
      description: '顧客からのフィードバックに基づいた修正',
      estimatedTime: 1,
      timeUnit: 'days',
      requiresApproval: true,
      order: 2,
      category: 'design',
      status: 'active',
      responsibleRoles: ['デザイナー'],
    },
    {
      id: 'p3',
      name: '印刷前処理',
      description: '印刷用データの準備と確認',
      estimatedTime: 4,
      timeUnit: 'hours',
      requiresApproval: false,
      order: 3,
      category: 'production',
      status: 'active',
      responsibleRoles: ['オペレーター'],
    },
    {
      id: 'p4',
      name: '印刷',
      description: '印刷機による製品の印刷',
      estimatedTime: 2,
      timeUnit: 'days',
      requiresApproval: false,
      order: 4,
      category: 'production',
      status: 'active',
      responsibleRoles: ['オペレーター'],
    },
    {
      id: 'p5',
      name: '後加工',
      description: '製品の裁断、製本、折り加工等',
      estimatedTime: 1,
      timeUnit: 'days',
      requiresApproval: false,
      order: 5,
      category: 'production',
      status: 'active',
      responsibleRoles: ['オペレーター'],
    },
  ]);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProcess, setCurrentProcess] = useState<Process | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddNew = () => {
    setCurrentProcess({
      id: `p${processes.length + 1}`,
      name: '',
      description: '',
      estimatedTime: 1,
      timeUnit: 'days',
      requiresApproval: false,
      order: processes.length + 1,
      category: 'production',
      status: 'active',
      responsibleRoles: [],
    });
    setIsEditMode(false);
    setIsEditDialogOpen(true);
  };

  const handleEdit = (process: Process) => {
    setCurrentProcess({ ...process });
    setIsEditMode(true);
    setIsEditDialogOpen(true);
  };

  const handleProcessSelect = (process: Process) => {
    setSelectedProcess(process);
    setIsDetailDialogOpen(true);
  };

  const handleSave = () => {
    if (!currentProcess) return;

    if (isEditMode) {
      setProcesses(
        processes.map((p) => (p.id === currentProcess.id ? currentProcess : p))
      );
    } else {
      setProcesses([...processes, currentProcess]);
    }
    setIsEditDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setProcesses(processes.filter((p) => p.id !== id));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newProcesses = [...processes];
    [newProcesses[index - 1], newProcesses[index]] = [
      newProcesses[index],
      newProcesses[index - 1],
    ];
    // 順序を更新
    newProcesses.forEach((p, i) => {
      p.order = i + 1;
    });
    setProcesses(newProcesses);
  };

  const handleMoveDown = (index: number) => {
    if (index === processes.length - 1) return;
    const newProcesses = [...processes];
    [newProcesses[index], newProcesses[index + 1]] = [
      newProcesses[index + 1],
      newProcesses[index],
    ];
    // 順序を更新
    newProcesses.forEach((p, i) => {
      p.order = i + 1;
    });
    setProcesses(newProcesses);
  };

  const handleToggleStatus = (id: string) => {
    setProcesses(
      processes.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            status: p.status === 'active' ? 'inactive' : 'active',
          };
        }
        return p;
      })
    );
  };

  const formatTimeUnit = (unit: string) => {
    switch (unit) {
      case 'minutes':
        return '分';
      case 'hours':
        return '時間';
      case 'days':
        return '日';
      case 'weeks':
        return '週';
      default:
        return unit;
    }
  };

  const categoryNames: { [key: string]: string } = {
    design: 'デザイン',
    production: '製造',
    shipping: '出荷',
    other: 'その他',
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>工程マスタ設定</CardTitle>
            <CardDescription>
              製造工程のマスタデータを管理します。各工程の設定や順序を調整できます。
            </CardDescription>
          </div>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            新規工程追加
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">順序</TableHead>
                <TableHead className="w-[150px]">工程名</TableHead>
                <TableHead className="w-[100px]">カテゴリ</TableHead>
                <TableHead>説明</TableHead>
                <TableHead className="w-[100px]">所要時間</TableHead>
                <TableHead className="w-[100px]">承認必要</TableHead>
                <TableHead className="w-[100px]">状態</TableHead>
                <TableHead className="w-[120px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {processes
                .sort((a, b) => a.order - b.order)
                .map((process, index) => (
                  <TableRow
                    key={process.id}
                    className="cursor-pointer hover:bg-accent/50"
                    onClick={() => handleProcessSelect(process)}
                  >
                    <TableCell className="font-medium">
                      {process.order}
                    </TableCell>
                    <TableCell>{process.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          process.category === 'design'
                            ? 'secondary'
                            : process.category === 'production'
                              ? 'default'
                              : 'outline'
                        }
                      >
                        {categoryNames[process.category] || process.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {process.description}
                    </TableCell>
                    <TableCell>
                      {process.estimatedTime} {formatTimeUnit(process.timeUnit)}
                    </TableCell>
                    <TableCell>
                      {process.requiresApproval ? '必要' : '不要'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          process.status === 'active'
                            ? 'default'
                            : 'destructive'
                        }
                      >
                        {process.status === 'active' ? '有効' : '無効'}
                      </Badge>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                        >
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleMoveDown(index)}
                          disabled={index === processes.length - 1}
                        >
                          <MoveDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(process);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(process.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 工程詳細ダイアログ */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>工程詳細</DialogTitle>
          </DialogHeader>

          {selectedProcess && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    工程名
                  </h3>
                  <p className="text-lg font-medium">{selectedProcess.name}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    カテゴリ
                  </h3>
                  <Badge
                    variant={
                      selectedProcess.category === 'design'
                        ? 'secondary'
                        : selectedProcess.category === 'production'
                          ? 'default'
                          : 'outline'
                    }
                    className="text-sm"
                  >
                    {categoryNames[selectedProcess.category] ||
                      selectedProcess.category}
                  </Badge>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    説明
                  </h3>
                  <p>{selectedProcess.description}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    所要時間
                  </h3>
                  <p>
                    {selectedProcess.estimatedTime}{' '}
                    {formatTimeUnit(selectedProcess.timeUnit)}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    担当ロール
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProcess.responsibleRoles.map((role) => (
                      <Badge key={role} variant="outline">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    承認
                  </h3>
                  <p>{selectedProcess.requiresApproval ? '必要' : '不要'}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    状態
                  </h3>
                  <Badge
                    variant={
                      selectedProcess.status === 'active'
                        ? 'default'
                        : 'destructive'
                    }
                  >
                    {selectedProcess.status === 'active' ? '有効' : '無効'}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            {selectedProcess && (
              <Button
                variant="outline"
                onClick={() => handleEdit(selectedProcess)}
              >
                <Edit className="h-4 w-4 mr-2" />
                編集
              </Button>
            )}
            <DialogClose asChild>
              <Button>閉じる</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 工程編集・追加ダイアログ */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? '工程編集' : '新規工程追加'}
            </DialogTitle>
            <DialogDescription>
              工程の詳細情報を入力してください。工程名と説明は必須です。
            </DialogDescription>
          </DialogHeader>

          {currentProcess && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="process-name">工程名</Label>
                  <Input
                    id="process-name"
                    value={currentProcess.name}
                    onChange={(e) =>
                      setCurrentProcess({
                        ...currentProcess,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="process-category">カテゴリ</Label>
                  <Select
                    value={currentProcess.category}
                    onValueChange={(value) =>
                      setCurrentProcess({
                        ...currentProcess,
                        category: value,
                      })
                    }
                  >
                    <SelectTrigger id="process-category">
                      <SelectValue placeholder="カテゴリ選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">デザイン</SelectItem>
                      <SelectItem value="production">製造</SelectItem>
                      <SelectItem value="shipping">出荷</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="process-description">説明</Label>
                <Textarea
                  id="process-description"
                  value={currentProcess.description}
                  onChange={(e) =>
                    setCurrentProcess({
                      ...currentProcess,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="process-time">所要時間</Label>
                  <div className="flex gap-2">
                    <Input
                      id="process-time"
                      type="number"
                      value={currentProcess.estimatedTime}
                      onChange={(e) =>
                        setCurrentProcess({
                          ...currentProcess,
                          estimatedTime:
                            Number.parseInt(e.target.value, 10) || 0,
                        })
                      }
                    />
                    <Select
                      value={currentProcess.timeUnit}
                      onValueChange={(value) =>
                        setCurrentProcess({
                          ...currentProcess,
                          timeUnit: value,
                        })
                      }
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="単位" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">分</SelectItem>
                        <SelectItem value="hours">時間</SelectItem>
                        <SelectItem value="days">日</SelectItem>
                        <SelectItem value="weeks">週</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="process-roles">担当者ロール</Label>
                  <Select
                    value={
                      currentProcess.responsibleRoles.length > 0
                        ? currentProcess.responsibleRoles[0]
                        : ''
                    }
                    onValueChange={(value) =>
                      setCurrentProcess({
                        ...currentProcess,
                        responsibleRoles: [value],
                      })
                    }
                  >
                    <SelectTrigger id="process-roles">
                      <SelectValue placeholder="担当ロール選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="デザイナー">デザイナー</SelectItem>
                      <SelectItem value="オペレーター">オペレーター</SelectItem>
                      <SelectItem value="品質管理者">品質管理者</SelectItem>
                      <SelectItem value="配送担当">配送担当</SelectItem>
                      <SelectItem value="管理者">管理者</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="process-approval"
                    checked={currentProcess.requiresApproval}
                    onCheckedChange={(checked) =>
                      setCurrentProcess({
                        ...currentProcess,
                        requiresApproval: checked,
                      })
                    }
                  />
                  <Label htmlFor="process-approval">承認が必要</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="process-status"
                    checked={currentProcess.status === 'active'}
                    onCheckedChange={(checked) =>
                      setCurrentProcess({
                        ...currentProcess,
                        status: checked ? 'active' : 'inactive',
                      })
                    }
                  />
                  <Label htmlFor="process-status">アクティブ</Label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              キャンセル
            </Button>
            <Button onClick={handleSave}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
