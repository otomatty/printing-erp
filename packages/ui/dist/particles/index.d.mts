import react__default, { ComponentPropsWithoutRef } from 'react';

interface ParticlesProps extends ComponentPropsWithoutRef<'div'> {
    className?: string;
    quantity?: number;
    staticity?: number;
    ease?: number;
    size?: number;
    refresh?: boolean;
    color?: string;
    vx?: number;
    vy?: number;
}
declare const Particles: react__default.FC<ParticlesProps>;

export { Particles };
