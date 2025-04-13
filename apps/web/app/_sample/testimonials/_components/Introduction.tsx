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
						お客様とともに創る価値
					</motion.h2>
					<motion.p
						className="text-lg text-gray-600"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						ニイヌマ企画印刷では、お客様の目的に合わせた最適なソリューションを提供することを大切にしています。
						私たちのサービスをご利用いただいたお客様からいただいた声を参考に、
						さらなるサービス向上に努めています。多くのお客様からいただいた信頼の声をご紹介します。
					</motion.p>
				</motion.div>
			</div>
		</section>
	);
}
