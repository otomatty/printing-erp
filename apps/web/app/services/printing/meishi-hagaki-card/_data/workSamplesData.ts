import type { SampleItem } from '../../../_components/work-samples';

// TODO: 名刺・ハガキ・カード類の具体的な制作サンプルデータを追加
export const sampleItems: SampleItem[] = [
  {
    title: 'シンプルデザイン名刺',
    description: '上質紙を使用した、読みやすく洗練されたデザインの名刺。',
    imageSrc: '/images/samples/meishi-simple.jpg', // TODO: 正しい画像パスに差し替え
    alt: 'シンプルなデザインの名刺サンプル',
  },
  {
    title: '写真入り年賀状',
    description: '高画質な写真印刷に対応した、オリジナルデザインの年賀状。',
    imageSrc: '/images/samples/hagaki-nenga.jpg', // TODO: 正しい画像パスに差し替え
    alt: '写真入り年賀状サンプル',
  },
  {
    title: 'カフェ ショップカード',
    description: 'お店のロゴと情報を記載した、おしゃれな二つ折りカード。',
    imageSrc: '/images/samples/card-shop.jpg', // TODO: 正しい画像パスに差し替え
    alt: 'カフェのショップカードサンプル',
  },
  {
    title: '箔押し加工付き名刺',
    description: 'ロゴ部分に金箔押しを施し、高級感を演出した名刺。',
    imageSrc: '/images/samples/meishi-foil.jpg', // TODO: 正しい画像パスに差し替え
    alt: '箔押し加工付き名刺サンプル',
  },
  // TODO: 他のサンプルを追加 (例: DMハガキ, ポイントカードなど)
];

export const sectionTitle = '制作サンプル';
export const note =
  '上記は制作例の一部です。お客様のご要望に合わせて様々な製品を作成可能です。';
