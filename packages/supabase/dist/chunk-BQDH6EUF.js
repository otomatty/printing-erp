'use strict';

var chunkJOFXBLHN_js = require('./chunk-JOFXBLHN.js');
require('server-only');
var headers = require('next/headers');
var ssr = require('@supabase/ssr');

function getSupabaseServerClient() {
  const keys = chunkJOFXBLHN_js.getSupabaseClientKeys();
  return ssr.createServerClient(keys.url, keys.anonKey, {
    cookies: {
      async getAll() {
        const cookieStore = await headers.cookies();
        return cookieStore.getAll();
      },
      async setAll(cookiesToSet) {
        const cookieStore = await headers.cookies();
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

exports.getSupabaseServerClient = getSupabaseServerClient;
//# sourceMappingURL=chunk-BQDH6EUF.js.map
//# sourceMappingURL=chunk-BQDH6EUF.js.map