import { PostgrestError } from '@supabase/supabase-js';

/**
 * Check if the code is running in a browser environment.
 */
declare function isBrowser(): boolean;
/**
 * @name formatCurrency
 * @description Format the currency based on the currency code
 */
declare function formatCurrency(params: {
    currencyCode: string;
    locale: string;
    value: string | number;
}): string;

/**
/**
 * スネークケースからキャメルケースへの変換
 * @param S スネークケースの文字列
 * @returns キャメルケースの文字列
 */
type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}` ? `${Lowercase<T>}${Capitalize<SnakeToCamelCase<U>>}` : S;
type SnakeToCamelCaseNested<T> = T extends object ? {
    [K in keyof T as SnakeToCamelCase<K & string>]: SnakeToCamelCaseNested<T[K]>;
} : T;
/**
 * キャメルケースからスネークケースへの変換
 * @param S キャメルケースの文字列
 * @returns スネークケースの文字列
 */
type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}` ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeCase<U>}` : S;
type CamelCaseToSnakeNested<T> = T extends object ? {
    [K in keyof T as CamelToSnakeCase<K & string>]: CamelCaseToSnakeNested<T[K]>;
} : T;
declare const camelToSnake: <T extends Record<string, unknown> | readonly Record<string, unknown>[]>(data: T) => CamelCaseToSnakeNested<T>;
declare const snakeToCamel: <T extends Record<string, unknown> | readonly Record<string, unknown>[]>(data: T) => SnakeToCamelCaseNested<T>;

/**
 * 日付操作ユーティリティ
 */
/**
 * 日付をYYYY-MM-DD形式の文字列に変換する
 * @param date 変換する日付
 * @returns YYYY-MM-DD形式の文字列
 */
declare const formatDateToYYYYMMDD: (date: Date) => string;
/**
 * 日付をYYYY年MM月DD日形式の文字列に変換する
 * @param date 変換する日付
 * @returns YYYY年MM月DD日形式の文字列
 */
declare const formatDateToJapanese: (date: Date) => string;
/**
 * 現在の日付から指定した日数前の日付を取得する
 * @param days 日数
 * @returns 指定した日数前の日付
 */
declare const getDateBefore: (days: number) => Date;
/**
 * 現在の日付から指定した日数後の日付を取得する
 * @param days 日数
 * @returns 指定した日数後の日付
 */
declare const getDateAfter: (days: number) => Date;
/**
 * 2つの日付の間の日数を計算する
 * @param date1 日付1
 * @param date2 日付2
 * @returns 日数
 */
declare const getDaysBetween: (date1: Date, date2: Date) => number;
/**
 * 日付が週末（土曜または日曜）かどうかを判定する
 * @param date 判定する日付
 * @returns 週末の場合はtrue、それ以外の場合はfalse
 */
declare const isWeekend: (date: Date) => boolean;

/**
 * 文字列操作ユーティリティ
 */
/**
 * 文字列を指定した長さに切り詰め、必要に応じて末尾に省略記号を追加する
 * @param str 対象の文字列
 * @param maxLength 最大長
 * @param suffix 省略記号（デフォルト: "..."）
 * @returns 切り詰められた文字列
 */
declare const truncate: (str: string, maxLength: number, suffix?: string) => string;
/**
 * 文字列が有効なURLかどうかを検証する
 * @param str 検証する文字列
 * @returns 有効なURLの場合はtrue、それ以外の場合はfalse
 */
declare const isValidUrl: (str: string) => boolean;
/**
 * 文字列が有効なメールアドレスかどうかを検証する
 * @param str 検証する文字列
 * @returns 有効なメールアドレスの場合はtrue、それ以外の場合はfalse
 */
declare const isValidEmail: (str: string) => boolean;
/**
 * 文字列から特殊文字をエスケープする
 * @param str エスケープする文字列
 * @returns エスケープされた文字列
 */
declare const escapeHtml: (str: string) => string;
/**
 * 文字列をスラッグ形式に変換する（小文字、ハイフン区切り）
 * @param str 変換する文字列
 * @returns スラッグ形式の文字列
 */
declare const slugify: (str: string) => string;

/**
 * フォーマットユーティリティ
 * 様々なデータ型を人間が読みやすい形式に変換する関数を提供します。
 */
/**
 * ファイルサイズを人間が読みやすい形式にフォーマットする
 * @param bytes ファイルサイズ（バイト）
 * @returns フォーマットされたファイルサイズ
 */
declare function formatFileSize(bytes: number): string;
/**
 * 日付を日本語フォーマットに変換する
 * @param date - ISO形式の日付文字列
 * @returns フォーマットされた日付文字列
 */
declare function formatDate(date: string): string;
/**
 * 日付と時刻を日本語フォーマットに変換する
 * @param date - ISO形式の日付文字列
 * @returns フォーマットされた日付と時刻の文字列
 */
declare function formatDateTime(date: string): string;
/**
 * 数値を日本語フォーマットに変換する
 * @param num - フォーマットする数値
 * @returns フォーマットされた数値文字列
 */
declare function formatNumber(num: number): string;
/**
 * 時間を日本語フォーマットに変換する
 * @param seconds - 秒数
 * @returns フォーマットされた時間文字列
 */
declare function formatTime(seconds: number): string;
/**
 * 時間をタイマー表示形式でフォーマットする
 * @param seconds - 秒数
 * @returns フォーマットされた時間文字列 (MM:SS または HH:MM:SS)
 */
declare function formatTimerDisplay(seconds: number): string;

/**
 * エラーハンドリングユーティリティ
 * 様々なエラーをアプリケーションのエラー形式に変換する関数を提供します。
 */

/**
 * アプリケーションのエラーコード
 */
type ErrorCode = 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'VALIDATION_ERROR' | 'DATABASE_ERROR' | 'INTERNAL_ERROR';
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
 * Supabaseのエラーをアプリケーションのエラーに変換する
 * @param error - Supabaseから返されたエラー
 * @returns アプリケーションのエラー形式に変換されたエラー
 */
declare function handleSupabaseError(error: PostgrestError): AppError;
/**
 * 未知のエラーをアプリケーションのエラーに変換する
 * @param error - 未知のエラー
 * @returns アプリケーションのエラー形式に変換されたエラー
 */
declare function handleUnknownError(error: unknown): AppError;
/**
 * エラーをアプリケーションのエラーに変換する
 * @param error - 変換するエラー
 * @returns アプリケーションのエラー形式に変換されたエラー
 */
declare function handleError(error: unknown): AppError;

export { type AppError, type CamelCaseToSnakeNested, type CamelToSnakeCase, type ErrorCode, type SnakeToCamelCase, type SnakeToCamelCaseNested, camelToSnake, escapeHtml, formatCurrency, formatDate, formatDateTime, formatDateToJapanese, formatDateToYYYYMMDD, formatFileSize, formatNumber, formatTime, formatTimerDisplay, getDateAfter, getDateBefore, getDaysBetween, handleError, handleSupabaseError, handleUnknownError, isBrowser, isValidEmail, isValidUrl, isWeekend, slugify, snakeToCamel, truncate };
