import * as react from 'react';

interface AnimatedCircularProgressBarProps {
    max: number;
    value: number;
    min: number;
    gaugePrimaryColor: string;
    gaugeSecondaryColor: string;
    className?: string;
}
declare function AnimatedCircularProgressBar({ max, min, value, gaugePrimaryColor, gaugeSecondaryColor, className, }: AnimatedCircularProgressBarProps): react.JSX.Element;

export { AnimatedCircularProgressBar };
