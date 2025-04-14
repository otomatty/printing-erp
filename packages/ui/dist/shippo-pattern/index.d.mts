import * as react from 'react';

/**
 * 七宝柄の背景パターン
 * @param className - クラス名
 * @param color - 色
 * @param size - サイズ
 */
interface ShippoPatternProps {
    className?: string;
    color?: string;
    size?: number;
}
declare function ShippoPattern({ className, color, size, }: ShippoPatternProps): react.JSX.Element;

export { ShippoPattern };
