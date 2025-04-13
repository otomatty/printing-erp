"use client";

import OptionButton from "../OptionButton";
import OptionSection from "./OptionSection";
import { SIZE_OPTIONS } from "../types";
import { Square, SquareAsterisk, CreditCard } from "lucide-react";

type SizeSectionProps = {
	productType: string;
	selectedSize: string;
	onChange: (size: string) => void;
	visible: boolean;
};

// サイズごとにアイコンを対応させる
const getIconForSize = (sizeId: string) => {
	// A判サイズ
	if (sizeId.startsWith("a")) {
		return <Square className="h-6 w-6" />;
	}
	// B判サイズ
	if (sizeId.startsWith("b")) {
		return <SquareAsterisk className="h-6 w-6" />;
	}
	// 名刺・封筒など
	return <CreditCard className="h-6 w-6" />;
};

export default function SizeSection({
	productType,
	selectedSize,
	onChange,
	visible,
}: SizeSectionProps) {
	// 選択された商品タイプに対応するサイズオプションを取得
	const sizeOptions =
		SIZE_OPTIONS[productType as keyof typeof SIZE_OPTIONS] || [];

	return (
		<OptionSection title="サイズ" visible={visible}>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
				{sizeOptions.map((option) => (
					<OptionButton
						key={option.id}
						option={option}
						selected={selectedSize === option.id}
						onClick={() => onChange(option.id)}
						icon={getIconForSize(option.id)}
						className="h-20"
					/>
				))}
			</div>
		</OptionSection>
	);
}
