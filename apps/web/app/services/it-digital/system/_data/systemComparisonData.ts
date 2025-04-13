// 比較項目の型定義
interface ComparisonItem {
	id: string;
	name: string;
	description: string;
}

// 評価の型定義
interface Rating {
	rating: "◎" | "○" | "△" | "×";
	description: string;
}

// 比較データの型定義
interface ComparisonData {
	item: ComparisonItem;
	traditional: Rating; // 従来型開発
	package: Rating; // パッケージソフト
	ninuma: Rating; // ニイヌマ企画印刷
}

// 比較項目
export const comparisonItems: ComparisonItem[] = [
	{
		id: "dev-period",
		name: "かかる時間",
		description:
			"システムが使えるようになるまでの期間。短いほど早く業務改善が始められます。",
	},
	{
		id: "cost",
		name: "導入費用",
		description:
			"導入や運用にかかるお金。予算に合わせた計画が立てられるかどうか。",
	},
	{
		id: "customization",
		name: "自社に合わせやすさ",
		description: "自社の仕事のやり方に合わせてシステムを調整できる柔軟性。",
	},
	{
		id: "maintenance",
		name: "保守・運用の手間",
		description: "導入後の管理や更新にかかる時間とお金。",
	},
	{
		id: "usability",
		name: "使いやすさ",
		description: "パソコンが苦手な人でも簡単に使えるかどうか。",
	},
	{
		id: "security",
		name: "安全性",
		description: "情報漏れやデータ消失などのトラブルからシステムを守る能力。",
	},
	{
		id: "scalability",
		name: "将来の拡張性",
		description: "会社の成長に合わせて機能を追加したり拡げたりできる柔軟性。",
	},
	{
		id: "roi",
		name: "費用の回収期間",
		description: "システム導入にかけたお金を、効果によって取り戻すまでの期間。",
	},
];

// 比較データ
export const comparisonData: ComparisonData[] = [
	{
		item: comparisonItems[0], // かかる時間
		traditional: {
			rating: "△",
			description:
				"規模にもよりますが、基本設計から完成まで一般的に4〜8ヶ月程度かかります。大規模なシステムでは1年以上かかることも。",
		},
		package: {
			rating: "○",
			description:
				"基本機能はすぐに使えますが、業務に合わせたカスタマイズに1〜3ヶ月程度かかることがあります。",
		},
		ninuma: {
			rating: "◎",
			description:
				"必要な機能から段階的に開発し、最短1ヶ月で一部機能の利用を開始できます。全体では3〜4ヶ月で基本的なシステムが完成します。",
		},
	},
	{
		item: comparisonItems[1], // 費用
		traditional: {
			rating: "×",
			description:
				"完全オーダーメイドのため初期費用が比較的高く、中小企業向けでも通常500〜3,000万円程度。規模によってはさらに高額になることも。",
		},
		package: {
			rating: "○",
			description:
				"初期費用は100〜500万円程度と抑えられますが、年間ライセンス料や追加機能の費用が継続的に発生します。",
		},
		ninuma: {
			rating: "◎",
			description:
				"必要な機能だけに絞り無駄を省くため、同規模のシステムなら初期費用を通常より2〜3割程度抑えられます。また段階的に機能を追加できるため初期投資を分散できます。",
		},
	},
	{
		item: comparisonItems[2], // 自社に合わせやすさ
		traditional: {
			rating: "○",
			description:
				"完全に自社の業務フローに合わせた設計が可能です。ただし、要件定義に時間と労力がかかり、変更コストも比較的高めです。",
		},
		package: {
			rating: "△",
			description:
				"標準機能は使いやすいですが、特殊な業務フローには対応しきれないことがあります。カスタマイズには制限があることも。",
		},
		ninuma: {
			rating: "◎",
			description:
				"業務の流れを丁寧にヒアリングし、使う人の意見を取り入れた設計を行います。アジャイル開発手法で柔軟に調整できます。",
		},
	},
	{
		item: comparisonItems[3], // 保守・運用の手間
		traditional: {
			rating: "△",
			description:
				"保守契約が必要で、システム専門の担当者がいない場合は運用負担が大きくなることがあります。月額10〜30万円程度の保守費用が一般的。",
		},
		package: {
			rating: "○",
			description:
				"基本的なサポートは含まれていることが多く、運用は比較的容易です。ただし、バージョンアップ費用が別途発生することがあります。",
		},
		ninuma: {
			rating: "○",
			description:
				"明確な月額料金プランで安心。基本的な保守・サポートが含まれており、リモート操作による迅速なトラブル対応も可能です。",
		},
	},
	{
		item: comparisonItems[4], // 使いやすさ
		traditional: {
			rating: "○",
			description:
				"設計次第で使いやすさが大きく変わります。UIデザインに十分な時間をかけないと使いにくいシステムになるリスクがあります。",
		},
		package: {
			rating: "○",
			description:
				"多くのユーザー意見を反映して改良されているため、標準機能は非常に使いやすいことが多いです。ただしカスタマイズ部分は操作感が異なる場合も。",
		},
		ninuma: {
			rating: "◎",
			description:
				"実際に使う方の声を聞きながら画面設計を行い、定期的なフィードバックを取り入れて改善します。ITに詳しくない方でも使いやすいUIを心がけています。",
		},
	},
	{
		item: comparisonItems[5], // 安全性
		traditional: {
			rating: "○",
			description:
				"セキュリティ設計は柔軟に行えますが、保守契約が切れると更新されずリスクが高まる場合があります。",
		},
		package: {
			rating: "◎",
			description:
				"多くのユーザーが利用しているため、セキュリティ対策が充実しており、定期的なアップデートで脆弱性対策も行われます。",
		},
		ninuma: {
			rating: "○",
			description:
				"定期的なセキュリティアップデートとバックアップ体制を標準装備。中小企業の予算内でも実現可能なセキュリティ対策を提案します。",
		},
	},
	{
		item: comparisonItems[6], // 将来の拡張性
		traditional: {
			rating: "○",
			description:
				"設計が適切であれば高い拡張性を確保できますが、追加開発にはそれなりのコストと時間がかかります。",
		},
		package: {
			rating: "△",
			description:
				"標準機能の範囲内では拡張しやすいですが、パッケージの想定外の機能追加は難しい場合があります。",
		},
		ninuma: {
			rating: "◎",
			description:
				"将来の成長を見据えた設計と、段階的な機能追加を前提としたアーキテクチャにより、事業の変化に合わせて柔軟に拡張できます。",
		},
	},
	{
		item: comparisonItems[7], // 費用の回収期間
		traditional: {
			rating: "△",
			description:
				"初期費用が高いため、投資回収には通常2〜3年程度かかることが多いです。",
		},
		package: {
			rating: "○",
			description:
				"初期費用が比較的抑えられるため、効果的に活用できれば1〜2年程度での投資回収が可能です。",
		},
		ninuma: {
			rating: "◎",
			description:
				"必要な機能から段階的に導入でき、初期から効果を実感できるため、約1〜2年での投資回収が見込めます。効果測定も定期的に行います。",
		},
	},
];
