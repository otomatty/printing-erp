"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CtaSection() {
	return (
		<section className="py-20 bg-primary text-primary-foreground">
			<div className="container mx-auto px-4 text-center">
				<motion.div
					className="max-w-3xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.6 }}
				>
					<motion.h2
						className="text-3xl font-bold mb-6"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						お問い合わせ・お見積り
					</motion.h2>
					<motion.p
						className="mb-8 text-lg"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						印刷やデザインについてのご質問、お見積りのご依頼など、お気軽にお問い合わせください。
						校正のやり取りや納品時ご来店難しい場合はこちらから伺わせていただきます。
					</motion.p>
					<motion.div
						className="flex flex-col sm:flex-row gap-4 justify-center"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Link
								href="/contact"
								className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-md transition-colors font-medium text-lg inline-flex items-center justify-center"
							>
								お問い合わせフォーム <ChevronRight className="ml-2" size={20} />
							</Link>
						</motion.div>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<a
								href="tel:0192262160"
								className="border border-primary-foreground hover:bg-primary-foreground/10 px-6 py-3 rounded-md transition-colors font-medium text-lg inline-flex items-center justify-center"
							>
								電話でのお問い合わせ 0192-26-2160
							</a>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
