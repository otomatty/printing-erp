import { InitOptions, i18n } from 'i18next';

/**
 * i18n.client.ts
 *
 * このファイルは、ブラウザ（クライアントサイド）でのi18n機能の初期化を担当します。
 * 主な役割：
 * 1. i18nextライブラリの初期化
 * 2. ブラウザの言語設定の検出
 * 3. 翻訳リソースの動的ロード
 * 4. React連携のセットアップ
 */

/**
 * クライアントサイドでi18nを初期化する関数
 *
 * @param settings - i18nの設定（言語、名前空間など）
 * @param resolver - 翻訳ファイルを動的に読み込むための関数
 * @returns 初期化されたi18nインスタンス
 */
declare function initializeI18nClient(settings: InitOptions, resolver: (lang: string, namespace: string) => Promise<object>): Promise<i18n>;

export { initializeI18nClient };
