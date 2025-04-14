import * as react from 'react';
import { Provider } from '@supabase/supabase-js';
import { z } from 'zod';

/**
 * @name SignUpMethodsContainer
 * @description
 * サインアップ方法を集約して表示するコンテナコンポーネント。
 * パスワード登録、マジックリンク登録、OAuthプロバイダー登録など、
 * 複数の登録方法を設定に基づいて表示する。
 *
 * @features
 * - 複数の登録方法を一箇所に集約
 * - 設定に基づいた登録方法の表示/非表示
 * - 利用規約チェックボックスのオプション表示
 * - 招待トークンと関連情報の処理
 *
 * @dependencies
 * - @supabase/supabase-js: Supabase認証ライブラリ
 * - @kit/shared/utils: ユーティリティ関数
 *
 * @childComponents
 * - EmailPasswordSignUpContainer: メール/パスワード登録コンポーネント
 * - MagicLinkAuthContainer: マジックリンク登録コンポーネント
 * - OauthProviders: OAuth登録コンポーネント
 *
 * @param {Object} props
 * @param {Object} props.paths - パス設定
 * @param {string} props.paths.callback - 認証コールバックパス
 * @param {string} props.paths.appHome - アプリケーションホームパス
 * @param {Object} props.providers - 有効化する認証プロバイダー設定
 * @param {boolean} props.providers.password - パスワード登録を有効にするか
 * @param {boolean} props.providers.magicLink - マジックリンク登録を有効にするか
 * @param {Provider[]} props.providers.oAuth - 有効化するOAuthプロバイダーの配列
 * @param {boolean} [props.displayTermsCheckbox] - 利用規約チェックボックスを表示するか
 *
 * @example
 * ```tsx
 * <SignUpMethodsContainer
 *   paths={{
 *     callback: '/auth/callback',
 *     appHome: '/dashboard',
 *   }}
 *   providers={{
 *     password: true,
 *     magicLink: true,
 *     oAuth: ['google', 'github'],
 *   }}
 *   displayTermsCheckbox={true}
 * />
 * ```
 */
declare function SignUpMethodsContainer(props: {
    paths: {
        callback: string;
        appHome: string;
    };
    providers: {
        password: boolean;
        magicLink: boolean;
        oAuth: Provider[];
    };
    displayTermsCheckbox?: boolean;
}): react.JSX.Element;

declare const PasswordSignUpSchema: z.ZodEffects<z.ZodObject<{
    email: z.ZodString;
    password: z.ZodEffects<z.ZodString, string, string>;
    repeatPassword: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    repeatPassword: string;
}, {
    email: string;
    password: string;
    repeatPassword: string;
}>, {
    email: string;
    password: string;
    repeatPassword: string;
}, {
    email: string;
    password: string;
    repeatPassword: string;
}>;

export { PasswordSignUpSchema, SignUpMethodsContainer };
