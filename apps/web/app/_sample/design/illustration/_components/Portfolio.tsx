import React from "react";
// import Image from 'next/image'; // 必要に応じて Image コンポーネントを使用

const Portfolio = () => {
	// TODO: 実際のポートフォリオ画像と情報を準備
	const portfolioItems = [
		{
			id: 1,
			image: "/images/portfolio-placeholder.jpg",
			title: "Webサイト用メインビジュアル",
			description: "親しみやすいタッチでサービスの導入イメージを表現",
		},
		{
			id: 2,
			image: "/images/portfolio-placeholder.jpg",
			title: "企業キャラクターデザイン",
			description: "ターゲット層に合わせた動物モチーフのキャラクター",
		},
		{
			id: 3,
			image: "/images/portfolio-placeholder.jpg",
			title: "製品マニュアル用説明図",
			description: "複雑な手順をシンプルに図解",
		},
	];

	return (
		<section className="container mx-auto px-4 py-16">
			<h2 className="text-3xl font-bold text-center mb-12">制作実績</h2>
			{/* TODO: ポートフォリオをギャラリー形式で表示 */}
			<div className="grid md:grid-cols-3 gap-8">
				{portfolioItems.map((item) => (
					<div
						key={item.id}
						className="bg-white rounded-lg shadow-md overflow-hidden"
					>
						{/* <Image src={item.image} alt={item.title} width={400} height={300} className="w-full h-48 object-cover" /> */}
						<img
							src={item.image}
							alt={item.title}
							className="w-full h-48 object-cover border-b"
						/>
						<div className="p-4">
							<h3 className="text-lg font-semibold mb-2">{item.title}</h3>
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
