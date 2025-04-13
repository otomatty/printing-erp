import {
	ArrowLeft,
	Calculator,
	ChevronDown,
	ChevronUp,
	Check,
	Clock,
	Eye,
	Plus,
	Save,
	Send,
	Trash,
	X,
} from "lucide-react";
import Link from "next/link";

export default function NewQuotePage() {
	return (
		<div className="space-y-6 p-6">
			{/* ヘッダー */}
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-4">
					<Link href="/system/quotes">
						<button
							type="button"
							className="p-2 rounded-md border hover:bg-gray-50"
						>
							<ArrowLeft className="h-4 w-4" />
						</button>
					</Link>
					<h1 className="text-xl font-bold">新規見積作成</h1>
				</div>
				<div className="flex gap-2">
					<button
						type="button"
						className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center"
					>
						<Save className="mr-2 h-4 w-4" />
						下書き保存
					</button>
					<button
						type="button"
						className="px-4 py-2 bg-primary text-white rounded-md flex items-center"
					>
						<Send className="mr-2 h-4 w-4" />
						送信
					</button>
				</div>
			</div>

			{/* メインコンテンツ：フォーム */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* 左側2/3 */}
				<div className="lg:col-span-2 space-y-6">
					{/* 基本情報 */}
					<div className="bg-white p-6 rounded-lg shadow">
						<h2 className="text-lg font-medium mb-4">基本情報</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="quote-number"
									className="block text-sm text-gray-700 mb-1"
								>
									見積番号
								</label>
								<input
									type="text"
									id="quote-number"
									className="w-full p-2 border rounded-md bg-gray-50"
									value="QT-2023-XXXX"
									readOnly
								/>
								<p className="text-xs text-gray-500 mt-1">自動採番されます</p>
							</div>
							<div>
								<label
									htmlFor="created-date"
									className="block text-sm text-gray-700 mb-1"
								>
									作成日
								</label>
								<div className="relative">
									<input
										type="date"
										id="created-date"
										className="w-full p-2 border rounded-md"
										defaultValue={new Date().toISOString().split("T")[0]}
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="valid-until"
									className="block text-sm text-gray-700 mb-1"
								>
									有効期限
								</label>
								<div className="relative">
									<input
										type="date"
										id="valid-until"
										className="w-full p-2 border rounded-md"
										defaultValue={
											new Date(new Date().setDate(new Date().getDate() + 30))
												.toISOString()
												.split("T")[0]
										}
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="quote-title"
									className="block text-sm text-gray-700 mb-1"
								>
									件名
								</label>
								<input
									type="text"
									id="quote-title"
									className="w-full p-2 border rounded-md"
									placeholder="例：A4チラシ 両面フルカラー 1,000部"
								/>
							</div>
						</div>
					</div>

					{/* 顧客情報 */}
					<div className="bg-white p-6 rounded-lg shadow">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-lg font-medium">顧客情報</h2>
							<button
								type="button"
								className="text-primary flex items-center text-sm"
							>
								<Plus className="h-4 w-4 mr-1" />
								新規顧客を登録
							</button>
						</div>

						<div className="space-y-4">
							<div>
								<label
									htmlFor="customer"
									className="block text-sm text-gray-700 mb-1"
								>
									顧客選択
								</label>
								<div className="relative">
									<select
										id="customer"
										className="w-full p-2 border rounded-md appearance-none"
									>
										<option value="">顧客を選択してください</option>
										<option value="cus-001">株式会社サンプル</option>
										<option value="cus-002">○○商事</option>
										<option value="cus-003">△△印刷</option>
									</select>
									<ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="contact-person"
										className="block text-sm text-gray-700 mb-1"
									>
										担当者
									</label>
									<input
										type="text"
										id="contact-person"
										className="w-full p-2 border rounded-md"
										placeholder="例：山田太郎"
									/>
								</div>
								<div>
									<label
										htmlFor="contact-email"
										className="block text-sm text-gray-700 mb-1"
									>
										メールアドレス
									</label>
									<input
										type="email"
										id="contact-email"
										className="w-full p-2 border rounded-md"
										placeholder="例：yamada@example.com"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* 見積明細 */}
					<div className="bg-white p-6 rounded-lg shadow">
						<h2 className="text-lg font-medium mb-4">見積明細</h2>

						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-gray-50 text-sm">
									<tr>
										<th className="px-4 py-2 text-left">商品/サービス</th>
										<th className="px-4 py-2 text-center w-24">数量</th>
										<th className="px-4 py-2 text-right w-28">単価</th>
										<th className="px-4 py-2 text-center w-20">税率</th>
										<th className="px-4 py-2 text-right w-28">金額</th>
										<th className="px-4 py-2 w-10" />
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="px-4 py-3">
											<input
												type="text"
												className="w-full p-2 border rounded-md"
												placeholder="商品/サービス名"
											/>
											<textarea
												className="w-full p-2 border rounded-md mt-1 text-sm"
												placeholder="説明（オプション）"
												rows={2}
											/>
										</td>
										<td className="px-4 py-3">
											<input
												type="number"
												className="w-full p-2 border rounded-md text-center"
												placeholder="数量"
												min="1"
												defaultValue="1"
											/>
										</td>
										<td className="px-4 py-3">
											<div className="relative">
												<span className="absolute left-3 top-2.5">¥</span>
												<input
													type="number"
													className="w-full p-2 pl-7 border rounded-md text-right"
													placeholder="0"
													min="0"
												/>
											</div>
										</td>
										<td className="px-4 py-3">
											<select className="w-full p-2 border rounded-md text-center">
												<option value="10">10%</option>
												<option value="8">8%</option>
												<option value="0">0%</option>
											</select>
										</td>
										<td className="px-4 py-3">
											<div className="relative">
												<span className="absolute left-3 top-2.5">¥</span>
												<input
													type="text"
													className="w-full p-2 pl-7 border rounded-md text-right bg-gray-50"
													placeholder="0"
													readOnly
												/>
											</div>
										</td>
										<td className="px-4 py-3">
											<button
												type="button"
												className="text-red-500 hover:text-red-700"
											>
												<Trash className="h-4 w-4" />
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="mt-4">
							<button
								type="button"
								className="text-primary flex items-center text-sm"
							>
								<Plus className="h-4 w-4 mr-1" />
								明細を追加
							</button>
						</div>

						<div className="mt-6 flex justify-end">
							<div className="w-64 space-y-3">
								<div className="flex justify-between">
									<span className="text-gray-600">小計（税抜）</span>
									<span className="font-medium">¥0</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">消費税</span>
									<span className="font-medium">¥0</span>
								</div>
								<div className="flex justify-between pt-2 border-t border-gray-200">
									<span className="font-medium">合計（税込）</span>
									<span className="font-bold">¥0</span>
								</div>
							</div>
						</div>
					</div>

					{/* 備考 */}
					<div className="bg-white p-6 rounded-lg shadow">
						<h2 className="text-lg font-medium mb-4">備考</h2>
						<textarea
							className="w-full p-2 border rounded-md h-32"
							placeholder="納期、支払条件など補足情報を入力してください"
						/>
					</div>
				</div>

				{/* 右側1/3 */}
				<div className="space-y-6">
					{/* 原価計算 */}
					<div className="bg-white p-6 rounded-lg shadow">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-lg font-medium flex items-center">
								<Calculator className="mr-2 h-4 w-4" />
								原価・収益
							</h2>
						</div>
						<div className="space-y-4">
							<div>
								<label
									htmlFor="cost"
									className="block text-sm text-gray-700 mb-1"
								>
									原価合計
								</label>
								<div className="relative">
									<span className="absolute left-3 top-2.5">¥</span>
									<input
										type="number"
										id="cost"
										className="w-full p-2 pl-7 border rounded-md"
										placeholder="0"
										min="0"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="profit-margin"
									className="block text-sm text-gray-700 mb-1"
								>
									利益率（%）
								</label>
								<input
									type="number"
									id="profit-margin"
									className="w-full p-2 border rounded-md"
									placeholder="40"
									min="0"
									max="100"
									defaultValue="40"
								/>
							</div>
							<div className="pt-4 border-t">
								<button
									type="button"
									className="w-full p-2 bg-blue-50 text-blue-700 rounded-md flex items-center justify-center"
								>
									<Calculator className="mr-2 h-4 w-4" />
									原価を計算する
								</button>
							</div>
						</div>
					</div>

					{/* 納期 */}
					<div className="bg-white p-6 rounded-lg shadow">
						<h2 className="text-lg font-medium mb-4 flex items-center">
							<Clock className="mr-2 h-4 w-4" />
							納期情報
						</h2>
						<div className="space-y-4">
							<div>
								<label
									htmlFor="delivery-date"
									className="block text-sm text-gray-700 mb-1"
								>
									納期日
								</label>
								<div className="relative">
									<input
										type="date"
										id="delivery-date"
										className="w-full p-2 border rounded-md"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="delivery-notes"
									className="block text-sm text-gray-700 mb-1"
								>
									納期備考
								</label>
								<input
									type="text"
									id="delivery-notes"
									className="w-full p-2 border rounded-md"
									placeholder="例：午前中希望"
								/>
							</div>
						</div>
					</div>

					{/* アクション */}
					<div className="bg-white p-6 rounded-lg shadow">
						<h2 className="text-lg font-medium mb-4">アクション</h2>
						<div className="space-y-3">
							<button
								type="button"
								className="w-full p-2 bg-gray-100 text-gray-700 rounded-md flex items-center justify-center"
							>
								<Eye className="mr-2 h-4 w-4" />
								プレビュー表示
							</button>
							<button
								type="button"
								className="w-full p-2 bg-gray-100 text-gray-700 rounded-md flex items-center justify-center"
							>
								<Save className="mr-2 h-4 w-4" />
								下書き保存
							</button>
							<button
								type="button"
								className="w-full p-2 bg-primary text-white rounded-md flex items-center justify-center"
							>
								<Send className="mr-2 h-4 w-4" />
								送信
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
