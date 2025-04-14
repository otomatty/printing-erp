'use strict';

var navigation = require('next/navigation');
var server = require('@kit/auth/captcha/server');
var requireUser = require('@kit/supabase/require-user');
var serverClient = require('@kit/supabase/server-client');

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

exports.enhanceAction = enhanceAction;
//# sourceMappingURL=enhance-action.js.map
//# sourceMappingURL=enhance-action.js.map