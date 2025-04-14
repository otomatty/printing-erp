import { SupabaseClient, User } from '@supabase/supabase-js';
import { Database } from './database.types.mjs';
import { MfaCheckerClient } from './check-requires-mfa.mjs';

/**
 * require-user.ts
 *
 * このファイルは保護されたルートやAPIエンドポイントで認証済みユーザーを要求するための
 * ユーティリティ関数を提供します。
 *
 * 主な機能:
 * - 現在のセッションからユーザー情報の取得と検証
 * - 未認証ユーザーの検出とサインインページへのリダイレクト情報の提供
 * - 多要素認証（MFA）が必要なユーザーの検出とMFA検証ページへのリダイレクト情報の提供
 *
 * 処理の流れ:
 * 1. Supabaseクライアントからユーザー情報を取得
 * 2. ユーザーが存在しない場合、AuthenticationErrorをスローし、サインインページへの
 *    リダイレクト情報を返す
 * 3. ユーザーが存在する場合、多要素認証が必要かどうかを確認
 * 4. 多要素認証が必要な場合、MultiFactorAuthErrorをスローし、MFA検証ページへの
 *    リダイレクト情報を返す
 * 5. すべての条件を満たす場合、ユーザー情報を返す
 *
 * 特記事項:
 * - AuthenticationErrorとMultiFactorAuthErrorの2つのカスタムエラークラスを定義
 * - check-requires-mfa.tsと連携して多要素認証の要件を確認
 *
 * 使用例:
 * ```
 * // 保護されたルートやAPIエンドポイントで
 * const supabase = getSupabaseServerClient();
 * const { data: user, error, redirectTo } = await requireUser(supabase);
 *
 * if (error) {
 *   // ユーザーを適切なページにリダイレクト
 *   redirect(redirectTo);
 * }
 *
 * // 認証済みユーザーとしての処理を続行
 * ```
 *
 * 注意点:
 * - このファイルはサーバーサイドでのみ使用することを想定しています
 * - 認証が必要なページやAPIエンドポイントの入り口で使用し、未認証ユーザーのアクセスを防ぎます
 * - リダイレクトパスは定数として定義されており、必要に応じてカスタマイズできます
 */

type UserRequireClient = SupabaseClient<Database> & {
    auth: SupabaseClient<Database>['auth'] & MfaCheckerClient['auth'];
};
/**
 * @name requireUser
 * @description Require a session to be present in the request
 * @param client - SupabaseClient型のクライアント
 */
declare function requireUser(client: SupabaseClient<Database>): Promise<{
    error: null;
    data: User;
} | ({
    error: AuthenticationError;
    data: null;
    redirectTo: string;
} | {
    error: MultiFactorAuthError;
    data: null;
    redirectTo: string;
})>;
declare class AuthenticationError extends Error {
    constructor();
}
declare class MultiFactorAuthError extends Error {
    constructor();
}

export { type UserRequireClient, requireUser };
