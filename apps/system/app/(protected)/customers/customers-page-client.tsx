'use client';

import Link from 'next/link';
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  Eye,
  BarChart,
  MessageSquare,
} from 'lucide-react';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';
import { useState } from 'react';
import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlIndicator,
} from '~/components/custom/segmented-controle';
import { CustomersInteractions } from './_components/customers-interactions';
import { CustomersAnalytics } from './_components/customers-analytics';
import { CustomersTable } from './_components/customers-table';

interface Customer {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  lastOrder: string;
}

interface CustomersPageClientProps {
  customers: Customer[];
}

export default function CustomersPageClient({
  customers,
}: CustomersPageClientProps) {
  const [view, setView] = useState<'list' | 'interactions' | 'analytics'>(
    'list'
  );

  const headerControls = (
    <SegmentedControl
      value={view}
      onValueChange={(value) =>
        setView(value as 'list' | 'interactions' | 'analytics')
      }
    >
      <SegmentedControlIndicator />
      <SegmentedControlItem value="list">一覧</SegmentedControlItem>
      <SegmentedControlItem value="interactions">対応記録</SegmentedControlItem>
      <SegmentedControlItem value="analytics">顧客分析</SegmentedControlItem>
    </SegmentedControl>
  );

  return (
    <>
      <PageHeader
        title="顧客管理"
        description="顧客情報を管理することができます。"
        backLink={{ href: '/', label: 'ホームに戻る' }}
        actions={
          <div className="flex flex-col items-end gap-2">
            {headerControls}
            <Link
              href="/customers/new"
              className="bg-primary text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus className="mr-1" size={16} />
              新規顧客登録
            </Link>
          </div>
        }
      />
      <Container>
        {view === 'list' ? (
          <CustomersTable customers={customers} />
        ) : view === 'interactions' ? (
          <CustomersInteractions />
        ) : (
          <CustomersAnalytics />
        )}
      </Container>
    </>
  );
}
