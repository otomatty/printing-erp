import React from "react";
// import Image from 'next/image'; // 必要に応じて Image コンポーネントを使用

const Portfolio = () => {
	// TODO: 実際のロゴデザイン実績画像と情報を準備
	const portfolioItems = [
		{
			id: 1,
			image: "/images/logo-placeholder.png",
			title: "IT企業 コーポレートロゴ",
			description: "先進性と信頼性を表現したシンボルマーク",
		},
		{
			id: 2,
			image: "/images/logo-placeholder.png",
			title: "カフェ 店舗ロゴ",
			description: "手書き風の温かみのあるロゴタイプ",
		},
		{
			id: 3,
			image: "/images/logo-placeholder.png",
			title: "地域ブランド 商品ロゴ",
			description: "特産品をモチーフにした親しみやすいロゴ",
		},
	];

	return (
		<section className="container mx-auto px-4 py-16">
			<h2 className="text-3xl font-bold text-center mb-12">制作実績</h2>
			{/* TODO: ロゴの実績をギャラリー形式で表示 */}
			<div className="grid md:grid-cols-3 gap-8">
				{portfolioItems.map((item) => (
					<div
						key={item.id}
						className="bg-white rounded-lg shadow-md overflow-hidden text-center"
					>
						<div className="flex justify-center items-center h-48 bg-gray-50 p-4 border-b">
							{/* <Image src={item.image} alt={item.title} width={150} height={150} className="max-h-full max-w-full object-contain" /> */}
							<img
								src={item.image}
								alt={item.title}
								className="max-h-full max-w-full object-contain"
							/>
						</div>
						<div className="p-4">
							<h3 className="text-lg font-semibold mb-1">{item.title}</h3>
							<p className="text-sm text-gray-600">{item.description}</p>
						</div>
					</div>
				))}
			</div>
			{/* TODO: ポートフォリオ一覧ページへのリンクやカテゴリフィルタなどを追加 */}
		</section>
	);
};

export default Portfolio;
