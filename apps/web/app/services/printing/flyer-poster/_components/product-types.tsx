import type React from "react";
import { Check } from "lucide-react";

interface ProductItem {
	name: string;
	description: string;
}

// TODO: 各製品タイプの詳細データを精査・追加
const productItems: ProductItem[] = [
	{
		name: "チラシ・フライヤー",
		description: "イベント告知、商品紹介、ポスティング等、幅広い用途に。",
	},
	{
		name: "ポスター (A版・B版 各サイズ)",
		description: "店舗やイベント会場での掲示に。大判サイズにも対応。",
	},
	{
		name: "リーフレット（二つ折り、三つ折り等）",
		description: "情報をコンパクトにまとめ、配布しやすい形状。",
	},
	{
		name: "パンフレット・会社案内",
		description: "複数ページで構成し、製品やサービス、企業情報を詳しく紹介。",
	},
	{
		name: "DM（ダイレクトメール）",
		description: "はがきタイプ、封書タイプなど。宛名印刷も可能。",
	},
	{
		name: "チケット・クーポン券",
		description: "ミシン目加工やナンバリングにも対応。",
	},
	// TODO: 他の制作物例を追加 (例: メニュー表、プログラムなど)
];

const ProductTypes: React.FC = () => {
	return (
		<section className="py-16 lg:py-32 bg-gray-50">
			{" "}
			{/* 背景色 */}
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
					様々な印刷物に対応
				</h2>
				<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
					{productItems.map((item) => (
						<div key={item.name} className="flex items-start space-x-3">
							<Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
							<div>
								<h4 className="font-semibold text-gray-700">{item.name}</h4>
								<p className="text-sm text-gray-600">{item.description}</p>
							</div>
						</div>
					))}
				</div>
				<p className="text-center text-sm text-gray-500 mt-8">
					上記以外にも、様々な種類の印刷物に対応可能です。お気軽にご相談ください。
				</p>
			</div>
		</section>
	);
};

export default ProductTypes;
