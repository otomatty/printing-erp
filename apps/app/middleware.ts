// middleware.ts
import { type NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@kit/supabase/middleware-client';
import pathsConfig from './config/paths.config';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - / (public root) - 必要に応じてルートを除外
     * - auth/callback は matcher に含めない (セッション更新後に処理)
     */
    `/((?!api|_next/static|_next/image|favicon.ico|${pathsConfig.auth.callback.substring(1)}|^/$).*)`,
    // 必要ならBasic認証対象パスを追加
    // '/admin/:path*',
  ],
};

// Basic認証が必要なパスを判定する関数（デフォルト無効）
function requiresBasicAuth(pathname: string): boolean {
  // return pathname.startsWith('/admin'); // 例
  return false;
}

/**
 * リクエストに一意のIDを設定する関数
 */
function setRequestId(request: NextRequest) {
  // Headersオブジェクトを作成して操作する
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-correlation-id', crypto.randomUUID());

  // Note: 直接 request.headers を変更するのではなく、
  // NextResponse.next() に headers オプションを渡すのが推奨されるが、
  // ここではリクエスト自体にIDを持たせることを優先（ログ等での利用想定）
  // ただし、この方法では後続の処理（APIルートなど）にヘッダーが渡らない可能性があるので注意
}

export async function middleware(req: NextRequest) {
  setRequestId(req); // リクエストIDを設定
  const { pathname } = req.nextUrl;
  console.log(`[Middleware] Processing request for: ${pathname}`); // パス名を出力

  // 1. Basic認証チェック (必要な場合)
  if (requiresBasicAuth(pathname)) {
    const basicAuth = req.headers.get('authorization');
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      if (authValue) {
        const [user, pwd] = Buffer.from(authValue, 'base64')
          .toString()
          .split(':');
        const validUser = process.env.BASIC_AUTH_USER;
        const validPassword = process.env.BASIC_AUTH_PASSWORD;

        if (user === validUser && pwd === validPassword) {
          console.log('[Middleware] Basic Auth successful for:', pathname);
          // Basic認証成功時は後続のSupabase処理に進む
        } else {
          console.log('[Middleware] Basic Auth failed for:', pathname);
          return new NextResponse('Authentication required', {
            status: 401,
            headers: { 'WWW-Authenticate': 'Basic realm="restricted"' },
          });
        }
      } else {
        console.log(
          '[Middleware] Basic Auth header value missing for:',
          pathname
        );
        return new NextResponse('Authentication required', {
          status: 401,
          headers: { 'WWW-Authenticate': 'Basic realm="restricted"' },
        });
      }
    } else {
      console.log('[Middleware] Basic Auth header missing for:', pathname);
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="restricted"' },
      });
    }
  }

  // 2. Supabaseセッション更新と認証リダイレクト
  console.log(`[Middleware] Preparing NextResponse for ${pathname}`);
  const res = NextResponse.next({
    request: {
      headers: new Headers(req.headers),
    },
  });
  // @ts-ignore // 型エラーを無視 (非推奨！依存関係を修正すべき)
  console.log(`[Middleware] Creating Supabase client for ${pathname}`);
  const supabase = createMiddlewareClient(req, res); // 引数を req, res の順で渡す

  try {
    console.log(
      `[Middleware] Attempting to get Supabase session for ${pathname}`
    );
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      // セッション取得エラーはリダイレクトループの原因になりうるので詳細にログ
      console.error(
        `[Middleware] Error getting Supabase session for ${pathname}:`,
        error.message
      );
      // エラー発生時でも、セッションは null として処理を続行する
    } else {
      // セッション有無を明確にログ
      console.log(
        `[Middleware] Session status for ${pathname}: ${session ? `Exists (User ID: ${session.user.id})` : 'None'}`
      );
    }

    const isAuthenticated = !!session;
    // パスの判定ロジックを設定に完全に準拠させる
    const isAuthPath =
      (pathname === pathsConfig.auth.signIn ||
        pathname === pathsConfig.auth.signUp ||
        pathname === pathsConfig.auth.verifyMfa ||
        pathname === pathsConfig.auth.passwordReset ||
        pathname === pathsConfig.auth.passwordUpdate) &&
      pathname !== pathsConfig.auth.callback;

    const isDashboardPath =
      pathname === pathsConfig.app.home ||
      pathname.startsWith(`${pathsConfig.app.home}/`);
    console.log(
      `[Middleware] Path checks for ${pathname}: isAuthenticated=${isAuthenticated}, isAuthPath=${isAuthPath}, isDashboardPath=${isDashboardPath}`
    );

    // 未認証でダッシュボードにアクセスしようとした場合
    if (!isAuthenticated && isDashboardPath) {
      console.log(
        `[Middleware] Unauthorized access attempt to ${pathname}. Redirecting to ${pathsConfig.auth.signIn}`
      );
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = pathsConfig.auth.signIn;
      redirectUrl.searchParams.set('next', pathname); // リダイレクト後の戻り先を指定
      return NextResponse.redirect(redirectUrl);
    }

    // 認証済みで認証ページにアクセスしようとした場合
    if (isAuthenticated && isAuthPath) {
      console.log(
        `[Middleware] Authenticated user accessing auth path ${pathname}. Redirecting to ${pathsConfig.app.home}`
      );
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = pathsConfig.app.home;
      redirectUrl.search = ''; // クエリパラメータをクリア
      return NextResponse.redirect(redirectUrl);
    }

    // 上記以外はそのままレスポンスを返す (セッション更新クッキーは res に含まれている)
    console.log(`[Middleware] Allowing request to proceed for ${pathname}`);
    return res;
  } catch (e) {
    // middleware 内での予期せぬエラー
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error(
      `[Middleware] Unexpected error during Supabase session handling for ${pathname}:`,
      errorMessage
    );
    // 予期せぬエラーの場合も、とりあえずリクエストは通すが、ログは重要
    return res;
  }
}
