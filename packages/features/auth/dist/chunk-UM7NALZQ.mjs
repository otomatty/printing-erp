// src/captcha/client/captcha-token-setter.tsx
import { useContext } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

// src/captcha/client/captcha-provider.tsx
import { createContext, useCallback, useRef, useState } from "react";
var Captcha = createContext({
  token: "",
  instance: null,
  setToken: (_) => {
    return "";
  },
  setInstance: () => {
  }
});
function CaptchaProvider(props) {
  const [token, setToken] = useState("");
  const instanceRef = useRef(null);
  const setInstance = useCallback((ref) => {
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
  const { setToken, setInstance } = useContext(Captcha);
  if (!props.siteKey) {
    return null;
  }
  const options = props.options ?? {
    options: {
      size: "invisible"
    }
  };
  return /* @__PURE__ */ React.createElement(
    Turnstile,
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
import { useContext as useContext2, useMemo } from "react";
function useCaptchaToken() {
  const context = useContext2(Captcha);
  if (!context) {
    throw new Error("useCaptchaToken must be used within a CaptchaProvider");
  }
  return useMemo(() => {
    return {
      captchaToken: context.token,
      resetCaptchaToken: () => context.instance?.reset()
    };
  }, [context]);
}

export {
  Captcha,
  CaptchaProvider,
  CaptchaTokenSetter,
  useCaptchaToken
};
