import type React from 'react';
import {
  Palette, // 色数
  Paintbrush, // 特色
  Scissors, // 角丸
  Layers, // PP加工
  Database, // 可変データ
} from 'lucide-react'; // アイコン例
import Container from '~/components/custom/container';

interface OptionItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

// TODO: 名刺・ハガキ・カード類の印刷・加工オプションを精査・追加
const printingOptions: OptionItem[] = [
  {
    icon: Palette,
    title: '印刷色数',
    description:
      '片面/両面のモノクロ・フルカラー印刷に対応。写真も鮮やかに再現します。',
  },
  {
    icon: Paintbrush,
    title: '特色印刷',
    description: 'DIC/PANTONE指定でコーポレートカラーなどを正確に表現。',
  },
  {
    icon: Scissors,
    title: '角丸加工',
    description: '角を丸くして、柔らかい印象や安全性に配慮した仕上がりに。',
  },
  {
    icon: Layers,
    title: 'PP加工 (マット/グロス)',
    description:
      '表面を保護し耐久性を向上。光沢感(グロス)や落ち着いた質感(マット)を選べます。',
  },

  {
    icon: Database,
    title: '宛名・可変データ印刷',
    description: 'ハガキやDMに宛名や個別のメッセージを印刷。パーソナライズに。',
  },
  // TODO: 他の加工オプションを追加 (例: ミシン目加工、穴あけ加工など)
];

const PrintingOptions: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-white">
      <Container>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          選べる印刷・加工オプション
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {printingOptions.map((option) => (
            <div
              key={option.title}
              className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200" // 背景・枠線調整
            >
              <option.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-8">
          組み合わせや、上記以外の特殊な加工についてもお気軽にご相談ください。
        </p>
      </Container>
    </section>
  );
};

export default PrintingOptions;
