'use server';

import 'server-only';
import { randomUUID } from 'node:crypto'; // トークン生成用
import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { checkIsAdmin } from '@kit/next/actions';
import {
  InviteUserFormSchema,
  type InviteUserFormData,
} from '../../../types/invite'; // さっき作った型定義
import type { Database } from '@kit/supabase/database'; // プロジェクト共通の型
import { sendAdminInvitationEmail } from '../emails/adminInvitation'; // ★ 追加

/**
 * 新規ユーザーをシステムに招待します。
 * 管理者権限を持つユーザーのみが実行可能です。
 * invitations テーブルにレコードを作成し、招待メールを送信します（メール送信は未実装）。
 *
 * @param {InviteUserFormData} formData - 招待フォームのデータ (emailを含む)
 * @returns {Promise<{ success: boolean; message: string }>}
 */
export async function inviteUserAction(formData: InviteUserFormData) {
  console.log('[inviteUserAction] 開始:', formData);
  try {
    console.log('[inviteUserAction] Supabaseクライアント取得');
    const adminSupabase = getSupabaseServerAdminClient<Database>();
    const publicSupabase = getSupabaseServerClient<Database>();

    // 管理者チェックは必須！
    console.log('[inviteUserAction] 管理者権限チェック');
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) {
      console.error('[inviteUserAction] 管理者権限なし');
      return { success: false, message: '管理者権限がありません。' };
    }

    // 入力値のバリデーション
    console.log('[inviteUserAction] 入力値バリデーション');
    const validationResult = InviteUserFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors
        .map((e) => e.message)
        .join(', ');
      console.error('[inviteUserAction] バリデーションエラー:', errorMessage);
      return { success: false, message: `入力内容が無効です: ${errorMessage}` };
    }
    const { email, role } = validationResult.data;

    // 招待者 (現在の管理者) のユーザーIDを取得
    console.log('[inviteUserAction] 認証ユーザー取得 (public client)');
    const {
      data: { user },
      error: authError,
    } = await publicSupabase.auth.getUser();
    if (authError || !user) {
      console.error('[inviteUserAction] 認証ユーザー取得エラー:', authError);
      return {
        success: false,
        message: '招待者の情報を取得できませんでした。',
      };
    }
    console.log('[inviteUserAction] 認証ユーザー:', user.id);

    console.log('[inviteUserAction] 管理者ユーザー取得 (admin client)');
    const { data: adminUser, error: adminUserError } = await adminSupabase
      .schema('system')
      .from('admin_users')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (adminUserError || !adminUser) {
      console.error(
        '[inviteUserAction] 管理者ユーザー取得エラー:',
        adminUserError
      );
      return {
        success: false,
        message: '招待者の管理者情報を特定できませんでした。',
      };
    }
    console.log('[inviteUserAction] 管理者ユーザー:', adminUser.id);
    const invitedByUserId = adminUser.id;

    // 既存の招待やユーザーをチェック (任意だけど、やった方が親切かもね)
    // 例: すでに admin_users に同じメールアドレスがいないか？
    // 例: まだ有効な招待 (pending) が同じメールアドレスに送られていないか？
    // …今回は省略するけど、本当は考慮するのよ！

    // 安全な招待トークンを生成
    const token = randomUUID();

    // 有効期限を設定
    const expiresAtDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // Dateオブジェクトで保持
    const expiresAtISO = expiresAtDate.toISOString(); // DB保存用

    // invitations テーブルに挿入
    console.log('[inviteUserAction] 招待レコード作成 (admin client)');
    const { data: newInvitation, error: insertError } = await adminSupabase
      .schema('invitations')
      .from('invitations')
      .insert({
        email,
        token,
        invited_by_user_id: invitedByUserId,
        role,
        status: 'pending',
        expires_at: expiresAtISO,
      })
      .select('id')
      .single();

    if (insertError || !newInvitation) {
      console.error('[inviteUserAction] 招待レコード作成エラー:', {
        code: insertError?.code,
        message: insertError?.message,
        details: insertError?.details,
        hint: insertError?.hint,
      });

      // RLS/権限エラーのデバッグ (必要に応じて)
      if (
        insertError?.code === '42501' ||
        insertError?.message?.includes('permission denied')
      ) {
        console.error('[inviteUserAction] 権限エラーの可能性があります');
      }

      return { success: false, message: '招待情報の作成に失敗しました。' };
    }
    console.log('[inviteUserAction] 招待レコード作成成功:', newInvitation.id);

    // --- メール送信 ---
    console.log('[inviteUserAction] 招待メール送信');
    const emailResult = await sendAdminInvitationEmail({
      email,
      token,
      invitedRole: role,
      expiresAt: expiresAtDate,
    });

    if (!emailResult.success) {
      console.error(
        '[inviteUserAction] 招待メール送信エラー:',
        emailResult.error
      );
      return {
        success: false,
        message: `招待は作成されましたが、メールの送信に失敗しました: ${emailResult.error}`,
      };
    }
    console.log('[inviteUserAction] 招待メール送信成功');

    return {
      success: true,
      message: `${email} に招待メールを送信しました。`,
    };
  } catch (e) {
    console.error('[inviteUserAction] 予期せぬエラー:', e);
    const error =
      e instanceof Error ? e : new Error('予期せぬエラーが発生しました。');
    return { success: false, message: error.message };
  }
}
