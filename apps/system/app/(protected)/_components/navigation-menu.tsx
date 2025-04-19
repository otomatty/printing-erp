/**
 * アプリケーションメニューコンポーネント
 * Googleアプリのように1つのボタンをクリックするとメニューが表示される
 * モバイル表示の場合はシートコンポーネントを使用
 */
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@kit/ui/sheet';
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
  PenTool,
  ClipboardCheck,
  Truck,
  DollarSign,
  BarChart,
  Sliders,
  Newspaper,
} from 'lucide-react';
import {
  categories,
  categoryOrder,
  type CategoryId,
} from '~/config/category.config';
import { cn } from '@kit/ui/utils';

/**
 * メニュー項目のステータス定義
 */
type MenuItemStatus = 'available' | 'unavailable' | 'comingSoon';

/**
 * メディアクエリフック
 * 画面サイズに基づいて表示を切り替えるためのカスタムフック
 */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
}

/**
 * メニュー項目の型定義
 */
interface MenuItem {
  href: string;
  title: string;
  icon: React.ReactNode;
  category: CategoryId;
  status?: MenuItemStatus;
}

export default function NavigationMenu() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const menuItems: MenuItem[] = [
    // 営業受注カテゴリ
    {
      href: '/inquiries',
      title: 'お問い合わせ',
      icon: <MessageSquare className="h-6 w-6" />,
      category: 'sales',
      status: 'available',
    },
    {
      href: '/quotes',
      title: '見積',
      icon: <Calculator className="h-6 w-6" />,
      category: 'sales',
      status: 'available',
    },
    {
      href: '/orders',
      title: '受注',
      icon: <FileText className="h-6 w-6" />,
      category: 'sales',
      status: 'unavailable',
    },
    {
      href: '/customers',
      title: '顧客',
      icon: <Users className="h-6 w-6" />,
      category: 'sales',
      status: 'unavailable',
    },

    // 制作デザインカテゴリ
    {
      href: '/design',
      title: 'デザイン',
      icon: <PenTool className="h-6 w-6" />,
      category: 'design',
      status: 'unavailable',
    },
    {
      href: '/proofing',
      title: '校正',
      icon: <ClipboardCheck className="h-6 w-6" />,
      category: 'design',
      status: 'unavailable',
    },
    {
      href: '/contents',
      title: 'データ管理',
      icon: <FileEdit className="h-6 w-6" />,
      category: 'design',
      status: 'unavailable',
    },

    // 製造印刷カテゴリ
    {
      href: '/production',
      title: '印刷作業',
      icon: <Printer className="h-6 w-6" />,
      category: 'production',
      status: 'unavailable',
    },
    {
      href: '/inventory',
      title: '在庫',
      icon: <Package className="h-6 w-6" />,
      category: 'production',
      status: 'unavailable',
    },
    {
      href: '/quality',
      title: '品質検査',
      icon: <ClipboardCheck className="h-6 w-6" />,
      category: 'production',
      status: 'unavailable',
    },

    // 出荷請求カテゴリ
    {
      href: '/shipping',
      title: '出荷',
      icon: <Truck className="h-6 w-6" />,
      category: 'shipping',
      status: 'unavailable',
    },
    {
      href: '/billing',
      title: '請求',
      icon: <CreditCard className="h-6 w-6" />,
      category: 'shipping',
      status: 'unavailable',
    },
    {
      href: '/payments',
      title: '入金',
      icon: <DollarSign className="h-6 w-6" />,
      category: 'shipping',
      status: 'unavailable',
    },

    // ホームページ管理カテゴリ
    {
      href: '/website/news',
      title: 'お知らせ',
      icon: <Newspaper className="h-6 w-6" />,
      category: 'website',
      status: 'available',
    },
    {
      href: '/website/topics',
      title: '特集記事',
      icon: <FileEdit className="h-6 w-6" />,
      category: 'website',
      status: 'available',
    },
    {
      href: '/website/analytics',
      title: 'アクセス解析',
      icon: <BarChart className="h-6 w-6" />,
      category: 'website',
      status: 'comingSoon',
    },
    {
      href: '/website/settings',
      title: 'サイト設定',
      icon: <Sliders className="h-6 w-6" />,
      category: 'website',
      status: 'unavailable',
    },

    // システム管理カテゴリ
    {
      href: '/notifications',
      title: '通知',
      icon: <Bell className="h-6 w-6" />,
      category: 'admin',
      status: 'available',
    },
    {
      href: '/settings',
      title: '設定',
      icon: <Settings className="h-6 w-6" />,
      category: 'admin',
      status: 'available',
    },
    {
      href: '/users',
      title: 'ユーザー管理',
      icon: <Users className="h-6 w-6" />,
      category: 'admin',
      status: 'available',
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

  // メニュー内容のレンダリング
  const renderMenuContent = () => (
    <div className="flex flex-col space-y-6">
      {categoryOrder.map((categoryId) => (
        <div key={categoryId} className="space-y-3">
          <h3 className="font-medium text-sm text-muted-foreground border-b pb-1">
            {categories[categoryId].name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
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
                isMobile={isMobile}
                status={item.status || 'available'}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  // モバイル表示の場合はSheetを使用
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-primary-foreground/10 transition-colors cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <Grip className="h-6 w-6" />
            <span className="sr-only">アプリケーションメニュー</span>
          </button>
        </SheetTrigger>
        <SheetContent className="p-4 w-[300px] max-h-screen overflow-y-auto">
          <SheetTitle className="sr-only">アプリケーションメニュー</SheetTitle>
          {renderMenuContent()}
        </SheetContent>
      </Sheet>
    );
  }

  // デスクトップ表示の場合はDropdownMenuを使用
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
        {renderMenuContent()}
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
  isMobile?: boolean;
  status: MenuItemStatus;
}

function MenuLink({
  href,
  title,
  icon,
  onClick,
  bgColor,
  iconColor,
  hoverColor,
  isMobile,
  status,
}: MenuLinkProps) {
  // ステータスに基づいたスタイル適用
  const isClickable = status === 'available';
  const disabledStyle = !isClickable
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  // ステータスに応じたバッジ表示
  const StatusBadge =
    status === 'comingSoon' ? (
      <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-[9px] px-1 py-0.5 rounded-full font-medium">
        {isMobile ? '準備中' : 'Coming Soon'}
      </div>
    ) : null;

  // クリックハンドラのラップ - 利用可能状態以外では何もしない
  const handleClick = (e: React.MouseEvent) => {
    if (!isClickable) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  // モバイル表示の場合は横並びにレイアウトを変更
  if (isMobile) {
    return (
      <div className="relative">
        <Link
          href={isClickable ? href : '#'}
          className={cn(
            `flex flex-row items-center p-3 rounded-lg transition-colors ${hoverColor}`,
            disabledStyle
          )}
          onClick={handleClick}
          aria-disabled={!isClickable}
        >
          <div
            className={cn(
              `${bgColor} ${iconColor} rounded-full p-2 mr-3 flex items-center justify-center shrink-0`,
              !isClickable ? 'opacity-40' : ''
            )}
          >
            {icon}
          </div>
          <div className="font-medium">{title}</div>
        </Link>
        {StatusBadge}
      </div>
    );
  }

  // デスクトップ表示は従来通り縦並び
  return (
    <div className="relative">
      <Link
        href={isClickable ? href : '#'}
        className={cn(
          `flex flex-col items-center text-center p-3 rounded-lg transition-colors ${hoverColor}`,
          disabledStyle
        )}
        onClick={handleClick}
        aria-disabled={!isClickable}
      >
        <div
          className={cn(
            `${bgColor} ${iconColor} rounded-full p-4 mb-2 flex items-center justify-center`,
            !isClickable ? 'opacity-40' : ''
          )}
        >
          {icon}
        </div>
        <div className="font-medium text-sm">{title}</div>
      </Link>
      {StatusBadge}
    </div>
  );
}
