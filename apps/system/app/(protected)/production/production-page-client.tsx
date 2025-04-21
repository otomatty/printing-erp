'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';
import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlIndicator,
} from '~/components/custom/segmented-controle';
import { Button } from '@kit/ui/button';
import { Calendar, Settings, Plus } from 'lucide-react';
import { StatCards } from './_components/stats-cards';
import { DelayedJobsAlert } from './_components/delayed-jobs-alert';
import { JobsTab } from './_components/jobs-tab';
import { EquipmentTab } from './_components/equipment-tab';
import { ProcessTab } from './_components/process-tab';
import { Pagination } from './_components/pagination';
import type { ProductionJob, Equipment, ProcessSchedule } from './_data';

interface ProductionPageClientProps {
  productionJobs: ProductionJob[];
  equipments: Equipment[];
  processSchedule: ProcessSchedule[];
}

export default function ProductionPageClient({
  productionJobs,
  equipments,
  processSchedule,
}: ProductionPageClientProps) {
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

  const idleEquipments = equipments.filter((eq) => eq.status === 'idle');
  const operatingEquipments = equipments.filter(
    (eq) => eq.status === 'operating'
  );
  const maintenanceEquipments = equipments.filter(
    (eq) => eq.status === 'maintenance'
  );

  const [view, setView] = useState<'jobs' | 'equipment' | 'process'>('jobs');

  return (
    <Container>
      <PageHeader
        title="製造管理"
        description="製造案件を管理できます。"
        backLink={{ href: '/', label: 'ホームに戻る' }}
        actions={
          <div className="flex gap-2">
            <Link href="/production/schedule">
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                スケジュール
              </Button>
            </Link>
            <Link href="/production/equipment">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                設備管理
              </Button>
            </Link>
            <Link href="/production/new">
              <Button variant="default" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                新規製造案件
              </Button>
            </Link>
          </div>
        }
      />

      <DelayedJobsAlert delayedJobs={delayedJobs} />

      <StatCards
        scheduledJobs={scheduledJobs}
        inProgressJobs={inProgressJobs}
        completedJobs={completedJobs}
        delayedJobs={delayedJobs}
        operatingEquipments={operatingEquipments}
        equipments={equipments}
      />

      <SegmentedControl
        value={view}
        onValueChange={(val) =>
          setView(val as 'jobs' | 'equipment' | 'process')
        }
      >
        <SegmentedControlIndicator />
        <SegmentedControlItem value="jobs">製造案件</SegmentedControlItem>
        <SegmentedControlItem value="equipment">設備状況</SegmentedControlItem>
        <SegmentedControlItem value="process">工程管理</SegmentedControlItem>
      </SegmentedControl>

      {view === 'jobs' && <JobsTab productionJobs={productionJobs} />}
      {view === 'equipment' && (
        <EquipmentTab
          equipments={equipments}
          idleEquipments={idleEquipments}
          operatingEquipments={operatingEquipments}
          maintenanceEquipments={maintenanceEquipments}
        />
      )}
      {view === 'process' && (
        <ProcessTab
          productionJobs={productionJobs}
          processSchedule={processSchedule}
        />
      )}

      <Pagination totalItems={productionJobs.length} />
    </Container>
  );
}
