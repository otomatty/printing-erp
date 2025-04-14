import {
  AuthErrorAlert
} from "./chunk-4D7ITPMJ.mjs";
import {
  useCaptchaToken
} from "./chunk-UM7NALZQ.mjs";

// src/components/magic-link-auth-container.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useSignInWithOtp } from "@kit/supabase/hooks/use-sign-in-with-otp";
import { Alert, AlertDescription, AlertTitle } from "@kit/ui/alert";
import { Button } from "@kit/ui/button";
import {
  Form,
  FormControl as FormControl2,
  FormField as FormField2,
  FormItem as FormItem2,
  FormLabel,
  FormMessage as FormMessage2
} from "@kit/ui/form";
import { If } from "@kit/ui/if";
import { Input } from "@kit/ui/input";

// src/components/terms-and-conditions-form-field.tsx
import Link from "next/link";
import { Checkbox } from "@kit/ui/checkbox";
import { FormControl, FormField, FormItem, FormMessage } from "@kit/ui/form";
function TermsAndConditionsFormField(props = {}) {
  return /* @__PURE__ */ React.createElement(
    FormField,
    {
      name: props.name ?? "termsAccepted",
      render: ({ field }) => {
        return /* @__PURE__ */ React.createElement(FormItem, null, /* @__PURE__ */ React.createElement(FormControl, null, /* @__PURE__ */ React.createElement(
          "label",
          {
            htmlFor: field.name,
            className: "flex items-start space-x-2 py-2"
          },
          /* @__PURE__ */ React.createElement(Checkbox, { required: true, name: field.name, id: field.name }),
          /* @__PURE__ */ React.createElement("div", { className: "text-xs" }, "\u4EE5\u4E0B\u306E", /* @__PURE__ */ React.createElement(
            Link,
            {
              target: "_blank",
              className: "underline",
              href: "/terms-of-service"
            },
            "\u5229\u7528\u898F\u7D04"
          ), "\u3068", /* @__PURE__ */ React.createElement(
            Link,
            {
              target: "_blank",
              className: "underline",
              href: "/privacy-policy"
            },
            "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC"
          ), "\u306B\u540C\u610F\u3057\u307E\u3059")
        )), /* @__PURE__ */ React.createElement(FormMessage, null));
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
  const signInWithOtpMutation = useSignInWithOtp();
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email()
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
    toast.promise(promise, {
      loading: "\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u4E2D...",
      success: "\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F\u3002\u30E1\u30FC\u30EB\u30DC\u30C3\u30AF\u30B9\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002",
      error: "\u30E1\u30FC\u30EB\u306E\u9001\u4FE1\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002"
    });
    resetCaptchaToken();
  };
  if (signInWithOtpMutation.data) {
    return /* @__PURE__ */ React.createElement(SuccessAlert, null);
  }
  return /* @__PURE__ */ React.createElement(Form, { ...form }, /* @__PURE__ */ React.createElement("form", { className: "w-full", onSubmit: form.handleSubmit(onSubmit) }, /* @__PURE__ */ React.createElement(If, { condition: signInWithOtpMutation.error }, /* @__PURE__ */ React.createElement(ErrorAlert, null)), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement(
    FormField2,
    {
      render: ({ field }) => /* @__PURE__ */ React.createElement(FormItem2, null, /* @__PURE__ */ React.createElement(FormLabel, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9"), /* @__PURE__ */ React.createElement(FormControl2, null, /* @__PURE__ */ React.createElement(
        Input,
        {
          "data-test": "email-input",
          required: true,
          type: "email",
          placeholder: "example@example.com",
          ...field
        }
      )), /* @__PURE__ */ React.createElement(FormMessage2, null)),
      name: "email"
    }
  ), /* @__PURE__ */ React.createElement(If, { condition: displayTermsCheckbox }, /* @__PURE__ */ React.createElement(TermsAndConditionsFormField, null)), /* @__PURE__ */ React.createElement(Button, { disabled: signInWithOtpMutation.isPending }, /* @__PURE__ */ React.createElement(
    If,
    {
      condition: signInWithOtpMutation.isPending,
      fallback: "\u30ED\u30B0\u30A4\u30F3\u30EA\u30F3\u30AF\u3092\u9001\u4FE1"
    },
    "\u9001\u4FE1\u4E2D..."
  )))));
}
function SuccessAlert() {
  return /* @__PURE__ */ React.createElement(Alert, { variant: "success" }, /* @__PURE__ */ React.createElement(CheckIcon, { className: "h-4" }), /* @__PURE__ */ React.createElement(AlertTitle, null, "\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(AlertDescription, null, "\u30E1\u30FC\u30EB\u30DC\u30C3\u30AF\u30B9\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002\u30ED\u30B0\u30A4\u30F3\u30EA\u30F3\u30AF\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u30ED\u30B0\u30A4\u30F3\u3092\u5B8C\u4E86\u3057\u3066\u304F\u3060\u3055\u3044\u3002"));
}
function ErrorAlert() {
  return /* @__PURE__ */ React.createElement(Alert, { variant: "destructive" }, /* @__PURE__ */ React.createElement(ExclamationTriangleIcon, { className: "h-4" }), /* @__PURE__ */ React.createElement(AlertTitle, null, "\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(AlertDescription, null, "\u30E1\u30FC\u30EB\u306E\u9001\u4FE1\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002"));
}

// src/components/oauth-providers.tsx
import { useCallback } from "react";

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
import { useSignInWithProvider } from "@kit/supabase/hooks/use-sign-in-with-provider";
import { If as If2 } from "@kit/ui/if";
import { LoadingOverlay } from "@kit/ui/loading-overlay";

// src/components/auth-provider-button.tsx
import { Button as Button2 } from "@kit/ui/button";

// src/components/oauth-provider-logo-image.tsx
import Image from "next/image";
import { AtSign, Phone } from "lucide-react";
var DEFAULT_IMAGE_SIZE = 18;
function OauthProviderLogoImage({
  providerId,
  width,
  height
}) {
  const image = getOAuthProviderLogos()[providerId];
  if (typeof image === "string") {
    return /* @__PURE__ */ React.createElement(
      Image,
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
    password: /* @__PURE__ */ React.createElement(AtSign, { className: "s-[18px]" }),
    phone: /* @__PURE__ */ React.createElement(Phone, { className: "s-[18px]" }),
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
    Button2,
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
  const signInWithProviderMutation = useSignInWithProvider();
  const loading = signInWithProviderMutation.isPending;
  const onSignInWithProvider = useCallback(
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
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(If2, { condition: loading }, /* @__PURE__ */ React.createElement(LoadingOverlay, null)), /* @__PURE__ */ React.createElement("div", { className: "flex w-full flex-1 flex-col space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex-col space-y-2" }, enabledProviders.map((provider) => {
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

export {
  TermsAndConditionsFormField,
  MagicLinkAuthContainer,
  OauthProviders
};
/*! Bundled license information:

js-cookie/dist/js.cookie.mjs:
  (*! js-cookie v3.0.5 | MIT *)
*/
