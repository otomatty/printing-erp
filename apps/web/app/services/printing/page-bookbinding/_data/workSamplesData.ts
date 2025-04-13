import type { SampleItem } from '../../../_components/work-samples';

// TODO: ページ物・製本の具体的な制作サンプルデータを追加
export const sampleItems: SampleItem[] = [
  {
    title: '会社案内パンフレット (中綴じ)',
    description:
      'A4サイズ、8ページ構成。会社概要や事業内容を分かりやすく紹介。光沢紙を使用し、鮮やかな仕上がり。',
    imageSrc: '/images/samples/bookbinding-pamphlet-saddle.jpg', // TODO: 正しい画像パスに差し替え
    alt: '中綴じ製本の会社案内パンフレットサンプル',
  },
  {
    title: '商品カタログ (無線綴じ)',
    description:
      'B5サイズ、64ページ。多数の商品写真を掲載した、丈夫で見やすい無線綴じ製本のカタログ。',
    imageSrc: '/images/samples/bookbinding-catalog-perfect.jpg', // TODO: 正しい画像パスに差し替え
    alt: '無線綴じ製本の商品カタログサンプル',
  },
  {
    title: 'セミナー資料 (リング製本)',
    description:
      'A4サイズ、モノクロ印刷。めくりやすく、書き込みもしやすいリング製本の資料。',
    imageSrc: '/images/samples/bookbinding-seminar-ring.jpg', // TODO: 正しい画像パスに差し替え
    alt: 'リング製本のセミナー資料サンプル',
  },
  {
    title: '記念誌 (上製本)',
    description:
      'A5サイズ、ハードカバー。長期保存に適した、高級感のある上製本の記念誌。',
    imageSrc: '/images/samples/bookbinding-anniversary-hardcover.jpg', // TODO: 正しい画像パスに差し替え
    alt: '上製本の記念誌サンプル',
  },
  // TODO: 他の製本タイプのサンプルを追加 (例: 平綴じ、PUR製本など)
];

export const sectionTitle = '制作サンプル';
export const note =
  '上記は制作例の一部です。ページ数、用紙、製本方法など、ご要望に応じて柔軟に対応いたします。'; // 事例がない場合の仮テキスト
