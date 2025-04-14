import type React from 'react';
import {
  Sheet,
  Palette,
  Feather,
  Info,
  MapPin,
  Phone,
  ExternalLink,
} from 'lucide-react'; // Info, MapPin, Phoneアイコンを追加
import Container from '~/components/custom/container';
import SampleInfo from '~/components/services/sample-info';

interface PaperItem {
  icon?: React.ElementType; // オプションでアイコン
  name: string;
  features: string;
  recommendedUse: string;
  imagePlaceholder?: boolean; // 画像プレースホルダーフラグ
  thickness?: string; // 用紙厚さ (例: 70g/m², 85g/m²)
}

const paperOptions: PaperItem[] = [
  {
    name: 'クラフト紙 (茶・白)',
    features: '丈夫で破れにくい。ナチュラルな風合い。',
    recommendedUse: '一般的な事務用封筒、商品の発送・梱包用',
    imagePlaceholder: true,
    thickness: '70g/m² ~',
  },
  {
    name: '上質紙',
    features: '白色度が高く、印刷が鮮明。滑らかな筆記性。',
    recommendedUse: 'ビジネス文書、DM、案内状',
    imagePlaceholder: true,
    thickness: '70g/m² ~ 100g/m²',
  },
  {
    name: 'ケント紙',
    features: '表面が硬く滑らか。インクのにじみが少ない。',
    recommendedUse: '製図用、招待状、カード類',
    imagePlaceholder: true,
    thickness: '100g/m² ~',
  },
  {
    icon: Palette,
    name: 'カラー封筒',
    features: '豊富なカラーバリエーション。ブランドイメージを表現。',
    recommendedUse: 'DM、招待状、イベント案内',
    imagePlaceholder: true, // 色見本画像が良いかも
  },
  {
    icon: Feather,
    name: '特殊紙',
    features: '和紙風、レザック、パール調など、多様な質感と風合い。',
    recommendedUse: '高級感を演出したい招待状、特別な案内状',
    imagePlaceholder: false, // 個別対応のためプレースホルダなし
  },
  // TODO: 用紙の厚さ(g/m²)の目安や、各用紙の特徴・推奨用途をより詳細に追記
];

const PaperOptions: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-white">
      <Container>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          用途に合わせて選べる封筒用紙
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paperOptions.map((paper) => (
            <div
              key={paper.name}
              className="border border-gray-200 rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200"
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
                  厚さ目安: {paper.thickness}
                </p>
              )}
              <p className="text-sm text-gray-600 mb-3 flex-grow">
                {paper.features}
              </p>
              <p className="text-sm">
                <span className="font-semibold text-gray-700">推奨用途:</span>{' '}
                {paper.recommendedUse}
              </p>
            </div>
          ))}
        </div>

        {/* サンプル案内ボックス - ボタンをボックスに変更 */}
        <SampleInfo />
      </Container>
    </section>
  );
};

export default PaperOptions;
