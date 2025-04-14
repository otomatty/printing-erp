/**
 * auth-callback.service.ts
 *
 * このファイルはSupabaseの認証コールバック処理を管理するサービスを提供します。
 * OAuth認証やマジックリンク認証などの外部認証プロバイダーからのコールバック処理を扱います。
 *
 * 主な機能:
 * - トークンハッシュの検証と適切なリダイレクト処理
 * - 認証コードとセッションの交換
 * - エラーハンドリングと適切なエラーメッセージの生成
 *
 * 処理の流れ:
 * 1. createAuthCallbackService関数でAuthCallbackServiceのインスタンスを作成
 * 2. AuthCallbackServiceクラスが以下の主要メソッドを提供:
 *    - verifyTokenHash: メール認証やパスワードリセットなどのフローで使用
 *    - exchangeCodeForSession: OAuth認証フローで使用
 * 3. エラー発生時は適切なエラーメッセージを生成し、エラーページにリダイレクト
 *
 * 特記事項:
 * - 異なるブラウザでの認証試行など、一般的なエラーケースに対する特別な処理が実装されています
 * - 認証フローの複雑なエッジケースを処理するための堅牢な実装が含まれています
 *
 * 使用例:
 * ```
 * // auth-callback.tsなどのルートハンドラ内で
 * const supabase = getSupabaseServerClient();
 * const service = createAuthCallbackService(supabase);
 *
 * // トークンハッシュの検証
 * const url = await service.verifyTokenHash(request, {
 *   redirectPath: '/dashboard'
 * });
 *
 * // または認証コードとセッションの交換
 * const { nextPath } = await service.exchangeCodeForSession(request, {
 *   redirectPath: '/dashboard'
 * });
 * ```
 *
 * 注意点:
 * - このサービスはサーバーサイドでのみ使用することを想定しています
 * - 認証コールバックの処理は複雑なため、このサービスを使用して適切に処理することが重要です
 */

/**
 * 汎用的な認証エラーインターフェース
 */
interface AuthCallbackError {
    message: string;
    status?: number;
    code?: string | number;
}
/**
 * 汎用的な認証セッションインターフェース
 */
interface AuthCallbackSession {
    [key: string]: unknown;
}
/**
 * 汎用的な認証ユーザーインターフェース
 */
interface AuthCallbackUser {
    [key: string]: unknown;
}
/**
 * 認証クライアントインターフェース (汎用化版)
 * Supabaseクライアントから必要な機能のみを抽出したインターフェース
 */
interface AuthClientInterface {
    auth: {
        verifyOtp(params: {
            type: string;
            token_hash: string;
        }): Promise<{
            data?: {
                user?: AuthCallbackUser | null;
            } | null;
            error?: AuthCallbackError | null;
        }>;
        exchangeCodeForSession(code: string): Promise<{
            data: {
                session: AuthCallbackSession | null;
            } | null;
            error: AuthCallbackError | null;
        }>;
    };
}
/**
 * クッキーを操作するためのサービスインターフェース
 */
interface CookiesService {
    get(name: string): string | undefined;
    set(name: string, value: string, options?: CookieOptions): void;
    delete(name: string, options?: CookieOptions): void;
}
/**
 * クッキーのオプション
 */
interface CookieOptions {
    domain?: string;
    path?: string;
    maxAge?: number;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
}
/**
 * 成功または失敗を表すResultクラス
 * @template T 成功時の値の型
 * @template E 失敗時のエラーの型
 */
declare class Result<T, E> {
    private readonly _value;
    private readonly _error;
    private readonly _isOk;
    private constructor();
    static ok<T, E>(value: T): Result<T, E>;
    static error<T, E>(error: E): Result<T, E>;
    get isOk(): boolean;
    get isErr(): boolean;
    get value(): T | null;
    get error(): E | null;
}
/**
 * 認証コールバックのパラメータ
 */
interface CallbackParams {
    code?: string;
    state?: string;
    error?: string;
    errorDescription?: string;
}
/**
 * エラーコード列挙型
 */
declare enum ErrorCode {
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
    OAUTH_ERROR = "OAUTH_ERROR",
    STATE_ERROR = "STATE_ERROR",
    STATE_MISMATCH = "STATE_MISMATCH",
    CODE_ERROR = "CODE_ERROR",
    SESSION_ERROR = "SESSION_ERROR",
    CODE_VERIFIER_ERROR = "CODE_VERIFIER_ERROR",
    EXCHANGE_ERROR = "EXCHANGE_ERROR",
    REDIRECT_ERROR = "REDIRECT_ERROR",
    INVALID_REDIRECT = "INVALID_REDIRECT"
}
/**
 * @name createAuthCallbackService
 * @description Creates an instance of the AuthCallbackService
 * @param client
 */
declare function createAuthCallbackService(client: AuthClientInterface): AuthCallbackService;
/**
 * @name AuthCallbackService
 * @description Service for handling auth callbacks in Supabase
 *
 * This service handles a variety of situations and edge cases in Supabase Auth.
 *
 */
declare class AuthCallbackService {
    private readonly client;
    private readonly STATE_COOKIE;
    private readonly CODE_VERIFIER_COOKIE;
    private readonly REDIRECT_TO_COOKIE;
    constructor(client: AuthClientInterface);
    /**
     * OAuth認証コールバック処理を行います
     *
     * @param cookies クッキーサービス
     * @param callbackParams コールバックパラメータ
     * @param searchParams URLのクエリパラメータ
     * @returns リダイレクトURLまたはエラーコード
     */
    oAuthCallback(cookies: CookiesService, callbackParams: CallbackParams, searchParams: Record<string, string | string[]>): Promise<Result<string, ErrorCode>>;
    /**
     * @name verifyTokenHash
     * @description Verifies the token hash and type and redirects the user to the next page
     * This should be used when using a token hash to verify the user's email
     * @param request
     * @param params
     */
    verifyTokenHash(request: Request, params: {
        redirectPath: string;
        errorPath?: string;
    }): Promise<URL>;
    /**
     * @name exchangeCodeForSession
     * @description Exchanges the auth code for a session and redirects the user to the next page or an error page
     * @param request
     * @param params
     */
    exchangeCodeForSession(request: Request, params: {
        redirectPath: string;
        errorPath?: string;
    }): Promise<{
        nextPath: string;
    }>;
    /**
     * コードをセッションと交換し、関連するクッキーを処理します
     *
     * @param cookies クッキーサービス
     * @param code 認証コード
     * @returns セッションまたはエラーコード
     */
    private exchangeCodeForSessionWithCookies;
    /**
     * リダイレクトURLを取得します
     *
     * @param cookies クッキーサービス
     * @returns リダイレクトURLまたはエラーコード
     */
    getRedirectUrl(cookies: CookiesService): Promise<Result<string, ErrorCode>>;
    /**
     * 許可されたリダイレクトURLのリストを取得します
     */
    private getAllowedRedirectUrls;
    /**
     * リダイレクトURLが有効かどうかを確認します
     *
     * @param url チェックするURL
     * @returns 有効な場合はtrue、そうでない場合はfalse
     */
    private isValidRedirectUrl;
    /**
     * PKCE認証フローで使用するクッキーをクリアします
     *
     * @param cookies クッキーサービス
     */
    private clearPKCECookies;
    /**
     * エラーコードに基づいてエラーレスポンスを処理します
     *
     * @param errorCode エラーコード
     * @param error オプションのエラーオブジェクト
     * @param errorDescription オプションのエラー説明
     * @returns エラーを示すResultオブジェクト
     */
    private handleCallbackError;
}

export { type AuthClientInterface, type CallbackParams, type CookieOptions, type CookiesService, ErrorCode, Result, createAuthCallbackService };
