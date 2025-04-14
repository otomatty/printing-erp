import * as React from 'react';
import { ComponentPropsWithoutRef } from 'react';

interface NumberTickerProps extends ComponentPropsWithoutRef<'span'> {
    value: number;
    direction?: 'up' | 'down';
    delay?: number;
    decimalPlaces?: number;
}
declare function NumberTicker({ value, direction, delay, className, decimalPlaces, ...props }: NumberTickerProps): React.JSX.Element;

export { NumberTicker };
