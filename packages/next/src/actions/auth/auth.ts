'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';

/**
 * ProfileWithRole型の定義
 */
// type ProfileWithRole = {
//   id: string;
//   email: string | null;
//   fullName: string | null;
//   avatarUrl: string | null;
//   createdAt: string;
//   updatedAt: string;
//   isAdmin: boolean;
// };

/**
 * 現在のユーザーが管理者かどうかを確認します
 */
export async function checkIsAdmin(): Promise<boolean> {
  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase.rpc('check_is_admin');

    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Unexpected error in checkIsAdmin:', error);
    return false;
  }
}

/**
 * 認証状態とプロフィール情報を取得します
 * @returns {Promise<{ isAuthenticated: boolean; profile: ProfileWithRole | null }>}
 */
// export async function getAuthState() {
//   try {
//     const supabase = await getSupabaseServerClient();

//     // レスポンスのキャッシュを無効化
//     const response = new Response();
//     response.headers.set('Cache-Control', 'no-store');

//     // ユーザー情報を取得
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       return {
//         isAuthenticated: false,
//         profile: null,
//       };
//     }

//     // プロフィール情報のみを取得
//     const { data: profileOnly, error: profileOnlyError } = await supabase
//       .from('user_accounts')
//       .select('*')
//       .eq('auth_user_id', user.id)
//       .single();

//     if (profileOnlyError || !profileOnly) {
//       return {
//         isAuthenticated: true,
//         profile: null,
//       };
//     }

//     // 管理者権限を確認
//     const { data: isAdmin } = await supabase
//       .schema('system')
//       .rpc('check_is_admin');

//     // ProfileWithRole型に変換
//     const profileWithRole: ProfileWithRole = {
//       id: profileOnly.id,
//       email: profileOnly.email ?? null,
//       fullName: profileOnly.full_name ?? null,
//       avatarUrl: profileOnly.avatar_url ?? null,
//       createdAt: profileOnly.created_at,
//       updatedAt: profileOnly.updated_at,
//       isAdmin: !!isAdmin,
//     };

//     return {
//       isAuthenticated: true,
//       profile: profileWithRole,
//     };
//   } catch (error) {
//     console.error('認証状態の取得に失敗しました:', error);
//     return {
//       isAuthenticated: false,
//       profile: null,
//     };
//   }
// }
