'use client';

/**
 * ナビゲーションコンポーネント
 * アプリケーションのメインナビゲーションを提供します
 */
import Link from 'next/link';
import React from 'react';

export type NavLink = { title: string; href: string; soon: boolean };
export const appNavLinks: NavLink[] = [
  { title: '発注管理', href: '/webapp/orders', soon: true },
  { title: 'デザイン管理', href: '/webapp/designs', soon: true },
  { title: 'レポート', href: '/webapp/reports', soon: true },
  { title: '設定', href: '/webapp/settings', soon: true },
];
export const publicNavLinks: NavLink[] = [
  { title: 'できること', href: '/features', soon: false },
  { title: '利用事例', href: '/use-cases', soon: false },
  { title: '料金プラン', href: '/pricing', soon: false },
  { title: 'お問い合わせ', href: '/contact', soon: false },
];

export interface NavigationProps {
  isMobile?: boolean;
  onItemClick?: () => void;
  items?: NavLink[];
}

export function Navigation({
  isMobile = false,
  onItemClick = () => {},
  items = appNavLinks,
}: NavigationProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      {/* ハンバーガーボタン */}
      <button
        type="button"
        className="md:hidden flex items-center p-2 text-gray-700 hover:text-primary"
        onClick={() => setOpen(!open)}
      >
        <span className="sr-only">Toggle navigation</span>
        <div className={`hamburger ${open ? 'open' : ''}`} />
      </button>
      {/* ナビリンク */}
      <nav
        className={`${
          open
            ? 'flex flex-col space-y-4 absolute top-full left-0 w-full bg-white shadow-lg p-4'
            : 'hidden'
        } md:flex md:space-x-6 md:static md:bg-transparent md:shadow-none md:p-0`}
      >
        {items.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className={`flex items-center text-gray-700 hover:text-primary ${
              link.soon ? 'opacity-70 cursor-default pointer-events-none' : ''
            }`}
            onClick={() => {
              onItemClick();
              setOpen(false);
            }}
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
      {/* ハンバーガーアニメーション用CSS */}
      <style jsx>{`
        .hamburger,
        .hamburger::before,
        .hamburger::after {
          width: 24px;
          height: 2px;
          background-color: currentColor;
          display: block;
          transition: transform 0.3s ease;
        }
        .hamburger {
          position: relative;
        }
        .hamburger::before {
          content: '';
          position: absolute;
          top: -6px;
        }
        .hamburger::after {
          content: '';
          position: absolute;
          top: 6px;
        }
        .hamburger.open {
          transform: rotate(45deg);
        }
        .hamburger.open::before {
          transform: rotate(90deg) translateX(-6px);
        }
        .hamburger.open::after {
          transform: rotate(90deg) translateX(6px);
        }
      `}</style>
    </div>
  );
}
