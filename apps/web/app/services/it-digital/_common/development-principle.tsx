import type React from "react";
import type { DevelopmentPrincipleData } from "../system/_data/whyChooseUsData";

interface DevelopmentPrincipleProps {
	data: DevelopmentPrincipleData;
	total: number; // 全体の原則数（グリッドレイアウト用）
}

const DevelopmentPrinciple: React.FC<DevelopmentPrincipleProps> = ({
	data,
}) => {
	const { number, title, description } = data;

	return (
		<div>
			<div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
				<span className="text-2xl font-bold">{number}</span>
			</div>
			<p className="font-medium">{title}</p>
			{description && <p className="text-sm mt-1 opacity-90">{description}</p>}
		</div>
	);
};

export default DevelopmentPrinciple;
