import type React from 'react';
import {
  Printer, // 印刷方式
  Copy, // 少量印刷 (デジタル)
  Layers, // 大量印刷 (オフセット)
  Scissors, // 折り加工
  GripVertical, // ミシン目加工
  ShieldCheck, // PP加工
  SquareStack, // 中綴じ
} from 'lucide-react';
import Container from '~/components/custom/container';

interface OptionItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

// TODO: チラシ・ポスターの印刷・加工オプションを精査・追加
const printingOptions: OptionItem[] = [
  {
    icon: Printer,
    title: '印刷方式選択 (デジタル/オフセット)',
    description:
      '小ロット・短納期ならデジタル印刷、大ロット・高品質ならオフセット印刷。ご要望に応じて最適な方法をご提案します。',
  },
  {
    icon: Scissors, // より適切なアイコンがあれば変更
    title: '折り加工',
    description:
      '二つ折り、三つ折り、観音折りなど、リーフレットやパンフレットに合わせた様々な折り方に対応します。',
  },
  {
    icon: GripVertical,
    title: 'ミシン目加工',
    description: '切り取り線を入れる加工。クーポン券やチケットなどに便利です。',
  },
  {
    icon: ShieldCheck,
    title: 'PP加工 (光沢/マット)',
    description:
      '表面をフィルムで保護し、耐久性と質感を向上させます。光沢またはマット仕上げが選べます。',
  },
  {
    icon: SquareStack, // より適切なアイコンがあれば変更
    title: '中綴じ製本',
    description:
      '複数ページのパンフレットやプログラムなどに。ホチキスで中央を綴じます。',
  },
  // TODO: 他の加工オプションを追加 (例: 穴あけ、スジ入れ、表面加工など)
];

const PrintingOptions: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-white">
      <Container>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          選べる印刷・加工オプション
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {printingOptions.map((option) => (
            <div
              key={option.title}
              className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
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
          上記以外にも、様々な加工に対応可能です。お気軽にご相談ください。
        </p>
      </Container>
    </section>
  );
};

export default PrintingOptions;
