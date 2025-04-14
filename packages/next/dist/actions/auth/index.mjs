import { getSupabaseServerClient } from '@kit/supabase/server-client';

// src/actions/auth/auth.ts
async function checkIsAdmin() {
  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase.rpc("check_is_admin");
    if (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
    return !!data;
  } catch (error) {
    console.error("Unexpected error in checkIsAdmin:", error);
    return false;
  }
}
async function getAuthState() {
  try {
    const supabase = await getSupabaseServerClient();
    const response = new Response();
    response.headers.set("Cache-Control", "no-store");
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        isAuthenticated: false,
        profile: null
      };
    }
    const { data: profileOnly, error: profileOnlyError } = await supabase.from("user_accounts").select("*").eq("auth_user_id", user.id).single();
    if (profileOnlyError || !profileOnly) {
      return {
        isAuthenticated: true,
        profile: null
      };
    }
    const { data: isAdmin } = await supabase.schema("system").rpc("check_is_admin");
    const profileWithRole = {
      id: profileOnly.id,
      email: profileOnly.email ?? null,
      fullName: profileOnly.full_name ?? null,
      avatarUrl: profileOnly.avatar_url ?? null,
      createdAt: profileOnly.created_at,
      updatedAt: profileOnly.updated_at,
      isAdmin: !!isAdmin
    };
    return {
      isAuthenticated: true,
      profile: profileWithRole
    };
  } catch (error) {
    console.error("\u8A8D\u8A3C\u72B6\u614B\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F:", error);
    return {
      isAuthenticated: false,
      profile: null
    };
  }
}

export { checkIsAdmin, getAuthState };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map