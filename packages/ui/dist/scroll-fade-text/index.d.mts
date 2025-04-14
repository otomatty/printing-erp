import * as react from 'react';

interface ScrollFadeTextProps {
    text: string;
    className?: string;
    fontSize?: number;
    onAnimationComplete?: () => void;
}
/**
 * スクロールに応じてテキストがフェードイン/アウトするアニメーションを実現するコンポーネント
 * SVGテキストを使用することで、高品質な表示を維持
 * @param text - アニメーションするテキスト（\nで改行可能）
 * @param className - 追加のスタイルクラス
 * @param fontSize - フォントサイズ（px）
 * @param onAnimationComplete - アニメーション完了時のコールバック
 */
declare const ScrollFadeText: ({ text, className, fontSize, onAnimationComplete, }: ScrollFadeTextProps) => react.JSX.Element;

export { ScrollFadeText, ScrollFadeText as default };
