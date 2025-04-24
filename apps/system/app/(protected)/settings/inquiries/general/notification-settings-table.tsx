'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@kit/ui/button';
import { Input } from '@kit/ui/input';
import { Switch } from '@kit/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@kit/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@kit/ui/form';
import { toast } from 'sonner';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import type { Database } from '@kit/supabase/database';
import {
  getNotificationSettings,
  addNotificationSetting,
  updateNotificationSetting,
  deleteNotificationSetting,
} from '~/_actions/contact-notification-settings';

// DBのテーブル型
type NotificationSetting =
  Database['system']['Tables']['contact_notification_settings']['Row'];

// フォームバリデーションスキーマ (Zod) - アクションのものと同期させる
const settingFormSchema = z.object({
  id: z.string().uuid().optional(), // 更新時のみ
  name: z.string().min(1, '設定名は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  // inquiryType は空文字列を null に変換
  inquiryType: z
    .string()
    .optional()
    .transform((val) => (val === '' || val === undefined ? null : val))
    .nullable(),
  isActive: z.boolean().default(true),
});

type SettingFormData = z.infer<typeof settingFormSchema>;

// デフォルト値 (新規作成時)
const defaultValues: SettingFormData = {
  name: '',
  email: '',
  inquiryType: null,
  isActive: true,
};

// props の型定義
interface NotificationSettingsTableProps {
  initialSettings: NotificationSetting[];
}

export default function NotificationSettingsTable({
  initialSettings,
}: NotificationSettingsTableProps) {
  const [settings, setSettings] =
    useState<NotificationSetting[]>(initialSettings);
  const [isSaving, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSetting, setEditingSetting] =
    useState<NotificationSetting | null>(null); // 編集中の設定

  const form = useForm<SettingFormData>({
    resolver: zodResolver(settingFormSchema),
    defaultValues: defaultValues,
  });

  // ダイアログを開く処理 (新規 or 編集)
  const handleOpenDialog = (setting: NotificationSetting | null = null) => {
    setEditingSetting(setting);
    if (setting) {
      // 編集モード: フォームに既存の値をセット
      form.reset({
        id: setting.id,
        name: setting.name,
        email: setting.email,
        inquiryType: setting.inquiry_type, // DBのカラム名に合わせる
        isActive: setting.is_active, // DBのカラム名に合わせる
      });
    } else {
      // 新規モード: フォームをデフォルト値にリセット
      form.reset(defaultValues);
    }
    setIsDialogOpen(true);
  };

  // フォーム送信処理 (追加 or 更新)
  const onSubmit = (values: SettingFormData) => {
    startTransition(async () => {
      const formData = new FormData();
      // Zodでパースした後の `values` を使う
      for (const [key, value] of Object.entries(values)) {
        if (value !== null && value !== undefined) {
          if (typeof value === 'boolean') {
            // isActive は 'on' または何も送らない (未チェック時)
            // サーバーアクションの rawData.isActive === 'on' を期待
            if (value) {
              formData.append(key, 'on');
            }
          } else if (key === 'inquiryType') {
            // inquiryType が null の場合は空文字列 '' を送る
            formData.append(key, value === null ? '' : String(value));
          } else {
            // name, email, id (存在する場合)
            formData.append(key, String(value));
          }
        }
        // value が null や undefined の場合は FormData に追加しない
        // (inquiryType は上で処理済み)
      }

      // id が存在しない場合は FormData から削除 (新規作成のため)
      // ※ UpdateSchema で id は必須なので、values.id が無ければ addNotificationSetting が呼ばれる想定
      // このロジックは action 選択の前なので不要かもしれないが、念のため残す
      if (!values.id) {
        formData.delete('id');
      } else {
        // 更新の場合は id を含める
        formData.append('id', values.id);
      }

      const action = values.id
        ? updateNotificationSetting
        : addNotificationSetting;
      const result = await action(formData);

      if (result.success) {
        toast.success(result.message || '設定を保存しました。');
        setIsDialogOpen(false);
        // データ再取得してリストを更新
        const loadResult = await getNotificationSettings();
        if (loadResult.success && loadResult.data) {
          setSettings(loadResult.data);
        }
      } else {
        toast.error(result.error || '設定の保存に失敗しました。');
      }
    });
  };

  // 削除処理
  const handleDelete = (id: string) => {
    // 確認ダイアログを表示
    if (
      !window.confirm(
        '本当にこの設定を削除しますか？\nこの操作は元に戻せません。'
      )
    ) {
      return;
    }
    startTransition(async () => {
      const result = await deleteNotificationSetting(id);
      if (result.success) {
        toast.success(result.message || '設定を削除しました。');
        // データ再取得してリストから削除された項目を反映
        const loadResult = await getNotificationSettings();
        if (loadResult.success && loadResult.data) {
          setSettings(loadResult.data);
        }
      } else {
        toast.error(result.error || '設定の削除に失敗しました。');
      }
    });
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => handleOpenDialog()} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          新規追加
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>設定名</TableHead>
            <TableHead>メールアドレス</TableHead>
            <TableHead>対象種別</TableHead>
            <TableHead>有効</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {settings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24">
                通知設定が登録されていません。
              </TableCell>
            </TableRow>
          ) : (
            settings.map((setting) => (
              <TableRow key={setting.id}>
                <TableCell className="font-medium">{setting.name}</TableCell>
                <TableCell>{setting.email}</TableCell>
                <TableCell className="text-muted-foreground">
                  {setting.inquiry_type || '全種別共通'}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      setting.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {setting.is_active ? '有効' : '無効'}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenDialog(setting)}
                    disabled={isSaving}
                    aria-label="編集"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(setting.id)}
                    disabled={isSaving}
                    aria-label="削除"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>
              {editingSetting ? '通知設定の編集' : '新しい通知設定'}
            </DialogTitle>
            <DialogDescription>
              通知先の名前、メールアドレス、対象の問い合わせ種別（任意）を入力してください。
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 pt-2"
            >
              {/* id は更新時に必要だが、表示はしない */}
              {editingSetting && (
                <input type="hidden" {...form.register('id')} />
              )}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>設定名</FormLabel>
                    <FormControl>
                      <Input placeholder="例: 印刷部門担当者" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>通知先メールアドレス</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="notify@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inquiryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>対象の問い合わせ種別</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="例: print-services (空欄で全種別共通)"
                        // null を空文字列 '' として扱う
                        {...field}
                        value={field.value ?? ''}
                        // '' が入力されたら null に変換して Zod/DB に渡す
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === '' ? null : e.target.value
                          )
                        }
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground pt-1">
                      特定の種別のみ通知する場合に入力します (例:
                      digital-services)。
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>通知を有効にする</FormLabel>
                      <p className="text-xs text-muted-foreground">
                        この設定に基づいて通知メールを送信します。
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="通知の有効/無効"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isSaving}>
                    キャンセル
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? '保存中...' : editingSetting ? '更新' : '追加'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
