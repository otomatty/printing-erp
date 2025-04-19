'use server';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { revalidatePath } from 'next/cache';

/**
 * 現在の認証ユーザーに紐づくadmin_usersレコードを取得する
 * @returns {Promise<{ data: import('@kit/supabase/database').Database['system']['Tables']['admin_users']['Row'] | null; error: Error | null }>}
 */
export async function fetchAdminProfile() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error('[fetchAdminProfile] User not found', userError);
    return { data: null, error: new Error('認証ユーザーが見つかりません') };
  }

  const { data, error } = await supabase
    .schema('system')
    .from('admin_users')
    .select('*')
    .eq('auth_user_id', user.id)
    .single();

  if (error) {
    console.error('[fetchAdminProfile] Error fetching profile:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * ユーザープロフィールを更新するServer Action
 * @param {FormData} formData
 */
export async function updateAdminProfile(formData: FormData) {
  const supabase = await getSupabaseServerClient();

  const email = formData.get('email');
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');

  if (
    typeof email !== 'string' ||
    typeof firstName !== 'string' ||
    typeof lastName !== 'string'
  ) {
    throw new Error('入力データが不正です');
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error('認証ユーザーが見つかりません');
  }

  const { error } = await supabase
    .schema('system')
    .from('admin_users')
    .update({ email, first_name: firstName, last_name: lastName })
    .eq('auth_user_id', user.id);

  if (error) {
    console.error('[updateAdminProfile] Update error:', error.message);
    throw new Error(error.message);
  }

  // 更新後に/accountsページを再検証して最新データを反映
  revalidatePath('/accounts');
}
