import { Globe, Search, Smartphone, Users } from 'lucide-react';
import type { Challenge } from './types';

/**
 * ホームページ課題データ
 * 強調キーワードを ** で囲む
 */
export const challengesData: Challenge[] = [
  {
    category: '集客・見込み客獲得',
    icon: Users,
    examples: [
      'ホームページはあるけど、**見込み客からの問い合わせ**がほとんどない',
      '**SNSやGoogle広告**を使っているが、サイトの成約率が低い',
      '自社の**強みや特徴**をうまくアピールできていない',
    ],
  },
  {
    category: 'デザインと使いやすさ',
    icon: Globe,
    examples: [
      '**デザインが古く**なり、企業イメージと合わなくなってきている',
      '**更新が難しい**システムで、情報が最新ではない',
      '**必要な情報**を見つけるのが難しいとお客様から言われる',
    ],
  },
  {
    category: 'モバイル対応',
    icon: Smartphone,
    examples: [
      '**スマホで見たとき**に崩れたり、見にくかったりする',
      '**表示が遅い**ため、訪問者がすぐに離脱してしまう',
      '**スマホからの問い合わせ**がしづらく、機会損失が発生している',
    ],
  },
  {
    category: '検索エンジン対策',
    icon: Search,
    examples: [
      '**Googleでの検索順位**が低く、競合他社に負けている',
      '**アクセス解析**をしておらず、訪問者の行動が把握できていない',
      '**集客できるコンテンツ**が少なく、サイトの滞在時間が短い',
    ],
  },
];
