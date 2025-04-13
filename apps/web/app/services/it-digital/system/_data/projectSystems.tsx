import React from "react";

export const projectSystems = [
	{
		title: "プロジェクト管理",
		category: "project",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 text-blue-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<title>プロジェクト管理アイコン</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
				/>
			</svg>
		),
	},
	{
		title: "タスク管理システム",
		category: "project",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 text-blue-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<title>タスク管理アイコン</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
				/>
			</svg>
		),
	},
	{
		title: "リソース管理",
		category: "project",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 text-blue-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<title>リソース管理アイコン</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
				/>
			</svg>
		),
	},
	{
		title: "進捗管理システム",
		category: "project",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 text-blue-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<title>進捗管理アイコン</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
				/>
			</svg>
		),
	},
	{
		title: "スケジュール管理",
		category: "project",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 text-blue-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<title>スケジュール管理アイコン</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
		),
	},
	{
		title: "ガントチャート",
		category: "project",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 text-blue-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<title>ガントチャートアイコン</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M4 6h16M4 10h16M4 14h16M4 18h16"
				/>
			</svg>
		),
	},
	{
		title: "リスク管理システム",
		category: "project",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 text-blue-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<title>リスク管理アイコン</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
		),
	},
	{
		title: "コスト管理システム",
		category: "project",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 text-blue-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<title>コスト管理アイコン</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		),
	},
	{
		title: "チームコラボレーション",
		category: "project",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 text-blue-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<title>チームコラボレーションアイコン</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
				/>
			</svg>
		),
	},
	{
		title: "品質保証システム",
		category: "project",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 text-blue-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<title>品質保証アイコン</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
				/>
			</svg>
		),
	},
	{
		title: "ドキュメント管理",
		category: "project",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 text-blue-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<title>ドキュメント管理アイコン</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
				/>
			</svg>
		),
	},
	{
		title: "マイルストーン管理",
		category: "project",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 text-blue-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<title>マイルストーン管理アイコン</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
				/>
			</svg>
		),
	},
];
