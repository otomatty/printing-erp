"use client";
import {
  useCaptchaToken
} from "../chunk-UM7NALZQ.mjs";

// src/components/resend-auth-link-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSupabase } from "@kit/supabase/hooks/use-supabase";
import { Alert, AlertDescription, AlertTitle } from "@kit/ui/alert";
import { Button } from "@kit/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@kit/ui/form";
import { Input } from "@kit/ui/input";
function ResendAuthLinkForm(props) {
  const resendLink = useResendLink();
  const form = useForm({
    resolver: zodResolver(z.object({ email: z.string().email() })),
    defaultValues: {
      email: ""
    }
  });
  if (resendLink.data && !resendLink.isPending) {
    return /* @__PURE__ */ React.createElement(Alert, { variant: "success" }, /* @__PURE__ */ React.createElement(AlertTitle, null, "\u30E1\u30FC\u30EB\u3092\u518D\u9001\u4FE1\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(AlertDescription, null, "\u30E1\u30FC\u30EB\u30DC\u30C3\u30AF\u30B9\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002"));
  }
  return /* @__PURE__ */ React.createElement(Form, { ...form }, /* @__PURE__ */ React.createElement(
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
      FormField,
      {
        render: ({ field }) => {
          return /* @__PURE__ */ React.createElement(FormItem, null, /* @__PURE__ */ React.createElement(FormLabel, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9"), /* @__PURE__ */ React.createElement(FormControl, null, /* @__PURE__ */ React.createElement(Input, { type: "email", required: true, ...field })));
        },
        name: "email"
      }
    ),
    /* @__PURE__ */ React.createElement(Button, { disabled: resendLink.isPending }, "\u8A8D\u8A3C\u30E1\u30FC\u30EB\u3092\u518D\u9001\u4FE1")
  ));
}
function useResendLink() {
  const supabase = useSupabase();
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
  return useMutation({
    mutationFn
  });
}
export {
  ResendAuthLinkForm
};
