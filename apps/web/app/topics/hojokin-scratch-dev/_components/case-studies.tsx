import type React from "react";

const CaseStudiesSection: React.FC = () => {
	return (
		<section className="mb-12">
			<h2 className="text-3xl font-bold text-center mb-8">
				【事例】補助金活用によるDX成功例
			</h2>
			<div className="grid md:grid-cols-2 gap-8">
				{/* Case Study 1: Manufacturer A */}
				<div className="border p-6 rounded-lg shadow-md bg-white">
					<h3 className="text-xl font-semibold mb-4 text-gray-800">
						事例1： 製造業A社 - 受発注・在庫管理システム
					</h3>
					<div className="space-y-3">
						<p className="text-gray-600">
							<strong className="text-gray-700">課題:</strong>{" "}
							電話やFAXでの注文が多く、担当者による手入力での転記ミスや二重入力が発生。リアルタイムでの在庫把握ができず、欠品による機会損失や過剰在庫も課題でした。
						</p>
						<p className="text-gray-600">
							<strong className="text-gray-700">解決策:</strong>{" "}
							「ものづくり補助金」を活用し、Webからの直接受注機能と、既存の基幹システムと連携する在庫管理機能を備えた
							<strong className="text-gray-800">
								オーダーメイドの受発注システム
							</strong>
							をスクラッチ開発。顧客ごとの単価設定や納品状況の確認も可能に。
						</p>
						<p className="text-gray-600">
							<strong className="text-green-600 font-semibold">成果:</strong>{" "}
							受注処理時間が
							<strong className="text-green-700">60%削減</strong>
							され、入力ミスもほぼゼロに。リアルタイム在庫管理により
							<strong className="text-green-700">欠品率が大幅に低下</strong>
							し、顧客満足度も向上しました。
						</p>
					</div>
				</div>
				{/* Case Study 2: Restaurant B */}
				<div className="border p-6 rounded-lg shadow-md bg-white">
					<h3 className="text-xl font-semibold mb-4 text-gray-800">
						事例2： 飲食店B社 - 多言語予約・テイクアウトサイト
					</h3>
					<div className="space-y-3">
						<p className="text-gray-600">
							<strong className="text-gray-700">課題:</strong>{" "}
							近隣にホテルが増えインバウンド客を取り込みたいが、既存の日本語サイトでは対応できず、電話予約も言語の壁が。グルメサイト経由の予約手数料も経営を圧迫していました。
						</p>
						<p className="text-gray-600">
							<strong className="text-gray-700">解決策:</strong>{" "}
							「小規模事業者持続化補助金」を活用し、英語・中国語に対応した
							<strong className="text-gray-800">
								自社独自の予約・テイクアウト受付サイト
							</strong>
							をスクラッチ開発。メニュー写真やアレルギー情報も多言語で掲載し、オンライン決済も導入。
						</p>
						<p className="text-gray-600">
							<strong className="text-green-600 font-semibold">成果:</strong>{" "}
							海外からの
							<strong className="text-green-700">Web予約が導入前の3倍</strong>
							に増加。テイクアウト売上も安定し、
							<strong className="text-green-700">
								グルメサイトへの手数料支払いを大幅に削減
							</strong>
							できました。
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CaseStudiesSection;
