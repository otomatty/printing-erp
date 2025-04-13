/**
 * システム管理用ヘッダーコンポーネント
 * アプリケーションのトップナビゲーションを提供します
 */
import type { User } from '@supabase/supabase-js';
import Link from 'next/link';
import NavigationMenu from './navigation-menu';
import UserMenu from './user-menu';
import NotificationsMenu from './notifications-menu';
import { Container } from '~/components/custom/container';

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
      <Container>
        <div className="py-3 flex items-center justify-between">
          {/* ロゴエリア */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-xl font-bold">業務管理システム</h1>
            </Link>
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
      </Container>
    </header>
  );
}
