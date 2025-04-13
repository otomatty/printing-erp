import type React from "react";

// data/servicesData.ts と components/services/ServiceDetails.tsx で共通利用する型

export interface ServiceFeature {
	id: string | number;
	text: string;
}

export interface ServiceItem {
	id: string | number;
	name: string;
	description: string | string[]; // ServiceDetails では string[] を期待している場合がある
	shortDescription?: string; // servicesData.ts で定義されている
	href?: string;
	icon?: React.ElementType; // servicesData.ts で定義されている
}

export interface ServiceCategory {
	id: string;
	title: string;
	badge?: string;
	fullDescription: string;
	features: ServiceFeature[];
	image: string; // Assuming string path or could be StaticImageData
	items: ServiceItem[];
	themeColor?: "sky" | "emerald" | "fuchsia"; // servicesData.ts で定義されている
}
