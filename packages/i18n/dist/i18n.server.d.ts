import { InitOptions, i18n } from 'i18next';

/**
 * i18n.server.ts
 *
 * このファイルは、サーバーサイドでのi18n機能の初期化と言語設定の処理を担当します。
 * 主な役割：
 * 1. サーバーサイドレンダリング（SSR）時のi18n初期化
 * 2. React Server Components（RSC）でのi18nサポート
 * 3. ブラウザの言語設定（Accept-Language）の解析
 */

/**
 * サーバーサイドでi18nを初期化する関数
 * SSRとRSCの両方で使用されます
 *
 * @param settings - i18nの設定（言語、名前空間など）
 * @param resolver - 翻訳ファイルを動的に読み込むための関数
 * @returns 初期化されたi18nインスタンス
 */
declare function initializeServerI18n(settings: InitOptions, resolver: (language: string, namespace: string) => Promise<object>): Promise<i18n>;
/**
 * ブラウザから送信される Accept-Language ヘッダーを解析する関数
 *
 * @param languageHeaderValue - Accept-Language ヘッダーの値（例：'ja,en-US;q=0.9,en;q=0.8'）
 * @param acceptedLanguages - アプリケーションがサポートする言語のリスト
 * @returns サポートされている言語のリスト（優先度順）
 */
declare function parseAcceptLanguageHeader(languageHeaderValue: string | null | undefined, acceptedLanguages: string[]): string[];

export { initializeServerI18n, parseAcceptLanguageHeader };
