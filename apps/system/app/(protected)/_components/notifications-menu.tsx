/**
 * 通知/アラートメニューコンポーネント
 * システム全体の通知を表示するドロップダウンメニュー
 */
'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';
import { Badge } from '@kit/ui/badge';

// 通知の型定義
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: Date;
}

export default function NotificationsMenu() {
  // モックデータ（実際の実装では API から取得）
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: '在庫アラート',
      message: '商品「用紙A4」の在庫が残り10個です',
      type: 'warning',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30分前
    },
    {
      id: '2',
      title: '新規注文',
      message: '新しい注文が登録されました',
      type: 'info',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2時間前
    },
    {
      id: '3',
      title: '納期超過',
      message: '注文ID:1234の納期が1日超過しています',
      type: 'error',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24時間前
    },
  ]);

  const [open, setOpen] = useState(false);

  // 未読通知の数
  const unreadCount = notifications.filter((n) => !n.read).length;

  // 通知を既読にする関数
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // すべて既読にする関数
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  // 通知の時間を整形する関数
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) {
      return `${diffMins}分前`;
    }

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      return `${diffHours}時間前`;
    }

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}日前`;
  };

  // 通知タイプに応じた背景色クラスを返す関数
  const getTypeBgClass = (type: Notification['type']) => {
    switch (type) {
      case 'error':
        return 'bg-destructive/10';
      case 'warning':
        return 'bg-warning/10';
      case 'success':
        return 'bg-success/10';
      default:
        return 'bg-primary/10';
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-primary-foreground/10 transition-colors cursor-pointer relative"
          onClick={() => setOpen(!open)}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">通知</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 max-h-[80vh] overflow-y-auto"
      >
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>通知</span>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="text-xs text-primary hover:underline"
            >
              すべて既読にする
            </button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start p-3 ${!notification.read ? getTypeBgClass(notification.type) : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex justify-between w-full">
                  <span className="font-medium text-sm">
                    {notification.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(notification.createdAt)}
                  </span>
                </div>
                <p className="text-xs mt-1">{notification.message}</p>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="py-4 text-center text-muted-foreground">
              通知はありません
            </div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">
          <span className="text-xs text-primary">すべての通知を見る</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
