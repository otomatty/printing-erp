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
import { Grip } from 'lucide-react';
import {
  categories,
  categoryOrder,
  type CategoryId,
} from '~/config/category.config';
import { menuItems, type MenuItem } from './menuData';
import { cn } from '@kit/ui/utils';

/**
 * メニュー項目のステータス定義
 */
type MenuItemStatus = 'available' | 'unavailable' | 'coming-soon' | 'demo';

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

export default function NavigationMenu() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');

  // Add global keyboard shortcut listener for Ctrl/Cmd + M to toggle menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'm' || e.key === 'M')) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

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
                external={item.external}
                title={item.title}
                icon={item.icon}
                iconSrc={item.iconSrc}
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
  external?: boolean;
  title: string;
  icon: React.ReactNode;
  iconSrc?: string;
  onClick?: () => void;
  bgColor: string;
  iconColor: string;
  hoverColor: string;
  isMobile?: boolean;
  status: MenuItemStatus;
}

function MenuLink({
  href,
  external,
  title,
  icon,
  iconSrc,
  onClick,
  bgColor,
  iconColor,
  hoverColor,
  isMobile,
  status,
}: MenuLinkProps) {
  // ステータスに基づいたスタイル適用
  const isClickable = status === 'available' || status === 'demo';
  const disabledStyle = !isClickable
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  // ステータスに応じたバッジ表示
  const StatusBadge =
    status === 'coming-soon' ? (
      <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-[9px] px-1 py-0.5 rounded-full font-medium">
        {isMobile ? '準備中' : 'Coming Soon'}
      </div>
    ) : status === 'demo' ? (
      <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-[9px] px-1 py-0.5 rounded-full font-medium">
        {isMobile ? 'デモ' : 'Demo'}
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
        {external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              `flex flex-row items-center p-3 rounded-lg transition-colors ${hoverColor}`,
              disabledStyle
            )}
            onClick={handleClick}
            aria-disabled={!isClickable}
          >
            {iconSrc ? (
              <img src={iconSrc} alt={title} className="h-8 w-8 mr-2" />
            ) : (
              <div
                className={cn(
                  `${bgColor} ${iconColor} rounded-full p-2 mr-3 flex items-center justify-center shrink-0`,
                  !isClickable ? 'opacity-40' : ''
                )}
              >
                {icon}
              </div>
            )}
            <div className="font-medium">{title}</div>
          </a>
        ) : (
          <Link
            href={isClickable ? href : '#'}
            className={cn(
              `flex flex-row items-center p-3 rounded-lg transition-colors ${hoverColor}`,
              disabledStyle
            )}
            onClick={handleClick}
            aria-disabled={!isClickable}
          >
            {iconSrc ? (
              <img src={iconSrc} alt={title} className="h-8 w-8 mr-2" />
            ) : (
              <div
                className={cn(
                  `${bgColor} ${iconColor} rounded-full p-2 mr-3 flex items-center justify-center shrink-0`,
                  !isClickable ? 'opacity-40' : ''
                )}
              >
                {icon}
              </div>
            )}
            <div className="font-medium">{title}</div>
          </Link>
        )}
        {StatusBadge}
      </div>
    );
  }

  // デスクトップ表示は従来通り縦並び
  return (
    <div className="relative">
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            `flex flex-col items-center text-center p-3 rounded-lg transition-colors ${hoverColor}`,
            disabledStyle
          )}
          onClick={handleClick}
          aria-disabled={!isClickable}
        >
          {iconSrc ? (
            <img src={iconSrc} alt={title} className="h-8 w-8 mb-2" />
          ) : (
            <div
              className={cn(
                `${bgColor} ${iconColor} rounded-full p-4 mb-2 flex items-center justify-center`,
                !isClickable ? 'opacity-40' : ''
              )}
            >
              {icon}
            </div>
          )}
          <div className="font-medium text-sm">{title}</div>
        </a>
      ) : (
        <Link
          href={isClickable ? href : '#'}
          className={cn(
            `flex flex-col items-center text-center p-3 rounded-lg transition-colors ${hoverColor}`,
            disabledStyle
          )}
          onClick={handleClick}
          aria-disabled={!isClickable}
        >
          {iconSrc ? (
            <img src={iconSrc} alt={title} className="h-8 w-8 mb-2" />
          ) : (
            <div
              className={cn(
                `${bgColor} ${iconColor} rounded-full p-4 mb-2 flex items-center justify-center`,
                !isClickable ? 'opacity-40' : ''
              )}
            >
              {icon}
            </div>
          )}
          <div className="font-medium text-sm">{title}</div>
        </Link>
      )}
      {StatusBadge}
    </div>
  );
}
