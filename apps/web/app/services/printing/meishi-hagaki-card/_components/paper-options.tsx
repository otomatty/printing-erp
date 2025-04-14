import type React from 'react';
import { FileText, Star, Image as ImageIcon } from 'lucide-react'; // アイコン例
import Container from '~/components/custom/container';
import SampleInfo from '~/components/services/sample-info';

interface PaperItem {
  icon?: React.ElementType;
  name: string;
  features: string;
  recommendedUse: string; // どの製品に適しているか
  imagePlaceholder?: boolean;
  thickness?: string; // 例: 180kg, 220kg (連量)
}

// TODO: 名刺・ハガキ・カード類の用紙オプションを精査・追加 (斤量表記など印刷業界に合わせる)
const paperOptions: PaperItem[] = [
  {
    icon: FileText,
    name: '上質紙 (180kg)',
    features: '一般的な名刺用紙。筆記性に優れ、落ち着いた仕上がり。',
    recommendedUse: '名刺、スタンプカード',
    imagePlaceholder: true,
    thickness: '約0.25mm',
  },
  {
    icon: ImageIcon,
    name: 'マットコート (220kg)',
    features:
      '光沢を抑えたしっとりとした質感。写真やカラー印刷に適しています。',
    recommendedUse: '名刺、ショップカード、ポストカード',
    imagePlaceholder: true,
    thickness: '約0.27mm',
  },
  {
    icon: ImageIcon,
    name: 'アートポスト (220kg)',
    features: '強い光沢があり、写真やイラストが鮮やかに再現されます。',
    recommendedUse: '名刺、ポストカード、DMハガキ',
    imagePlaceholder: true,
    thickness: '約0.24mm',
  },
  {
    name: '官製はがき',
    features: '一般的な郵便はがき。切手不要でそのまま投函可能。',
    recommendedUse: '年賀状、各種挨拶状、DM',
    imagePlaceholder: true,
  },
  {
    icon: Star,
    name: '特殊紙 (各種)',
    features:
      'ヴァンヌーボ、アラベール、マーメイドなど。風合いや高級感を演出。',
    recommendedUse: 'こだわりの名刺、招待状、ショップカード',
    imagePlaceholder: false,
  },
  // TODO: 他の用紙オプションを追加 (例: 再生紙、厚紙など)
];

const PaperOptions: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          豊富な用紙から選択可能
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {paperOptions.map((paper) => (
            <div
              key={paper.name}
              className="border border-gray-200 rounded-lg p-6 flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow duration-200" // 背景色調整
            >
              {paper.imagePlaceholder && (
                <div className="w-full h-32 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400 text-sm">
                  {/* TODO: 用紙のテクスチャ画像 or サンプル画像 */}
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
                  厚さ目安: {paper.thickness}{' '}
                  {paper.name.includes('kg') ? ' (四六判換算)' : ''}
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
