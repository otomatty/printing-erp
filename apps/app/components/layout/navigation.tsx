'use client';

/**
 * ナビゲーションコンポーネント
 * アプリケーションのメインナビゲーションを提供します
 */
import Link from 'next/link';

export interface NavigationProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export function Navigation({
  isMobile = false,
  onItemClick = () => {},
}: NavigationProps) {
  // ナビゲーションリンク
  const navLinks = [
    { title: 'ダッシュボード', href: '/dashboard', soon: false },
    { title: '発注管理', href: '/orders', soon: true },
    { title: 'デザイン管理', href: '/designs', soon: true },
    { title: 'レポート', href: '/reports', soon: true },
    { title: '設定', href: '/settings', soon: true },
  ];

  return (
    <nav
      className={
        isMobile ? 'flex flex-col space-y-4' : 'hidden md:flex space-x-6'
      }
    >
      {navLinks.map((link) => (
        <Link
          key={link.title}
          href={link.href}
          className={`flex items-center text-gray-700 hover:text-primary ${
            link.soon ? 'opacity-70 cursor-default pointer-events-none' : ''
          }`}
          onClick={onItemClick}
        >
          {link.title}
          {link.soon && (
            <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
              近日公開
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}
