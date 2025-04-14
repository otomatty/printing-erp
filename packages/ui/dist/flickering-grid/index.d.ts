import react__default from 'react';

interface FlickeringGridProps extends react__default.HTMLAttributes<HTMLDivElement> {
    squareSize?: number;
    gridGap?: number;
    flickerChance?: number;
    color?: string;
    width?: number;
    height?: number;
    className?: string;
    maxOpacity?: number;
}
declare const FlickeringGrid: react__default.FC<FlickeringGridProps>;

export { FlickeringGrid };
