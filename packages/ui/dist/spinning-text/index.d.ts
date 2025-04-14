import { Transition, Variants } from 'motion/react';
import react__default, { CSSProperties } from 'react';

type SpinningTextProps = {
    children: string | string[];
    style?: CSSProperties;
    duration?: number;
    className?: string;
    reverse?: boolean;
    fontSize?: number;
    radius?: number;
    transition?: Transition;
    variants?: {
        container?: Variants;
        item?: Variants;
    };
};
declare function SpinningText({ children, duration, style, className, reverse, radius, transition, variants, }: SpinningTextProps): react__default.JSX.Element;

export { SpinningText };
