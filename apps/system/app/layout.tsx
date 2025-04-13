import type { Metadata } from "next";
import Sidebar from "./_components/Sidebar";

export const metadata: Metadata = {
	title: "印刷業務管理システム | ニイヌマ企画印刷",
	description: "ニイヌマ企画印刷の業務管理システム",
};

export default function SystemLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen bg-gray-100">
			{/* サイドナビゲーション */}
			<Sidebar />

			{/* メインコンテンツ */}
			<main className="flex-1 p-6 overflow-auto">{children}</main>
		</div>
	);
}
