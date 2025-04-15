import { Clock, JapaneseYen, Users, BarChart3 } from 'lucide-react';
import type { BenefitCardProps } from './benefit-card';
import type { AchievementCardProps } from './achievement-card';

// メリットデータ
export const benefitsData: BenefitCardProps[] = [
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
export const achievementsData: AchievementCardProps[] = [
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
