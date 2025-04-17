import { Rocket, LineChart, Clock, BadgeCheck } from 'lucide-react';
import type { BenefitCardProps, AchievementCardProps } from './types';

/**
 * ホームページ制作のメリットデータ
 */
export const benefitsData: BenefitCardProps[] = [
  {
    icon: Rocket,
    title: '集客力が向上する',
    description:
      '検索エンジンで上位表示されるSEO対策や、ターゲットに響くデザイン・コンテンツにより、これまでリーチできなかった見込み客からの問い合わせが増加します。',
    example:
      '小売業A社では、当社のホームページ制作後、オーガニック検索からの流入が3倍に増加し、月間お問い合わせ数が25件から78件に増えました。',
  },
  {
    icon: LineChart,
    title: '売上・成約率がアップする',
    description:
      '訪問者を顧客に変える導線設計と、信頼感を生み出すデザインにより、問い合わせから成約までのコンバージョン率が向上します。',
    example:
      'コンサルティング会社B社では、サイトリニューアル後、サイト経由の問い合わせからの成約率が従来の17%から32%にアップしました。',
  },
  {
    icon: Clock,
    title: '情報発信・更新が簡単になる',
    description:
      '管理画面からの簡単更新で、いつでも最新情報を発信できる体制を構築。専門知識がなくても社内スタッフで更新作業ができるようになります。',
    example:
      '製造業C社では、更新作業の外注コストが月5万円から不要になり、スタッフが思いついたときにすぐ情報を更新できるようになりました。',
  },
  {
    icon: BadgeCheck,
    title: 'ブランドイメージが向上する',
    description:
      '企業の強みや価値観を視覚的に伝えるデザインと、ユーザー体験の向上により、訪問者の印象や信頼感が大幅に改善します。',
    example:
      'サービス業D社では、新デザインのサイト公開後、「洗練された会社」という顧客からの評価が増え、採用応募数が50%増加しました。',
  },
];

/**
 * ホームページ制作の成果データ
 */
export const achievementsData: AchievementCardProps[] = [
  {
    percentage: '92%',
    description: 'のお客様がモバイルユーザーからの問い合わせ増加を実感',
  },
  {
    percentage: '78%',
    description: 'のお客様が半年以内に制作費以上の効果を実感',
  },
  {
    percentage: '67%',
    description: 'Webサイト経由の問い合わせ平均増加率',
  },
  {
    percentage: '58%',
    description: 'サイト滞在時間の平均増加率',
  },
];
