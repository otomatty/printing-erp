import {
  AuthErrorAlert,
  RefinedPasswordSchema,
  refineRepeatPassword
} from "./chunk-4D7ITPMJ.mjs";
import {
  useCaptchaToken
} from "./chunk-UM7NALZQ.mjs";

// src/components/password-reset-request-container.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRequestResetPassword } from "@kit/supabase/hooks/use-request-reset-password";
import { Alert, AlertDescription } from "@kit/ui/alert";
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
var PasswordResetSchema = z.object({
  email: z.string().email()
});
function PasswordResetRequestContainer(params) {
  const resetPasswordMutation = useRequestResetPassword();
  const { captchaToken, resetCaptchaToken } = useCaptchaToken();
  const error = resetPasswordMutation.error;
  const success = resetPasswordMutation.data;
  const form = useForm({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      email: ""
    }
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(If, { condition: success }, /* @__PURE__ */ React.createElement(Alert, { variant: "success" }, /* @__PURE__ */ React.createElement(AlertDescription, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u30EA\u30BB\u30C3\u30C8\u306E\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F\u3002\u30E1\u30FC\u30EB\u30DC\u30C3\u30AF\u30B9\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002"))), /* @__PURE__ */ React.createElement(If, { condition: !resetPasswordMutation.data }, /* @__PURE__ */ React.createElement(Form, { ...form }, /* @__PURE__ */ React.createElement(
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
      FormField,
      {
        name: "email",
        render: ({ field }) => /* @__PURE__ */ React.createElement(FormItem, null, /* @__PURE__ */ React.createElement(FormLabel, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9"), /* @__PURE__ */ React.createElement(FormControl, null, /* @__PURE__ */ React.createElement(
          Input,
          {
            required: true,
            type: "email",
            placeholder: "example@example.com",
            ...field
          }
        )), /* @__PURE__ */ React.createElement(FormMessage, null))
      }
    ), /* @__PURE__ */ React.createElement(Button, { disabled: resetPasswordMutation.isPending, type: "submit" }, "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u30EA\u30BB\u30C3\u30C8"))
  ))));
}

// src/components/update-password-form.tsx
import Link from "next/link";
import { zodResolver as zodResolver2 } from "@hookform/resolvers/zod";
import { CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { ArrowRightIcon } from "lucide-react";
import { useForm as useForm2 } from "react-hook-form";
import { useUpdateUser } from "@kit/supabase/hooks/use-update-user-mutation";
import { Alert as Alert2, AlertDescription as AlertDescription2, AlertTitle } from "@kit/ui/alert";
import { Button as Button2 } from "@kit/ui/button";
import {
  Form as Form2,
  FormControl as FormControl2,
  FormField as FormField2,
  FormItem as FormItem2,
  FormLabel as FormLabel2,
  FormMessage as FormMessage2
} from "@kit/ui/form";
import { Heading } from "@kit/ui/heading";
import { Input as Input2 } from "@kit/ui/input";

// src/schemas/password-reset.schema.ts
import { z as z2 } from "zod";
var PasswordResetSchema2 = z2.object({
  password: RefinedPasswordSchema,
  repeatPassword: RefinedPasswordSchema
}).superRefine(refineRepeatPassword);

// src/components/update-password-form.tsx
function UpdatePasswordForm(params) {
  const updateUser = useUpdateUser();
  const form = useForm2({
    resolver: zodResolver2(PasswordResetSchema2),
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
  return /* @__PURE__ */ React.createElement("div", { className: "flex w-full flex-col space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-center" }, /* @__PURE__ */ React.createElement(Heading, { level: 5, className: "tracking-tight" }, "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u30EA\u30BB\u30C3\u30C8")), /* @__PURE__ */ React.createElement(Form2, { ...form }, /* @__PURE__ */ React.createElement(
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
      FormField2,
      {
        name: "password",
        render: ({ field }) => /* @__PURE__ */ React.createElement(FormItem2, null, /* @__PURE__ */ React.createElement(FormLabel2, null, "\u30D1\u30B9\u30EF\u30FC\u30C9"), /* @__PURE__ */ React.createElement(FormControl2, null, /* @__PURE__ */ React.createElement(Input2, { required: true, type: "password", ...field })), /* @__PURE__ */ React.createElement(FormMessage2, null))
      }
    ), /* @__PURE__ */ React.createElement(
      FormField2,
      {
        name: "repeatPassword",
        render: ({ field }) => /* @__PURE__ */ React.createElement(FormItem2, null, /* @__PURE__ */ React.createElement(FormLabel2, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u306E\u78BA\u8A8D"), /* @__PURE__ */ React.createElement(FormControl2, null, /* @__PURE__ */ React.createElement(Input2, { required: true, type: "password", ...field })), /* @__PURE__ */ React.createElement(FormMessage2, null))
      }
    ), /* @__PURE__ */ React.createElement(
      Button2,
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
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement(Alert2, { variant: "success" }, /* @__PURE__ */ React.createElement(CheckIcon, { className: "s-6" }), /* @__PURE__ */ React.createElement(AlertTitle, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(AlertDescription2, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\u6B63\u5E38\u306B\u66F4\u65B0\u3055\u308C\u307E\u3057\u305F")), /* @__PURE__ */ React.createElement(Link, { href: props.redirectTo }, /* @__PURE__ */ React.createElement(Button2, { variant: "outline", className: "w-full" }, /* @__PURE__ */ React.createElement("span", null, "\u30DB\u30FC\u30E0\u30DA\u30FC\u30B8\u306B\u623B\u308B"), /* @__PURE__ */ React.createElement(ArrowRightIcon, { className: "ml-2 h-4" }))));
}
function ErrorState(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement(Alert2, { variant: "destructive" }, /* @__PURE__ */ React.createElement(ExclamationTriangleIcon, { className: "s-6" }), /* @__PURE__ */ React.createElement(AlertTitle, null, "\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(AlertDescription2, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u306E\u30EA\u30BB\u30C3\u30C8\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002")), /* @__PURE__ */ React.createElement(Button2, { onClick: props.onRetry, variant: "outline" }, "\u3084\u308A\u76F4\u3059"));
}
export {
  PasswordResetRequestContainer,
  UpdatePasswordForm
};
