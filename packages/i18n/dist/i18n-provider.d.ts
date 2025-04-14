import { InitOptions } from 'i18next';
import React from 'react';

/**
 * i18n-provider.tsx
 *
 * このファイルは、アプリケーション全体の国際化（i18n）機能を提供するReactコンポーネントを定義します。
 * 主な役割：
 * 1. サーバーサイドで生成された言語設定をクライアントサイドで読み取る
 * 2. i18nextの初期化を管理
 * 3. アプリケーション全体に翻訳機能を提供
 *
 * 使用例：
 * ```tsx
 * <I18nProvider settings={i18nSettings} resolver={loadTranslations}>
 *   <App />
 * </I18nProvider>
 * ```
 */

/**
 * 翻訳リソースを取得するための関数の型定義
 * lang: 言語コード（例：'en', 'ja'）
 * namespace: 翻訳のカテゴリー（例：'common', 'auth'）
 */
type Resolver = (lang: string, namespace: string) => Promise<Record<string, string>>;
/**
 * i18n機能を提供するプロバイダーコンポーネント
 *
 * @param settings - i18nの基本設定（デフォルトの言語、サポートする言語など）
 * @param resolver - 翻訳ファイルを動的に読み込むための関数
 * @param children - 子コンポーネント
 */
declare function I18nProvider({ settings, children, resolver, }: React.PropsWithChildren<{
    settings: InitOptions;
    resolver: Resolver;
}>): React.JSX.Element | null;

export { I18nProvider };
