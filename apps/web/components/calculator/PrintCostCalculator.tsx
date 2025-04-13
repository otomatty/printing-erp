import { Calculator, X } from "lucide-react";
import { useState } from "react";

interface PaperOption {
	id: string;
	name: string;
	size: string;
	weight: string;
	pricePerSheet: number;
}

interface PrintingOption {
	id: string;
	name: string;
	pricePerColor: number;
}

interface ProcessOption {
	id: string;
	name: string;
	price: number;
}

interface PrintCostCalculatorProps {
	onClose: () => void;
	onSave: (costData: {
		paper: string;
		printingMethod: string;
		quantity: number;
		colorsFront: number;
		colorsBack: number;
		processes: string[];
		otherCosts: number;
		markup: number;
	}) => void;
	initialData?: {
		paper: string;
		printingMethod: string;
		quantity: number;
		colorsFront: number;
		colorsBack: number;
		processes: string[];
		otherCosts: number;
		markup: number;
	};
}

export default function PrintCostCalculator({
	onClose,
	onSave,
	initialData,
}: PrintCostCalculatorProps) {
	// モックデータ（実際のアプリケーションではデータベースから取得）
	const paperOptions: PaperOption[] = [
		{
			id: "paper-1",
			name: "コート紙",
			size: "A4",
			weight: "90kg",
			pricePerSheet: 12,
		},
		{
			id: "paper-2",
			name: "コート紙",
			size: "A4",
			weight: "110kg",
			pricePerSheet: 15,
		},
		{
			id: "paper-3",
			name: "マットコート紙",
			size: "A4",
			weight: "90kg",
			pricePerSheet: 14,
		},
		{
			id: "paper-4",
			name: "上質紙",
			size: "A4",
			weight: "70kg",
			pricePerSheet: 8,
		},
	];

	const printingOptions: PrintingOption[] = [
		{ id: "print-1", name: "オフセット印刷", pricePerColor: 5000 },
		{ id: "print-2", name: "デジタル印刷", pricePerColor: 3000 },
	];

	const processOptions: ProcessOption[] = [
		{ id: "process-1", name: "断裁", price: 2000 },
		{ id: "process-2", name: "折り加工", price: 3000 },
		{ id: "process-3", name: "中綴じ製本", price: 5000 },
		{ id: "process-4", name: "無線綴じ製本", price: 8000 },
		{ id: "process-5", name: "ラミネート加工", price: 7000 },
		{ id: "process-6", name: "箔押し", price: 10000 },
	];

	// 状態管理
	const [formData, setFormData] = useState({
		paper: initialData?.paper || paperOptions[0].id,
		printingMethod: initialData?.printingMethod || printingOptions[0].id,
		quantity: initialData?.quantity || 1000,
		colorsFront: initialData?.colorsFront || 4,
		colorsBack: initialData?.colorsBack || 4,
		processes: initialData?.processes || [],
		otherCosts: initialData?.otherCosts || 0,
		markup: initialData?.markup || 40,
	});

	// 原価計算
	const calculateCosts = () => {
		// 用紙代
		const selectedPaper = paperOptions.find((p) => p.id === formData.paper);
		const paperCost = selectedPaper
			? selectedPaper.pricePerSheet * formData.quantity
			: 0;

		// 印刷代
		const selectedPrinting = printingOptions.find(
			(p) => p.id === formData.printingMethod,
		);
		const printingCost = selectedPrinting
			? selectedPrinting.pricePerColor *
				(formData.colorsFront + formData.colorsBack)
			: 0;

		// 加工代
		const processesCost = formData.processes.reduce((total, processId) => {
			const process = processOptions.find((p) => p.id === processId);
			return total + (process ? process.price : 0);
		}, 0);

		// その他のコスト
		const otherCosts = Number.parseInt(formData.otherCosts.toString()) || 0;

		// 合計原価
		const totalCost = paperCost + printingCost + processesCost + otherCosts;

		// 利益率を適用した最終価格
		const markup = formData.markup / 100;
		const suggestedPrice = totalCost / (1 - markup);
		const profit = suggestedPrice - totalCost;

		return {
			paperCost,
			printingCost,
			processesCost,
			otherCosts,
			totalCost,
			suggestedPrice,
			profit,
			profitRate: formData.markup,
		};
	};

	const costs = calculateCosts();

	// フォームの変更を処理
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "number" ? Number.parseInt(value) || 0 : value,
		}));
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = e.target;
		setFormData((prev) => {
			if (checked) {
				return {
					...prev,
					processes: [...prev.processes, value],
				};
			}
			return {
				...prev,
				processes: prev.processes.filter((id) => id !== value),
			};
		});
	};

	// 保存処理
	const handleSave = () => {
		onSave({
			...formData,
		});
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-full overflow-auto">
				<div className="flex items-center justify-between p-4 border-b">
					<h2 className="text-xl font-bold flex items-center">
						<Calculator className="mr-2" size={20} />
						印刷仕様と原価計算
					</h2>
					<button
						type="button"
						className="text-gray-400 hover:text-gray-600"
						onClick={onClose}
					>
						<X size={24} />
					</button>
				</div>

				<div className="p-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* 左側：印刷仕様 */}
						<div className="space-y-6">
							<h3 className="text-lg font-medium">印刷仕様</h3>

							{/* 用紙 */}
							<div>
								<label
									htmlFor="paper"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									用紙
								</label>
								<select
									id="paper"
									name="paper"
									className="w-full p-2 border rounded-md"
									value={formData.paper}
									onChange={handleSelectChange}
								>
									{paperOptions.map((option) => (
										<option key={option.id} value={option.id}>
											{option.name} {option.size} {option.weight} (¥
											{option.pricePerSheet}/枚)
										</option>
									))}
								</select>
							</div>

							{/* 印刷方法 */}
							<div>
								<label
									htmlFor="printingMethod"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									印刷方法
								</label>
								<select
									id="printingMethod"
									name="printingMethod"
									className="w-full p-2 border rounded-md"
									value={formData.printingMethod}
									onChange={handleSelectChange}
								>
									{printingOptions.map((option) => (
										<option key={option.id} value={option.id}>
											{option.name} (¥{option.pricePerColor.toLocaleString()}
											/色)
										</option>
									))}
								</select>
							</div>

							{/* 数量 */}
							<div>
								<label
									htmlFor="quantity"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									数量
								</label>
								<input
									type="number"
									id="quantity"
									name="quantity"
									min="1"
									className="w-full p-2 border rounded-md"
									value={formData.quantity}
									onChange={handleInputChange}
								/>
							</div>

							{/* 色数 */}
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="colorsFront"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										表面色数
									</label>
									<select
										id="colorsFront"
										name="colorsFront"
										className="w-full p-2 border rounded-md"
										value={formData.colorsFront}
										onChange={handleSelectChange}
									>
										<option value="1">1色</option>
										<option value="2">2色</option>
										<option value="4">4色（フルカラー）</option>
									</select>
								</div>
								<div>
									<label
										htmlFor="colorsBack"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										裏面色数
									</label>
									<select
										id="colorsBack"
										name="colorsBack"
										className="w-full p-2 border rounded-md"
										value={formData.colorsBack}
										onChange={handleSelectChange}
									>
										<option value="0">0色（印刷なし）</option>
										<option value="1">1色</option>
										<option value="2">2色</option>
										<option value="4">4色（フルカラー）</option>
									</select>
								</div>
							</div>

							{/* 加工 */}
							<div>
								<label
									htmlFor="processes"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									加工
								</label>
								<div className="space-y-2">
									{processOptions.map((option) => (
										<div key={option.id} className="flex items-center">
											<input
												type="checkbox"
												id={option.id}
												name="processes"
												value={option.id}
												checked={formData.processes.includes(option.id)}
												onChange={handleCheckboxChange}
												className="mr-2"
											/>
											<label htmlFor={option.id}>
												{option.name} (¥{option.price.toLocaleString()})
											</label>
										</div>
									))}
								</div>
							</div>

							{/* その他コスト */}
							<div>
								<label
									htmlFor="otherCosts"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									その他コスト
								</label>
								<div className="relative">
									<span className="absolute left-3 top-2.5">¥</span>
									<input
										type="number"
										id="otherCosts"
										name="otherCosts"
										min="0"
										className="w-full pl-8 p-2 border rounded-md"
										value={formData.otherCosts}
										onChange={handleInputChange}
									/>
								</div>
							</div>
						</div>

						{/* 右側：原価計算 */}
						<div className="space-y-6">
							<h3 className="text-lg font-medium">原価計算</h3>

							{/* コスト内訳 */}
							<div className="bg-gray-50 p-4 rounded-md">
								<div className="space-y-3">
									<div className="flex justify-between py-1">
										<span className="text-gray-600">用紙代</span>
										<span>¥{costs.paperCost.toLocaleString()}</span>
									</div>
									<div className="flex justify-between py-1">
										<span className="text-gray-600">印刷代</span>
										<span>¥{costs.printingCost.toLocaleString()}</span>
									</div>
									<div className="flex justify-between py-1">
										<span className="text-gray-600">加工代</span>
										<span>¥{costs.processesCost.toLocaleString()}</span>
									</div>
									<div className="flex justify-between py-1">
										<span className="text-gray-600">その他コスト</span>
										<span>¥{costs.otherCosts.toLocaleString()}</span>
									</div>
									<div className="flex justify-between py-1 pt-2 border-t border-gray-300">
										<span className="font-medium">原価合計</span>
										<span className="font-bold">
											¥{costs.totalCost.toLocaleString()}
										</span>
									</div>
								</div>
							</div>

							{/* 利益率設定 */}
							<div>
								<label
									htmlFor="markup"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									利益率（%）
								</label>
								<input
									type="number"
									id="markup"
									name="markup"
									min="0"
									max="100"
									className="w-full p-2 border rounded-md"
									value={formData.markup}
									onChange={handleInputChange}
								/>
								<div className="mt-1 flex items-center">
									<input
										type="range"
										min="0"
										max="80"
										step="5"
										name="markup"
										value={formData.markup}
										onChange={handleInputChange}
										className="w-full"
									/>
								</div>
							</div>

							{/* 価格提案 */}
							<div className="bg-blue-50 p-4 rounded-md">
								<div className="space-y-3">
									<div className="flex justify-between py-1">
										<span className="text-gray-700">原価合計</span>
										<span>¥{costs.totalCost.toLocaleString()}</span>
									</div>
									<div className="flex justify-between py-1">
										<span className="text-gray-700">利益</span>
										<span>¥{Math.round(costs.profit).toLocaleString()}</span>
									</div>
									<div className="flex justify-between py-1">
										<span className="text-gray-700">利益率</span>
										<span>{costs.profitRate}%</span>
									</div>
									<div className="flex justify-between py-1 pt-2 border-t border-blue-200">
										<span className="font-medium">提案価格（税抜）</span>
										<span className="font-bold text-lg">
											¥{Math.round(costs.suggestedPrice).toLocaleString()}
										</span>
									</div>
								</div>
							</div>

							{/* 特記事項 */}
							<div className="mt-4">
								<p className="text-sm text-gray-500">
									※
									この計算結果は概算です。正確な見積りについては、詳細な仕様確認が必要です。
								</p>
								<p className="text-sm text-gray-500">
									※ 納期や特殊加工によって価格が変動する場合があります。
								</p>
							</div>
						</div>
					</div>

					{/* アクションボタン */}
					<div className="flex justify-end gap-4 mt-8 pt-4 border-t">
						<button
							type="button"
							className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
							onClick={onClose}
						>
							キャンセル
						</button>
						<button
							type="button"
							className="px-4 py-2 bg-primary text-white rounded-md"
							onClick={handleSave}
						>
							この価格で設定する
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
