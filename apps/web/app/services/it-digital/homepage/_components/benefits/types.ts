import type React from 'react';

/**
 * ベネフィットカードの型定義
 */
export interface BenefitCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  example: string;
}

/**
 * 成果カードの型定義
 */
export interface AchievementCardProps {
  percentage: string;
  description: string;
}
