import type { Equipment } from "./types";

// 設備情報のモックデータ
export const equipments: Equipment[] = [
	{
		id: "EQ-001",
		name: "オフセット印刷機A",
		type: "printer",
		status: "operating",
		currentJob: "JOB-2023-1001",
		nextAvailable: "2023/07/21 15:00",
		operator: "鈴木オペレーター",
	},
	{
		id: "EQ-002",
		name: "オフセット印刷機B",
		type: "printer",
		status: "idle",
		currentJob: null,
		nextAvailable: "2023/07/20 10:00",
		operator: null,
	},
	{
		id: "EQ-003",
		name: "デジタル印刷機",
		type: "printer",
		status: "maintenance",
		currentJob: null,
		nextAvailable: "2023/07/22 09:00",
		operator: null,
	},
	{
		id: "EQ-004",
		name: "断裁機",
		type: "cutter",
		status: "operating",
		currentJob: "JOB-2023-1005",
		nextAvailable: "2023/07/20 12:00",
		operator: "伊藤オペレーター",
	},
	{
		id: "EQ-005",
		name: "無線綴じ機",
		type: "binder",
		status: "operating",
		currentJob: "JOB-2023-1002",
		nextAvailable: "2023/07/20 17:00",
		operator: "佐々木オペレーター",
	},
];

// 設備情報取得関数
export async function fetchEquipments(): Promise<Equipment[]> {
	// TODO: 実際のAPIからデータを取得する実装に置き換える
	return equipments;
}
