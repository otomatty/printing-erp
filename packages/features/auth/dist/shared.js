"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/shared.ts
var shared_exports = {};
__export(shared_exports, {
  AuthLayoutShell: () => AuthLayoutShell
});
module.exports = __toCommonJS(shared_exports);

// src/components/auth-layout.tsx
function AuthLayoutShell({
  children,
  Logo
}) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "flex h-screen flex-col items-center justify-center bg-background lg:bg-muted/30 gap-y-10 lg:gap-y-8 animate-in fade-in slide-in-from-top-16 zoom-in-95 duration-1000"
    },
    Logo ? /* @__PURE__ */ React.createElement(Logo, null) : null,
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "bg-background flex w-full max-w-[23rem] flex-col gap-y-6 rounded-lg px-6 md:w-8/12 md:px-8 md:py-6 lg:w-5/12 lg:px-8 xl:w-4/12 xl:gap-y-8 xl:py-8"
      },
      children
    )
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthLayoutShell
});
