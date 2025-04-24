'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { revalidatePath } from 'next/cache';

interface AdminUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'staff';
}

export async function createAdminUser(data: AdminUserData) {
  const supabase = getSupabaseServerClient();

  // トランザクション的な処理が必要
  try {
    // 1. auth.usersにユーザーを作成
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true,
        app_metadata: {
          is_admin: data.role === 'admin',
        },
        user_metadata: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
      });

    if (authError) throw authError;
    if (!authData.user) throw new Error('ユーザーの作成に失敗しました');

    // 2. admin_usersテーブルにレコードを挿入
    const { data: adminData, error: adminError } = await supabase
      .schema('system')
      .from('admin_users')
      .insert({
        auth_user_id: authData.user.id,
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        role: data.role,
      })
      .select()
      .single();

    if (adminError) throw adminError;
    if (!adminData) throw new Error('管理者データの作成に失敗しました');

    // 3. クイックアクセスの初期設定
    await setupAdminQuickAccess(adminData.id);

    revalidatePath('/admin/users');
    return { success: true, data: adminData };
  } catch (error) {
    console.error('管理者ユーザー作成エラー:', error);
    return {
      success: false,
      error: `管理者の作成に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`,
    };
  }
}

// クイックアクセスの初期設定
async function setupAdminQuickAccess(adminUserId: string) {
  const supabase = getSupabaseServerClient();

  // デフォルト設定を取得
  const { data: defaultItems, error } = await supabase
    .schema('system')
    .from('quick_access_items')
    .select('*')
    .eq('is_default', true)
    .eq('is_enabled', true) // システムで有効なもののみ
    .order('display_order');

  if (error) throw error;
  if (!defaultItems?.length) return; // デフォルト項目がなければ何もしない

  // 管理者ユーザー設定として挿入
  const adminItems = defaultItems.map((item, index) => ({
    admin_user_id: adminUserId,
    item_id: item.id,
    display_order: index + 1,
    is_visible: true,
  }));

  const { error: insertError } = await supabase
    .schema('system')
    .from('admin_quick_access')
    .insert(adminItems);

  if (insertError) throw insertError;
}
