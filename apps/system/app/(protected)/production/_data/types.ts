// 製造管理で使用する型定義

// 製造案件の型定義
export type ProductionJob = {
	id: string;
	orderId: string;
	customerName: string;
	title: string;
	status: "scheduled" | "in_progress" | "delayed" | "completed";
	currentProcess:
		| "prepress"
		| "printing"
		| "cutting"
		| "binding"
		| "finishing"
		| "shipping"
		| "completed";
	startDate: string;
	dueDate: string;
	progress: number;
	assignedTo: string;
	priority: "low" | "medium" | "high";
};

// 設備情報の型定義
export type Equipment = {
	id: string;
	name: string;
	type: string;
	status: string;
	currentJob: string | null;
	nextAvailable: string;
	operator: string | null;
};

// 工程スケジュールの型定義
export type ProcessSchedule = {
	time: string;
	prepress: string[];
	printing: string[];
	cutting: string[];
	binding: string[];
	finishing: string[];
	shipping: string[];
};
