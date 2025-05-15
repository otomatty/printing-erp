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

// モックデフォルト値
const defaultUser: User = {
  id: 'user1',
  email: 'user@example.com',
  user_metadata: { first_name: '太郎', last_name: '山田' },
  app_metadata: { is_admin: true },
  aud: '',
  role: '',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
} as User;
const defaultAdminProfile: Database['system']['Tables']['admin_users']['Row'] =
  {
    id: 'admin1',
    auth_user_id: 'user1',
    email: 'admin@example.com',
    first_name: '花子',
    last_name: '佐藤',
    role: 'admin',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

interface HeaderProps {
  user: User | null;
  /** admin_usersテーブルのレコード */
  adminProfile: Database['system']['Tables']['admin_users']['Row'] | null;
}

export default function Header({ user, adminProfile }: HeaderProps) {
  const displayUser = user ?? defaultUser;
  const displayAdmin = adminProfile ?? defaultAdminProfile;
  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
      <Container maxWidth="6xl">
        <div className="py-3 flex items-center justify-between">
          {/* ロゴエリア */}
          <div className="flex items-center">
            <Link href="/">
              <Image src={logo} alt="印刷会社" className="h-12 w-auto" />
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
            <UserMenu user={displayUser} adminProfile={displayAdmin} />
          </div>
        </div>
      </Container>
    </header>
  );
}
