import * as react from 'react';
import { Variants } from 'motion/react';

interface FlipTextProps {
    word: string;
    duration?: number;
    delayMultiple?: number;
    framerProps?: Variants;
    className?: string;
}
declare function FlipText({ word, duration, delayMultiple, framerProps, className, }: FlipTextProps): react.JSX.Element;

export { FlipText };
