import { ArrowLeft, Building, Mail, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";

// 顧客詳細ページのモックデータ
const customerData = {
	id: "cus-001",
	name: "株式会社サンプル",
	contact: "山田太郎",
	email: "yamada@sample.co.jp",
	phone: "03-1234-5678",
	address: "東京都新宿区西新宿1-1-1",
	zipCode: "160-0023",
	lastOrder: "2023/05/15",
	totalOrders: 12,
	totalSpent: "¥1,250,000",
	notes: "年間契約あり。毎月のパンフレット印刷を依頼される。",
	category: "印刷会社",
	createdAt: "2021/10/15",
};

export default async function CustomerDetailPage({
	params,
}: { params: Promise<{ id: string }> }) {
	// 実際の実装では、paramsのIDを使用して顧客データを取得する
	const resolvedParams = await params;
	const customer = customerData;

	return (
		<div className="space-y-6">
			<div className="flex items-center">
				<Link
					href="/system/customers"
					className="text-gray-500 hover:text-gray-700 mr-4"
				>
					<ArrowLeft size={20} />
				</Link>
				<h1 className="text-2xl font-bold">{customer.name}</h1>
			</div>

			{/* 顧客基本情報 */}
			<div className="bg-white p-6 rounded-lg shadow">
				<h2 className="text-lg font-medium mb-4">基本情報</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<div className="flex items-start">
							<Building className="mt-1 mr-2 text-gray-400" size={18} />
							<div>
								<p className="text-sm text-gray-500">会社名</p>
								<p>{customer.name}</p>
							</div>
						</div>
						<div className="flex items-start">
							<User className="mt-1 mr-2 text-gray-400" size={18} />
							<div>
								<p className="text-sm text-gray-500">担当者名</p>
								<p>{customer.contact}</p>
							</div>
						</div>
						<div className="flex items-start">
							<Mail className="mt-1 mr-2 text-gray-400" size={18} />
							<div>
								<p className="text-sm text-gray-500">メールアドレス</p>
								<p>{customer.email}</p>
							</div>
						</div>
					</div>
					<div className="space-y-2">
						<div className="flex items-start">
							<Phone className="mt-1 mr-2 text-gray-400" size={18} />
							<div>
								<p className="text-sm text-gray-500">電話番号</p>
								<p>{customer.phone}</p>
							</div>
						</div>
						<div className="flex items-start">
							<MapPin className="mt-1 mr-2 text-gray-400" size={18} />
							<div>
								<p className="text-sm text-gray-500">住所</p>
								<p>〒{customer.zipCode}</p>
								<p>{customer.address}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* 取引情報サマリー */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="bg-white p-4 rounded-lg shadow">
					<p className="text-sm text-gray-500 mb-1">総注文数</p>
					<p className="text-2xl font-bold">{customer.totalOrders}</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<p className="text-sm text-gray-500 mb-1">総取引額</p>
					<p className="text-2xl font-bold">{customer.totalSpent}</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<p className="text-sm text-gray-500 mb-1">最終注文</p>
					<p className="text-2xl font-bold">{customer.lastOrder}</p>
				</div>
			</div>

			{/* タブは実際の実装では切り替え機能を実装 */}
			<div className="bg-white rounded-lg shadow">
				<div className="border-b">
					<div className="flex">
						<button
							type="button"
							className="px-4 py-2 border-b-2 border-primary text-primary font-medium"
						>
							取引履歴
						</button>
						<button
							type="button"
							className="px-4 py-2 text-gray-500 hover:text-gray-700"
						>
							対応記録
						</button>
						<button
							type="button"
							className="px-4 py-2 text-gray-500 hover:text-gray-700"
						>
							分析データ
						</button>
					</div>
				</div>
				<div className="p-4">
					<p className="text-center text-gray-500 py-8">
						取引履歴はこちらに表示されます。
						<br />
						（実装予定）
					</p>
				</div>
			</div>

			{/* メモ・備考 */}
			<div className="bg-white p-6 rounded-lg shadow">
				<h2 className="text-lg font-medium mb-2">メモ・備考</h2>
				<p className="whitespace-pre-line">{customer.notes}</p>
			</div>
		</div>
	);
}
