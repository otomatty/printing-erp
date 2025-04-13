/**
 * ログインページ
 * AuthLayoutShellとSignInMethodsContainerを使用して認証UIを提供します
 */
'use client';

import { SignInMethodsContainer } from '@kit/auth/sign-in';
import { AuthLayoutShell } from '@kit/auth/shared';
import { AppLogo } from '~/components/app-logo';

export default function LoginPage() {
  return (
    <AuthLayoutShell Logo={AppLogo}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center mb-2">ログイン</h1>
        <p className="text-center text-muted-foreground">
          ニイヌマ企画印刷の業務管理システム
        </p>
      </div>

      <SignInMethodsContainer
        paths={{
          callback: '/auth/callback',
          home: '/',
        }}
        providers={{
          // パスワード認証を無効化
          password: false,
          // マジックリンク認証（OTP）を有効化
          magicLink: true,
          // Google認証のみ有効化
          oAuth: ['google'],
        }}
      />
    </AuthLayoutShell>
  );
}
