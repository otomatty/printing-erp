'use strict';

var chunkJOFXBLHN_js = require('./chunk-JOFXBLHN.js');
var ssr = require('@supabase/ssr');

function getSupabaseBrowserClient() {
  const keys = chunkJOFXBLHN_js.getSupabaseClientKeys();
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
  return ssr.createBrowserClient(url, keys.anonKey, {
    cookieOptions
  });
}

exports.getSupabaseBrowserClient = getSupabaseBrowserClient;
//# sourceMappingURL=chunk-KVM5HTEU.js.map
//# sourceMappingURL=chunk-KVM5HTEU.js.map