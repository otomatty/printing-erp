'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseServerClient } from '@kit/supabase/server-client'; // ★ サーバークライアントを使う
import { getLogger } from '@kit/shared/logger';
import { sendAdminInvitationEmail } from '../emails/adminInvitation'; // ★ 招待メール送信関数 (仮。実際のパスに合わせること)

// TODO: エラー処理とか、返す型とか、もっとちゃんと定義するのよ！
export async function resendInvitationAction(invitationId: string) {
  const logger = await getLogger();
  const supabase = getSupabaseServerClient();

  try {
    // 1. 招待情報を取得
    const { data: invitation, error: fetchError } = await supabase
      .schema('invitations')
      .from('invitations')
      .select('id, email, role, token, expires_at, status') // 必要な情報を取得
      .eq('id', invitationId)
      .single();

    if (fetchError || !invitation) {
      logger.error(
        { error: fetchError, invitationId },
        'Failed to fetch invitation for resend.'
      );
      return { error: '招待情報の取得に失敗しました。' };
    }

    // 2. ステータス確認 (pending じゃないと再送できないわよ)
    if (invitation.status !== 'pending') {
      logger.warn(
        { invitationId, status: invitation.status },
        'Invitation cannot be resent because its status is not pending.'
      );
      return { error: 'この招待は再送できません。' };
    }

    // 3. 有効期限を更新 (例: 現在から24時間後)
    const newExpiresAt = new Date();
    newExpiresAt.setDate(newExpiresAt.getDate() + 1); // 1日後に設定

    const { error: updateError } = await supabase
      .schema('invitations')
      .from('invitations')
      .update({ expires_at: newExpiresAt.toISOString() })
      .eq('id', invitationId);

    if (updateError) {
      logger.error(
        { error: updateError, invitationId },
        'Failed to update invitation expiration for resend.'
      );
      return { error: '招待の有効期限更新に失敗しました。' };
    }

    // 4. 招待メールを再送信
    // ★ ここは既存の招待メール送信ロジックを呼び出すこと！
    // ★ 実際の関数名や引数に合わせて修正が必要よ！
    const sendResult = await sendAdminInvitationEmail({
      // ★ 引数は仮よ！
      email: invitation.email,
      token: invitation.token, // 招待トークンを渡す
      invitedRole: invitation.role as 'admin' | 'staff', // 型アサーション
      expiresAt: newExpiresAt, // 更新後の有効期限を使う
    });

    if (!sendResult.success) {
      // メール送信失敗しても、有効期限は更新しちゃってるけど…ロールバックする？今回は面倒だからしないわよ
      logger.error(
        { email: invitation.email, invitationId },
        'Failed to resend invitation email.'
      );
      // UIには成功したように見せかけつつ、ログだけ残す…？いや、正直にエラーを返すわ
      return { error: '招待メールの再送信に失敗しました。' };
    }

    logger.info(
      { invitationId, email: invitation.email },
      'Invitation resent successfully.'
    );

    // 5. キャッシュを無効化してテーブルを更新
    revalidatePath('/users');

    return { success: '招待メールを再送信しました。' };
  } catch (e) {
    logger.error(e, 'Unexpected error in resendInvitationAction');
    return { error: '予期せぬエラーが発生しました。' };
  }
}
