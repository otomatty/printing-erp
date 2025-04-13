import Link from "next/link";
import {
	Printer,
	Users,
	FileText,
	Package,
	Settings,
	Home,
	Calculator,
	MessageSquare,
	CreditCard,
} from "lucide-react";

export default function Sidebar() {
	return (
		<aside className="w-64 bg-primary text-primary-foreground p-4">
			<div className="mb-6">
				<h1 className="text-xl font-bold">業務管理システム</h1>
			</div>
			<nav>
				<ul className="space-y-2">
					<li>
						<Link
							href="/system"
							className="flex items-center gap-2 p-2 rounded hover:bg-primary-foreground/10"
						>
							<Home size={20} />
							<span>ダッシュボード</span>
						</Link>
					</li>
					<li>
						<Link
							href="/system/quotes"
							className="flex items-center gap-2 p-2 rounded hover:bg-primary-foreground/10"
						>
							<Calculator size={20} />
							<span>見積り管理</span>
						</Link>
					</li>
					<li>
						<Link
							href="/system/orders"
							className="flex items-center gap-2 p-2 rounded hover:bg-primary-foreground/10"
						>
							<FileText size={20} />
							<span>注文管理</span>
						</Link>
					</li>
					<li>
						<Link
							href="/system/customers"
							className="flex items-center gap-2 p-2 rounded hover:bg-primary-foreground/10"
						>
							<Users size={20} />
							<span>顧客管理</span>
						</Link>
					</li>
					<li>
						<Link
							href="/system/billing"
							className="flex items-center gap-2 p-2 rounded hover:bg-primary-foreground/10"
						>
							<CreditCard size={20} />
							<span>請求・入金管理</span>
						</Link>
					</li>
					<li>
						<Link
							href="/system/inventory"
							className="flex items-center gap-2 p-2 rounded hover:bg-primary-foreground/10"
						>
							<Package size={20} />
							<span>在庫管理</span>
						</Link>
					</li>
					<li>
						<Link
							href="/system/production"
							className="flex items-center gap-2 p-2 rounded hover:bg-primary-foreground/10"
						>
							<Printer size={20} />
							<span>製造管理</span>
						</Link>
					</li>
					<li>
						<Link
							href="/system/inquiries"
							className="flex items-center gap-2 p-2 rounded hover:bg-primary-foreground/10"
						>
							<MessageSquare size={20} />
							<span>お問い合わせ管理</span>
						</Link>
					</li>
					<li>
						<Link
							href="/system/settings"
							className="flex items-center gap-2 p-2 rounded hover:bg-primary-foreground/10"
						>
							<Settings size={20} />
							<span>設定</span>
						</Link>
					</li>
				</ul>
			</nav>
		</aside>
	);
}
