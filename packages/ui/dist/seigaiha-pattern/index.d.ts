import * as react from 'react';

interface SeigaihaPatternProps {
    className?: string;
    color?: string;
    size?: number;
    backgroundColor?: string;
    strokeWidth?: number;
}
declare function SeigaihaPattern({ className, color, backgroundColor, size, strokeWidth, }: SeigaihaPatternProps): react.JSX.Element | null;

export { SeigaihaPattern };
