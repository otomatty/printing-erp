import React from 'react';
import type { PricingSectionProps } from '../../_common/pricing';

// 予算アイコン
const BudgetIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <title>予算アイコン</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// ROIアイコン
const ROIIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <title>ROIアイコン</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

// 効率化アイコン
const EfficiencyIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <title>効率化アイコン</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// スケーラビリティアイコン
const ScalabilityIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <title>スケーラビリティアイコン</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
    />
  </svg>
);

// 業務システム開発のサービスデータ
export const serviceData = {
  basePackage: {
    title: '業務システムベースパッケージ',
    startingPrice: {
      value: 68,
      unit: '万円',
      standardPrice: {
        value: 180,
        unit: '万円',
      },
      discount: '約62%お得',
    },
    description:
      '基本的な業務プロセス自動化と認証機能を含む業務システムの基本パッケージ',
    features: [
      'かんたんデータ入力・管理機能',
      '社員ごとのアクセス権限設定',
      '顧客・売上データの管理',
      'スマホ・タブレット対応画面',
      'サクサク動作する高速システム',
      '業務状況が一目でわかるダッシュボード',
      'Excel/CSVデータの取込・出力',
      '経営判断に役立つ集計レポート',
    ],
    monthlyPayment: {
      value: 5.7,
      unit: '万円',
      duration: '12回',
    },
  },
};

// 自動見積もりデータ
export const estimateData = {
  title: 'かんたん自動見積もり',
  description:
    'お客様の業務課題や規模に応じた最適な見積もりを、AIが短時間で算出します。システム開発の効果予測や投資対効果(ROI)も同時に確認でき、ビジネスにもたらす具体的な価値を数値で把握できます。',
  features: [
    {
      title: 'コスト最適化',
      description: '必要な機能だけに投資',
      icon: <BudgetIcon />,
      color: 'blue' as const,
    },
    {
      title: '投資回収計算',
      description: 'ROIの可視化',
      icon: <ROIIcon />,
      color: 'indigo' as const,
    },
    {
      title: '業務効率化予測',
      description: '工数削減率の試算',
      icon: <EfficiencyIcon />,
      color: 'purple' as const,
    },
    {
      title: '拡張性分析',
      description: '将来的な機能拡張コスト',
      icon: <ScalabilityIcon />,
      color: 'green' as const,
    },
  ],
  cta: {
    title: 'あなたの業務課題に最適な開発プランを発見',
    description:
      '約3分の質問に答えるだけで、業務効率化とコスト削減を実現するシステム開発の見積もりと効果予測を無料で取得できます。',
    buttonText: '無料で自動見積もりを試す',
    buttonLink: '/services/it-digital/system/estimate',
    service: 'system',
    disclaimer: '* 入力情報は安全に保護され、営業電話などはありません',
  },
};

// 分割払い情報
export const paymentInfo = {
  title: '分割払いで導入しやすく',
  description: (
    <>
      <p className="text-lg mb-3">
        <span className="font-bold text-red-600 text-xl">金利0%</span>
        の分割払いで、初期投資の負担を軽減できます
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="font-bold text-center mb-2">12回払いの場合</p>
          <p className="text-center text-lg">
            月々<span className="font-bold text-xl">5.7万円</span>から
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="font-bold text-center mb-2">一括払いの場合</p>
          <p className="text-center">
            <span className="font-bold text-lg">5%割引</span>特典あり
          </p>
        </div>
      </div>
    </>
  ),
};

// 注意書き
export const notes = [
  '表示価格はベースとなる最低料金です。実際のプロジェクト範囲や業務複雑性により変動します。',
  'MVPアプローチにより、最初に核となる機能を開発し、段階的に機能を拡張していくことで、初期投資を抑えつつ早期に効果を実感できます。',
  '納品後のサポート期間は1ヶ月間の無料サポート期間があります。継続的な保守・運用サポートは別途契約が可能です。',
  '通常の開発費用と比較し、Next.js × Supabase × AI駆動開発により55〜60%のコスト削減が可能になっています。',
];

// 説明文
export const description = (
  <>
    従来の業務システム開発と比較して
    <span className="font-semibold text-primary">最大60%お得な料金</span>
    でMVPアプローチによる短期開発を実現
  </>
);

// プライシングセクション全体のデータ
export const systemPricingData: Omit<PricingSectionProps, 'id'> = {
  title: '料金プラン',
  description,
  benefitText:
    'Next.js × Supabase × AI駆動開発による最大60%のコスト削減・段階的リリース・早期の投資回収',
  serviceData,
  estimateProps: estimateData,
  paymentInfo,
  notes,
};
