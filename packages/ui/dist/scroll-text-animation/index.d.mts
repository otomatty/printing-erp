import * as react from 'react';

interface ScrollTextAnimationProps {
    text: string;
    className?: string;
    initialFontSize?: number;
    onAnimationComplete?: () => void;
}
/**
 * スクロールに応じてテキストが拡大し、3D効果で奥に吸い込まれていくようなアニメーションを実現するコンポーネント
 * SVGテキストを使用することで、拡大時もクリアな表示を維持
 * @param text - アニメーションするテキスト
 * @param className - 追加のスタイルクラス
 * @param initialFontSize - 初期フォントサイズ（px）
 * @param onAnimationComplete - アニメーション完了時のコールバック
 */
declare const ScrollTextAnimation: ({ text, className, initialFontSize, onAnimationComplete, }: ScrollTextAnimationProps) => react.JSX.Element;

export { ScrollTextAnimation, ScrollTextAnimation as default };
