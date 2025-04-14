import react__default, { ComponentPropsWithoutRef } from 'react';

interface RippleProps extends ComponentPropsWithoutRef<'div'> {
    mainCircleSize?: number;
    mainCircleOpacity?: number;
    numCircles?: number;
}
declare const Ripple: react__default.NamedExoticComponent<RippleProps>;

export { Ripple };
