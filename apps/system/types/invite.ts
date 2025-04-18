import { z } from 'zod';

/**
 * 招待フォームの入力スキーマ (Zod)
 * @property {string} email - 招待するユーザーのメールアドレス
 * @property {'admin'|'staff'} role - 招待するユーザーの役割
 */
export const InviteUserFormSchema = z.object({
  email: z
    .string()
    .email({ message: '有効なメールアドレスを入力してください。' }),
  role: z.enum(['admin', 'staff'], {
    required_error: '役割を選択してください。',
  }),
});

/**
 * 招待フォームの入力データの型
 */
export type InviteUserFormData = z.infer<typeof InviteUserFormSchema>;

/**
 * 招待情報のステータス
 * - pending: 招待メール送信済み、未承諾
 * - accepted: 招待承諾済み
 * - expired: 有効期限切れ
 * - revoked: 管理者によって取り消し済み
 * - verified: 招待リンク検証済み、サインイン待ち
 */
export type InvitationStatus =
  | 'pending'
  | 'accepted'
  | 'expired'
  | 'revoked'
  | 'verified';

/**
 * invitations テーブルのデータ型
 * @property {string} id - 招待ID (UUID)
 * @property {string} email - 招待されたメールアドレス
 * @property {string} token - 招待を検証するための一意なトークン
 * @property {string} invited_by_user_id - 招待した管理者ユーザーのID (admin_users.id)
 * @property {InvitationStatus} status - 招待ステータス
 * @property {Date} expires_at - 招待の有効期限
 * @property {Date} created_at - 作成日時
 * @property {Date} updated_at - 更新日時
 * @property {'admin'|'staff'} role - 招待されたユーザーの役割
 */
export interface Invitation {
  id: string; // UUID
  email: string;
  token: string; // Secure, unique token for accepting the invite
  invited_by_user_id: string; // Foreign key to admin_users.id
  status: InvitationStatus;
  expires_at: Date; // Timestamp when the invitation expires
  created_at: Date;
  updated_at: Date;
  role: 'admin' | 'staff';
}
