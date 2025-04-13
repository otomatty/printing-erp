"use client";

import OptionButton from "../OptionButton";
import OptionSection from "./OptionSection";
import { QUANTITY_OPTIONS } from "../types";
import { Copy, CopyPlus, Files, Layers } from "lucide-react";

type QuantitySectionProps = {
	selectedQuantity: string;
	onChange: (quantity: string) => void;
	visible: boolean;
};

// 印刷部数ごとにアイコンを対応させる
const getIconForQuantity = (quantityId: string) => {
	switch (quantityId) {
		case "100":
			return <Copy className="h-6 w-6" />;
		case "300":
			return <CopyPlus className="h-6 w-6" />;
		case "500":
			return <Files className="h-6 w-6" />;
		case "1000":
		case "2000":
			return <Layers className="h-6 w-6" />;
		default:
			return <Copy className="h-6 w-6" />;
	}
};

export default function QuantitySection({
	selectedQuantity,
	onChange,
	visible,
}: QuantitySectionProps) {
	return (
		<OptionSection title="印刷部数" visible={visible}>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
				{QUANTITY_OPTIONS.map((option) => (
					<OptionButton
						key={option.id}
						option={option}
						selected={selectedQuantity === option.id}
						onClick={() => onChange(option.id)}
						icon={getIconForQuantity(option.id)}
						className="h-20"
					/>
				))}
			</div>
		</OptionSection>
	);
}
