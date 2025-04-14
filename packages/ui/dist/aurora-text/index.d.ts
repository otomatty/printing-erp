import { MotionProps } from 'motion/react';
import react__default from 'react';

interface AuroraTextProps extends Omit<react__default.HTMLAttributes<HTMLElement>, keyof MotionProps> {
    className?: string;
    children: react__default.ReactNode;
    as?: react__default.ElementType;
}
declare function AuroraText({ className, children, as: Component, ...props }: AuroraTextProps): react__default.JSX.Element;

export { AuroraText };
