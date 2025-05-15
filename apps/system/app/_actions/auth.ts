'use server';

import type { User } from '@supabase/supabase-js';
import type { Database } from '@kit/supabase/database';
import { redirect } from 'next/navigation';

/**
 * 現在ログインしているユーザー情報を取得する
 * @returns ユーザー情報とカスタマー情報
 */
export async function getUser() {
  // モックユーザー情報を返す
  const mockUser: User = {
    id: 'user1',
    email: 'user@example.com',
    user_metadata: { first_name: '太郎', last_name: '山田' },
    app_metadata: { is_admin: true },
    aud: '',
    role: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as User;
  const mockCustomer:
    | Database['public']['Tables']['user_accounts']['Row']
    | null = null;
  return { user: mockUser, customer: mockCustomer };
}

/**
 * サインアウトアクション
 */
export async function signOut() {
  // サインアウトはモックでリダイレクトのみ
  redirect('/auth/login');
}
