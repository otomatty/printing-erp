import React from "react";

const ServiceIntroduction = () => {
	return (
		<section className="container mx-auto px-4 py-16">
			<h2 className="text-3xl font-bold text-center mb-12">サービス紹介</h2>
			{/* TODO: グラフィックデザインサービスの概要、目的、提供価値などを記述 */}
			<div className="max-w-3xl mx-auto text-center text-lg text-gray-700">
				<p className="mb-4">
					ここにグラフィックデザインサービスの魅力的な紹介文が入ります。
					チラシ、パンフレット、名刺からポスター、看板まで、あらゆる印刷媒体のデザインを承ります。
				</p>
				<p>
					情報を整理し、ターゲットに響くメッセージを効果的に伝えるデザインで、お客様のビジネスコミュニケーションをサポートします。
				</p>
			</div>
		</section>
	);
};

export default ServiceIntroduction;
