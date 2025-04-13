import { businessSystems } from "./businessSystems";
import { salesSystems } from "./salesSystems";
import { hrSystems } from "./hrSystems";
import { projectSystems } from "./projectSystems";
import { otherSystems } from "./otherSystems";

export const allSystems = {
	business: businessSystems,
	sales: salesSystems,
	hr: hrSystems,
	project: projectSystems,
	other: otherSystems,
};

// カテゴリの設定
export const categories = [
	{ id: "business", name: "業務管理" },
	{ id: "sales", name: "販売/顧客" },
	{ id: "hr", name: "人事/経営" },
	{ id: "project", name: "プロジェクト" },
	{ id: "other", name: "その他" },
];

// 全てのシステムを含む配列
export const allSystemsArray = [
	...businessSystems,
	...salesSystems,
	...hrSystems,
	...projectSystems,
	...otherSystems,
];
