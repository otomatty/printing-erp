import * as react from 'react';

/**
 * @name MultiFactorChallengeContainer
 * @description
 * 多要素認証（MFA）のチャレンジを処理するコンテナコンポーネント。
 * ユーザーが認証アプリなどから取得した検証コードを入力し、多要素認証を完了する機能を提供する。
 *
 * @features
 * - 検証コード入力フォーム（OTP入力）
 * - 認証要素の取得と表示
 * - 検証コードの検証
 * - エラー表示
 * - 認証成功後のリダイレクト
 * - サインアウト機能
 *
 * @dependencies
 * - react-hook-form: フォーム状態管理
 * - zod: バリデーションスキーマ
 * - @tanstack/react-query: データフェッチングライブラリ
 * - @kit/supabase/hooks: Supabase関連フック
 * - @kit/ui: UIコンポーネント
 *
 * @param {React.PropsWithChildren<{userId: string, paths: {redirectPath: string}}>} props
 * @param {string} props.userId - ユーザーID
 * @param {Object} props.paths - パス設定
 * @param {string} props.paths.redirectPath - 認証成功後のリダイレクトパス
 *
 * @example
 * ```tsx
 * <MultiFactorChallengeContainer
 *   userId="user-123"
 *   paths={{
 *     redirectPath: "/dashboard"
 *   }}
 * />
 * ```
 */
declare function MultiFactorChallengeContainer({ paths, userId, }: React.PropsWithChildren<{
    userId: string;
    paths: {
        redirectPath: string;
    };
}>): react.JSX.Element;

export { MultiFactorChallengeContainer };
