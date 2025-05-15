import type { ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUser } from '../../actions/auth';
import {
  Home,
  FileText,
  Settings,
  Calendar,
  ShoppingCart,
  MessageSquare,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@kit/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@kit/ui/sheet';
import { LogoutButton } from '~/components/dashboard/logout-button';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  // ユーザー認証確認
  const { user } = await getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // サイドメニュー項目
  const menuItems = [
    { icon: Home, label: 'ダッシュボード', href: '/dashboard' },
    { icon: ShoppingCart, label: '新規注文', href: '/dashboard/orders/new' },
    { icon: FileText, label: '注文履歴', href: '/dashboard/orders' },
    { icon: Calendar, label: '納期カレンダー', href: '/dashboard/calendar' },
    { icon: MessageSquare, label: 'お問い合わせ', href: '/dashboard/contact' },
    { icon: Settings, label: '設定', href: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* モバイル用ヘッダー */}
      <header className="sticky top-0 z-40 bg-background border-b lg:hidden">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link
            href="/dashboard"
            className="font-bold text-xl flex items-center"
          >
            印刷会社
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="space-y-4 py-4">
                <div className="px-4 py-2 border-b">
                  <h2 className="text-lg font-semibold">印刷会社</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <nav className="space-y-1 px-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                  <LogoutButton variant="mobile" />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
