import type React from 'react';
import { Check, Hash, CopyPlus, Scissors } from 'lucide-react'; // アイコン例
import Container from '~/components/custom/container';

interface ListItem {
  name: string;
}

interface OptionItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

// TODO: 対応伝票例を精査
const denpyoExamples: ListItem[] = [
  { name: '納品書、請求書、領収書' },
  { name: '見積書、注文書、受領書' },
  { name: '作業日報、作業指示書、報告書' },
  { name: '会計伝票、入出金伝票' },
  { name: '契約書、申込書' },
  { name: 'その他 各種オリジナル伝票' },
];

// TODO: 伝票オプションを精査
const denpyoOptions: OptionItem[] = [
  {
    icon: CopyPlus,
    title: '複写伝票 (ノーカーボン)',
    description: '2枚複写、3枚複写など、ご希望の枚数で作成。用紙色も選択可能。',
  },
  {
    icon: Hash,
    title: 'ナンバリング (連番印刷)',
    description: '伝票の管理に便利な連番を印刷。開始番号や桁数指定も可能。',
  },
  {
    icon: Scissors,
    title: 'ミシン目加工',
    description: '切り取りが必要な伝票にミシン目を入れます。',
  },
  // TODO: 減感印刷、穴あけ加工などのオプションを追加
];

const DenpyoDetails: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-white">
      {/* 背景色 */}
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* 左カラム: 説明と対応伝票例 */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              オリジナル伝票印刷
            </h2>
            <p className="text-gray-700 mb-4">
              納品書、請求書、領収書など、ビジネスに不可欠な各種伝票を、お客様の業務に合わせてオリジナルデザインで作成いたします。
              サイズ、紙質、印刷色、複写枚数など、細かいご要望にお応えします。
            </p>
            <p className="text-gray-700 mb-6">
              既存伝票の複製（そっくり印刷）や、新規デザインからの作成も承ります。
            </p>

            <h3 className="text-xl font-semibold text-primary mb-4">
              対応伝票例
            </h3>
            <div className="space-y-3">
              {denpyoExamples.map((item) => (
                <div key={item.name} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 右カラム: オプション */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4 mt-8 md:mt-0">
              主なオプション加工
            </h3>
            <div className="space-y-6">
              {denpyoOptions.map((option) => (
                <div
                  key={option.title}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <option.icon className="h-7 w-7 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-1">
                      {option.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-6">
              ※
              上記以外にも、減感印刷（複写させたくない部分の加工）やファイル用の穴あけ加工なども可能です。
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DenpyoDetails;
