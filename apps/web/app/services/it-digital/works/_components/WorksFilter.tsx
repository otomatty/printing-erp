"use client";

import type React from "react";

// カテゴリー定義
export const categories = [
	{ id: "all", name: "すべて" },
	{ id: "homepage", name: "ホームページ制作" },
	{ id: "system", name: "業務システム開発" },
	{ id: "consulting", name: "ITコンサルティング" },
];

// 業種定義
export const industries = [
	{ id: "all", name: "すべての業種" },
	{ id: "manufacturing", name: "製造業" },
	{ id: "retail", name: "小売業" },
	{ id: "service", name: "サービス業" },
	{ id: "healthcare", name: "医療・福祉" },
	{ id: "construction", name: "建設業" },
	{ id: "realestate", name: "不動産業" },
	{ id: "finance", name: "金融業" },
	{ id: "education", name: "教育機関" },
	{ id: "government", name: "官公庁・自治体" },
	{ id: "restaurant", name: "飲食業" },
];

interface WorksFilterProps {
	selectedCategory: string;
	selectedIndustry: string;
	setSelectedCategory: (category: string) => void;
	setSelectedIndustry: (industry: string) => void;
}

const WorksFilter: React.FC<WorksFilterProps> = ({
	selectedCategory,
	selectedIndustry,
	setSelectedCategory,
	setSelectedIndustry,
}) => {
	return (
		<div className="bg-gray-50 p-6 rounded-lg mb-8">
			<div className="mb-4">
				<p className="font-medium text-gray-700 mb-2">カテゴリで絞り込む</p>
				<div className="flex flex-wrap gap-2">
					{categories.map((category) => (
						<button
							key={category.id}
							type="button"
							onClick={() => setSelectedCategory(category.id)}
							className={`px-4 py-2 rounded-full text-sm transition-colors ${
								selectedCategory === category.id
									? "bg-blue-600 text-white"
									: "bg-white text-gray-700 border hover:bg-gray-100"
							}`}
						>
							{category.name}
						</button>
					))}
				</div>
			</div>
			<div>
				<p className="font-medium text-gray-700 mb-2">業種で絞り込む</p>
				<div className="flex flex-wrap gap-2">
					{industries.map((industry) => (
						<button
							key={industry.id}
							type="button"
							onClick={() => setSelectedIndustry(industry.id)}
							className={`px-4 py-2 rounded-full text-sm transition-colors ${
								selectedIndustry === industry.id
									? "bg-blue-600 text-white"
									: "bg-white text-gray-700 border hover:bg-gray-100"
							}`}
						>
							{industry.name}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default WorksFilter;
