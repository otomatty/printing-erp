import React from "react";

const DesignItems = () => {
	return (
		<section className="bg-gray-100 py-16">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					主な制作アイテム
				</h2>
				{/* TODO: 制作可能なデザインアイテムをカテゴリ分けして表示 */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
					{/* 例: カード形式 */}
					<div className="bg-white p-6 rounded-lg shadow-md">
						{/* TODO: アイコンや画像を入れる */}
						<h3 className="text-xl font-semibold text-primary mb-3">
							販促ツール
						</h3>
						<ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
							<li>チラシ・フライヤー</li>
							<li>パンフレット</li>
							<li>ポスター</li>
							<li>DM・ポストカード</li>
							<li>POP</li>
						</ul>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						{/* TODO: アイコンや画像を入れる */}
						<h3 className="text-xl font-semibold text-primary mb-3">
							ビジネスツール
						</h3>
						<ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
							<li>名刺・ショップカード</li>
							<li>封筒</li>
							<li>会社案内・カタログ</li>
							<li>プレゼン資料</li>
						</ul>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						{/* TODO: アイコンや画像を入れる */}
						<h3 className="text-xl font-semibold text-primary mb-3">
							店舗・イベント
						</h3>
						<ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
							<li>メニュー</li>
							<li>看板・サイン</li>
							<li>のぼり・バナー</li>
							<li>イベント告知物</li>
						</ul>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						{/* TODO: アイコンや画像を入れる */}
						<h3 className="text-xl font-semibold text-primary mb-3">その他</h3>
						<ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
							<li>書籍・雑誌広告</li>
							<li>Webバナー</li>
							<li>資料・レポート</li>
							<li>他、ご相談ください</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DesignItems;
