import type React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs'; // shadcn/uiのTabsをインポート
import { CheckCircle } from 'lucide-react'; // アイコン用

// 封筒データの型定義 (必要であれば拡張)
interface EnvelopeItem {
  name: string;
  description: string;
}

const standardEnvelopes: EnvelopeItem[] = [
  {
    name: '長形3号 (長3)',
    description: 'A4用紙三つ折りに最適。請求書や納品書の送付に。',
  },
  {
    name: '長形4号 (長4)',
    description: 'B5用紙三つ折りに。一般的な手紙や書類送付に。',
  },
  {
    name: '角形2号 (角2)',
    description: 'A4用紙を折らずに封入可能。契約書やカタログ送付に。',
  },
  {
    name: '角形3号 (角3)',
    description: 'B5用紙を折らずに封入可能。パンフレットなどに。',
  },
  {
    name: '洋形長3号 (洋長3)',
    description: 'A4用紙三つ折り用（横型）。DMや招待状に。',
  },
  {
    name: '洋形2号 (洋2)',
    description: 'はがきサイズ。案内状や招待状、挨拶状に。',
  },
  {
    name: '窓付き封筒',
    description: '宛名ラベル不要。請求書やDM送付の効率化に。（各種サイズ対応）',
  },
  // TODO: 他の定型封筒例を追加
];

const specialEnvelopes: EnvelopeItem[] = [
  {
    name: 'カスタムサイズ封筒',
    description:
      '定型サイズ以外。商品や内容物に合わせたオリジナルサイズで作成。',
  },
  {
    name: '特殊形状封筒',
    description: '型抜き加工など。デザイン性を高め、印象的なDMや案内に。',
  },
  {
    name: '厚紙封筒・保存袋',
    description: '丈夫な紙質。書類やカタログの保護、長期保存に。',
  },
  {
    name: 'マチ付き封筒',
    description: '厚みのある内容物用。カタログや冊子、商品の梱包に。',
  },
  {
    name: '透けない封筒',
    description: 'プライバシー保護。個人情報や機密書類の送付に。',
  },
  {
    name: 'レントゲン袋',
    description: '医療機関向け。レントゲン写真の保管・送付に。',
  },
  // TODO: 他の不定型封筒例を追加
];

const EnvelopeTypes: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-white">
      {' '}
      {/* 背景色を交互にするなど */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          豊富な封筒タイプからお選びいただけます
        </h2>
        <Tabs defaultValue="standard" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="standard">定型封筒</TabsTrigger>
            <TabsTrigger value="special">不定型・特殊封筒</TabsTrigger>
          </TabsList>
          <TabsContent value="standard" className="mt-8">
            <div className="space-y-6">
              {standardEnvelopes.map((envelope) => (
                <div key={envelope.name} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-700">
                      {envelope.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {envelope.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-6">
              ※
              上記以外にも様々な定型サイズの封筒を取り扱っております。お気軽にご相談ください。
            </p>
          </TabsContent>
          <TabsContent value="special" className="mt-8">
            <div className="space-y-6">
              {specialEnvelopes.map((envelope) => (
                <div key={envelope.name} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-700">
                      {envelope.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {envelope.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-6">
              ※
              お客様のご要望に合わせた特殊な封筒の作成も可能です。まずはお問い合わせください。
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default EnvelopeTypes;
