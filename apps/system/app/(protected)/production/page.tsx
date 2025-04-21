import ProductionPageClient from './production-page-client';
import type { ProductionJob, Equipment, ProcessSchedule } from './_data';

export default async function ProductionPage() {
  const [productionJobs, equipments, processSchedule] = await Promise.all([
    import('./_data').then((m) => m.fetchProductionJobs()),
    import('./_data').then((m) => m.fetchEquipments()),
    import('./_data').then((m) => m.fetchProcessSchedules()),
  ]);

  return (
    <ProductionPageClient
      productionJobs={productionJobs}
      equipments={equipments}
      processSchedule={processSchedule}
    />
  );
}
