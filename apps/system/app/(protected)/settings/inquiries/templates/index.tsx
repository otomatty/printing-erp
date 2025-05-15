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
} from '@kit/ui/dialog';
import { Label } from '@kit/ui/label';
import { Input } from '@kit/ui/input';
import { Textarea } from '@kit/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import { Pencil, Plus, FileText, Trash2 } from 'lucide-react';

interface ResponseTemplate {
  id: number;
  name: string;
  scene: string;
  content: string;
}

export default function ResponseTemplatesPage() {
  const [templates, setTemplates] = useState<ResponseTemplate[]>([
    {
      id: 1,
      name: '初期応答',
      scene: '新規問い合わせ',
      content:
        'お問い合わせありがとうございます。印刷会社でございます。\n\nご連絡いただいた件について確認させていただきます。担当者より改めてご連絡いたしますので、今しばらくお待ちください。',
    },
    {
      id: 2,
      name: '見積回答',
      scene: '見積依頼',
      content:
        'お問い合わせいただきありがとうございます。\n\nご依頼いただいた商品の見積書を添付いたします。ご不明点がございましたら、お気軽にお問い合わせください。',
    },
    {
      id: 3,
      name: '納期確認回答',
      scene: '納期確認',
      content:
        'お問い合わせありがとうございます。\n\nご注文いただいております商品の現在の状況は「製造中」となっております。予定通り[納期]に納品できる見込みです。',
    },
    {
      id: 4,
      name: 'クレーム対応',
      scene: 'クレーム',
      content:
        'この度はご迷惑をおかけし、誠に申し訳ございません。\n\nご指摘いただいた件について、早急に確認し対応いたします。改めて担当者よりご連絡させていただきます。',
    },
    {
      id: 5,
      name: 'お礼',
      scene: '問い合わせ完了',
      content:
        'お問い合わせいただきありがとうございました。\n\n今後とも印刷会社をよろしくお願いいたします。',
    },
  ]);

  const [editingTemplate, setEditingTemplate] =
    useState<ResponseTemplate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewingTemplate, setViewingTemplate] =
    useState<ResponseTemplate | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateScene, setNewTemplateScene] = useState('');
  const [newTemplateContent, setNewTemplateContent] = useState('');

  const handleEdit = (template: ResponseTemplate) => {
    setEditingTemplate(template);
    setNewTemplateName(template.name);
    setNewTemplateScene(template.scene);
    setNewTemplateContent(template.content);
    setIsDialogOpen(true);
  };

  const handleView = (template: ResponseTemplate) => {
    setViewingTemplate(template);
    setIsViewDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingTemplate(null);
    setNewTemplateName('');
    setNewTemplateScene('');
    setNewTemplateContent('');
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (newTemplateName.trim() === '' || newTemplateContent.trim() === '')
      return;

    if (editingTemplate) {
      // 編集モード
      setTemplates(
        templates.map((t) =>
          t.id === editingTemplate.id
            ? {
                ...t,
                name: newTemplateName,
                scene: newTemplateScene,
                content: newTemplateContent,
              }
            : t
        )
      );
    } else {
      // 新規追加モード
      const newId = Math.max(0, ...templates.map((t) => t.id)) + 1;
      setTemplates([
        ...templates,
        {
          id: newId,
          name: newTemplateName,
          scene: newTemplateScene,
          content: newTemplateContent,
        },
      ]);
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setTemplates(templates.filter((t) => t.id !== id));
  };

  const sceneOptions = [
    '新規問い合わせ',
    '見積依頼',
    '納期確認',
    '仕様相談',
    'クレーム',
    '問い合わせ完了',
    'その他',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>応答テンプレート</CardTitle>
        <CardDescription>
          よく使う返信文のテンプレートを設定します。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <table className="w-full">
            <thead className="bg-muted">
              <tr className="text-left text-muted-foreground text-sm">
                <th className="px-3 py-2 font-medium">テンプレート名</th>
                <th className="px-3 py-2 font-medium">使用シーン</th>
                <th className="px-3 py-2 font-medium">アクション</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted">
              {templates.map((template) => (
                <tr key={template.id}>
                  <td className="px-3 py-2">{template.name}</td>
                  <td className="px-3 py-2">{template.scene}</td>
                  <td className="px-3 py-2">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(template)}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        表示
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(template)}
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        編集
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleDelete(template.id)}
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
            テンプレート追加
          </Button>
        </div>

        {/* 表示ダイアログ */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>{viewingTemplate?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  使用シーン
                </p>
                <p className="mt-1">{viewingTemplate?.scene}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  テンプレート内容
                </p>
                <div className="mt-1 p-3 border rounded-md bg-muted/30 whitespace-pre-wrap">
                  {viewingTemplate?.content}
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  閉じる
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* 編集ダイアログ */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>
                {editingTemplate ? 'テンプレートを編集' : 'テンプレートを追加'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">テンプレート名</Label>
                <Input
                  id="template-name"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-scene">使用シーン</Label>
                <Select
                  value={newTemplateScene}
                  onValueChange={setNewTemplateScene}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="使用シーンを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {sceneOptions.map((scene) => (
                      <SelectItem key={scene} value={scene}>
                        {scene}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-content">テンプレート内容</Label>
                <Textarea
                  id="template-content"
                  value={newTemplateContent}
                  onChange={(e) => setNewTemplateContent(e.target.value)}
                  className="min-h-[200px]"
                />
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
