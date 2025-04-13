"use client";

import OptionButton from "../OptionButton";
import OptionSection from "./OptionSection";
import { PRODUCT_TYPES } from "../types";
import type { OptionItem } from "../types";
import { FileText, FileImage, BookOpen, CreditCard, Mail } from "lucide-react";

type ProductTypeSectionProps = {
	selectedType: string;
	onChange: (productType: string) => void;
};

// 印刷物の種類ごとにアイコンを対応させる
const getIconForProductType = (productType: string) => {
	switch (productType) {
		case "flyer":
			return <FileText className="h-6 w-6" />;
		case "poster":
			return <FileImage className="h-6 w-6" />;
		case "pamphlet":
			return <BookOpen className="h-6 w-6" />;
		case "businessCard":
			return <CreditCard className="h-6 w-6" />;
		case "envelope":
			return <Mail className="h-6 w-6" />;
		default:
			return <FileText className="h-6 w-6" />;
	}
};

export default function ProductTypeSection({
	selectedType,
	onChange,
}: ProductTypeSectionProps) {
	return (
		<OptionSection title="印刷物の種類">
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
				{PRODUCT_TYPES.map((type) => (
					<OptionButton
						key={type.id}
						option={type as OptionItem}
						selected={selectedType === type.id}
						onClick={() => onChange(type.id)}
						icon={getIconForProductType(type.id)}
						className="h-20"
					/>
				))}
			</div>
		</OptionSection>
	);
}
