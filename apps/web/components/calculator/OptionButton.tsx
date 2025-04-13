"use client";

import type { OptionItem } from "./types";
import type { ReactNode } from "react";
import React from "react";

type OptionButtonProps = {
	option: OptionItem;
	selected: boolean;
	onClick: () => void;
	className?: string;
	icon?: ReactNode;
};

export default function OptionButton({
	option,
	selected,
	onClick,
	className = "",
	icon,
}: OptionButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			onKeyDown={(e) => e.key === "Enter" && onClick()}
			className={`px-3 py-3 rounded-md text-sm font-medium transition-all cursor-pointer flex flex-col items-center justify-center ${
				selected
					? "bg-primary text-primary-foreground shadow-md"
					: "bg-gray-100 hover:bg-gray-200 hover:shadow text-gray-800 hover:translate-y-[-1px]"
			} ${className}`}
		>
			<div className="mb-2 h-6 w-6 flex items-center justify-center">
				{icon}
			</div>
			<span>{option.name}</span>
		</button>
	);
}
