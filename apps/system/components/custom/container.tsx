import { cn } from '@kit/ui/utils';
import type React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * コンテナの最大幅
   * @default "max-w-7xl" (1280px)
   */
  maxWidth?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | 'full'
    | 'none';

  /**
   * 子要素
   */
  children: React.ReactNode;

  /**
   * コンテナの水平方向のパディング
   * @default "px-4 sm:px-6 lg:px-8"
   */
  padding?: string;

  /**
   * センタリングするかどうか
   * @default true
   */
  centered?: boolean;
}

/**
 * 要素の幅を制限するためのコンテナコンポーネント
 *
 * @example
 * ```tsx
 * <Container>
 *   <h1>コンテンツ</h1>
 * </Container>
 * ```
 *
 * @example カスタム最大幅
 * ```tsx
 * <Container maxWidth="xl">
 *   <h1>より狭いコンテンツ</h1>
 * </Container>
 * ```
 */
export function Container({
  className,
  maxWidth = '6xl',
  padding = 'px-4 sm:px-6 lg:px-8',
  centered = true,
  children,
  ...props
}: ContainerProps) {
  const maxWidthClass = maxWidth !== 'none' ? `max-w-${maxWidth}` : '';
  const centeredClass = centered ? 'mx-auto' : '';

  return (
    <div
      className={cn(
        'container',
        'w-full',
        maxWidthClass,
        padding,
        centeredClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * コンテナの中央に配置するセクション
 */
export function ContainerContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mx-auto w-full', className)} {...props}>
      {children}
    </div>
  );
}

/**
 * コンテナ内でのセクションの区切り
 */
export function ContainerSection({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('py-8 md:py-12', className)} {...props}>
      {children}
    </div>
  );
}
