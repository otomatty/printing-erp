"use client";

import OptionButton from "../OptionButton";
import OptionSection from "./OptionSection";
import { COLOR_OPTIONS } from "../types";
import { Palette, Circle, Layers } from "lucide-react";

type ColorSectionProps = {
	selectedColor: string;
	onChange: (color: string) => void;
	visible: boolean;
};

// カラーオプションごとにアイコンを対応させる
const getIconForColor = (colorId: string) => {
	switch (colorId) {
		case "fullColor":
			return <Palette className="h-6 w-6" />;
		case "monoColor":
			return <Circle className="h-6 w-6" />;
		case "twoColor":
			return <Layers className="h-6 w-6" />;
		default:
			return <Palette className="h-6 w-6" />;
	}
};

export default function ColorSection({
	selectedColor,
	onChange,
	visible,
}: ColorSectionProps) {
	return (
		<OptionSection title="カラー" visible={visible}>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
				{COLOR_OPTIONS.map((option) => (
					<OptionButton
						key={option.id}
						option={option}
						selected={selectedColor === option.id}
						onClick={() => onChange(option.id)}
						icon={getIconForColor(option.id)}
						className="h-20"
					/>
				))}
			</div>
		</OptionSection>
	);
}
