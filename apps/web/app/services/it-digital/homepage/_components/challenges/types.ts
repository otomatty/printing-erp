import type React from 'react';

/**
 * ホームページ課題の型定義
 */
export interface Challenge {
  category: string;
  icon: React.ElementType;
  examples: string[];
}
