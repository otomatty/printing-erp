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
    // public/images 以下の静的アセットも除外する
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|workbox-.*.js|images).*)',
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
  // Basic Auth implementation: bypass Supabase auth and allow only Basic Auth users
  const authHeader = request.headers.get('authorization');
  const BASIC_USER = process.env.BASIC_AUTH_USER;
  const BASIC_PASS = process.env.BASIC_AUTH_PASSWORD;
  // Ensure credentials are configured
  if (!BASIC_USER || !BASIC_PASS) {
    console.error(
      '[Middleware] BASIC_AUTH_USER or BASIC_AUTH_PASSWORD is not set'
    );
    return new NextResponse('Server configuration error', { status: 500 });
  }
  // Challenge for missing Authorization header
  if (!authHeader) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Restricted"' },
    });
  }
  const [scheme, credentials] = authHeader.split(' ');
  if (scheme !== 'Basic' || !credentials) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Restricted"' },
    });
  }
  let decoded: string;
  try {
    decoded = atob(credentials);
  } catch {
    return new NextResponse('Invalid authentication token', { status: 400 });
  }
  const [username, password] = decoded.split(':');
  if (username !== BASIC_USER || password !== BASIC_PASS) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Restricted"' },
    });
  }
  // Authenticated: allow all pages
  return NextResponse.next();
}
