"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

type PriceDisplayProps = {
	price: number;
	visible: boolean;
};

export default function PriceDisplay({ price, visible }: PriceDisplayProps) {
	if (!visible) return null;

	const formatPrice = (price: number) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	return (
		<div className="mt-8 border-t pt-6">
			<div className="text-center">
				<p className="text-gray-700 mb-2">概算お見積り</p>
				<p className="text-3xl font-bold text-primary">
					{price ? `¥${formatPrice(price)}` : "ー"}
					<span className="text-sm font-normal text-gray-500 ml-1">(税抜)</span>
				</p>
			</div>
			<div className="mt-6 text-center">
				<p className="text-sm text-gray-600 mb-4">
					正確なお見積りや詳細なご相談は、お問い合わせフォームからお気軽にどうぞ
				</p>
				<Link
					href="/contact"
					className="inline-flex items-center bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-md transition-colors"
				>
					お問い合わせする <ArrowRight size={16} className="ml-2" />
				</Link>
			</div>
		</div>
	);
}
