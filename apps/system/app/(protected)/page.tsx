import {
  BarChart,
  Calendar,
  Clock,
  FileText,
  Package,
  Printer,
  Users,
  Plus,
  Search,
  ClipboardList,
  LayoutDashboard,
  Calculator,
  Settings,
  CreditCard,
  Bell,
} from 'lucide-react';

interface RecentOrder {
  id: string;
  title: string;
  customer: string;
  status: string;
  timeAgo: string;
}

interface ScheduledTask {
  id: string;
  title: string;
  type: 'print' | 'document';
  timeSlot: string;
  isUrgent: boolean;
}

interface QuickAccess {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

// メインページ
import DashboardQuickAccess from './_components/dashboard/quick-access';
import DashboardStats from './_components/dashboard/stats';
import DashboardRecentOrders from './_components/dashboard/recent-orders';
import DashboardScheduledTasks from './_components/dashboard/scheduled-tasks';
import DashboardSalesChart from './_components/dashboard/sales-chart';
import DashboardCalendar from './_components/dashboard/calendar';

export default function SystemDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ダッシュボード</h1>

      {/* クイックアクセス */}
      <DashboardQuickAccess />

      {/* ステータスカード */}
      <DashboardStats />

      {/* 最近の注文と今日の予定 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashboardRecentOrders />
        <DashboardScheduledTasks />
      </div>

      {/* 売上グラフプレースホルダー */}
      <DashboardSalesChart />

      {/* スケジュールカレンダー */}
      <DashboardCalendar />
    </div>
  );
}
