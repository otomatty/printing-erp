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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@kit/ui/dialog';
import { Label } from '@kit/ui/label';
import { Input } from '@kit/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import { Pencil, Plus, Trash2 } from 'lucide-react';

interface InquiryCategory {
  id: number;
  name: string;
  priority: string;
}

export function InquiryCategories() {
  const [categories, setCategories] = useState<InquiryCategory[]>([
    { id: 1, name: '見積依頼', priority: '中' },
    { id: 2, name: '注文相談', priority: '高' },
    { id: 3, name: '納期確認', priority: '高' },
    { id: 4, name: '製品仕様', priority: '中' },
    { id: 5, name: 'クレーム', priority: '最高' },
    { id: 6, name: 'その他', priority: '低' },
  ]);

  const [editingCategory, setEditingCategory] =
    useState<InquiryCategory | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryPriority, setNewCategoryPriority] = useState('中');

  const handleEdit = (category: InquiryCategory) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryPriority(category.priority);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setNewCategoryName('');
    setNewCategoryPriority('中');
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (newCategoryName.trim() === '') return;

    if (editingCategory) {
      // 編集モード
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? { ...cat, name: newCategoryName, priority: newCategoryPriority }
            : cat
        )
      );
    } else {
      // 新規追加モード
      const newId = Math.max(0, ...categories.map((c) => c.id)) + 1;
      setCategories([
        ...categories,
        { id: newId, name: newCategoryName, priority: newCategoryPriority },
      ]);
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>問い合わせ種別設定</CardTitle>
        <CardDescription>
          問い合わせの種類と優先度を設定します。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <table className="w-full">
            <thead className="bg-muted">
              <tr className="text-left text-muted-foreground text-sm">
                <th className="px-3 py-2 font-medium">種別名</th>
                <th className="px-3 py-2 font-medium">デフォルト優先度</th>
                <th className="px-3 py-2 font-medium">アクション</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-3 py-2">{category.name}</td>
                  <td className="px-3 py-2">{category.priority}</td>
                  <td className="px-3 py-2">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(category)}
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        編集
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        削除
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button size="sm" onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-1" />
            種別追加
          </Button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory
                  ? '問い合わせ種別を編集'
                  : '問い合わせ種別を追加'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">種別名</Label>
                <Input
                  id="category-name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-priority">デフォルト優先度</Label>
                <Select
                  value={newCategoryPriority}
                  onValueChange={setNewCategoryPriority}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="優先度を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="最高">最高</SelectItem>
                    <SelectItem value="高">高</SelectItem>
                    <SelectItem value="中">中</SelectItem>
                    <SelectItem value="低">低</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  キャンセル
                </Button>
                <Button onClick={handleSave}>保存</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
