import * as React from 'react';
import { OTPInput } from 'input-otp';

declare const InputOTP: React.FC<React.ComponentPropsWithoutRef<typeof OTPInput>>;
declare const InputOTPGroup: React.FC<React.ComponentPropsWithoutRef<'div'>>;
declare const InputOTPSlot: React.FC<React.ComponentPropsWithRef<'div'> & {
    index: number;
}>;
declare const InputOTPSeparator: React.FC<React.ComponentPropsWithoutRef<'div'>>;

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
