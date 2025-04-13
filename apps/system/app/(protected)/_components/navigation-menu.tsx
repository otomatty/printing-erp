/**
 * アプリケーションメニューコンポーネント
 * Googleアプリのように1つのボタンをクリックするとメニューが表示される
 */
'use client';

import Link from 'next/link';
import { useState } from 'react';
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
  FileEdit,
  Grip,
  LayoutDashboard,
  PenTool,
  ClipboardCheck,
  Truck,
  DollarSign,
} from 'lucide-react';
import {
  categories,
  categoryOrder,
  type CategoryId,
} from '~/config/category.config';

interface MenuItem {
  href: string;
  title: string;
  icon: React.ReactNode;
  category: CategoryId;
}

export default function NavigationMenu() {
  const [open, setOpen] = useState(false);

  const menuItems: MenuItem[] = [
    // 営業受注カテゴリ
    {
      href: '/inquiries',
      title: 'お問い合わせ',
      icon: <MessageSquare className="h-6 w-6" />,
      category: 'sales',
    },
    {
      href: '/quotes',
      title: '見積',
      icon: <Calculator className="h-6 w-6" />,
      category: 'sales',
    },
    {
      href: '/orders',
      title: '受注',
      icon: <FileText className="h-6 w-6" />,
      category: 'sales',
    },
    {
      href: '/customers',
      title: '顧客',
      icon: <Users className="h-6 w-6" />,
      category: 'sales',
    },

    // 制作デザインカテゴリ
    {
      href: '/design',
      title: 'デザイン',
      icon: <PenTool className="h-6 w-6" />,
      category: 'design',
    },
    {
      href: '/proofing',
      title: '校正',
      icon: <ClipboardCheck className="h-6 w-6" />,
      category: 'design',
    },
    {
      href: '/contents',
      title: 'データ管理',
      icon: <FileEdit className="h-6 w-6" />,
      category: 'design',
    },

    // 製造印刷カテゴリ
    {
      href: '/production',
      title: '印刷作業',
      icon: <Printer className="h-6 w-6" />,
      category: 'production',
    },
    {
      href: '/inventory',
      title: '在庫',
      icon: <Package className="h-6 w-6" />,
      category: 'production',
    },
    {
      href: '/quality',
      title: '品質検査',
      icon: <ClipboardCheck className="h-6 w-6" />,
      category: 'production',
    },

    // 出荷請求カテゴリ
    {
      href: '/shipping',
      title: '出荷',
      icon: <Truck className="h-6 w-6" />,
      category: 'shipping',
    },
    {
      href: '/billing',
      title: '請求',
      icon: <CreditCard className="h-6 w-6" />,
      category: 'shipping',
    },
    {
      href: '/payments',
      title: '入金',
      icon: <DollarSign className="h-6 w-6" />,
      category: 'shipping',
    },

    // 管理カテゴリ
    {
      href: '/',
      title: 'ダッシュボード',
      icon: <LayoutDashboard className="h-6 w-6" />,
      category: 'admin',
    },
    {
      href: '/news',
      title: 'お知らせ',
      icon: <Bell className="h-6 w-6" />,
      category: 'admin',
    },
    {
      href: '/settings',
      title: '設定',
      icon: <Settings className="h-6 w-6" />,
      category: 'admin',
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
    {} as Record<CategoryId, MenuItem[]>
  );

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
          {categoryOrder.map((categoryId) => (
            <div key={categoryId} className="space-y-3">
              <h3 className="font-medium text-sm text-muted-foreground border-b pb-1">
                {categories[categoryId].name}
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {groupedMenuItems[categoryId]?.map((item) => (
                  <MenuLink
                    key={item.href}
                    href={item.href}
                    title={item.title}
                    icon={item.icon}
                    onClick={() => setOpen(false)}
                    bgColor={categories[categoryId].bg}
                    iconColor={categories[categoryId].icon}
                    hoverColor={categories[categoryId].hover}
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
  icon?: React.ReactNode;
  onClick?: () => void;
  bgColor: string;
  iconColor: string;
  hoverColor: string;
}

function MenuLink({
  href,
  title,
  icon,
  onClick,
  bgColor,
  iconColor,
  hoverColor,
}: MenuLinkProps) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center text-center p-3 rounded-lg transition-colors ${hoverColor}`}
      onClick={onClick}
    >
      <div
        className={`${bgColor} ${iconColor} rounded-full p-4 mb-2 flex items-center justify-center`}
      >
        {icon}
      </div>
      <div className="font-medium text-sm">{title}</div>
    </Link>
  );
}
