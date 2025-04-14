'use client';

/**
 * ロゴコンポーネント
 * アプリケーションのロゴと名前を表示します
 */
import { AppLogo } from '../app-logo';

export function Logo() {
  return (
    <div className="flex items-center">
      <AppLogo className="h-8 w-auto" />
      <span className="ml-2 text-xl font-semibold">管理システム</span>
    </div>
  );
}
