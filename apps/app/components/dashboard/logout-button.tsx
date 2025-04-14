'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Button } from '@kit/ui/button';
import { useSignOut } from '@kit/supabase/hooks/use-sign-out';

interface LogoutButtonProps {
  className?: string;
  variant?: 'default' | 'mobile';
}

export function LogoutButton({
  className,
  variant = 'default',
}: LogoutButtonProps) {
  const router = useRouter();
  const signOutMutation = useSignOut();

  const handleSignOut = async () => {
    try {
      await signOutMutation.mutateAsync();
      router.push('/auth/login');
    } catch (error) {
      console.error('ログアウト中にエラーが発生しました', error);
    }
  };

  // モバイル用ボタンスタイル
  if (variant === 'mobile') {
    return (
      <button
        type="button"
        onClick={handleSignOut}
        disabled={signOutMutation.isPending}
        className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
      >
        <LogOut className="h-5 w-5" />
        {signOutMutation.isPending ? 'ログアウト中...' : 'ログアウト'}
      </button>
    );
  }

  // デフォルト（サイドバー）用ボタンスタイル
  return (
    <Button
      onClick={handleSignOut}
      disabled={signOutMutation.isPending}
      variant="ghost"
      className={`w-full flex items-center gap-2 text-sm rounded-md px-3 py-2 bg-muted/50 hover:bg-muted transition-colors ${className || ''}`}
    >
      <LogOut className="h-4 w-4" />
      {signOutMutation.isPending ? 'ログアウト中...' : 'ログアウト'}
    </Button>
  );
}
