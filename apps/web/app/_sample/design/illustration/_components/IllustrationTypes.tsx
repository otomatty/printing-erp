import React from "react";

const IllustrationTypes = () => {
	return (
		<section className="bg-gray-100 py-16">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					対応可能なイラストの種類
				</h2>
				{/* TODO: 制作可能なイラストのカテゴリやタッチの例を具体的に示す */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* 例: カード形式 */}
					<div className="bg-white p-6 rounded-lg shadow-md">
						{/* TODO: アイコン例など画像を入れる */}
						<h3 className="text-xl font-semibold text-primary mb-3">
							Web・広告用イラスト
						</h3>
						<p className="text-gray-600">
							Webサイトのメインビジュアル、バナー広告、記事の挿絵など、目を引く魅力的なイラストを制作します。
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						{/* TODO: アイコン例など画像を入れる */}
						<h3 className="text-xl font-semibold text-primary mb-3">
							キャラクターデザイン
						</h3>
						<p className="text-gray-600">
							企業やサービスのオリジナルキャラクターをデザイン。親しみやすさや個性を表現します。
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						{/* TODO: アイコン例など画像を入れる */}
						<h3 className="text-xl font-semibold text-primary mb-3">
							説明図・テクニカルイラスト
						</h3>
						<p className="text-gray-600">
							製品の使い方やサービスの仕組みを分かりやすく伝えるための、正確でシンプルなイラストを作成します。
						</p>
					</div>
					{/* 他のイラスト種類カードを追加 */}
					{/* 例: 似顔絵、アイコン、マップ、挿絵など */}
				</div>
			</div>
		</section>
	);
};

export default IllustrationTypes;
