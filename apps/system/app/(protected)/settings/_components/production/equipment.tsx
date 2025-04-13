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
import { Textarea } from '@kit/ui/textarea';
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  AlertTriangle,
  Server,
  Info,
  ArrowLeft,
} from 'lucide-react';
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
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@kit/ui/popover';
import { Calendar as CalendarComponent } from '@kit/ui/calendar';

interface Equipment {
  id: string;
  name: string;
  type: string;
  model: string;
  serialNumber: string;
  location: string;
  description: string;
  purchaseDate: Date | null;
  maintenanceDate: Date | null;
  status: 'operational' | 'maintenance' | 'broken';
  assignedTo: string;
  notes: string;
}

export function EquipmentSettings() {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: 'eq1',
      name: 'オフセット印刷機A',
      type: '印刷機',
      model: 'RYOBI 758',
      serialNumber: 'RB7581234',
      location: '1F 工場エリアA',
      description: '8色刷りオフセット印刷機',
      purchaseDate: new Date('2019-05-15'),
      maintenanceDate: new Date('2023-04-10'),
      status: 'operational',
      assignedTo: '製造部',
      notes: '月次メンテナンス済み',
    },
    {
      id: 'eq2',
      name: 'デジタル印刷機B',
      type: '印刷機',
      model: 'Canon imagePRESS C10000VP',
      serialNumber: 'CP100005678',
      location: '1F 工場エリアB',
      description: '高速デジタルカラー印刷機',
      purchaseDate: new Date('2021-02-20'),
      maintenanceDate: new Date('2023-05-05'),
      status: 'operational',
      assignedTo: '製造部',
      notes: '',
    },
    {
      id: 'eq3',
      name: '断裁機C',
      type: '後加工機',
      model: 'Polar 115',
      serialNumber: 'PL1159876',
      location: '1F 後加工エリア',
      description: '断裁機',
      purchaseDate: new Date('2020-08-10'),
      maintenanceDate: new Date('2023-03-15'),
      status: 'maintenance',
      assignedTo: '製造部',
      notes: '刃の交換が必要',
    },
    {
      id: 'eq4',
      name: '製本機D',
      type: '後加工機',
      model: 'Horizon BQ-470',
      serialNumber: 'HBQ4704321',
      location: '1F 後加工エリア',
      description: '無線綴じ製本機',
      purchaseDate: new Date('2018-11-25'),
      maintenanceDate: new Date('2023-02-28'),
      status: 'broken',
      assignedTo: '製造部',
      notes: '修理依頼中',
    },
    {
      id: 'eq5',
      name: 'カラースキャナE',
      type: '入力機器',
      model: 'Epson Expression 12000XL',
      serialNumber: 'EE12000987',
      location: '2F デザインルーム',
      description: '高解像度フラットベッドスキャナ',
      purchaseDate: new Date('2022-01-15'),
      maintenanceDate: null,
      status: 'operational',
      assignedTo: 'デザイン部',
      notes: '',
    },
  ]);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState<Equipment | null>(
    null
  );
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddNew = () => {
    setCurrentEquipment({
      id: `eq${equipment.length + 1}`,
      name: '',
      type: '',
      model: '',
      serialNumber: '',
      location: '',
      description: '',
      purchaseDate: null,
      maintenanceDate: null,
      status: 'operational',
      assignedTo: '',
      notes: '',
    });
    setIsEditMode(false);
    setIsEditDialogOpen(true);
  };

  const handleEdit = (eq: Equipment) => {
    setCurrentEquipment({ ...eq });
    setIsEditMode(true);
    setIsEditDialogOpen(true);
  };

  const handleEquipmentSelect = (eq: Equipment) => {
    setSelectedEquipment(eq);
    setIsDetailDialogOpen(true);
  };

  const handleSave = () => {
    if (!currentEquipment) return;

    if (isEditMode) {
      setEquipment(
        equipment.map((eq) =>
          eq.id === currentEquipment.id ? currentEquipment : eq
        )
      );
    } else {
      setEquipment([...equipment, currentEquipment]);
    }
    setIsEditDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setEquipment(equipment.filter((eq) => eq.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return (
          <Badge variant="default" className="bg-green-500">
            稼働中
          </Badge>
        );
      case 'maintenance':
        return (
          <Badge
            variant="outline"
            className="text-yellow-500 border-yellow-500"
          >
            メンテナンス中
          </Badge>
        );
      case 'broken':
        return <Badge variant="destructive">故障中</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '未設定';
    return format(date, 'yyyy年MM月dd日', { locale: ja });
  };

  const isMaintenanceNeeded = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    return date < threeMonthsAgo;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>設備マスタ設定</CardTitle>
            <CardDescription>
              製造設備のマスタデータを管理します。設備の追加、状態の更新、メンテナンス状況の記録を行います。
            </CardDescription>
          </div>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            新規設備登録
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">設備名</TableHead>
                <TableHead className="w-[100px]">種別</TableHead>
                <TableHead className="w-[120px]">設置場所</TableHead>
                <TableHead className="w-[120px]">最終メンテナンス</TableHead>
                <TableHead className="w-[100px]">状態</TableHead>
                <TableHead className="w-[100px]">担当</TableHead>
                <TableHead className="w-[120px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipment.map((eq) => (
                <TableRow
                  key={eq.id}
                  className="cursor-pointer hover:bg-accent/50"
                  onClick={() => handleEquipmentSelect(eq)}
                >
                  <TableCell className="font-medium">{eq.name}</TableCell>
                  <TableCell>{eq.type}</TableCell>
                  <TableCell>{eq.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {formatDate(eq.maintenanceDate)}
                      {isMaintenanceNeeded(eq.maintenanceDate) && (
                        <AlertTriangle className="h-4 w-4 ml-2 text-yellow-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(eq.status)}</TableCell>
                  <TableCell>{eq.assignedTo}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(eq);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(eq.id);
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

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>設備詳細</DialogTitle>
          </DialogHeader>

          {selectedEquipment && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    設備名
                  </h3>
                  <p className="text-lg font-medium">
                    {selectedEquipment.name}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    種別
                  </h3>
                  <Badge variant="outline" className="text-sm">
                    {selectedEquipment.type}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    型番・モデル
                  </h3>
                  <p>{selectedEquipment.model}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    シリアル番号
                  </h3>
                  <p>{selectedEquipment.serialNumber}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    設置場所
                  </h3>
                  <p>{selectedEquipment.location}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    担当部署
                  </h3>
                  <p>{selectedEquipment.assignedTo}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    購入日
                  </h3>
                  <p>{formatDate(selectedEquipment.purchaseDate)}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    最終メンテナンス日
                  </h3>
                  <div className="flex items-center">
                    <p>{formatDate(selectedEquipment.maintenanceDate)}</p>
                    {isMaintenanceNeeded(selectedEquipment.maintenanceDate) && (
                      <AlertTriangle className="h-4 w-4 ml-2 text-yellow-500" />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    状態
                  </h3>
                  {getStatusBadge(selectedEquipment.status)}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    詳細説明
                  </h3>
                  <p>
                    {selectedEquipment.description || '詳細説明はありません'}
                  </p>
                </div>

                {selectedEquipment.notes && (
                  <div className="space-y-2 md:col-span-2">
                    <h3 className="font-medium text-sm text-muted-foreground">
                      備考
                    </h3>
                    <p>{selectedEquipment.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            {selectedEquipment && (
              <Button
                variant="outline"
                onClick={() => handleEdit(selectedEquipment)}
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? '設備編集' : '新規設備登録'}
            </DialogTitle>
            <DialogDescription>
              設備の詳細情報を入力してください。設備名と種別は必須です。
            </DialogDescription>
          </DialogHeader>

          {currentEquipment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="equipment-name">設備名</Label>
                  <Input
                    id="equipment-name"
                    value={currentEquipment.name}
                    onChange={(e) =>
                      setCurrentEquipment({
                        ...currentEquipment,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipment-type">種別</Label>
                  <Select
                    value={currentEquipment.type}
                    onValueChange={(value) =>
                      setCurrentEquipment({
                        ...currentEquipment,
                        type: value,
                      })
                    }
                  >
                    <SelectTrigger id="equipment-type">
                      <SelectValue placeholder="種別を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="印刷機">印刷機</SelectItem>
                      <SelectItem value="後加工機">後加工機</SelectItem>
                      <SelectItem value="入力機器">入力機器</SelectItem>
                      <SelectItem value="出力機器">出力機器</SelectItem>
                      <SelectItem value="その他">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="equipment-model">型番・モデル</Label>
                  <Input
                    id="equipment-model"
                    value={currentEquipment.model}
                    onChange={(e) =>
                      setCurrentEquipment({
                        ...currentEquipment,
                        model: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipment-serial">シリアル番号</Label>
                  <Input
                    id="equipment-serial"
                    value={currentEquipment.serialNumber}
                    onChange={(e) =>
                      setCurrentEquipment({
                        ...currentEquipment,
                        serialNumber: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipment-location">設置場所</Label>
                <Input
                  id="equipment-location"
                  value={currentEquipment.location}
                  onChange={(e) =>
                    setCurrentEquipment({
                      ...currentEquipment,
                      location: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="equipment-purchase">購入日</Label>
                  <div className="flex">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {currentEquipment.purchaseDate
                            ? formatDate(currentEquipment.purchaseDate)
                            : '日付を選択'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={currentEquipment.purchaseDate || undefined}
                          onSelect={(date) =>
                            setCurrentEquipment({
                              ...currentEquipment,
                              purchaseDate: date || null,
                            })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipment-maintenance">
                    最終メンテナンス日
                  </Label>
                  <div className="flex">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {currentEquipment.maintenanceDate
                            ? formatDate(currentEquipment.maintenanceDate)
                            : '日付を選択'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={
                            currentEquipment.maintenanceDate || undefined
                          }
                          onSelect={(date) =>
                            setCurrentEquipment({
                              ...currentEquipment,
                              maintenanceDate: date || null,
                            })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="equipment-status">設備状態</Label>
                  <Select
                    value={currentEquipment.status}
                    onValueChange={(
                      value: 'operational' | 'maintenance' | 'broken'
                    ) =>
                      setCurrentEquipment({
                        ...currentEquipment,
                        status: value,
                      })
                    }
                  >
                    <SelectTrigger id="equipment-status">
                      <SelectValue placeholder="状態を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operational">稼働中</SelectItem>
                      <SelectItem value="maintenance">
                        メンテナンス中
                      </SelectItem>
                      <SelectItem value="broken">故障中</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipment-assigned">担当部署</Label>
                  <Select
                    value={currentEquipment.assignedTo}
                    onValueChange={(value) =>
                      setCurrentEquipment({
                        ...currentEquipment,
                        assignedTo: value,
                      })
                    }
                  >
                    <SelectTrigger id="equipment-assigned">
                      <SelectValue placeholder="担当を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="製造部">製造部</SelectItem>
                      <SelectItem value="デザイン部">デザイン部</SelectItem>
                      <SelectItem value="営業部">営業部</SelectItem>
                      <SelectItem value="総務部">総務部</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipment-description">詳細説明</Label>
                <Textarea
                  id="equipment-description"
                  value={currentEquipment.description}
                  onChange={(e) =>
                    setCurrentEquipment({
                      ...currentEquipment,
                      description: e.target.value,
                    })
                  }
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipment-notes">備考</Label>
                <Textarea
                  id="equipment-notes"
                  value={currentEquipment.notes}
                  onChange={(e) =>
                    setCurrentEquipment({
                      ...currentEquipment,
                      notes: e.target.value,
                    })
                  }
                  rows={2}
                />
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
