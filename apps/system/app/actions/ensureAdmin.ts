'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';

/**
 * 管理者かどうかを確認する共通関数
 */
export async function ensureAdmin() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { isAdmin: false, error: 'ログインが必要です' };
  }

  // check_is_admin RPC で管理者か確認
  const { data, error } = await supabase.rpc('check_is_admin');
  if (error) {
    console.error('管理者確認中にエラーが発生しました:', error);
    return {
      isAdmin: false,
      error: '管理者権限の確認中にエラーが発生しました',
    };
  }

  if (!data) {
    return { isAdmin: false, error: '管理者権限がありません' };
  }

  return { isAdmin: true, userId: user.id, error: null };
}
