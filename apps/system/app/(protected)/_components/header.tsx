/**
 * システム管理用ヘッダーコンポーネント
 * アプリケーションのトップナビゲーションを提供します
 */
import type { User } from '@supabase/supabase-js';
import type { Database } from '@kit/supabase/database';
import Image from 'next/image';
import Link from 'next/link';
import NavigationMenu from './navigation-menu';
import UserMenu from './user-menu';
// import NotificationsMenu from './notifications-menu';
import { Container } from '~/components/custom/container';
import logo from '~/public/images/logo/erp-logo-white.png';

interface HeaderProps {
  user: User | null;
  /** admin_usersテーブルのレコード */
  adminProfile: Database['system']['Tables']['admin_users']['Row'] | null;
}

export default function Header({ user, adminProfile }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
      <Container maxWidth="6xl">
        <div className="py-3 flex items-center justify-between">
          {/* ロゴエリア */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src={logo}
                alt="ニイヌマ企画印刷"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/* ナビゲーションメニュー */}
              <NavigationMenu />

              {/* 通知/アラートメニュー */}
              {/* <NotificationsMenu /> */}
            </div>

            {/* ユーザーメニュー */}
            <UserMenu user={user} adminProfile={adminProfile} />
          </div>
        </div>
      </Container>
    </header>
  );
}
