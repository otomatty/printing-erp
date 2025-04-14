import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';

/**
 * ボタンのスタイルバリエーションを定義するための設定オブジェクトです。
 * class-variance-authorityを使用して、異なるバリアントとサイズを管理します。
 *
 * @property {object} variants - ボタンのバリアント（見た目）とサイズの設定
 * @property {object} defaultVariants - デフォルトのバリアントとサイズ
 */
declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
/**
 * ボタンコンポーネントのプロパティの型定義です。
 * HTMLButtonElementの属性とボタンバリアントのプロパティを継承します。
 *
 * @property {boolean} [asChild] - 子要素をボタンとして扱うかどうか
 * @property {string} [variant] - ボタンの見た目のバリアント（'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'）
 * @property {string} [size] - ボタンのサイズ（'default' | 'sm' | 'lg' | 'icon'）
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
/**
 * 汎用的なボタンコンポーネントです。
 * 様々なスタイルバリエーションとサイズをサポートし、アクセシビリティにも配慮しています。
 *
 * @example
 * ```tsx
 * // デフォルトのボタン
 * <Button>クリック</Button>
 *
 * // バリアントとサイズを指定
 * <Button variant="destructive" size="lg">削除</Button>
 *
 * // アウトラインスタイル
 * <Button variant="outline">編集</Button>
 *
 * // アイコンボタン
 * <Button size="icon">
 *   <IconComponent />
 * </Button>
 *
 * // カスタムクラスの追加
 * <Button className="my-custom-class">カスタム</Button>
 * ```
 *
 * @property {string} [variant] - ボタンの見た目のバリアント
 * @property {string} [size] - ボタンのサイズ
 * @property {boolean} [asChild=false] - 子要素をボタンとして扱うかどうか
 * @property {string} [className] - 追加のCSSクラス
 */
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

export { Button, type ButtonProps, buttonVariants };
