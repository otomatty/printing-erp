/**
 * 認証必須ページ
 * 未認証ユーザーがアクセスした際に認証を促すページ
 */

import { Button } from '@kit/ui/button';
import { AuthLayoutShell } from '@kit/auth/shared';
import { AppLogo } from '~/components/app-logo';
import pathsConfig from '~/config/paths.config';
import Link from 'next/link';

export default function MustAuthenticatePage() {
  return (
    <AuthLayoutShell Logo={AppLogo}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center mb-2">認証が必要です</h1>
        <p className="text-center text-muted-foreground">
          このページにアクセスするには、ログインが必要です
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <p className="text-center text-sm">
          印刷会社のオンライン入稿を利用するには、ログインしてください。
          アカウントをお持ちでない場合は、管理者にお問い合わせください。
        </p>

        <Button>
          <Link href={pathsConfig.public.home}>トップページへ</Link>
        </Button>
        <Button className="w-full" asChild>
          <Link href={pathsConfig.auth.login}>ログインページへ進む</Link>
        </Button>
      </div>
    </AuthLayoutShell>
  );
}
