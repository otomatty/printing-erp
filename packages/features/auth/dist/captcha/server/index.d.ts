/**
 * @name verifyCaptchaToken
 * @description Verify the CAPTCHA token with the CAPTCHA service
 * @param token - The CAPTCHA token to verify
 */
declare function verifyCaptchaToken(token: string): Promise<void>;

export { verifyCaptchaToken };
