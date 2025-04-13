import React from "react";
// import Image from 'next/image'; // 必要に応じて Image コンポーネントを使用

const WorkExamples = () => {
	// TODO: 実際のパッケージデザイン実績画像と情報を準備
	const examples = [
		{
			id: 1,
			image: "/images/package-placeholder.jpg",
			title: "地域特産品 ギフトボックス",
			description: "高級感と地域性を表現したデザイン",
		},
		{
			id: 2,
			image: "/images/package-placeholder.jpg",
			title: "化粧品ボトル ラベルデザイン",
			description: "ターゲット層に合わせた洗練されたデザイン",
		},
		{
			id: 3,
			image: "/images/package-placeholder.jpg",
			title: "オーガニック食品 スタンドパック",
			description: "素材の良さを伝えるナチュラルなデザイン",
		},
	];

	return (
		<section className="container mx-auto px-4 py-16">
			<h2 className="text-3xl font-bold text-center mb-12">制作実績</h2>
			{/* TODO: 実績をギャラリー形式で表示 */}
			<div className="grid md:grid-cols-3 gap-8">
				{examples.map((item) => (
					<div
						key={item.id}
						className="bg-white rounded-lg shadow-md overflow-hidden"
					>
						{/* <Image src={item.image} alt={item.title} width={400} height={300} className="w-full h-64 object-contain p-4 border-b" /> */}
						<img
							src={item.image}
							alt={item.title}
							className="w-full h-64 object-contain p-4 border-b bg-gray-50"
						/>{" "}
						{/* object-containで見切れを防ぐ */}
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

export default WorkExamples;
