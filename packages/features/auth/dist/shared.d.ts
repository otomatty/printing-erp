import * as react from 'react';

/**
 * @name AuthLayoutShell
 * @description
 * 認証関連ページの共通レイアウトを提供するコンポーネント。
 * ログイン、サインアップ、パスワードリセットなどの認証関連ページで使用される。
 *
 * @features
 * - レスポンシブデザイン対応（モバイル、タブレット、デスクトップ）
 * - アニメーション効果（フェードイン、スライドイン、ズームイン）
 * - オプショナルなロゴ表示
 * - 中央配置のコンテンツエリア
 *
 * @param {React.PropsWithChildren<{Logo?: React.ComponentType}>} props
 * @param {React.ReactNode} props.children - レイアウト内に表示する子コンポーネント
 * @param {React.ComponentType} [props.Logo] - 表示するロゴコンポーネント（オプション）
 *
 * @example
 * ```tsx
 * <AuthLayoutShell Logo={MyLogo}>
 *   <SignInForm />
 * </AuthLayoutShell>
 * ```
 */
declare function AuthLayoutShell({ children, Logo, }: React.PropsWithChildren<{
    Logo?: React.ComponentType;
}>): react.JSX.Element;

export { AuthLayoutShell };
