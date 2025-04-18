'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Settings,
  Users,
  Building2,
  Layers,
  // Package, // 必要なら追加
  // Warehouse,
  // CreditCard,
  // Cog,
} from 'lucide-react';
import { cn } from '@kit/ui/utils';

const navigationItems = [
  { href: '/settings/general', label: '基本設定', icon: Settings },
  { href: '/settings/users', label: 'ユーザー', icon: Users },
  { href: '/settings/company', label: '会社情報', icon: Building2 },
  { href: '/settings/inquiries', label: '問い合わせ', icon: Layers },
  // { href: '/settings/orders', label: '受注管理', icon: Package },
  // { href: '/settings/inventory', label: '在庫管理', icon: Warehouse },
  // { href: '/settings/billing', label: '請求管理', icon: CreditCard },
  // { href: '/settings/system', label: 'システム管理', icon: Cog },
];

export default function SettingsNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-1">
      <h2 className="text-lg font-semibold mb-4 px-2">システム設定</h2>
      {navigationItems.map((item) => {
        const isActive = pathname.startsWith(item.href); // startsWithで判定した方が良いかも
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
