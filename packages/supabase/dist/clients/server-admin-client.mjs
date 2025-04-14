import { getSupabaseClientKeys, z } from '../chunk-VC6UCD4Z.mjs';
import 'server-only';
import { createClient } from '@supabase/supabase-js';

var message = "Invalid Supabase Service Role Key. Please add the environment variable SUPABASE_SERVICE_ROLE_KEY.";
function getServiceRoleKey() {
  return z.string({
    required_error: message
  }).min(1, {
    message
  }).parse(process.env.SUPABASE_SERVICE_ROLE_KEY);
}
function warnServiceRoleKeyUsage() {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[Dev Only] This is a simple warning to let you know you are using the Supabase Service Role. Make sure it's the right call.`
    );
  }
}

// src/clients/server-admin-client.ts
function getSupabaseServerAdminClient() {
  warnServiceRoleKeyUsage();
  const url = getSupabaseClientKeys().url;
  return createClient(url, getServiceRoleKey(), {
    auth: {
      persistSession: false,
      detectSessionInUrl: false,
      autoRefreshToken: false
    }
  });
}

export { getSupabaseServerAdminClient };
//# sourceMappingURL=server-admin-client.mjs.map
//# sourceMappingURL=server-admin-client.mjs.map