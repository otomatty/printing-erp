import * as react from 'react';

interface OrbitAnimationProps {
    className?: string;
    radius?: number;
    speed?: number;
}
/**
 * 円周上を点が回転するアニメーションコンポーネント
 * 三角関数を使用して点の位置を計算
 * 点のサイズを考慮して円の半径を調整し、常にコンテナ内に収まるようにする
 * @param className - 追加のスタイルクラス
 * @param radius - 円の半径（ピクセル）
 * @param speed - 回転速度（ラジアン/フレーム）
 */
declare const OrbitAnimation: ({ className, radius, speed, }: OrbitAnimationProps) => react.JSX.Element;

export { OrbitAnimation };
