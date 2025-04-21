// 比較項目の型定義
interface ComparisonItem {
  id: string;
  name: string;
  description: string;
}

// 評価の型定義
interface Rating {
  rating: '◎' | '○' | '△' | '×';
  description: string;
}

// 比較データの型定義
interface ComparisonData {
  item: ComparisonItem;
  traditional: Rating; // 従来型制作会社
  template: Rating; // テンプレート型サービス
  ninuma: Rating; // ニイヌマ企画印刷
}

// 比較項目
export const comparisonItems: ComparisonItem[] = [
  {
    id: 'dev-period',
    name: '制作期間',
    description:
      'サイトが公開されるまでの期間。短いほど早くWebからの集客や販促が始められます。',
  },
  {
    id: 'cost',
    name: '制作費用',
    description:
      '制作や運用にかかる費用。初期費用と月額費用のバランスが重要です。',
  },
  {
    id: 'customization',
    name: 'デザインの自由度',
    description: '自社のブランドや希望に合わせたデザインが実現できる柔軟性。',
  },
  {
    id: 'maintenance',
    name: '更新のしやすさ',
    description: '公開後のコンテンツ更新や管理のしやすさ。',
  },
  {
    id: 'usability',
    name: '訪問者の使いやすさ',
    description:
      'サイトを訪れた人が目的の情報を見つけやすく、快適に閲覧できるかどうか。',
  },
  {
    id: 'security',
    name: 'セキュリティ対策',
    description: '悪意ある攻撃やデータ消失などからサイトを守る能力。',
  },
  {
    id: 'seo',
    name: 'SEO対策',
    description: '検索エンジンで上位表示されるための対策が施されているか。',
  },
  {
    id: 'responsive',
    name: 'スマホ対応',
    description: '様々な端末で適切に表示されるレスポンシブデザインの品質。',
  },
];

// 比較データ
export const comparisonData: ComparisonData[] = [
  {
    item: comparisonItems[0], // 制作期間
    traditional: {
      rating: '△',
      description:
        '一般的なホームページ制作会社では、企画から公開まで3〜6ヶ月程度かかることが多く、規模によってはさらに長期化することもあります。',
    },
    template: {
      rating: '◎',
      description:
        'テンプレートを選んで情報を入力するだけなので、最短数時間〜1日程度で公開できます。ただし、カスタマイズに時間をかけると長くなります。',
    },
    ninuma: {
      rating: '○',
      description:
        '効率的な制作フローにより、LPなら最短2週間、企業サイトなら1〜2ヶ月で公開可能。テンプレートサービスより若干時間はかかりますが、オリジナル性を保ちながら早期公開が可能です。',
    },
  },
  {
    item: comparisonItems[1], // 費用
    traditional: {
      rating: '×',
      description:
        'フルオーダーメイドのため高額になりがち。中小企業向けでも50〜200万円程度、大規模サイトだと300万円以上かかることも多いです。',
    },
    template: {
      rating: '◎',
      description:
        '初期費用は非常に安く、無料〜数万円程度から始められます。ただし、月額費用が継続的に発生し、有料プランでないと広告が表示されることも。',
    },
    ninuma: {
      rating: '○',
      description:
        '目的に合った最適なプランを提案。同規模のサイトなら従来型制作会社より30〜50%程度費用を抑えられます。テンプレートサービスより高いものの、オリジナル性と集客力を考えると費用対効果は高いです。',
    },
  },
  {
    item: comparisonItems[2], // デザインの自由度
    traditional: {
      rating: '◎',
      description:
        '完全オリジナルデザインで、ブランドや希望に合わせた自由な表現が可能。他社と差別化したいときに適しています。',
    },
    template: {
      rating: '△',
      description:
        'テンプレートのバリエーションは多いものの、基本構造や配色などの制約が大きく、完全に自社のブランドに合わせることが難しい場合があります。',
    },
    ninuma: {
      rating: '○',
      description:
        '効率的なフレームワークをベースにしながらも、デザインカスタマイズの自由度は高く、ブランドイメージに合わせたオリジナリティのあるデザインが実現可能です。',
    },
  },
  {
    item: comparisonItems[3], // 更新のしやすさ
    traditional: {
      rating: '△',
      description:
        '更新システム（CMS）を導入しない場合、専門知識が必要で外注コストがかかります。CMSを導入してもカスタマイズが複雑な場合は使いこなせないことも。',
    },
    template: {
      rating: '○',
      description:
        '更新が簡単なのが最大の特徴で、専門知識がなくても直感的に操作できます。ただし、自由なレイアウト変更などには制約があります。',
    },
    ninuma: {
      rating: '◎',
      description:
        '直感的で使いやすい管理画面を標準装備し、更新マニュアルやトレーニングも提供。複雑な更新作業もサポートし、必要に応じてWEB会議での遠隔操作も可能です。',
    },
  },
  {
    item: comparisonItems[4], // 訪問者の使いやすさ
    traditional: {
      rating: '○',
      description:
        '設計者のスキルによって大きく左右されます。優れたUI/UX設計ができる制作会社なら非常に使いやすいサイトになりますが、そうでない場合は使いにくいサイトになることも。',
    },
    template: {
      rating: '○',
      description:
        '基本的な使いやすさは確保されていますが、サイト独自の機能や複雑な情報構造には対応しにくく、一般的なパターンに限られます。',
    },
    ninuma: {
      rating: '◎',
      description:
        '訪問者の目的達成を最重視した設計で、行動導線を最適化。定期的なユーザビリティテストと改善を行い、訪問者がストレスなく情報を得られるサイト構築を徹底しています。',
    },
  },
  {
    item: comparisonItems[5], // セキュリティ対策
    traditional: {
      rating: '○',
      description:
        '制作会社のセキュリティに対する知識と姿勢によって大きく異なります。適切な対策が施されれば安全性は高いですが、保守契約が切れると脆弱性対応が遅れることも。',
    },
    template: {
      rating: '◎',
      description:
        '大手サービスなら自動的に最新のセキュリティ対策が適用され、バックアップも自動化されているため安心度は高いです。',
    },
    ninuma: {
      rating: '○',
      description:
        '常時SSL対応、定期的なセキュリティアップデート、バックアップ体制を標準装備。サイトのセキュリティ診断も定期的に実施し、脆弱性を素早く修正します。',
    },
  },
  {
    item: comparisonItems[6], // SEO対策
    traditional: {
      rating: '○',
      description:
        'SEO対策への知識と実績がある制作会社を選べば効果的な対策が可能ですが、技術的SEOへの理解が不足している制作会社も少なくありません。',
    },
    template: {
      rating: '△',
      description:
        '基本的なSEO対策は施されていますが、サイト構造の制約があり、競争の激しいキーワードでの上位表示は難しい場合が多いです。',
    },
    ninuma: {
      rating: '◎',
      description:
        '内部SEO対策を標準装備し、検索エンジンに評価される構造設計とコンテンツ戦略を実施。業界・地域特化のキーワード調査と競合分析に基づく効果的なSEO施策を提案します。',
    },
  },
  {
    item: comparisonItems[7], // スマホ対応
    traditional: {
      rating: '○',
      description:
        '最近の制作会社ならレスポンシブデザインは標準対応していますが、デザイン優先でスマホ表示が使いにくくなるケースもあります。',
    },
    template: {
      rating: '○',
      description:
        '基本的にはスマホ対応済みのテンプレートが多いですが、カスタマイズによっては崩れる場合もあり、テスト不足になりがちです。',
    },
    ninuma: {
      rating: '◎',
      description:
        '訪問者の約7割がスマホ利用という現状を踏まえ、「モバイルファースト」の設計思想を採用。各端末での徹底した表示確認と最適化を行います。',
    },
  },
];
