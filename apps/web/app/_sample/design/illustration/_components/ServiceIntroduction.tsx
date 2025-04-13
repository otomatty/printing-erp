import React from "react";

const ServiceIntroduction = () => {
	return (
		<section className="container mx-auto px-4 py-16">
			<h2 className="text-3xl font-bold text-center mb-12">サービス紹介</h2>
			{/* TODO: イラスト制作サービスの概要、特徴、強みなどを記述 */}
			<div className="max-w-3xl mx-auto text-center text-lg text-gray-700">
				<p className="mb-4">
					ここにイラスト制作サービスの魅力的な紹介文が入ります。
					Webサイト、広告、資料、キャラクターなど、様々な媒体で活用できる高品質なオリジナルイラストを提供します。
				</p>
				<p>
					お客様のブランドイメージや伝えたいメッセージを丁寧にヒアリングし、最適なタッチと表現で形にします。
				</p>
			</div>
		</section>
	);
};

export default ServiceIntroduction;
