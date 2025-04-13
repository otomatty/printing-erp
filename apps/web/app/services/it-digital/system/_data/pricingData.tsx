import React from "react";
import type {
	PlanCardProps,
	PricingSectionProps,
} from "../../_common/PricingSection";

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

// 料金プラン
export const plans: PlanCardProps[] = [
	{
		color: "teal",
		targetAudience: "小規模ビジネス・個人事業主向け",
		title: "ライトプラン",
		originalPrice: "110～150万円",
		price: "68万円～",
		discountPercentage: "最大45%",
		monthlyPrice: "月々5.7万円～",
		features: [
			"基本的な業務プロセス自動化",
			"MVPアプローチによる短期開発",
			"1つの業務フロー最適化",
			"開発期間中の修正無制限",
		],
		deliveryPeriod: "最短30日で初期リリース",
	},
	{
		color: "blue",
		targetAudience: "中小企業・成長企業向け",
		title: "スタンダードプラン",
		originalPrice: "180～250万円",
		price: "120万円～",
		discountPercentage: "最大50%",
		monthlyPrice: "月々10万円～",
		features: [
			"複数業務プロセスの統合と自動化",
			"データ分析・可視化ダッシュボード",
			"クラウド連携機能",
			"納品後2ヶ月間の無償修正・改善",
		],
		deliveryPeriod: "最短45日で初期リリース",
	},
	{
		color: "purple",
		targetAudience: "中～大規模企業向け",
		title: "プレミアムプラン",
		originalPrice: "300～450万円",
		price: "200万円～",
		discountPercentage: "最大55%",
		monthlyPrice: "月々16.7万円～",
		features: [
			"全社的業務システム統合",
			"AIによる業務自動化と意思決定支援",
			"複数システム間連携・API開発",
			"納品後6ヶ月間の保守・運用サポート",
		],
		deliveryPeriod: "最短60日で初期リリース",
	},
];

// 自動見積もりデータ
export const estimateData = {
	title: "AIによる自動見積もりシステム",
	description:
		"お客様の業務課題や規模に応じた最適な見積もりを、AIが短時間で算出します。システム開発の効果予測や投資対効果(ROI)も同時に確認でき、ビジネスにもたらす具体的な価値を数値で把握できます。",
	features: [
		{
			title: "コスト最適化",
			description: "必要な機能だけに投資",
			icon: <BudgetIcon />,
			color: "blue" as const,
		},
		{
			title: "投資回収計算",
			description: "ROIの可視化",
			icon: <ROIIcon />,
			color: "indigo" as const,
		},
		{
			title: "業務効率化予測",
			description: "工数削減率の試算",
			icon: <EfficiencyIcon />,
			color: "purple" as const,
		},
		{
			title: "拡張性分析",
			description: "将来的な機能拡張コスト",
			icon: <ScalabilityIcon />,
			color: "green" as const,
		},
	],
	cta: {
		title: "あなたの業務課題に最適な開発プランを発見",
		description:
			"約3分の質問に答えるだけで、業務効率化とコスト削減を実現するシステム開発の見積もりと効果予測を無料で取得できます。",
		buttonText: "無料で自動見積もりを試す",
		buttonLink: "/services/it-digital/system/estimate",
		disclaimer: "* 入力情報は安全に保護され、営業電話などはありません",
	},
};

// 支払いオプション
export const paymentOptions = [
	{
		title: "一括払い",
		description: "一括払いで5%割引",
	},
	{
		title: "分割払い（最大12回）",
		description: "金利0%の分割払い",
		isHighlighted: true,
	},
];

// 注意書き
export const notes = [
	"料金は一般的な目安です。実際のプロジェクト範囲や業務複雑性により変動します。",
	"MVPアプローチにより、最初に核となる機能を開発し、段階的に機能を拡張していくことで、初期投資を抑えつつ早期に効果を実感できます。",
	"納品後のサポート期間はプランによって異なります。ライトプランは1ヶ月間、スタンダードプランは2ヶ月間、プレミアムプランは6ヶ月間の無料サポート期間があります。",
	"継続的な保守・運用サポートは別途契約が可能です。月額5〜15万円で対応しています。",
];

// 説明文
export const description = (
	<>
		従来の業務システム開発と比較して
		<span className="font-semibold text-blue-600">最大55%お得な料金</span>
		でMVPアプローチによる短期開発を実現
	</>
);

// プライシングセクション全体のデータ
export const systemPricingData: PricingSectionProps = {
	title: "料金プラン",
	description,
	benefitText: "短期開発・段階的リリース・明確な料金体系・早期の投資回収",
	plans,
	estimateProps: estimateData,
	paymentOptions,
	notes,
};
