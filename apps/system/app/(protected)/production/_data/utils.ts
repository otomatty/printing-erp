import type {
	Calendar,
	CheckCircle,
	Clock,
	AlertTriangle,
	HelpCircle,
} from "lucide-react";

// ステータスに応じたバッジの色とラベルを返す関数
export const getStatusDetails = (status: string) => {
	switch (status) {
		case "scheduled":
			return {
				color: "bg-blue-100 text-blue-800",
				label: "予定",
				iconName: "Calendar",
			};
		case "in_progress":
			return {
				color: "bg-green-100 text-green-800",
				label: "進行中",
				iconName: "Clock",
			};
		case "completed":
			return {
				color: "bg-gray-100 text-gray-800",
				label: "完了",
				iconName: "CheckCircle",
			};
		case "delayed":
			return {
				color: "bg-red-100 text-red-800",
				label: "遅延",
				iconName: "AlertTriangle",
			};
		case "on_hold":
			return {
				color: "bg-yellow-100 text-yellow-800",
				label: "保留",
				iconName: "HelpCircle",
			};
		default:
			return {
				color: "bg-gray-100 text-gray-800",
				label: "不明",
				iconName: "HelpCircle",
			};
	}
};

// 工程に応じたラベルを返す関数
export const getProcessDetails = (process: string) => {
	switch (process) {
		case "prepress":
			return {
				color: "bg-indigo-100 text-indigo-800",
				label: "製版",
			};
		case "printing":
			return {
				color: "bg-blue-100 text-blue-800",
				label: "印刷",
			};
		case "cutting":
			return {
				color: "bg-yellow-100 text-yellow-800",
				label: "断裁",
			};
		case "binding":
			return {
				color: "bg-orange-100 text-orange-800",
				label: "製本",
			};
		case "finishing":
			return {
				color: "bg-green-100 text-green-800",
				label: "仕上げ",
			};
		case "shipping":
			return {
				color: "bg-purple-100 text-purple-800",
				label: "出荷",
			};
		case "completed":
			return {
				color: "bg-gray-100 text-gray-800",
				label: "完了",
			};
		default:
			return {
				color: "bg-gray-100 text-gray-800",
				label: "不明",
			};
	}
};

// 機器ステータスに応じたバッジの色とラベルを返す関数
export const getEquipmentStatusDetails = (status: string) => {
	switch (status) {
		case "idle":
			return {
				color: "bg-green-100 text-green-800",
				label: "待機中",
			};
		case "operating":
			return {
				color: "bg-blue-100 text-blue-800",
				label: "稼働中",
			};
		case "maintenance":
			return {
				color: "bg-yellow-100 text-yellow-800",
				label: "メンテナンス中",
			};
		case "broken":
			return {
				color: "bg-red-100 text-red-800",
				label: "故障中",
			};
		default:
			return {
				color: "bg-gray-100 text-gray-800",
				label: "不明",
			};
	}
};

// 優先度に応じたバッジの色とラベルを返す関数
export const getPriorityDetails = (priority: string) => {
	switch (priority) {
		case "high":
			return {
				color: "bg-red-100 text-red-800",
				label: "高",
			};
		case "medium":
			return {
				color: "bg-yellow-100 text-yellow-800",
				label: "中",
			};
		case "low":
			return {
				color: "bg-blue-100 text-blue-800",
				label: "低",
			};
		default:
			return {
				color: "bg-gray-100 text-gray-800",
				label: "不明",
			};
	}
};
