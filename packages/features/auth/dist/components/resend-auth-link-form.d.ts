import * as react from 'react';

/**
 * @name ResendAuthLinkForm
 * @description
 * 認証リンク（サインアップ確認メールなど）の再送信フォームコンポーネント。
 * ユーザーがメールアドレスを入力し、認証リンクを再送信する機能を提供する。
 *
 * @features
 * - メールアドレス入力フォーム
 * - CAPTCHAトークンの管理
 * - Supabaseを使用した認証リンク再送信機能
 * - 送信成功表示
 * - リダイレクトパスの設定
 *
 * @dependencies
 * - react-hook-form: フォーム状態管理
 * - zod: バリデーションスキーマ
 * - @tanstack/react-query: データフェッチングライブラリ
 * - @kit/supabase/hooks/use-supabase: Supabaseクライアントフック
 *
 * @param {Object} props
 * @param {string} [props.redirectPath] - 認証後のリダイレクトパス
 *
 * @example
 * ```tsx
 * <ResendAuthLinkForm redirectPath="/auth/confirm" />
 * ```
 */
declare function ResendAuthLinkForm(props: {
    redirectPath?: string;
}): react.JSX.Element;

export { ResendAuthLinkForm };
