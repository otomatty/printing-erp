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

// src/captcha/server/index.ts
var server_exports = {};
__export(server_exports, {
  verifyCaptchaToken: () => verifyCaptchaToken
});
module.exports = __toCommonJS(server_exports);

// ../../../node_modules/server-only/index.js
throw new Error(
  "This module cannot be imported from a Client Component module. It should only be used from a Server Component."
);

// src/captcha/server/verify-captcha.tsx
var verifyEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
var CAPTCHA_SECRET_TOKEN = process.env.CAPTCHA_SECRET_TOKEN;
async function verifyCaptchaToken(token) {
  if (!CAPTCHA_SECRET_TOKEN) {
    throw new Error("CAPTCHA_SECRET_TOKEN is not set");
  }
  const formData = new FormData();
  formData.append("secret", CAPTCHA_SECRET_TOKEN);
  formData.append("response", token);
  const res = await fetch(verifyEndpoint, {
    method: "POST",
    body: formData
  });
  if (!res.ok) {
    console.error("Captcha failed:", res.statusText);
    throw new Error("Failed to verify CAPTCHA token");
  }
  const data = await res.json();
  if (!data.success) {
    throw new Error("Invalid CAPTCHA token");
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  verifyCaptchaToken
});
