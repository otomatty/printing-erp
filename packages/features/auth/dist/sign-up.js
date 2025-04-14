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

// src/sign-up.ts
var sign_up_exports = {};
__export(sign_up_exports, {
  PasswordSignUpSchema: () => PasswordSignUpSchema,
  SignUpMethodsContainer: () => SignUpMethodsContainer
});
module.exports = __toCommonJS(sign_up_exports);

// src/components/sign-up-methods-container.tsx
var import_utils2 = require("@kit/shared/utils");
var import_if5 = require("@kit/ui/if");
var import_separator = require("@kit/ui/separator");

// src/components/magic-link-auth-container.tsx
var import_zod = require("@hookform/resolvers/zod");
var import_react_icons = require("@radix-ui/react-icons");
var import_react_hook_form = require("react-hook-form");
var import_sonner = require("sonner");
var import_zod2 = require("zod");
var import_use_sign_in_with_otp = require("@kit/supabase/hooks/use-sign-in-with-otp");
var import_alert = require("@kit/ui/alert");
var import_button = require("@kit/ui/button");
var import_form2 = require("@kit/ui/form");
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

// src/components/terms-and-conditions-form-field.tsx
var import_link = __toESM(require("next/link"));
var import_checkbox = require("@kit/ui/checkbox");
var import_form = require("@kit/ui/form");
function TermsAndConditionsFormField(props = {}) {
  return /* @__PURE__ */ React.createElement(
    import_form.FormField,
    {
      name: props.name ?? "termsAccepted",
      render: ({ field }) => {
        return /* @__PURE__ */ React.createElement(import_form.FormItem, null, /* @__PURE__ */ React.createElement(import_form.FormControl, null, /* @__PURE__ */ React.createElement(
          "label",
          {
            htmlFor: field.name,
            className: "flex items-start space-x-2 py-2"
          },
          /* @__PURE__ */ React.createElement(import_checkbox.Checkbox, { required: true, name: field.name, id: field.name }),
          /* @__PURE__ */ React.createElement("div", { className: "text-xs" }, "\u4EE5\u4E0B\u306E", /* @__PURE__ */ React.createElement(
            import_link.default,
            {
              target: "_blank",
              className: "underline",
              href: "/terms-of-service"
            },
            "\u5229\u7528\u898F\u7D04"
          ), "\u3068", /* @__PURE__ */ React.createElement(
            import_link.default,
            {
              target: "_blank",
              className: "underline",
              href: "/privacy-policy"
            },
            "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC"
          ), "\u306B\u540C\u610F\u3057\u307E\u3059")
        )), /* @__PURE__ */ React.createElement(import_form.FormMessage, null));
      }
    }
  );
}

// src/components/magic-link-auth-container.tsx
function MagicLinkAuthContainer({
  redirectUrl,
  shouldCreateUser,
  defaultValues,
  displayTermsCheckbox
}) {
  const { captchaToken, resetCaptchaToken } = useCaptchaToken();
  const signInWithOtpMutation = (0, import_use_sign_in_with_otp.useSignInWithOtp)();
  const form = (0, import_react_hook_form.useForm)({
    resolver: (0, import_zod.zodResolver)(
      import_zod2.z.object({
        email: import_zod2.z.string().email()
      })
    ),
    defaultValues: {
      email: defaultValues?.email ?? ""
    }
  });
  const onSubmit = ({ email }) => {
    const url = new URL(redirectUrl);
    const emailRedirectTo = url.href;
    const promise = async () => {
      await signInWithOtpMutation.mutateAsync({
        email,
        options: {
          emailRedirectTo,
          captchaToken,
          shouldCreateUser
        }
      });
    };
    import_sonner.toast.promise(promise, {
      loading: "\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u4E2D...",
      success: "\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F\u3002\u30E1\u30FC\u30EB\u30DC\u30C3\u30AF\u30B9\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002",
      error: "\u30E1\u30FC\u30EB\u306E\u9001\u4FE1\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002"
    });
    resetCaptchaToken();
  };
  if (signInWithOtpMutation.data) {
    return /* @__PURE__ */ React.createElement(SuccessAlert, null);
  }
  return /* @__PURE__ */ React.createElement(import_form2.Form, { ...form }, /* @__PURE__ */ React.createElement("form", { className: "w-full", onSubmit: form.handleSubmit(onSubmit) }, /* @__PURE__ */ React.createElement(import_if.If, { condition: signInWithOtpMutation.error }, /* @__PURE__ */ React.createElement(ErrorAlert, null)), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement(
    import_form2.FormField,
    {
      render: ({ field }) => /* @__PURE__ */ React.createElement(import_form2.FormItem, null, /* @__PURE__ */ React.createElement(import_form2.FormLabel, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9"), /* @__PURE__ */ React.createElement(import_form2.FormControl, null, /* @__PURE__ */ React.createElement(
        import_input.Input,
        {
          "data-test": "email-input",
          required: true,
          type: "email",
          placeholder: "example@example.com",
          ...field
        }
      )), /* @__PURE__ */ React.createElement(import_form2.FormMessage, null)),
      name: "email"
    }
  ), /* @__PURE__ */ React.createElement(import_if.If, { condition: displayTermsCheckbox }, /* @__PURE__ */ React.createElement(TermsAndConditionsFormField, null)), /* @__PURE__ */ React.createElement(import_button.Button, { disabled: signInWithOtpMutation.isPending }, /* @__PURE__ */ React.createElement(
    import_if.If,
    {
      condition: signInWithOtpMutation.isPending,
      fallback: "\u30ED\u30B0\u30A4\u30F3\u30EA\u30F3\u30AF\u3092\u9001\u4FE1"
    },
    "\u9001\u4FE1\u4E2D..."
  )))));
}
function SuccessAlert() {
  return /* @__PURE__ */ React.createElement(import_alert.Alert, { variant: "success" }, /* @__PURE__ */ React.createElement(import_react_icons.CheckIcon, { className: "h-4" }), /* @__PURE__ */ React.createElement(import_alert.AlertTitle, null, "\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(import_alert.AlertDescription, null, "\u30E1\u30FC\u30EB\u30DC\u30C3\u30AF\u30B9\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002\u30ED\u30B0\u30A4\u30F3\u30EA\u30F3\u30AF\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u30ED\u30B0\u30A4\u30F3\u3092\u5B8C\u4E86\u3057\u3066\u304F\u3060\u3055\u3044\u3002"));
}
function ErrorAlert() {
  return /* @__PURE__ */ React.createElement(import_alert.Alert, { variant: "destructive" }, /* @__PURE__ */ React.createElement(import_react_icons.ExclamationTriangleIcon, { className: "h-4" }), /* @__PURE__ */ React.createElement(import_alert.AlertTitle, null, "\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(import_alert.AlertDescription, null, "\u30E1\u30FC\u30EB\u306E\u9001\u4FE1\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002"));
}

// src/components/oauth-providers.tsx
var import_react4 = require("react");

// ../../../node_modules/js-cookie/dist/js.cookie.mjs
function assign(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target;
}
var defaultConverter = {
  read: function(value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function init(converter, defaultAttributes) {
  function set(name, value, attributes) {
    if (typeof document === "undefined") {
      return;
    }
    attributes = assign({}, defaultAttributes, attributes);
    if (typeof attributes.expires === "number") {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }
    name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
    var stringifiedAttributes = "";
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }
      stringifiedAttributes += "; " + attributeName;
      if (attributes[attributeName] === true) {
        continue;
      }
      stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
    }
    return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
  }
  function get(name) {
    if (typeof document === "undefined" || arguments.length && !name) {
      return;
    }
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      var value = parts.slice(1).join("=");
      try {
        var found = decodeURIComponent(parts[0]);
        jar[found] = converter.read(value, found);
        if (name === found) {
          break;
        }
      } catch (e) {
      }
    }
    return name ? jar[name] : jar;
  }
  return Object.create(
    {
      set,
      get,
      remove: function(name, attributes) {
        set(
          name,
          "",
          assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function(attributes) {
        return init(this.converter, assign({}, this.attributes, attributes));
      },
      withConverter: function(converter2) {
        return init(assign({}, this.converter, converter2), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  );
}
var api = init(defaultConverter, { path: "/" });

// src/components/oauth-providers.tsx
var import_use_sign_in_with_provider = require("@kit/supabase/hooks/use-sign-in-with-provider");
var import_if2 = require("@kit/ui/if");
var import_loading_overlay = require("@kit/ui/loading-overlay");

// src/components/auth-error-alert.tsx
var import_react_icons2 = require("@radix-ui/react-icons");
var import_alert2 = require("@kit/ui/alert");
function AuthErrorAlert({
  error
}) {
  if (!error) {
    return null;
  }
  const DefaultError = "\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002";
  return /* @__PURE__ */ React.createElement(import_alert2.Alert, { variant: "destructive" }, /* @__PURE__ */ React.createElement(import_react_icons2.ExclamationTriangleIcon, { className: "w-4" }), /* @__PURE__ */ React.createElement(import_alert2.AlertTitle, null, "\u8A8D\u8A3C\u30A8\u30E9\u30FC"), /* @__PURE__ */ React.createElement(import_alert2.AlertDescription, { "data-test": "auth-error-message" }, DefaultError));
}

// src/components/auth-provider-button.tsx
var import_button2 = require("@kit/ui/button");

// src/components/oauth-provider-logo-image.tsx
var import_image = __toESM(require("next/image"));
var import_lucide_react = require("lucide-react");
var DEFAULT_IMAGE_SIZE = 18;
function OauthProviderLogoImage({
  providerId,
  width,
  height
}) {
  const image = getOAuthProviderLogos()[providerId];
  if (typeof image === "string") {
    return /* @__PURE__ */ React.createElement(
      import_image.default,
      {
        decoding: "async",
        loading: "lazy",
        src: image,
        alt: `${providerId} logo`,
        width: width ?? DEFAULT_IMAGE_SIZE,
        height: height ?? DEFAULT_IMAGE_SIZE
      }
    );
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, image);
}
function getOAuthProviderLogos() {
  return {
    password: /* @__PURE__ */ React.createElement(import_lucide_react.AtSign, { className: "s-[18px]" }),
    phone: /* @__PURE__ */ React.createElement(import_lucide_react.Phone, { className: "s-[18px]" }),
    google: "/images/oauth/google.webp",
    facebook: "/images/oauth/facebook.webp",
    twitter: "/images/oauth/twitter.webp",
    github: "/images/oauth/github.webp",
    microsoft: "/images/oauth/microsoft.webp",
    apple: "/images/oauth/apple.webp"
  };
}

// src/components/auth-provider-button.tsx
function AuthProviderButton({
  providerId,
  onClick,
  children
}) {
  return /* @__PURE__ */ React.createElement(
    import_button2.Button,
    {
      className: "flex w-full space-x-2 text-center",
      "data-provider": providerId,
      "data-test": "auth-provider-button",
      variant: "outline",
      onClick
    },
    /* @__PURE__ */ React.createElement(OauthProviderLogoImage, { providerId }),
    /* @__PURE__ */ React.createElement("span", null, children)
  );
}

// src/utils.ts
function clearSupabaseAuthCookies() {
  if (typeof document === "undefined") {
    return;
  }
  const cookiesStr = document.cookie;
  if (!cookiesStr) {
    console.log("[AUTH DEBUG] \u30AF\u30C3\u30AD\u30FC\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");
    return;
  }
  const cookies = cookiesStr.split(";");
  let clearedCount = 0;
  const authCookies = cookies.filter((cookie) => {
    const cookieParts = cookie.split("=");
    if (cookieParts.length < 1)
      return false;
    const cookieName = cookieParts[0]?.trim();
    return cookieName?.includes("sb-") || cookieName?.includes("supabase") || cookieName?.includes("code-verifier") || cookieName?.includes("oauth-state");
  });
  if (!authCookies || authCookies.length === 0) {
    console.log("[AUTH DEBUG] \u524A\u9664\u5BFE\u8C61\u306E\u8A8D\u8A3C\u30AF\u30C3\u30AD\u30FC\u306F\u3042\u308A\u307E\u305B\u3093");
    return;
  }
  const cookieNames = authCookies.map((c) => {
    const parts = c.split("=");
    return parts.length > 0 ? parts[0]?.trim() : "";
  }).filter(Boolean);
  console.log("[AUTH DEBUG] \u524A\u9664\u5BFE\u8C61\u306E\u8A8D\u8A3C\u30AF\u30C3\u30AD\u30FC:", cookieNames);
  for (const cookie of authCookies) {
    const cookieParts = cookie.split("=");
    if (cookieParts.length < 1)
      continue;
    const cookieName = cookieParts[0]?.trim();
    if (!cookieName)
      continue;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.saedgewell.test;`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.saedgewell.net;`;
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (hostname.includes(".")) {
        const parts = hostname.split(".");
        if (parts.length >= 2) {
          const autoDetectedDomain = `.${parts.slice(-2).join(".")}`;
          if (autoDetectedDomain !== ".saedgewell.test" && autoDetectedDomain !== ".saedgewell.net") {
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${autoDetectedDomain};`;
            console.log(
              `[AUTH DEBUG] \u30AF\u30C3\u30AD\u30FC ${cookieName} \u3092\u81EA\u52D5\u691C\u51FA\u3055\u308C\u305F\u30C9\u30E1\u30A4\u30F3 ${autoDetectedDomain} \u3067\u524A\u9664\u3057\u307E\u3057\u305F`
            );
          }
        }
      }
    }
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=localhost;`;
    clearedCount++;
  }
  console.log(`[AUTH DEBUG] ${clearedCount}\u500B\u306E\u8A8D\u8A3C\u30AF\u30C3\u30AD\u30FC\u3092\u30AF\u30EA\u30A2\u3057\u307E\u3057\u305F`);
}

// src/components/oauth-providers.tsx
var REDIRECT_TO_COOKIE = "sb-redirect-to";
var COOKIE_MAX_AGE_SECONDS = 60 * 5;
var OAUTH_SCOPES = {
  azure: "email",
  google: "email profile",
  github: "user:email"
  // add your OAuth providers here
};
function OauthProviders(props) {
  const signInWithProviderMutation = (0, import_use_sign_in_with_provider.useSignInWithProvider)();
  const loading = signInWithProviderMutation.isPending;
  const onSignInWithProvider = (0, import_react4.useCallback)(
    async (signInRequest) => {
      const credential = await signInRequest();
      if (!credential) {
        return Promise.reject(new Error("Failed to sign in with provider"));
      }
    },
    []
  );
  const enabledProviders = props.enabledProviders;
  if (!enabledProviders?.length) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_if2.If, { condition: loading }, /* @__PURE__ */ React.createElement(import_loading_overlay.LoadingOverlay, null)), /* @__PURE__ */ React.createElement("div", { className: "flex w-full flex-1 flex-col space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex-col space-y-2" }, enabledProviders.map((provider) => {
    return /* @__PURE__ */ React.createElement(
      AuthProviderButton,
      {
        key: provider,
        providerId: provider,
        onClick: () => {
          console.log("[AUTH DEBUG] Google OAuth onClick triggered!");
          clearSupabaseAuthCookies();
          const origin = window.location.origin;
          const redirectTo = `${origin}${props.paths.callback}`;
          const scopes = OAUTH_SCOPES[provider];
          const scopesOpts = scopes ? { scopes } : {};
          console.log(
            "[AUTH DEBUG] Before checking returnPath type:",
            typeof props.paths.returnPath,
            "value:",
            props.paths.returnPath
          );
          if (typeof props.paths.returnPath === "string" && props.paths.returnPath) {
            console.log(
              `[AUTH DEBUG] Setting ${REDIRECT_TO_COOKIE} cookie. Value:`,
              props.paths.returnPath,
              "Type:",
              typeof props.paths.returnPath
            );
            try {
              let domain = void 0;
              const hostname = window.location.hostname;
              if (hostname.includes("saedgewell.test")) {
                domain = ".saedgewell.test";
              } else if (hostname.includes("saedgewell.net")) {
                domain = ".saedgewell.net";
              }
              console.log(
                `[AUTH DEBUG] Setting cookie with domain: ${domain || "undefined"}`
              );
              api.set(REDIRECT_TO_COOKIE, props.paths.returnPath, {
                path: "/",
                maxAge: COOKIE_MAX_AGE_SECONDS,
                sameSite: "none",
                secure: true,
                ...domain ? { domain } : {}
              });
              console.log(
                `[AUTH DEBUG] Successfully set ${REDIRECT_TO_COOKIE} cookie.`
              );
            } catch (error) {
              console.error(
                `[AUTH DEBUG] Failed to set cookie: ${error}`,
                error
              );
            }
          } else {
            console.warn(
              `[AUTH DEBUG] Invalid or missing returnPath ('${props.paths.returnPath}'). Cannot set redirect cookie.`
            );
            try {
              let domain = void 0;
              const hostname = window.location.hostname;
              if (hostname.includes("saedgewell.test")) {
                domain = ".saedgewell.test";
              } else if (hostname.includes("saedgewell.net")) {
                domain = ".saedgewell.net";
              }
              console.log(
                `[AUTH DEBUG] Setting fallback cookie with domain: ${domain || "undefined"}`
              );
              api.set(REDIRECT_TO_COOKIE, "/", {
                path: "/",
                maxAge: COOKIE_MAX_AGE_SECONDS,
                sameSite: "none",
                secure: true,
                ...domain ? { domain } : {}
              });
              console.log(
                `[AUTH DEBUG] Set default fallback cookie value '/' for ${REDIRECT_TO_COOKIE}`
              );
            } catch (fallbackError) {
              console.error(
                `[AUTH DEBUG] Failed to set fallback cookie: ${fallbackError}`,
                fallbackError
              );
            }
          }
          console.log("[AUTH DEBUG] OAuth Provider Info:", {
            provider,
            redirectTo,
            origin,
            shouldCreateUser: props.shouldCreateUser,
            scopesOpts,
            callbackUrl: props.paths.callback,
            returnPathFromProps: props.paths.returnPath,
            cookieValueToSet: props.paths.returnPath
          });
          const credentials = {
            provider,
            options: {
              shouldCreateUser: props.shouldCreateUser,
              redirectTo,
              ...scopesOpts
            }
          };
          return onSignInWithProvider(() => {
            console.log(
              "[AUTH DEBUG] Sending Auth Request:",
              JSON.stringify(credentials, null, 2)
            );
            return signInWithProviderMutation.mutateAsync(credentials);
          });
        }
      },
      getProviderName(provider),
      "\u3067\u30ED\u30B0\u30A4\u30F3"
    );
  })), /* @__PURE__ */ React.createElement(AuthErrorAlert, { error: signInWithProviderMutation.error })));
}
function getProviderName(providerId) {
  const capitalize = (value) => value.slice(0, 1).toUpperCase() + value.slice(1);
  if (providerId.endsWith(".com")) {
    const [providerName = providerId] = providerId.split(".com");
    return capitalize(providerName);
  }
  return capitalize(providerId);
}

// src/components/password-sign-up-container.tsx
var import_react5 = require("react");
var import_react_icons3 = require("@radix-ui/react-icons");
var import_use_sign_up_with_email_password = require("@kit/supabase/hooks/use-sign-up-with-email-password");
var import_alert3 = require("@kit/ui/alert");
var import_if4 = require("@kit/ui/if");

// src/components/password-sign-up-form.tsx
var import_zod5 = require("@hookform/resolvers/zod");
var import_lucide_react2 = require("lucide-react");
var import_react_hook_form2 = require("react-hook-form");
var import_button3 = require("@kit/ui/button");
var import_form3 = require("@kit/ui/form");
var import_if3 = require("@kit/ui/if");
var import_input2 = require("@kit/ui/input");

// src/schemas/password-sign-up.schema.ts
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

// src/schemas/password-sign-up.schema.ts
var PasswordSignUpSchema = import_zod4.z.object({
  email: import_zod4.z.string().email(),
  password: RefinedPasswordSchema,
  repeatPassword: RefinedPasswordSchema
}).superRefine(refineRepeatPassword);

// src/components/password-sign-up-form.tsx
function PasswordSignUpForm({
  defaultValues,
  displayTermsCheckbox,
  onSubmit,
  loading
}) {
  const form = (0, import_react_hook_form2.useForm)({
    resolver: (0, import_zod5.zodResolver)(PasswordSignUpSchema),
    defaultValues: {
      email: defaultValues?.email ?? "",
      password: "",
      repeatPassword: ""
    }
  });
  return /* @__PURE__ */ React.createElement(import_form3.Form, { ...form }, /* @__PURE__ */ React.createElement(
    "form",
    {
      className: "w-full space-y-2.5",
      onSubmit: form.handleSubmit(onSubmit)
    },
    /* @__PURE__ */ React.createElement(
      import_form3.FormField,
      {
        control: form.control,
        name: "email",
        render: ({ field }) => /* @__PURE__ */ React.createElement(import_form3.FormItem, null, /* @__PURE__ */ React.createElement(import_form3.FormLabel, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9"), /* @__PURE__ */ React.createElement(import_form3.FormControl, null, /* @__PURE__ */ React.createElement(
          import_input2.Input,
          {
            "data-test": "email-input",
            required: true,
            type: "email",
            placeholder: "example@example.com",
            ...field
          }
        )), /* @__PURE__ */ React.createElement(import_form3.FormMessage, null))
      }
    ),
    /* @__PURE__ */ React.createElement(
      import_form3.FormField,
      {
        control: form.control,
        name: "password",
        render: ({ field }) => /* @__PURE__ */ React.createElement(import_form3.FormItem, null, /* @__PURE__ */ React.createElement(import_form3.FormLabel, null, "\u30D1\u30B9\u30EF\u30FC\u30C9"), /* @__PURE__ */ React.createElement(import_form3.FormControl, null, /* @__PURE__ */ React.createElement(
          import_input2.Input,
          {
            required: true,
            "data-test": "password-input",
            type: "password",
            placeholder: "",
            ...field
          }
        )), /* @__PURE__ */ React.createElement(import_form3.FormMessage, null))
      }
    ),
    /* @__PURE__ */ React.createElement(
      import_form3.FormField,
      {
        control: form.control,
        name: "repeatPassword",
        render: ({ field }) => /* @__PURE__ */ React.createElement(import_form3.FormItem, null, /* @__PURE__ */ React.createElement(import_form3.FormLabel, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u306E\u78BA\u8A8D"), /* @__PURE__ */ React.createElement(import_form3.FormControl, null, /* @__PURE__ */ React.createElement(
          import_input2.Input,
          {
            required: true,
            "data-test": "repeat-password-input",
            type: "password",
            placeholder: "",
            ...field
          }
        )), /* @__PURE__ */ React.createElement(import_form3.FormMessage, null), /* @__PURE__ */ React.createElement(import_form3.FormDescription, { className: "pb-2 text-xs" }, "\u78BA\u8A8D\u306E\u305F\u3081\u3001\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u3082\u3046\u4E00\u5EA6\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"))
      }
    ),
    /* @__PURE__ */ React.createElement(import_if3.If, { condition: displayTermsCheckbox }, /* @__PURE__ */ React.createElement(TermsAndConditionsFormField, null)),
    /* @__PURE__ */ React.createElement(
      import_button3.Button,
      {
        "data-test": "auth-submit-button",
        className: "w-full",
        type: "submit",
        disabled: loading
      },
      /* @__PURE__ */ React.createElement(
        import_if3.If,
        {
          condition: loading,
          fallback: /* @__PURE__ */ React.createElement(React.Fragment, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3067\u65B0\u898F\u767B\u9332", /* @__PURE__ */ React.createElement(
            import_lucide_react2.ArrowRight,
            {
              className: "zoom-in animate-in slide-in-from-left-2 fill-mode-both h-4 delay-500 duration-500"
            }
          ))
        },
        "\u767B\u9332\u4E2D..."
      )
    )
  ));
}

// src/components/password-sign-up-container.tsx
function EmailPasswordSignUpContainer({
  defaultValues,
  onSignUp,
  emailRedirectTo,
  displayTermsCheckbox
}) {
  const { captchaToken, resetCaptchaToken } = useCaptchaToken();
  const signUpMutation = (0, import_use_sign_up_with_email_password.useSignUpWithEmailAndPassword)();
  const redirecting = (0, import_react5.useRef)(false);
  const [showVerifyEmailAlert, setShowVerifyEmailAlert] = (0, import_react5.useState)(false);
  const loading = signUpMutation.isPending || redirecting.current;
  const onSignupRequested = (0, import_react5.useCallback)(
    async (credentials) => {
      if (loading) {
        return;
      }
      try {
        const data = await signUpMutation.mutateAsync({
          ...credentials,
          emailRedirectTo,
          captchaToken
        });
        setShowVerifyEmailAlert(true);
        if (onSignUp) {
          onSignUp(data.user?.id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        resetCaptchaToken();
      }
    },
    [
      captchaToken,
      emailRedirectTo,
      loading,
      onSignUp,
      resetCaptchaToken,
      signUpMutation
    ]
  );
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_if4.If, { condition: showVerifyEmailAlert }, /* @__PURE__ */ React.createElement(SuccessAlert2, null)), /* @__PURE__ */ React.createElement(import_if4.If, { condition: !showVerifyEmailAlert }, /* @__PURE__ */ React.createElement(AuthErrorAlert, { error: signUpMutation.error }), /* @__PURE__ */ React.createElement(
    PasswordSignUpForm,
    {
      onSubmit: onSignupRequested,
      loading,
      defaultValues,
      displayTermsCheckbox
    }
  )));
}
function SuccessAlert2() {
  return /* @__PURE__ */ React.createElement(import_alert3.Alert, { variant: "success" }, /* @__PURE__ */ React.createElement(import_react_icons3.CheckCircledIcon, { className: "w-4" }), /* @__PURE__ */ React.createElement(import_alert3.AlertTitle, null, "\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(import_alert3.AlertDescription, { "data-test": "email-confirmation-alert" }, "\u30E1\u30FC\u30EB\u30DC\u30C3\u30AF\u30B9\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002\u78BA\u8A8D\u30E1\u30FC\u30EB\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u767B\u9332\u3092\u5B8C\u4E86\u3057\u3066\u304F\u3060\u3055\u3044\u3002"));
}

// src/components/sign-up-methods-container.tsx
function SignUpMethodsContainer(props) {
  const redirectUrl = getCallbackUrl(props);
  const defaultValues = getDefaultValues();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_if5.If, { condition: props.providers.password }, /* @__PURE__ */ React.createElement(
    EmailPasswordSignUpContainer,
    {
      emailRedirectTo: redirectUrl,
      defaultValues,
      displayTermsCheckbox: props.displayTermsCheckbox
    }
  )), /* @__PURE__ */ React.createElement(import_if5.If, { condition: props.providers.magicLink }, /* @__PURE__ */ React.createElement(
    MagicLinkAuthContainer,
    {
      redirectUrl,
      shouldCreateUser: true,
      defaultValues,
      displayTermsCheckbox: props.displayTermsCheckbox
    }
  )), /* @__PURE__ */ React.createElement(import_if5.If, { condition: props.providers.oAuth.length }, /* @__PURE__ */ React.createElement(import_separator.Separator, null), /* @__PURE__ */ React.createElement(
    OauthProviders,
    {
      enabledProviders: props.providers.oAuth,
      shouldCreateUser: true,
      paths: {
        callback: props.paths.callback,
        returnPath: props.paths.appHome
      }
    }
  )));
}
function getCallbackUrl(props) {
  if (!(0, import_utils2.isBrowser)()) {
    return "";
  }
  const redirectPath = props.paths.callback;
  const origin = window.location.origin;
  const url = new URL(redirectPath, origin);
  if (props.inviteToken) {
    url.searchParams.set("invite_token", props.inviteToken);
  }
  const searchParams = new URLSearchParams(window.location.search);
  const next = searchParams.get("next");
  if (next) {
    url.searchParams.set("next", next);
  }
  return url.href;
}
function getDefaultValues() {
  if (!(0, import_utils2.isBrowser)()) {
    return { email: "" };
  }
  const searchParams = new URLSearchParams(window.location.search);
  const inviteToken = searchParams.get("invite_token");
  if (!inviteToken) {
    return { email: "" };
  }
  return {
    email: searchParams.get("email") ?? ""
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PasswordSignUpSchema,
  SignUpMethodsContainer
});
/*! Bundled license information:

js-cookie/dist/js.cookie.mjs:
  (*! js-cookie v3.0.5 | MIT *)
*/
