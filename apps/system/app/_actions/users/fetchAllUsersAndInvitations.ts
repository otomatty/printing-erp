import 'server-only';

import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';
import { checkIsAdmin } from '@kit/next/actions';
import type { Database } from '@kit/supabase/database';
import {
  type UserRow,
  mapAdminUserToRowData,
  mapInvitationToRowData,
} from '../../../types/userRow'; // さっき作った統合型とマッパー関数

// Database 型からスキーマとテーブルの Row 型を抽出
type AdminUserDatabaseRow = Database['system']['Tables']['admin_users']['Row'];
type InvitationDatabaseRow =
  Database['invitations']['Tables']['invitations']['Row'];

/**
 * システム管理者/スタッフと招待中ユーザーの一覧を取得します。
 * 管理者権限を持つユーザーのみが実行可能です。
 *
 * @returns {Promise<{ data: UserRow[] | null; error: Error | null }>} 取得結果
 */
export async function fetchAllUsersAndInvitations(): Promise<{
  data: UserRow[] | null;
  error: Error | null;
}> {
  try {
    // 管理者チェック
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) {
      console.warn(
        'fetchAllUsersAndInvitations: Non-admin user attempted to fetch users and invitations.'
      );
      return { data: null, error: new Error('管理者権限がありません。') };
    }

    // ★ 管理者確認後、Service Role Client を取得
    const supabaseServiceRoleClient = getSupabaseServerAdminClient<Database>();

    // 並列でデータを取得 (★ Service Role Client を使う)
    const [adminUsersResult, invitationsResult] = await Promise.all([
      supabaseServiceRoleClient
        .schema('system')
        .from('admin_users')
        .select('id, email, first_name, last_name, role, is_active, created_at')
        .order('created_at', { ascending: false }),
      supabaseServiceRoleClient
        .schema('invitations') // invitations スキーマを指定
        .from('invitations')
        .select('id, email, status, created_at, invited_by_user_id, expires_at')
        .in('status', ['pending', 'verified']) // pending と verified のみ
        .order('created_at', { ascending: false }),
    ]);

    // エラーチェック
    if (adminUsersResult.error) {
      console.error('Error fetching admin users:', adminUsersResult.error);
      return {
        data: null,
        error: new Error('管理者ユーザー一覧の取得に失敗しました。'),
      };
    }
    if (invitationsResult.error) {
      // エラーオブジェクトの内容を詳しくログに出力
      console.error(
        'Error fetching invitations:',
        JSON.stringify(invitationsResult.error, null, 2)
      );
      return {
        data: null,
        error: new Error('招待中ユーザー一覧の取得に失敗しました。'),
      };
    }

    // データを UserRow[] にマッピング
    const adminRows: UserRow[] = (adminUsersResult.data ?? []).map((user) =>
      mapAdminUserToRowData(user as AdminUserDatabaseRow)
    );

    const invitationRows: UserRow[] = (invitationsResult.data ?? []).map(
      (invitation) =>
        mapInvitationToRowData(invitation as InvitationDatabaseRow)
    );

    // 配列を結合して返す
    const combinedData = [...adminRows, ...invitationRows];

    // created_at で最終ソート (任意、日付文字列での比較)
    combinedData.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return { data: combinedData, error: null };
  } catch (e) {
    console.error('Unexpected error in fetchAllUsersAndInvitations:', e);
    const error =
      e instanceof Error ? e : new Error('予期せぬエラーが発生しました。');
    return { data: null, error };
  }
}
