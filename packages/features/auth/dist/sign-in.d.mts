import type * as react from 'react';
import type { Provider } from '@supabase/supabase-js';
import type { z } from 'zod';

/**
 * @name SignInMethodsContainer
 * @description
 * サインイン方法を集約して表示するコンテナコンポーネント。
 * パスワード認証、マジックリンク認証、OAuthプロバイダー認証など、
 * 複数の認証方法を設定に基づいて表示する。
 *
 * @features
 * - 複数の認証方法を一箇所に集約
 * - 設定に基づいた認証方法の表示/非表示
 * - 認証後のリダイレクト処理、またはコールバック呼び出し
 *
 * @dependencies
 * - next/navigation: Next.jsのルーティング機能
 * - @kit/shared/utils: ユーティリティ関数
 *
 * @childComponents
 * - PasswordSignInContainer: パスワード認証コンポーネント
 * - MagicLinkAuthContainer: マジックリンク認証コンポーネント
 * - OauthProviders: OAuth認証コンポーネント
 *
 * @param {Object} props
 * @param {Object} props.paths - パス設定
 * @param {string} props.paths.callback - 認証コールバックパス
 * @param {string} props.paths.home - デフォルトのリダイレクト先ホームページパス
 * @param {Object} props.providers - 有効化する認証プロバイダー設定
 * @param {boolean} props.providers.password - パスワード認証を有効にするか
 * @param {boolean} props.providers.magicLink - マジックリンク認証を有効にするか
 * @param {Provider[]} props.providers.oAuth - 有効化するOAuthプロバイダーの配列
 * @param {() => void} [props.onSignInSuccess] - (任意) パスワード認証成功時に呼び出されるコールバック関数。指定された場合、リダイレクトは行われない。
 *
 * @example
 * ```tsx
 * <SignInMethodsContainer
 *   paths={{
 *     callback: '/auth/callback',
 *     home: '/dashboard',
 *   }}
 *   providers={{
 *     password: true,
 *     magicLink: true,
 *     oAuth: ['google', 'github'],
 *   }}
 *   onSignInSuccess={() => console.log('Signed in!')}
 * />
 * ```
 */
declare function SignInMethodsContainer(props: {
  paths: {
    callback: string;
    home: string;
  };
  providers: {
    password: boolean;
    magicLink: boolean;
    oAuth: Provider[];
  };
  onSignInSuccess?: () => void;
}): react.JSX.Element;

declare const PasswordSignInSchema: z.ZodObject<
  {
    email: z.ZodString;
    password: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    email: string;
    password: string;
  },
  {
    email: string;
    password: string;
  }
>;

export { PasswordSignInSchema, SignInMethodsContainer };
