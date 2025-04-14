'use client';

import { UserMenu } from './user-menu';
import { useEffect, useState } from 'react';

interface AuthUserMenuProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

// クライアントコンポーネント用のラッパー
export function AuthUserMenu({
  isMobile = false,
  onItemClick,
}: AuthUserMenuProps) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // コンポーネントマウント時に管理者権限をチェック
    const checkAdminStatus = async () => {
      try {
        // サーバーアクションの代わりにAPIエンドポイントを使用
        const response = await fetch('/api/admin-check');
        if (!response.ok) {
          throw new Error('Admin check API failed');
        }
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error('Failed to check admin status:', error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, []);

  return (
    <UserMenu isMobile={isMobile} onItemClick={onItemClick} isAdmin={isAdmin} />
  );
}
