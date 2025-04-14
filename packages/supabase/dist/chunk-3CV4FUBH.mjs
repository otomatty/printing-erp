import { getSupabaseClientKeys } from './chunk-VC6UCD4Z.mjs';
import { createBrowserClient } from '@supabase/ssr';

function getSupabaseBrowserClient() {
  const keys = getSupabaseClientKeys();
  const url = keys.url;
  let domain = void 0;
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  if (hostname === "localhost") {
    domain = void 0;
  } else if (hostname.includes("saedgewell.test")) {
    domain = ".saedgewell.test";
  } else if (hostname.includes("saedgewell.net")) {
    domain = ".saedgewell.net";
  }
  const cookieOptions = {
    // ドメインが存在する場合のみ設定
    ...domain ? { domain } : {},
    path: "/",
    sameSite: "none",
    // 'lax'から'none'に変更してサードパーティCookie制限に対応
    secure: true
    // 常にtrueに設定して、サブドメイン間で共有可能にする
  };
  return createBrowserClient(url, keys.anonKey, {
    cookieOptions
  });
}

export { getSupabaseBrowserClient };
//# sourceMappingURL=chunk-3CV4FUBH.mjs.map
//# sourceMappingURL=chunk-3CV4FUBH.mjs.map