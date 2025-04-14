'use strict';

var chunkKF3EGMTN_js = require('./chunk-KF3EGMTN.js');

// src/require-user.ts
var MULTI_FACTOR_AUTH_VERIFY_PATH = "/";
var SIGN_IN_PATH = "/";
async function requireUser(client) {
  const { data, error } = await client.auth.getUser();
  if (!data.user || error) {
    return {
      data: null,
      error: new AuthenticationError(),
      redirectTo: SIGN_IN_PATH
    };
  }
  const mfaClient = client;
  const requiresMfa = await chunkKF3EGMTN_js.checkRequiresMultiFactorAuthentication(mfaClient);
  if (requiresMfa) {
    return {
      data: null,
      error: new MultiFactorAuthError(),
      redirectTo: MULTI_FACTOR_AUTH_VERIFY_PATH
    };
  }
  return {
    error: null,
    data: data.user
    // 認証済みユーザーデータを返す (User型)
  };
}
var AuthenticationError = class extends Error {
  constructor() {
    super("Authentication required");
  }
};
var MultiFactorAuthError = class extends Error {
  constructor() {
    super("Multi-factor authentication required");
  }
};

exports.requireUser = requireUser;
//# sourceMappingURL=chunk-2AH5RCQI.js.map
//# sourceMappingURL=chunk-2AH5RCQI.js.map