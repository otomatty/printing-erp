import {
  usePersonalAccountData,
  useRevalidatePersonalAccountDataQuery
} from "./chunk-AEEKUM22.mjs";

// src/components/account-settings-container.tsx
import { useTranslation as useTranslation5 } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@kit/ui/card";
import { If as If5 } from "@kit/ui/if";
import { LanguageSelector } from "@kit/ui/language-selector";
import { LoadingOverlay as LoadingOverlay3 } from "@kit/ui/loading-overlay";

// src/components/account-danger-zone.tsx
import { useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@kit/ui/alert-dialog";
import { Button } from "@kit/ui/button";
import { Form, FormControl, FormItem, FormLabel } from "@kit/ui/form";
import { Input } from "@kit/ui/input";

// src/schema/delete-personal-account.schema.ts
import { z } from "zod";
var DeletePersonalAccountSchema = z.object({
  confirmation: z.string().refine((value) => value === "DELETE")
});

// src/server/server-actions.ts
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { enhanceAction } from "@kit/next/actions";
import { getLogger as getLogger2 } from "@kit/shared/logger";
import { getSupabaseServerAdminClient } from "@kit/supabase/server-admin-client";
import { getSupabaseServerClient } from "@kit/supabase/server-client";

// ../../../node_modules/server-only/index.js
throw new Error(
  "This module cannot be imported from a Client Component module. It should only be used from a Server Component."
);

// src/server/services/delete-personal-account.service.ts
import { getLogger } from "@kit/shared/logger";
function createDeletePersonalAccountService() {
  return new DeletePersonalAccountService();
}
var DeletePersonalAccountService = class {
  constructor() {
    this.namespace = "accounts.delete";
  }
  /**
   * @name deletePersonalAccount
   * Delete personal account of a user.
   * This will delete the user from the authentication provider and cancel all subscriptions.
   *
   * Permissions are not checked here, as they are checked in the server action.
   * USE WITH CAUTION. THE USER MUST HAVE THE NECESSARY PERMISSIONS.
   */
  async deletePersonalAccount(params) {
    const logger = await getLogger();
    const userId = params.userId;
    const ctx = { userId, name: this.namespace };
    logger.info(
      ctx,
      "User requested to delete their personal account. Processing..."
    );
    try {
      await params.adminClient.auth.admin.deleteUser(userId);
    } catch (error) {
      logger.error(
        {
          ...ctx,
          error
        },
        "Encountered an error deleting user"
      );
      throw new Error("Error deleting user");
    }
    logger.info(ctx, "User successfully deleted!");
  }
};

// src/server/server-actions.ts
var enableAccountDeletion = process.env.NEXT_PUBLIC_ENABLE_PERSONAL_ACCOUNT_DELETION === "true";
async function refreshAuthSession() {
  const client = getSupabaseServerClient();
  await client.auth.refreshSession();
  return {};
}
var deletePersonalAccountAction = enhanceAction(
  async (formData, user) => {
    const logger = await getLogger2();
    const { success } = DeletePersonalAccountSchema.safeParse(
      Object.fromEntries(formData.entries())
    );
    if (!success) {
      throw new Error("Invalid form data");
    }
    const ctx = {
      name: "account.delete",
      userId: user.id
    };
    if (!enableAccountDeletion) {
      logger.warn(ctx, "Account deletion is not enabled");
      throw new Error("Account deletion is not enabled");
    }
    logger.info(ctx, "Deleting account...");
    const client = getSupabaseServerClient();
    const service = createDeletePersonalAccountService();
    await client.auth.signOut();
    await service.deletePersonalAccount({
      adminClient: getSupabaseServerAdminClient(),
      userId: user.id,
      userEmail: user.email ?? null
    });
    logger.info(ctx, "Account request successfully sent");
    revalidatePath("/", "layout");
    redirect("/");
  },
  {}
);

// src/components/account-danger-zone.tsx
function AccountDangerZone() {
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u524A\u9664"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground text-sm" }, "\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u5B8C\u5168\u306B\u524A\u9664\u3057\u307E\u3059\u3002\u3053\u306E\u64CD\u4F5C\u306F\u53D6\u308A\u6D88\u3059\u3053\u3068\u304C\u3067\u304D\u307E\u305B\u3093\u3002")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(DeleteAccountModal, null)));
}
function DeleteAccountModal() {
  return /* @__PURE__ */ React.createElement(AlertDialog, null, /* @__PURE__ */ React.createElement(AlertDialogTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(Button, { "data-test": "delete-account-button", variant: "destructive" }, "\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u524A\u9664")), /* @__PURE__ */ React.createElement(AlertDialogContent, { onEscapeKeyDown: (e) => e.preventDefault() }, /* @__PURE__ */ React.createElement(AlertDialogHeader, null, /* @__PURE__ */ React.createElement(AlertDialogTitle, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u524A\u9664")), /* @__PURE__ */ React.createElement(DeleteAccountForm, null)));
}
function DeleteAccountForm() {
  const form = useForm({
    resolver: zodResolver(DeletePersonalAccountSchema),
    defaultValues: {
      confirmation: ""
    }
  });
  return /* @__PURE__ */ React.createElement(Form, { ...form }, /* @__PURE__ */ React.createElement(
    "form",
    {
      "data-test": "delete-account-form",
      action: deletePersonalAccountAction,
      className: "flex flex-col space-y-4"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-6" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "border-destructive text-destructive border p-4 text-sm"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-2" }, /* @__PURE__ */ React.createElement("div", null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u524A\u9664\u3059\u308B\u3068\u3001\u3059\u3079\u3066\u306E\u30C7\u30FC\u30BF\u304C\u5B8C\u5168\u306B\u524A\u9664\u3055\u308C\u3001\u3053\u306E\u64CD\u4F5C\u306F\u53D6\u308A\u6D88\u3059\u3053\u3068\u304C\u3067\u304D\u307E\u305B\u3093\u3002"), /* @__PURE__ */ React.createElement("div", null, "\u672C\u5F53\u306B\u524A\u9664\u3057\u3066\u3082\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F"))
    ), /* @__PURE__ */ React.createElement(FormItem, null, /* @__PURE__ */ React.createElement(FormLabel, null, "\u78BA\u8A8D\u306E\u305F\u3081\u300CDELETE\u300D\u3068\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"), /* @__PURE__ */ React.createElement(FormControl, null, /* @__PURE__ */ React.createElement(
      Input,
      {
        autoComplete: "off",
        "data-test": "delete-account-input-field",
        required: true,
        name: "confirmation",
        type: "text",
        className: "w-full",
        placeholder: "DELETE",
        pattern: "DELETE"
      }
    )))),
    /* @__PURE__ */ React.createElement(AlertDialogFooter, null, /* @__PURE__ */ React.createElement(AlertDialogCancel, null, "\u30AD\u30E3\u30F3\u30BB\u30EB"), /* @__PURE__ */ React.createElement(DeleteAccountSubmitButton, null))
  ));
}
function DeleteAccountSubmitButton() {
  const { pending } = useFormStatus();
  return /* @__PURE__ */ React.createElement(
    Button,
    {
      "data-test": "confirm-delete-account-button",
      type: "submit",
      disabled: pending,
      name: "action",
      variant: "destructive"
    },
    pending ? "\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u524A\u9664\u4E2D..." : "\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u524A\u9664"
  );
}

// src/components/email/update-email-form-container.tsx
import { useUser } from "@kit/supabase/hooks/use-user";
import { LoadingOverlay } from "@kit/ui/loading-overlay";

// src/components/email/update-email-form.tsx
import { zodResolver as zodResolver2 } from "@hookform/resolvers/zod";
import { CheckIcon } from "@radix-ui/react-icons";
import { useForm as useForm2 } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useUpdateUser } from "@kit/supabase/hooks/use-update-user-mutation";
import { Alert, AlertDescription, AlertTitle } from "@kit/ui/alert";
import { Button as Button2 } from "@kit/ui/button";
import {
  Form as Form2,
  FormControl as FormControl2,
  FormField,
  FormItem as FormItem2,
  FormLabel as FormLabel2,
  FormMessage
} from "@kit/ui/form";
import { If } from "@kit/ui/if";
import { Input as Input2 } from "@kit/ui/input";

// src/schema/update-email.schema.ts
import { z as z2 } from "zod";
var UpdateEmailSchema = {
  withTranslation: (errorMessage) => {
    return z2.object({
      email: z2.string().email(),
      repeatEmail: z2.string().email()
    }).refine(
      (values) => {
        return values.email === values.repeatEmail;
      },
      {
        path: ["repeatEmail"],
        message: errorMessage
      }
    );
  }
};

// src/components/email/update-email-form.tsx
function createEmailResolver(currentEmail, errorMessage) {
  return zodResolver2(
    UpdateEmailSchema.withTranslation(errorMessage).refine((schema) => {
      return schema.email !== currentEmail;
    })
  );
}
function useEmailFormWithValidation(email, errorMessage) {
  return useForm2({
    resolver: createEmailResolver(email, errorMessage),
    defaultValues: {
      email: "",
      repeatEmail: ""
    }
  });
}
function UpdateEmailForm({ user, callbackPath }) {
  const { t } = useTranslation("account");
  const updateUserMutation = useUpdateUser();
  if (!user.email) {
    return /* @__PURE__ */ React.createElement(Alert, { variant: "default" }, /* @__PURE__ */ React.createElement(AlertTitle, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u304C\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u305B\u3093"), /* @__PURE__ */ React.createElement(AlertDescription, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306B\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u304C\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002\u8A2D\u5B9A\u3092\u884C\u3063\u3066\u304F\u3060\u3055\u3044\u3002"));
  }
  const form = useEmailFormWithValidation(user.email, t("emailNotMatching"));
  const updateEmail = ({ email }) => {
    const promise = async () => {
      const redirectTo = new URL(
        callbackPath,
        window.location.origin
      ).toString();
      await updateUserMutation.mutateAsync({ email, redirectTo });
    };
    toast.promise(promise, {
      success: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F",
      loading: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u66F4\u65B0\u4E2D...",
      error: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306E\u66F4\u65B0\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  };
  return /* @__PURE__ */ React.createElement(Form2, { ...form }, /* @__PURE__ */ React.createElement(
    "form",
    {
      className: "flex flex-col space-y-4",
      "data-test": "account-email-form",
      onSubmit: form.handleSubmit(updateEmail)
    },
    /* @__PURE__ */ React.createElement(If, { condition: updateUserMutation.data }, /* @__PURE__ */ React.createElement(Alert, { variant: "success" }, /* @__PURE__ */ React.createElement(CheckIcon, { className: "h-4" }), /* @__PURE__ */ React.createElement(AlertTitle, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(AlertDescription, null, "\u65B0\u3057\u3044\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306B\u78BA\u8A8D\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F\u3002\u30E1\u30FC\u30EB\u3092\u78BA\u8A8D\u3057\u3066\u66F4\u65B0\u3092\u5B8C\u4E86\u3057\u3066\u304F\u3060\u3055\u3044\u3002"))),
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement(
      FormField,
      {
        render: ({ field }) => /* @__PURE__ */ React.createElement(FormItem2, null, /* @__PURE__ */ React.createElement(FormLabel2, null, "\u65B0\u3057\u3044\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9"), /* @__PURE__ */ React.createElement(FormControl2, null, /* @__PURE__ */ React.createElement(
          Input2,
          {
            "data-test": "account-email-form-email-input",
            required: true,
            type: "email",
            placeholder: "",
            ...field
          }
        )), /* @__PURE__ */ React.createElement(FormMessage, null)),
        name: "email"
      }
    ), /* @__PURE__ */ React.createElement(
      FormField,
      {
        render: ({ field }) => /* @__PURE__ */ React.createElement(FormItem2, null, /* @__PURE__ */ React.createElement(FormLabel2, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306E\u78BA\u8A8D"), /* @__PURE__ */ React.createElement(FormControl2, null, /* @__PURE__ */ React.createElement(
          Input2,
          {
            ...field,
            "data-test": "account-email-form-repeat-email-input",
            required: true,
            type: "email"
          }
        )), /* @__PURE__ */ React.createElement(FormMessage, null)),
        name: "repeatEmail"
      }
    ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Button2, { disabled: updateUserMutation.isPending }, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u66F4\u65B0")))
  ));
}

// src/components/email/update-email-form-container.tsx
function UpdateEmailFormContainer(props) {
  const { data: user, isPending } = useUser();
  if (isPending) {
    return /* @__PURE__ */ React.createElement(LoadingOverlay, { fullPage: false });
  }
  if (!user) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(UpdateEmailForm, { callbackPath: props.callbackPath, user });
}

// src/components/mfa/multi-factor-auth-list.tsx
import { useCallback as useCallback2, useState as useState2 } from "react";
import { ExclamationTriangleIcon as ExclamationTriangleIcon2 } from "@radix-ui/react-icons";
import { useMutation as useMutation2, useQueryClient as useQueryClient2 } from "@tanstack/react-query";
import { ShieldCheck, X } from "lucide-react";
import { useTranslation as useTranslation3 } from "react-i18next";
import { toast as toast3 } from "sonner";
import { useFetchAuthFactors } from "@kit/supabase/hooks/use-fetch-mfa-factors";
import { useSupabase as useSupabase2 } from "@kit/supabase/hooks/use-supabase";
import { useFactorsMutationKey as useFactorsMutationKey2 } from "@kit/supabase/hooks/use-user-factors-mutation-key";
import { Alert as Alert3, AlertDescription as AlertDescription3, AlertTitle as AlertTitle3 } from "@kit/ui/alert";
import {
  AlertDialog as AlertDialog2,
  AlertDialogAction,
  AlertDialogCancel as AlertDialogCancel2,
  AlertDialogContent as AlertDialogContent2,
  AlertDialogDescription,
  AlertDialogFooter as AlertDialogFooter2,
  AlertDialogHeader as AlertDialogHeader2,
  AlertDialogTitle as AlertDialogTitle2
} from "@kit/ui/alert-dialog";
import { Badge } from "@kit/ui/badge";
import { Button as Button4 } from "@kit/ui/button";
import { If as If3 } from "@kit/ui/if";
import { Spinner } from "@kit/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@kit/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@kit/ui/tooltip";

// src/components/mfa/multi-factor-auth-setup-dialog.tsx
import { useCallback, useState } from "react";
import { zodResolver as zodResolver3 } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import { useForm as useForm3, useWatch } from "react-hook-form";
import { useTranslation as useTranslation2 } from "react-i18next";
import { toast as toast2 } from "sonner";
import { z as z3 } from "zod";
import { useSupabase } from "@kit/supabase/hooks/use-supabase";
import { useFactorsMutationKey } from "@kit/supabase/hooks/use-user-factors-mutation-key";
import { Alert as Alert2, AlertDescription as AlertDescription2, AlertTitle as AlertTitle2 } from "@kit/ui/alert";
import { Button as Button3 } from "@kit/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@kit/ui/dialog";
import {
  Form as Form3,
  FormControl as FormControl3,
  FormDescription,
  FormField as FormField2,
  FormItem as FormItem3,
  FormLabel as FormLabel3,
  FormMessage as FormMessage2
} from "@kit/ui/form";
import { If as If2 } from "@kit/ui/if";
import { Input as Input3 } from "@kit/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@kit/ui/input-otp";
function MultiFactorAuthSetupDialog(props) {
  const { t } = useTranslation2();
  const [isOpen, setIsOpen] = useState(false);
  const onEnrollSuccess = useCallback(() => {
    setIsOpen(false);
    return toast2.success(t("account:multiFactorSetupSuccess"));
  }, [t]);
  return /* @__PURE__ */ React.createElement(Dialog, { open: isOpen, onOpenChange: setIsOpen }, /* @__PURE__ */ React.createElement(DialogTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(Button3, null, "\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u3092\u8A2D\u5B9A")), /* @__PURE__ */ React.createElement(
    DialogContent,
    {
      onInteractOutside: (e) => e.preventDefault(),
      onEscapeKeyDown: (e) => e.preventDefault()
    },
    /* @__PURE__ */ React.createElement(DialogHeader, null, /* @__PURE__ */ React.createElement(DialogTitle, null, "\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u3092\u8A2D\u5B9A"), /* @__PURE__ */ React.createElement(DialogDescription, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u3092\u5F37\u5316\u3059\u308B\u305F\u3081\u3001\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u3092\u8A2D\u5B9A\u3059\u308B\u3053\u3068\u3092\u304A\u52E7\u3081\u3057\u307E\u3059\u3002")),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
      MultiFactorAuthSetupForm,
      {
        userId: props.userId,
        onCancel: () => setIsOpen(false),
        onEnrolled: onEnrollSuccess
      }
    ))
  ));
}
function MultiFactorAuthSetupForm({
  onEnrolled,
  onCancel,
  userId
}) {
  const verifyCodeMutation = useVerifyCodeMutation(userId);
  const verificationCodeForm = useForm3({
    resolver: zodResolver3(
      z3.object({
        factorId: z3.string().min(1),
        verificationCode: z3.string().min(6).max(6)
      })
    ),
    defaultValues: {
      factorId: "",
      verificationCode: ""
    }
  });
  const [state, setState] = useState({
    loading: false,
    error: ""
  });
  const factorId = useWatch({
    name: "factorId",
    control: verificationCodeForm.control
  });
  const onSubmit = useCallback(
    async ({
      verificationCode,
      factorId: factorId2
    }) => {
      setState({
        loading: true,
        error: ""
      });
      try {
        await verifyCodeMutation.mutateAsync({
          factorId: factorId2,
          code: verificationCode
        });
        await refreshAuthSession();
        setState({
          loading: false,
          error: ""
        });
        onEnrolled();
      } catch (error) {
        const message = error.message || "Unknown error";
        setState({
          loading: false,
          error: message
        });
      }
    },
    [onEnrolled, verifyCodeMutation]
  );
  if (state.error) {
    return /* @__PURE__ */ React.createElement(ErrorAlert, null);
  }
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-center" }, /* @__PURE__ */ React.createElement(
    FactorQrCode,
    {
      userId,
      onCancel,
      onSetFactorId: (factorId2) => verificationCodeForm.setValue("factorId", factorId2)
    }
  )), /* @__PURE__ */ React.createElement(If2, { condition: factorId }, /* @__PURE__ */ React.createElement(Form3, { ...verificationCodeForm }, /* @__PURE__ */ React.createElement(
    "form",
    {
      onSubmit: verificationCodeForm.handleSubmit(onSubmit),
      className: "w-full"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-8" }, /* @__PURE__ */ React.createElement(
      FormField2,
      {
        render: ({ field }) => {
          return /* @__PURE__ */ React.createElement(
            FormItem3,
            {
              className: "mx-auto flex flex-col items-center justify-center"
            },
            /* @__PURE__ */ React.createElement(FormControl3, null, /* @__PURE__ */ React.createElement(InputOTP, { ...field, maxLength: 6, minLength: 6 }, /* @__PURE__ */ React.createElement(InputOTPGroup, null, /* @__PURE__ */ React.createElement(InputOTPSlot, { index: 0 }), /* @__PURE__ */ React.createElement(InputOTPSlot, { index: 1 }), /* @__PURE__ */ React.createElement(InputOTPSlot, { index: 2 })), /* @__PURE__ */ React.createElement(InputOTPSeparator, null), /* @__PURE__ */ React.createElement(InputOTPGroup, null, /* @__PURE__ */ React.createElement(InputOTPSlot, { index: 3 }), /* @__PURE__ */ React.createElement(InputOTPSlot, { index: 4 }), /* @__PURE__ */ React.createElement(InputOTPSlot, { index: 5 })))),
            /* @__PURE__ */ React.createElement(FormDescription, null, "\u8A8D\u8A3C\u30A2\u30D7\u30EA\u306B\u8868\u793A\u3055\u308C\u305F6\u6841\u306E\u30B3\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"),
            /* @__PURE__ */ React.createElement(FormMessage2, null)
          );
        },
        name: "verificationCode"
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end space-x-2" }, /* @__PURE__ */ React.createElement(Button3, { type: "button", variant: "ghost", onClick: onCancel }, "\u30AD\u30E3\u30F3\u30BB\u30EB"), /* @__PURE__ */ React.createElement(
      Button3,
      {
        disabled: !verificationCodeForm.formState.isValid || state.loading,
        type: "submit"
      },
      state.loading ? "\u8A8D\u8A3C\u4E2D..." : "\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u3092\u6709\u52B9\u5316"
    )))
  ))));
}
function FactorQrCode({
  onSetFactorId,
  onCancel,
  userId
}) {
  const enrollFactorMutation = useEnrollFactor(userId);
  const [error, setError] = useState("");
  const form = useForm3({
    resolver: zodResolver3(
      z3.object({
        factorName: z3.string().min(1),
        qrCode: z3.string().min(1)
      })
    ),
    defaultValues: {
      factorName: "",
      qrCode: ""
    }
  });
  const factorName = useWatch({ name: "factorName", control: form.control });
  if (error) {
    return /* @__PURE__ */ React.createElement("div", { className: "flex w-full flex-col space-y-2" }, /* @__PURE__ */ React.createElement(Alert2, { variant: "destructive" }, /* @__PURE__ */ React.createElement(ExclamationTriangleIcon, { className: "h-4" }), /* @__PURE__ */ React.createElement(AlertTitle2, null, "QR\u30B3\u30FC\u30C9\u306E\u751F\u6210\u306B\u5931\u6557\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(AlertDescription2, null, "QR\u30B3\u30FC\u30C9\u306E\u751F\u6210\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Button3, { variant: "outline", onClick: onCancel }, /* @__PURE__ */ React.createElement(ArrowLeftIcon, { className: "h-4" }), "\u3084\u308A\u76F4\u3059")));
  }
  if (!factorName) {
    return /* @__PURE__ */ React.createElement(
      FactorNameForm,
      {
        onCancel,
        onSetFactorName: async (name) => {
          const response = await enrollFactorMutation.mutateAsync(name);
          if (!response.success) {
            return setError(response.data);
          }
          const data = response.data;
          if (data.type === "totp") {
            form.setValue("factorName", name);
            form.setValue("qrCode", data.totp.qr_code);
          }
          onSetFactorId(data.id);
        }
      }
    );
  }
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground text-sm" }, "\u8A8D\u8A3C\u30A2\u30D7\u30EA\u3067QR\u30B3\u30FC\u30C9\u3092\u30B9\u30AD\u30E3\u30F3\u3057\u3066\u304F\u3060\u3055\u3044")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-center" }, /* @__PURE__ */ React.createElement(QrImage, { src: form.getValues("qrCode") })));
}
function FactorNameForm(props) {
  const form = useForm3({
    resolver: zodResolver3(
      z3.object({
        name: z3.string().min(1)
      })
    ),
    defaultValues: {
      name: ""
    }
  });
  return /* @__PURE__ */ React.createElement(Form3, { ...form }, /* @__PURE__ */ React.createElement(
    "form",
    {
      className: "w-full",
      onSubmit: form.handleSubmit((data) => {
        props.onSetFactorName(data.name);
      })
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement(
      FormField2,
      {
        name: "name",
        render: ({ field }) => {
          return /* @__PURE__ */ React.createElement(FormItem3, null, /* @__PURE__ */ React.createElement(FormLabel3, null, "\u8A8D\u8A3C\u65B9\u6CD5\u306E\u540D\u524D"), /* @__PURE__ */ React.createElement(FormControl3, null, /* @__PURE__ */ React.createElement(Input3, { autoComplete: "off", required: true, ...field })), /* @__PURE__ */ React.createElement(FormDescription, null, "\u3053\u306E\u8A8D\u8A3C\u65B9\u6CD5\u3092\u8B58\u5225\u3059\u308B\u305F\u3081\u306E\u540D\u524D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"), /* @__PURE__ */ React.createElement(FormMessage2, null));
        }
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end space-x-2" }, /* @__PURE__ */ React.createElement(Button3, { type: "button", variant: "ghost", onClick: props.onCancel }, "\u30AD\u30E3\u30F3\u30BB\u30EB"), /* @__PURE__ */ React.createElement(Button3, { type: "submit" }, "\u6B21\u3078")))
  ));
}
function QrImage({ src }) {
  return /* @__PURE__ */ React.createElement(
    "img",
    {
      alt: "QR Code",
      src,
      width: 160,
      height: 160,
      className: "bg-white p-2"
    }
  );
}
function useEnrollFactor(userId) {
  const client = useSupabase();
  const queryClient = useQueryClient();
  const mutationKey = useFactorsMutationKey(userId);
  const mutationFn = async (factorName) => {
    const response = await client.auth.mfa.enroll({
      friendlyName: factorName,
      factorType: "totp"
    });
    if (response.error) {
      return {
        success: false,
        data: response.error.code
      };
    }
    return {
      success: true,
      data: response.data
    };
  };
  return useMutation({
    mutationFn,
    mutationKey,
    onSuccess() {
      return queryClient.refetchQueries({
        queryKey: mutationKey
      });
    }
  });
}
function useVerifyCodeMutation(userId) {
  const mutationKey = useFactorsMutationKey(userId);
  const queryClient = useQueryClient();
  const client = useSupabase();
  const mutationFn = async (params) => {
    const challenge = await client.auth.mfa.challenge({
      factorId: params.factorId
    });
    if (challenge.error) {
      throw challenge.error;
    }
    const challengeId = challenge.data.id;
    const verify = await client.auth.mfa.verify({
      factorId: params.factorId,
      code: params.code,
      challengeId
    });
    if (verify.error) {
      throw verify.error;
    }
    return verify;
  };
  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: () => {
      return queryClient.refetchQueries({ queryKey: mutationKey });
    }
  });
}
function ErrorAlert() {
  return /* @__PURE__ */ React.createElement(Alert2, { variant: "destructive" }, /* @__PURE__ */ React.createElement(ExclamationTriangleIcon, { className: "h-4" }), /* @__PURE__ */ React.createElement(AlertTitle2, null, "\u8A2D\u5B9A\u306B\u5931\u6557\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(AlertDescription2, null, "\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u306E\u8A2D\u5B9A\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002"));
}

// src/components/mfa/multi-factor-auth-list.tsx
function MultiFactorAuthFactorsList(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement(FactorsTableContainer, { userId: props.userId }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(MultiFactorAuthSetupDialog, { userId: props.userId })));
}
function FactorsTableContainer(props) {
  const {
    data: factors,
    isLoading,
    isError
  } = useFetchAuthFactors(props.userId);
  if (isLoading) {
    return /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ React.createElement(Spinner, null), /* @__PURE__ */ React.createElement("div", null, "\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u306E\u8A2D\u5B9A\u3092\u8AAD\u307F\u8FBC\u307F\u4E2D..."));
  }
  if (isError) {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Alert3, { variant: "destructive" }, /* @__PURE__ */ React.createElement(ExclamationTriangleIcon2, { className: "h-4" }), /* @__PURE__ */ React.createElement(AlertTitle3, null, "\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u306E\u8A2D\u5B9A\u306B\u5931\u6557\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(AlertDescription3, null, "\u8A2D\u5B9A\u306E\u8AAD\u307F\u8FBC\u307F\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002")));
  }
  const allFactors = factors?.all ?? [];
  if (!allFactors.length) {
    return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement(Alert3, null, /* @__PURE__ */ React.createElement(ShieldCheck, { className: "h-4" }), /* @__PURE__ */ React.createElement(AlertTitle3, null, "\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u3092\u8A2D\u5B9A"), /* @__PURE__ */ React.createElement(AlertDescription3, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u3092\u5F37\u5316\u3059\u308B\u305F\u3081\u3001\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u3092\u8A2D\u5B9A\u3059\u308B\u3053\u3068\u3092\u304A\u52E7\u3081\u3057\u307E\u3059\u3002")));
  }
  return /* @__PURE__ */ React.createElement(FactorsTable, { factors: allFactors, userId: props.userId });
}
function ConfirmUnenrollFactorModal(props) {
  const { t } = useTranslation3();
  const unEnroll = useUnenrollFactor(props.userId);
  const onUnenrollRequested = useCallback2(
    (factorId) => {
      if (unEnroll.isPending)
        return;
      const promise = unEnroll.mutateAsync(factorId).then((response) => {
        props.setIsModalOpen(false);
        if (!response.success) {
          const errorCode = response.data;
          throw t(`auth:errors.${errorCode}`, {
            defaultValue: t("account:unenrollFactorError")
          });
        }
      });
      toast3.promise(promise, {
        loading: t("account:unenrollingFactor"),
        success: t("account:unenrollFactorSuccess"),
        error: (error) => {
          return error;
        }
      });
    },
    [props, t, unEnroll]
  );
  return /* @__PURE__ */ React.createElement(AlertDialog2, { open: !!props.factorId, onOpenChange: props.setIsModalOpen }, /* @__PURE__ */ React.createElement(AlertDialogContent2, null, /* @__PURE__ */ React.createElement(AlertDialogHeader2, null, /* @__PURE__ */ React.createElement(AlertDialogTitle2, null, "\u8A8D\u8A3C\u65B9\u6CD5\u306E\u524A\u9664"), /* @__PURE__ */ React.createElement(AlertDialogDescription, null, "\u3053\u306E\u8A8D\u8A3C\u65B9\u6CD5\u3092\u524A\u9664\u3057\u3066\u3082\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F")), /* @__PURE__ */ React.createElement(AlertDialogFooter2, null, /* @__PURE__ */ React.createElement(AlertDialogCancel2, null, "\u30AD\u30E3\u30F3\u30BB\u30EB"), /* @__PURE__ */ React.createElement(
    AlertDialogAction,
    {
      type: "button",
      disabled: unEnroll.isPending,
      onClick: () => onUnenrollRequested(props.factorId)
    },
    "\u524A\u9664\u3059\u308B"
  ))));
}
function FactorsTable({
  factors,
  userId
}) {
  const [unEnrolling, setUnenrolling] = useState2();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, null, "\u8A8D\u8A3C\u65B9\u6CD5\u540D"), /* @__PURE__ */ React.createElement(TableHead, null, "\u7A2E\u985E"), /* @__PURE__ */ React.createElement(TableHead, null, "\u72B6\u614B"), /* @__PURE__ */ React.createElement(TableHead, null))), /* @__PURE__ */ React.createElement(TableBody, null, factors.map((factor) => /* @__PURE__ */ React.createElement(TableRow, { key: factor.id }, /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement("span", { className: "block truncate" }, factor.friendly_name)), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(Badge, { variant: "default", className: "inline-flex uppercase" }, factor.factor_type)), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(
    Badge,
    {
      className: "inline-flex capitalize",
      variant: factor.status === "verified" ? "default" : "outline"
    },
    factor.status
  )), /* @__PURE__ */ React.createElement("td", { className: "flex justify-end" }, /* @__PURE__ */ React.createElement(TooltipProvider, null, /* @__PURE__ */ React.createElement(Tooltip, null, /* @__PURE__ */ React.createElement(TooltipTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(
    Button4,
    {
      variant: "ghost",
      size: "icon",
      onClick: () => setUnenrolling(factor.id)
    },
    /* @__PURE__ */ React.createElement(X, { className: "h-4" })
  )), /* @__PURE__ */ React.createElement(TooltipContent, null, "\u8A8D\u8A3C\u65B9\u6CD5\u3092\u524A\u9664")))))))), /* @__PURE__ */ React.createElement(If3, { condition: unEnrolling }, (factorId) => /* @__PURE__ */ React.createElement(
    ConfirmUnenrollFactorModal,
    {
      userId,
      factorId,
      setIsModalOpen: () => setUnenrolling(void 0)
    }
  )));
}
function useUnenrollFactor(userId) {
  const queryClient = useQueryClient2();
  const client = useSupabase2();
  const mutationKey = useFactorsMutationKey2(userId);
  const mutationFn = async (factorId) => {
    const { data, error } = await client.auth.mfa.unenroll({
      factorId
    });
    if (error) {
      return {
        success: false,
        data: error.code
      };
    }
    return {
      success: true,
      data
    };
  };
  return useMutation2({
    mutationFn,
    mutationKey,
    onSuccess: () => {
      return queryClient.refetchQueries({
        queryKey: mutationKey
      });
    }
  });
}

// src/components/password/update-password-container.tsx
import { useUser as useUser2 } from "@kit/supabase/hooks/use-user";
import { Alert as Alert5 } from "@kit/ui/alert";
import { LoadingOverlay as LoadingOverlay2 } from "@kit/ui/loading-overlay";

// src/components/password/update-password-form.tsx
import { useState as useState3 } from "react";
import { zodResolver as zodResolver4 } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon as ExclamationTriangleIcon3 } from "@radix-ui/react-icons";
import { Check } from "lucide-react";
import { useForm as useForm4 } from "react-hook-form";
import { useTranslation as useTranslation4 } from "react-i18next";
import { toast as toast4 } from "sonner";
import { useUpdateUser as useUpdateUser2 } from "@kit/supabase/hooks/use-update-user-mutation";
import { Alert as Alert4, AlertDescription as AlertDescription4, AlertTitle as AlertTitle4 } from "@kit/ui/alert";
import { Button as Button5 } from "@kit/ui/button";
import {
  Form as Form4,
  FormControl as FormControl4,
  FormDescription as FormDescription2,
  FormField as FormField3,
  FormItem as FormItem4,
  FormLabel as FormLabel4,
  FormMessage as FormMessage3
} from "@kit/ui/form";
import { If as If4 } from "@kit/ui/if";
import { Input as Input4 } from "@kit/ui/input";
import { Label } from "@kit/ui/label";

// src/schema/update-password.schema.ts
import { z as z4 } from "zod";
var PasswordUpdateSchema = {
  withTranslation: (errorMessage) => {
    return z4.object({
      newPassword: z4.string().min(8).max(99),
      repeatPassword: z4.string().min(8).max(99)
    }).refine(
      (values) => {
        return values.newPassword === values.repeatPassword;
      },
      {
        path: ["repeatPassword"],
        message: errorMessage
      }
    );
  }
};

// src/components/password/update-password-form.tsx
var UpdatePasswordForm = ({
  user,
  callbackPath
}) => {
  const { t } = useTranslation4("account");
  const updateUserMutation = useUpdateUser2();
  const [needsReauthentication, setNeedsReauthentication] = useState3(false);
  const updatePasswordFromCredential = (password) => {
    const redirectTo = [window.location.origin, callbackPath].join("");
    const promise = updateUserMutation.mutateAsync({ password, redirectTo }).catch((error) => {
      if (typeof error === "string" && error?.includes("Password update requires reauthentication")) {
        setNeedsReauthentication(true);
      } else {
        throw error;
      }
    });
    toast4.promise(() => promise, {
      success: "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F",
      error: "\u30D1\u30B9\u30EF\u30FC\u30C9\u306E\u66F4\u65B0\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
      loading: "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u66F4\u65B0\u4E2D..."
    });
  };
  const updatePasswordCallback = async ({
    newPassword
  }) => {
    const email = user.email;
    if (!email) {
      return Promise.reject(t("cannotUpdatePassword"));
    }
    updatePasswordFromCredential(newPassword);
  };
  const form = useForm4({
    resolver: zodResolver4(
      PasswordUpdateSchema.withTranslation(t("passwordNotMatching"))
    ),
    defaultValues: {
      newPassword: "",
      repeatPassword: ""
    }
  });
  return /* @__PURE__ */ React.createElement(Form4, { ...form }, /* @__PURE__ */ React.createElement(
    "form",
    {
      "data-test": "account-password-form",
      onSubmit: form.handleSubmit(updatePasswordCallback)
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement(If4, { condition: updateUserMutation.data }, /* @__PURE__ */ React.createElement(SuccessAlert, null)), /* @__PURE__ */ React.createElement(If4, { condition: needsReauthentication }, /* @__PURE__ */ React.createElement(NeedsReauthenticationAlert, null)), /* @__PURE__ */ React.createElement(
      FormField3,
      {
        name: "newPassword",
        render: ({ field }) => {
          return /* @__PURE__ */ React.createElement(FormItem4, null, /* @__PURE__ */ React.createElement(FormLabel4, null, /* @__PURE__ */ React.createElement(Label, null, "\u65B0\u3057\u3044\u30D1\u30B9\u30EF\u30FC\u30C9")), /* @__PURE__ */ React.createElement(FormControl4, null, /* @__PURE__ */ React.createElement(
            Input4,
            {
              "data-test": "account-password-form-password-input",
              required: true,
              type: "password",
              ...field
            }
          )), /* @__PURE__ */ React.createElement(FormMessage3, null));
        }
      }
    ), /* @__PURE__ */ React.createElement(
      FormField3,
      {
        name: "repeatPassword",
        render: ({ field }) => {
          return /* @__PURE__ */ React.createElement(FormItem4, null, /* @__PURE__ */ React.createElement(FormLabel4, null, /* @__PURE__ */ React.createElement(Label, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u306E\u78BA\u8A8D")), /* @__PURE__ */ React.createElement(FormControl4, null, /* @__PURE__ */ React.createElement(
            Input4,
            {
              "data-test": "account-password-form-repeat-password-input",
              required: true,
              type: "password",
              ...field
            }
          )), /* @__PURE__ */ React.createElement(FormDescription2, null, "\u78BA\u8A8D\u306E\u305F\u3081\u3001\u65B0\u3057\u3044\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u3082\u3046\u4E00\u5EA6\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"), /* @__PURE__ */ React.createElement(FormMessage3, null));
        }
      }
    ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Button5, { disabled: updateUserMutation.isPending }, "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u66F4\u65B0")))
  ));
};
function SuccessAlert() {
  return /* @__PURE__ */ React.createElement(Alert4, { variant: "success" }, /* @__PURE__ */ React.createElement(Check, { className: "h-4" }), /* @__PURE__ */ React.createElement(AlertTitle4, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(AlertDescription4, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\u6B63\u5E38\u306B\u66F4\u65B0\u3055\u308C\u307E\u3057\u305F"));
}
function NeedsReauthenticationAlert() {
  return /* @__PURE__ */ React.createElement(Alert4, { variant: "default" }, /* @__PURE__ */ React.createElement(ExclamationTriangleIcon3, { className: "h-4" }), /* @__PURE__ */ React.createElement(AlertTitle4, null, "\u518D\u8A8D\u8A3C\u304C\u5FC5\u8981\u3067\u3059"), /* @__PURE__ */ React.createElement(AlertDescription4, null, "\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u306E\u305F\u3081\u3001\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u66F4\u65B0\u3059\u308B\u306B\u306F\u518D\u5EA6\u30ED\u30B0\u30A4\u30F3\u304C\u5FC5\u8981\u3067\u3059"));
}

// src/components/password/update-password-container.tsx
function UpdatePasswordFormContainer(props) {
  const { data: user, isPending } = useUser2();
  if (isPending) {
    return /* @__PURE__ */ React.createElement(LoadingOverlay2, { fullPage: false });
  }
  if (!user) {
    return null;
  }
  const canUpdatePassword = user.identities?.some(
    (item) => item.provider === "email"
  );
  if (!canUpdatePassword) {
    return /* @__PURE__ */ React.createElement(WarnCannotUpdatePasswordAlert, null);
  }
  return /* @__PURE__ */ React.createElement(UpdatePasswordForm, { callbackPath: props.callbackPath, user });
}
function WarnCannotUpdatePasswordAlert() {
  return /* @__PURE__ */ React.createElement(Alert5, { variant: "default" }, "\u30BD\u30FC\u30B7\u30E3\u30EB\u30ED\u30B0\u30A4\u30F3\u3092\u4F7F\u7528\u3057\u3066\u3044\u308B\u305F\u3081\u3001\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u66F4\u65B0\u3067\u304D\u307E\u305B\u3093\u3002");
}

// src/components/update-account-details-form.tsx
import { zodResolver as zodResolver5 } from "@hookform/resolvers/zod";
import { useForm as useForm5 } from "react-hook-form";
import { toast as toast5 } from "sonner";
import { Button as Button6 } from "@kit/ui/button";
import {
  Form as Form5,
  FormControl as FormControl5,
  FormField as FormField4,
  FormItem as FormItem5,
  FormLabel as FormLabel5,
  FormMessage as FormMessage4
} from "@kit/ui/form";
import { Input as Input5 } from "@kit/ui/input";

// src/hooks/use-update-account.ts
import { useMutation as useMutation3 } from "@tanstack/react-query";
import { useSupabase as useSupabase3 } from "@kit/supabase/hooks/use-supabase";
function useUpdateAccountData(accountId) {
  const client = useSupabase3();
  const mutationKey = ["account:data", accountId];
  const mutationFn = async (data) => {
    const response = await client.from("user_accounts").update(data).match({
      id: accountId
    });
    if (response.error) {
      throw response.error;
    }
    return response.data;
  };
  return useMutation3({
    mutationKey,
    mutationFn
  });
}

// src/schema/account-details.schema.ts
import { z as z5 } from "zod";
var AccountDetailsSchema = z5.object({
  displayName: z5.string().min(2).max(100)
});

// src/components/update-account-details-form.tsx
function UpdateAccountDetailsForm({
  displayName,
  onUpdate,
  userId
}) {
  const updateAccountMutation = useUpdateAccountData(userId);
  const form = useForm5({
    resolver: zodResolver5(AccountDetailsSchema),
    defaultValues: {
      displayName
    }
  });
  const onSubmit = ({ displayName: displayName2 }) => {
    const data = { full_name: displayName2 };
    const promise = updateAccountMutation.mutateAsync(data).then(() => {
      onUpdate(data);
    });
    return toast5.promise(() => promise, {
      success: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F",
      error: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u306E\u66F4\u65B0\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
      loading: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u3092\u66F4\u65B0\u4E2D..."
    });
  };
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-8" }, /* @__PURE__ */ React.createElement(Form5, { ...form }, /* @__PURE__ */ React.createElement(
    "form",
    {
      "data-test": "update-account-name-form",
      className: "flex flex-col space-y-4",
      onSubmit: form.handleSubmit(onSubmit)
    },
    /* @__PURE__ */ React.createElement(
      FormField4,
      {
        name: "displayName",
        render: ({ field }) => /* @__PURE__ */ React.createElement(FormItem5, null, /* @__PURE__ */ React.createElement(FormLabel5, null, "\u8868\u793A\u540D"), /* @__PURE__ */ React.createElement(FormControl5, null, /* @__PURE__ */ React.createElement(
          Input5,
          {
            "data-test": "account-display-name",
            minLength: 2,
            placeholder: "",
            maxLength: 100,
            ...field
          }
        )), /* @__PURE__ */ React.createElement(FormMessage4, null))
      }
    ),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Button6, { disabled: updateAccountMutation.isPending }, "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u3092\u66F4\u65B0"))
  )));
}

// src/components/update-account-details-form-container.tsx
function UpdateAccountDetailsFormContainer({
  user
}) {
  const revalidateUserDataQuery = useRevalidatePersonalAccountDataQuery();
  return /* @__PURE__ */ React.createElement(
    UpdateAccountDetailsForm,
    {
      displayName: user.name ?? "",
      userId: user.id,
      onUpdate: () => revalidateUserDataQuery(user.id)
    }
  );
}

// src/components/update-account-image-container.tsx
import { useCallback as useCallback3 } from "react";
import { toast as toast6 } from "sonner";
import { useSupabase as useSupabase4 } from "@kit/supabase/hooks/use-supabase";
import { ImageUploader } from "@kit/ui/image-uploader";
var AVATARS_BUCKET = "account_image";
function UpdateAccountImageContainer({
  user
}) {
  const revalidateUserDataQuery = useRevalidatePersonalAccountDataQuery();
  return /* @__PURE__ */ React.createElement(
    UploadProfileAvatarForm,
    {
      pictureUrl: user.pictureUrl ?? null,
      userId: user.id,
      onAvatarUpdated: () => revalidateUserDataQuery(user.id)
    }
  );
}
function UploadProfileAvatarForm(props) {
  const client = useSupabase4();
  const createToaster = useCallback3((promise) => {
    return toast6.promise(promise, {
      success: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u753B\u50CF\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F",
      error: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u753B\u50CF\u306E\u66F4\u65B0\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
      loading: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u753B\u50CF\u3092\u66F4\u65B0\u4E2D..."
    });
  }, []);
  const onValueChange = useCallback3(
    (file) => {
      const removeExistingStorageFile = () => {
        if (props.pictureUrl) {
          return deleteProfilePhoto(
            client,
            props.pictureUrl
          ) ?? Promise.resolve();
        }
        return Promise.resolve();
      };
      if (file) {
        const promise = () => removeExistingStorageFile().then(
          () => uploadUserProfilePhoto(
            client,
            file,
            props.userId
          ).then((pictureUrl) => {
            return client.from("user_accounts").update({
              avatar_url: pictureUrl
            }).eq("id", props.userId).throwOnError();
          }).then(() => {
            props.onAvatarUpdated();
          })
        );
        createToaster(promise);
      } else {
        const promise = () => removeExistingStorageFile().then(() => {
          return client.from("user_accounts").update({
            avatar_url: null
          }).eq("id", props.userId).throwOnError();
        }).then(() => {
          props.onAvatarUpdated();
        });
        createToaster(promise);
      }
    },
    [client, createToaster, props]
  );
  return /* @__PURE__ */ React.createElement(ImageUploader, { value: props.pictureUrl, onValueChange }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u753B\u50CF"), /* @__PURE__ */ React.createElement("span", { className: "text-xs" }, "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u753B\u50CF\u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u307E\u305F\u306F\u5909\u66F4\u3067\u304D\u307E\u3059")));
}
function deleteProfilePhoto(client, url) {
  const bucket = client.storage.from(AVATARS_BUCKET);
  const fileName = url.split("/").pop()?.split("?")[0];
  if (!fileName) {
    return;
  }
  return bucket.remove([fileName]);
}
async function uploadUserProfilePhoto(client, photoFile, userId) {
  const bytes = await photoFile.arrayBuffer();
  const bucket = client.storage.from(AVATARS_BUCKET);
  const extension = photoFile.name.split(".").pop();
  const fileName = await getAvatarFileName(userId, extension);
  const result = await bucket.upload(fileName, bytes);
  if (!result.error) {
    return bucket.getPublicUrl(fileName).data.publicUrl;
  }
  throw result.error;
}
async function getAvatarFileName(userId, extension) {
  const { nanoid } = await import("nanoid");
  const uniqueId = nanoid(16);
  return `${userId}.${extension}?v=${uniqueId}`;
}

// src/components/account-settings-container.tsx
function PersonalAccountSettingsContainer(props) {
  const supportsLanguageSelection = useSupportMultiLanguage();
  const user = usePersonalAccountData(props.userId);
  if (!user.data || user.isPending) {
    return /* @__PURE__ */ React.createElement(LoadingOverlay3, { fullPage: true });
  }
  return /* @__PURE__ */ React.createElement("div", { className: "flex w-full flex-col space-y-4 pb-32" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, null, "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u753B\u50CF"), /* @__PURE__ */ React.createElement(CardDescription, null, "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u753B\u50CF\u3092\u5909\u66F4\u3067\u304D\u307E\u3059")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(
    UpdateAccountImageContainer,
    {
      user: {
        pictureUrl: user.data.picture_url,
        id: user.data.id
      }
    }
  ))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u540D"), /* @__PURE__ */ React.createElement(CardDescription, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306B\u8868\u793A\u3055\u308C\u308B\u540D\u524D\u3092\u5909\u66F4\u3067\u304D\u307E\u3059")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(UpdateAccountDetailsFormContainer, { user: user.data }))), /* @__PURE__ */ React.createElement(If5, { condition: supportsLanguageSelection }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, null, "\u8A00\u8A9E\u8A2D\u5B9A"), /* @__PURE__ */ React.createElement(CardDescription, null, "\u8868\u793A\u8A00\u8A9E\u3092\u5909\u66F4\u3067\u304D\u307E\u3059")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(LanguageSelector, null)))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306E\u5909\u66F4"), /* @__PURE__ */ React.createElement(CardDescription, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306B\u767B\u9332\u3055\u308C\u3066\u3044\u308B\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u5909\u66F4\u3067\u304D\u307E\u3059")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(UpdateEmailFormContainer, { callbackPath: props.paths.callback }))), /* @__PURE__ */ React.createElement(If5, { condition: props.features.enablePasswordUpdate }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u306E\u5909\u66F4"), /* @__PURE__ */ React.createElement(CardDescription, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u5909\u66F4\u3067\u304D\u307E\u3059")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(UpdatePasswordFormContainer, { callbackPath: props.paths.callback })))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, null, "\u4E8C\u6BB5\u968E\u8A8D\u8A3C"), /* @__PURE__ */ React.createElement(CardDescription, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u3092\u5F37\u5316\u3059\u308B\u305F\u3081\u3001\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u3092\u8A2D\u5B9A\u3067\u304D\u307E\u3059")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(MultiFactorAuthFactorsList, { userId: props.userId }))), /* @__PURE__ */ React.createElement(If5, { condition: props.features.enableAccountDeletion }, /* @__PURE__ */ React.createElement(Card, { className: "border-destructive" }, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, null, "\u5371\u967A\u306A\u64CD\u4F5C"), /* @__PURE__ */ React.createElement(CardDescription, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u524A\u9664\u306A\u3069\u3001\u53D6\u308A\u6D88\u3057\u3067\u304D\u306A\u3044\u64CD\u4F5C\u3092\u884C\u3048\u307E\u3059")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(AccountDangerZone, null)))));
}
function useSupportMultiLanguage() {
  const { i18n } = useTranslation5();
  const langs = i18n?.options?.supportedLngs ?? [];
  const supportedLangs = langs.filter((lang) => lang !== "cimode");
  return supportedLangs.length > 1;
}

export {
  PersonalAccountSettingsContainer
};
