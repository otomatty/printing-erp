/**
 * アプリケーションのエラーコード
 */
type ErrorCode = "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "VALIDATION_ERROR" | "DATABASE_ERROR" | "INTERNAL_ERROR";
/**
 * アプリケーションのエラー型
 */
interface AppError {
    code: ErrorCode;
    message: string;
    status: number;
    cause?: unknown;
}
/**
 * フォーカスセッション関連のエラーメッセージ
 */
declare const FOCUS_ERROR_MESSAGES: {
    readonly UNAUTHORIZED: "認証が必要です";
    readonly FORBIDDEN: "この操作を実行する権限がありません";
    readonly SESSION_NOT_FOUND: "セッションが見つかりません";
    readonly INTERVAL_NOT_FOUND: "インターバルが見つかりません";
    readonly SESSION_CREATE_FAILED: "セッションの作成に失敗しました";
    readonly SESSION_UPDATE_FAILED: "セッションの更新に失敗しました";
    readonly INTERVAL_CREATE_FAILED: "インターバルの作成に失敗しました";
    readonly INTERVAL_UPDATE_FAILED: "インターバルの更新に失敗しました";
};
interface ApiError {
    message: string;
    status: number;
    details?: unknown;
}

export { type ApiError, type AppError, type ErrorCode, FOCUS_ERROR_MESSAGES };
