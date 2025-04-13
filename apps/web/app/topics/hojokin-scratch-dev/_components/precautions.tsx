import type React from "react";

const PrecautionsSection: React.FC = () => {
	return (
		<section className="mb-12 bg-red-50 p-8 rounded-lg border border-red-200">
			<h2 className="text-2xl font-bold text-center mb-6 text-red-800">
				補助金申請を検討する上での注意点
			</h2>
			<ul className="list-disc list-inside space-y-2 text-red-700">
				<li>補助金の採択は保証されていません（事業計画の質が重要）。</li>
				<li>
					原則として経費は<strong className="font-bold">後払い</strong>
					です（立て替え資金が必要）。
				</li>
				<li>申請手続きには相応の時間と労力がかかります。</li>
				<li>対象となる経費や期間には制限があります。</li>
				<li>採択後も報告義務などが発生します。</li>
			</ul>
			<p className="mt-4 text-sm text-red-600">
				不明な点は、各補助金の公募要領を確認するか、専門家への相談もご検討ください。
			</p>
		</section>
	);
};

export default PrecautionsSection;
