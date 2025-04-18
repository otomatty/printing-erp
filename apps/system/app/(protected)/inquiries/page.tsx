import { PlusCircle, BarChart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@kit/ui/button';
import { Container } from '~/components/custom/container';
import { PageHeader } from '~/components/custom/page-header';
import { StatisticsCards } from './_components/statistics-cards';
import { InquiriesTable } from './_components/inquiries-table';
import {
  fetchInquiries,
  fetchInquiryStats,
  getStatusDetails,
  getPriorityDetails,
} from './_data';

export const dynamic = 'force-dynamic';

export default async function InquiriesPage() {
  // データの取得
  const [inquiries, stats] = await Promise.all([
    fetchInquiries(),
    fetchInquiryStats(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="お問い合わせ"
        description="お問い合わせを管理することができます。"
        backLink={{
          href: '/',
          label: 'ホームに戻る',
        }}
        actions={
          <div className="flex gap-2">
            <Link href="/inquiries/reports">
              <Button variant="outline">
                <BarChart className="h-4 w-4 mr-2" />
                レポート
              </Button>
            </Link>
            <Link href="/inquiries/new">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                新規作成
              </Button>
            </Link>
          </div>
        }
      />

      <Container>
        <div className="space-y-6">
          {/* 統計カード */}
          <StatisticsCards stats={stats} />

          {/* 問い合わせ一覧テーブル */}
          <InquiriesTable
            inquiries={inquiries}
            getStatusDetails={getStatusDetails}
            getPriorityDetails={getPriorityDetails}
          />
        </div>
      </Container>
    </div>
  );
}
