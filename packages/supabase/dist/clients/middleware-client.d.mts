import * as _supabase_supabase_js from '@supabase/supabase-js';
import * as _supabase_supabase_js_dist_module_lib_types from '@supabase/supabase-js/dist/module/lib/types';
import { NextRequest, NextResponse } from 'next/server';
import { Database } from '../database.types.mjs';

/**
 * Supabase用のミドルウェアクライアントを作成します。
 *
 * @param {NextRequest} request - Next.jsのリクエストオブジェクト。
 * @param {NextResponse} response - Next.jsのレスポンスオブジェクト。
 * @throws {Error} クライアントキーの取得に失敗した場合、またはクライアント初期化に失敗した場合にエラーをスローします。
 */
declare function createMiddlewareClient<GenericSchema = Database>(request: NextRequest, response: NextResponse): _supabase_supabase_js.SupabaseClient<GenericSchema, "public" extends keyof GenericSchema ? keyof GenericSchema & "public" : string & keyof GenericSchema, GenericSchema["public" extends keyof GenericSchema ? keyof GenericSchema & "public" : string & keyof GenericSchema] extends _supabase_supabase_js_dist_module_lib_types.GenericSchema ? GenericSchema["public" extends keyof GenericSchema ? keyof GenericSchema & "public" : string & keyof GenericSchema] : any>;

export { createMiddlewareClient };
