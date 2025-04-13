import type { PricingSectionProps } from "../../_common/PricingSection";
import type React from "react";

export const homepagePricingData: Omit<PricingSectionProps, "id"> = {
	title: "料金プラン",
	description:
		"ニーズや予算に合わせて、最適なホームページ制作プランをご用意しています。一括支払いだけでなく月額払いプランもご用意。ホームページは完成してからが本番。継続的な運営をサポートするプランもございます。",
	benefitText: "明確な料金体系・修正回数無制限・運用サポート付き",
	plans: [
		{
			color: "teal",
			targetAudience: "小規模ビジネス向け",
			title: "お手軽スタート",
			originalPrice: "20万円",
			price: "15万円〜",
			discountPercentage: "25%",
			monthlyPrice: "月々12,500円〜",
			features: [
				"ページ数：5ページ程度",
				"レスポンシブデザイン対応",
				"お問い合わせフォーム実装",
				"基本的なSEO対策",
				"Google Analytics設定",
				"月1回の更新サポート（3ヶ月間）",
			],
			deliveryPeriod: "最短1ヶ月でサイト公開",
		},
		{
			color: "blue",
			targetAudience: "成長中のビジネス向け",
			title: "ビジネス成長",
			originalPrice: "50万円",
			price: "35万円〜",
			discountPercentage: "30%",
			monthlyPrice: "月々29,167円〜",
			features: [
				"ページ数：10〜15ページ",
				"高品質なオリジナルデザイン",
				"CMS実装（更新管理システム）",
				"お問い合わせフォーム（高機能）",
				"詳細なSEO対策・内部最適化",
				"SNS連携・ブログ機能",
				"アクセス解析レポート（6ヶ月間）",
				"更新サポート&技術サポート（6ヶ月間）",
			],
			deliveryPeriod: "最短1.5〜2ヶ月でサイト公開",
		},
		{
			color: "purple",
			targetAudience: "本格的な集客を目指す企業向け",
			title: "プレミアム集客",
			originalPrice: "100万円",
			price: "75万円〜",
			discountPercentage: "25%",
			monthlyPrice: "月々62,500円〜",
			features: [
				"ページ数：20ページ以上",
				"プレミアムデザイン&ブランディング",
				"高度なCMS・管理機能",
				"多言語対応（オプション）",
				"EC機能・予約システム（オプション）",
				"詳細なSEO対策&コンテンツマーケティング",
				"コンバージョン最適化施策",
				"月次アクセス解析&改善提案（12ヶ月間）",
				"優先サポート&無制限更新（12ヶ月間）",
			],
			deliveryPeriod: "最短2〜3ヶ月でサイト公開",
		},
	],
	notes: [
		"料金は一般的な目安です。サイトの規模や機能によって価格は変動します。詳細はお問い合わせください。",
		"表示価格は税抜きです。",
		"修正対応は「納品までの修正」と「納品後の修正」で区分され、納品前の修正は事前の仕様確認内容に基づく範囲で対応いたします。",
		"各プランには公開後の無料修正期間が含まれています（お手軽プラン：1ヶ月、ビジネスプラン：3ヶ月、プレミアムプラン：6ヶ月）。",
	],
	estimateProps: {
		title: "無料お見積り・ご相談",
		description:
			"ホームページ制作に関するご質問や具体的なお見積りをご希望の方は、お気軽にご相談ください。",
		features: [
			{
				title: "スピーディーな対応",
				description: "お問い合わせから最短1営業日以内にご連絡いたします。",
				icon: (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>迅速な対応を表す時計アイコン</title>
						<circle cx="12" cy="12" r="10" />
						<polyline points="12 6 12 12 16 14" />
					</svg>
				),
				color: "blue",
			},
			{
				title: "無料相談・お見積り",
				description: "初回のご相談とお見積りは完全無料です。",
				icon: (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>お見積りを表す書類アイコン</title>
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
						<polyline points="14 2 14 8 20 8" />
						<line x1="16" y1="13" x2="8" y2="13" />
						<line x1="16" y1="17" x2="8" y2="17" />
						<polyline points="10 9 9 9 8 9" />
					</svg>
				),
				color: "indigo",
			},
			{
				title: "プロのアドバイス",
				description: "Web制作の専門家が最適なプランをご提案します。",
				icon: (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>プロのアドバイスを表すチームアイコン</title>
						<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
						<circle cx="9" cy="7" r="4" />
						<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
						<path d="M16 3.13a4 4 0 0 1 0 7.75" />
					</svg>
				),
				color: "purple",
			},
			{
				title: "明確な料金提示",
				description: "追加費用が発生しない明朗会計で安心です。",
				icon: (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>明確な料金を表す円マークアイコン</title>
						<circle cx="12" cy="12" r="10" />
						<path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
						<line x1="12" y1="18" x2="12" y2="21" />
						<line x1="12" y1="3" x2="12" y2="6" />
					</svg>
				),
				color: "green",
			},
		],
		cta: {
			title: "まずはお気軽にご相談ください",
			description: "お電話またはメールフォームよりお問い合わせいただけます。",
			buttonText: "無料相談する",
			buttonLink: "/contact",
			disclaimer: "※ご相談は完全無料・営業の強要はありません",
		},
	},
	paymentOptions: [
		{
			title: "一括払い",
			description: "一括払いで5%割引",
		},
		{
			title: "分割払い（最大12回）",
			description: "金利0%の分割払い",
			isHighlighted: true,
		},
	],
};
