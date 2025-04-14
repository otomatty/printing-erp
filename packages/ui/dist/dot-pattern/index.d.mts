import * as react from 'react';

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    cx?: number;
    cy?: number;
    cr?: number;
    className?: string;
    [key: string]: unknown;
}
declare function DotPattern({ width, height, x, y, cx, cy, cr, className, ...props }: DotPatternProps): react.JSX.Element;

export { DotPattern };
