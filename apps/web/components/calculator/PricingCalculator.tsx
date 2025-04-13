"use client";

import { useState, useEffect } from "react";
import { type PricingFormData, SIZE_OPTIONS } from "./types";
import ProductTypeSection from "./sections/ProductTypeSection";
import SizeSection from "./sections/SizeSection";
import PaperSection from "./sections/PaperSection";
import ColorSection from "./sections/ColorSection";
import QuantitySection from "./sections/QuantitySection";
import PriceDisplay from "./sections/PriceDisplay";

export default function PricingCalculator() {
	const [formData, setFormData] = useState<PricingFormData>({
		productType: "",
		size: "",
		paper: "normal",
		color: "fullColor",
		quantity: "100",
	});

	const [estimatedPrice, setEstimatedPrice] = useState(0);
	const [showOptions, setShowOptions] = useState(false);

	// 商品タイプが変更されたときにサイズを初期化
	useEffect(() => {
		if (
			formData.productType &&
			SIZE_OPTIONS[formData.productType as keyof typeof SIZE_OPTIONS]?.length >
				0
		) {
			setShowOptions(true);
			setFormData((prev) => ({
				...prev,
				size: SIZE_OPTIONS[formData.productType as keyof typeof SIZE_OPTIONS][0]
					.id,
			}));
		} else {
			setShowOptions(false);
			setFormData((prev) => ({
				...prev,
				size: "",
			}));
		}
	}, [formData.productType]);

	// 料金計算
	useEffect(() => {
		if (
			!formData.productType ||
			!formData.size ||
			!formData.paper ||
			!formData.color ||
			!formData.quantity
		) {
			setEstimatedPrice(0);
			return;
		}

		// 各コンポーネントからデータを取得して計算
		import("./utils/calculatePrice").then(({ calculatePrice }) => {
			const price = calculatePrice(formData);
			setEstimatedPrice(Math.round(price));
		});
	}, [formData]);

	// フォームデータの更新ハンドラー
	const handleChange = (field: keyof PricingFormData, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<div className="bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-100">
			<h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
				印刷料金シミュレーター
			</h2>
			<p className="text-gray-600 mb-8 text-center text-sm">
				印刷物の種類やサイズ、仕様などを選択すると、概算の料金が表示されます。
				<br />
				※あくまで目安の金額です。正確なお見積りはお問い合わせください。
			</p>

			<div className="space-y-8">
				{/* 印刷物の種類 */}
				<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
					<ProductTypeSection
						selectedType={formData.productType}
						onChange={(value) => handleChange("productType", value)}
					/>
				</div>

				{showOptions && (
					<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
						{/* サイズ */}
						<SizeSection
							productType={formData.productType}
							selectedSize={formData.size}
							onChange={(value) => handleChange("size", value)}
							visible={showOptions}
						/>

						{/* 用紙の種類 */}
						<div className="mt-6">
							<PaperSection
								selectedPaper={formData.paper}
								onChange={(value) => handleChange("paper", value)}
								visible={showOptions}
							/>
						</div>

						{/* カラー */}
						<div className="mt-6">
							<ColorSection
								selectedColor={formData.color}
								onChange={(value) => handleChange("color", value)}
								visible={showOptions}
							/>
						</div>

						{/* 印刷部数 */}
						<div className="mt-6">
							<QuantitySection
								selectedQuantity={formData.quantity}
								onChange={(value) => handleChange("quantity", value)}
								visible={showOptions}
							/>
						</div>
					</div>
				)}

				{/* 概算料金表示 */}
				{showOptions && (
					<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
						<PriceDisplay price={estimatedPrice} visible={true} />
					</div>
				)}

				{/* 商品が選択されていない場合 */}
				{!showOptions && (
					<div className="text-center py-10 border border-dashed border-gray-300 rounded-lg bg-gray-50">
						<p className="text-gray-500">印刷物の種類を選択してください</p>
					</div>
				)}
			</div>
		</div>
	);
}
