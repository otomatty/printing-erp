import * as react from 'react';

declare function PasswordResetRequestContainer(params: {
    redirectPath: string;
}): react.JSX.Element;

/**
 * @name UpdatePasswordForm
 * @description
 * パスワードリセット後の新しいパスワード設定フォームコンポーネント。
 * ユーザーが新しいパスワードを入力し、アカウントのパスワードを更新する機能を提供する。
 *
 * @features
 * - 新しいパスワード入力フィールド
 * - パスワード確認入力フィールド
 * - Zodスキーマによるフォームバリデーション
 * - 成功/エラー状態の表示
 * - リダイレクト機能
 *
 * @dependencies
 * - react-hook-form: フォーム状態管理
 * - zod: バリデーションスキーマ
 * - @kit/supabase/hooks/use-update-user-mutation: ユーザー情報更新フック
 *
 * @childComponents
 * - SuccessState: 成功状態表示コンポーネント
 * - ErrorState: エラー状態表示コンポーネント
 *
 * @param {Object} params
 * @param {string} params.redirectTo - パスワード更新成功後のリダイレクト先
 *
 * @example
 * ```tsx
 * <UpdatePasswordForm
 *   redirectTo="/auth/login"
 * />
 * ```
 */
declare function UpdatePasswordForm(params: {
    redirectTo: string;
}): react.JSX.Element;

export { PasswordResetRequestContainer, UpdatePasswordForm };
