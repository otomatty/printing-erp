import { redirect } from 'next/navigation';
import { verifyCaptchaToken } from '@kit/auth/captcha/server';
import { requireUser } from '@kit/supabase/require-user';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

// src/actions/enhance-action.ts

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
      await verifyCaptchaToken(token);
    }
    if (requireAuth) {
      try {
        const auth = await requireUser(
          getSupabaseServerClient()
        );
        if (!auth.data) {
          redirect(auth.redirectTo);
        }
        user = auth.data;
      } catch (error) {
      }
    }
    return fn(data, user);
  };
}

export { enhanceAction };
//# sourceMappingURL=enhance-action.mjs.map
//# sourceMappingURL=enhance-action.mjs.map