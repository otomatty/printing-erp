'use server';

import type { Database } from '@kit/supabase/database';

interface AdminUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'staff';
}

export async function createAdminUser(data: AdminUserData) {
  // モック: 管理者ユーザーを返す
  const mockAdmin: Database['system']['Tables']['admin_users']['Row'] = {
    id: 'admin1',
    auth_user_id: 'user1',
    email: data.email,
    first_name: data.firstName,
    last_name: data.lastName,
    role: data.role,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  return { success: true, data: mockAdmin };
}

// setupAdminQuickAccessはモックのため不要
