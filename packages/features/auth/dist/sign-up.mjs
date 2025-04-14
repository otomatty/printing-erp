import {
  MagicLinkAuthContainer,
  OauthProviders,
  TermsAndConditionsFormField
} from "./chunk-FJ4DWQPR.mjs";
import {
  AuthErrorAlert,
  RefinedPasswordSchema,
  refineRepeatPassword
} from "./chunk-4D7ITPMJ.mjs";
import {
  useCaptchaToken
} from "./chunk-UM7NALZQ.mjs";

// src/components/sign-up-methods-container.tsx
import { isBrowser } from "@kit/shared/utils";
import { If as If3 } from "@kit/ui/if";
import { Separator } from "@kit/ui/separator";

// src/components/password-sign-up-container.tsx
import { useCallback, useRef, useState } from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useSignUpWithEmailAndPassword } from "@kit/supabase/hooks/use-sign-up-with-email-password";
import { Alert, AlertDescription, AlertTitle } from "@kit/ui/alert";
import { If as If2 } from "@kit/ui/if";

// src/components/password-sign-up-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@kit/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@kit/ui/form";
import { If } from "@kit/ui/if";
import { Input } from "@kit/ui/input";

// src/schemas/password-sign-up.schema.ts
import { z } from "zod";
var PasswordSignUpSchema = z.object({
  email: z.string().email(),
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
  const form = useForm({
    resolver: zodResolver(PasswordSignUpSchema),
    defaultValues: {
      email: defaultValues?.email ?? "",
      password: "",
      repeatPassword: ""
    }
  });
  return /* @__PURE__ */ React.createElement(Form, { ...form }, /* @__PURE__ */ React.createElement(
    "form",
    {
      className: "w-full space-y-2.5",
      onSubmit: form.handleSubmit(onSubmit)
    },
    /* @__PURE__ */ React.createElement(
      FormField,
      {
        control: form.control,
        name: "email",
        render: ({ field }) => /* @__PURE__ */ React.createElement(FormItem, null, /* @__PURE__ */ React.createElement(FormLabel, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9"), /* @__PURE__ */ React.createElement(FormControl, null, /* @__PURE__ */ React.createElement(
          Input,
          {
            "data-test": "email-input",
            required: true,
            type: "email",
            placeholder: "example@example.com",
            ...field
          }
        )), /* @__PURE__ */ React.createElement(FormMessage, null))
      }
    ),
    /* @__PURE__ */ React.createElement(
      FormField,
      {
        control: form.control,
        name: "password",
        render: ({ field }) => /* @__PURE__ */ React.createElement(FormItem, null, /* @__PURE__ */ React.createElement(FormLabel, null, "\u30D1\u30B9\u30EF\u30FC\u30C9"), /* @__PURE__ */ React.createElement(FormControl, null, /* @__PURE__ */ React.createElement(
          Input,
          {
            required: true,
            "data-test": "password-input",
            type: "password",
            placeholder: "",
            ...field
          }
        )), /* @__PURE__ */ React.createElement(FormMessage, null))
      }
    ),
    /* @__PURE__ */ React.createElement(
      FormField,
      {
        control: form.control,
        name: "repeatPassword",
        render: ({ field }) => /* @__PURE__ */ React.createElement(FormItem, null, /* @__PURE__ */ React.createElement(FormLabel, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u306E\u78BA\u8A8D"), /* @__PURE__ */ React.createElement(FormControl, null, /* @__PURE__ */ React.createElement(
          Input,
          {
            required: true,
            "data-test": "repeat-password-input",
            type: "password",
            placeholder: "",
            ...field
          }
        )), /* @__PURE__ */ React.createElement(FormMessage, null), /* @__PURE__ */ React.createElement(FormDescription, { className: "pb-2 text-xs" }, "\u78BA\u8A8D\u306E\u305F\u3081\u3001\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u3082\u3046\u4E00\u5EA6\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"))
      }
    ),
    /* @__PURE__ */ React.createElement(If, { condition: displayTermsCheckbox }, /* @__PURE__ */ React.createElement(TermsAndConditionsFormField, null)),
    /* @__PURE__ */ React.createElement(
      Button,
      {
        "data-test": "auth-submit-button",
        className: "w-full",
        type: "submit",
        disabled: loading
      },
      /* @__PURE__ */ React.createElement(
        If,
        {
          condition: loading,
          fallback: /* @__PURE__ */ React.createElement(React.Fragment, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3067\u65B0\u898F\u767B\u9332", /* @__PURE__ */ React.createElement(
            ArrowRight,
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
  const signUpMutation = useSignUpWithEmailAndPassword();
  const redirecting = useRef(false);
  const [showVerifyEmailAlert, setShowVerifyEmailAlert] = useState(false);
  const loading = signUpMutation.isPending || redirecting.current;
  const onSignupRequested = useCallback(
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
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(If2, { condition: showVerifyEmailAlert }, /* @__PURE__ */ React.createElement(SuccessAlert, null)), /* @__PURE__ */ React.createElement(If2, { condition: !showVerifyEmailAlert }, /* @__PURE__ */ React.createElement(AuthErrorAlert, { error: signUpMutation.error }), /* @__PURE__ */ React.createElement(
    PasswordSignUpForm,
    {
      onSubmit: onSignupRequested,
      loading,
      defaultValues,
      displayTermsCheckbox
    }
  )));
}
function SuccessAlert() {
  return /* @__PURE__ */ React.createElement(Alert, { variant: "success" }, /* @__PURE__ */ React.createElement(CheckCircledIcon, { className: "w-4" }), /* @__PURE__ */ React.createElement(AlertTitle, null, "\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(AlertDescription, { "data-test": "email-confirmation-alert" }, "\u30E1\u30FC\u30EB\u30DC\u30C3\u30AF\u30B9\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002\u78BA\u8A8D\u30E1\u30FC\u30EB\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u767B\u9332\u3092\u5B8C\u4E86\u3057\u3066\u304F\u3060\u3055\u3044\u3002"));
}

// src/components/sign-up-methods-container.tsx
function SignUpMethodsContainer(props) {
  const redirectUrl = getCallbackUrl(props);
  const defaultValues = getDefaultValues();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(If3, { condition: props.providers.password }, /* @__PURE__ */ React.createElement(
    EmailPasswordSignUpContainer,
    {
      emailRedirectTo: redirectUrl,
      defaultValues,
      displayTermsCheckbox: props.displayTermsCheckbox
    }
  )), /* @__PURE__ */ React.createElement(If3, { condition: props.providers.magicLink }, /* @__PURE__ */ React.createElement(
    MagicLinkAuthContainer,
    {
      redirectUrl,
      shouldCreateUser: true,
      defaultValues,
      displayTermsCheckbox: props.displayTermsCheckbox
    }
  )), /* @__PURE__ */ React.createElement(If3, { condition: props.providers.oAuth.length }, /* @__PURE__ */ React.createElement(Separator, null), /* @__PURE__ */ React.createElement(
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
  if (!isBrowser()) {
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
  if (!isBrowser()) {
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
export {
  PasswordSignUpSchema,
  SignUpMethodsContainer
};
