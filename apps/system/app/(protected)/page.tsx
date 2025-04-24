// メインページ
import { DashboardQuickAccess } from './_components/dashboard/quick-access';
import DashboardStats from './_components/dashboard/stats';
import DashboardRecentOrders from './_components/dashboard/recent-orders';
import DashboardScheduledTasks from './_components/dashboard/scheduled-tasks';
import DashboardSalesChart from './_components/dashboard/sales-chart';
import DashboardCalendar from './_components/dashboard/calendar';
import { Container } from '~/components/custom/container';
import { getUserQuickAccess } from '~/_actions/quick-access';
import { fetchInitialCalendarData } from '~/_actions/schedules';

export default async function SystemDashboard() {
  // クイックアクセスデータを取得
  const { success, items, error } = await getUserQuickAccess();
  // 初期表示用のカレンダー情報を取得
  const {
    companyEvents: companyData,
    personalEvents: personalData,
    isLinked,
  } = await fetchInitialCalendarData();

  return (
    <Container>
      <div className="space-y-6">
        {/* クイックアクセス */}
        <DashboardQuickAccess quickAccessItems={success ? items : []} />

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
        <DashboardCalendar
          companyData={companyData}
          personalData={personalData}
          isLinked={isLinked}
        />
      </div>
    </Container>
  );
}
