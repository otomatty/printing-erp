import type { ProcessSchedule } from "./types";

// 工程スケジュールのモックデータ
export const processSchedules: ProcessSchedule[] = [
	{
		time: "09:00-10:00",
		prepress: ["JOB-2023-1003"],
		printing: ["JOB-2023-1001"],
		cutting: [],
		binding: [],
		finishing: [],
		shipping: [],
	},
	{
		time: "10:00-11:00",
		prepress: ["JOB-2023-1003"],
		printing: ["JOB-2023-1001"],
		cutting: [],
		binding: ["JOB-2023-1002"],
		finishing: [],
		shipping: [],
	},
	{
		time: "11:00-12:00",
		prepress: [],
		printing: ["JOB-2023-1001"],
		cutting: [],
		binding: ["JOB-2023-1002"],
		finishing: [],
		shipping: [],
	},
	{
		time: "13:00-14:00",
		prepress: [],
		printing: ["JOB-2023-1006"],
		cutting: [],
		binding: ["JOB-2023-1002"],
		finishing: [],
		shipping: ["JOB-2023-1004"],
	},
	{
		time: "14:00-15:00",
		prepress: [],
		printing: ["JOB-2023-1006"],
		cutting: ["JOB-2023-1005"],
		binding: ["JOB-2023-1002"],
		finishing: [],
		shipping: [],
	},
	{
		time: "15:00-16:00",
		prepress: [],
		printing: [],
		cutting: ["JOB-2023-1005"],
		binding: [],
		finishing: [],
		shipping: [],
	},
	{
		time: "16:00-17:00",
		prepress: [],
		printing: [],
		cutting: [],
		binding: [],
		finishing: ["JOB-2023-1005"],
		shipping: [],
	},
];

// 工程スケジュール取得関数
export async function fetchProcessSchedules(): Promise<ProcessSchedule[]> {
	// TODO: 実際のAPIからデータを取得する実装に置き換える
	return processSchedules;
}
