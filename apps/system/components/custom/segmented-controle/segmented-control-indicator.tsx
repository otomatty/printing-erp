'use client';

import React, { useState, useLayoutEffect } from 'react';
import { useSegmentedControl } from './use-segmented-control';
import { cn } from '@kit/ui/utils';

interface IndicatorProps {
  /** 追加のクラス名 */
  className?: string;
}

/**
 * 選択中のセグメント下にスライドするアニメーション付きインジケーター
 */
export function SegmentedControlIndicator({ className }: IndicatorProps) {
  const { value, containerRef } = useSegmentedControl();
  const [styleProps, setStyleProps] = useState<{ left: number; width: number }>(
    { left: 0, width: 0 }
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const btn = container.querySelector<HTMLElement>(`[data-value="${value}"]`);
    if (!btn) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setStyleProps({
      left: btnRect.left - containerRect.left,
      width: btnRect.width,
    });
  }, [value, containerRef]);

  return (
    <div
      className={cn(
        'absolute top-0 left-0 h-full bg-white shadow-sm rounded-md transition-all',
        className
      )}
      style={{
        transform: `translateX(${styleProps.left}px)`,
        width: styleProps.width,
      }}
    />
  );
}
