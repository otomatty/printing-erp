import React from "react";
// import Image from 'next/image'; // 必要に応じて Image コンポーネントを使用

const BeforeAfterExamples = () => {
	// TODO: 実際の Before/After 画像データを準備
	const examples = [
		{
			id: 1,
			before: "/images/placeholder-before.jpg",
			after: "/images/placeholder-after.jpg",
			description: "色褪せた古い写真の修復",
		},
		{
			id: 2,
			before: "/images/placeholder-before.jpg",
			after: "/images/placeholder-after.jpg",
			description: "人物写真の肌レタッチ",
		},
		{
			id: 3,
			before: "/images/placeholder-before.jpg",
			after: "/images/placeholder-after.jpg",
			description: "商品写真の背景切り抜き",
		},
	];

	return (
		<section className="container mx-auto px-4 py-16">
			<h2 className="text-3xl font-bold text-center mb-12">
				加工事例 (Before/After)
			</h2>
			{/* TODO: Before/After を比較しやすいレイアウトで表示 (スライダー、左右並列など) */}
			<div className="grid md:grid-cols-3 gap-8">
				{examples.map((example) => (
					<div key={example.id} className="bg-white p-4 rounded-lg shadow-md">
						<h3 className="text-lg font-semibold text-center mb-4">
							{example.description}
						</h3>
						<div className="grid grid-cols-2 gap-4 mb-2">
							<div>
								<p className="text-center text-sm font-medium text-gray-500 mb-1">
									Before
								</p>
								{/* <Image src={example.before} alt={`Before - ${example.description}`} width={300} height={200} className="w-full h-auto rounded" /> */}
								<img
									src={example.before}
									alt={`Before - ${example.description}`}
									className="w-full h-auto rounded border"
								/>
							</div>
							<div>
								<p className="text-center text-sm font-medium text-primary mb-1">
									After
								</p>
								{/* <Image src={example.after} alt={`After - ${example.description}`} width={300} height={200} className="w-full h-auto rounded" /> */}
								<img
									src={example.after}
									alt={`After - ${example.description}`}
									className="w-full h-auto rounded border border-primary"
								/>
							</div>
						</div>
					</div>
				))}
			</div>
			{/* TODO: より多くの事例や詳細ページへのリンクを追加 */}
		</section>
	);
};

export default BeforeAfterExamples;
