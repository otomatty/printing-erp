import { NextRequest, NextResponse } from 'next/server';
import { User } from '@supabase/supabase-js';
import { z } from 'zod';

interface Config<Schema> {
    auth?: boolean;
    captcha?: boolean;
    schema?: Schema;
}
interface HandlerParams<Schema extends z.ZodType | undefined, RequireAuth extends boolean | undefined> {
    request: NextRequest;
    user: RequireAuth extends false ? undefined : User;
    body: Schema extends z.ZodType ? z.infer<Schema> : undefined;
    params: Record<string, string>;
}
/**
 * 拡張されたルートハンドラ関数。
 *
 * この関数はリクエストとパラメータオブジェクトを引数として受け取り、ルートハンドラ関数を返します。
 * 返されたルートハンドラ関数は、HTTPリクエストを処理し、提供されたパラメータに基づいて
 * 追加の機能拡張（認証、CAPTCHA検証、スキーマ検証など）を適用します。
 *
 * 主な機能:
 * 1. 認証チェック: ユーザーが認証されているか確認し、未認証の場合はリダイレクト
 * 2. CAPTCHA検証: ヘッダーからCAPTCHAトークンを取得して検証
 * 3. スキーマ検証: Zodを使用したリクエストボディの検証
 * 4. 型安全性: TypeScriptの型推論を活用した型安全なハンドラ
 *
 * 使用例:
 * export const POST = enhanceRouteHandler(
 *   ({ request, body, user }) => {
 *     return new Response(`こんにちは、${body.name}さん!`);
 *   },
 *   {
 *     schema: z.object({
 *       name: z.string(),
 *     }),
 *   },
 * );
 *
 */
declare const enhanceRouteHandler: <Body, Params extends Config<z.ZodType<Body, z.ZodTypeDef>>>(handler: ((params: HandlerParams<Params["schema"], Params["auth"]>) => NextResponse | Response) | ((params: HandlerParams<Params["schema"], Params["auth"]>) => Promise<NextResponse | Response>), params?: Params) => (request: NextRequest, routeParams: {
    params: Promise<Record<string, string>>;
}) => Promise<Response>;

export { enhanceRouteHandler };
