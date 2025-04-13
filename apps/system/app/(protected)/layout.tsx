/**
 * 保護されたルートのレイアウト
 * 認証済みユーザー向けのレイアウトで、サイドバーとメインコンテンツを含む
 */
import Sidebar from './_components/Sidebar';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* サイドナビゲーション */}
      <Sidebar />

      {/* メインコンテンツ */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
