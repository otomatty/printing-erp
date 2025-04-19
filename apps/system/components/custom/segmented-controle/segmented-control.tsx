'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@kit/ui/utils';
import { SegmentedControlContext } from './use-segmented-control';

interface SegmentedControlProps {
  /** 制御された選択値 */
  value?: string;
  /** 非制御時の初期選択値 */
  defaultValue?: string;
  /** 値変更時のコールバック */
  onValueChange?: (value: string) => void;
  /** 子要素には SegmentedControlItem と SegmentedControlIndicator を含める */
  children: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * SegmentedControl コンテナコンポーネント
 * 制御された/非制御の選択管理とコンテキストを提供し、外枠のスタイルを担います。
 */
export function SegmentedControl({
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
  className,
}: SegmentedControlProps) {
  // Extract only SegmentedControlItem children with a value prop
  const elems = React.Children.toArray(children)
    .filter(React.isValidElement)
    .filter((el) => typeof (el.props as { value: string }).value === 'string')
    .map((el) => el as React.ReactElement<{ value: string }>);
  const initialValue = defaultValue ?? elems[0]?.props.value ?? '';
  const [uncontrolledValue, setUncontrolledValue] =
    useState<string>(initialValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (val: string) => {
    if (!isControlled) {
      setUncontrolledValue(val);
    }
    onValueChange?.(val);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SegmentedControlContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        containerRef,
      }}
    >
      <div
        ref={containerRef}
        className={cn(
          'relative flex items-center border rounded-md bg-gray-100',
          className
        )}
      >
        {children}
      </div>
    </SegmentedControlContext.Provider>
  );
}
