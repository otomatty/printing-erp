import { BarChart3, Clock, FileText, Wrench } from 'lucide-react';
import type { Challenge } from './types';

/**
 * 業務課題データ
 * 強調キーワードを ** で囲む
 */
export const challengesData: Challenge[] = [
  {
    id: 'time-loss',
    category: '手作業による時間のロス',
    icon: Clock,
    examples: [
      '**紙の伝票や請求書**を手入力していて、ミスが多く確認に時間がかかる',
      '**同じデータを複数の場所**に入力しないといけなくて二度手間になっている',
      '**Excelの集計作業**に毎月何日もかかり、本来の仕事ができない',
    ],
  },
  {
    id: 'scattered-info',
    category: '情報がバラバラで見つからない',
    icon: FileText,
    examples: [
      '**お客様の過去の注文履歴**がすぐに確認できず、対応に時間がかかる',
      '**大事なファイル**がどこにあるかわからず、探し物に時間を取られる',
      '**社員が休んだ時**に必要な情報がその人のPCにしかなくて困る',
    ],
  },
  {
    id: 'sales-visibility',
    category: '売上や経営状況がつかめない',
    icon: BarChart3,
    examples: [
      '**今月の売上が目標に届くか**をすぐに確認できる方法がない',
      '**どの商品やサービス**が利益に貢献しているのか把握できていない',
      '**取引先ごとの売上推移**が見にくく、営業戦略が立てられない',
    ],
  },
  {
    id: 'legacy-methods',
    category: '今までのやり方を変えられない',
    icon: Wrench,
    examples: [
      '**FAXや電話での注文**が多く、デジタル化の方法がわからない',
      '**若手とベテラン**で仕事のやり方の認識が違い、引継ぎが難しい',
      '**パソコンが苦手な社員**も使えるシステムが見つからない',
    ],
  },
];
