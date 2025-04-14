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
export {
  verifyCaptchaToken
};
