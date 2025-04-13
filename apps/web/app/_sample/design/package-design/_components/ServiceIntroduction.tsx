import React from "react";

const ServiceIntroduction = () => {
	return (
		<section className="container mx-auto px-4 py-16">
			<h2 className="text-3xl font-bold text-center mb-12">サービス紹介</h2>
			{/* TODO: パッケージデザインサービスの概要、重要性、提供価値などを記述 */}
			<div className="max-w-3xl mx-auto text-center text-lg text-gray-700">
				<p className="mb-4">
					ここにパッケージデザインサービスの魅力的な紹介文が入ります。
					商品の「顔」となるパッケージは、ブランドイメージを伝え、購買意欲を刺激する重要な要素です。
				</p>
				<p>
					私たちは、商品の特性とターゲットを深く理解し、機能性とデザイン性を両立させた、記憶に残るパッケージを創造します。
				</p>
			</div>
		</section>
	);
};

export default ServiceIntroduction;
