import React from "react";

const LogoConcepts = () => {
	return (
		<section className="bg-gray-100 py-16">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					ロゴデザインの考え方
				</h2>
				{/* TODO: ロゴの種類（シンボル、ロゴタイプ等）、コンセプトメイキングのプロセス、デザインで重視する点などを説明 */}
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div>
						<h3 className="text-2xl font-semibold text-primary mb-4">
							コンセプトの重要性
						</h3>
						<p className="text-gray-700 mb-4">
							見た目の美しさだけでなく、企業の理念やストーリー、ターゲットへのメッセージが込められたロゴこそが、真の価値を持ちます。
						</p>
						<p className="text-gray-700">
							私たちは、ヒアリングに基づきコンセプトを明確にし、それをデザインに落とし込むプロセスを大切にしています。
						</p>
					</div>
					<div>
						<h3 className="text-2xl font-semibold text-primary mb-4">
							ロゴのタイプ
						</h3>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>
								<span className="font-medium">シンボルマーク:</span>{" "}
								企業やブランドを象徴する図形やマーク。
							</li>
							<li>
								<span className="font-medium">ロゴタイプ:</span>{" "}
								企業名やブランド名をデザインした文字。
							</li>
							<li>
								<span className="font-medium">複合ロゴ:</span>{" "}
								シンボルとロゴタイプを組み合わせたもの。
							</li>
							<li>
								<span className="font-medium">その他:</span>{" "}
								エンブレム、キャラクターロゴなど、目的に応じて最適な形式をご提案します。
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LogoConcepts;
