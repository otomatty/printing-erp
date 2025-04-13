import React from "react";

const RetouchDetails = () => {
	return (
		<section className="bg-gray-100 py-16">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">主な加工内容</h2>
				{/* TODO: 対応可能な具体的な加工内容をリストやグリッドで表示 */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* 例: カード形式 */}
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h3 className="text-xl font-semibold text-primary mb-3">
							色調補正・明るさ調整
						</h3>
						<p className="text-gray-600">
							写真全体のカラーバランスや明るさを最適化し、より自然で鮮やかな印象に仕上げます。
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h3 className="text-xl font-semibold text-primary mb-3">
							人物レタッチ
						</h3>
						<p className="text-gray-600">
							肌のシミ・シワの軽減、ホクロ除去、髪の毛の調整など、人物をより美しく見せるための加工を行います。
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h3 className="text-xl font-semibold text-primary mb-3">
							切り抜き・背景合成
						</h3>
						<p className="text-gray-600">
							被写体を正確に切り抜き、背景を透明化したり、別の背景と自然に合成したりします。
						</p>
					</div>
					{/* 他の加工内容カードを追加 */}
					{/* 例: 不要物除去、写真修復、商品写真向け加工など */}
				</div>
			</div>
		</section>
	);
};

export default RetouchDetails;
