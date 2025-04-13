/**
 * システム管理用ヘッダーコンポーネント
 * アプリケーションのトップナビゲーションを提供します
 */
import type { User } from '@supabase/supabase-js';
import NavigationMenu from './navigation-menu';
import UserMenu from './user-menu';
import NotificationsMenu from './notifications-menu';

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* ロゴエリア */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold">業務管理システム</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* ナビゲーションメニュー */}
            <NavigationMenu />

            {/* 通知/アラートメニュー */}
            <NotificationsMenu />
          </div>

          {/* ユーザーメニュー */}
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
}
