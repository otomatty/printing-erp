'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';
import { getLogger } from '@kit/shared/logger';

// TODO: 返す型をちゃんと定義！
export async function cancelInvitationAction(invitationId: string) {
  const logger = await getLogger();
  const supabase = getSupabaseServerAdminClient();

  try {
    // 招待情報を取得してステータスを確認してもいいけど、まあ削除しちゃえばいいでしょ
    const { error: deleteError } = await supabase
      .schema('invitations')
      .from('invitations')
      .delete()
      .eq('id', invitationId);

    if (deleteError) {
      logger.error(
        { error: deleteError, invitationId },
        'Failed to delete invitation.'
      );
      return { error: '招待の取り消しに失敗しました。' };
    }

    logger.info({ invitationId }, 'Invitation canceled successfully.');

    // キャッシュを無効化
    revalidatePath('/users');

    return { success: '招待を取り消しました。' };
  } catch (e) {
    logger.error(e, 'Unexpected error in cancelInvitationAction');
    return { error: '予期せぬエラーが発生しました。' };
  }
}
