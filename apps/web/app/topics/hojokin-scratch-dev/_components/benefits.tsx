import type React from "react";
import { Workflow, Scaling, Target } from "lucide-react";

const BenefitsSection: React.FC = () => {
	return (
		<section className="mb-12 bg-gray-50 p-8 rounded-lg">
			<h2 className="text-3xl font-bold text-center mb-10">
				スクラッチ開発 ３つのメリット
			</h2>
			<div className="grid md:grid-cols-3 gap-8 text-center">
				<div>
					<Workflow
						size={48}
						className="mx-auto mb-4 text-blue-600"
						strokeWidth={1.5}
					/>
					<h3 className="text-xl font-semibold mb-2 text-gray-800">
						1. 業務への完全適合
					</h3>
					<p className="text-gray-600">
						貴社の業務フローに合わせてシステムを構築。無駄をなくし、生産性を最大化します。
					</p>
				</div>
				<div>
					<Scaling
						size={48}
						className="mx-auto mb-4 text-blue-600"
						strokeWidth={1.5}
					/>
					<h3 className="text-xl font-semibold mb-2 text-gray-800">
						2. 自由な機能拡張
					</h3>
					<p className="text-gray-600">
						事業の変化や成長に合わせ、必要な機能を柔軟に追加・変更。長く使えるシステムを実現します。
					</p>
				</div>
				<div>
					<Target
						size={48}
						className="mx-auto mb-4 text-blue-600"
						strokeWidth={1.5}
					/>
					<h3 className="text-xl font-semibold mb-2 text-gray-800">
						3. 競争優位性の確立
					</h3>
					<p className="text-gray-600">
						独自の強みやサービスをシステムに反映。他社との差別化を図り、ビジネスを加速させます。
					</p>
				</div>
			</div>
		</section>
	);
};

export default BenefitsSection;
