'use server';

import { redirect } from 'next/navigation';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { checkIsAdmin } from '@kit/next/actions';

/**
 * 現在ログインしているユーザー情報を取得する
 * @returns ユーザー情報とカスタマー情報
 */
export async function getUser() {
  const supabase = await getSupabaseServerClient();

  // ユーザー情報を取得
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error('[getUser] Error fetching user:', userError.message);
    return { user: null, customer: null };
  }

  if (!user) {
    console.log('[getUser] No authenticated user found.');
    return { user: null, customer: null };
  }

  // カスタマー情報を取得 (必要な場合のみ)
  const { data: customer, error: customerError } = await supabase
    .from('user_accounts')
    .select('*')
    .eq('auth_user_id', user.id)
    .single();

  if (customerError && customerError.code !== 'PGRST116') {
    console.error('[getUser] Error fetching customer:', customerError.message);
  }

  // 管理者権限を確認
  let isAdmin = false;
  try {
    isAdmin = await checkIsAdmin();
  } catch (error) {
    console.error('[getUser] Error checking admin status:', error);
  }

  // ユーザー情報に管理者権限の情報を追加
  const enhancedUser = user
    ? {
        ...user,
        is_admin: isAdmin,
      }
    : null;

  return { user: enhancedUser, customer };
}

/**
 * サインアウトアクション
 */
export async function signOut() {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/auth/login');
}
