import type { Database } from '@kit/supabase/database';

// Supabaseから生成されたRow型をインポート (パスはプロジェクトに合わせて調整してね)
// 注意: database.types.ts が `@kit/supabase` にあることを確認
type AdminUserDatabaseRow = Database['system']['Tables']['admin_users']['Row'];
type InvitationDatabaseRow =
  Database['invitations']['Tables']['invitations']['Row'];

/**
 * ユーザーテーブルに表示するための管理者/スタッフユーザーのデータ型
 */
export interface AdminUserRowData {
  type: 'admin_user';
  id: string;
  email: string | null; // system.admin_users.email は nullable
  first_name: string | null;
  last_name: string | null;
  role: Database['public']['Enums']['admin_role'];
  is_active: boolean;
  created_at: string;
  // 招待情報に関連するフィールドは undefined
  invitation_status?: undefined;
  invited_by_user_id?: undefined;
  expires_at?: undefined;
}

/**
 * ユーザーテーブルに表示するための招待中ユーザーのデータ型
 */
export interface InvitationRowData {
  type: 'invitation';
  id: string;
  email: string;
  // 招待段階では名前は未設定
  first_name: null;
  last_name: null;
  // 役割は 'invited' として区別
  role: 'invited';
  // 招待中は常に非アクティブ扱い
  is_active: false;
  created_at: string; // 招待作成日時
  invitation_status: Database['public']['Enums']['invitation_status']; // 'pending' | 'verified'
  invited_by_user_id: string;
  expires_at: string;
}

/**
 * ユーザーテーブルで表示するデータの統合型
 */
export type UserRow = AdminUserRowData | InvitationRowData;

// Helper function to map AdminUserDatabaseRow to AdminUserRowData
export function mapAdminUserToRowData(
  user: AdminUserDatabaseRow
): AdminUserRowData {
  return {
    type: 'admin_user',
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
    is_active: user.is_active,
    created_at: user.created_at,
  };
}

// Helper function to map InvitationDatabaseRow to InvitationRowData
export function mapInvitationToRowData(
  invitation: InvitationDatabaseRow
): InvitationRowData {
  return {
    type: 'invitation',
    id: invitation.id,
    email: invitation.email,
    first_name: null,
    last_name: null,
    role: 'invited',
    is_active: false,
    created_at: invitation.created_at,
    invitation_status: invitation.status,
    invited_by_user_id: invitation.invited_by_user_id,
    expires_at: invitation.expires_at,
  };
}
