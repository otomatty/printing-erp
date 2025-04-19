'use client';

import type React from 'react';
import { useSegmentedControl } from './use-segmented-control';
import { cn } from '@kit/ui/utils';

interface SegmentedControlItemProps {
  /** セグメントの値 */
  value: string;
  /** 表示ラベル */
  children: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * SegmentedControl の子コンポーネントとして、選択可能なセグメントボタンをレンダリングします。
 */
export function SegmentedControlItem({
  value,
  children,
  className,
}: SegmentedControlItemProps) {
  const { value: selected, onValueChange } = useSegmentedControl();
  const isSelected = selected === value;

  const handleClick = () => onValueChange(value);

  return (
    <button
      type="button"
      data-value={value}
      onClick={handleClick}
      className={cn(
        'relative z-10 px-4 py-2 text-sm font-medium text-center transition-colors',
        isSelected ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900',
        className
      )}
    >
      {children}
    </button>
  );
}
