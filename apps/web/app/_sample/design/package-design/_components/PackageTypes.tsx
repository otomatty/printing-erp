import React from "react";

const PackageTypes = () => {
	return (
		<section className="bg-gray-100 py-16">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					対応可能なパッケージの種類
				</h2>
				{/* TODO: 対応可能なパッケージの種類（箱、袋、ラベル等）や素材、加工例を具体的に示す */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* 例: カード形式 */}
					<div className="bg-white p-6 rounded-lg shadow-md text-center">
						{/* TODO: アイコンや画像を入れる */}
						<h3 className="text-xl font-semibold text-primary mb-3">
							化粧箱・個装箱
						</h3>
						<p className="text-gray-600 text-sm">
							商品の保護と高級感を演出。様々な形状、印刷、表面加工に対応。
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md text-center">
						{/* TODO: アイコンや画像を入れる */}
						<h3 className="text-xl font-semibold text-primary mb-3">
							ラベル・シール
						</h3>
						<p className="text-gray-600 text-sm">
							瓶や袋に貼る商品ラベル。素材や耐水性なども考慮してご提案。
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md text-center">
						{/* TODO: アイコンや画像を入れる */}
						<h3 className="text-xl font-semibold text-primary mb-3">
							袋・軟包装
						</h3>
						<p className="text-gray-600 text-sm">
							食品や雑貨に適した袋状のパッケージ。チャック付きやスタンドタイプも。
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md text-center">
						{/* TODO: アイコンや画像を入れる */}
						<h3 className="text-xl font-semibold text-primary mb-3">
							包装紙・その他
						</h3>
						<p className="text-gray-600 text-sm">
							ギフト用の包装紙や、台紙、ヘッダー、タグなどのデザインも承ります。
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PackageTypes;
