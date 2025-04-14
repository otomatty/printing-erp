export { getSupabaseServerClient } from './chunk-WMV2XZZR.mjs';
import { createAuthCallbackService } from './chunk-MGCQ5FMH.mjs';
export { requireUser } from './chunk-BRCTLV3Y.mjs';
export { checkRequiresMultiFactorAuthentication } from './chunk-VTKGXIUY.mjs';
export { getSupabaseBrowserClient } from './chunk-3CV4FUBH.mjs';
import { getSupabaseClientKeys } from './chunk-VC6UCD4Z.mjs';
import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

function getCookieDomain(host) {
  if (process.env.COOKIE_DOMAIN) {
    console.log(
      `[getCookieDomain] Using COOKIE_DOMAIN env var: ${process.env.COOKIE_DOMAIN}`
    );
    return process.env.COOKIE_DOMAIN;
  }
  if (host.includes(".saedgewell.test")) {
    console.log(
      `[getCookieDomain] Development host detected: ${host}, returning: .saedgewell.test`
    );
    return ".saedgewell.test";
  }
  if (host === "localhost" || host.startsWith("localhost:")) {
    console.log(
      `[getCookieDomain] Localhost detected: ${host}, returning undefined to skip domain attribute.`
    );
    return void 0;
  }
  const parts = host.split(".");
  if (parts.length === 2) {
    const domain = `.${host}`;
    console.log(
      `[getCookieDomain] Two-part host detected: ${host}, returning: ${domain}`
    );
    return domain;
  }
  if (parts.length >= 3) {
    const domain = `.${parts.slice(1).join(".")}`;
    console.log(
      `[getCookieDomain] Multi-part host detected: ${host}, returning: ${domain}`
    );
    return domain;
  }
  console.warn(
    `[getCookieDomain] Unexpected host format: ${host}, returning host directly.`
  );
  return host;
}
async function handleAuthCallback(request, defaultRedirectPath) {
  const cookieStore = await cookies();
  const keys = getSupabaseClientKeys();
  const host = request.headers.get("host") || "web.saedgewell.test";
  const protocol = request.headers.get("x-forwarded-proto") || "https";
  const path = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  const correctUrl = `${protocol}://${host}${path}${search}`;
  const requestUrl = new URL(correctUrl);
  const cookieDomain = getCookieDomain(host);
  console.log(
    `[handleAuthCallback] Setting cookies for domain: ${cookieDomain ? cookieDomain : "none (implicit)"}, host: ${host}`
  );
  const isLocalhost = host === "localhost" || host.startsWith("localhost:");
  isLocalhost || process.env.NODE_ENV !== "production";
  const shouldSecure = !isLocalhost;
  const cookieOptions = {
    ...cookieDomain ? { domain: cookieDomain } : {},
    // domainがundefinedの場合は設定しない
    path: "/",
    secure: shouldSecure,
    // localhostではfalse、それ以外はtrue
    sameSite: "none",
    // クロスサイト送信許可
    httpOnly: true,
    // JavaScriptからのアクセス防止
    maxAge: 60 * 60 * 24 * 7
    // 例: 7日間
  };
  console.log(
    `[handleAuthCallback] Cookie options: ${JSON.stringify({
      domain: cookieDomain || "not set",
      secure: shouldSecure,
      sameSite: "none"
    })}`
  );
  const supabaseClient = createServerClient(keys.url, keys.anonKey, {
    cookies: {
      async getAll() {
        const cookies2 = await cookieStore.getAll();
        return cookies2;
      },
      async setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            await cookieStore.set({
              name,
              value,
              ...cookieOptions,
              ...options
            });
          }
        } catch (error) {
          console.error("[handleAuthCallback] Error setting cookies:", error);
        }
      }
    }
  });
  const service = createAuthCallbackService(
    supabaseClient
  );
  try {
    let nextPath;
    if (requestUrl.searchParams.get("code")) {
      console.log("[handleAuthCallback] Exchanging code for session...");
      const { nextPath: resultPath } = await service.exchangeCodeForSession(
        new Request(correctUrl),
        // Requestオブジェクトを渡す
        {
          redirectPath: defaultRedirectPath
        }
      );
      console.log(
        "[handleAuthCallback] Exchange successful, nextPath:",
        resultPath
      );
      nextPath = resultPath;
    } else {
      if (typeof service.verifyTokenHash === "function") {
        console.log("[handleAuthCallback] Verifying token hash...");
        const url = await service.verifyTokenHash(new Request(correctUrl), {
          redirectPath: defaultRedirectPath
        });
        console.log(
          "[handleAuthCallback] Verification successful, nextPath:",
          url.pathname + url.search
        );
        nextPath = url.pathname + url.search;
      } else {
        console.warn(
          "[handleAuthCallback] service.verifyTokenHash is not available. Assuming code exchange flow."
        );
        throw new Error(
          "Invalid callback request: No code found and verifyTokenHash not available."
        );
      }
    }
    return { type: "success", nextPath };
  } catch (error) {
    console.error(
      "[handleAuthCallback] Error during callback processing:",
      error
    );
    const errorType = error instanceof Error ? error.constructor.name : typeof error;
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorRedirectPath = `/auth/callback/error?error=${encodeURIComponent("\u8A8D\u8A3C\u51E6\u7406\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F")}&error_type=${encodeURIComponent(errorType)}&error_message=${encodeURIComponent(errorMessage)}`;
    return {
      type: "error",
      errorType,
      errorMessage,
      nextPath: errorRedirectPath
    };
  }
}

export { handleAuthCallback };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map