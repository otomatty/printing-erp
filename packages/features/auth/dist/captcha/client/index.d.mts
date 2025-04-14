import * as react from 'react';
import { TurnstileProps, TurnstileInstance } from '@marsidev/react-turnstile';

declare function CaptchaTokenSetter(props: {
    siteKey: string | undefined;
    options?: TurnstileProps;
}): react.JSX.Element | null;

/**
 * @name useCaptchaToken
 * @description A hook to get the captcha token and reset function
 * @returns The captcha token and reset function
 */
declare function useCaptchaToken(): {
    captchaToken: string;
    resetCaptchaToken: () => void | undefined;
};

declare const Captcha: react.Context<{
    token: string;
    setToken: (token: string) => void;
    instance: TurnstileInstance | null;
    setInstance: (ref: TurnstileInstance) => void;
}>;
declare function CaptchaProvider(props: {
    children: React.ReactNode;
}): react.JSX.Element;

export { Captcha, CaptchaProvider, CaptchaTokenSetter, useCaptchaToken };
