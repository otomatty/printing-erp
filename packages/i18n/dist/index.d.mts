import { InitOptions } from 'i18next';

/**
 * create-i18n-settings.ts
 *
 * このファイルは、i18nextライブラリの設定を生成する関数を提供します。
 * 主な役割：
 * 1. i18nextの基本設定の生成
 * 2. 言語とネームスペースの設定
 * 3. フォールバック（代替言語）の設定
 * 4. Reactでの使用設定
 */

/**
 * i18nextの設定を生成する関数
 *
 * @param languages - サポートする言語のリスト（例：['en', 'ja', 'fr']）
 * @param language - 現在選択されている言語
 * @param namespaces - 翻訳のカテゴリー（例：['common', 'auth', 'settings']）
 * @returns i18nextの設定オブジェクト
 */
declare function createI18nSettings({ languages, language, namespaces, }: {
    languages: string[];
    language: string;
    namespaces?: string | string[];
}): InitOptions;

export { createI18nSettings };
