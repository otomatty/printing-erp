import type { Work } from "@/app/(marketing)/services/it-digital/works/_components/WorksList";

// 実績データ
export const works: Work[] = [
	{
		id: 1,
		title: "建設会社コーポレートサイト",
		category: "homepage",
		industry: "construction",
		image: "/images/works/homepage-construction.jpg",
		description:
			"創業50周年を機に、企業ブランディングとリクルーティング強化を目的としたコーポレートサイトのリニューアル。レスポンシブ対応とSEO対策を実施し、採用問い合わせが前年比150%に増加。",
		technologies: ["Next.js", "Tailwind CSS", "WordPress"],
		year: 2023,
	},
	{
		id: 2,
		title: "飲食店予約・顧客管理システム",
		category: "system",
		industry: "restaurant",
		image: "/images/works/system-restaurant.jpg",
		description:
			"複数店舗を展開する飲食チェーン向けのオンライン予約システムと顧客管理システムの開発。電話予約の手間を削減し、顧客データの一元管理を実現。リピート率が20%向上。",
		technologies: ["React", "Node.js", "MongoDB", "AWS"],
		year: 2022,
	},
	{
		id: 3,
		title: "製造業DX推進支援",
		category: "consulting",
		industry: "manufacturing",
		image: "/images/works/consulting-manufacturing.jpg",
		description:
			"製造現場のデジタル化プロジェクトを支援。紙ベースの工程管理をタブレット入力に変更し、リアルタイムでの進捗管理を実現。生産性が15%向上、不良率が5%低減。",
		technologies: ["業務分析", "システム選定", "クラウド移行", "データ分析"],
		year: 2023,
	},
	{
		id: 4,
		title: "不動産ポータルサイト",
		category: "homepage",
		industry: "realestate",
		image: "/images/works/homepage-realestate.jpg",
		description:
			"物件検索機能、お気に入り登録、問い合わせフォームを備えた不動産ポータルサイトの構築。管理システムと連携し、物件情報の自動更新を実現。",
		technologies: ["Vue.js", "Laravel", "MySQL", "Google Maps API"],
		year: 2022,
	},
	{
		id: 5,
		title: "医療機関向け患者管理システム",
		category: "system",
		industry: "healthcare",
		image: "/images/works/system-healthcare.jpg",
		description:
			"診療所向けのオンライン予約システムと電子カルテ連携システムの開発。受付業務の効率化と待ち時間短縮を実現し、患者満足度が向上。",
		technologies: ["React", "Python/Django", "PostgreSQL", "Docker"],
		year: 2023,
	},
	{
		id: 6,
		title: "小売業AI活用支援",
		category: "consulting",
		industry: "retail",
		image: "/images/works/consulting-retail.jpg",
		description:
			"生成AIを活用した商品説明文作成と顧客対応の効率化コンサルティング。マニュアル作成と社内研修を実施し、業務時間を30%削減。",
		technologies: ["AI活用", "業務改善", "マニュアル整備", "社内研修"],
		year: 2023,
	},
	{
		id: 7,
		title: "ECサイトリニューアル",
		category: "homepage",
		industry: "retail",
		image: "/images/works/homepage-ec.jpg",
		description:
			"老舗食品メーカーのECサイトをモバイルファーストで再設計。ユーザビリティ改善とページ表示速度の最適化により、コンバージョン率が2倍に向上。",
		technologies: ["Shopify", "React", "Contentful", "Google Analytics"],
		year: 2022,
	},
	{
		id: 8,
		title: "在庫・発注管理システム",
		category: "system",
		industry: "manufacturing",
		image: "/images/works/system-inventory.jpg",
		description:
			"製造業向けの在庫管理・発注管理システムの開発。バーコード読取機能と連携し、入出庫管理を効率化。在庫精度向上と欠品率低減を実現。",
		technologies: ["React Native", "Express.js", "MySQL", "Barcode API"],
		year: 2023,
	},
	{
		id: 9,
		title: "IT戦略立案支援",
		category: "consulting",
		industry: "education",
		image: "/images/works/consulting-education.jpg",
		description:
			"教育機関向けのIT戦略策定支援。デジタル教材活用とオンライン授業環境の整備を支援し、教職員のICTリテラシー向上プログラムを実施。",
		technologies: ["IT戦略", "ICT教育", "環境整備", "研修プログラム"],
		year: 2022,
	},
	{
		id: 10,
		title: "観光PRサイト",
		category: "homepage",
		industry: "government",
		image: "/images/works/homepage-tourism.jpg",
		description:
			"地方自治体の観光PR用Webサイト制作。インタラクティブなマップ機能や多言語対応を実装し、国内外からのアクセス増加に貢献。",
		technologies: ["Next.js", "i18n", "Mapbox", "Contentful"],
		year: 2023,
	},
	{
		id: 11,
		title: "営業支援システム",
		category: "system",
		industry: "service",
		image: "/images/works/system-sales.jpg",
		description:
			"訪問営業を行う企業向けの営業支援システム開発。顧客データ管理、訪問スケジュール管理、活動報告機能を実装し、営業効率が向上。",
		technologies: ["Vue.js", "Firebase", "Google Maps API", "PWA"],
		year: 2022,
	},
	{
		id: 12,
		title: "クラウド移行支援",
		category: "consulting",
		industry: "finance",
		image: "/images/works/consulting-cloud.jpg",
		description:
			"金融関連企業のオンプレミスからクラウド環境への移行支援。セキュリティ要件の整理とクラウド基盤の設計、移行計画策定を支援。",
		technologies: ["クラウド設計", "セキュリティ対策", "移行計画", "AWS/Azure"],
		year: 2023,
	},
];
