'use client';

import type React from 'react';
import Container from '~/components/custom/container';

// アイコンを lucide-react に変更
import {
  Clock, // 時間短縮 (旧 Settings)
  JapaneseYen, // コスト削減 (旧 CurrencyYenIcon)
  Users, // 従業員満足度 (旧 UsersIcon)
  BarChart3, // データ活用 (旧 Lightbulb)
  AlertTriangle, // 注記用アイコン (旧 ExclamationTriangleIcon)
} from 'lucide-react';

// BenefitCardのProps定義
interface BenefitCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  example: string;
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
        <div className="bg-blue-100 rounded-full p-3 mr-4">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-3">{description}</p>
      <div className="bg-gray-50 p-3 rounded-md text-sm">
        <span className="font-medium text-blue-700">実際の例：</span> {example}
      </div>
    </div>
  );
};

// AchievementCardのProps定義
interface AchievementCardProps {
  percentage: string;
  description: string;
}

// AchievementCardコンポーネント
const AchievementCard: React.FC<AchievementCardProps> = ({
  percentage,
  description,
}) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md text-center">
      <div className="text-8xl font-bold mb-4">
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
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
    icon: Clock,
    title: '面倒な作業が減って時間が節約できる',
    description:
      '何度も同じ入力をする必要がなくなり、今まで手作業でやっていた単純作業を自動化。書類作成や確認作業の時間が大幅に短縮されます。',
    example:
      '印刷会社A社では、注文の入力作業が以前の3分の1の時間で済むようになり、入力ミスもほとんどなくなりました。',
  },
  {
    icon: JapaneseYen,
    title: '無駄な出費を減らして経費が節約できる',
    description:
      '残業代や紙代、ミスによるやり直し費用などが減少。人手不足の中でも、少ない人数で効率よく仕事ができるようになります。',
    example:
      '製造業B社では、給料計算の手間が月に30時間も減り、年間で約90万円の人件費削減につながりました。',
  },
  {
    icon: BarChart3,
    title: '売上や顧客情報が見やすくなる',
    description:
      'バラバラだった情報がひとつにまとまり、必要な時にすぐ確認できるように。どの商品が売れているか、どのお客様が重要かが一目でわかります。',
    example:
      '小売店C社では、売れ筋商品やお客様の好みがはっきりわかるようになり、在庫の無駄がなくなって売上が15%もアップしました。',
  },
  {
    icon: Users,
    title: '社員の負担が減って職場が明るくなる',
    description:
      '単調な作業や残業が減ることで、社員の負担が軽減。情報共有がスムーズになり、「探す」「確認する」といったストレスから解放されます。',
    example:
      'サービス業D社では、顧客情報をすぐに確認できるようになり、部署間の連絡ミスがなくなって残業時間が平均15%減りました。',
  },
];

// 成果データ
const achievementsData: AchievementCardProps[] = [
  {
    percentage: '85%',
    description: 'の会社が1年以内に導入費用分のメリットを実感',
  },
  {
    percentage: '70%',
    description: 'の会社で入力ミスや確認モレが大幅に減少',
  },
  {
    percentage: '45%',
    description: '日常業務の処理時間が平均でこれだけ短縮',
  },
];

const SystemBenefitsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-4">
          業務システムで<span className="text-blue-600">こんなメリット</span>
          が生まれます
        </h2>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-lg text-gray-700">
            実際にシステムを導入されたお客様から喜ばれている、
            日々の業務がラクになる具体的なメリットをご紹介します。
          </p>
        </div>
        <div className="mt-4 bg-yellow-50 border border-yellow-300 rounded-md p-4 max-w-5xl mx-auto mb-12">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
            <p className="text-sm text-yellow-800 text-left">
              ここでご紹介する数値や事例は、実際に私たちが手がけたプロジェクトの実績に基づいています。業種や規模により効果は異なる場合があります。
            </p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {benefitsData.map((benefit) => (
            <BenefitCard
              key={benefit.title} // keyには一意なものを指定
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
            導入した会社の<span className="text-blue-600">うれしい変化</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {achievementsData.map((achievement) => (
              <AchievementCard
                key={achievement.percentage} // keyは一意なものに
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

export default SystemBenefitsSection;
