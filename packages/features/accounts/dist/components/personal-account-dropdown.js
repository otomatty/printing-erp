"use strict";
"use client";
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

// src/components/personal-account-dropdown.tsx
var personal_account_dropdown_exports = {};
__export(personal_account_dropdown_exports, {
  PersonalAccountDropdown: () => PersonalAccountDropdown
});
module.exports = __toCommonJS(personal_account_dropdown_exports);
var import_react2 = require("react");
var import_link = __toESM(require("next/link"));
var import_lucide_react = require("lucide-react");
var import_dropdown_menu = require("@kit/ui/dropdown-menu");
var import_if = require("@kit/ui/if");
var import_mode_toggle = require("@kit/ui/mode-toggle");
var import_profile_avatar = require("@kit/ui/profile-avatar");
var import_utils = require("@kit/ui/utils");

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

// src/components/personal-account-dropdown.tsx
function PersonalAccountDropdown({
  className,
  user,
  signOutRequested,
  showProfileName = true,
  paths,
  features,
  account
}) {
  const personalAccountData = usePersonalAccountData(user.id, account);
  const signedInAsLabel = (0, import_react2.useMemo)(() => {
    const email = user?.email ?? void 0;
    const phone = user?.phone ?? void 0;
    return email ?? phone;
  }, [user]);
  const displayName = personalAccountData?.data?.name ?? account?.name ?? user?.email ?? "";
  return /* @__PURE__ */ React.createElement(import_dropdown_menu.DropdownMenu, null, /* @__PURE__ */ React.createElement(
    import_dropdown_menu.DropdownMenuTrigger,
    {
      "aria-label": "Open your profile menu",
      "data-test": "account-dropdown-trigger",
      className: (0, import_utils.cn)(
        "animate-in fade-in focus:outline-primary flex cursor-pointer items-center duration-500 group-data-[minimized=true]:px-0",
        className ?? "",
        {
          ["active:bg-secondary/50 items-center gap-x-4 rounded-md hover:bg-secondary p-2 transition-colors"]: showProfileName
        }
      )
    },
    /* @__PURE__ */ React.createElement(
      import_profile_avatar.ProfileAvatar,
      {
        className: "rounded-md",
        fallbackClassName: "rounded-md border",
        displayName: displayName ?? user?.email ?? "",
        pictureUrl: personalAccountData?.data?.picture_url
      }
    ),
    /* @__PURE__ */ React.createElement(import_if.If, { condition: showProfileName }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "fade-in animate-in flex w-full flex-col truncate text-left group-data-[minimized=true]:hidden"
      },
      /* @__PURE__ */ React.createElement(
        "span",
        {
          "data-test": "account-dropdown-display-name",
          className: "truncate text-sm"
        },
        displayName
      ),
      /* @__PURE__ */ React.createElement(
        "span",
        {
          "data-test": "account-dropdown-email",
          className: "text-muted-foreground truncate text-xs"
        },
        signedInAsLabel
      )
    ), /* @__PURE__ */ React.createElement(
      import_lucide_react.ChevronsUpDown,
      {
        className: "text-muted-foreground mr-1 h-8 group-data-[minimized=true]:hidden"
      }
    ))
  ), /* @__PURE__ */ React.createElement(import_dropdown_menu.DropdownMenuContent, { className: "xl:!min-w-[15rem]" }, /* @__PURE__ */ React.createElement(import_dropdown_menu.DropdownMenuItem, { className: "!h-10 rounded-none" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "flex flex-col justify-start truncate text-left text-xs"
    },
    /* @__PURE__ */ React.createElement("div", { className: "text-muted-foreground" }, "\u30ED\u30B0\u30A4\u30F3\u4E2D\u306E\u30A2\u30AB\u30A6\u30F3\u30C8"),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "block truncate" }, signedInAsLabel))
  )), /* @__PURE__ */ React.createElement(import_dropdown_menu.DropdownMenuSeparator, null), /* @__PURE__ */ React.createElement(import_dropdown_menu.DropdownMenuItem, { asChild: true }, /* @__PURE__ */ React.createElement(
    import_link.default,
    {
      className: "s-full flex cursor-pointer items-center space-x-2",
      href: paths.home
    },
    /* @__PURE__ */ React.createElement(import_lucide_react.Home, { className: "h-5" }),
    /* @__PURE__ */ React.createElement("span", null, "\u30DB\u30FC\u30E0")
  )), /* @__PURE__ */ React.createElement(import_dropdown_menu.DropdownMenuSeparator, null), /* @__PURE__ */ React.createElement(import_if.If, { condition: features.enableThemeToggle }, /* @__PURE__ */ React.createElement(import_mode_toggle.SubMenuModeToggle, null)), /* @__PURE__ */ React.createElement(import_dropdown_menu.DropdownMenuSeparator, null), /* @__PURE__ */ React.createElement(
    import_dropdown_menu.DropdownMenuItem,
    {
      "data-test": "account-dropdown-sign-out",
      className: "cursor-pointer",
      onClick: signOutRequested
    },
    /* @__PURE__ */ React.createElement("span", { className: "flex w-full items-center space-x-2" }, /* @__PURE__ */ React.createElement(import_lucide_react.LogOut, { className: "h-5" }), /* @__PURE__ */ React.createElement("span", null, "\u30ED\u30B0\u30A2\u30A6\u30C8"))
  )));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PersonalAccountDropdown
});
