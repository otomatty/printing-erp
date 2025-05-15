'use server';

import 'server-only';
// import { getSupabaseServerClient } from '@kit/supabase/server-client'; // removed Supabase client import for prototype mock
// import { checkIsAdmin } from '@kit/next/actions'; // bypass admin check for prototype
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
  // return mock data for prototype
  const mockAdminUsers: AdminUser[] = [
    {
      id: 'admin1',
      auth_user_id: 'user1',
      email: 'admin@example.com',
      first_name: '花子',
      last_name: '佐藤',
      role: 'admin',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
  return { data: mockAdminUsers, error: null };
}
