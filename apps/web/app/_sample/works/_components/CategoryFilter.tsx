"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const categories = [
	{ id: "all", name: "すべて" },
	{ id: "graphic", name: "グラフィックデザイン" },
	{ id: "package", name: "パッケージデザイン" },
	{ id: "poster", name: "ポスターデザイン" },
	{ id: "brochure", name: "パンフレット・冊子" },
	{ id: "card", name: "名刺・カード" },
	{ id: "other", name: "その他" },
];

interface CategoryFilterProps {
	onFilter: (category: string) => void;
}

export default function CategoryFilter({ onFilter }: CategoryFilterProps) {
	const [activeCategory, setActiveCategory] = useState("all");

	const handleCategoryChange = (categoryId: string) => {
		setActiveCategory(categoryId);
		onFilter(categoryId);
	};

	// アニメーション設定
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	};

	return (
		<section className="py-8">
			<div className="container mx-auto px-4">
				<motion.div
					className="flex flex-wrap justify-center gap-2 mb-4"
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.8 }}
				>
					{categories.map((category) => (
						<motion.div
							key={category.id}
							variants={item}
							whileHover={{ y: -2 }}
							whileTap={{ scale: 0.95 }}
						>
							<button
								type="button"
								onClick={() => handleCategoryChange(category.id)}
								className={`px-4 py-2 rounded-full text-sm transition-colors ${
									activeCategory === category.id
										? "bg-primary text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								{category.name}
							</button>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
