import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewCustomerPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center">
				<Link
					href="/system/customers"
					className="text-gray-500 hover:text-gray-700 mr-4"
				>
					<ArrowLeft size={20} />
				</Link>
				<h1 className="text-2xl font-bold">新規顧客登録</h1>
			</div>

			<div className="bg-white p-6 rounded-lg shadow">
				<form className="space-y-6">
					{/* 会社情報 */}
					<div>
						<h2 className="text-lg font-medium mb-4">会社情報</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="company-name"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									会社名 <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="company-name"
									required
									className="w-full p-2 border rounded-md"
								/>
							</div>
							<div>
								<label
									htmlFor="company-category"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									業種
								</label>
								<select
									id="company-category"
									className="w-full p-2 border rounded-md"
								>
									<option value="">選択してください</option>
									<option value="印刷会社">印刷会社</option>
									<option value="デザイン会社">デザイン会社</option>
									<option value="製造業">製造業</option>
									<option value="小売業">小売業</option>
									<option value="サービス業">サービス業</option>
									<option value="その他">その他</option>
								</select>
							</div>
							<div>
								<label
									htmlFor="zip-code"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									郵便番号
								</label>
								<div className="flex gap-2">
									<input
										type="text"
										id="zip-code"
										className="w-full p-2 border rounded-md"
										placeholder="例: 160-0023"
									/>
									<button
										type="button"
										className="px-3 py-2 bg-gray-100 rounded-md text-sm"
									>
										住所検索
									</button>
								</div>
							</div>
							<div>
								<label
									htmlFor="prefecture"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									都道府県
								</label>
								<select
									id="prefecture"
									className="w-full p-2 border rounded-md"
								>
									<option value="">選択してください</option>
									<option value="東京都">東京都</option>
									<option value="神奈川県">神奈川県</option>
									{/* 他の都道府県も追加 */}
								</select>
							</div>
							<div className="md:col-span-2">
								<label
									htmlFor="address"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									住所
								</label>
								<input
									type="text"
									id="address"
									className="w-full p-2 border rounded-md"
								/>
							</div>
							<div>
								<label
									htmlFor="phone"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									電話番号
								</label>
								<input
									type="tel"
									id="phone"
									className="w-full p-2 border rounded-md"
									placeholder="例: 03-1234-5678"
								/>
							</div>
							<div>
								<label
									htmlFor="fax"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									FAX番号
								</label>
								<input
									type="tel"
									id="fax"
									className="w-full p-2 border rounded-md"
									placeholder="例: 03-1234-5679"
								/>
							</div>
						</div>
					</div>

					{/* 担当者情報 */}
					<div>
						<h2 className="text-lg font-medium mb-4">担当者情報</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="contact-name"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									担当者名 <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="contact-name"
									required
									className="w-full p-2 border rounded-md"
								/>
							</div>
							<div>
								<label
									htmlFor="contact-department"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									部署名
								</label>
								<input
									type="text"
									id="contact-department"
									className="w-full p-2 border rounded-md"
								/>
							</div>
							<div>
								<label
									htmlFor="contact-email"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									メールアドレス <span className="text-red-500">*</span>
								</label>
								<input
									type="email"
									id="contact-email"
									required
									className="w-full p-2 border rounded-md"
								/>
							</div>
							<div>
								<label
									htmlFor="contact-phone"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									携帯電話番号
								</label>
								<input
									type="tel"
									id="contact-phone"
									className="w-full p-2 border rounded-md"
									placeholder="例: 090-1234-5678"
								/>
							</div>
						</div>
					</div>

					{/* その他情報 */}
					<div>
						<h2 className="text-lg font-medium mb-4">その他情報</h2>
						<div>
							<label
								htmlFor="notes"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								備考・メモ
							</label>
							<textarea
								id="notes"
								rows={3}
								className="w-full p-2 border rounded-md"
								placeholder="特記事項や対応時の注意点などがあれば入力してください。"
							/>
						</div>
					</div>

					<div className="flex justify-end gap-4 pt-4 border-t">
						<Link
							href="/system/customers"
							className="px-6 py-2 bg-gray-100 rounded-md text-gray-700"
						>
							キャンセル
						</Link>
						<button
							type="submit"
							className="px-6 py-2 bg-primary text-white rounded-md"
						>
							登録する
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
