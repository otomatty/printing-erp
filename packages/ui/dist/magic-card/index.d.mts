import react__default from 'react';

/**
 * マウスの動きに応じてグラデーションエフェクトを表示するカードコンポーネント
 *
 * @example
 * ```tsx
 * // 基本的な使用方法
 * <MagicCard>
 *   <div className="p-6">
 *     <h3>カードのタイトル</h3>
 *     <p>カードの内容</p>
 *   </div>
 * </MagicCard>
 *
 * // カスタマイズ例
 * <MagicCard
 *   gradientSize={300}
 *   gradientColor="#333"
 *   gradientOpacity={0.7}
 *   gradientFrom="#FF0000"
 *   gradientTo="#00FF00"
 *   className="w-full h-64"
 * >
 *   <div className="p-6">
 *     <h3>カスタマイズされたカード</h3>
 *     <p>グラデーションの色やサイズをカスタマイズ</p>
 *   </div>
 * </MagicCard>
 * ```
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - カード内に表示するコンテンツ
 * @param {string} [props.className] - 追加のスタイリングクラス
 * @param {number} [props.gradientSize=200] - グラデーションの円の大きさ（ピクセル）
 * @param {string} [props.gradientColor="#262626"] - グラデーションのベースカラー
 * @param {number} [props.gradientOpacity=0.8] - グラデーションの不透明度（0-1）
 * @param {string} [props.gradientFrom="#D0A900"] - グラデーションの開始色
 * @param {string} [props.gradientTo="#FFF9E6"] - グラデーションの終了色
 *
 * @returns {JSX.Element} マウスインタラクションに反応するカードコンポーネント
 */

interface MagicCardProps extends react__default.HTMLAttributes<HTMLDivElement> {
    gradientSize?: number;
    gradientColor?: string;
    gradientOpacity?: number;
    gradientFrom?: string;
    gradientTo?: string;
}
declare function MagicCard({ children, className, gradientSize, gradientColor, gradientOpacity, gradientFrom, gradientTo, }: MagicCardProps): react__default.JSX.Element;

export { MagicCard };
