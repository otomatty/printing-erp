/**
 * アプリケーションメニューコンポーネント
 * Googleアプリのように1つのボタンをクリックするとメニューが表示される
 */
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@kit/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';
import {
  Printer,
  Users,
  FileText,
  Package,
  Settings,
  Calculator,
  MessageSquare,
  CreditCard,
  Bell,
  LayoutDashboard,
  FileEdit,
  Grip,
} from 'lucide-react';

interface MenuItem {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

export default function NavigationMenu() {
  const [open, setOpen] = useState(false);

  const menuItems: MenuItem[] = [
    // 業務管理カテゴリ
    {
      href: '/system',
      title: 'ダッシュボード',
      description: 'システム全体の状況を確認',
      icon: <LayoutDashboard className="h-5 w-5" />,
      category: '業務管理',
    },
    {
      href: '/system/orders',
      title: '注文管理',
      description: '注文の登録・編集・確認',
      icon: <FileText className="h-5 w-5" />,
      category: '業務管理',
    },
    {
      href: '/system/production',
      title: '製造管理',
      description: '印刷・製造工程の管理',
      icon: <Printer className="h-5 w-5" />,
      category: '業務管理',
    },
    {
      href: '/system/inventory',
      title: '在庫管理',
      description: '資材・製品の在庫管理',
      icon: <Package className="h-5 w-5" />,
      category: '業務管理',
    },

    // 顧客対応カテゴリ
    {
      href: '/system/customers',
      title: '顧客管理',
      description: '顧客情報の管理・編集',
      icon: <Users className="h-5 w-5" />,
      category: '顧客対応',
    },
    {
      href: '/system/quotes',
      title: '見積り管理',
      description: '見積りの作成・履歴管理',
      icon: <Calculator className="h-5 w-5" />,
      category: '顧客対応',
    },
    {
      href: '/system/inquiries',
      title: 'お問い合わせ管理',
      description: '問い合わせ対応の管理',
      icon: <MessageSquare className="h-5 w-5" />,
      category: '顧客対応',
    },
    {
      href: '/system/billing',
      title: '請求・入金管理',
      description: '請求書発行・入金状況確認',
      icon: <CreditCard className="h-5 w-5" />,
      category: '顧客対応',
    },

    // コンテンツ管理カテゴリ
    {
      href: '/system/news',
      title: 'お知らせ管理',
      description: 'ホームページのお知らせ更新',
      icon: <Bell className="h-5 w-5" />,
      category: 'コンテンツ管理',
    },
    {
      href: '/system/contents',
      title: 'コンテンツ編集',
      description: 'サイトコンテンツの編集',
      icon: <FileEdit className="h-5 w-5" />,
      category: 'コンテンツ管理',
    },

    // システム設定カテゴリ
    {
      href: '/system/settings',
      title: '設定',
      description: 'システム全体の設定管理',
      icon: <Settings className="h-5 w-5" />,
      category: 'システム設定',
    },
  ];

  // カテゴリーごとにアイテムをグループ化
  const groupedMenuItems = menuItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category]?.push(item);
      return acc;
    },
    {} as Record<string, MenuItem[]>
  );

  // カテゴリー順序を維持するための配列
  const categories = ['業務管理', '顧客対応', 'コンテンツ管理', 'システム設定'];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-primary-foreground/10 transition-colors cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <Grip className="h-6 w-6" />
          <span className="sr-only">アプリケーションメニュー</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[320px] sm:w-[500px] md:w-[600px] p-4 max-h-[80vh] overflow-y-auto"
      >
        <div className="flex flex-col space-y-6">
          {categories.map((category) => (
            <div key={category} className="space-y-3">
              <h3 className="font-medium text-sm text-muted-foreground border-b pb-1">
                {category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {groupedMenuItems[category]?.map((item) => (
                  <MenuLink
                    key={item.href}
                    href={item.href}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * メニューリンク項目
 */
interface MenuLinkProps {
  href: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

function MenuLink({ href, title, description, icon, onClick }: MenuLinkProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-accent transition-colors"
      onClick={onClick}
    >
      <div className="bg-muted rounded-full p-3 mb-2">{icon}</div>
      <div className="font-medium text-sm">{title}</div>
      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
        {description}
      </p>
    </Link>
  );
}
