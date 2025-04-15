'use client';

import type React from 'react';
import Container from '~/components/custom/container';

// アイコンを lucide-react から
import {
  Rocket, // 集客力向上
  LineChart, // 売上増加
  Clock, // 運用効率化
  BadgeCheck, // ブランド価値向上
  AlertTriangle, // 注記用アイコン
} from 'lucide-react';

// BenefitCardのProps定義
interface BenefitCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  example: string;
}

// 成果カードのProps定義
interface AchievementCardProps {
  percentage: string;
  description: string;
}

// BenefitCardコンポーネント
const BenefitCard: React.FC<BenefitCardProps> = ({
  icon: Icon,
  title,
  description,
  example,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className="bg-indigo-100 rounded-full p-3 mr-4">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-3">{description}</p>
      <div className="bg-gray-50 p-3 rounded-md text-sm">
        <span className="font-medium text-indigo-700">実際の例：</span>{' '}
        {example}
      </div>
    </div>
  );
};

// AchievementCardコンポーネント
const AchievementCard: React.FC<AchievementCardProps> = ({
  percentage,
  description,
}) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md text-center">
      <div className="text-8xl font-bold mb-4">
        <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
          {percentage}
        </span>
      </div>
      <p className="text-sm text-gray-600 font-bold">{description}</p>
    </div>
  );
};

// メリットデータ
const benefitsData: BenefitCardProps[] = [
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

// 成果データ
const achievementsData: AchievementCardProps[] = [
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

const HomepageBenefitsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-4">
          導入企業が実感した
          <span className="text-indigo-600">4つのメリット</span>
        </h2>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-lg text-gray-700">
            当社のホームページ制作を利用されたお客様から喜ばれている、
            ビジネスに大きく貢献する具体的なメリットをご紹介します。
          </p>
        </div>
        <div className="mt-4 bg-yellow-50 border border-yellow-300 rounded-md p-4 max-w-5xl mx-auto mb-12">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
            <p className="text-sm text-yellow-800 text-left">
              ここでご紹介する数値や事例は、実際に私たちが手がけたプロジェクトの実績に基づいています。業種や企業規模により効果は異なる場合があります。
            </p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {benefitsData.map((benefit) => (
            <BenefitCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              example={benefit.example}
            />
          ))}
        </div>
        {/* 導入企業の成果 */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-6">
            リニューアル後の
            <span className="text-indigo-600">うれしい変化</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {achievementsData.map((achievement) => (
              <AchievementCard
                key={achievement.percentage}
                percentage={achievement.percentage}
                description={achievement.description}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomepageBenefitsSection;
