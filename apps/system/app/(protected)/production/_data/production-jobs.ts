import type { ProductionJob } from "./types";

// 製造案件のモックデータ
export const productionJobs: ProductionJob[] = [
	{
		id: "JOB-2023-1001",
		orderId: "ORD-2023-124",
		customerName: "株式会社サンプル",
		title: "A4チラシ 両面4色 1,000部",
		status: "in_progress",
		currentProcess: "printing",
		startDate: "2023/07/10",
		dueDate: "2023/07/25",
		progress: 60,
		assignedTo: "田中印刷課",
		priority: "high",
	},
	{
		id: "JOB-2023-1002",
		orderId: "ORD-2023-125",
		customerName: "山田商店",
		title: "会社案内パンフレット A4冊子 500部",
		status: "in_progress",
		currentProcess: "binding",
		startDate: "2023/07/12",
		dueDate: "2023/07/30",
		progress: 80,
		assignedTo: "鈴木製本課",
		priority: "medium",
	},
	{
		id: "JOB-2023-1003",
		orderId: "ORD-2023-128",
		customerName: "イベント企画株式会社",
		title: "イベントポスター B2 100部",
		status: "scheduled",
		currentProcess: "prepress",
		startDate: "2023/07/25",
		dueDate: "2023/08/05",
		progress: 10,
		assignedTo: "佐藤DTP課",
		priority: "medium",
	},
	{
		id: "JOB-2023-1004",
		orderId: "ORD-2023-129",
		customerName: "東京デザイン事務所",
		title: "名刺 両面4色 1,000枚",
		status: "completed",
		currentProcess: "completed",
		startDate: "2023/07/05",
		dueDate: "2023/07/15",
		progress: 100,
		assignedTo: "高橋仕上課",
		priority: "low",
	},
	{
		id: "JOB-2023-1005",
		orderId: "ORD-2023-130",
		customerName: "医療法人ヘルス",
		title: "診察券 片面2色 2,000枚",
		status: "in_progress",
		currentProcess: "cutting",
		startDate: "2023/07/15",
		dueDate: "2023/07/20",
		progress: 90,
		assignedTo: "田中印刷課",
		priority: "high",
	},
	{
		id: "JOB-2023-1006",
		orderId: "ORD-2023-131",
		customerName: "レストランフード",
		title: "メニュー表 A3二つ折り 50部",
		status: "delayed",
		currentProcess: "printing",
		startDate: "2023/07/08",
		dueDate: "2023/07/18",
		progress: 40,
		assignedTo: "田中印刷課",
		priority: "high",
	},
];

// APIからのデータ取得を模倣する関数
export async function fetchProductionJobs(): Promise<ProductionJob[]> {
	// TODO: 実際のAPIからデータを取得する実装に置き換える
	return productionJobs;
}

// IDを指定して製造案件を取得する関数
export async function fetchProductionJobById(
	id: string,
): Promise<ProductionJob | undefined> {
	// TODO: 実際のAPIからデータを取得する実装に置き換える
	const jobs = await fetchProductionJobs();
	return jobs.find((job) => job.id === id);
}
