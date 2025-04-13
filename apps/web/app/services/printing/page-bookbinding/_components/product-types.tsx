import type React from 'react';
import { Check } from 'lucide-react';
import Container from '~/components/custom/container';

interface ProductItem {
  name: string;
  description: string;
}

// TODO: 各製品タイプの詳細データを精査・追加
const productItems: ProductItem[] = [
  {
    name: '各種報告書・企画書',
    description:
      '会議資料、事業報告書、プレゼン資料など。ビジネスの要となる書類。',
  },
  {
    name: '研修テキスト・マニュアル',
    description:
      '社内研修用資料、操作マニュアル、教材など。分かりやすさが重要。',
  },
  {
    name: '文集・論文・研究紀要',
    description: '卒業文集、サークル文集、学術論文、研究発表資料など。',
  },
  {
    name: '記念誌・社史・自分史',
    description:
      '創立記念、周年記念、退職記念など、大切な節目を記録に残す一冊。',
  },
  {
    name: '会報・広報誌',
    description: '会員向け情報誌、社内報、地域広報誌など。定期的な発行物。',
  },
  {
    name: '作品集・写真集',
    description:
      'ポートフォリオ、イラスト集、旅行記など。想いを込めた作品を形に。',
  },
  {
    name: '設計図・図面製本',
    description: '建築図面、CAD図面などを、扱いやすく保管しやすい形に製本。',
  },
  // TODO: 他の制作物例を追加 (例: カタログ、プログラム、楽譜など)
];

const ProductTypes: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-white">
      <Container>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          様々なページ物に対応
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {productItems.map((item) => (
            <div key={item.name} className="flex items-start space-x-3">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-700">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-8">
          上記以外にも、様々な種類のページ物に対応可能です。お気軽にご相談ください。
        </p>
      </Container>
    </section>
  );
};

export default ProductTypes;
