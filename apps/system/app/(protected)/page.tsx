import {
	BarChart,
	Calendar,
	Clock,
	FileText,
	Package,
	Printer,
	Users,
} from "lucide-react";

interface RecentOrder {
	id: string;
	title: string;
	customer: string;
	status: string;
	timeAgo: string;
}

interface ScheduledTask {
	id: string;
	title: string;
	type: "print" | "document";
	timeSlot: string;
	isUrgent: boolean;
}

export default function SystemDashboard() {
	// 実際のシステムでは、ここでデータを取得します
	const mockStats = {
		pendingOrders: 12,
		activeCustomers: 48,
		lowStockItems: 5,
		scheduledJobs: 8,
	};

	// モックデータ - 最近の注文
	const recentOrders: RecentOrder[] = [
		{
			id: "ord-2023-001",
			title: "チラシ印刷 #2023",
			customer: "株式会社サンプル",
			status: "製作中",
			timeAgo: "2日前",
		},
		{
			id: "ord-2023-002",
			title: "チラシ印刷 #2024",
			customer: "○○商事",
			status: "受付済み",
			timeAgo: "2日前",
		},
		{
			id: "ord-2023-003",
			title: "チラシ印刷 #2025",
			customer: "△△印刷",
			status: "配送待ち",
			timeAgo: "2日前",
		},
		{
			id: "ord-2023-004",
			title: "チラシ印刷 #2026",
			customer: "××デザイン事務所",
			status: "製作中",
			timeAgo: "2日前",
		},
		{
			id: "ord-2023-005",
			title: "チラシ印刷 #2027",
			customer: "□□出版",
			status: "受付済み",
			timeAgo: "2日前",
		},
	];

	// モックデータ - 今日の予定
	const scheduledTasks: ScheduledTask[] = [
		{
			id: "task-2023-001",
			title: "パンフレット印刷",
			type: "print",
			timeSlot: "13:00 - 15:00",
			isUrgent: true,
		},
		{
			id: "task-2023-002",
			title: "納品書作成",
			type: "document",
			timeSlot: "15:30 - 16:00",
			isUrgent: false,
		},
		{
			id: "task-2023-003",
			title: "パンフレット印刷",
			type: "print",
			timeSlot: "13:00 - 15:00",
			isUrgent: false,
		},
		{
			id: "task-2023-004",
			title: "納品書作成",
			type: "document",
			timeSlot: "15:30 - 16:00",
			isUrgent: false,
		},
	];

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold">ダッシュボード</h1>

			{/* ステータスカード */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div className="bg-white p-6 rounded-lg shadow">
					<div className="flex items-start justify-between">
						<div>
							<p className="text-gray-500 text-sm">未処理の注文</p>
							<p className="text-3xl font-bold mt-1">
								{mockStats.pendingOrders}
							</p>
						</div>
						<div className="bg-blue-100 p-2 rounded-full">
							<FileText className="text-blue-600" size={24} />
						</div>
					</div>
					<div className="mt-4">
						<a
							href="/system/orders"
							className="text-sm text-blue-600 hover:underline"
						>
							すべての注文を見る →
						</a>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow">
					<div className="flex items-start justify-between">
						<div>
							<p className="text-gray-500 text-sm">アクティブな顧客</p>
							<p className="text-3xl font-bold mt-1">
								{mockStats.activeCustomers}
							</p>
						</div>
						<div className="bg-green-100 p-2 rounded-full">
							<Users className="text-green-600" size={24} />
						</div>
					</div>
					<div className="mt-4">
						<a
							href="/system/customers"
							className="text-sm text-green-600 hover:underline"
						>
							顧客リストを見る →
						</a>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow">
					<div className="flex items-start justify-between">
						<div>
							<p className="text-gray-500 text-sm">在庫が少ない商品</p>
							<p className="text-3xl font-bold mt-1">
								{mockStats.lowStockItems}
							</p>
						</div>
						<div className="bg-yellow-100 p-2 rounded-full">
							<Package className="text-yellow-600" size={24} />
						</div>
					</div>
					<div className="mt-4">
						<a
							href="/system/inventory"
							className="text-sm text-yellow-600 hover:underline"
						>
							在庫管理へ →
						</a>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow">
					<div className="flex items-start justify-between">
						<div>
							<p className="text-gray-500 text-sm">予定されている作業</p>
							<p className="text-3xl font-bold mt-1">
								{mockStats.scheduledJobs}
							</p>
						</div>
						<div className="bg-purple-100 p-2 rounded-full">
							<Calendar className="text-purple-600" size={24} />
						</div>
					</div>
					<div className="mt-4">
						<a
							href="/system/production"
							className="text-sm text-purple-600 hover:underline"
						>
							生産スケジュールを見る →
						</a>
					</div>
				</div>
			</div>

			{/* 最近の注文と今日の予定 */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-white p-6 rounded-lg shadow">
					<h2 className="text-xl font-bold mb-4">最近の注文</h2>
					<div className="space-y-3">
						{recentOrders.map((order) => (
							<div
								key={order.id}
								className="flex items-center justify-between border-b pb-3 last:border-0"
							>
								<div>
									<p className="font-medium">{order.title}</p>
									<p className="text-sm text-gray-500">{order.customer}</p>
								</div>
								<div className="flex items-center">
									<span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
										{order.status}
									</span>
									<Clock className="ml-2 text-gray-400" size={16} />
									<span className="text-xs text-gray-500 ml-1">
										{order.timeAgo}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow">
					<h2 className="text-xl font-bold mb-4">今日の予定</h2>
					<div className="space-y-3">
						{scheduledTasks.map((task) => (
							<div
								key={task.id}
								className="flex items-center justify-between border-b pb-3 last:border-0"
							>
								<div className="flex items-center">
									<div className="bg-gray-100 p-2 rounded mr-3">
										{task.type === "print" ? (
											<Printer size={20} />
										) : (
											<FileText size={20} />
										)}
									</div>
									<div>
										<p className="font-medium">{task.title}</p>
										<p className="text-sm text-gray-500">{task.timeSlot}</p>
									</div>
								</div>
								<span
									className={`inline-block px-2 py-1 text-xs rounded ${
										task.isUrgent
											? "bg-red-100 text-red-800"
											: "bg-gray-100 text-gray-800"
									}`}
								>
									{task.isUrgent ? "今すぐ" : "予定"}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* 売上グラフプレースホルダー */}
			<div className="bg-white p-6 rounded-lg shadow">
				<h2 className="text-xl font-bold mb-4">月次売上</h2>
				<div className="h-64 flex items-center justify-center bg-gray-50 rounded border">
					<div className="text-center">
						<BarChart size={48} className="mx-auto text-gray-400" />
						<p className="mt-2 text-gray-500">
							グラフデータはプロトタイプでは表示されません
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
