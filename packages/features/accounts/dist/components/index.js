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

// src/components/index.ts
var components_exports = {};
__export(components_exports, {
  PersonalAccountSettingsContainer: () => PersonalAccountSettingsContainer
});
module.exports = __toCommonJS(components_exports);

// src/components/account-settings-container.tsx
var import_react_i18next5 = require("react-i18next");
var import_card = require("@kit/ui/card");
var import_if5 = require("@kit/ui/if");
var import_language_selector = require("@kit/ui/language-selector");
var import_loading_overlay3 = require("@kit/ui/loading-overlay");

// src/hooks/use-personal-account-data.ts
var import_react = require("react");
var import_react_query = require("@tanstack/react-query");
var import_use_supabase = require("@kit/supabase/hooks/use-supabase");
function usePersonalAccountData(userId, partialAccount) {
  const client = (0, import_use_supabase.useSupabase)();
  const queryKey = ["account:data", userId];
  const queryFn = async () => {
    if (!userId) {
      throw new Error("User ID is required");
    }
    const response = await client.from("user_accounts").select(
      `
        id,
        full_name,
        avatar_url
    `
    ).eq("id", userId).single();
    if (response.error) {
      throw response.error;
    }
    return {
      id: response.data.id,
      name: response.data.full_name,
      picture_url: response.data.avatar_url
    };
  };
  return (0, import_react_query.useQuery)({
    queryKey,
    queryFn,
    enabled: !!userId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialData: partialAccount?.id ? {
      id: partialAccount.id,
      name: partialAccount.name,
      picture_url: partialAccount.picture_url
    } : void 0
  });
}
function useRevalidatePersonalAccountDataQuery() {
  const queryClient = (0, import_react_query.useQueryClient)();
  return (0, import_react.useCallback)(
    (userId) => queryClient.invalidateQueries({
      queryKey: ["account:data", userId]
    }),
    [queryClient]
  );
}

// src/components/account-danger-zone.tsx
var import_react_dom = require("react-dom");
var import_zod2 = require("@hookform/resolvers/zod");
var import_react_hook_form = require("react-hook-form");
var import_alert_dialog = require("@kit/ui/alert-dialog");
var import_button = require("@kit/ui/button");
var import_form = require("@kit/ui/form");
var import_input = require("@kit/ui/input");

// src/schema/delete-personal-account.schema.ts
var import_zod = require("zod");
var DeletePersonalAccountSchema = import_zod.z.object({
  confirmation: import_zod.z.string().refine((value) => value === "DELETE")
});

// src/server/server-actions.ts
var import_cache = require("next/cache");
var import_navigation = require("next/navigation");
var import_actions = require("@kit/next/actions");
var import_logger2 = require("@kit/shared/logger");
var import_server_admin_client = require("@kit/supabase/server-admin-client");
var import_server_client = require("@kit/supabase/server-client");

// ../../../node_modules/server-only/index.js
throw new Error(
  "This module cannot be imported from a Client Component module. It should only be used from a Server Component."
);

// src/server/services/delete-personal-account.service.ts
var import_logger = require("@kit/shared/logger");
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
    const logger = await (0, import_logger.getLogger)();
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
  const client = (0, import_server_client.getSupabaseServerClient)();
  await client.auth.refreshSession();
  return {};
}
var deletePersonalAccountAction = (0, import_actions.enhanceAction)(
  async (formData, user) => {
    const logger = await (0, import_logger2.getLogger)();
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
    const client = (0, import_server_client.getSupabaseServerClient)();
    const service = createDeletePersonalAccountService();
    await client.auth.signOut();
    await service.deletePersonalAccount({
      adminClient: (0, import_server_admin_client.getSupabaseServerAdminClient)(),
      userId: user.id,
      userEmail: user.email ?? null
    });
    logger.info(ctx, "Account request successfully sent");
    (0, import_cache.revalidatePath)("/", "layout");
    (0, import_navigation.redirect)("/");
  },
  {}
);

// src/components/account-danger-zone.tsx
function AccountDangerZone() {
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u524A\u9664"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground text-sm" }, "\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u5B8C\u5168\u306B\u524A\u9664\u3057\u307E\u3059\u3002\u3053\u306E\u64CD\u4F5C\u306F\u53D6\u308A\u6D88\u3059\u3053\u3068\u304C\u3067\u304D\u307E\u305B\u3093\u3002")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(DeleteAccountModal, null)));
}
function DeleteAccountModal() {
  return /* @__PURE__ */ React.createElement(import_alert_dialog.AlertDialog, null, /* @__PURE__ */ React.createElement(import_alert_dialog.AlertDialogTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(import_button.Button, { "data-test": "delete-account-button", variant: "destructive" }, "\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u524A\u9664")), /* @__PURE__ */ React.createElement(import_alert_dialog.AlertDialogContent, { onEscapeKeyDown: (e) => e.preventDefault() }, /* @__PURE__ */ React.createElement(import_alert_dialog.AlertDialogHeader, null, /* @__PURE__ */ React.createElement(import_alert_dialog.AlertDialogTitle, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u524A\u9664")), /* @__PURE__ */ React.createElement(DeleteAccountForm, null)));
}
function DeleteAccountForm() {
  const form = (0, import_react_hook_form.useForm)({
    resolver: (0, import_zod2.zodResolver)(DeletePersonalAccountSchema),
    defaultValues: {
      confirmation: ""
    }
  });
  return /* @__PURE__ */ React.createElement(import_form.Form, { ...form }, /* @__PURE__ */ React.createElement(
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
    ), /* @__PURE__ */ React.createElement(import_form.FormItem, null, /* @__PURE__ */ React.createElement(import_form.FormLabel, null, "\u78BA\u8A8D\u306E\u305F\u3081\u300CDELETE\u300D\u3068\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"), /* @__PURE__ */ React.createElement(import_form.FormControl, null, /* @__PURE__ */ React.createElement(
      import_input.Input,
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
    /* @__PURE__ */ React.createElement(import_alert_dialog.AlertDialogFooter, null, /* @__PURE__ */ React.createElement(import_alert_dialog.AlertDialogCancel, null, "\u30AD\u30E3\u30F3\u30BB\u30EB"), /* @__PURE__ */ React.createElement(DeleteAccountSubmitButton, null))
  ));
}
function DeleteAccountSubmitButton() {
  const { pending } = (0, import_react_dom.useFormStatus)();
  return /* @__PURE__ */ React.createElement(
    import_button.Button,
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
var import_use_user = require("@kit/supabase/hooks/use-user");
var import_loading_overlay = require("@kit/ui/loading-overlay");

// src/components/email/update-email-form.tsx
var import_zod4 = require("@hookform/resolvers/zod");
var import_react_icons = require("@radix-ui/react-icons");
var import_react_hook_form2 = require("react-hook-form");
var import_react_i18next = require("react-i18next");
var import_sonner = require("sonner");
var import_use_update_user_mutation = require("@kit/supabase/hooks/use-update-user-mutation");
var import_alert = require("@kit/ui/alert");
var import_button2 = require("@kit/ui/button");
var import_form2 = require("@kit/ui/form");
var import_if = require("@kit/ui/if");
var import_input2 = require("@kit/ui/input");

// src/schema/update-email.schema.ts
var import_zod3 = require("zod");
var UpdateEmailSchema = {
  withTranslation: (errorMessage) => {
    return import_zod3.z.object({
      email: import_zod3.z.string().email(),
      repeatEmail: import_zod3.z.string().email()
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
  return (0, import_zod4.zodResolver)(
    UpdateEmailSchema.withTranslation(errorMessage).refine((schema) => {
      return schema.email !== currentEmail;
    })
  );
}
function useEmailFormWithValidation(email, errorMessage) {
  return (0, import_react_hook_form2.useForm)({
    resolver: createEmailResolver(email, errorMessage),
    defaultValues: {
      email: "",
      repeatEmail: ""
    }
  });
}
function UpdateEmailForm({ user, callbackPath }) {
  const { t } = (0, import_react_i18next.useTranslation)("account");
  const updateUserMutation = (0, import_use_update_user_mutation.useUpdateUser)();
  if (!user.email) {
    return /* @__PURE__ */ React.createElement(import_alert.Alert, { variant: "default" }, /* @__PURE__ */ React.createElement(import_alert.AlertTitle, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u304C\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u305B\u3093"), /* @__PURE__ */ React.createElement(import_alert.AlertDescription, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306B\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u304C\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002\u8A2D\u5B9A\u3092\u884C\u3063\u3066\u304F\u3060\u3055\u3044\u3002"));
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
    import_sonner.toast.promise(promise, {
      success: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F",
      loading: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u66F4\u65B0\u4E2D...",
      error: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306E\u66F4\u65B0\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  };
  return /* @__PURE__ */ React.createElement(import_form2.Form, { ...form }, /* @__PURE__ */ React.createElement(
    "form",
    {
      className: "flex flex-col space-y-4",
      "data-test": "account-email-form",
      onSubmit: form.handleSubmit(updateEmail)
    },
    /* @__PURE__ */ React.createElement(import_if.If, { condition: updateUserMutation.data }, /* @__PURE__ */ React.createElement(import_alert.Alert, { variant: "success" }, /* @__PURE__ */ React.createElement(import_react_icons.CheckIcon, { className: "h-4" }), /* @__PURE__ */ React.createElement(import_alert.AlertTitle, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(import_alert.AlertDescription, null, "\u65B0\u3057\u3044\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306B\u78BA\u8A8D\u30E1\u30FC\u30EB\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F\u3002\u30E1\u30FC\u30EB\u3092\u78BA\u8A8D\u3057\u3066\u66F4\u65B0\u3092\u5B8C\u4E86\u3057\u3066\u304F\u3060\u3055\u3044\u3002"))),
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement(
      import_form2.FormField,
      {
        render: ({ field }) => /* @__PURE__ */ React.createElement(import_form2.FormItem, null, /* @__PURE__ */ React.createElement(import_form2.FormLabel, null, "\u65B0\u3057\u3044\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9"), /* @__PURE__ */ React.createElement(import_form2.FormControl, null, /* @__PURE__ */ React.createElement(
          import_input2.Input,
          {
            "data-test": "account-email-form-email-input",
            required: true,
            type: "email",
            placeholder: "",
            ...field
          }
        )), /* @__PURE__ */ React.createElement(import_form2.FormMessage, null)),
        name: "email"
      }
    ), /* @__PURE__ */ React.createElement(
      import_form2.FormField,
      {
        render: ({ field }) => /* @__PURE__ */ React.createElement(import_form2.FormItem, null, /* @__PURE__ */ React.createElement(import_form2.FormLabel, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306E\u78BA\u8A8D"), /* @__PURE__ */ React.createElement(import_form2.FormControl, null, /* @__PURE__ */ React.createElement(
          import_input2.Input,
          {
            ...field,
            "data-test": "account-email-form-repeat-email-input",
            required: true,
            type: "email"
          }
        )), /* @__PURE__ */ React.createElement(import_form2.FormMessage, null)),
        name: "repeatEmail"
      }
    ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_button2.Button, { disabled: updateUserMutation.isPending }, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u66F4\u65B0")))
  ));
}

// src/components/email/update-email-form-container.tsx
function UpdateEmailFormContainer(props) {
  const { data: user, isPending } = (0, import_use_user.useUser)();
  if (isPending) {
    return /* @__PURE__ */ React.createElement(import_loading_overlay.LoadingOverlay, { fullPage: false });
  }
  if (!user) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(UpdateEmailForm, { callbackPath: props.callbackPath, user });
}

// src/components/mfa/multi-factor-auth-list.tsx
var import_react3 = require("react");
var import_react_icons3 = require("@radix-ui/react-icons");
var import_react_query3 = require("@tanstack/react-query");
var import_lucide_react2 = require("lucide-react");
var import_react_i18next3 = require("react-i18next");
var import_sonner3 = require("sonner");
var import_use_fetch_mfa_factors = require("@kit/supabase/hooks/use-fetch-mfa-factors");
var import_use_supabase3 = require("@kit/supabase/hooks/use-supabase");
var import_use_user_factors_mutation_key2 = require("@kit/supabase/hooks/use-user-factors-mutation-key");
var import_alert3 = require("@kit/ui/alert");
var import_alert_dialog2 = require("@kit/ui/alert-dialog");
var import_badge = require("@kit/ui/badge");
var import_button4 = require("@kit/ui/button");
var import_if3 = require("@kit/ui/if");
var import_spinner = require("@kit/ui/spinner");
var import_table = require("@kit/ui/table");
var import_tooltip = require("@kit/ui/tooltip");

// src/components/mfa/multi-factor-auth-setup-dialog.tsx
var import_react2 = require("react");
var import_zod5 = require("@hookform/resolvers/zod");
var import_react_icons2 = require("@radix-ui/react-icons");
var import_react_query2 = require("@tanstack/react-query");
var import_lucide_react = require("lucide-react");
var import_react_hook_form3 = require("react-hook-form");
var import_react_i18next2 = require("react-i18next");
var import_sonner2 = require("sonner");
var import_zod6 = require("zod");
var import_use_supabase2 = require("@kit/supabase/hooks/use-supabase");
var import_use_user_factors_mutation_key = require("@kit/supabase/hooks/use-user-factors-mutation-key");
var import_alert2 = require("@kit/ui/alert");
var import_button3 = require("@kit/ui/button");
var import_dialog = require("@kit/ui/dialog");
var import_form3 = require("@kit/ui/form");
var import_if2 = require("@kit/ui/if");
var import_input3 = require("@kit/ui/input");
var import_input_otp = require("@kit/ui/input-otp");
function MultiFactorAuthSetupDialog(props) {
  const { t } = (0, import_react_i18next2.useTranslation)();
  const [isOpen, setIsOpen] = (0, import_react2.useState)(false);
  const onEnrollSuccess = (0, import_react2.useCallback)(() => {
    setIsOpen(false);
    return import_sonner2.toast.success(t("account:multiFactorSetupSuccess"));
  }, [t]);
  return /* @__PURE__ */ React.createElement(import_dialog.Dialog, { open: isOpen, onOpenChange: setIsOpen }, /* @__PURE__ */ React.createElement(import_dialog.DialogTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(import_button3.Button, null, "\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u3092\u8A2D\u5B9A")), /* @__PURE__ */ React.createElement(
    import_dialog.DialogContent,
    {
      onInteractOutside: (e) => e.preventDefault(),
      onEscapeKeyDown: (e) => e.preventDefault()
    },
    /* @__PURE__ */ React.createElement(import_dialog.DialogHeader, null, /* @__PURE__ */ React.createElement(import_dialog.DialogTitle, null, "\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u3092\u8A2D\u5B9A"), /* @__PURE__ */ React.createElement(import_dialog.DialogDescription, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u3092\u5F37\u5316\u3059\u308B\u305F\u3081\u3001\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u3092\u8A2D\u5B9A\u3059\u308B\u3053\u3068\u3092\u304A\u52E7\u3081\u3057\u307E\u3059\u3002")),
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
  const verificationCodeForm = (0, import_react_hook_form3.useForm)({
    resolver: (0, import_zod5.zodResolver)(
      import_zod6.z.object({
        factorId: import_zod6.z.string().min(1),
        verificationCode: import_zod6.z.string().min(6).max(6)
      })
    ),
    defaultValues: {
      factorId: "",
      verificationCode: ""
    }
  });
  const [state, setState] = (0, import_react2.useState)({
    loading: false,
    error: ""
  });
  const factorId = (0, import_react_hook_form3.useWatch)({
    name: "factorId",
    control: verificationCodeForm.control
  });
  const onSubmit = (0, import_react2.useCallback)(
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
  )), /* @__PURE__ */ React.createElement(import_if2.If, { condition: factorId }, /* @__PURE__ */ React.createElement(import_form3.Form, { ...verificationCodeForm }, /* @__PURE__ */ React.createElement(
    "form",
    {
      onSubmit: verificationCodeForm.handleSubmit(onSubmit),
      className: "w-full"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-8" }, /* @__PURE__ */ React.createElement(
      import_form3.FormField,
      {
        render: ({ field }) => {
          return /* @__PURE__ */ React.createElement(
            import_form3.FormItem,
            {
              className: "mx-auto flex flex-col items-center justify-center"
            },
            /* @__PURE__ */ React.createElement(import_form3.FormControl, null, /* @__PURE__ */ React.createElement(import_input_otp.InputOTP, { ...field, maxLength: 6, minLength: 6 }, /* @__PURE__ */ React.createElement(import_input_otp.InputOTPGroup, null, /* @__PURE__ */ React.createElement(import_input_otp.InputOTPSlot, { index: 0 }), /* @__PURE__ */ React.createElement(import_input_otp.InputOTPSlot, { index: 1 }), /* @__PURE__ */ React.createElement(import_input_otp.InputOTPSlot, { index: 2 })), /* @__PURE__ */ React.createElement(import_input_otp.InputOTPSeparator, null), /* @__PURE__ */ React.createElement(import_input_otp.InputOTPGroup, null, /* @__PURE__ */ React.createElement(import_input_otp.InputOTPSlot, { index: 3 }), /* @__PURE__ */ React.createElement(import_input_otp.InputOTPSlot, { index: 4 }), /* @__PURE__ */ React.createElement(import_input_otp.InputOTPSlot, { index: 5 })))),
            /* @__PURE__ */ React.createElement(import_form3.FormDescription, null, "\u8A8D\u8A3C\u30A2\u30D7\u30EA\u306B\u8868\u793A\u3055\u308C\u305F6\u6841\u306E\u30B3\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"),
            /* @__PURE__ */ React.createElement(import_form3.FormMessage, null)
          );
        },
        name: "verificationCode"
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end space-x-2" }, /* @__PURE__ */ React.createElement(import_button3.Button, { type: "button", variant: "ghost", onClick: onCancel }, "\u30AD\u30E3\u30F3\u30BB\u30EB"), /* @__PURE__ */ React.createElement(
      import_button3.Button,
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
  const [error, setError] = (0, import_react2.useState)("");
  const form = (0, import_react_hook_form3.useForm)({
    resolver: (0, import_zod5.zodResolver)(
      import_zod6.z.object({
        factorName: import_zod6.z.string().min(1),
        qrCode: import_zod6.z.string().min(1)
      })
    ),
    defaultValues: {
      factorName: "",
      qrCode: ""
    }
  });
  const factorName = (0, import_react_hook_form3.useWatch)({ name: "factorName", control: form.control });
  if (error) {
    return /* @__PURE__ */ React.createElement("div", { className: "flex w-full flex-col space-y-2" }, /* @__PURE__ */ React.createElement(import_alert2.Alert, { variant: "destructive" }, /* @__PURE__ */ React.createElement(import_react_icons2.ExclamationTriangleIcon, { className: "h-4" }), /* @__PURE__ */ React.createElement(import_alert2.AlertTitle, null, "QR\u30B3\u30FC\u30C9\u306E\u751F\u6210\u306B\u5931\u6557\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(import_alert2.AlertDescription, null, "QR\u30B3\u30FC\u30C9\u306E\u751F\u6210\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_button3.Button, { variant: "outline", onClick: onCancel }, /* @__PURE__ */ React.createElement(import_lucide_react.ArrowLeftIcon, { className: "h-4" }), "\u3084\u308A\u76F4\u3059")));
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
  const form = (0, import_react_hook_form3.useForm)({
    resolver: (0, import_zod5.zodResolver)(
      import_zod6.z.object({
        name: import_zod6.z.string().min(1)
      })
    ),
    defaultValues: {
      name: ""
    }
  });
  return /* @__PURE__ */ React.createElement(import_form3.Form, { ...form }, /* @__PURE__ */ React.createElement(
    "form",
    {
      className: "w-full",
      onSubmit: form.handleSubmit((data) => {
        props.onSetFactorName(data.name);
      })
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement(
      import_form3.FormField,
      {
        name: "name",
        render: ({ field }) => {
          return /* @__PURE__ */ React.createElement(import_form3.FormItem, null, /* @__PURE__ */ React.createElement(import_form3.FormLabel, null, "\u8A8D\u8A3C\u65B9\u6CD5\u306E\u540D\u524D"), /* @__PURE__ */ React.createElement(import_form3.FormControl, null, /* @__PURE__ */ React.createElement(import_input3.Input, { autoComplete: "off", required: true, ...field })), /* @__PURE__ */ React.createElement(import_form3.FormDescription, null, "\u3053\u306E\u8A8D\u8A3C\u65B9\u6CD5\u3092\u8B58\u5225\u3059\u308B\u305F\u3081\u306E\u540D\u524D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"), /* @__PURE__ */ React.createElement(import_form3.FormMessage, null));
        }
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end space-x-2" }, /* @__PURE__ */ React.createElement(import_button3.Button, { type: "button", variant: "ghost", onClick: props.onCancel }, "\u30AD\u30E3\u30F3\u30BB\u30EB"), /* @__PURE__ */ React.createElement(import_button3.Button, { type: "submit" }, "\u6B21\u3078")))
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
  const client = (0, import_use_supabase2.useSupabase)();
  const queryClient = (0, import_react_query2.useQueryClient)();
  const mutationKey = (0, import_use_user_factors_mutation_key.useFactorsMutationKey)(userId);
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
  return (0, import_react_query2.useMutation)({
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
  const mutationKey = (0, import_use_user_factors_mutation_key.useFactorsMutationKey)(userId);
  const queryClient = (0, import_react_query2.useQueryClient)();
  const client = (0, import_use_supabase2.useSupabase)();
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
  return (0, import_react_query2.useMutation)({
    mutationKey,
    mutationFn,
    onSuccess: () => {
      return queryClient.refetchQueries({ queryKey: mutationKey });
    }
  });
}
function ErrorAlert() {
  return /* @__PURE__ */ React.createElement(import_alert2.Alert, { variant: "destructive" }, /* @__PURE__ */ React.createElement(import_react_icons2.ExclamationTriangleIcon, { className: "h-4" }), /* @__PURE__ */ React.createElement(import_alert2.AlertTitle, null, "\u8A2D\u5B9A\u306B\u5931\u6557\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(import_alert2.AlertDescription, null, "\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u306E\u8A2D\u5B9A\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002"));
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
  } = (0, import_use_fetch_mfa_factors.useFetchAuthFactors)(props.userId);
  if (isLoading) {
    return /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ React.createElement(import_spinner.Spinner, null), /* @__PURE__ */ React.createElement("div", null, "\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u306E\u8A2D\u5B9A\u3092\u8AAD\u307F\u8FBC\u307F\u4E2D..."));
  }
  if (isError) {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_alert3.Alert, { variant: "destructive" }, /* @__PURE__ */ React.createElement(import_react_icons3.ExclamationTriangleIcon, { className: "h-4" }), /* @__PURE__ */ React.createElement(import_alert3.AlertTitle, null, "\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u306E\u8A2D\u5B9A\u306B\u5931\u6557\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(import_alert3.AlertDescription, null, "\u8A2D\u5B9A\u306E\u8AAD\u307F\u8FBC\u307F\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002")));
  }
  const allFactors = factors?.all ?? [];
  if (!allFactors.length) {
    return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement(import_alert3.Alert, null, /* @__PURE__ */ React.createElement(import_lucide_react2.ShieldCheck, { className: "h-4" }), /* @__PURE__ */ React.createElement(import_alert3.AlertTitle, null, "\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u3092\u8A2D\u5B9A"), /* @__PURE__ */ React.createElement(import_alert3.AlertDescription, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u3092\u5F37\u5316\u3059\u308B\u305F\u3081\u3001\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u3092\u8A2D\u5B9A\u3059\u308B\u3053\u3068\u3092\u304A\u52E7\u3081\u3057\u307E\u3059\u3002")));
  }
  return /* @__PURE__ */ React.createElement(FactorsTable, { factors: allFactors, userId: props.userId });
}
function ConfirmUnenrollFactorModal(props) {
  const { t } = (0, import_react_i18next3.useTranslation)();
  const unEnroll = useUnenrollFactor(props.userId);
  const onUnenrollRequested = (0, import_react3.useCallback)(
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
      import_sonner3.toast.promise(promise, {
        loading: t("account:unenrollingFactor"),
        success: t("account:unenrollFactorSuccess"),
        error: (error) => {
          return error;
        }
      });
    },
    [props, t, unEnroll]
  );
  return /* @__PURE__ */ React.createElement(import_alert_dialog2.AlertDialog, { open: !!props.factorId, onOpenChange: props.setIsModalOpen }, /* @__PURE__ */ React.createElement(import_alert_dialog2.AlertDialogContent, null, /* @__PURE__ */ React.createElement(import_alert_dialog2.AlertDialogHeader, null, /* @__PURE__ */ React.createElement(import_alert_dialog2.AlertDialogTitle, null, "\u8A8D\u8A3C\u65B9\u6CD5\u306E\u524A\u9664"), /* @__PURE__ */ React.createElement(import_alert_dialog2.AlertDialogDescription, null, "\u3053\u306E\u8A8D\u8A3C\u65B9\u6CD5\u3092\u524A\u9664\u3057\u3066\u3082\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F")), /* @__PURE__ */ React.createElement(import_alert_dialog2.AlertDialogFooter, null, /* @__PURE__ */ React.createElement(import_alert_dialog2.AlertDialogCancel, null, "\u30AD\u30E3\u30F3\u30BB\u30EB"), /* @__PURE__ */ React.createElement(
    import_alert_dialog2.AlertDialogAction,
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
  const [unEnrolling, setUnenrolling] = (0, import_react3.useState)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_table.Table, null, /* @__PURE__ */ React.createElement(import_table.TableHeader, null, /* @__PURE__ */ React.createElement(import_table.TableRow, null, /* @__PURE__ */ React.createElement(import_table.TableHead, null, "\u8A8D\u8A3C\u65B9\u6CD5\u540D"), /* @__PURE__ */ React.createElement(import_table.TableHead, null, "\u7A2E\u985E"), /* @__PURE__ */ React.createElement(import_table.TableHead, null, "\u72B6\u614B"), /* @__PURE__ */ React.createElement(import_table.TableHead, null))), /* @__PURE__ */ React.createElement(import_table.TableBody, null, factors.map((factor) => /* @__PURE__ */ React.createElement(import_table.TableRow, { key: factor.id }, /* @__PURE__ */ React.createElement(import_table.TableCell, null, /* @__PURE__ */ React.createElement("span", { className: "block truncate" }, factor.friendly_name)), /* @__PURE__ */ React.createElement(import_table.TableCell, null, /* @__PURE__ */ React.createElement(import_badge.Badge, { variant: "default", className: "inline-flex uppercase" }, factor.factor_type)), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(
    import_badge.Badge,
    {
      className: "inline-flex capitalize",
      variant: factor.status === "verified" ? "default" : "outline"
    },
    factor.status
  )), /* @__PURE__ */ React.createElement("td", { className: "flex justify-end" }, /* @__PURE__ */ React.createElement(import_tooltip.TooltipProvider, null, /* @__PURE__ */ React.createElement(import_tooltip.Tooltip, null, /* @__PURE__ */ React.createElement(import_tooltip.TooltipTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(
    import_button4.Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: () => setUnenrolling(factor.id)
    },
    /* @__PURE__ */ React.createElement(import_lucide_react2.X, { className: "h-4" })
  )), /* @__PURE__ */ React.createElement(import_tooltip.TooltipContent, null, "\u8A8D\u8A3C\u65B9\u6CD5\u3092\u524A\u9664")))))))), /* @__PURE__ */ React.createElement(import_if3.If, { condition: unEnrolling }, (factorId) => /* @__PURE__ */ React.createElement(
    ConfirmUnenrollFactorModal,
    {
      userId,
      factorId,
      setIsModalOpen: () => setUnenrolling(void 0)
    }
  )));
}
function useUnenrollFactor(userId) {
  const queryClient = (0, import_react_query3.useQueryClient)();
  const client = (0, import_use_supabase3.useSupabase)();
  const mutationKey = (0, import_use_user_factors_mutation_key2.useFactorsMutationKey)(userId);
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
  return (0, import_react_query3.useMutation)({
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
var import_use_user2 = require("@kit/supabase/hooks/use-user");
var import_alert5 = require("@kit/ui/alert");
var import_loading_overlay2 = require("@kit/ui/loading-overlay");

// src/components/password/update-password-form.tsx
var import_react4 = require("react");
var import_zod8 = require("@hookform/resolvers/zod");
var import_react_icons4 = require("@radix-ui/react-icons");
var import_lucide_react3 = require("lucide-react");
var import_react_hook_form4 = require("react-hook-form");
var import_react_i18next4 = require("react-i18next");
var import_sonner4 = require("sonner");
var import_use_update_user_mutation2 = require("@kit/supabase/hooks/use-update-user-mutation");
var import_alert4 = require("@kit/ui/alert");
var import_button5 = require("@kit/ui/button");
var import_form4 = require("@kit/ui/form");
var import_if4 = require("@kit/ui/if");
var import_input4 = require("@kit/ui/input");
var import_label = require("@kit/ui/label");

// src/schema/update-password.schema.ts
var import_zod7 = require("zod");
var PasswordUpdateSchema = {
  withTranslation: (errorMessage) => {
    return import_zod7.z.object({
      newPassword: import_zod7.z.string().min(8).max(99),
      repeatPassword: import_zod7.z.string().min(8).max(99)
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
  const { t } = (0, import_react_i18next4.useTranslation)("account");
  const updateUserMutation = (0, import_use_update_user_mutation2.useUpdateUser)();
  const [needsReauthentication, setNeedsReauthentication] = (0, import_react4.useState)(false);
  const updatePasswordFromCredential = (password) => {
    const redirectTo = [window.location.origin, callbackPath].join("");
    const promise = updateUserMutation.mutateAsync({ password, redirectTo }).catch((error) => {
      if (typeof error === "string" && error?.includes("Password update requires reauthentication")) {
        setNeedsReauthentication(true);
      } else {
        throw error;
      }
    });
    import_sonner4.toast.promise(() => promise, {
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
  const form = (0, import_react_hook_form4.useForm)({
    resolver: (0, import_zod8.zodResolver)(
      PasswordUpdateSchema.withTranslation(t("passwordNotMatching"))
    ),
    defaultValues: {
      newPassword: "",
      repeatPassword: ""
    }
  });
  return /* @__PURE__ */ React.createElement(import_form4.Form, { ...form }, /* @__PURE__ */ React.createElement(
    "form",
    {
      "data-test": "account-password-form",
      onSubmit: form.handleSubmit(updatePasswordCallback)
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement(import_if4.If, { condition: updateUserMutation.data }, /* @__PURE__ */ React.createElement(SuccessAlert, null)), /* @__PURE__ */ React.createElement(import_if4.If, { condition: needsReauthentication }, /* @__PURE__ */ React.createElement(NeedsReauthenticationAlert, null)), /* @__PURE__ */ React.createElement(
      import_form4.FormField,
      {
        name: "newPassword",
        render: ({ field }) => {
          return /* @__PURE__ */ React.createElement(import_form4.FormItem, null, /* @__PURE__ */ React.createElement(import_form4.FormLabel, null, /* @__PURE__ */ React.createElement(import_label.Label, null, "\u65B0\u3057\u3044\u30D1\u30B9\u30EF\u30FC\u30C9")), /* @__PURE__ */ React.createElement(import_form4.FormControl, null, /* @__PURE__ */ React.createElement(
            import_input4.Input,
            {
              "data-test": "account-password-form-password-input",
              required: true,
              type: "password",
              ...field
            }
          )), /* @__PURE__ */ React.createElement(import_form4.FormMessage, null));
        }
      }
    ), /* @__PURE__ */ React.createElement(
      import_form4.FormField,
      {
        name: "repeatPassword",
        render: ({ field }) => {
          return /* @__PURE__ */ React.createElement(import_form4.FormItem, null, /* @__PURE__ */ React.createElement(import_form4.FormLabel, null, /* @__PURE__ */ React.createElement(import_label.Label, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u306E\u78BA\u8A8D")), /* @__PURE__ */ React.createElement(import_form4.FormControl, null, /* @__PURE__ */ React.createElement(
            import_input4.Input,
            {
              "data-test": "account-password-form-repeat-password-input",
              required: true,
              type: "password",
              ...field
            }
          )), /* @__PURE__ */ React.createElement(import_form4.FormDescription, null, "\u78BA\u8A8D\u306E\u305F\u3081\u3001\u65B0\u3057\u3044\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u3082\u3046\u4E00\u5EA6\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"), /* @__PURE__ */ React.createElement(import_form4.FormMessage, null));
        }
      }
    ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_button5.Button, { disabled: updateUserMutation.isPending }, "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u66F4\u65B0")))
  ));
};
function SuccessAlert() {
  return /* @__PURE__ */ React.createElement(import_alert4.Alert, { variant: "success" }, /* @__PURE__ */ React.createElement(import_lucide_react3.Check, { className: "h-4" }), /* @__PURE__ */ React.createElement(import_alert4.AlertTitle, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F"), /* @__PURE__ */ React.createElement(import_alert4.AlertDescription, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\u6B63\u5E38\u306B\u66F4\u65B0\u3055\u308C\u307E\u3057\u305F"));
}
function NeedsReauthenticationAlert() {
  return /* @__PURE__ */ React.createElement(import_alert4.Alert, { variant: "default" }, /* @__PURE__ */ React.createElement(import_react_icons4.ExclamationTriangleIcon, { className: "h-4" }), /* @__PURE__ */ React.createElement(import_alert4.AlertTitle, null, "\u518D\u8A8D\u8A3C\u304C\u5FC5\u8981\u3067\u3059"), /* @__PURE__ */ React.createElement(import_alert4.AlertDescription, null, "\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u306E\u305F\u3081\u3001\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u66F4\u65B0\u3059\u308B\u306B\u306F\u518D\u5EA6\u30ED\u30B0\u30A4\u30F3\u304C\u5FC5\u8981\u3067\u3059"));
}

// src/components/password/update-password-container.tsx
function UpdatePasswordFormContainer(props) {
  const { data: user, isPending } = (0, import_use_user2.useUser)();
  if (isPending) {
    return /* @__PURE__ */ React.createElement(import_loading_overlay2.LoadingOverlay, { fullPage: false });
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
  return /* @__PURE__ */ React.createElement(import_alert5.Alert, { variant: "default" }, "\u30BD\u30FC\u30B7\u30E3\u30EB\u30ED\u30B0\u30A4\u30F3\u3092\u4F7F\u7528\u3057\u3066\u3044\u308B\u305F\u3081\u3001\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u66F4\u65B0\u3067\u304D\u307E\u305B\u3093\u3002");
}

// src/components/update-account-details-form.tsx
var import_zod10 = require("@hookform/resolvers/zod");
var import_react_hook_form5 = require("react-hook-form");
var import_sonner5 = require("sonner");
var import_button6 = require("@kit/ui/button");
var import_form5 = require("@kit/ui/form");
var import_input5 = require("@kit/ui/input");

// src/hooks/use-update-account.ts
var import_react_query4 = require("@tanstack/react-query");
var import_use_supabase4 = require("@kit/supabase/hooks/use-supabase");
function useUpdateAccountData(accountId) {
  const client = (0, import_use_supabase4.useSupabase)();
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
  return (0, import_react_query4.useMutation)({
    mutationKey,
    mutationFn
  });
}

// src/schema/account-details.schema.ts
var import_zod9 = require("zod");
var AccountDetailsSchema = import_zod9.z.object({
  displayName: import_zod9.z.string().min(2).max(100)
});

// src/components/update-account-details-form.tsx
function UpdateAccountDetailsForm({
  displayName,
  onUpdate,
  userId
}) {
  const updateAccountMutation = useUpdateAccountData(userId);
  const form = (0, import_react_hook_form5.useForm)({
    resolver: (0, import_zod10.zodResolver)(AccountDetailsSchema),
    defaultValues: {
      displayName
    }
  });
  const onSubmit = ({ displayName: displayName2 }) => {
    const data = { full_name: displayName2 };
    const promise = updateAccountMutation.mutateAsync(data).then(() => {
      onUpdate(data);
    });
    return import_sonner5.toast.promise(() => promise, {
      success: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F",
      error: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u306E\u66F4\u65B0\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
      loading: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u3092\u66F4\u65B0\u4E2D..."
    });
  };
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-8" }, /* @__PURE__ */ React.createElement(import_form5.Form, { ...form }, /* @__PURE__ */ React.createElement(
    "form",
    {
      "data-test": "update-account-name-form",
      className: "flex flex-col space-y-4",
      onSubmit: form.handleSubmit(onSubmit)
    },
    /* @__PURE__ */ React.createElement(
      import_form5.FormField,
      {
        name: "displayName",
        render: ({ field }) => /* @__PURE__ */ React.createElement(import_form5.FormItem, null, /* @__PURE__ */ React.createElement(import_form5.FormLabel, null, "\u8868\u793A\u540D"), /* @__PURE__ */ React.createElement(import_form5.FormControl, null, /* @__PURE__ */ React.createElement(
          import_input5.Input,
          {
            "data-test": "account-display-name",
            minLength: 2,
            placeholder: "",
            maxLength: 100,
            ...field
          }
        )), /* @__PURE__ */ React.createElement(import_form5.FormMessage, null))
      }
    ),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_button6.Button, { disabled: updateAccountMutation.isPending }, "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u3092\u66F4\u65B0"))
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
var import_react5 = require("react");
var import_sonner6 = require("sonner");
var import_use_supabase5 = require("@kit/supabase/hooks/use-supabase");
var import_image_uploader = require("@kit/ui/image-uploader");
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
  const client = (0, import_use_supabase5.useSupabase)();
  const createToaster = (0, import_react5.useCallback)((promise) => {
    return import_sonner6.toast.promise(promise, {
      success: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u753B\u50CF\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F",
      error: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u753B\u50CF\u306E\u66F4\u65B0\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
      loading: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u753B\u50CF\u3092\u66F4\u65B0\u4E2D..."
    });
  }, []);
  const onValueChange = (0, import_react5.useCallback)(
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
  return /* @__PURE__ */ React.createElement(import_image_uploader.ImageUploader, { value: props.pictureUrl, onValueChange }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u753B\u50CF"), /* @__PURE__ */ React.createElement("span", { className: "text-xs" }, "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u753B\u50CF\u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u307E\u305F\u306F\u5909\u66F4\u3067\u304D\u307E\u3059")));
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
    return /* @__PURE__ */ React.createElement(import_loading_overlay3.LoadingOverlay, { fullPage: true });
  }
  return /* @__PURE__ */ React.createElement("div", { className: "flex w-full flex-col space-y-4 pb-32" }, /* @__PURE__ */ React.createElement(import_card.Card, null, /* @__PURE__ */ React.createElement(import_card.CardHeader, null, /* @__PURE__ */ React.createElement(import_card.CardTitle, null, "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u753B\u50CF"), /* @__PURE__ */ React.createElement(import_card.CardDescription, null, "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u753B\u50CF\u3092\u5909\u66F4\u3067\u304D\u307E\u3059")), /* @__PURE__ */ React.createElement(import_card.CardContent, null, /* @__PURE__ */ React.createElement(
    UpdateAccountImageContainer,
    {
      user: {
        pictureUrl: user.data.picture_url,
        id: user.data.id
      }
    }
  ))), /* @__PURE__ */ React.createElement(import_card.Card, null, /* @__PURE__ */ React.createElement(import_card.CardHeader, null, /* @__PURE__ */ React.createElement(import_card.CardTitle, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u540D"), /* @__PURE__ */ React.createElement(import_card.CardDescription, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306B\u8868\u793A\u3055\u308C\u308B\u540D\u524D\u3092\u5909\u66F4\u3067\u304D\u307E\u3059")), /* @__PURE__ */ React.createElement(import_card.CardContent, null, /* @__PURE__ */ React.createElement(UpdateAccountDetailsFormContainer, { user: user.data }))), /* @__PURE__ */ React.createElement(import_if5.If, { condition: supportsLanguageSelection }, /* @__PURE__ */ React.createElement(import_card.Card, null, /* @__PURE__ */ React.createElement(import_card.CardHeader, null, /* @__PURE__ */ React.createElement(import_card.CardTitle, null, "\u8A00\u8A9E\u8A2D\u5B9A"), /* @__PURE__ */ React.createElement(import_card.CardDescription, null, "\u8868\u793A\u8A00\u8A9E\u3092\u5909\u66F4\u3067\u304D\u307E\u3059")), /* @__PURE__ */ React.createElement(import_card.CardContent, null, /* @__PURE__ */ React.createElement(import_language_selector.LanguageSelector, null)))), /* @__PURE__ */ React.createElement(import_card.Card, null, /* @__PURE__ */ React.createElement(import_card.CardHeader, null, /* @__PURE__ */ React.createElement(import_card.CardTitle, null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306E\u5909\u66F4"), /* @__PURE__ */ React.createElement(import_card.CardDescription, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306B\u767B\u9332\u3055\u308C\u3066\u3044\u308B\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u5909\u66F4\u3067\u304D\u307E\u3059")), /* @__PURE__ */ React.createElement(import_card.CardContent, null, /* @__PURE__ */ React.createElement(UpdateEmailFormContainer, { callbackPath: props.paths.callback }))), /* @__PURE__ */ React.createElement(import_if5.If, { condition: props.features.enablePasswordUpdate }, /* @__PURE__ */ React.createElement(import_card.Card, null, /* @__PURE__ */ React.createElement(import_card.CardHeader, null, /* @__PURE__ */ React.createElement(import_card.CardTitle, null, "\u30D1\u30B9\u30EF\u30FC\u30C9\u306E\u5909\u66F4"), /* @__PURE__ */ React.createElement(import_card.CardDescription, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u5909\u66F4\u3067\u304D\u307E\u3059")), /* @__PURE__ */ React.createElement(import_card.CardContent, null, /* @__PURE__ */ React.createElement(UpdatePasswordFormContainer, { callbackPath: props.paths.callback })))), /* @__PURE__ */ React.createElement(import_card.Card, null, /* @__PURE__ */ React.createElement(import_card.CardHeader, null, /* @__PURE__ */ React.createElement(import_card.CardTitle, null, "\u4E8C\u6BB5\u968E\u8A8D\u8A3C"), /* @__PURE__ */ React.createElement(import_card.CardDescription, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u3092\u5F37\u5316\u3059\u308B\u305F\u3081\u3001\u4E8C\u6BB5\u968E\u8A8D\u8A3C\u3092\u8A2D\u5B9A\u3067\u304D\u307E\u3059")), /* @__PURE__ */ React.createElement(import_card.CardContent, null, /* @__PURE__ */ React.createElement(MultiFactorAuthFactorsList, { userId: props.userId }))), /* @__PURE__ */ React.createElement(import_if5.If, { condition: props.features.enableAccountDeletion }, /* @__PURE__ */ React.createElement(import_card.Card, { className: "border-destructive" }, /* @__PURE__ */ React.createElement(import_card.CardHeader, null, /* @__PURE__ */ React.createElement(import_card.CardTitle, null, "\u5371\u967A\u306A\u64CD\u4F5C"), /* @__PURE__ */ React.createElement(import_card.CardDescription, null, "\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u524A\u9664\u306A\u3069\u3001\u53D6\u308A\u6D88\u3057\u3067\u304D\u306A\u3044\u64CD\u4F5C\u3092\u884C\u3048\u307E\u3059")), /* @__PURE__ */ React.createElement(import_card.CardContent, null, /* @__PURE__ */ React.createElement(AccountDangerZone, null)))));
}
function useSupportMultiLanguage() {
  const { i18n } = (0, import_react_i18next5.useTranslation)();
  const langs = i18n?.options?.supportedLngs ?? [];
  const supportedLangs = langs.filter((lang) => lang !== "cimode");
  return supportedLangs.length > 1;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PersonalAccountSettingsContainer
});
