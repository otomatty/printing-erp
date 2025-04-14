export { getSupabaseBrowserClient } from './clients/browser-client.js';
export { getSupabaseServerClient } from './clients/server-client.js';
export { UserRequireClient, requireUser } from './require-user.js';
export { MfaCheckerClient, checkRequiresMultiFactorAuthentication } from './check-requires-mfa.js';
import { NextRequest } from 'next/server';
export { Database } from './database.types.js';
import '@supabase/supabase-js';
import '@supabase/supabase-js/dist/module/lib/types';

/**
 * 認証コールバック処理を表す型
 */
type HandleCallbackResult = {
    type: 'success';
    nextPath: string;
} | {
    type: 'error';
    errorType: string;
    errorMessage: string;
    nextPath: string;
};
/**
 * 認証コールバックを処理し、リダイレクト先のパスまたはエラー情報を返します。
 * @param request NextRequestオブジェクト
 * @param defaultRedirectPath 認証成功時のデフォルトリダイレクト先
 * @returns HandleCallbackResult
 */
declare function handleAuthCallback(request: NextRequest, defaultRedirectPath: string): Promise<HandleCallbackResult>;

export { type HandleCallbackResult, handleAuthCallback };
