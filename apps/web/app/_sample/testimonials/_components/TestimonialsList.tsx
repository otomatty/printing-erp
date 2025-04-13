"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

// アニメーション設定
const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// お客様の声データ
const testimonials = [
	{
		id: "testimonial-1",
		name: "山田 健太郎",
		position: "飲食店オーナー",
		company: "レストランMORIMOTO",
		content:
			"メニューのデザインを依頼しましたが、こちらの要望を丁寧にヒアリングしていただき、イメージ通りのものができました。お陰様で来店されるお客様からも高評価をいただいています。次回もぜひお願いしたいと思います。",
		image: "/placeholders/testimonial-1.jpg",
		rating: 5,
	},
	{
		id: "testimonial-2",
		name: "佐藤 真理",
		position: "マーケティング担当",
		company: "山田建設株式会社",
		content:
			"会社案内のパンフレットを作成していただきました。写真の撮影からデザイン、印刷まで一貫して対応いただけたのが非常に助かりました。完成したパンフレットは社内外で好評で、会社のイメージアップにつながっています。",
		image: "/placeholders/testimonial-2.jpg",
		rating: 5,
	},
	{
		id: "testimonial-3",
		name: "鈴木 健一",
		position: "代表",
		company: "鈴木写真事務所",
		content:
			"写真家として名刺は特に大切なので、高品質なものを求めていました。提案していただいた特殊紙と印刷方法は期待以上の仕上がりで、お客様との商談でも良い印象を与えることができています。細部までこだわっていただき感謝しています。",
		image: "/placeholders/testimonial-3.jpg",
		rating: 5,
	},
	{
		id: "testimonial-4",
		name: "田中 美咲",
		position: "オーナー",
		company: "パティスリーYUKI",
		content:
			"季節限定商品のパッケージデザインをお願いしました。短い納期にも関わらず、素晴らしいデザインを提案していただき、売上アップに大きく貢献しました。デザインセンスの高さと迅速な対応に感謝しています。",
		image: "/placeholders/testimonial-4.jpg",
		rating: 4,
	},
	{
		id: "testimonial-5",
		name: "伊藤 隆",
		position: "広報部長",
		company: "テックソリューション株式会社",
		content:
			"リーフレットのデザインから印刷まで対応いただきました。当社のブランドイメージを理解し、モダンで洗練されたデザインに仕上げていただいたことに大変満足しています。今後も継続してお願いしたいと考えています。",
		image: "/placeholders/testimonial-5.jpg",
		rating: 5,
	},
	{
		id: "testimonial-6",
		name: "中村 良子",
		position: "実行委員長",
		company: "市民文化祭実行委員会",
		content:
			"文化祭のポスターデザインを依頼しました。地域のイベントに相応しい、温かみのあるデザインで多くの方に好評でした。印刷の品質も素晴らしく、鮮やかな色合いがしっかりと出ていました。また機会があればお願いしたいです。",
		image: "/placeholders/testimonial-6.jpg",
		rating: 5,
	},
];

export default function TestimonialsList() {
	return (
		<section className="py-12">
			<div className="container mx-auto px-4">
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 gap-8"
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.1 }}
				>
					{testimonials.map((testimonial) => (
						<motion.div
							key={testimonial.id}
							className="bg-white rounded-lg shadow-md p-6 border border-gray-100 relative"
							variants={item}
							whileHover={{
								y: -5,
								boxShadow:
									"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
							}}
						>
							<div className="absolute top-6 right-6 text-primary/10">
								<Quote size={48} />
							</div>
							<div className="flex items-start mb-4">
								<div className="mr-4 relative w-16 h-16 overflow-hidden rounded-full">
									<Image
										src={testimonial.image}
										alt={testimonial.name}
										fill
										style={{ objectFit: "cover" }}
									/>
								</div>
								<div>
									<h3 className="font-bold text-lg text-gray-800">
										{testimonial.name}
									</h3>
									<p className="text-gray-600 text-sm">
										{testimonial.position} / {testimonial.company}
									</p>
									<div className="flex mt-1">
										{Array.from({ length: 5 }).map((_, index) => (
											<span
												key={`${testimonial.id}-star-${index}`}
												className={`text-${index < testimonial.rating ? "primary" : "gray-300"}`}
											>
												★
											</span>
										))}
									</div>
								</div>
							</div>
							<p className="text-gray-600 relative z-10">
								{testimonial.content}
							</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
