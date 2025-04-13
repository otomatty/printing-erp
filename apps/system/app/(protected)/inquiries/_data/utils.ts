import type { InquiryStatus, InquiryType, PriorityLevel } from "./types";

export const getStatusColor = (status: InquiryStatus): string => {
	switch (status) {
		case "new":
			return "bg-blue-100 text-blue-800";
		case "in_progress":
			return "bg-yellow-100 text-yellow-800";
		case "waiting":
			return "bg-purple-100 text-purple-800";
		case "resolved":
			return "bg-green-100 text-green-800";
		case "closed":
			return "bg-gray-100 text-gray-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

export const getTypeColor = (type: InquiryType): string => {
	switch (type) {
		case "quote_request":
			return "bg-blue-100 text-blue-800";
		case "product_inquiry":
			return "bg-green-100 text-green-800";
		case "order_status":
			return "bg-yellow-100 text-yellow-800";
		case "complaint":
			return "bg-red-100 text-red-800";
		case "support":
			return "bg-purple-100 text-purple-800";
		case "other":
			return "bg-gray-100 text-gray-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

export const getPriorityColor = (priority: PriorityLevel): string => {
	switch (priority) {
		case "urgent":
			return "bg-red-100 text-red-800";
		case "high":
			return "bg-orange-100 text-orange-800";
		case "medium":
			return "bg-yellow-100 text-yellow-800";
		case "low":
			return "bg-green-100 text-green-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};
