import React from "react";
// import Image from 'next/image'; // 必要に応じて Image コンポーネントを使用

const WorkShowcase = () => {
	// TODO: 実際のグラフィックデザイン実績画像と情報を準備
	const showcaseItems = [
		{
			id: 1,
			image: "/images/graphic-placeholder.jpg",
			title: "飲食店 開店告知チラシ",
			description: "シズル感のある写真と魅力的なコピーで集客",
		},
		{
			id: 2,
			image: "/images/graphic-placeholder.jpg",
			title: "企業 会社案内パンフレット",
			description: "信頼性と事業内容を分かりやすく伝えるデザイン",
		},
		{
			id: 3,
			image: "/images/graphic-placeholder.jpg",
			title: "イベント告知ポスター",
			description: "ターゲット層に響くインパクトのあるビジュアル",
		},
	];

	return (
		<section className="container mx-auto px-4 py-16">
			<h2 className="text-3xl font-bold text-center mb-12">制作実績</h2>
			{/* TODO: 実績をギャラリー形式で表示 */}
			<div className="grid md:grid-cols-3 gap-8">
				{showcaseItems.map((item) => (
					<div
						key={item.id}
						className="bg-white rounded-lg shadow-md overflow-hidden"
					>
						{/* <Image src={item.image} alt={item.title} width={400} height={300} className="w-full h-64 object-cover border-b" /> */}
						<img
							src={item.image}
							alt={item.title}
							className="w-full h-64 object-cover border-b"
						/>
						<div className="p-4">
							<h3 className="text-lg font-semibold mb-2">{item.title}</h3>
							<p className="text-sm text-gray-600">{item.description}</p>
						</div>
					</div>
				))}
			</div>
			{/* TODO: 制作実績一覧ページへのリンクやカテゴリフィルタなどを追加 */}
		</section>
	);
};

export default WorkShowcase;
