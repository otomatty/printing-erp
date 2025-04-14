'use client';

/**
 * ユーザーメニューコンポーネント
 * ログインユーザー向けのメニューを提供します
 */
import Link from 'next/link';
import {
  LogOut,
  User,
  Bell,
  LogIn,
  ChevronDown,
  Briefcase,
} from 'lucide-react';

// Supabaseの認証フックをインポート
import { useUser } from '@kit/supabase/hooks/use-user';
import { useSignOut } from '@kit/supabase/hooks/use-sign-out';

// shadcn/ui のドロップダウンコンポーネント
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';

export interface UserMenuProps {
  isMobile?: boolean;
  onItemClick?: () => void;
  isAdmin?: boolean;
}

export function UserMenu({
  isMobile = false,
  onItemClick = () => {},
  isAdmin = false,
}: UserMenuProps) {
  const { data: user, isLoading, isError } = useUser();
  const { mutate: signOut } = useSignOut();

  const isAuthenticated = !isLoading && !isError && !!user;

  // 業務システムのURL設定 - 環境変数から取得
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:2122';

  // 管理者かどうかを判定するロジックはサーバーコンポーネントから受け取る

  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        className="flex items-center text-gray-700 hover:text-primary"
        onClick={onItemClick}
      >
        <LogIn size={16} className="mr-2" />
        ログイン
      </Link>
    );
  }

  if (isMobile) {
    return (
      <>
        <hr className="border-gray-200" />
        <Link
          href="/profile"
          className="flex items-center text-gray-700 hover:text-primary"
          onClick={onItemClick}
        >
          <User size={16} className="mr-2" />
          プロフィール
        </Link>
        {isAdmin && (
          <Link
            href={adminUrl}
            className="flex items-center text-gray-700 hover:text-primary"
            onClick={onItemClick}
          >
            <Briefcase size={16} className="mr-2" />
            業務システム
          </Link>
        )}
        <button
          type="button"
          className="flex items-center text-gray-700 hover:text-primary w-full text-left"
          onClick={() => {
            signOut();
            onItemClick();
          }}
        >
          <LogOut size={16} className="mr-2" />
          ログアウト
        </button>
      </>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-4">
      <button
        type="button"
        className="p-2 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100"
      >
        <Bell size={20} />
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center space-x-1 text-gray-700 hover:text-primary rounded-md px-2 py-1 transition-colors"
          >
            <User size={20} className="mr-1" />
            <span className="max-w-[150px] truncate">
              {user?.email || 'ユーザー'}
            </span>
            <ChevronDown size={16} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>アカウント</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex cursor-pointer w-full">
              <User size={16} className="mr-2" />
              プロフィール
            </Link>
          </DropdownMenuItem>

          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link href={adminUrl} className="flex cursor-pointer w-full">
                <Briefcase size={16} className="mr-2" />
                業務システム
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut()}
            className="flex cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut size={16} className="mr-2" />
            ログアウト
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
