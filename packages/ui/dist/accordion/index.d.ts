import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

/**
 * アコーディオンコンポーネントのルート要素です。
 * コンテンツを折りたたみ可能なセクションとして表示するために使用します。
 *
 * @example
 * ```tsx
 * // 単一のアコーディオン
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>タイトル</AccordionTrigger>
 *     <AccordionContent>コンテンツ</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 *
 * // 複数のアコーディオン
 * <Accordion type="multiple">
 *   <AccordionItem value="item-1">...</AccordionItem>
 *   <AccordionItem value="item-2">...</AccordionItem>
 * </Accordion>
 * ```
 *
 * @property {('single' | 'multiple')} type - アコーディオンの動作モード
 * @property {boolean} [collapsible] - type="single"の場合、すべての項目を閉じることができるかどうか
 * @property {string} [defaultValue] - 初期状態で開く項目のvalue値
 * @property {string} [value] - 現在開いている項目のvalue値（制御コンポーネントとして使用する場合）
 * @property {(value: string) => void} [onValueChange] - 値が変更されたときのコールバック
 */
declare const Accordion: React.ForwardRefExoticComponent<(AccordionPrimitive.AccordionSingleProps | AccordionPrimitive.AccordionMultipleProps) & React.RefAttributes<HTMLDivElement>>;
/**
 * アコーディオンの個々の項目を表すコンポーネントです。
 * 各項目は一意のvalue属性を持つ必要があります。
 *
 * @example
 * ```tsx
 * <AccordionItem value="unique-id" className="custom-class">
 *   <AccordionTrigger>タイトル</AccordionTrigger>
 *   <AccordionContent>コンテンツ</AccordionContent>
 * </AccordionItem>
 * ```
 *
 * @property {string} value - 項目を識別するための一意の値
 * @property {string} [className] - カスタムクラス名
 */
declare function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>): React.JSX.Element;
/**
 * アコーディオンの開閉トリガーとなるコンポーネントです。
 * クリックすると対応するAccordionContentの表示/非表示を切り替えます。
 *
 * @example
 * ```tsx
 * <AccordionTrigger className="custom-class">
 *   セクションのタイトル
 * </AccordionTrigger>
 * ```
 *
 * @property {ReactNode} children - トリガーに表示するコンテンツ
 * @property {string} [className] - カスタムクラス名
 */
declare function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>): React.JSX.Element;
declare namespace AccordionTrigger {
    var displayName: string;
}
/**
 * アコーディオンの折りたたみ可能なコンテンツ部分を表すコンポーネントです。
 * AccordionTriggerがクリックされると、アニメーション付きで表示/非表示が切り替わります。
 *
 * @example
 * ```tsx
 * <AccordionContent className="custom-class">
 *   <p>折りたたまれるコンテンツ</p>
 *   <div>任意のJSX要素を配置できます</div>
 * </AccordionContent>
 * ```
 *
 * @property {ReactNode} children - 折りたたまれるコンテンツ
 * @property {string} [className] - カスタムクラス名
 */
declare function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>): React.JSX.Element;
declare namespace AccordionContent {
    var displayName: string;
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
