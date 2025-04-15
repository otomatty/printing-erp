"use client";

import type React from "react";

export type FeatureItemProps = {
	id?: string;
	icon: React.ReactNode;
	title: string;
	description: string;
};

export type FeatureSectionProps = {
	title: string;
	description?: React.ReactNode;
	features: FeatureItemProps[];
	className?: string;
};

const FeatureItem: React.FC<FeatureItemProps> = ({
	icon,
	title,
	description,
}) => {
	return (
		<div className="bg-white p-5 rounded-lg shadow-md">
			<div className="flex items-center mb-4">
				<div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
					{icon}
				</div>
				<h4 className="text-lg font-bold">{title}</h4>
			</div>
			<p className="text-gray-600 text-sm">{description}</p>
		</div>
	);
};

const FeatureSection: React.FC<FeatureSectionProps> = ({
	title,
	description,
	features,
	className = "max-w-4xl mx-auto",
}) => {
	return (
		<div className={className}>
			<h3 className="text-xl font-semibold text-center mb-6">{title}</h3>
			{description && <div className="text-gray-700 mb-8">{description}</div>}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{features.map((feature) => (
					<FeatureItem
						key={
							feature.id ||
							`feature-${feature.title.replace(/\s+/g, "-").toLowerCase()}`
						}
						icon={feature.icon}
						title={feature.title}
						description={feature.description}
					/>
				))}
			</div>
		</div>
	);
};

export default FeatureSection;
