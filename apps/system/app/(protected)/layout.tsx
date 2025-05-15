/**
 * 保護されたルートのレイアウト
 * 認証済みユーザー向けのレイアウトで、ヘッダーとメインコンテンツを含む
 */
import Header from './_components/header';
import type { User } from '@supabase/supabase-js';
import type { Database } from '@kit/supabase/database';
import { FabMenu } from '~/components/custom/fab';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // モックユーザー情報
  const mockUser: User = {
    id: 'user1',
    email: 'user@example.com',
    user_metadata: { first_name: '太郎', last_name: '山田' },
    app_metadata: { is_admin: true },
    aud: '',
    role: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as any;
  const mockAdminProfile: Database['system']['Tables']['admin_users']['Row'] = {
    id: 'admin1',
    auth_user_id: mockUser.id,
    email: 'admin@example.com',
    first_name: '花子',
    last_name: '佐藤',
    role: 'admin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* ヘッダーナビゲーション */}
        <Header user={mockUser} adminProfile={mockAdminProfile} />

        {/* メインコンテンツ */}
        <main className="flex-1 py-8 lg:py-12">{children}</main>

        {/* フッター */}
        <footer className="bg-gray-200 dark:bg-gray-800 py-4 text-center text-gray-600 dark:text-gray-400 text-sm">
          <div className="container mx-auto px-4">
            © {new Date().getFullYear()} 印刷会社 All Rights Reserved.
          </div>
        </footer>
      </div>
      <FabMenu />
    </>
  );
}
