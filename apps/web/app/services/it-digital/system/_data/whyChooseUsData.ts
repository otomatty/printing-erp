import {
	Shield,
	Clock,
	HeartHandshake,
	Lightbulb,
	Layers,
	Award,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// 選ばれる理由のカード用データ型
export interface ReasonCardData {
	icon: LucideIcon;
	title: string;
	description: string;
	highlights?: string[]; // 文中で強調したい語句
}

// 開発原則用データ型
export interface DevelopmentPrincipleData {
	number: number;
	title: string;
	description?: string; // 必要に応じて詳細説明を追加可能
}

// 顧客関係性の指標用データ型
export interface RelationshipMetricData {
	metric: string;
	value: string;
}

// 選ばれる理由のカードデータ
export const reasonCards: ReasonCardData[] = [
	{
		icon: Clock,
		title: "すぐに使える！ 部分から始める開発",
		description:
			"全部を一度に作るのではなく、必要な機能から順番に開発します。最短2週間で一部機能が使えるようになり、少ない初期費用で徐々に便利にしていきます。",
		highlights: ["最短2週間", "少ない初期費用", "徐々に便利に"],
	},
	{
		icon: Shield,
		title: "大切な情報をしっかり守る仕組み",
		description:
			"最新のセキュリティ対策をしっかり実施。定期的なバックアップや厳格なアクセス管理で会社の大切な情報を守ります。",
		highlights: [
			"最新のセキュリティ",
			"定期的なバックアップ",
			"大切な情報を守る",
		],
	},
	{
		icon: HeartHandshake,
		title: "システム導入後も安心のサポート",
		description:
			"システムを作って終わりではなく、使い方のトレーニングや困ったときの相談対応など、継続的にフォロー。緊急時は最短30分以内に対応し、安心して業務を続けられます。",
		highlights: ["使い方のトレーニング", "最短30分以内", "安心して業務"],
	},
	{
		icon: Layers,
		title: "あなたの業種の課題に詳しいから的確",
		description:
			"製造業、小売業、サービス業など様々な業種のシステム開発実績があり、それぞれの業界特有の悩みや必要な機能を理解。「うちの業務に合わない」というストレスを解消します。",
		highlights: ["様々な業種", "業界特有の悩み", "ストレスを解消"],
	},
	{
		icon: Lightbulb,
		title: "最新技術も取り入れて長く使える",
		description:
			"AI、クラウド、セキュリティなど新しい技術もお客様に合った形で取り入れ、古くならないシステム作りを心がけています。将来の事業拡大にも対応できる柔軟な設計です。",
		highlights: ["最新技術", "古くならない", "事業拡大にも対応"],
	},
	{
		icon: Award,
		title: "効果が出なければ料金も変わる仕組み",
		description:
			"一部のプロジェクトでは「効果が出た分だけ料金をいただく」プランもご用意。たとえば作業時間の短縮や売上アップなど、目に見える成果に応じた料金設定で、安心してご依頼いただけます。",
		highlights: ["効果が出た分", "目に見える成果", "安心してご依頼"],
	},
];

// 開発5原則のデータ
export const developmentPrinciples: DevelopmentPrincipleData[] = [
	{
		number: 1,
		title: "使う人目線の設計",
		description: "実際に使う方の意見を取り入れた使いやすさ重視",
	},
	{
		number: 2,
		title: "コスパを最大に",
		description: "投資以上の効果を生み出す費用対効果重視",
	},
	{
		number: 3,
		title: "情報を守る対策",
		description: "お客様の大切なデータを確実に保護",
	},
	{
		number: 4,
		title: "小さく始めて成長",
		description: "少しずつ確実に便利にしていく開発方法",
	},
	{
		number: 5,
		title: "常に改善を続ける",
		description: "使いながら定期的に見直して進化させる",
	},
];

// 顧客関係性の指標データ
export const relationshipMetrics: RelationshipMetricData[] = [
	{
		metric: "お客様の継続率",
		value: "94.7%",
	},
	{
		metric: "お客様満足度",
		value: "4.8/5.0点",
	},
	{
		metric: "追加の相談をいただく割合",
		value: "85%",
	},
];
