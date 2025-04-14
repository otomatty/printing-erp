"use strict";
"use client";
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

// src/components/resend-auth-link-form.tsx
var resend_auth_link_form_exports = {};
__export(resend_auth_link_form_exports, {
  ResendAuthLinkForm: () => ResendAuthLinkForm
});
module.exports = __toCommonJS(resend_auth_link_form_exports);
var import_zod = require("@hookform/resolvers/zod");
var import_react_query = require("@tanstack/react-query");
var import_react_hook_form = require("react-hook-form");
var import_zod2 = require("zod");
var import_use_supabase = require("@kit/supabase/hooks/use-supabase");
var import_alert = require("@kit/ui/alert");
var import_button = require("@kit/ui/button");
var import_form = require("@kit/ui/form");
var import_input = require("@kit/ui/input");

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

// src/components/resend-auth-link-form.tsx
function ResendAuthLinkForm(props) {
  const resendLink = useResendLink();
  const form = (0, import_react_hook_form.useForm)({
    resolver: (0, import_zod.zodResolver)(import_zod2.z.object({ email: import_zod2.z.string().email() })),
    defaultValues: {
      email: ""
    }
  });
  if (resendLink.data && !resendLink.isPending) {
    return /* @__PURE__ */ React.createElement(import_alert.Alert, { variant: "success" }, /* @__PURE__ */ React.createElement(import_alert.AlertTitle, null, "\u30E1\u30FC\u30EB\u3092\u518D\u9001\u4FE1\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(import_alert.AlertDescription, null, "\u30E1\u30FC\u30EB\u30DC\u30C3\u30AF\u30B9\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002"));
  }
  return /* @__PURE__ */ React.createElement(import_form.Form, { ...form }, /* @__PURE__ */ React.createElement(
    "form",
    {
      className: "flex flex-col space-y-2",
      onSubmit: form.handleSubmit((data) => {
        return resendLink.mutate({
          email: data.email,
          redirectPath: props.redirectPath
        });
      })
    },
    /* @__PURE__ */ React.createElement(
      import_form.FormField,
      {
        render: ({ field }) => {
          return /* @__PURE__ */ React.createElement(import_form.FormItem, null, /* @__PURE__ */ React.createElement(import_form.FormLabel, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9"), /* @__PURE__ */ React.createElement(import_form.FormControl, null, /* @__PURE__ */ React.createElement(import_input.Input, { type: "email", required: true, ...field })));
        },
        name: "email"
      }
    ),
    /* @__PURE__ */ React.createElement(import_button.Button, { disabled: resendLink.isPending }, "\u8A8D\u8A3C\u30E1\u30FC\u30EB\u3092\u518D\u9001\u4FE1")
  ));
}
function useResendLink() {
  const supabase = (0, import_use_supabase.useSupabase)();
  const { captchaToken } = useCaptchaToken();
  const mutationFn = async (props) => {
    const response = await supabase.auth.resend({
      email: props.email,
      type: "signup",
      options: {
        emailRedirectTo: props.redirectPath,
        captchaToken
      }
    });
    if (response.error) {
      throw response.error;
    }
    return response.data;
  };
  return (0, import_react_query.useMutation)({
    mutationFn
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ResendAuthLinkForm
});
