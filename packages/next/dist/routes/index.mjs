import { redirect } from 'next/navigation';
import { verifyCaptchaToken } from '@kit/auth/captcha/server';
import { requireUser } from '@kit/supabase/require-user';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

// ../../node_modules/server-only/index.js
throw new Error(
  "This module cannot be imported from a Client Component module. It should only be used from a Server Component."
);

// src/utils/index.ts
var zodParseFactory = (schema) => (data) => {
  try {
    return schema.parse(data);
  } catch (err) {
    console.error(err);
    throw new Error(`Invalid data: ${err}`);
  }
};

// src/routes/index.ts
var enhanceRouteHandler = (handler, params) => {
  return async function routeHandler(request, routeParams) {
    let user = void 0;
    const shouldVerifyCaptcha = params?.captcha ?? false;
    if (shouldVerifyCaptcha) {
      const token = captchaTokenGetter(request);
      if (token) {
        await verifyCaptchaToken(token);
      } else {
        return new Response("CAPTCHA\u30C8\u30FC\u30AF\u30F3\u304C\u5FC5\u8981\u3067\u3059", { status: 400 });
      }
    }
    const client = getSupabaseServerClient();
    const shouldVerifyAuth = params?.auth ?? true;
    if (shouldVerifyAuth) {
      const auth = await requireUser(client);
      if (auth.error) {
        return redirect(auth.redirectTo);
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

export { enhanceRouteHandler };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map