import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * BentoGridコンポーネントのプロパティ定義
 * @interface BentoGridProps
 * @extends {ComponentPropsWithoutRef<"div">}
 * @property {ReactNode} children - グリッド内に表示するBentoCardコンポーネント
 * @property {string} [className] - 追加のスタイリングクラス
 */
interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
    children: ReactNode;
    className?: string;
}
/**
 * BentoCardコンポーネントのプロパティ定義
 * @interface BentoCardProps
 * @extends {ComponentPropsWithoutRef<"div">}
 * @property {string} name - カードのタイトル
 * @property {string} className - スタイリングクラス（グリッド内での位置やサイズを制御）
 * @property {ReactNode} background - カードの背景に表示するコンテンツ
 * @property {React.ElementType} Icon - カードに表示するアイコンコンポーネント
 * @property {string} description - カードの説明文
 * @property {string} href - クリック時の遷移先URL
 * @property {string} cta - コールトゥアクションのテキスト
 */
interface BentoCardProps extends ComponentPropsWithoutRef<'div'> {
    name: string;
    className: string;
    background: ReactNode;
    Icon: React.ElementType;
    description?: string;
    href: string;
    cta: string;
}
/**
 * MagicBentoCardコンポーネントのプロパティ定義
 * BentoCardPropsを継承し、MagicCardのグラデーションプロパティを追加
 *
 * @interface MagicBentoCardProps
 * @extends {BentoCardProps}
 * @property {number} [gradientSize] - グラデーションの円の大きさ（ピクセル）
 * @property {string} [gradientColor] - グラデーションのベースカラー
 * @property {number} [gradientOpacity] - グラデーションの不透明度（0-1）
 * @property {string} [gradientFrom] - グラデーションの開始色
 * @property {string} [gradientTo] - グラデーションの終了色
 */
/**
 * ベントーグリッドレイアウトを実現するコンポーネント
 *
 * @example
 * ```tsx
 * <BentoGrid>
 *   <BentoCard
 *     name="プロジェクト1"
 *     className="md:col-span-2"
 *     background={<img src="/project1.jpg" alt="プロジェクト1" />}
 *     Icon={ProjectIcon}
 *     description="プロジェクトの説明"
 *     href="/projects/1"
 *     cta="詳細を見る"
 *   />
 *   <BentoCard ... />
 * </BentoGrid>
 * ```
 *
 * @param {BentoGridProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} ベントーグリッドコンポーネント
 */
declare const BentoGrid: ({ children, className, ...props }: BentoGridProps) => react.JSX.Element;
/**
 * グリッド内に配置する個別のカードコンポーネント
 * ホバー時にアニメーションと追加情報を表示する機能を持つ
 *
 * @example
 * ```tsx
 * <BentoCard
 *   name="プロジェクト1"
 *   className="md:col-span-2"
 *   background={<img src="/project1.jpg" alt="プロジェクト1" />}
 *   Icon={ProjectIcon}
 *   description="プロジェクトの説明文をここに記述します"
 *   href="/projects/1"
 *   cta="詳細を見る"
 * />
 * ```
 *
 * @param {BentoCardProps} props - カードコンポーネントのプロパティ
 * @returns {JSX.Element} ベントーカードコンポーネント
 */
declare const BentoCard: ({ name, className, background, Icon, description, href, cta, ...props }: BentoCardProps) => react.JSX.Element;
/**
 * マジックエフェクト付きのベントーカードコンポーネント
 * マウスの動きに応じてグラデーションエフェクトを表示
 *
 * @example
 * ```tsx
 * <MagicBentoCard
 *   name="プロジェクト"
 *   className="md:col-span-2"
 *   background={<img src="/project.jpg" alt="プロジェクト" />}
 *   Icon={ProjectIcon}
 *   description="プロジェクトの説明"
 *   href="/projects"
 *   cta="詳細を見る"
 * />
 * ```
 */
declare const MagicBentoCard: ({ name, className, background, Icon, description, href, cta, ...props }: BentoCardProps) => react.JSX.Element;

export { BentoCard, BentoGrid, MagicBentoCard };
