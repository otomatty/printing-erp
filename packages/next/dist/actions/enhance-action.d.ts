import { User } from '@supabase/supabase-js';
import { z, ZodType } from 'zod';

/**
 * @name enhanceAction
 * @description サーバーアクションを拡張し、CAPTCHA検証、スキーマ検証、認証チェックを追加します
 *
 * この関数は、Next.jsのサーバーアクションに以下の機能を追加します：
 * 1. 認証チェック: ユーザーが認証されているか確認し、未認証の場合はリダイレクト
 * 2. CAPTCHA検証: ボット対策のためのCAPTCHAトークン検証
 * 3. スキーマ検証: Zodを使用した入力データの型と値の検証
 *
 * これにより、各サーバーアクションで共通の検証ロジックを繰り返し実装する必要がなくなります。
 */
declare function enhanceAction<Args, Response, Config extends {
    auth?: boolean;
    captcha?: boolean;
    schema?: z.ZodType<Config['captcha'] extends true ? Args & {
        captchaToken: string;
    } : Args, z.ZodTypeDef>;
}>(fn: (params: Config['schema'] extends ZodType ? z.infer<Config['schema']> : Args, user: Config['auth'] extends false ? undefined : User) => Response | Promise<Response>, config: Config): (params: Config["schema"] extends ZodType ? z.infer<Config["schema"]> : Args) => Promise<Response>;

export { enhanceAction };
