import InquiriesPageClient from './inquiries-page-client';
import { fetchInquiries, fetchInquiryStats } from '../../_actions/inquiries';
import { fetchAdminUsers } from '../../_actions/users/fetchAdminUsers';

export const dynamic = 'force-dynamic';

export default async function InquiriesPage() {
  // データの取得
  const [inquiries, stats] = await Promise.all([
    fetchInquiries(),
    fetchInquiryStats(),
  ]);

  // サーバー側で管理者ユーザーを取得
  const { data: adminUsers, error: adminUsersError } = await fetchAdminUsers();
  if (adminUsersError) {
    console.error('[Debug] fetchAdminUsers error on server:', adminUsersError);
    throw adminUsersError;
  }
  const users = adminUsers ?? [];

  return (
    <InquiriesPageClient
      inquiries={inquiries}
      stats={stats}
      adminUsers={users}
    />
  );
}
