import * as react from 'react';

interface GridPatternProps extends React.SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    squares?: Array<[x: number, y: number]>;
    strokeDasharray?: string;
    className?: string;
    [key: string]: unknown;
}
declare function GridPattern({ width, height, x, y, strokeDasharray, squares, className, ...props }: GridPatternProps): react.JSX.Element;

export { GridPattern };
