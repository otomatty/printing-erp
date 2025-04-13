import {
	type PricingFormData,
	SIZE_OPTIONS,
	PAPER_OPTIONS,
	COLOR_OPTIONS,
	QUANTITY_OPTIONS,
} from "../types";

export function calculatePrice(formData: PricingFormData): number {
	const { productType, size, paper, color, quantity } = formData;

	if (!productType || !size || !paper || !color || !quantity) {
		return 0;
	}

	const sizeOptions = productType
		? SIZE_OPTIONS[productType as keyof typeof SIZE_OPTIONS]
		: [];
	const selectedSizeOption = sizeOptions.find((opt) => opt.id === size);
	const selectedPaperOption = PAPER_OPTIONS.find((opt) => opt.id === paper);
	const selectedColorOption = COLOR_OPTIONS.find((opt) => opt.id === color);
	const selectedQuantityOption = QUANTITY_OPTIONS.find(
		(opt) => opt.id === quantity,
	);

	if (
		!selectedSizeOption ||
		!selectedPaperOption ||
		!selectedColorOption ||
		!selectedQuantityOption
	) {
		return 0;
	}

	// 基本料金 × サイズ倍率 × 用紙倍率 × カラー倍率
	const price =
		selectedQuantityOption.basePrice *
		selectedSizeOption.multiplier *
		selectedPaperOption.multiplier *
		selectedColorOption.multiplier;

	return price;
}
