/**
 * Next.jsミドルウェアファイル
 *
 * このファイルはリクエストがルートハンドラーに到達する前に実行される処理を定義します。
 * 認証状態の確認、CSRF保護、リクエストIDの設定、国際化などを行い、
 * 適切なリダイレクトやヘッダー設定を行います。
 */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { CsrfError, createCsrfProtect } from '@edge-csrf/nextjs';

import { createMiddlewareClient } from '@kit/supabase/middleware-client';

import appConfig from '~/config/app.config';
import pathsConfig from '~/config/paths.config';

// CSRFトークンを保存するCookie名
const CSRF_SECRET_COOKIE = 'csrfSecret';
// Next.jsのサーバーアクションを識別するためのヘッダー名
const NEXT_ACTION_HEADER = 'next-action';

/* // コメントアウト開始
// 国際化ミドルウェアの作成
const intlMiddleware = createNextIntlMiddleware({
  // サポートするロケール
  locales: ['ja', 'en'],
  // デフォルトのロケール
  defaultLocale: 'ja',
  // 国際化パスのパターン
  localePrefix: 'as-needed',
});
*/ // コメントアウト終了

/**
 * ミドルウェアが適用されるパスのマッチャー設定
 * 静的ファイルや画像、APIルートなどを除外
 */
export const config = {
  matcher: [
    // 静的ファイル、画像、APIルート、manifest.jsonなどを除外
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|workbox-.*.js).*)',
  ],
};

/**
 * CSRF保護ミドルウェア
 *
 * @param request - Nextリクエストオブジェクト
 * @param response - Nextレスポンスオブジェクト（デフォルトは新しいレスポンス）
 * @param domain - クッキーのドメイン設定
 * @returns CSRF保護が適用されたレスポンス
 */
async function withCsrfMiddleware(
  request: NextRequest,
  response = new NextResponse(),
  domain = ''
) {
  // CSRF保護の設定
  const csrfProtect = createCsrfProtect({
    cookie: {
      secure: appConfig.production, // 本番環境ではセキュアCookieを使用
      name: CSRF_SECRET_COOKIE, // CSRFシークレットを保存するCookie名
      domain, // サブドメイン間でCookieを共有するためのドメイン設定
    },
    // サーバーアクションの場合はPOSTメソッドをCSRF検証から除外（Next.jsに組み込み保護があるため）
    // それ以外の場合は常にGET、HEAD、OPTIONSメソッドを除外
    ignoreMethods: isServerAction(request)
      ? ['POST']
      : ['GET', 'HEAD', 'OPTIONS'],
  });

  try {
    // リクエストにCSRF保護を適用
    await csrfProtect(request, response);

    return response;
  } catch (error) {
    // CSRFエラーの場合、401（認証エラー）レスポンスを返す
    if (error instanceof CsrfError) {
      return NextResponse.json('Invalid CSRF token', {
        status: 401,
      });
    }

    // その他のエラーは再スロー
    throw error;
  }
}

/**
 * リクエストがサーバーアクションかどうかを判定する関数
 *
 * @param request - Nextリクエストオブジェクト
 * @returns サーバーアクションの場合はtrue
 */
function isServerAction(request: NextRequest) {
  const headers = new Headers(request.headers);

  return headers.has(NEXT_ACTION_HEADER);
}

/**
 * メインサイトへのリダイレクトURLを生成してリダイレクトする補助関数
 * @param req - NextRequest
 * @returns NextResponse (リダイレクト)
 */
function redirectToMainSite(req: NextRequest): NextResponse {
  // 環境変数からメインサイトのURLを取得、ない場合はデフォルト値を使用
  const mainSiteUrl =
    process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:2120';
  return NextResponse.redirect(mainSiteUrl);
}

/**
 * 未認証ユーザーを認証案内ページにリダイレクトする補助関数
 * @param req - NextRequest
 * @returns NextResponse (リダイレクト)
 */
function redirectToMustAuthenticatePage(req: NextRequest): NextResponse {
  const redirectUrl = new URL(
    pathsConfig.auth.mustAuthenticate,
    req.nextUrl.origin
  ).href;

  return NextResponse.redirect(redirectUrl);
}

/**
 * リクエストに一意のIDを設定する関数
 *
 * @param request - リクエストオブジェクト
 */
function setRequestId(request: Request) {
  request.headers.set('x-correlation-id', crypto.randomUUID());
}

/**
 * Next.jsミドルウェア関数
 * @param request - Nextリクエストオブジェクト
 * @returns Nextレスポンスオブジェクト
 */
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  const supabase = createMiddlewareClient(request, response);

  // セッション更新（これは必要）
  // getUserの前に実行してセッションを確実に最新にする
  const { error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    console.error('[Middleware] Error refreshing session:', sessionError);
    // セッション取得エラー時の処理 (例: エラーページへリダイレクト)
    // return NextResponse.redirect(new URL('/error', request.url));
  }

  // 各リクエストに一意のIDを設定
  setRequestId(request);

  // 認証が不要なパスはそのまま通す
  const publicPaths = pathsConfig.publicPaths;
  if (publicPaths.includes(pathname) || pathname.startsWith('/api/')) {
    return response; // 認証不要ならここで終了
  }

  // === 認証情報と権限の取得 ===
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(); // ここでユーザー情報を取得

  let isAdmin = false;
  let userId: string | undefined = undefined;
  let userEmail: string | undefined = undefined;

  if (userError && !user) {
    // エラーがあり、かつユーザーがnullの場合のみログ出力（エラーハンドリングは改善の余地あり）
    console.error(
      '[Middleware] Error fetching user and user is null:',
      userError
    );
    // ここでリダイレクトするかどうかは要検討。現状は先に進む
  }

  if (user) {
    userId = user.id;
    userEmail = user.email;
    try {
      // --- ★変更点: ここで直接RPCを呼び出す ---
      // ミドルウェアで作成した supabase クライアントを使用する

      const { data: isAdminResult, error: rpcError } =
        await supabase.rpc('check_is_admin');

      if (rpcError) {
        console.error(
          '[Middleware] Error calling check_is_admin RPC:',
          rpcError
        );
        isAdmin = false; // エラー時は管理者ではないと判断
      } else {
        isAdmin = !!isAdminResult; // 結果をbooleanに変換
      }
      // --- ★変更点ここまで ---
    } catch (error) {
      // rpc呼び出し自体の予期せぬエラー
      console.error(
        '[Middleware] Unexpected error checking admin status:',
        error
      );
      isAdmin = false;
    }
  }

  // ユーザー未認証の場合
  if (!user) {
    console.log(
      '[Middleware] User not authenticated (user object is null), redirecting to must-authenticate page'
    );
    // 未認証なら認証ページへリダイレクト
    // リダイレクトループを防ぐために、認証ページ自体へのアクセスは除外する
    if (pathname !== pathsConfig.auth.mustAuthenticate) {
      return redirectToMustAuthenticatePage(request);
    }
    // 既に認証ページにいる場合は何もしないか、別の処理を行う
    console.log(
      '[Middleware] Already on must-authenticate page or loop detected. Returning response.'
    );
    return response; // or specific handling
  }

  // 管理者でない場合
  if (!isAdmin) {
    // 管理者以外のユーザーがアクセスしようとしたパスが、
    // 管理者専用でない共通パス（例: /dashboard）の場合はリダイレクトしないようにする
    // 必要に応じて、管理者専用パスのリスト `adminOnlyPaths` を定義
    const adminOnlyPaths = ['/settings']; // 例: /settings 以下は管理者のみ

    // 現在のパスが管理者専用パスに含まれるかチェック
    const requiresAdmin = adminOnlyPaths.some((p) => pathname.startsWith(p));

    if (requiresAdmin) {
      return redirectToMainSite(request); // 管理者専用パスへのアクセスならメインサイトへ
    }
  }

  // --- 認証・権限チェックを通過した場合 ---

  // ホスト名とドメイン設定
  const host = request.headers.get('host') || '';
  const domain =
    process.env.SUPABASE_AUTH_COOKIE_DOMAIN ||
    process.env.AUTH_COOKIE_DOMAIN ||
    process.env.COOKIE_DOMAIN;

  // CSRF保護を適用（変更を伴わないリクエストも含む可能性があるため、ここで適用）
  // withCsrfMiddleware内でGETなどは除外される
  const csrfResponse = await withCsrfMiddleware(request, response, domain);
  if (
    csrfResponse.status !== 200 &&
    !NextResponse.next().headers.get('x-middleware-next') // Check if it's just passing through
  ) {
    console.log(
      `[Middleware] CSRF middleware returned status ${csrfResponse.status}. Returning CSRF response.`
    );
    // CSRFミドルウェアがリダイレクトやエラーレスポンスを返した場合、それを優先する
    // ただし、NextResponse.next() の場合はヘッダーを設定して続行
    return csrfResponse;
  }

  // 取得した認証情報をリクエストヘッダーに設定
  const requestHeaders = new Headers(request.headers);
  if (userId) requestHeaders.set('x-user-id', userId);
  if (userEmail) requestHeaders.set('x-user-email', userEmail);
  requestHeaders.set('x-is-admin', String(isAdmin));

  // サーバーアクションの場合、パスもヘッダーに追加
  if (isServerAction(request)) {
    requestHeaders.set('x-action-path', request.nextUrl.pathname);
  }

  // 設定したヘッダーを持つレスポンスを返す
  // csrfResponseから必要なヘッダー（Set-Cookieなど）をマージする
  const finalHeaders = new Headers(csrfResponse.headers); // Start with headers from CSRF response
  requestHeaders.forEach((value, key) => {
    if (!finalHeaders.has(key)) {
      // Avoid overwriting CSRF headers like Set-Cookie if already set
      finalHeaders.set(key, value);
    }
  });

  return NextResponse.next({
    request: {
      headers: requestHeaders, // ユーザー情報を含むヘッダー (これは内部的なリクエスト用)
    },
    headers: finalHeaders, // CSRFトークンなどを含むヘッダー (これがブラウザに返る)
  });
}
