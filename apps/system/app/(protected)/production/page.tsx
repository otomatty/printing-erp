import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';
import {
  fetchProductionJobs,
  fetchEquipments,
  fetchProcessSchedules,
} from './_data';

import { Header } from './_components/header';
import { StatCards } from './_components/stats-cards';
import { DelayedJobsAlert } from './_components/delayed-jobs-alert';
import { JobsTab } from './_components/jobs-tab';
import { EquipmentTab } from './_components/equipment-tab';
import { ProcessTab } from './_components/process-tab';
import { Pagination } from './_components/pagination';

export default async function ProductionPage() {
  // データ取得
  const productionJobs = await fetchProductionJobs();
  const equipments = await fetchEquipments();
  const processSchedule = await fetchProcessSchedules();

  // ステータス別の案件数
  const scheduledJobs = productionJobs.filter(
    (job) => job.status === 'scheduled'
  );
  const inProgressJobs = productionJobs.filter(
    (job) => job.status === 'in_progress'
  );
  const completedJobs = productionJobs.filter(
    (job) => job.status === 'completed'
  );
  const delayedJobs = productionJobs.filter((job) => job.status === 'delayed');

  // 設備ステータス別の数
  const idleEquipments = equipments.filter(
    (equipment) => equipment.status === 'idle'
  );
  const operatingEquipments = equipments.filter(
    (equipment) => equipment.status === 'operating'
  );
  const maintenanceEquipments = equipments.filter(
    (equipment) => equipment.status === 'maintenance'
  );

  return (
    <div className="space-y-6 p-6">
      {/* ヘッダー */}
      <Header />

      {/* アラート通知（遅延案件がある場合） */}
      <DelayedJobsAlert delayedJobs={delayedJobs} />

      {/* 統計カード */}
      <StatCards
        scheduledJobs={scheduledJobs}
        inProgressJobs={inProgressJobs}
        completedJobs={completedJobs}
        delayedJobs={delayedJobs}
        operatingEquipments={operatingEquipments}
        equipments={equipments}
      />

      {/* タブ */}
      <Tabs defaultValue="jobs">
        <TabsList className="mb-4">
          <TabsTrigger value="jobs">製造案件</TabsTrigger>
          <TabsTrigger value="equipment">設備状況</TabsTrigger>
          <TabsTrigger value="process">工程管理</TabsTrigger>
        </TabsList>

        {/* 製造案件タブ */}
        <TabsContent value="jobs">
          <JobsTab productionJobs={productionJobs} />
        </TabsContent>

        {/* 設備状況タブ */}
        <TabsContent value="equipment">
          <EquipmentTab
            equipments={equipments}
            idleEquipments={idleEquipments}
            operatingEquipments={operatingEquipments}
            maintenanceEquipments={maintenanceEquipments}
          />
        </TabsContent>

        {/* 工程管理タブ */}
        <TabsContent value="process">
          <ProcessTab
            productionJobs={productionJobs}
            processSchedule={processSchedule}
          />
        </TabsContent>
      </Tabs>

      {/* ページャー */}
      <Pagination totalItems={productionJobs.length} />
    </div>
  );
}
