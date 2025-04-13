import React from "react";

const ServiceIntroduction = () => {
	return (
		<section className="container mx-auto px-4 py-16">
			<h2 className="text-3xl font-bold text-center mb-12">サービス紹介</h2>
			{/* TODO: 写真レタッチサービスの概要、特徴、利点などを記述 */}
			<div className="max-w-3xl mx-auto text-center text-lg text-gray-700">
				<p className="mb-4">
					ここに写真レタッチサービスの魅力的な紹介文が入ります。
					お客様の大切な写真を、プロの技術でより美しく、目的に合った形に仕上げます。
				</p>
				<p>
					例えば、記念写真の色褪せ補正、証明写真の背景変更、商品写真のクオリティアップなど、様々なご要望にお応えします。
				</p>
			</div>
		</section>
	);
};

export default ServiceIntroduction;
