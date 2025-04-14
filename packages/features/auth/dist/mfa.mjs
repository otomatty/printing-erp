// src/components/multi-factor-challenge-container.tsx
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useFetchAuthFactors } from "@kit/supabase/hooks/use-fetch-mfa-factors";
import { useSignOut } from "@kit/supabase/hooks/use-sign-out";
import { useSupabase } from "@kit/supabase/hooks/use-supabase";
import { Alert, AlertDescription, AlertTitle } from "@kit/ui/alert";
import { Button } from "@kit/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from "@kit/ui/form";
import { If } from "@kit/ui/if";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@kit/ui/input-otp";
import { Spinner } from "@kit/ui/spinner";
function MultiFactorChallengeContainer({
  paths,
  userId
}) {
  const verifyMFAChallenge = useVerifyMFAChallenge({
    onSuccess: () => {
      window.location.replace(paths.redirectPath);
    }
  });
  const verificationCodeForm = useForm({
    resolver: zodResolver(
      z.object({
        factorId: z.string().min(1),
        verificationCode: z.string().min(6).max(6)
      })
    ),
    defaultValues: {
      factorId: "",
      verificationCode: ""
    }
  });
  const factorId = useWatch({
    name: "factorId",
    control: verificationCodeForm.control
  });
  if (!factorId) {
    return /* @__PURE__ */ React.createElement(
      FactorsListContainer,
      {
        userId,
        onSelect: (factorId2) => {
          verificationCodeForm.setValue("factorId", factorId2);
        }
      }
    );
  }
  return /* @__PURE__ */ React.createElement(Form, { ...verificationCodeForm }, /* @__PURE__ */ React.createElement(
    "form",
    {
      className: "w-full",
      onSubmit: verificationCodeForm.handleSubmit(async (data) => {
        await verifyMFAChallenge.mutateAsync({
          factorId,
          verificationCode: data.verificationCode
        });
      })
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground text-sm" }, "\u8A8D\u8A3C\u30A2\u30D7\u30EA\u306B\u8868\u793A\u3055\u308C\u305F6\u6841\u306E\u30B3\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"), /* @__PURE__ */ React.createElement("div", { className: "flex w-full flex-col space-y-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement(If, { condition: verifyMFAChallenge.error }, /* @__PURE__ */ React.createElement(Alert, { variant: "destructive" }, /* @__PURE__ */ React.createElement(ExclamationTriangleIcon, { className: "h-5" }), /* @__PURE__ */ React.createElement(AlertTitle, null, "\u8A8D\u8A3C\u30B3\u30FC\u30C9\u304C\u7121\u52B9\u3067\u3059"), /* @__PURE__ */ React.createElement(AlertDescription, null, "\u5165\u529B\u3055\u308C\u305F\u30B3\u30FC\u30C9\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002"))), /* @__PURE__ */ React.createElement(
      FormField,
      {
        name: "verificationCode",
        render: ({ field }) => {
          return /* @__PURE__ */ React.createElement(
            FormItem,
            {
              className: "mx-auto flex flex-col items-center justify-center"
            },
            /* @__PURE__ */ React.createElement(FormControl, null, /* @__PURE__ */ React.createElement(InputOTP, { ...field, maxLength: 6, minLength: 6 }, /* @__PURE__ */ React.createElement(InputOTPGroup, null, /* @__PURE__ */ React.createElement(InputOTPSlot, { index: 0 }), /* @__PURE__ */ React.createElement(InputOTPSlot, { index: 1 }), /* @__PURE__ */ React.createElement(InputOTPSlot, { index: 2 })), /* @__PURE__ */ React.createElement(InputOTPSeparator, null), /* @__PURE__ */ React.createElement(InputOTPGroup, null, /* @__PURE__ */ React.createElement(InputOTPSlot, { index: 3 }), /* @__PURE__ */ React.createElement(InputOTPSlot, { index: 4 }), /* @__PURE__ */ React.createElement(InputOTPSlot, { index: 5 })))),
            /* @__PURE__ */ React.createElement(FormDescription, null, "\u8A8D\u8A3C\u30A2\u30D7\u30EA\u306B\u8868\u793A\u3055\u308C\u305F6\u6841\u306E\u30B3\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"),
            /* @__PURE__ */ React.createElement(FormMessage, null)
          );
        }
      }
    ))), /* @__PURE__ */ React.createElement(
      Button,
      {
        disabled: verifyMFAChallenge.isPending || !verificationCodeForm.formState.isValid
      },
      verifyMFAChallenge.isPending ? "\u8A8D\u8A3C\u4E2D..." : "\u8A8D\u8A3C\u30B3\u30FC\u30C9\u3092\u9001\u4FE1"
    ))
  ));
}
function useVerifyMFAChallenge({ onSuccess }) {
  const client = useSupabase();
  const mutationKey = ["mfa-verify-challenge"];
  const mutationFn = async (params) => {
    const { factorId, verificationCode: code } = params;
    const response = await client.auth.mfa.challengeAndVerify({
      factorId,
      code
    });
    if (response.error) {
      throw response.error;
    }
    return response.data;
  };
  return useMutation({ mutationKey, mutationFn, onSuccess });
}
function FactorsListContainer({
  onSelect,
  userId
}) {
  const signOut = useSignOut();
  const { data: factors, isLoading, error } = useFetchAuthFactors(userId);
  const isSuccess = factors && !isLoading && !error;
  useEffect(() => {
    if (error) {
      void signOut.mutateAsync();
    }
  }, [error, signOut]);
  useEffect(() => {
    if (isSuccess && factors.totp.length === 1) {
      const factorId = factors.totp[0]?.id;
      if (factorId) {
        onSelect(factorId);
      }
    }
  });
  if (isLoading) {
    return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center space-y-4 py-8" }, /* @__PURE__ */ React.createElement(Spinner, null), /* @__PURE__ */ React.createElement("div", null, "\u8A8D\u8A3C\u65B9\u6CD5\u3092\u8AAD\u307F\u8FBC\u307F\u4E2D..."));
  }
  if (error) {
    return /* @__PURE__ */ React.createElement("div", { className: "w-full" }, /* @__PURE__ */ React.createElement(Alert, { variant: "destructive" }, /* @__PURE__ */ React.createElement(ExclamationTriangleIcon, { className: "h-4" }), /* @__PURE__ */ React.createElement(AlertTitle, null, "\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u306E\u8A2D\u5B9A\u306B\u5931\u6557\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(AlertDescription, null, "\u8A2D\u5B9A\u306E\u8AAD\u307F\u8FBC\u307F\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002")));
  }
  const verifiedFactors = factors?.totp ?? [];
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, "\u4F7F\u7528\u3059\u308B\u8A8D\u8A3C\u65B9\u6CD5\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-2" }, verifiedFactors.map((factor) => /* @__PURE__ */ React.createElement("div", { key: factor.id }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      className: "w-full",
      onClick: () => onSelect(factor.id)
    },
    factor.friendly_name
  )))));
}
export {
  MultiFactorChallengeContainer
};
