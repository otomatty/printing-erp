import type { SampleItem } from '../../../_components/work-samples';

// TODO: チラシ・ポスターの具体的な制作サンプルデータを追加
export const sampleItems: SampleItem[] = [
  {
    title: 'イベント告知チラシ (A4)',
    description: '目を引くデザインと分かりやすい情報配置で集客をサポート。',
    imageSrc: '/images/samples/flyer-event.jpg', // TODO: 正しい画像パス
    alt: 'イベント告知チラシのサンプル',
  },
  {
    title: '店舗キャンペーンポスター (B2)',
    description: '遠くからでも目立つ、インパクトのあるデザインのポスター。',
    imageSrc: '/images/samples/poster-campaign.jpg', // TODO: 正しい画像パス
    alt: '店舗キャンペーンポスターのサンプル',
  },
  {
    title: '三つ折りリーフレット',
    description: '会社案内やサービス紹介に。情報をコンパクトに整理。',
    imageSrc: '/images/samples/leaflet-trifold.jpg', // TODO: 正しい画像パス
    alt: '三つ折りリーフレットのサンプル',
  },
  {
    title: '商品紹介パンフレット (A4/8ページ)',
    description: '写真や詳細情報を豊富に掲載できる中綴じパンフレット。',
    imageSrc: '/images/samples/pamphlet-product.jpg', // TODO: 正しい画像パス
    alt: '商品紹介パンフレットのサンプル',
  },
  // TODO: 他のサンプルを追加 (例: DM, クーポン券など)
];

export const sectionTitle = '制作サンプル';
export const note =
  '上記は制作例の一部です。お客様のご要望に合わせて様々な印刷物を作成可能です。';
