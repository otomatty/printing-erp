/**
 * パス設定ファイル
 *
 * このファイルはアプリケーション内の各種パス（URL）を一元管理します。
 * 認証関連のパスやアプリケーションのメインページへのパスなどを定義し、
 * アプリケーション全体で一貫したルーティングを実現します。
 */

import { z } from 'zod';

/**
 * パス設定のスキーマ定義
 * Zodを使用して型安全な設定オブジェクトを定義
 */
const PathsSchema = z.object({
  public: z.object({
    home: z.string().min(1), // パブリックホームページ
  }),
  auth: z.object({
    login: z.string().min(1), // サインインページのパス
    callback: z.string().min(1), // 認証コールバックページのパス
  }),
  app: z.object({
    dashboard: z.string().min(1), // アプリケーションのホームページパス
    profileSettings: z.string().min(1), // プロフィール設定ページのパス
  }),
});

/**
 * パス設定の実際の値を定義
 * 各パスは一箇所で管理され、アプリケーション全体で参照される
 */
const pathsConfig = PathsSchema.parse({
  public: {
    home: '/', // パブリックホームページ
  },
  auth: {
    login: '/auth/login', // サインインページ
    callback: '/auth/callback', // 認証コールバックページ
  },
  app: {
    dashboard: '/webapp', // アプリケーションのホームページ
    profileSettings: '/webapp/settings', // プロフィール設定ページ
  },
} satisfies z.infer<typeof PathsSchema>);

export default pathsConfig;
