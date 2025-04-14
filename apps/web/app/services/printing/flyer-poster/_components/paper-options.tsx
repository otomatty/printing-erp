import type React from 'react';
import { FileText, Image as ImageIcon, Star } from 'lucide-react';
import Container from '~/components/custom/container';
import SampleInfo from '~/components/services/sample-info';

interface PaperItem {
  icon?: React.ElementType;
  name: string;
  features: string;
  recommendedUse: string;
  imagePlaceholder?: boolean;
  thickness?: string; // 例: 90kg, 110kg, 135kg (連量)
}

// TODO: チラシ・ポスターの用紙オプションを精査・追加 (斤量表記など)
const paperOptions: PaperItem[] = [
  {
    icon: ImageIcon,
    name: 'コート紙 (光沢紙)',
    features: '表面に光沢があり、写真や色が鮮やかに再現されます。',
    recommendedUse: 'チラシ、ポスター、パンフレット',
    imagePlaceholder: true,
    thickness: '90kg / 110kg / 135kg',
  },
  {
    icon: ImageIcon,
    name: 'マットコート紙',
    features:
      '光沢を抑えたしっとりとした質感。文字が読みやすく、落ち着いた印象に。',
    recommendedUse: 'チラシ、パンフレット、リーフレット、ポスター',
    imagePlaceholder: true,
    thickness: '90kg / 110kg / 135kg',
  },
  {
    icon: FileText,
    name: '上質紙',
    features: 'コピー用紙に近い自然な風合い。筆記性に優れています。',
    recommendedUse: 'アンケート用紙、申込書、モノクロチラシ',
    imagePlaceholder: true,
    thickness: '70kg / 90kg / 110kg',
  },
  {
    icon: Star,
    name: '特殊紙 (各種)',
    features: '色付きの紙や、表面に凹凸のある紙など。デザイン性を高めます。',
    recommendedUse: 'こだわりのチラシ、DM、案内状',
    imagePlaceholder: false,
  },
  // TODO: 他の用紙オプションを追加 (例: 厚紙、耐水紙など)
];

const PaperOptions: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          目的に合わせて選べる用紙
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {paperOptions.map((paper) => (
            <div
              key={paper.name}
              className="border border-gray-200 rounded-lg p-6 flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {paper.imagePlaceholder && (
                <div className="w-full h-32 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400 text-sm">
                  画像プレースホルダー
                </div>
              )}
              <div className="flex items-center mb-2">
                {paper.icon && (
                  <paper.icon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                )}
                <h3 className="text-lg font-semibold text-gray-800">
                  {paper.name}
                </h3>
              </div>
              {paper.thickness && (
                <p className="text-xs text-gray-500 mb-2">
                  主な厚さ: {paper.thickness} (四六判換算)
                </p>
              )}
              <p className="text-sm text-gray-600 mb-3 flex-grow">
                {paper.features}
              </p>
              <p className="text-sm">
                <span className="font-semibold text-gray-700">主な用途:</span>{' '}
                {paper.recommendedUse}
              </p>
            </div>
          ))}
        </div>
        <SampleInfo />
      </Container>
    </section>
  );
};

export default PaperOptions;
