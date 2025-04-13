import type React from 'react';
import {
  Palette, // 色
  FileText, // 用紙
  BookOpenCheck, // 製本方法
  ShieldCheck, // PP加工
  Sparkles, // 箔押し
  DraftingCompass, // 表紙デザイン
} from 'lucide-react';
import Container from '~/components/custom/container';

interface OptionItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

// TODO: 印刷・製本オプションの詳細を精査
const options: OptionItem[] = [
  {
    icon: Palette,
    title: '印刷色 (モノクロ/カラー)',
    description:
      '本文・表紙ともにモノクロ印刷、カラー印刷に対応。写真や図版も鮮やかに再現します。',
  },
  {
    icon: FileText,
    title: '選べる用紙 (本文/表紙)',
    description:
      '上質紙、コート紙、マットコート紙、書籍用紙、特殊紙など。厚さもご指定いただけます。表紙と本文で異なる用紙も選択可能です。',
  },
  {
    icon: BookOpenCheck,
    title: '製本方法',
    description:
      '中綴じ、無線綴じ、平綴じ、リング製本、上製本（ハードカバー）など、用途やページ数、ご予算に合わせて最適な方法をご提案します。',
  },
  {
    icon: ShieldCheck,
    title: '表紙PP加工 (光沢/マット)',
    description:
      '表紙の耐久性を高め、高級感を演出。光沢のあるグロスPP、落ち着いたマットPPから選べます。',
  },
  {
    icon: Sparkles,
    title: '表紙箔押し加工',
    description:
      'タイトルやロゴなどに金・銀・カラー箔を施し、特別感を演出します。記念誌や作品集におすすめです。',
  },
  {
    icon: DraftingCompass,
    title: '表紙デザイン作成',
    description:
      '冊子の顔となる表紙のデザインも承ります。お客様のイメージに合わせて作成いたします。',
  },
  // TODO: 他のオプションを追加 (例: 見返し加工、スピン(しおり紐)加工、カバー作成など)
];

const PrintingSeihonOptions: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          印刷・製本オプション
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {options.map((option) => (
            <div
              key={option.title}
              className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm border border-gray-200"
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
          上記以外にも様々なオプションがございます。冊子の仕様についてお気軽にご相談ください。
        </p>
      </Container>
    </section>
  );
};

export default PrintingSeihonOptions;
