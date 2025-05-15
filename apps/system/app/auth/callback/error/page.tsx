import type { Metadata } from 'next';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@kit/ui/alert';
import { Button } from '@kit/ui/button';
import { AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '認証エラー | 印刷会社',
  description: '認証処理中にエラーが発生しました',
};

interface AuthCallbackErrorPageProps {
  searchParams: {
    error?: string;
    error_type?: string;
    error_message?: string;
  };
}

export default function AuthCallbackErrorPage({
  searchParams,
}: AuthCallbackErrorPageProps) {
  const errorMessage = searchParams.error || '認証中にエラーが発生しました';
  const errorType = searchParams.error_type;
  const errorDetail = searchParams.error_message;

  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">認証エラー</h1>
        <p className="text-muted-foreground">
          ログイン処理中に問題が発生しました
        </p>
      </div>

      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="ml-2">エラーが発生しました</AlertTitle>
        <AlertDescription className="mt-2">
          {errorMessage}
          {errorType && (
            <div className="mt-2 text-sm">
              <p>エラータイプ: {errorType}</p>
              {errorDetail && <p className="mt-1">詳細: {errorDetail}</p>}
            </div>
          )}
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <Button asChild className="w-full">
          <Link href="/auth/login">ログインページに戻る</Link>
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            問題が解決しない場合は、お手数ですが
            <a
              href="mailto:nkikaku@crocus.ocn.ne.jp"
              className="underline hover:text-foreground"
            >
              サポート
            </a>
            までご連絡ください。
          </p>
        </div>
      </div>
    </div>
  );
}
