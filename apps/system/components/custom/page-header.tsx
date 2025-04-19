'use client';

import { cn } from '@kit/ui/utils';
import type React from 'react';
import { Container } from './container';

import { BackLink } from './back-link';

interface PageHeaderProps {
  /**
   * ページのタイトル
   */
  title: string;

  /**
   * ページの説明（オプション）
   */
  description?: string;

  /**
   * 戻るリンクの表示設定
   * - true: デフォルト設定で表示
   * - false: 非表示
   * - オブジェクト: カスタム設定で表示
   * @default false
   */
  backLink?:
    | boolean
    | {
        href?: string;
        label?: string;
      };

  /**
   * 右側に表示するアクション（ボタンなど）
   */
  actions?: React.ReactNode;

  /**
   * 追加のクラス名
   */
  className?: string;

  /**
   * タイトルのクラス名
   */
  titleClassName?: string;

  /**
   * 説明のクラス名
   */
  descriptionClassName?: string;

  /**
   * アクションエリアのクラス名
   */
  actionsClassName?: string;
}

/**
 * ページのヘッダーを表示するコンポーネント
 * タイトル、説明、戻るリンク、アクションボタンを含む
 *
 * @example 基本的な使用法
 * ```tsx
 * <PageHeader
 *   title="ユーザー管理"
 *   description="システムユーザーの管理画面です"
 * />
 * ```
 *
 * @example 戻るリンクとアクションボタン付き
 * ```tsx
 * <PageHeader
 *   title="ユーザー詳細"
 *   backLink={true}
 *   actions={<Button>編集</Button>}
 * />
 * ```
 *
 * @example カスタム戻るリンク
 * ```tsx
 * <PageHeader
 *   title="新規登録"
 *   backLink={{ href: "/users", label: "ユーザー一覧に戻る" }}
 * />
 * ```
 */
export function PageHeader({
  title,
  description,
  backLink = false,
  actions,
  className,
  titleClassName,
  descriptionClassName,
  actionsClassName,
}: PageHeaderProps) {
  // 戻るリンクの設定を解析
  const showBackLink = backLink !== false;
  const backLinkProps = typeof backLink === 'object' ? backLink : {};

  return (
    <Container>
      <div className={cn('my-4 lg:my-8 space-y-4', className)}>
        {/* 戻るリンク */}
        {showBackLink && (
          <div className="mb-4 lg:mb-8">
            <BackLink {...backLinkProps} />
          </div>
        )}

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          {/* タイトルと説明 */}
          <div className="space-y-1">
            <h1
              className={cn(
                'text-2xl font-bold tracking-tight',
                titleClassName
              )}
            >
              {title}
            </h1>

            {description && (
              <p className={cn('text-sm text-gray-500', descriptionClassName)}>
                {description}
              </p>
            )}
          </div>

          {/* アクション */}
          {actions && (
            <div className={cn('flex-shrink-0', actionsClassName)}>
              {actions}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
