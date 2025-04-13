// オプション
export type OptionItem = {
	id: string;
	name: string;
	multiplier: number;
	basePrice?: number;
};

// 印刷物の種類
export const PRODUCT_TYPES: OptionItem[] = [
	{ id: "flyer", name: "チラシ・フライヤー", multiplier: 1 },
	{ id: "poster", name: "ポスター", multiplier: 1 },
	{ id: "pamphlet", name: "パンフレット", multiplier: 1 },
	{ id: "businessCard", name: "名刺", multiplier: 1 },
	{ id: "envelope", name: "封筒", multiplier: 1 },
];

// サイズ選択肢（商品タイプによって変わる）
export const SIZE_OPTIONS = {
	flyer: [
		{ id: "a4", name: "A4サイズ", multiplier: 1 },
		{ id: "a5", name: "A5サイズ", multiplier: 0.6 },
		{ id: "b5", name: "B5サイズ", multiplier: 0.8 },
	],
	poster: [
		{ id: "a2", name: "A2サイズ", multiplier: 2.5 },
		{ id: "a1", name: "A1サイズ", multiplier: 4 },
		{ id: "b2", name: "B2サイズ", multiplier: 3.2 },
	],
	pamphlet: [
		{ id: "a4", name: "A4サイズ (8ページ)", multiplier: 3 },
		{ id: "a4_12p", name: "A4サイズ (12ページ)", multiplier: 4.5 },
		{ id: "a5", name: "A5サイズ (8ページ)", multiplier: 2 },
	],
	businessCard: [{ id: "standard", name: "標準サイズ", multiplier: 0.2 }],
	envelope: [
		{ id: "long3", name: "長形3号", multiplier: 0.5 },
		{ id: "kakugata2", name: "角形2号", multiplier: 0.8 },
	],
};

// 用紙の種類
export const PAPER_OPTIONS = [
	{ id: "normal", name: "普通紙", multiplier: 1 },
	{ id: "highQuality", name: "上質紙", multiplier: 1.2 },
	{ id: "coated", name: "コート紙", multiplier: 1.3 },
	{ id: "mat", name: "マット紙", multiplier: 1.4 },
];

// カラー選択肢
export const COLOR_OPTIONS = [
	{ id: "fullColor", name: "フルカラー", multiplier: 1 },
	{ id: "monoColor", name: "単色", multiplier: 0.6 },
	{ id: "twoColor", name: "2色", multiplier: 0.8 },
];

// 印刷部数
export const QUANTITY_OPTIONS = [
	{ id: "100", name: "100部", multiplier: 1, basePrice: 5000 },
	{ id: "300", name: "300部", multiplier: 2, basePrice: 8000 },
	{ id: "500", name: "500部", multiplier: 3, basePrice: 10000 },
	{ id: "1000", name: "1000部", multiplier: 5, basePrice: 15000 },
	{ id: "2000", name: "2000部", multiplier: 9, basePrice: 25000 },
];

// 料金計算用フォームデータの型
export type PricingFormData = {
	productType: string;
	size: string;
	paper: string;
	color: string;
	quantity: string;
};
