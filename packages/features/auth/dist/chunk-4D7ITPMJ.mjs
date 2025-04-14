// src/components/auth-error-alert.tsx
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@kit/ui/alert";
function AuthErrorAlert({
  error
}) {
  if (!error) {
    return null;
  }
  const DefaultError = "\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002";
  return /* @__PURE__ */ React.createElement(Alert, { variant: "destructive" }, /* @__PURE__ */ React.createElement(ExclamationTriangleIcon, { className: "w-4" }), /* @__PURE__ */ React.createElement(AlertTitle, null, "\u8A8D\u8A3C\u30A8\u30E9\u30FC"), /* @__PURE__ */ React.createElement(AlertDescription, { "data-test": "auth-error-message" }, DefaultError));
}

// src/schemas/password.schema.ts
import { z } from "zod";
var requirements = {
  minLength: 8,
  maxLength: 99,
  specialChars: process.env.NEXT_PUBLIC_PASSWORD_REQUIRE_SPECIAL_CHARS === "true",
  numbers: process.env.NEXT_PUBLIC_PASSWORD_REQUIRE_NUMBERS === "true",
  uppercase: process.env.NEXT_PUBLIC_PASSWORD_REQUIRE_UPPERCASE === "true"
};
var PasswordSchema = z.string().min(requirements.minLength).max(requirements.maxLength);
var RefinedPasswordSchema = PasswordSchema.superRefine(
  (val, ctx) => validatePassword(val, ctx)
);
function refineRepeatPassword(data, ctx) {
  if (data.password !== data.repeatPassword) {
    ctx.addIssue({
      message: "auth:errors.passwordsDoNotMatch",
      path: ["repeatPassword"],
      code: "custom"
    });
  }
  return true;
}
function validatePassword(password, ctx) {
  if (requirements.specialChars) {
    const specialCharsCount = password.match(/[!@#$%^&*(),.?":{}|<>]/g)?.length ?? 0;
    if (specialCharsCount < 1) {
      ctx.addIssue({
        message: "auth:errors.minPasswordSpecialChars",
        code: "custom"
      });
    }
  }
  if (requirements.numbers) {
    const numbersCount = password.match(/\d/g)?.length ?? 0;
    if (numbersCount < 1) {
      ctx.addIssue({
        message: "auth:errors.minPasswordNumbers",
        code: "custom"
      });
    }
  }
  if (requirements.uppercase) {
    if (!/[A-Z]/.test(password)) {
      ctx.addIssue({
        message: "auth:errors.uppercasePassword",
        code: "custom"
      });
    }
  }
  return true;
}

export {
  AuthErrorAlert,
  PasswordSchema,
  RefinedPasswordSchema,
  refineRepeatPassword
};
