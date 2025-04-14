"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/captcha/client/index.ts
var client_exports = {};
__export(client_exports, {
  Captcha: () => Captcha,
  CaptchaProvider: () => CaptchaProvider,
  CaptchaTokenSetter: () => CaptchaTokenSetter,
  useCaptchaToken: () => useCaptchaToken
});
module.exports = __toCommonJS(client_exports);

// src/captcha/client/captcha-token-setter.tsx
var import_react2 = require("react");
var import_react_turnstile = require("@marsidev/react-turnstile");

// src/captcha/client/captcha-provider.tsx
var import_react = require("react");
var Captcha = (0, import_react.createContext)({
  token: "",
  instance: null,
  setToken: (_) => {
    return "";
  },
  setInstance: () => {
  }
});
function CaptchaProvider(props) {
  const [token, setToken] = (0, import_react.useState)("");
  const instanceRef = (0, import_react.useRef)(null);
  const setInstance = (0, import_react.useCallback)((ref) => {
    instanceRef.current = ref;
  }, []);
  return /* @__PURE__ */ React.createElement(
    Captcha.Provider,
    {
      value: { token, setToken, instance: instanceRef.current, setInstance }
    },
    props.children
  );
}

// src/captcha/client/captcha-token-setter.tsx
function CaptchaTokenSetter(props) {
  const { setToken, setInstance } = (0, import_react2.useContext)(Captcha);
  if (!props.siteKey) {
    return null;
  }
  const options = props.options ?? {
    options: {
      size: "invisible"
    }
  };
  return /* @__PURE__ */ React.createElement(
    import_react_turnstile.Turnstile,
    {
      ref: (instance) => {
        if (instance) {
          setInstance(instance);
        }
      },
      siteKey: props.siteKey,
      onSuccess: setToken,
      ...options
    }
  );
}

// src/captcha/client/use-captcha-token.ts
var import_react3 = require("react");
function useCaptchaToken() {
  const context = (0, import_react3.useContext)(Captcha);
  if (!context) {
    throw new Error("useCaptchaToken must be used within a CaptchaProvider");
  }
  return (0, import_react3.useMemo)(() => {
    return {
      captchaToken: context.token,
      resetCaptchaToken: () => context.instance?.reset()
    };
  }, [context]);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Captcha,
  CaptchaProvider,
  CaptchaTokenSetter,
  useCaptchaToken
});
