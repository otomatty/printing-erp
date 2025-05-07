'use client';

/**
 * ロゴコンポーネント
 * アプリケーションのロゴと名前を表示します
 */
import { AppLogo } from '../app-logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Logo() {
  const pathname = usePathname();
  const href = pathname.startsWith('/webapp') ? '/webapp' : '/';
  return (
    <Link href={href} className="flex items-center">
      <AppLogo href={null} className="h-10 w-auto" />
      <span className="ml-2 text-xl font-semibold">の楽々印刷</span>
    </Link>
  );
}
