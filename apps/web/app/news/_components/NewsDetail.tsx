import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import Markdown from "react-markdown";
import { type NewsItem, newsItems } from "./newsData";

type NewsDetailProps = {
	newsItem: NewsItem;
};

export default function NewsDetail({ newsItem }: NewsDetailProps) {
	// 最新のニュース3件を取得（現在の記事を除く）
	const recentNews = newsItems
		.filter((item) => item.id !== newsItem.id)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 3);

	return (
		<section className="py-16 bg-gray-50">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					{/* ニュース詳細 */}
					<div className="bg-white p-6 md:p-8 rounded-lg shadow-sm mb-10">
						<div className="flex items-center gap-3 mb-4">
							<span className="text-gray-500 text-sm">
								{format(parseISO(newsItem.date), "yyyy年MM月dd日", {
									locale: ja,
								})}
							</span>
							<span className="bg-gray-100 text-primary text-xs px-3 py-1 rounded-full">
								{newsItem.category}
							</span>
						</div>

						<h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
							{newsItem.title}
						</h1>

						<div className="prose max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-p:text-gray-600 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800">
							<Markdown>{newsItem.content}</Markdown>
						</div>
					</div>

					{/* ニュース一覧に戻るリンク */}
					<div className="flex justify-center mb-12">
						<Link
							href="/news"
							className="inline-flex items-center px-5 py-2 border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50 transition-colors"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5 mr-2"
								aria-hidden="true"
							>
								<title>戻る</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 19.5L8.25 12l7.5-7.5"
								/>
							</svg>
							ニュース一覧に戻る
						</Link>
					</div>

					{/* 関連ニュース */}
					{recentNews.length > 0 && (
						<div>
							<h2 className="text-xl font-bold text-gray-800 mb-6">
								最新のお知らせ
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{recentNews.map((item) => (
									<Link
										href={`/news/${item.id}`}
										key={item.id}
										className="block bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
									>
										<div className="flex items-center gap-2 mb-2">
											<span className="text-gray-500 text-xs">
												{format(parseISO(item.date), "yyyy年MM月dd日", {
													locale: ja,
												})}
											</span>
											<span className="bg-gray-100 text-primary text-xs px-2 py-0.5 rounded-full">
												{item.category}
											</span>
										</div>
										<h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
											{item.title}
										</h3>
										<p className="text-gray-600 text-sm line-clamp-2">
											{item.excerpt}
										</p>
									</Link>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
