import { getSupabaseClientKeys } from '../chunk-VC6UCD4Z.mjs';
import 'server-only';
import { createServerClient } from '@supabase/ssr';

function createMiddlewareClient(request, response) {
  try {
    const keys = getSupabaseClientKeys();
    if (!keys.url || !keys.anonKey) {
      throw new Error("Supabase client keys are missing or invalid");
    }
    const url = keys.url;
    const host = request.headers.get("host") || "";
    let domain = void 0;
    if (host.startsWith("localhost")) {
      domain = "localhost";
    } else if (host.includes("saedgewell.test")) {
      domain = ".saedgewell.test";
    } else if (host.includes("saedgewell.net")) {
      domain = ".saedgewell.net";
    } else if (host.includes(".")) {
      const parts = host.split(".");
      if (parts.length >= 2) {
        domain = `.${parts.slice(-2).join(".")}`;
      }
    }
    return createServerClient(url, keys.anonKey, {
      cookies: {
        getAll() {
          try {
            const allCookies = request.cookies.getAll();
            return allCookies;
          } catch (error) {
            console.error("Failed to get cookies from request:", error);
            return [];
          }
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value } of cookiesToSet) {
              request.cookies.set(name, value);
            }
            for (const { name, value, options } of cookiesToSet) {
              const cookieOptions = {
                ...options,
                // ドメインが存在する場合のみ設定
                ...domain ? { domain } : {},
                // SameSite属性を常に'none'に設定して、サードパーティCookie制限に対応
                sameSite: "none",
                // 'none'を使用する場合はsecureが必須だが、開発環境(HTTP)ではfalseにする
                // NODE_ENVが'production'でない場合、または localhost でない場合は true を推奨
                secure: process.env.NODE_ENV === "production" || !host.startsWith("localhost")
              };
              response.cookies.set(name, value, cookieOptions);
            }
          } catch (error) {
            console.error("Failed to set cookies:", error);
          }
        }
      }
    });
  } catch (error) {
    console.error("Failed to create Supabase middleware client:", error);
    throw error;
  }
}

export { createMiddlewareClient };
//# sourceMappingURL=middleware-client.mjs.map
//# sourceMappingURL=middleware-client.mjs.map