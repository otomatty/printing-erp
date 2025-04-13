"use client";

import { motion } from "framer-motion";

export default function IntroductionSection() {
	return (
		<section className="py-16 lg:py-32 bg-white">
			<div className="container mx-auto px-4 max-w-4xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
						想いをカタチに、ビジネスを未来へ
					</h2>
					<p className="text-lg text-gray-600 leading-relaxed mb-6 text-center">
						{/* TODO: 創業年数や実績に基づく信頼性をここに記述 */}
						私たち「ニイヌマ企画印刷」は、1985年の創業以来、岩手県大船渡市の地で、地域の皆様と共に歩んでまいりました。
						単に紙にインクをのせるだけでなく、お客様一人ひとりの大切な「想い」を最適なカタチで表現し、価値あるコミュニケーションを創造すること。
						それが私たちの使命です。
					</p>
					<p className="text-lg text-gray-600 leading-relaxed mb-6 text-center">
						{/* TODO: 得意な技術や設備、品質へのこだわりを具体的に記述 */}
						長年培ってきた「確かな技術」と経験を基盤に、高品質な印刷物を提供します。
						デザインから印刷、製本まで、細部にまでこだわる職人の目と柔軟な「対応力」で、お客様にご満足いただける品質をお約束します。
					</p>
					<p className="text-lg text-gray-600 leading-relaxed text-center">
						{/* TODO: 主要顧客層や提供価値、他社との差別化ポイントを記述 */}
						地域のお客様を中心に、様々なご要望にお応えしてきました。
						「誠実」な姿勢でお客様に向き合い、デザインのご相談から納品まで、お客様の目的達成を第一に考えサポートいたします。
						印刷を通じて地域社会の発展に貢献することも私たちの願いです。
						{/* TODO: お客様にどのように貢献したいか、具体的なメッセージを追加できます */}
					</p>
					{/* TODO: 必要であれば、実績ページや具体的なサービスへのリンクボタンを追加 */}
				</motion.div>
			</div>
		</section>
	);
}
