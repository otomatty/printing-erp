import react__default from 'react';

interface MeteorsProps {
    number?: number;
    minDelay?: number;
    maxDelay?: number;
    minDuration?: number;
    maxDuration?: number;
    angle?: number;
    className?: string;
}
declare const Meteors: ({ number, minDelay, maxDelay, minDuration, maxDuration, angle, className, }: MeteorsProps) => react__default.JSX.Element;

export { Meteors };
