import type { SampleItem } from '../../../_components/work-samples';

export const sampleItems: SampleItem[] = [
  {
    title: 'コーポレートカラー封筒',
    description: '企業のブランドカラーに合わせた特色印刷の長3封筒。',
    imageSrc: '/images/samples/envelope-corporate.jpg', // TODO: 正しい画像パスに差し替え
    alt: 'コーポレートカラーの長3封筒サンプル',
  },
  {
    title: '窓付き請求書用封筒',
    description: '宛名ラベル不要で効率的な角2サイズの窓付き封筒。',
    imageSrc: '/images/samples/envelope-window.jpg', // TODO: 正しい画像パスに差し替え
    alt: '窓付き角2封筒サンプル',
  },
  {
    title: '箔押し加工付き招待状',
    description: '高級感を演出する金箔押し加工を施した洋2封筒。',
    imageSrc: '/images/samples/envelope-foil.jpg', // TODO: 正しい画像パスに差し替え
    alt: '金箔押し洋2封筒サンプル',
  },
  {
    title: 'オリジナルデザイン封筒',
    description: 'フルカラー印刷で独自デザインを表現したカスタムサイズ封筒。',
    imageSrc: '/images/samples/envelope-design.jpg', // TODO: 正しい画像パスに差し替え
    alt: 'オリジナルデザインのカスタム封筒サンプル',
  },
  // TODO: 他のサンプルを追加
];

export const sectionTitle = '制作サンプル';
export const note =
  '上記は制作例の一部です。お客様のご要望に合わせて様々な封筒を作成可能です。';
