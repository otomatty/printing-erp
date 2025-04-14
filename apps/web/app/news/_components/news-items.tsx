"use client";

import { useState } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { newsItems, getCategories } from "./newsData";

export default function NewsItems() {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const categories = getCategories();

	// カテゴリーでフィルタリングされたニュースアイテム
	const filteredNewsItems = selectedCategory
		? newsItems.filter((item) => item.category === selectedCategory)
		: newsItems;

	return (
		<section className="py-16 bg-gray-50">
			<div className="container mx-auto px-4">
				<div className="max-w-5xl mx-auto">
					{/* カテゴリーフィルター */}
					<div className="mb-8 flex flex-wrap gap-2">
						<button
							type="button"
							onClick={() => setSelectedCategory(null)}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
								selectedCategory === null
									? "bg-primary text-white"
									: "bg-white text-gray-700 hover:bg-gray-100"
							}`}
						>
							すべて
						</button>
						{categories.map((category) => (
							<button
								key={category}
								type="button"
								onClick={() => setSelectedCategory(category)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
									selectedCategory === category
										? "bg-primary text-white"
										: "bg-white text-gray-700 hover:bg-gray-100"
								}`}
							>
								{category}
							</button>
						))}
					</div>

					{/* ニュース一覧 */}
					<div className="space-y-8">
						{filteredNewsItems.map((newsItem) => (
							<Link
								href={`/news/${newsItem.id}`}
								key={newsItem.id}
								className="block bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
							>
								<div>
									<div className="flex items-center gap-3 mb-3">
										<span className="text-gray-500 text-sm">
											{format(parseISO(newsItem.date), "yyyy年MM月dd日", {
												locale: ja,
											})}
										</span>
										<span className="bg-gray-100 text-primary text-xs px-3 py-1 rounded-full">
											{newsItem.category}
										</span>
									</div>
									<h3 className="text-xl font-bold text-gray-800 mb-2">
										{newsItem.title}
									</h3>
									<p className="text-gray-600">{newsItem.excerpt}</p>
								</div>
							</Link>
						))}
					</div>

					{/* ニュースがない場合 */}
					{filteredNewsItems.length === 0 && (
						<div className="text-center py-12">
							<p className="text-gray-500">該当するお知らせはありません。</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
