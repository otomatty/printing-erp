import { getSupabaseClientKeys } from './chunk-VC6UCD4Z.mjs';
import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

function getSupabaseServerClient() {
  const keys = getSupabaseClientKeys();
  return createServerClient(keys.url, keys.anonKey, {
    cookies: {
      async getAll() {
        const cookieStore = await cookies();
        return cookieStore.getAll();
      },
      async setAll(cookiesToSet) {
        const cookieStore = await cookies();
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
        }
      }
    }
  });
}

export { getSupabaseServerClient };
//# sourceMappingURL=chunk-WMV2XZZR.mjs.map
//# sourceMappingURL=chunk-WMV2XZZR.mjs.map