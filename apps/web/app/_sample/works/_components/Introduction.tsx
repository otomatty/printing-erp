"use client";

import { motion } from "framer-motion";

export default function Introduction() {
	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<motion.div
					className="max-w-3xl mx-auto text-center mb-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<motion.h2
						className="text-3xl font-bold mb-6 text-gray-800"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.1 }}
					>
						お客様の想いを形にした実績
					</motion.h2>
					<motion.p
						className="text-lg text-gray-600"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						ニイヌマ企画印刷では、これまで多くのお客様の課題を解決するデザインや印刷物を制作してきました。
						業種や用途を問わず、お客様の目的に合わせた最適なソリューションを提供しています。
						当社の技術力とデザイン力が活かされた制作事例の一部をご紹介します。
					</motion.p>
				</motion.div>
			</div>
		</section>
	);
}
