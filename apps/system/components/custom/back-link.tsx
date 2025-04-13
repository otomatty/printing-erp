import { cn } from '@kit/ui/utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type React from 'react';

interface BackLinkProps {
  /**
   * リンク先のURL。指定しない場合は戻るボタンとして機能
   */
  href?: string;

  /**
   * リンクのラベル
   * @default "戻る"
   */
  label?: string;

  /**
   * アイコンを表示するかどうか
   * @default true
   */
  showIcon?: boolean;

  /**
   * 追加のクラス名
   */
  className?: string;

  /**
   * アイコンのサイズ
   * @default 16
   */
  iconSize?: number;

  /**
   * クリックイベントハンドラ
   */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * 前のページに戻るためのリンクコンポーネント
 *
 * @example 履歴を戻る
 * ```tsx
 * <BackLink />
 * ```
 *
 * @example 特定のURLに戻る
 * ```tsx
 * <BackLink href="/dashboard" label="ダッシュボードに戻る" />
 * ```
 */
export function BackLink({
  href,
  label = '戻る',
  showIcon = true,
  className,
  iconSize = 16,
  onClick,
  ...props
}: BackLinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
      return;
    }

    if (!href) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <Link
      href={href || '#'}
      onClick={handleClick}
      className={cn(
        'group inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900',
        className
      )}
      {...props}
    >
      {showIcon && (
        <ArrowLeft
          size={iconSize}
          className="transition-transform group-hover:-translate-x-0.5"
        />
      )}
      {label}
    </Link>
  );
}
