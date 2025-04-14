"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/password-reset.ts
var password_reset_exports = {};
__export(password_reset_exports, {
  PasswordResetRequestContainer: () => PasswordResetRequestContainer,
  UpdatePasswordForm: () => UpdatePasswordForm
});
module.exports = __toCommonJS(password_reset_exports);

// src/components/password-reset-request-container.tsx
var import_zod = require("@hookform/resolvers/zod");
var import_react_hook_form = require("react-hook-form");
var import_zod2 = require("zod");
var import_use_request_reset_password = require("@kit/supabase/hooks/use-request-reset-password");
var import_alert2 = require("@kit/ui/alert");
var import_button = require("@kit/ui/button");
var import_form = require("@kit/ui/form");
var import_if = require("@kit/ui/if");
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

// src/components/auth-error-alert.tsx
var import_react_icons = require("@radix-ui/react-icons");
var import_alert = require("@kit/ui/alert");
function AuthErrorAlert({
  error
}) {
  if (!error) {
    return null;
  }
  const DefaultError = "\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002";
  return /* @__PURE__ */ React.createElement(import_alert.Alert, { variant: "destructive" }, /* @__PURE__ */ React.createElement(import_react_icons.ExclamationTriangleIcon, { className: "w-4" }), /* @__PURE__ */ React.createElement(import_alert.AlertTitle, null, "\u8A8D\u8A3C\u30A8\u30E9\u30FC"), /* @__PURE__ */ React.createElement(import_alert.AlertDescription, { "data-test": "auth-error-message" }, DefaultError));
}

// src/components/password-reset-request-container.tsx
var PasswordResetSchema = import_zod2.z.object({
  email: import_zod2.z.string().email()
});
function PasswordResetRequestContainer(params) {
  const resetPasswordMutation = (0, import_use_request_reset_password.useRequestResetPassword)();
  const { captchaToken, resetCaptchaToken } = useCaptchaToken();
  const error = resetPasswordMutation.error;
  const success = resetPasswordMutation.data;
  const form = (0, import_react_hook_form.useForm)({
    resolver: (0, import_zod.zodResolver)(PasswordResetSchema),
    defaultValues: {
      email: ""
    }
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_if.If, { condition: success }, /* @__PURE__ */ React.createElement(import_alert2.Alert, { variant: "success" }, /* @__PURE__ */ React.createElement(import_alert2.AlertDescription, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u30EA\u30BB\u30C3\u30C8\u306E\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F\u3002\u30E1\u30FC\u30EB\u30DC\u30C3\u30AF\u30B9\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002"))), /* @__PURE__ */ React.createElement(import_if.If, { condition: !resetPasswordMutation.data }, /* @__PURE__ */ React.createElement(import_form.Form, { ...form }, /* @__PURE__ */ React.createElement(
    "form",
    {
      onSubmit: form.handleSubmit(({ email }) => {
        const redirectTo = new URL(
          params.redirectPath,
          window.location.origin
        ).href;
        return resetPasswordMutation.mutateAsync({
          email,
          redirectTo,
          captchaToken
        }).catch(() => {
          resetCaptchaToken();
        });
      }),
      className: "w-full"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground text-sm" }, "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u30EA\u30BB\u30C3\u30C8\u3059\u308B\u305F\u3081\u306E\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u3057\u307E\u3059\u3002")), /* @__PURE__ */ React.createElement(AuthErrorAlert, { error }), /* @__PURE__ */ React.createElement(
      import_form.FormField,
      {
        name: "email",
        render: ({ field }) => /* @__PURE__ */ React.createElement(import_form.FormItem, null, /* @__PURE__ */ React.createElement(import_form.FormLabel, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9"), /* @__PURE__ */ React.createElement(import_form.FormControl, null, /* @__PURE__ */ React.createElement(
          import_input.Input,
          {
            required: true,
            type: "email",
            placeholder: "example@example.com",
            ...field
          }
        )), /* @__PURE__ */ React.createElement(import_form.FormMessage, null))
      }
    ), /* @__PURE__ */ React.createElement(import_button.Button, { disabled: resetPasswordMutation.isPending, type: "submit" }, "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u30EA\u30BB\u30C3\u30C8"))
  ))));
}

// src/components/update-password-form.tsx
var import_link = __toESM(require("next/link"));
var import_zod5 = require("@hookform/resolvers/zod");
var import_react_icons2 = require("@radix-ui/react-icons");
var import_lucide_react = require("lucide-react");
var import_react_hook_form2 = require("react-hook-form");
var import_use_update_user_mutation = require("@kit/supabase/hooks/use-update-user-mutation");
var import_alert3 = require("@kit/ui/alert");
var import_button2 = require("@kit/ui/button");
var import_form2 = require("@kit/ui/form");
var import_heading = require("@kit/ui/heading");
var import_input2 = require("@kit/ui/input");

// src/schemas/password-reset.schema.ts
var import_zod4 = require("zod");

// src/schemas/password.schema.ts
var import_zod3 = require("zod");
var requirements = {
  minLength: 8,
  maxLength: 99,
  specialChars: process.env.NEXT_PUBLIC_PASSWORD_REQUIRE_SPECIAL_CHARS === "true",
  numbers: process.env.NEXT_PUBLIC_PASSWORD_REQUIRE_NUMBERS === "true",
  uppercase: process.env.NEXT_PUBLIC_PASSWORD_REQUIRE_UPPERCASE === "true"
};
var PasswordSchema = import_zod3.z.string().min(requirements.minLength).max(requirements.maxLength);
var RefinedPasswordSchema = PasswordSchema.superRefine(
  (val, ctx) => validatePassword(val, ctx)
);
function refineRepeatPassword(data, ctx) {
  if (data.password !== data.repeatPassword) {
    ctx.addIssue({
      message: "auth:errors.passwordsDoNotMatch",
      path: ["repeatPassword"],
      code: "custom"
    });
  }
  return true;
}
function validatePassword(password, ctx) {
  if (requirements.specialChars) {
    const specialCharsCount = password.match(/[!@#$%^&*(),.?":{}|<>]/g)?.length ?? 0;
    if (specialCharsCount < 1) {
      ctx.addIssue({
        message: "auth:errors.minPasswordSpecialChars",
        code: "custom"
      });
    }
  }
  if (requirements.numbers) {
    const numbersCount = password.match(/\d/g)?.length ?? 0;
    if (numbersCount < 1) {
      ctx.addIssue({
        message: "auth:errors.minPasswordNumbers",
        code: "custom"
      });
    }
  }
  if (requirements.uppercase) {
    if (!/[A-Z]/.test(password)) {
      ctx.addIssue({
        message: "auth:errors.uppercasePassword",
        code: "custom"
      });
    }
  }
  return true;
}

// src/schemas/password-reset.schema.ts
var PasswordResetSchema2 = import_zod4.z.object({
  password: RefinedPasswordSchema,
  repeatPassword: RefinedPasswordSchema
}).superRefine(refineRepeatPassword);

// src/components/update-password-form.tsx
function UpdatePasswordForm(params) {
  const updateUser = (0, import_use_update_user_mutation.useUpdateUser)();
  const form = (0, import_react_hook_form2.useForm)({
    resolver: (0, import_zod5.zodResolver)(PasswordResetSchema2),
    defaultValues: {
      password: "",
      repeatPassword: ""
    }
  });
  if (updateUser.error) {
    return /* @__PURE__ */ React.createElement(ErrorState, { onRetry: () => updateUser.reset() });
  }
  if (updateUser.data && !updateUser.isPending) {
    return /* @__PURE__ */ React.createElement(SuccessState, { redirectTo: params.redirectTo });
  }
  return /* @__PURE__ */ React.createElement("div", { className: "flex w-full flex-col space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-center" }, /* @__PURE__ */ React.createElement(import_heading.Heading, { level: 5, className: "tracking-tight" }, "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u30EA\u30BB\u30C3\u30C8")), /* @__PURE__ */ React.createElement(import_form2.Form, { ...form }, /* @__PURE__ */ React.createElement(
    "form",
    {
      className: "flex w-full flex-1 flex-col",
      onSubmit: form.handleSubmit(({ password }) => {
        return updateUser.mutateAsync({
          password,
          redirectTo: params.redirectTo
        });
      })
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex-col space-y-4" }, /* @__PURE__ */ React.createElement(
      import_form2.FormField,
      {
        name: "password",
        render: ({ field }) => /* @__PURE__ */ React.createElement(import_form2.FormItem, null, /* @__PURE__ */ React.createElement(import_form2.FormLabel, null, "\u30D1\u30B9\u30EF\u30FC\u30C9"), /* @__PURE__ */ React.createElement(import_form2.FormControl, null, /* @__PURE__ */ React.createElement(import_input2.Input, { required: true, type: "password", ...field })), /* @__PURE__ */ React.createElement(import_form2.FormMessage, null))
      }
    ), /* @__PURE__ */ React.createElement(
      import_form2.FormField,
      {
        name: "repeatPassword",
        render: ({ field }) => /* @__PURE__ */ React.createElement(import_form2.FormItem, null, /* @__PURE__ */ React.createElement(import_form2.FormLabel, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u306E\u78BA\u8A8D"), /* @__PURE__ */ React.createElement(import_form2.FormControl, null, /* @__PURE__ */ React.createElement(import_input2.Input, { required: true, type: "password", ...field })), /* @__PURE__ */ React.createElement(import_form2.FormMessage, null))
      }
    ), /* @__PURE__ */ React.createElement(
      import_button2.Button,
      {
        disabled: updateUser.isPending,
        type: "submit",
        className: "w-full"
      },
      "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u30EA\u30BB\u30C3\u30C8"
    ))
  )));
}
function SuccessState(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement(import_alert3.Alert, { variant: "success" }, /* @__PURE__ */ React.createElement(import_react_icons2.CheckIcon, { className: "s-6" }), /* @__PURE__ */ React.createElement(import_alert3.AlertTitle, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(import_alert3.AlertDescription, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\u6B63\u5E38\u306B\u66F4\u65B0\u3055\u308C\u307E\u3057\u305F")), /* @__PURE__ */ React.createElement(import_link.default, { href: props.redirectTo }, /* @__PURE__ */ React.createElement(import_button2.Button, { variant: "outline", className: "w-full" }, /* @__PURE__ */ React.createElement("span", null, "\u30DB\u30FC\u30E0\u30DA\u30FC\u30B8\u306B\u623B\u308B"), /* @__PURE__ */ React.createElement(import_lucide_react.ArrowRightIcon, { className: "ml-2 h-4" }))));
}
function ErrorState(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement(import_alert3.Alert, { variant: "destructive" }, /* @__PURE__ */ React.createElement(import_react_icons2.ExclamationTriangleIcon, { className: "s-6" }), /* @__PURE__ */ React.createElement(import_alert3.AlertTitle, null, "\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(import_alert3.AlertDescription, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u306E\u30EA\u30BB\u30C3\u30C8\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002")), /* @__PURE__ */ React.createElement(import_button2.Button, { onClick: props.onRetry, variant: "outline" }, "\u3084\u308A\u76F4\u3059"));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PasswordResetRequestContainer,
  UpdatePasswordForm
});
