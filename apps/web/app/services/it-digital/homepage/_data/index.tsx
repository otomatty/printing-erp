import { corporateSites } from "./corporateSites";
import { ecommerceSites } from "./ecommerceSites";
import { landingSites } from "./landingSites";
import { portfolioSites } from "./portfolioSites";
import { otherSites } from "./otherSites";
import type { ReactNode } from "react";

// サイトアイテムの型定義
export interface SiteItem {
	title: string;
	category: string;
	icon: ReactNode;
}

export const allSites = {
	corporate: corporateSites,
	ecommerce: ecommerceSites,
	landing: landingSites,
	portfolio: portfolioSites,
	other: otherSites,
};

// カテゴリの設定
export const categories = [
	{ id: "corporate", name: "企業サイト" },
	{ id: "ecommerce", name: "ECサイト" },
	{ id: "landing", name: "ランディングページ" },
	{ id: "portfolio", name: "ポートフォリオ" },
	{ id: "other", name: "その他" },
];

// 全てのサイトタイプを含む配列
export const allSitesArray = [
	...corporateSites,
	...ecommerceSites,
	...landingSites,
	...portfolioSites,
	...otherSites,
];
