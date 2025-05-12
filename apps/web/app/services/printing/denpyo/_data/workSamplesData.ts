import type { SampleItem } from '../../../_components/work-samples';

// TODO: 伝票・製本の具体的な制作サンプルデータを追加
export const sampleItems: SampleItem[] = [
  {
    title: 'オリジナル納品書 (3枚複写)',
    description:
      '会社のロゴ入りノーカーボン複写の3枚綴り納品書。書きやすさと耐久性を兼ね備えています。',
    imageSrc: '/images/samples/denpyo-nouhin.jpg',
    alt: 'ノーカーボン複写の納品書サンプル',
  },
  {
    title: '見積書 (A4, 単票)',
    description:
      '標準A4サイズの見積書。鮮明なロゴ印刷とクリアなフォントで企業イメージを向上。',
    imageSrc: '/images/samples/denpyo-mitsumori.jpg',
    alt: 'A4サイズ見積書サンプル',
  },
  {
    title: '請求書 (B5)',
    description: 'B5サイズの請求書。2色印刷対応で視認性を高めています。',
    imageSrc: '/images/samples/denpyo-seikyusho.jpg',
    alt: 'B5サイズ請求書サンプル',
  },
  {
    title: '領収書 (単票)',
    description: '単票タイプの領収書。連続帳票にも対応可能です。',
    imageSrc: '/images/samples/denpyo-ryoshusho.jpg',
    alt: '単票の領収書サンプル',
  },
];

export const sectionTitle = '制作サンプル';
export const note =
  '上記は制作例の一部です。お客様のご要望に合わせて様々な伝票を作成可能です。';
