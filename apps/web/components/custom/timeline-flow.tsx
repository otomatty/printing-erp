"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import Container from "./container";

// 想定するステップデータの型定義
interface StepItem {
	id: string;
	step: string; // "01", "02" など
	title: string;
	description: string;
	duration?: string; // 期間情報（例：約2週間）
}

interface TimelineFlowProps {
	title: string; // セクションタイトル
	stepsData: StepItem[]; // 表示するステップデータ
	backgroundColor?: string; // 背景色 (オプション)
	cumulativeDuration?: boolean; // 累積期間を表示するかどうか
}

// アニメーション設定 (WorkflowSteps.tsxから流用)
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

const TimelineFlow: React.FC<TimelineFlowProps> = ({
	title,
	stepsData,
	backgroundColor = "bg-gray-50", // デフォルト背景色
	cumulativeDuration = true, // デフォルトで累積期間を表示
}) => {
	// 累積期間の計算(表示用テキストのリスト)
	const calculateCumulativeDurations = (): string[] => {
		const result: string[] = [];

		stepsData.forEach((step, index) => {
			if (index === 0) {
				result.push(step.duration || "");
			} else if (step.duration === "継続的") {
				result.push(`${result[index - 1]} + 継続的`);
			} else {
				result.push(`${result[index - 1]} + ${step.duration || ""}`);
			}
		});

		return result;
	};

	const cumulativeDurations: string[] = calculateCumulativeDurations();

	return (
		<section className={`py-16 lg:py-32 ${backgroundColor}`}>
			<Container>
				<div className="max-w-5xl mx-auto">
					<motion.h2
						className="text-3xl font-bold mb-12 text-center text-gray-800"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						{title}
					</motion.h2>

					{/* タイムライン */}
					<motion.div
						className="relative"
						variants={container}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.1 }}
					>
						{/* 中央線 */}
						<div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-1 bg-primary/20 md:transform md:-translate-x-1/2" />

						{/* ステップアイテム */}
						{stepsData.map((step, index) => (
							<motion.div
								key={step.id}
								className="relative flex items-start mb-12 last:mb-0"
								variants={item}
							>
								{/* ステップ番号 */}
								<div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 flex-shrink-0 w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold z-10">
									{step.step}
								</div>

								{/* デスクトップ: 左側 (偶数index) - カードスタイル */}
								<div className="hidden md:block md:w-1/2 md:pr-16">
									{index % 2 === 0 && (
										<div className="pt-2 bg-white border border-gray-100 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
											<div className="flex items-center gap-2 flex-wrap mb-2">
												<h3 className="text-xl font-bold text-gray-800">
													{step.title}
												</h3>
												{step.duration && (
													<div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm whitespace-nowrap">
														<Clock size={14} className="mr-1" />
														<span>
															{cumulativeDuration
																? cumulativeDurations[index]
																: step.duration}
														</span>
													</div>
												)}
											</div>
											<p className="text-gray-600">{step.description}</p>
										</div>
									)}
								</div>

								{/* モバイル: 右側 - カードスタイル */}
								<div className="ml-28 md:hidden bg-white border border-gray-100 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
									<div className="flex items-center gap-2 flex-wrap mb-2">
										<h3 className="text-xl font-bold text-gray-800">
											{step.title}
										</h3>
										{step.duration && (
											<div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm whitespace-nowrap">
												<Clock size={14} className="mr-1" />
												<span>
													{cumulativeDuration
														? cumulativeDurations[index]
														: step.duration}
												</span>
											</div>
										)}
									</div>
									<p className="text-gray-600">{step.description}</p>
								</div>

								{/* デスクトップ: 右側 (奇数index) - カードスタイル */}
								<div className="hidden md:block md:w-1/2 md:pl-16 md:ml-auto">
									{index % 2 === 1 && (
										<div className="pt-2 bg-white border border-gray-100 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
											<div className="flex items-center gap-2 flex-wrap mb-2">
												<h3 className="text-xl font-bold text-gray-800">
													{step.title}
												</h3>
												{step.duration && (
													<div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm whitespace-nowrap">
														<Clock size={14} className="mr-1" />
														<span>
															{cumulativeDuration
																? cumulativeDurations[index]
																: step.duration}
														</span>
													</div>
												)}
											</div>
											<p className="text-gray-600">{step.description}</p>
										</div>
									)}
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</Container>
		</section>
	);
};

export default TimelineFlow;
