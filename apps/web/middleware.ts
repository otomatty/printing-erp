// middleware.ts
import { type NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/:path*', // 全てのパスに適用する場合
};

export function middleware(req: NextRequest) {
  // Basic認証を無効化（本番環境対応のため）
  // 必要な場合は環境変数ENABLE_BASIC_AUTHをtrueに設定することで有効化可能
  const enableBasicAuth = process.env.ENABLE_BASIC_AUTH === 'true';

  if (enableBasicAuth) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValueParts = basicAuth.split(' ');
      const authValue = authValueParts[1];

      if (!authValue) {
        return new NextResponse('Authentication required', {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="restricted"',
          },
        });
      }

      const [user, pwd] = Buffer.from(authValue, 'base64')
        .toString()
        .split(':');

      // 環境変数からユーザー名とパスワードを取得
      const validUser = process.env.BASIC_AUTH_USER;
      const validPassword = process.env.BASIC_AUTH_PASSWORD;

      if (user === validUser && pwd === validPassword) {
        return NextResponse.next();
      }

      // 認証失敗時は401を返す
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="restricted"',
        },
      });
    }

    // Basic認証ヘッダーがない場合も401を返す
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="restricted"',
      },
    });
  }

  // Basic認証が無効の場合は、リクエストをそのまま通す
  return NextResponse.next();
}
