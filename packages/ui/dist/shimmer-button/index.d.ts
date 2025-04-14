import react__default, { ComponentPropsWithoutRef } from 'react';

interface ShimmerButtonProps extends ComponentPropsWithoutRef<'button'> {
    shimmerColor?: string;
    shimmerSize?: string;
    borderRadius?: string;
    shimmerDuration?: string;
    background?: string;
    className?: string;
    children?: react__default.ReactNode;
}
declare const ShimmerButton: {
    ({ shimmerColor, shimmerSize, shimmerDuration, borderRadius, background, className, children, ...props }: ShimmerButtonProps): react__default.JSX.Element;
    displayName: string;
};

export { ShimmerButton, type ShimmerButtonProps };
