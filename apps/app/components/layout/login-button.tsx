'use client';

/**
 * ログインボタンコンポーネント
 * 未認証ユーザー向けのログインボタンを提供します
 */
import Link from 'next/link';
import { LogIn } from 'lucide-react';

export function LoginButton() {
  return (
    <Link
      href="/auth/login"
      className="hidden md:flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
    >
      <LogIn size={16} className="mr-2" />
      ログイン
    </Link>
  );
}
