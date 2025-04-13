"use client";

import type { ReactNode } from "react";

type OptionSectionProps = {
	title: string;
	children: ReactNode;
	visible?: boolean;
};

export default function OptionSection({
	title,
	children,
	visible = true,
}: OptionSectionProps) {
	if (!visible) return null;

	return (
		<div>
			<h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
			{children}
		</div>
	);
}
