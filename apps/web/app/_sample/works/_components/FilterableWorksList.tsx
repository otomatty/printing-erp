"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { works } from "../_data/works";
import { motion, AnimatePresence } from "framer-motion";

// カテゴリーデータ
const categories = [
	{ id: "all", name: "すべて" },
	{ id: "graphic", name: "グラフィックデザイン" },
	{ id: "package", name: "パッケージデザイン" },
	{ id: "poster", name: "ポスターデザイン" },
	{ id: "brochure", name: "パンフレット・冊子" },
	{ id: "card", name: "名刺・カード" },
	{ id: "other", name: "その他" },
];

export default function FilterableWorksList() {
	const [activeCategory, setActiveCategory] = useState("all");

	const handleCategoryChange = (categoryId: string) => {
		setActiveCategory(categoryId);
	};

	// カテゴリーでフィルタリングされた作品リスト
	const filteredWorks = works.filter(
		(work) => activeCategory === "all" || work.category === activeCategory,
	);

	// アニメーション設定
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	};

	const imageHover = {
		scale: 1.05,
		transition: { duration: 0.3 },
	};

	return (
		<>
			{/* カテゴリーフィルター */}
			<section className="py-8">
				<div className="container mx-auto px-4">
					<motion.div
						className="flex flex-wrap justify-center gap-2 mb-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						{categories.map((category) => (
							<motion.button
								key={category.id}
								type="button"
								onClick={() => handleCategoryChange(category.id)}
								className={`px-4 py-2 rounded-full text-sm transition-colors ${
									activeCategory === category.id
										? "bg-primary text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								{category.name}
							</motion.button>
						))}
					</motion.div>
				</div>
			</section>

			{/* 作品リスト */}
			<section className="py-12">
				<div className="container mx-auto px-4">
					<AnimatePresence mode="wait">
						<motion.div
							key={activeCategory}
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
							variants={container}
							initial="hidden"
							animate="show"
							exit={{ opacity: 0 }}
						>
							{filteredWorks.map((work) => (
								<Link
									href={`/works/${work.id}`}
									key={work.id}
									className="block"
								>
									<motion.div
										className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg h-full"
										variants={item}
										whileHover={{ y: -3, transition: { duration: 0.2 } }}
										layout
									>
										<div className="relative h-60 overflow-hidden">
											<motion.div
												className="h-full w-full"
												whileHover={imageHover}
											>
												<Image
													src={work.image}
													alt={work.title}
													fill
													style={{ objectFit: "cover" }}
												/>
											</motion.div>
										</div>
										<div className="p-6">
											<div className="mb-2">
												<motion.span
													className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded"
													whileHover={{ scale: 1.05 }}
												>
													{work.displayCategory}
												</motion.span>
											</div>
											<h3 className="text-xl font-bold mb-2 text-gray-800">
												{work.title}
											</h3>
											<p className="text-gray-600 mb-4 text-sm line-clamp-3">
												{work.description}
											</p>
											<div className="text-xs text-gray-500">
												クライアント: {work.client}
											</div>
										</div>
									</motion.div>
								</Link>
							))}
						</motion.div>
					</AnimatePresence>
				</div>
			</section>
		</>
	);
}
