import react__default from 'react';

interface WaveBackgroundProps {
    className?: string;
    primaryColor?: string;
    secondaryColor?: string;
}
/**
 * グラデーションウェーブの背景コンポーネント
 * - インタラクティブな波のアニメーション
 * - カスタマイズ可能なグラデーションカラー
 * - マウスインタラクション対応
 */
declare function WaveBackground({ className, primaryColor, // sky-400 with opacity
secondaryColor, }: WaveBackgroundProps): react__default.JSX.Element;

export { WaveBackground };
