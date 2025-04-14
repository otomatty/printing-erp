"use client";
import {
  usePersonalAccountData
} from "../chunk-AEEKUM22.mjs";

// src/components/personal-account-dropdown.tsx
import { useMemo } from "react";
import Link from "next/link";
import { ChevronsUpDown, Home, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@kit/ui/dropdown-menu";
import { If } from "@kit/ui/if";
import { SubMenuModeToggle } from "@kit/ui/mode-toggle";
import { ProfileAvatar } from "@kit/ui/profile-avatar";
import { cn } from "@kit/ui/utils";
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
  const signedInAsLabel = useMemo(() => {
    const email = user?.email ?? void 0;
    const phone = user?.phone ?? void 0;
    return email ?? phone;
  }, [user]);
  const displayName = personalAccountData?.data?.name ?? account?.name ?? user?.email ?? "";
  return /* @__PURE__ */ React.createElement(DropdownMenu, null, /* @__PURE__ */ React.createElement(
    DropdownMenuTrigger,
    {
      "aria-label": "Open your profile menu",
      "data-test": "account-dropdown-trigger",
      className: cn(
        "animate-in fade-in focus:outline-primary flex cursor-pointer items-center duration-500 group-data-[minimized=true]:px-0",
        className ?? "",
        {
          ["active:bg-secondary/50 items-center gap-x-4 rounded-md hover:bg-secondary p-2 transition-colors"]: showProfileName
        }
      )
    },
    /* @__PURE__ */ React.createElement(
      ProfileAvatar,
      {
        className: "rounded-md",
        fallbackClassName: "rounded-md border",
        displayName: displayName ?? user?.email ?? "",
        pictureUrl: personalAccountData?.data?.picture_url
      }
    ),
    /* @__PURE__ */ React.createElement(If, { condition: showProfileName }, /* @__PURE__ */ React.createElement(
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
      ChevronsUpDown,
      {
        className: "text-muted-foreground mr-1 h-8 group-data-[minimized=true]:hidden"
      }
    ))
  ), /* @__PURE__ */ React.createElement(DropdownMenuContent, { className: "xl:!min-w-[15rem]" }, /* @__PURE__ */ React.createElement(DropdownMenuItem, { className: "!h-10 rounded-none" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "flex flex-col justify-start truncate text-left text-xs"
    },
    /* @__PURE__ */ React.createElement("div", { className: "text-muted-foreground" }, "\u30ED\u30B0\u30A4\u30F3\u4E2D\u306E\u30A2\u30AB\u30A6\u30F3\u30C8"),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "block truncate" }, signedInAsLabel))
  )), /* @__PURE__ */ React.createElement(DropdownMenuSeparator, null), /* @__PURE__ */ React.createElement(DropdownMenuItem, { asChild: true }, /* @__PURE__ */ React.createElement(
    Link,
    {
      className: "s-full flex cursor-pointer items-center space-x-2",
      href: paths.home
    },
    /* @__PURE__ */ React.createElement(Home, { className: "h-5" }),
    /* @__PURE__ */ React.createElement("span", null, "\u30DB\u30FC\u30E0")
  )), /* @__PURE__ */ React.createElement(DropdownMenuSeparator, null), /* @__PURE__ */ React.createElement(If, { condition: features.enableThemeToggle }, /* @__PURE__ */ React.createElement(SubMenuModeToggle, null)), /* @__PURE__ */ React.createElement(DropdownMenuSeparator, null), /* @__PURE__ */ React.createElement(
    DropdownMenuItem,
    {
      "data-test": "account-dropdown-sign-out",
      className: "cursor-pointer",
      onClick: signOutRequested
    },
    /* @__PURE__ */ React.createElement("span", { className: "flex w-full items-center space-x-2" }, /* @__PURE__ */ React.createElement(LogOut, { className: "h-5" }), /* @__PURE__ */ React.createElement("span", null, "\u30ED\u30B0\u30A2\u30A6\u30C8"))
  )));
}
export {
  PersonalAccountDropdown
};
