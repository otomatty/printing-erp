import {
  MagicLinkAuthContainer,
  OauthProviders
} from "./chunk-FJ4DWQPR.mjs";
import {
  AuthErrorAlert,
  PasswordSchema
} from "./chunk-4D7ITPMJ.mjs";
import {
  useCaptchaToken
} from "./chunk-UM7NALZQ.mjs";

// src/components/sign-in-methods-container.tsx
import { useRouter, useSearchParams } from "next/navigation";
import { isBrowser } from "@kit/shared/utils";
import { If as If2 } from "@kit/ui/if";
import { Separator } from "@kit/ui/separator";

// src/components/password-sign-in-container.tsx
import { useCallback } from "react";
import { useSignInWithEmailPassword } from "@kit/supabase/hooks/use-sign-in-with-email-password";

// src/components/password-sign-in-form.tsx
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@kit/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@kit/ui/form";
import { If } from "@kit/ui/if";
import { Input } from "@kit/ui/input";

// src/schemas/password-sign-in.schema.ts
import { z } from "zod";
var PasswordSignInSchema = z.object({
  email: z.string().email(),
  password: PasswordSchema
});

// src/components/password-sign-in-form.tsx
function PasswordSignInForm({
  onSubmit,
  loading
}) {
  const form = useForm({
    resolver: zodResolver(PasswordSignInSchema),
    defaultValues: {
      email: "",
      password: ""
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
        )), /* @__PURE__ */ React.createElement(FormMessage, null), /* @__PURE__ */ React.createElement(
          Button,
          {
            asChild: true,
            type: "button",
            size: "sm",
            variant: "link",
            className: "text-xs"
          },
          /* @__PURE__ */ React.createElement(Link, { href: "/auth/password-reset" }, "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u304A\u5FD8\u308C\u3067\u3059\u304B\uFF1F")
        ))
      }
    ),
    /* @__PURE__ */ React.createElement(
      Button,
      {
        "data-test": "auth-submit-button",
        className: "group w-full",
        type: "submit",
        disabled: loading
      },
      /* @__PURE__ */ React.createElement(
        If,
        {
          condition: loading,
          fallback: /* @__PURE__ */ React.createElement(React.Fragment, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3067\u30ED\u30B0\u30A4\u30F3", /* @__PURE__ */ React.createElement(
            ArrowRight,
            {
              className: "zoom-in animate-in slide-in-from-left-2 fill-mode-both h-4 delay-500 duration-500"
            }
          ))
        },
        "\u30ED\u30B0\u30A4\u30F3\u4E2D..."
      )
    )
  ));
}

// src/components/password-sign-in-container.tsx
function PasswordSignInContainer({
  onSignIn
}) {
  const { captchaToken, resetCaptchaToken } = useCaptchaToken();
  const signInMutation = useSignInWithEmailPassword();
  const isLoading = signInMutation.isPending;
  const onSubmit = useCallback(
    async (credentials) => {
      try {
        const data = await signInMutation.mutateAsync({
          ...credentials,
          options: { captchaToken }
        });
        if (onSignIn) {
          const userId = data?.user?.id;
          onSignIn(userId);
        }
      } catch {
      } finally {
        resetCaptchaToken();
      }
    },
    [captchaToken, onSignIn, resetCaptchaToken, signInMutation]
  );
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(AuthErrorAlert, { error: signInMutation.error }), /* @__PURE__ */ React.createElement(PasswordSignInForm, { onSubmit, loading: isLoading }));
}

// src/components/sign-in-methods-container.tsx
function SignInMethodsContainer(props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? props.paths.home;
  const redirectUrl = isBrowser() ? new URL(props.paths.callback, window.location.origin).toString() : "";
  const handlePasswordSignIn = () => {
    if (props.onSignInSuccess) {
      props.onSignInSuccess();
    } else {
      console.log(
        `No onSignInSuccess callback provided, redirecting to: ${nextPath}`
      );
      router.replace(nextPath);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(If2, { condition: props.providers.password }, /* @__PURE__ */ React.createElement(PasswordSignInContainer, { onSignIn: handlePasswordSignIn })), /* @__PURE__ */ React.createElement(If2, { condition: props.providers.magicLink }, /* @__PURE__ */ React.createElement(
    MagicLinkAuthContainer,
    {
      redirectUrl,
      shouldCreateUser: false
    }
  )), /* @__PURE__ */ React.createElement(If2, { condition: props.providers.oAuth.length }, /* @__PURE__ */ React.createElement(Separator, null), /* @__PURE__ */ React.createElement(
    OauthProviders,
    {
      enabledProviders: props.providers.oAuth,
      shouldCreateUser: false,
      paths: {
        callback: props.paths.callback,
        // OAuth認証後の最終的なリダイレクト先。現状は home 固定。
        // これもカスタマイズ可能にするかは要検討。
        returnPath: nextPath
      }
    }
  )));
}
export {
  PasswordSignInSchema,
  SignInMethodsContainer
};
