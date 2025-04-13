'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

// モード切替のためのcookie名を定義
const USER_DISPLAY_MODE_COOKIE = 'user_display_mode';

/**
 * 表示モードの種類
 */
export type UserDisplayMode = 'admin' | 'customer';

/**
 * 現在の表示モードを取得する
 */
export async function getUserDisplayMode(): Promise<UserDisplayMode> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(USER_DISPLAY_MODE_COOKIE);
    const mode = cookie?.value as UserDisplayMode;
    return mode === 'customer' ? 'customer' : 'admin'; // デフォルトは admin
  } catch (error) {
    console.error('Error getting user display mode:', error);
    return 'admin'; // エラー時はデフォルトを返す
  }
}

/**
 * 表示モードを切り替える
 */
export async function toggleUserDisplayMode(): Promise<UserDisplayMode> {
  try {
    const currentMode = await getUserDisplayMode();
    const newMode: UserDisplayMode =
      currentMode === 'admin' ? 'customer' : 'admin';

    // cookieを設定
    const cookieStore = await cookies();
    cookieStore.set({
      name: USER_DISPLAY_MODE_COOKIE,
      value: newMode,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30日間
    });

    return newMode;
  } catch (error) {
    console.error('Error toggling user display mode:', error);
    return 'admin'; // エラー時はデフォルトを返す
  }
}

/**
 * メールでOTPを送信するサインインアクション
 */
export async function signInWithOTP(formData: FormData) {
  const email = formData.get('email') as string;
  const redirectTo = (formData.get('redirectTo') as string) || '/';

  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true, // 新規ユーザーも自動登録
    },
  });

  if (error) {
    return { error: error.message };
  }

  // redirectToはフォームデータとして渡して、クライアント側で保持する
  return { success: true, email, redirectTo };
}

/**
 * OTP検証アクション
 */
export async function verifyOTP(formData: FormData) {
  const email = formData.get('email') as string;
  const token = formData.get('token') as string;
  const redirectTo = (formData.get('redirectTo') as string) || '/';

  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  });

  if (error) {
    return { error: error.message };
  }

  // 検証成功後にユーザープロフィールを確認・作成
  await ensureCustomerProfile();

  return { success: true, redirectTo };
}

/**
 * サービスロールクライアントを作成
 */
async function createServiceRoleClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('環境変数が設定されていません');
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * ユーザープロフィールの確認・作成
 * サービスロールで存在確認してから挿入する
 */
async function ensureCustomerProfile() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  try {
    const serviceClient = await createServiceRoleClient();

    // サービスロールで customers テーブルにレコードがあるか確認
    const { data: existingCustomer, error: checkError } = await serviceClient
      .from('customers')
      .select('id')
      .eq('auth_user_id', user.id)
      .maybeSingle();

    if (checkError) {
      console.error('顧客プロフィール存在確認エラー:', checkError);
      return; // エラー時は挿入しない
    }

    // レコードがなければ作成
    if (!existingCustomer) {
      const { error: insertError } = await serviceClient
        .from('customers')
        .insert({
          auth_user_id: user.id,
          email: user.email,
          is_guest: false,
        });

      if (insertError) {
        // insertError は UNIQUE 制約違反 (23505) かもしれない
        if (insertError.code === '23505') {
          console.warn(
            `Customer profile for ${user.id} likely already exists (race condition?).`
          );
        } else {
          console.error('顧客プロフィール作成エラー:', insertError);
        }
      }
    }
  } catch (error) {
    console.error('顧客プロフィール確認・作成中のエラー:', error);
  }
}

/**
 * サインアウトアクション
 */
export async function signOut() {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/');
}

/**
 * 管理者ユーザーに対応する顧客情報がない場合に作成する
 * サービスロールで存在確認してから挿入する
 */
async function ensureAdminCustomerProfile(
  userId: string,
  email: string | undefined
) {
  try {
    const serviceClient = await createServiceRoleClient();

    // サービスロールで管理者情報を取得 (RLSを考慮)
    const { data: adminUser, error: adminCheckError } = await serviceClient
      .from('admin_users')
      .select('is_active, first_name, last_name')
      .eq('id', userId)
      .maybeSingle();

    if (adminCheckError) {
      console.error('管理者情報取得エラー (Service Role):', adminCheckError);
      return;
    }
    if (!adminUser || !adminUser.is_active) {
      return;
    }

    // サービスロールで顧客情報を検索
    const { data: existingCustomer, error: customerCheckError } =
      await serviceClient
        .from('customers')
        .select('id')
        .eq('auth_user_id', userId)
        .maybeSingle();

    if (customerCheckError) {
      console.error(
        '既存顧客情報確認エラー (Service Role):',
        customerCheckError
      );
      return;
    }

    // 顧客情報がなければ作成
    if (!existingCustomer) {
      const { error: insertError } = await serviceClient
        .from('customers')
        .insert({
          auth_user_id: userId,
          email: email,
          first_name: adminUser.first_name,
          last_name: adminUser.last_name,
          is_guest: false,
        });

      if (insertError) {
        if (insertError.code === '23505') {
          console.warn(
            `Customer profile for admin ${userId} likely already exists (race condition?).`
          );
        } else {
          console.error('管理者顧客プロフィール作成エラー:', insertError);
        }
      }
    }
  } catch (error) {
    console.error('管理者顧客プロフィール確認・作成中のエラー:', error);
  }
}

/**
 * 現在ログイン中のユーザーの基本情報と管理者ステータスを取得
 * UserMenu などで利用することを想定
 */
export async function getCurrentUserForMenu() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // 並行して customer と admin_user 情報を取得
  const [customerResult, adminResult] = await Promise.allSettled([
    supabase
      .from('user_accounts')
      .select('first_name, last_name') // customerからは名前情報のみ取得
      .eq('auth_user_id', user.id)
      .single(),
    supabase
      .schema('system')
      .from('admin_users')
      .select('is_active, first_name, last_name') // adminからは状態と名前を取得
      .eq('id', user.id)
      .maybeSingle(),
  ]);

  let customerFirstName: string | null = null;
  let customerLastName: string | null = null;
  if (customerResult.status === 'fulfilled' && customerResult.value.data) {
    customerFirstName = customerResult.value.data.first_name;
    customerLastName = customerResult.value.data.last_name;
  } else if (customerResult.status === 'rejected') {
    console.error('Error fetching customer:', customerResult.reason);
  }

  let isAdmin = false;
  let adminFirstName: string | null = null;
  let adminLastName: string | null = null;
  if (adminResult.status === 'fulfilled' && adminResult.value.data) {
    const adminData = adminResult.value.data;
    isAdmin = !!adminData && adminData.is_active;
    adminFirstName = adminData.first_name;
    adminLastName = adminData.last_name;
  } else if (adminResult.status === 'rejected') {
    console.error('Error fetching admin user:', adminResult.reason);
  }

  // 管理者ユーザーで顧客情報がない場合、自動的に作成
  if (isAdmin && !customerFirstName && !customerLastName) {
    await ensureAdminCustomerProfile(user.id, user.email || undefined);

    try {
      // サービスロールクライアントで顧客情報を再取得
      const serviceClient = await createServiceRoleClient();
      const { data: refreshedCustomer } = await serviceClient
        .from('customers')
        .select('first_name, last_name')
        .eq('auth_user_id', user.id)
        .single();

      if (refreshedCustomer) {
        customerFirstName = refreshedCustomer.first_name;
        customerLastName = refreshedCustomer.last_name;
      }
    } catch (error) {
      console.error('顧客情報再取得中のエラー:', error);
    }
  }

  // 現在の表示モードを取得
  const displayMode = await getUserDisplayMode();

  // 表示モードに応じた名前を使用
  const useAdminProfile = isAdmin && displayMode === 'admin';
  const firstName = useAdminProfile ? adminFirstName : customerFirstName;
  const lastName = useAdminProfile ? adminLastName : customerLastName;

  return {
    id: user.id,
    email: user.email,
    isAdmin: isAdmin,
    first_name: firstName,
    last_name: lastName,
    displayMode: displayMode,
    // 両方のプロフィール情報を提供
    customerProfile: {
      first_name: customerFirstName,
      last_name: customerLastName,
    },
    adminProfile: isAdmin
      ? {
          first_name: adminFirstName,
          last_name: adminLastName,
        }
      : null,
  };
}

/**
 * 現在ログイン中のユーザーの情報を取得 (ECサイト顧客情報含む)
 */
export async function getCurrentUser() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // customersテーブルから追加情報を取得
  const { data: customer } = await supabase
    .from('user_accounts')
    .select('*') // 必要に応じてカラムを絞る
    .eq('auth_user_id', user.id)
    .single();

  // admin_usersテーブルから管理者情報を取得 (必要であれば)
  let adminData: {
    id: string;
    is_active: boolean;
    first_name: string | null;
    last_name: string | null;
  } | null = null;
  try {
    const { data: adminUser, error: adminError } = await supabase
      .schema('system')
      .from('admin_users')
      .select('id, is_active, first_name, last_name')
      .eq('id', user.id)
      .maybeSingle();

    if (adminError) {
      console.error('Error fetching admin user:', adminError.message);
    } else {
      adminData = adminUser;
    }
  } catch (error) {
    console.error('Unexpected error fetching admin user:', error);
  }

  const isAdmin = !!adminData && adminData.is_active;
  const firstName = adminData?.first_name ?? customer?.first_name;
  const lastName = adminData?.last_name ?? customer?.last_name;

  // getCurrentUser はより多くの情報を返す想定（必要に応じて調整）
  return {
    id: user.id,
    email: user.email,
    ...customer, // customer の全情報を含む
    isAdmin: isAdmin,
    // 表示名は admin 優先のものを別途含めるか、customer のものをそのまま使うか選択
    first_name_display: firstName, // 表示用
    last_name_display: lastName, // 表示用
    // adminData自体を返すことも可能
    admin_profile: adminData,
  };
}
