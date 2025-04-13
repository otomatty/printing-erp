// middleware.ts
import { type NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/:path*', // 全てのパスに適用する場合
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

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

    const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':');

    // 環境変数からユーザー名とパスワードを取得
    const validUser = process.env.BASIC_AUTH_USER;
    const validPassword = process.env.BASIC_AUTH_PASSWORD;

    if (user === validUser && pwd === validPassword) {
      return NextResponse.next();
    }
  }

  url.pathname = '/api/auth'; // 認証失敗時の処理は /api/auth などに任せる例
  // 直接 401 を返してもいいわよ。

  // 401レスポンスを返す場合
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="restricted"',
    },
  });

  // または特定のAPIルートにリダイレクトする場合
  // return NextResponse.rewrite(url)
}
