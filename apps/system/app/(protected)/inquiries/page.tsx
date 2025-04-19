import InquiriesPageClient from './inquiries-page-client';
import { fetchInquiries, fetchInquiryStats } from '../../../actions/inquiries';

export const dynamic = 'force-dynamic';

export default async function InquiriesPage() {
  // データの取得
  const [inquiries, stats] = await Promise.all([
    fetchInquiries(),
    fetchInquiryStats(),
  ]);

  return <InquiriesPageClient inquiries={inquiries} stats={stats} />;
}
