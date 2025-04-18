'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { Label } from '@kit/ui/label';
import { Switch } from '@kit/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import { AlertTriangle } from 'lucide-react';

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(false);
  const [notificationFrequency, setNotificationFrequency] =
    useState('realtime');
  const [digestTime, setDigestTime] = useState('09:00');

  return (
    <Card>
      <CardHeader>
        <CardTitle>通知設定</CardTitle>
        <CardDescription>システム通知に関する設定を行います。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>メール通知</Label>
              <p className="text-sm text-muted-foreground">
                重要な更新をメールで受け取る
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>システム内通知</Label>
              <p className="text-sm text-muted-foreground">
                システム内での通知を有効にする
              </p>
            </div>
            <Switch
              id="system-notifications"
              checked={systemNotifications}
              onCheckedChange={setSystemNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>デスクトップ通知</Label>
              <p className="text-sm text-muted-foreground">
                ブラウザのデスクトップ通知を有効にする
              </p>
            </div>
            <Switch
              id="desktop-notifications"
              checked={desktopNotifications}
              onCheckedChange={setDesktopNotifications}
            />
          </div>

          <div className="pt-2 border-t">
            <Label className="mb-2 block">通知配信設定</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="notification-frequency" className="text-sm">
                  配信頻度
                </Label>
                <Select
                  value={notificationFrequency}
                  onValueChange={setNotificationFrequency}
                >
                  <SelectTrigger id="notification-frequency">
                    <SelectValue placeholder="頻度を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">リアルタイム</SelectItem>
                    <SelectItem value="hourly">1時間ごと</SelectItem>
                    <SelectItem value="daily">
                      1日1回（ダイジェスト）
                    </SelectItem>
                    <SelectItem value="weekly">
                      週1回（ダイジェスト）
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="digest-time" className="text-sm">
                  ダイジェスト配信時間
                </Label>
                <Select
                  value={digestTime}
                  onValueChange={setDigestTime}
                  disabled={
                    notificationFrequency !== 'daily' &&
                    notificationFrequency !== 'weekly'
                  }
                >
                  <SelectTrigger id="digest-time">
                    <SelectValue placeholder="時間を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">午前9:00</SelectItem>
                    <SelectItem value="12:00">正午12:00</SelectItem>
                    <SelectItem value="18:00">午後6:00</SelectItem>
                    <SelectItem value="21:00">午後9:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t">
            <Label className="mb-2 block">通知カテゴリ</Label>
            <div className="space-y-2">
              {[
                { id: 'orders', name: '受注・納品関連', checked: true },
                { id: 'inquiries', name: '問い合わせ関連', checked: true },
                { id: 'production', name: '製造進捗関連', checked: true },
                { id: 'system', name: 'システム関連', checked: false },
              ].map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Switch
                    id={`category-${category.id}`}
                    defaultChecked={category.checked}
                  />
                  <Label htmlFor={`category-${category.id}`}>
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 p-2 bg-blue-50 text-blue-700 rounded text-sm mt-4">
            <AlertTriangle className="h-4 w-4" />
            <p>いくつかの重要な通知は、設定に関わらず常に配信されます。</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
