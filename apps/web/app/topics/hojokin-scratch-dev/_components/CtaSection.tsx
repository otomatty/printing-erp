import type React from "react";
import Link from "next/link";

const CtaSection: React.FC = () => {
	return (
		<section className="text-center py-12">
			<h2 className="text-3xl font-bold mb-4">
				さあ、貴社だけのDXを始めませんか？
			</h2>
			<p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
				ニイヌマ企画印刷の低コスト・オーダーメイド開発と補助金活用で、
				他社には真似できない競争力を手に入れましょう。
				企画から開発、（可能であれば補助金申請のご相談まで）トータルでサポートします。
			</p>
			<div className="space-x-4">
				<Link
					href="/contact"
					className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded hover:bg-blue-700 transition duration-200"
				>
					まずは無料相談する
				</Link>
				<Link
					href="/estimate"
					className="inline-block bg-gray-700 text-white font-bold py-3 px-8 rounded hover:bg-gray-800 transition duration-200"
				>
					概算見積もりを依頼する
				</Link>
			</div>
			<div className="mt-8 text-gray-600">
				<p>
					お電話でのお問い合わせ:
					<a
						href="tel:0192262160"
						className="hover:text-gray-800 transition-colors"
					>
						0192-26-2160
					</a>
				</p>
				<p>
					メールでのお問い合わせ:
					<a
						href="mailto:nkikaku@crocus.ocn.ne.jp"
						className="hover:text-gray-800 transition-colors"
					>
						nkikaku@crocus.ocn.ne.jp
					</a>
				</p>
			</div>
		</section>
	);
};

export default CtaSection;
