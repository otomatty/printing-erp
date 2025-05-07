import type { NextRequest } from 'next/server';
import { handleAuthCallback } from '@kit/supabase/handle-auth-callback';

// Edge Runtimeではなく、Node.js環境で実行するための設定
export const runtime = 'nodejs';

/**
 * 認証コールバック処理を行うハンドラー
 * このルートは認証プロバイダーからのコールバックを受け取り、セッションを確立します
 */
export async function GET(request: NextRequest) {
  try {
    // パッケージ側の関数を呼び出し
    const result = await handleAuthCallback(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      request as any, // 型アサーションで型の不一致を解決
      '/webapp' // 成功時のデフォルトリダイレクト先
    );
    // 結果に基づいてリダイレクト - Response.redirectを使用
    // リダイレクト先のURLを生成する際は、元のリクエストURLを基準にする
    const redirectUrl = new URL(result.nextPath, request.url);
    return Response.redirect(redirectUrl, 307);
  } catch (error) {
    // 予期せぬエラー処理 (handleAuthCallback内でエラーが捕捉されなかった場合など)
    const errorType =
      error instanceof Error ? error.constructor.name : typeof error;
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      `[AuthCallbackRoute] Error during callback processing: Type=${errorType}, Message=${errorMessage}`,
      error // スタックトレース等も出力
    );

    // エラー情報をクエリパラメータに追加してエラーページへリダイレクト
    const errorRedirectUrl = new URL('/auth/callback/error', request.url);
    errorRedirectUrl.searchParams.set(
      'error',
      '認証処理中にエラーが発生しました'
    );
    errorRedirectUrl.searchParams.set('error_type', errorType);
    errorRedirectUrl.searchParams.set('error_message', errorMessage);

    // Response.redirectを使用
    return Response.redirect(errorRedirectUrl, 307);
  }
}
