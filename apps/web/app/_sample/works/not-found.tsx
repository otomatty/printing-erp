import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] py-16">
			<div className="container px-4">
				<div className="max-w-md mx-auto text-center">
					<h1 className="text-5xl font-bold text-primary mb-4">404</h1>
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						作品が見つかりません
					</h2>
					<p className="text-gray-600 mb-8">
						お探しの制作事例は見つかりませんでした。URLが正しいかご確認いただくか、トップページからご覧ください。
					</p>
					<div className="flex justify-center gap-4">
						<Link
							href="/works"
							className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
						>
							<ChevronLeft size={16} className="mr-1" />
							制作事例一覧に戻る
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
