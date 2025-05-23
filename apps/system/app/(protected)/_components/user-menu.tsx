/**
 * ユーザーメニューコンポーネント
 * ユーザー関連の操作を提供するドロップダウンメニュー
 */
'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import type { Database } from '@kit/supabase/database';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@kit/ui/avatar';
import { UserCog, LogOut, BookOpen } from 'lucide-react';
import { Button } from '@kit/ui/button';
import { signOut } from '~/_actions/auth';

interface UserMenuProps {
  user: User | null;
  /** admin_users テーブルのレコード */
  adminProfile: Database['system']['Tables']['admin_users']['Row'] | null;
}

export default function UserMenu({ user, adminProfile }: UserMenuProps) {
  const router = useRouter();

  // 表示名は adminProfile の first_name, last_name を優先
  const profileName =
    adminProfile?.first_name || adminProfile?.last_name
      ? `${adminProfile.first_name ?? ''} ${adminProfile.last_name ?? ''}`.trim()
      : null;
  const userDisplayName =
    profileName || user?.user_metadata?.name || user?.email || 'ユーザー';
  const userInitials = userDisplayName.charAt(0).toUpperCase();

  // ログアウト処理
  const handleSignOut = useCallback(async () => {
    await signOut();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={user?.user_metadata?.avatar_url}
              alt={userDisplayName}
            />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userDisplayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {adminProfile?.email || user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/docs')}>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>ドキュメント</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/accounts')}>
            <UserCog className="mr-2 h-4 w-4" />
            <span>アカウント設定</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>ログアウト</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
