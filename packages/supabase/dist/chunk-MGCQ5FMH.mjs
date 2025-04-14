import 'server-only';

// src/auth-callback.service.ts
var Result = class _Result {
  constructor(_value, _error, _isOk) {
    this._value = _value;
    this._error = _error;
    this._isOk = _isOk;
  }
  static ok(value) {
    return new _Result(value, null, true);
  }
  static error(error) {
    return new _Result(null, error, false);
  }
  get isOk() {
    return this._isOk;
  }
  get isErr() {
    return !this._isOk;
  }
  get value() {
    return this._value;
  }
  get error() {
    return this._error;
  }
};
var ErrorCode = /* @__PURE__ */ ((ErrorCode2) => {
  ErrorCode2["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
  ErrorCode2["OAUTH_ERROR"] = "OAUTH_ERROR";
  ErrorCode2["STATE_ERROR"] = "STATE_ERROR";
  ErrorCode2["STATE_MISMATCH"] = "STATE_MISMATCH";
  ErrorCode2["CODE_ERROR"] = "CODE_ERROR";
  ErrorCode2["SESSION_ERROR"] = "SESSION_ERROR";
  ErrorCode2["CODE_VERIFIER_ERROR"] = "CODE_VERIFIER_ERROR";
  ErrorCode2["EXCHANGE_ERROR"] = "EXCHANGE_ERROR";
  ErrorCode2["REDIRECT_ERROR"] = "REDIRECT_ERROR";
  ErrorCode2["INVALID_REDIRECT"] = "INVALID_REDIRECT";
  return ErrorCode2;
})(ErrorCode || {});
function createAuthCallbackService(client) {
  return new AuthCallbackService(client);
}
var AuthCallbackService = class {
  constructor(client) {
    this.client = client;
    // PKCE認証用のクッキー名
    this.STATE_COOKIE = "sb-oauth-state";
    this.CODE_VERIFIER_COOKIE = "sb-oauth-code-verifier";
    this.REDIRECT_TO_COOKIE = "sb-redirect-to";
  }
  /**
   * OAuth認証コールバック処理を行います
   *
   * @param cookies クッキーサービス
   * @param callbackParams コールバックパラメータ
   * @param searchParams URLのクエリパラメータ
   * @returns リダイレクトURLまたはエラーコード
   */
  async oAuthCallback(cookies, callbackParams, searchParams) {
    if (!callbackParams.state) {
      return Result.error("STATE_ERROR" /* STATE_ERROR */);
    }
    const stateFromCookie = cookies.get(this.STATE_COOKIE);
    if (!stateFromCookie || stateFromCookie !== callbackParams.state) {
      this.clearPKCECookies(cookies);
      return Result.error("STATE_MISMATCH" /* STATE_MISMATCH */);
    }
    if (!callbackParams.code) {
      return Result.error("CODE_ERROR" /* CODE_ERROR */);
    }
    let sessionResult;
    try {
      sessionResult = await this.exchangeCodeForSessionWithCookies(
        cookies,
        callbackParams.code
      );
    } catch (error) {
      return Result.error("SESSION_ERROR" /* SESSION_ERROR */);
    }
    if (sessionResult.isErr && sessionResult.error) {
      return Result.error(sessionResult.error);
    }
    this.clearPKCECookies(cookies);
    return this.getRedirectUrl(cookies);
  }
  /**
   * @name verifyTokenHash
   * @description Verifies the token hash and type and redirects the user to the next page
   * This should be used when using a token hash to verify the user's email
   * @param request
   * @param params
   */
  async verifyTokenHash(request, params) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const host = request.headers.get("host");
    if (url.host.includes("localhost:") && !host?.includes("localhost")) {
      url.host = host;
      url.port = "";
    }
    url.pathname = params.redirectPath;
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");
    const callbackParam = searchParams.get("next") ?? searchParams.get("callback");
    let nextPath = null;
    const callbackUrl = callbackParam ? new URL(callbackParam) : null;
    if (callbackUrl) {
      const callbackNextPath = callbackUrl.searchParams.get("next");
      if (callbackNextPath) {
        nextPath = callbackNextPath;
      } else {
        nextPath = callbackUrl.pathname;
      }
    }
    const errorPath = params.errorPath ?? "/auth/callback/error";
    searchParams.delete("token_hash");
    searchParams.delete("type");
    searchParams.delete("next");
    if (nextPath) {
      url.pathname = nextPath;
    }
    if (token_hash && type) {
      const { error } = await this.client.auth.verifyOtp({
        type,
        token_hash
      });
      if (!error) {
        return url;
      }
      if (error.code) {
        url.searchParams.set("code", error.code.toString());
      }
      const errorMessage = getAuthErrorMessage({
        error: error.message,
        code: error.code?.toString()
      });
      url.searchParams.set("error", errorMessage);
    }
    url.pathname = errorPath;
    return url;
  }
  /**
   * @name exchangeCodeForSession
   * @description Exchanges the auth code for a session and redirects the user to the next page or an error page
   * @param request
   * @param params
   */
  async exchangeCodeForSession(request, params) {
    const requestUrl = new URL(request.url);
    const searchParams = requestUrl.searchParams;
    const authCode = searchParams.get("code");
    const error = searchParams.get("error");
    const nextUrlPathFromParams = searchParams.get("next");
    const errorPath = params.errorPath ?? "/auth/callback/error";
    const nextUrl = nextUrlPathFromParams ?? params.redirectPath;
    if (authCode) {
      try {
        const { data, error: error2 } = await this.client.auth.exchangeCodeForSession(authCode);
        if (error2) {
          return onError({
            code: error2.code?.toString(),
            error: error2.message,
            path: errorPath
          });
        }
      } catch (error2) {
        return {
          nextPath: errorPath
        };
      }
    } else if (error) {
      return onError({
        error,
        path: errorPath
      });
    }
    return {
      nextPath: nextUrl
    };
  }
  /**
   * コードをセッションと交換し、関連するクッキーを処理します
   *
   * @param cookies クッキーサービス
   * @param code 認証コード
   * @returns セッションまたはエラーコード
   */
  async exchangeCodeForSessionWithCookies(cookies, code) {
    const codeVerifier = cookies.get(this.CODE_VERIFIER_COOKIE);
    if (!codeVerifier) {
      return Result.error(
        "CODE_VERIFIER_ERROR" /* CODE_VERIFIER_ERROR */
      );
    }
    try {
      const { data, error } = await this.client.auth.exchangeCodeForSession(code);
      if (error) {
        const errorCodeStr = error.code?.toString();
        console.error(
          `OAuth Error: ${error.message}`,
          { errorCode: errorCodeStr, details: error }
          // オブジェクトとして渡す
        );
        this.clearPKCECookies(cookies);
        return Result.error(
          "EXCHANGE_ERROR" /* EXCHANGE_ERROR */
        );
      }
      if (!data || !data.session) {
        console.error(
          "Session Error: No session data received after code exchange."
        );
        this.clearPKCECookies(cookies);
        return Result.error(
          "SESSION_ERROR" /* SESSION_ERROR */
        );
      }
      return Result.ok(data.session);
    } catch (e) {
      let errorMessage = "Unknown error during code exchange";
      let errorCode = void 0;
      const originalError = e;
      if (e instanceof Error) {
        errorMessage = e.message;
        const errorWithCode = e;
        if (typeof errorWithCode.code === "string" || typeof errorWithCode.code === "number") {
          errorCode = errorWithCode.code;
        }
      } else if (typeof e === "object" && e !== null) {
        const potentialError = e;
        if (typeof potentialError.message === "string") {
          errorMessage = potentialError.message;
        }
        if (typeof potentialError.code === "string" || typeof potentialError.code === "number") {
          errorCode = potentialError.code;
        }
      }
      const errorCodeStrFromCatch = errorCode?.toString();
      console.error(
        `Unexpected error: ${errorMessage}`,
        { errorCode: errorCodeStrFromCatch, errorDetails: originalError }
        // オブジェクトとして渡す
      );
      this.clearPKCECookies(cookies);
      return Result.error(
        "UNKNOWN_ERROR" /* UNKNOWN_ERROR */
      );
    }
  }
  /**
   * リダイレクトURLを取得します
   *
   * @param cookies クッキーサービス
   * @returns リダイレクトURLまたはエラーコード
   */
  async getRedirectUrl(cookies) {
    try {
      const redirectTo = cookies.get(this.REDIRECT_TO_COOKIE);
      if (!redirectTo) {
        return Result.error("REDIRECT_ERROR" /* REDIRECT_ERROR */);
      }
      const isValidUrl = await this.isValidRedirectUrl(redirectTo);
      if (!isValidUrl) {
        return Result.error("INVALID_REDIRECT" /* INVALID_REDIRECT */);
      }
      return Result.ok(redirectTo);
    } catch (error) {
      return Result.error("UNKNOWN_ERROR" /* UNKNOWN_ERROR */);
    }
  }
  /**
   * 許可されたリダイレクトURLのリストを取得します
   */
  async getAllowedRedirectUrls() {
    try {
      return [
        "http://localhost:3000",
        "http://saedgewell.test",
        "http://docs.saedgewell.test",
        "http://admin.saedgewell.test",
        "https://saedgewell.test",
        "https://docs.saedgewell.test",
        "https://admin.saedgewell.test",
        "https://saedgewell.net",
        "https://docs.saedgewell.net",
        "https://admin.saedgewell.net"
      ];
    } catch (error) {
      return [];
    }
  }
  /**
   * リダイレクトURLが有効かどうかを確認します
   *
   * @param url チェックするURL
   * @returns 有効な場合はtrue、そうでない場合はfalse
   */
  async isValidRedirectUrl(url) {
    try {
      const allowedUrls = await this.getAllowedRedirectUrls();
      const parsedUrl = new URL(url);
      return allowedUrls.some((allowedUrl) => {
        try {
          const parsedAllowedUrl = new URL(allowedUrl);
          return parsedUrl.origin === parsedAllowedUrl.origin;
        } catch {
          return false;
        }
      });
    } catch (error) {
      return false;
    }
  }
  /**
   * PKCE認証フローで使用するクッキーをクリアします
   *
   * @param cookies クッキーサービス
   */
  clearPKCECookies(cookies) {
    cookies.delete(this.STATE_COOKIE);
    cookies.delete(this.CODE_VERIFIER_COOKIE);
  }
  /**
   * エラーコードに基づいてエラーレスポンスを処理します
   *
   * @param errorCode エラーコード
   * @param error オプションのエラーオブジェクト
   * @param errorDescription オプションのエラー説明
   * @returns エラーを示すResultオブジェクト
   */
  handleCallbackError(errorCode, error, errorDescription) {
    const message = error?.message || "Unknown callback error";
    const code = error?.code;
    let errorCodeString = void 0;
    if (typeof code === "string") {
      errorCodeString = code;
    } else if (typeof code === "number") {
      errorCodeString = code.toString();
    }
    console.error(`${errorCode}: ${message}`, {
      errorDescription,
      errorCode: errorCodeString,
      // ここでは確実に string | undefined
      originalError: error
    });
    return Result.error(errorCode);
  }
};
function onError({
  error,
  path,
  code
}) {
  const url = new URL(path, "http://localhost");
  if (code) {
    url.searchParams.set("code", code);
  }
  const errorMessage = getAuthErrorMessage({
    error,
    code
  });
  url.searchParams.set("error", errorMessage);
  return {
    nextPath: url.toString().replace("http://localhost", "")
  };
}
function isVerifierError(error) {
  const verifierErrors = [
    "pkce_verifier",
    "OTP",
    "Verifier",
    "PKCE",
    "expired"
  ];
  return verifierErrors.some(
    (verifierError) => error.toLowerCase().includes(verifierError.toLowerCase())
  );
}
function getAuthErrorMessage(params) {
  const { error, code } = params;
  if (isVerifierError(error)) {
    return "\u8A8D\u8A3C\u30BB\u30C3\u30B7\u30E7\u30F3\u306E\u6709\u52B9\u671F\u9650\u304C\u5207\u308C\u3066\u3044\u307E\u3059\u3002\u5225\u306E\u30D6\u30E9\u30A6\u30B6\u3084\u30C7\u30D0\u30A4\u30B9\u3067\u8A8D\u8A3C\u3092\u8A66\u307F\u305F\u5834\u5408\u306F\u3001\u540C\u3058\u30D6\u30E9\u30A6\u30B6\u3067\u6700\u521D\u304B\u3089\u8A8D\u8A3C\u30D5\u30ED\u30FC\u3092\u3084\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002";
  }
  if (code === "PGRST301") {
    return "\u8A8D\u8A3C\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002";
  }
  return error;
}

export { ErrorCode, Result, createAuthCallbackService };
//# sourceMappingURL=chunk-MGCQ5FMH.mjs.map
//# sourceMappingURL=chunk-MGCQ5FMH.mjs.map