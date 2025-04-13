import type React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';
import { CheckCircle } from 'lucide-react';

interface ProductItem {
  name: string;
  description: string;
}

// TODO: 各製品タイプの詳細データを精査・追加
const businessCards: ProductItem[] = [
  {
    name: '標準名刺 (55×91mm)',
    description: '最も一般的なサイズ。ビジネスシーンでの基本アイテム。',
  },
  {
    name: '欧米サイズ名刺',
    description: 'やや大きめ。デザインの自由度が高い。',
  },
  {
    name: '小型名刺・女性用名刺',
    description: 'コンパクトで持ちやすい。プライベート用にも。',
  },
  {
    name: '二つ折り名刺・スタンプカード',
    description: '情報量が多い場合や、スタンプカード機能を持たせる際に。',
  },
];

const postcards: ProductItem[] = [
  {
    name: '年賀状',
    description: '新年のご挨拶に。写真入り、オリジナルデザイン対応。',
  },
  {
    name: '喪中・寒中見舞い',
    description: '落ち着いたデザインで。宛名印刷も承ります。',
  },
  {
    name: '各種挨拶状',
    description: '転居、転職、退職、開店など、様々な節目のお知らせに。',
  },
  {
    name: 'ダイレクトメール (DM)',
    description: '販促活動に。効果的なデザイン提案も可能。',
  },
  {
    name: 'ポストカード・絵はがき',
    description: 'イベント告知や販売用に。美しい印刷品質。',
  },
  {
    name: '往復はがき',
    description: '出欠確認が必要な案内状などに。',
  },
];

const cards: ProductItem[] = [
  {
    name: 'ショップカード',
    description: '店舗情報やブランドイメージを伝える重要なツール。',
  },
  {
    name: 'ポイントカード・スタンプカード',
    description: '顧客のリピート率向上に。デザインからご提案。',
  },
  {
    name: 'メンバーズカード・会員証',
    description: 'プラスチックカード風の加工も可能。（要相談）',
  },
  {
    name: '診察券',
    description: '医療機関向け。予約情報記入欄付きなど。',
  },
  {
    name: 'ギフトカード・商品券',
    description: '贈り物や販売促進に。',
  },
];

const ProductTypes: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-gray-50">
      {' '}
      {/* 背景色 */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          多彩な製品ラインナップ
        </h2>
        <Tabs defaultValue="business-card" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="business-card">名刺</TabsTrigger>
            <TabsTrigger value="postcard">ハガキ</TabsTrigger>
            <TabsTrigger value="card">カード類</TabsTrigger>
          </TabsList>

          {/* 名刺タブ */}
          <TabsContent value="business-card" className="mt-8">
            <div className="space-y-6">
              {businessCards.map((item) => (
                <div key={item.name} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-700">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-6">
              ※ 上記以外にも様々なサイズ・形状の名刺に対応可能です。
            </p>
          </TabsContent>

          {/* ハガキタブ */}
          <TabsContent value="postcard" className="mt-8">
            <div className="space-y-6">
              {postcards.map((item) => (
                <div key={item.name} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-700">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-6">
              ※ 官製はがきへの印刷、私製はがきの作成、どちらも承ります。
            </p>
          </TabsContent>

          {/* カード類タブ */}
          <TabsContent value="card" className="mt-8">
            <div className="space-y-6">
              {cards.map((item) => (
                <div key={item.name} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-700">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-6">
              ※ ご希望の用途や仕様に合わせて最適なカードをご提案します。
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProductTypes;
