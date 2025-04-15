import type React from 'react';

/**
 * 業務課題の型定義
 */
export interface Challenge {
  id: string;
  category: string;
  icon: React.ElementType;
  examples: string[];
}
