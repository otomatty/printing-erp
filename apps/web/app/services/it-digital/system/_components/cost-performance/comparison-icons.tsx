import {
	Clock,
	DollarSign,
	Settings,
	Wrench,
	Users,
	Shield,
	Scale,
	PiggyBank,
} from "lucide-react";

// 開発期間のアイコン
export const DevPeriodIcon = () => <Clock className="w-4 h-4 text-gray-600" />;

// 初期コストのアイコン
export const InitialCostIcon = () => (
	<DollarSign className="w-4 h-4 text-gray-600" />
);

// カスタマイズ性のアイコン
export const CustomizationIcon = () => (
	<Settings className="w-4 h-4 text-gray-600" />
);

// 保守・運用コストのアイコン
export const MaintenanceIcon = () => (
	<Wrench className="w-4 h-4 text-gray-600" />
);

// 使いやすさのアイコン
export const UsabilityIcon = () => <Users className="w-4 h-4 text-gray-600" />;

// セキュリティのアイコン
export const SecurityIcon = () => <Shield className="w-4 h-4 text-gray-600" />;

// 拡張性のアイコン
export const ScalabilityIcon = () => (
	<Scale className="w-4 h-4 text-gray-600" />
);

// 投資回収期間のアイコン
export const ROIIcon = () => <PiggyBank className="w-4 h-4 text-gray-600" />;

// 各項目IDに対応するアイコンを取得する関数
export const getIconForItem = (itemId: string) => {
	switch (itemId) {
		case "dev-period":
			return <DevPeriodIcon />;
		case "cost":
			return <InitialCostIcon />;
		case "customization":
			return <CustomizationIcon />;
		case "maintenance":
			return <MaintenanceIcon />;
		case "usability":
			return <UsabilityIcon />;
		case "security":
			return <SecurityIcon />;
		case "scalability":
			return <ScalabilityIcon />;
		case "roi":
			return <ROIIcon />;
		default:
			return null;
	}
};
