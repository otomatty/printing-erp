"use client";

import OptionButton from "../OptionButton";
import OptionSection from "./OptionSection";
import { PAPER_OPTIONS } from "../types";
import { File, FileText, ScrollText, Newspaper } from "lucide-react";

type PaperSectionProps = {
	selectedPaper: string;
	onChange: (paper: string) => void;
	visible: boolean;
};

// 用紙の種類ごとにアイコンを対応させる
const getIconForPaper = (paperId: string) => {
	switch (paperId) {
		case "normal":
			return <File className="h-6 w-6" />;
		case "highQuality":
			return <FileText className="h-6 w-6" />;
		case "coated":
			return <ScrollText className="h-6 w-6" />;
		case "mat":
			return <Newspaper className="h-6 w-6" />;
		default:
			return <File className="h-6 w-6" />;
	}
};

export default function PaperSection({
	selectedPaper,
	onChange,
	visible,
}: PaperSectionProps) {
	return (
		<OptionSection title="用紙の種類" visible={visible}>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
				{PAPER_OPTIONS.map((option) => (
					<OptionButton
						key={option.id}
						option={option}
						selected={selectedPaper === option.id}
						onClick={() => onChange(option.id)}
						icon={getIconForPaper(option.id)}
						className="h-20"
					/>
				))}
			</div>
		</OptionSection>
	);
}
