'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

import { getSupabaseServerClient } from '@kit/supabase/server-client';

// モード切替のためのcookie名を定義
const USER_DISPLAY_MODE_COOKIE = 'user_display_mode';

/**
 * 現在ログインしているユーザー情報を取得する
 * @returns ユーザー情報とカスタマー情報
 */
export async function getUser() {
  console.log('[getUser] Action started.');
  const supabase = await getSupabaseServerClient();

  // ユーザー情報を取得
  console.log('[getUser] Fetching user from Supabase auth...');
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error(
      '[getUser] Error fetching user from Supabase auth:',
      userError.message // エラーメッセージをログに出力
    );
    // エラーがあっても null を返すことで、呼び出し元でエラーをハンドリングできるようにする
    // コンソールエラーの原因がここである可能性は低いが、ログは残す
    return { user: null, customer: null };
  }

  if (!user) {
    console.log('[getUser] No authenticated user found.');
    // 認証されていない場合は null を返す。これが Query data cannot be undefined の原因かもしれない
    // 呼び出し側（おそらくReact Queryなど）が null を期待しているか確認が必要
    return { user: null, customer: null };
  }

  console.log(`[getUser] User found: ${user.id}, Email: ${user.email}`);

  // カスタマー情報を取得
  console.log(`[getUser] Fetching customer data for user: ${user.id}`);
  const { data: customer, error: customerError } = await supabase
    .from('customers')
    .select('*')
    .eq('auth_user_id', user.id)
    .single();

  if (customerError) {
    // PGRST116 は .single() でレコードが見つからなかった場合のエラーコード
    if (customerError.code === 'PGRST116') {
      console.log(
        `[getUser] No customer record found for user ${user.id}. Attempting to create one via ensureCustomerProfile.`
      );
      // レコードが見つからない場合、プロファイル作成を試みる
      await ensureCustomerProfile(); // この関数内にもログを追加済み
      // 再度顧客情報を取得してみる（作成直後のため）
      console.log(
        `[getUser] Re-fetching customer data after creation attempt for user: ${user.id}`
      );
      const { data: newCustomer, error: fetchAfterCreateError } = await supabase
        .from('customers')
        .select('*')
        .eq('auth_user_id', user.id)
        .single(); // ここも .single() なので PGRST116 の可能性あり

      if (fetchAfterCreateError) {
        if (fetchAfterCreateError.code === 'PGRST116') {
          console.warn(
            `[getUser] Failed to fetch customer even after creation attempt for user ${user.id}. PGRST116.`
          );
          // 作成したはずなのに取得できない場合は null を返す
          // これが Query data cannot be undefined の原因になる可能性
          return { user, customer: null };
        }
        console.error(
          '[getUser] Error fetching customer after creation attempt (non-PGRST116):',
          fetchAfterCreateError.message
        );
        // 作成・再取得に失敗しても、ユーザー情報は返す
        return { user, customer: null };
      }
      if (newCustomer) {
        console.log(
          `[getUser] Successfully created and fetched customer: ${newCustomer.id}`
        );
        console.log('[getUser] Action finished successfully.');
        return { user, customer: newCustomer };
      }
      // 作成したはずなのに取得できない場合（上記で処理済みだが念のため）
      console.warn(
        `[getUser] Could not retrieve customer after creation attempt for user ${user.id}, returning null customer.`
      );
      return { user, customer: null }; // やはり null を返す
    }
    // その他のDBエラー
    console.error(
      '[getUser] Error fetching customer (other DB error):',
      customerError.message
    );
    // DBエラーの場合でもユーザー情報は返す。 customer は null になる
    return { user, customer: null }; // これが Query data cannot be undefined の原因かも
  }
  // 顧客情報が正常に取得できた場合
  console.log(`[getUser] Customer found: ${customer.id}`);
  console.log('[getUser] Action finished successfully.');
  return { user, customer };
}

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
  console.log('[ensureCustomerProfile] Function called.');
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
    error: getUserError, // エラーも取得
  } = await supabase.auth.getUser();

  if (getUserError) {
    console.error(
      '[ensureCustomerProfile] Error getting user:',
      getUserError.message
    );
    return;
  }
  if (!user) {
    console.log('[ensureCustomerProfile] No user found, exiting.');
    return;
  }

  console.log(
    `[ensureCustomerProfile] Checking/Creating profile for user: ${user.id}`
  );

  try {
    const serviceClient = await createServiceRoleClient();

    // サービスロールで customers テーブルにレコードがあるか確認
    console.log(
      `[ensureCustomerProfile] Checking existence for user: ${user.id}`
    );
    const { data: existingCustomer, error: checkError } = await serviceClient
      .from('customers')
      .select('id')
      .eq('auth_user_id', user.id)
      .maybeSingle();

    if (checkError) {
      console.error(
        '[ensureCustomerProfile] Error checking customer existence:',
        checkError.message
      );
      return; // エラー時は挿入しない
    }

    // レコードがなければ作成
    if (!existingCustomer) {
      console.log(
        `[ensureCustomerProfile] No existing profile found for ${user.id}. Creating...`
      );
      const { error: insertError } = await serviceClient
        .from('customers')
        .insert({
          auth_user_id: user.id,
          email: user.email, // emailも挿入
          is_guest: false, // ゲストではない
          // 必要に応じて他のデフォルト値を追加
        });

      if (insertError) {
        // insertError は UNIQUE 制約違反 (23505) かもしれない
        if (insertError.code === '23505') {
          console.warn(
            `[ensureCustomerProfile] Customer profile for ${user.id} likely already exists (race condition?). Code: 23505`
          );
        } else {
          console.error(
            '[ensureCustomerProfile] Error inserting customer profile:',
            insertError.message,
            'Code:',
            insertError.code
          );
        }
      } else {
        console.log(
          `[ensureCustomerProfile] Successfully inserted profile for ${user.id}`
        );
      }
    } else {
      console.log(
        `[ensureCustomerProfile] Profile already exists for ${user.id}. No action needed.`
      );
    }
  } catch (error) {
    // createServiceRoleClient でのエラーなどもここでキャッチ
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      '[ensureCustomerProfile] Unexpected error during profile check/creation:',
      errorMessage
    );
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
  console.log(
    `[ensureAdminCustomerProfile] Function called for admin user: ${userId}`
  );
  try {
    const serviceClient = await createServiceRoleClient();

    // サービスロールで管理者情報を取得 (RLSを考慮)
    console.log(
      `[ensureAdminCustomerProfile] Fetching admin user data for: ${userId}`
    );
    const { data: adminUser, error: adminCheckError } = await serviceClient
      .from('admin_users')
      .select('is_active, first_name, last_name') // 必要なカラムを選択
      .eq('id', userId)
      .maybeSingle(); // 管理者が見つからない場合も考慮

    if (adminCheckError) {
      console.error(
        `[ensureAdminCustomerProfile] Error fetching admin user data for ${userId}:`,
        adminCheckError.message
      );
      return;
    }
    if (!adminUser) {
      console.log(
        `[ensureAdminCustomerProfile] Admin user ${userId} not found.`
      );
      return; // 管理者が見つからない場合は何もしない
    }
    if (!adminUser.is_active) {
      console.log(
        `[ensureAdminCustomerProfile] Admin user ${userId} is not active.`
      );
      return; // アクティブでない場合は何もしない
    }

    console.log(
      `[ensureAdminCustomerProfile] Admin user ${userId} found and active. Checking customer profile.`
    );

    // サービスロールで顧客情報を検索
    const { data: existingCustomer, error: customerCheckError } =
      await serviceClient
        .from('customers')
        .select('id')
        .eq('auth_user_id', userId)
        .maybeSingle(); // 顧客が見つからない場合も考慮

    if (customerCheckError) {
      console.error(
        `[ensureAdminCustomerProfile] Error checking existing customer profile for admin ${userId}:`,
        customerCheckError.message
      );
      return;
    }

    // 顧客情報がなければ作成
    if (!existingCustomer) {
      console.log(
        `[ensureAdminCustomerProfile] No customer profile found for admin ${userId}. Creating...`
      );
      const { error: insertError } = await serviceClient
        .from('customers')
        .insert({
          auth_user_id: userId,
          email: email, // 渡されたemailを使用
          first_name: adminUser.first_name, // admin_usersから取得した情報を使用
          last_name: adminUser.last_name, // admin_usersから取得した情報を使用
          is_guest: false, // 管理者はゲストではない
        });

      if (insertError) {
        if (insertError.code === '23505') {
          console.warn(
            `[ensureAdminCustomerProfile] Customer profile for admin ${userId} likely already exists (race condition?). Code: 23505`
          );
        } else {
          console.error(
            '[ensureAdminCustomerProfile] Error inserting customer profile for admin:',
            insertError.message,
            'Code:',
            insertError.code
          );
        }
      } else {
        console.log(
          `[ensureAdminCustomerProfile] Successfully inserted customer profile for admin ${userId}.`
        );
      }
    } else {
      console.log(
        `[ensureAdminCustomerProfile] Customer profile already exists for admin ${userId}. No action needed.`
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      `[ensureAdminCustomerProfile] Unexpected error for admin user ${userId}:`,
      errorMessage
    );
  }
}
