'use server';

import 'server-only';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { checkIsAdmin } from '@kit/next/actions'; // auth.tsからインポート
import type { Database } from '@kit/supabase/database';

// TODO: AdminUser の型定義をどこかに作るのよ！ apps/system/types/adminUser.ts とかね！
// type AdminUser = Database['system']['Tables']['admin_users']['Row']; // こんな感じで Database 型から派生させると楽よ

// AdminUser 型定義
type AdminUser = Database['system']['Tables']['admin_users']['Row'];

/**
 * システム管理者ユーザーの一覧を取得します。
 * 管理者権限を持つユーザーのみが実行可能です。
 *
 * @returns {Promise<{ data: AdminUser[] | null; error: Error | null }>} 取得結果
 */
export async function fetchAdminUsers(): Promise<{
  data: AdminUser[] | null;
  error: Error | null;
}> {
  try {
    const supabase = getSupabaseServerClient<Database>();

    // まず管理者かどうかチェックするのよ。基本でしょ。
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) {
      console.warn(
        'fetchAdminUsers: Non-admin user attempted to fetch admin users.'
      );
      // エラーを返すか、空配列を返すかは要件次第だけど、今回はエラーにしとくわ。
      return { data: null, error: new Error('管理者権限がありません。') };
    }

    // system スキーマの admin_users テーブルから全カラム取得
    // TODO: 本当に必要なカラムだけ select するのがパフォーマンス的にはベストよ
    const { data, error } = await supabase
      .schema('system')
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: false }); // 作成日の降順でソートでもしとく？

    if (error) {
      console.error('Error fetching admin users:', error);
      return {
        data: null,
        error: new Error('ユーザー一覧の取得に失敗しました。'),
      };
    }

    // 型アサーションするなら、ここで Zod スキーマとかでパースするのがベストだけど、
    // 今回は面倒だから any のまま返しとくわ。本当はちゃんとやるのよ！
    return { data, error: null };
  } catch (e) {
    console.error('Unexpected error in fetchAdminUsers:', e);
    const error =
      e instanceof Error ? e : new Error('予期せぬエラーが発生しました。');
    return { data: null, error };
  }
}
