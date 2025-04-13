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
import { Input } from '@kit/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import { Wrench, Sliders } from 'lucide-react';
import {
  SegmentedControl,
  SegmentedControlContent,
} from '../ui/SegmentedControl';

export function SystemSettings() {
  const [timezone, setTimezone] = useState('Asia/Tokyo');
  const [dateFormat, setDateFormat] = useState('yyyy-MM-dd');
  const [systemName, setSystemName] = useState(
    'ニイヌマ企画印刷 業務管理システム'
  );
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSegment, setActiveSegment] = useState('basic');

  const [logLevel, setLogLevel] = useState('info');
  const [maxUploadSize, setMaxUploadSize] = useState('10');
  const [autoLogout, setAutoLogout] = useState('30');
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  const segmentOptions = [
    { value: 'basic', label: '基本設定', icon: <Wrench className="h-4 w-4" /> },
    {
      value: 'advanced',
      label: '詳細設定',
      icon: <Sliders className="h-4 w-4" />,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>システム基本設定</CardTitle>
        <CardDescription>
          システム全体に関わる基本的な設定を行います。
        </CardDescription>
        <SegmentedControl
          options={segmentOptions}
          value={activeSegment}
          onValueChange={setActiveSegment}
          className="w-full max-w-md mt-4"
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <SegmentedControlContent value="basic" activeValue={activeSegment}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">タイムゾーン</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="タイムゾーンを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Tokyo">
                    Asia/Tokyo (GMT+9:00)
                  </SelectItem>
                  <SelectItem value="Asia/Osaka">
                    Asia/Osaka (GMT+9:00)
                  </SelectItem>
                  <SelectItem value="Asia/Seoul">
                    Asia/Seoul (GMT+9:00)
                  </SelectItem>
                  <SelectItem value="America/New_York">
                    America/New_York (GMT-5:00)
                  </SelectItem>
                  <SelectItem value="Europe/London">
                    Europe/London (GMT+0:00)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-format">日付形式</Label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger id="date-format">
                  <SelectValue placeholder="日付形式を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yyyy-MM-dd">yyyy-MM-dd</SelectItem>
                  <SelectItem value="yyyy/MM/dd">yyyy/MM/dd</SelectItem>
                  <SelectItem value="dd/MM/yyyy">dd/MM/yyyy</SelectItem>
                  <SelectItem value="MM/dd/yyyy">MM/dd/yyyy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="system-name">システム名</Label>
            <Input
              id="system-name"
              value={systemName}
              onChange={(e) => setSystemName(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
            <Label htmlFor="dark-mode">ダークモードをデフォルトにする</Label>
          </div>
        </SegmentedControlContent>

        <SegmentedControlContent value="advanced" activeValue={activeSegment}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="log-level">ログレベル</Label>
              <Select value={logLevel} onValueChange={setLogLevel}>
                <SelectTrigger id="log-level">
                  <SelectValue placeholder="ログレベルを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debug">デバッグ</SelectItem>
                  <SelectItem value="info">情報</SelectItem>
                  <SelectItem value="warning">警告</SelectItem>
                  <SelectItem value="error">エラー</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-upload">最大アップロードサイズ (MB)</Label>
              <Input
                id="max-upload"
                type="number"
                value={maxUploadSize}
                onChange={(e) => setMaxUploadSize(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="auto-logout">自動ログアウト時間 (分)</Label>
              <Input
                id="auto-logout"
                type="number"
                value={autoLogout}
                onChange={(e) => setAutoLogout(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 self-end">
              <Switch
                id="maintenance-mode"
                checked={isMaintenanceMode}
                onCheckedChange={setIsMaintenanceMode}
              />
              <Label htmlFor="maintenance-mode">メンテナンスモード</Label>
            </div>
          </div>
        </SegmentedControlContent>
      </CardContent>
    </Card>
  );
}
