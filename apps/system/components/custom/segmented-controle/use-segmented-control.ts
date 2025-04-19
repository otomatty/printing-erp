'use client';

import type React from 'react';
import { createContext, useContext } from 'react';

interface SegmentedControlContextProps {
  /** 現在の選択値 */
  value: string;
  /** 選択値が変わったときのコールバック */
  onValueChange: (value: string) => void;
  /** SegmentedControl コンテナへの参照 (滑らかなアニメーションの計算用) */
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const SegmentedControlContext = createContext<
  SegmentedControlContextProps | undefined
>(undefined);

/**
 * SegmentedControl コンポーネント内で現在の値と変更ハンドラ、コンテナ Ref を取得するフック。
 * SegmentedControl の外で呼び出すとエラーが発生します。
 * @returns {{value: string, onValueChange: (value: string) => void, containerRef: React.RefObject<HTMLDivElement>}}
 */
export function useSegmentedControl(): SegmentedControlContextProps {
  const context = useContext(SegmentedControlContext);
  if (!context) {
    throw new Error(
      'useSegmentedControl は SegmentedControl 内で使用してください。'
    );
  }
  return context;
}

export { SegmentedControlContext };
