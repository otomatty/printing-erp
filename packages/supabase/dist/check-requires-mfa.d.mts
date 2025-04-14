interface MfaCheckerClient {
    auth: {
        mfa: {
            getAuthenticatorAssuranceLevel(): Promise<{
                data: {
                    currentLevel: string | null;
                    nextLevel: string | null;
                };
                error: Error | null;
            }>;
        };
        suppressGetSessionWarning?: boolean;
    };
}
/**
 * @name checkRequiresMultiFactorAuthentication
 * @description Checks if the current session requires multi-factor authentication.
 * We do it by checking that the next assurance level is AAL2 and that the current assurance level is not AAL2.
 * @param client - MfaCheckerClient 型のクライアント
 */
declare function checkRequiresMultiFactorAuthentication(client: MfaCheckerClient): Promise<boolean>;

export { type MfaCheckerClient, checkRequiresMultiFactorAuthentication };
