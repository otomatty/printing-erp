import react__default from 'react';

/**
 * 要素を円軌道上に配置し、回転アニメーションを適用するコンポーネント。
 * 子要素を等間隔で円軌道上に配置し、アニメーションさせることができます。
 *
 * @example
 * ```tsx
 * <OrbitingCircles radius={200} speed={1.5}>
 *   <div>要素1</div>
 *   <div>要素2</div>
 *   <div>要素3</div>
 * </OrbitingCircles>
 * ```
 */
interface OrbitingCirclesProps extends react__default.HTMLAttributes<HTMLDivElement> {
    /**
     * カスタムスタイルを適用するためのCSSクラス名
     * @optional
     */
    className?: string;
    /**
     * 軌道上に配置する子要素
     * 各子要素は等間隔で円軌道上に配置されます
     * @optional
     */
    children?: react__default.ReactNode;
    /**
     * アニメーションの方向を反転させるかどうか
     * - true: 反時計回り
     * - false: 時計回り
     * @optional
     */
    reverse?: boolean;
    /**
     * アニメーションの基本継続時間（秒）
     * 実際の継続時間は speed パラメータによって調整されます
     * @default 20
     */
    duration?: number;
    /**
     * 円軌道の半径（ピクセル）
     * @default 160
     */
    radius?: number;
    /**
     * 軌道のパスを表示するかどうか
     * - true: 軌道を表示
     * - false: 軌道を非表示
     * @default true
     */
    path?: boolean;
    /**
     * 軌道上の各アイコン（子要素）のサイズ（ピクセル）
     * @default 30
     */
    iconSize?: number;
    /**
     * アニメーションの速度倍率
     * 値が大きいほど速く、小さいほど遅くなります
     * @default 1
     */
    speed?: number;
}
/**
 * 円軌道上でアニメーションする要素を生成するコンポーネント
 * @param props - OrbitingCirclesPropsインターフェースに定義されたプロパティ
 * @returns 円軌道アニメーションを適用した要素群
 */
declare function OrbitingCircles({ className, children, reverse, duration, radius, path, iconSize, speed, ...props }: OrbitingCirclesProps): react__default.JSX.Element;

export { OrbitingCircles, type OrbitingCirclesProps };
