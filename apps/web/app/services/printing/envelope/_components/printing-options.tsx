import type React from 'react';
import {
  Palette,
  PencilRuler,
  Combine,
  ScanBarcode,
  Stamp,
  Bot,
} from 'lucide-react'; // アイコン例
import Container from '~/components/custom/container';

interface OptionItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const printingOptions: OptionItem[] = [
  {
    icon: Palette,
    title: '印刷色数',
    description:
      '1色刷り、2色刷り、フルカラー印刷に対応。コーポレートカラーも忠実に再現します。',
  },
  {
    icon: PencilRuler, // より適切なアイコンがあれば変更
    title: '特色印刷',
    description:
      'DICやPANTONEでの色指定が可能。ブランドイメージに合わせた正確な色表現を実現します。',
  },
  {
    icon: Bot, // より適切なアイコンがあれば変更 (可変データ)
    title: '宛名・可変データ印刷',
    description:
      '宛名や個別の情報を直接封筒に印刷。DM発送などの手間を削減します。',
  },
  // TODO: 口糊加工（テープ付き、糊付き）などのオプションを追加 (適切なアイコンを探す)
];

const PrintingOptions: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          多彩な印刷・加工オプション
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {printingOptions.map((option) => (
            <div
              key={option.title}
              className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm"
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
          上記以外にも様々な加工に対応可能です。お気軽にご相談ください。
        </p>
      </Container>
    </section>
  );
};

export default PrintingOptions;
