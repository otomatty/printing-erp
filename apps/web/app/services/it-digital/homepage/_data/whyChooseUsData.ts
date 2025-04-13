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
		title: "素早い制作スピード",
		description:
			"フレームワークの活用と効率的な制作フローで、一般的な制作会社より早く納品。最短2週間で公開できるLP制作から、本格サイトは1〜2ヶ月で公開できます。",
		highlights: ["最短2週間", "効率的な制作フロー", "1〜2ヶ月で公開"],
	},
	{
		icon: Shield,
		title: "セキュリティ対策と安定運用",
		description:
			"常時SSL対応やウイルス対策、定期的なバックアップなど、安全性に配慮したサイト構築。サイトのセキュリティ診断も定期的に実施して安心です。",
		highlights: ["常時SSL対応", "定期的なバックアップ", "セキュリティ診断"],
	},
	{
		icon: HeartHandshake,
		title: "公開後も安心のサポート",
		description:
			"サイト公開で終わりではなく、アクセス解析レポートの提供や更新サポート、SEO改善提案など継続的にフォロー。困ったときは最短1時間以内に対応します。",
		highlights: ["アクセス解析レポート", "最短1時間以内", "継続的にフォロー"],
	},
	{
		icon: Layers,
		title: "業種別の特化型デザイン",
		description:
			"小売業、建設業、飲食業など業種ごとに効果的なデザインパターンを熟知。それぞれの業界特有の顧客心理や購買行動を理解したサイト設計で成果につなげます。",
		highlights: ["業種ごとに効果的", "顧客心理", "成果につなげる"],
	},
	{
		icon: Lightbulb,
		title: "SEOとUXの両立",
		description:
			"検索エンジンからの流入を増やすSEO対策と、訪問者が使いやすいUI/UXデザインを両立。「見た目が良いだけ」「検索順位は良いけど使いにくい」といった片寄りがありません。",
		highlights: ["SEO対策", "UI/UXデザイン", "両立"],
	},
	{
		icon: Award,
		title: "更新のしやすさを重視",
		description:
			"専門知識がなくても簡単に更新できるCMS導入で、情報をいつでも最新に保てます。更新作業の内製化で外注コストを削減し、思いついたときにすぐ情報発信できる体制を構築します。",
		highlights: ["簡単に更新", "外注コスト削減", "すぐ情報発信"],
	},
];

// 開発5原則のデータ
export const developmentPrinciples: DevelopmentPrincipleData[] = [
	{
		number: 1,
		title: "訪問者目線のデザイン",
		description: "顧客の行動心理を考慮した直感的な導線設計",
	},
	{
		number: 2,
		title: "高速表示の追求",
		description: "離脱を防ぐ読み込み速度の最適化",
	},
	{
		number: 3,
		title: "SEO内部対策標準装備",
		description: "検索エンジンで上位表示される構造設計",
	},
	{
		number: 4,
		title: "レスポンシブデザイン",
		description: "あらゆる端末で最適に表示されるサイト",
	},
	{
		number: 5,
		title: "成果にこだわる制作",
		description: "問い合わせや売上につながる目的特化型設計",
	},
];

// 顧客関係性の指標データ
export const relationshipMetrics: RelationshipMetricData[] = [
	{
		metric: "リピート制作率",
		value: "92.3%",
	},
	{
		metric: "お客様満足度",
		value: "4.9/5.0点",
	},
	{
		metric: "公開後サポート利用率",
		value: "88%",
	},
];
