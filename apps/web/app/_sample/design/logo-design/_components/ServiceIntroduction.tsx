import React from "react";

const ServiceIntroduction = () => {
	return (
		<section className="container mx-auto px-4 py-16">
			<h2 className="text-3xl font-bold text-center mb-12">サービス紹介</h2>
			{/* TODO: ロゴデザインサービスの概要、ブランドにおけるロゴの重要性などを記述 */}
			<div className="max-w-3xl mx-auto text-center text-lg text-gray-700">
				<p className="mb-4">
					ここにロゴデザインサービスの魅力的な紹介文が入ります。
					ロゴは企業やブランドの「顔」であり、その理念や個性を凝縮したシンボルです。
				</p>
				<p>
					私たちは丁寧なヒアリングを通じてお客様の想いを深く理解し、記憶に残り、長く愛される唯一無二のロゴデザインを創造します。
				</p>
			</div>
		</section>
	);
};

export default ServiceIntroduction;
