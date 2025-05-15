import EstimatesPageClient from './estimates-page-client';
import { fetchEstimates } from '../../_actions/estimates';

type Customer = { companyName?: string } | null;

export default async function EstimatesPage() {
  const estimatesRaw = await fetchEstimates();
  const estimates = estimatesRaw.map((e) => ({
    id: e.id,
    estimateNumber: e.estimate_number,
    customerName: (e.customer as Customer)?.companyName ?? '',
    projectName: e.project_name ?? '',
    totalAmount: e.total_amount,
    status: e.status,
    issueDate: e.issue_date ? new Date(e.issue_date).toISOString() : '',
    validUntil: e.valid_until_date
      ? new Date(e.valid_until_date).toISOString()
      : '',
  }));

  return <EstimatesPageClient estimates={estimates} />;
}
