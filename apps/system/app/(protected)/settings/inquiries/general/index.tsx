// サーバーコンポーネント
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { AlertCircle } from 'lucide-react';
import NotificationSettingsTable from './notification-settings-table';
import { getNotificationSettings } from '~/actions/contact-notification-settings';

export default async function InquirySettingsPage() {
  // サーバーサイドでデータをフェッチ
  const result = await getNotificationSettings();
  const initialSettings = result.success && result.data ? result.data : [];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>通知設定</CardTitle>
            <CardDescription>
              お問い合わせの種類に応じた通知メールの送信先を管理します。
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <NotificationSettingsTable initialSettings={initialSettings} />

        {/* 注意喚起メッセージ */}
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4" />
          <span>
            ここで設定されたメールアドレスに通知が送信されます。「有効」になっていない設定は無視されます。「対象種別」が空欄の場合は全ての問い合わせで通知されます。
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
