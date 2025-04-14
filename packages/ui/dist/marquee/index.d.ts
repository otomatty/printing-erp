import * as react from 'react';
import { ComponentPropsWithoutRef } from 'react';

/**
 * マーキー（スクロールテキスト）アニメーションを実装するコンポーネント。
 * テキストや要素を水平または垂直方向に自動的にスクロールさせることができます。
 *
 * @example
 * ```tsx
 * <Marquee>
 *   <span>スクロールするテキスト</span>
 * </Marquee>
 * ```
 */
interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * カスタムスタイルを適用するためのCSSクラス名
     * @optional
     */
    className?: string;
    /**
     * アニメーションの方向を反転させるかどうか
     * - true: 逆方向にアニメーション
     * - false: 通常方向にアニメーション
     * @default false
     */
    reverse?: boolean;
    /**
     * ホバー時にアニメーションを一時停止するかどうか
     * - true: ホバー時にアニメーションが停止
     * - false: ホバー時もアニメーションを継続
     * @default false
     */
    pauseOnHover?: boolean;
    /**
     * マーキーで表示するコンテンツ
     * 任意のReactノードを指定可能
     * @required
     */
    children: React.ReactNode;
    /**
     * アニメーションの方向
     * - true: 垂直方向にアニメーション
     * - false: 水平方向にアニメーション
     * @default false
     */
    vertical?: boolean;
    /**
     * コンテンツを繰り返す回数
     * スムーズなループアニメーションのために使用
     * @default 4
     */
    repeat?: number;
}
/**
 * マーキーアニメーションを実装するコンポーネント
 * @param props - MarqueePropsインターフェースに定義されたプロパティ
 * @returns マーキーアニメーションを適用したdiv要素
 */
declare function Marquee({ className, reverse, pauseOnHover, children, vertical, repeat, ...props }: MarqueeProps): react.JSX.Element;

export { Marquee };
