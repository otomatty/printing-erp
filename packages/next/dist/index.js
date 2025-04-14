'use strict';

var serverClient = require('@kit/supabase/server-client');
var navigation = require('next/navigation');
var server = require('@kit/auth/captcha/server');
var requireUser = require('@kit/supabase/require-user');

// src/actions/auth/auth.ts
async function checkIsAdmin() {
  try {
    const supabase = await serverClient.getSupabaseServerClient();
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
    const supabase = await serverClient.getSupabaseServerClient();
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
    const { data: profileOnly, error: profileOnlyError } = await supabase.from("profiles").select("*").eq("auth_user_id", user.id).single();
    if (profileOnlyError || !profileOnly) {
      return {
        isAuthenticated: true,
        profile: null
      };
    }
    const { data: isAdmin } = await supabase.rpc("check_is_admin");
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

// src/utils/index.ts
var zodParseFactory = (schema) => (data) => {
  try {
    return schema.parse(data);
  } catch (err) {
    console.error(err);
    throw new Error(`Invalid data: ${err}`);
  }
};

// src/actions/enhance-action.ts
function enhanceAction(fn, config) {
  return async (params) => {
    const requireAuth = config.auth ?? true;
    let user = void 0;
    const data = config.schema ? zodParseFactory(config.schema)(params) : params;
    const verifyCaptcha = config.captcha ?? false;
    if (verifyCaptcha) {
      const token = data.captchaToken;
      await server.verifyCaptchaToken(token);
    }
    if (requireAuth) {
      try {
        const auth = await requireUser.requireUser(
          serverClient.getSupabaseServerClient()
        );
        if (!auth.data) {
          navigation.redirect(auth.redirectTo);
        }
        user = auth.data;
      } catch (error) {
      }
    }
    return fn(data, user);
  };
}

// ../../node_modules/server-only/index.js
throw new Error(
  "This module cannot be imported from a Client Component module. It should only be used from a Server Component."
);
var enhanceRouteHandler = (handler, params) => {
  return async function routeHandler(request, routeParams) {
    let user = void 0;
    const shouldVerifyCaptcha = params?.captcha ?? false;
    if (shouldVerifyCaptcha) {
      const token = captchaTokenGetter(request);
      if (token) {
        await server.verifyCaptchaToken(token);
      } else {
        return new Response("CAPTCHA\u30C8\u30FC\u30AF\u30F3\u304C\u5FC5\u8981\u3067\u3059", { status: 400 });
      }
    }
    const client = serverClient.getSupabaseServerClient();
    const shouldVerifyAuth = params?.auth ?? true;
    if (shouldVerifyAuth) {
      const auth = await requireUser.requireUser(client);
      if (auth.error) {
        return navigation.redirect(auth.redirectTo);
      }
      user = auth.data;
    }
    let body = void 0;
    if (params?.schema) {
      const json = await request.clone().json();
      body = zodParseFactory(params.schema)(
        json
      );
    }
    return handler({
      request,
      body,
      user,
      params: await routeParams.params
    });
  };
};
function captchaTokenGetter(request) {
  return request.headers.get("x-captcha-token");
}

exports.checkIsAdmin = checkIsAdmin;
exports.enhanceAction = enhanceAction;
exports.enhanceRouteHandler = enhanceRouteHandler;
exports.getAuthState = getAuthState;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map