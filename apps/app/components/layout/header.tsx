'use client';

/**
 * アプリのヘッダーコンポーネント
 * グローバルナビゲーションを提供します
 */
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

// Supabaseの認証フックをインポート
import { useUser } from '@kit/supabase/hooks/use-user';

// 分割したコンポーネントをインポート
import { Logo } from './logo';
import { Navigation } from './navigation';
import { AuthUserMenu } from './auth-user-menu';
import { LoginButton } from './login-button';

/**
 * ヘッダーコンポーネント
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // isLoading, isErrorも取得して、より堅牢なチェックを実装
  const { data: user, isLoading, isError } = useUser();

  // ローディング中またはエラー時は未認証とみなす
  const isAuthenticated = !isLoading && !isError && !!user;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* デスクトップナビゲーション */}
          <Navigation />

          {/* ユーザーメニューまたはログインボタン（デスクトップ） */}
          {isAuthenticated ? <AuthUserMenu /> : <LoginButton />}

          {/* モバイルメニューボタン */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-500 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* モバイルナビゲーション */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Navigation isMobile onItemClick={() => setIsMenuOpen(false)} />
              <AuthUserMenu isMobile onItemClick={() => setIsMenuOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
