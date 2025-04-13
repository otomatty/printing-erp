// 型定義のエクスポート
export * from "./types";

// モックデータとデータ取得関数のエクスポート
export * from "./production-jobs";
export * from "./equipments";
export * from "./process-schedules";

// ユーティリティ関数のエクスポート
export * from "./utils";

// 型のインポート
import type { ProductionJob, Equipment, ProcessSchedule } from "./types";

// モックデータのインポート
import { productionJobs } from "./production-jobs";
import { equipments } from "./equipments";
import { processSchedules } from "./process-schedules";

// 製造ジョブを取得する関数
export async function fetchProductionJobs(): Promise<ProductionJob[]> {
	// モックデータを返します - 実際のAPIではHTTPリクエストになります
	return productionJobs;
}

// 設備を取得する関数
export async function fetchEquipments(): Promise<Equipment[]> {
	// モックデータを返します - 実際のAPIではHTTPリクエストになります
	return equipments;
}

// 工程スケジュールを取得する関数
export async function fetchProcessSchedules(): Promise<ProcessSchedule[]> {
	// モックデータを返します - 実際のAPIではHTTPリクエストになります
	return processSchedules;
}

// 特定の日付の製造ジョブを取得する関数
export async function fetchProductionJobsByDate(
	date: Date,
): Promise<ProductionJob[]> {
	// 実際のAPIではHTTPリクエストで日付に基づくフィルタリングを行いますが、
	// ここではフロントエンドでフィルタリングします
	return productionJobs.filter((job) => {
		const jobStartDate = new Date(job.startDate);
		const jobDueDate = new Date(job.dueDate);

		// 日付が開始日と終了日の間にあるジョブを返します
		return date >= jobStartDate && date <= jobDueDate;
	});
}

// 特定の条件で製造ジョブをフィルタリングする関数
export async function filterProductionJobs(filters: {
	status?: string;
	process?: string;
	priority?: string;
	assignedTo?: string;
	isDelayed?: boolean;
}): Promise<ProductionJob[]> {
	let filteredJobs = [...productionJobs];

	// ステータスでフィルタリング
	if (filters.status) {
		filteredJobs = filteredJobs.filter((job) => job.status === filters.status);
	}

	// 工程でフィルタリング
	if (filters.process) {
		filteredJobs = filteredJobs.filter(
			(job) => job.currentProcess === filters.process,
		);
	}

	// 優先度でフィルタリング
	if (filters.priority) {
		filteredJobs = filteredJobs.filter(
			(job) => job.priority === filters.priority,
		);
	}

	// 担当者でフィルタリング
	if (filters.assignedTo) {
		filteredJobs = filteredJobs.filter(
			(job) => job.assignedTo === filters.assignedTo,
		);
	}

	// 遅延ジョブでフィルタリング
	if (filters.isDelayed) {
		const today = new Date();
		filteredJobs = filteredJobs.filter((job) => {
			const dueDate = new Date(job.dueDate);
			return dueDate < today && job.status !== "completed";
		});
	}

	return filteredJobs;
}
