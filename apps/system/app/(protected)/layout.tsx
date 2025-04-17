/**
 * 保護されたルートのレイアウト
 * 認証済みユーザー向けのレイアウトで、ヘッダーとメインコンテンツを含む
 */
import Header from './_components/header';
import { getUser } from '~/actions/auth';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // サーバーサイドでユーザー情報を取得
  const { user, customer } = await getUser();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* ヘッダーナビゲーション */}
      <Header user={user} />

      {/* メインコンテンツ */}
      <main className="flex-1 py-12">{children}</main>

      {/* フッター */}
      <footer className="bg-gray-200 dark:bg-gray-800 py-4 text-center text-gray-600 dark:text-gray-400 text-sm">
        <div className="container mx-auto px-4">
          © {new Date().getFullYear()} ニイヌマ企画印刷 All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
