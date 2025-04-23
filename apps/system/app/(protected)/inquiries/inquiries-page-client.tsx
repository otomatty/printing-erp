'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@kit/ui/button';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';
import type { Inquiry, InquiryStats } from './_data';
import { getStatusDetails, getPriorityDetails } from './_data';
import { InquiriesTable } from './_components/inquiries-table';
import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlIndicator,
} from '~/components/custom/segmented-controle';
import {
  Printer,
  Download,
  List,
  Grid,
  Columns,
  Calendar,
  BarChart2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@kit/ui/tabs';
import { InquiryStats as ReportStats } from './_components/inquiry-stats';
import { InquiryTrends } from './_components/inquiry-trends';
import { InquiryTypeAnalysis } from './_components/inquiry-type-analysis';
import { ResponseTimeAnalysis } from './_components/response-time-analysis';
import { InquiryDistribution } from './_components/inquiry-distribution';
import { InquiryDialog } from './_components/inquiry-dialog';
import { InquiriesMobileList } from './_components/inquiries-mobile-list';
import { InquiriesCards } from './_components/inquiries-cards';
import { InquiriesKanban } from './_components/inquiries-kanban';
import { InquiriesCalendar } from './_components/inquiries-calendar';
import type { Database } from '@kit/supabase/database';
import { useAtom, useAtomValue } from 'jotai';
import { inquiriesAtom } from '~/store/inquiries';
// 型定義：管理者ユーザー
type AdminUser = Database['system']['Tables']['admin_users']['Row'];

interface InquiriesPageClientProps {
  inquiries: Inquiry[];
  stats: InquiryStats;
  adminUsers: AdminUser[];
}

/**
 * クライアント側のページコンポーネント
 * SegmentedControl と動的なアクションボタンを含む
 */
export default function InquiriesPageClient({
  inquiries,
  stats,
  adminUsers,
}: InquiriesPageClientProps) {
  // Jotai で問い合わせ一覧を管理
  const [inquiriesState, setInquiriesState] = useAtom(inquiriesAtom);
  useEffect(() => {
    setInquiriesState(inquiries);
  }, [inquiries, setInquiriesState]);
  const currentInquiries = useAtomValue(inquiriesAtom);
  // toggle between table(list), cards, kanban, calendar, and report
  const [view, setView] = useState<
    'list' | 'cards' | 'kanban' | 'calendar' | 'report'
  >('list');
  // ビュー別の説明文マッピング
  const viewDescriptions = {
    list: 'お問い合わせの一覧を表示しています。',
    cards:
      'カードでは、月ごとにどのようなお問い合わせがあったのかがわかります。',
    kanban:
      'カンバンでは、カードをドラッグ&ドロップすることでお問い合わせのステータスを変更できます。',
    calendar:
      'カレンダーでは、日付ごとにどのようなお問い合わせがあったのかがわかりやすく表示されています。',
    report:
      'レポートでは、お問い合わせの傾向や種類別、対応時間分析、分布などを表示しています。',
  } as const;

  // prepare Kanban columns grouped by status (Jotai 管理の state から)
  const kanbanColumns = useMemo(
    () =>
      ['new', 'in_progress', 'waiting', 'resolved', 'closed'].map((status) => ({
        id: status,
        title: getStatusDetails(status).label,
        inquiries: currentInquiries.filter((i) => i.status === status),
      })),
    [currentInquiries]
  );

  // SegmentedControl を含むヘッダーアクション
  const headerControls = (
    <SegmentedControl
      value={view}
      onValueChange={(val) =>
        setView(val as 'list' | 'cards' | 'kanban' | 'calendar' | 'report')
      }
    >
      <SegmentedControlIndicator />
      <SegmentedControlItem value="list">
        <div className="flex items-center space-x-1">
          <List className="w-4 h-4" />
          <span>一覧</span>
        </div>
      </SegmentedControlItem>
      <SegmentedControlItem value="cards">
        <div className="flex items-center space-x-1">
          <Grid className="w-4 h-4" />
          <span>カード</span>
        </div>
      </SegmentedControlItem>
      <SegmentedControlItem value="kanban">
        <div className="flex items-center space-x-1">
          <Columns className="w-4 h-4" />
          <span>カンバン</span>
        </div>
      </SegmentedControlItem>
      <SegmentedControlItem value="calendar">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>カレンダー</span>
        </div>
      </SegmentedControlItem>
      <SegmentedControlItem value="report">
        <div className="flex items-center space-x-1">
          <BarChart2 className="w-4 h-4" />
          <span>レポート</span>
        </div>
      </SegmentedControlItem>
    </SegmentedControl>
  );

  // View に応じて切替えるその他アクションボタン
  const otherActions =
    view === 'report' ? (
      <>
        <Button variant="outline" size="sm">
          <Printer className="h-4 w-4 mr-2" />
          印刷
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          エクスポート
        </Button>
      </>
    ) : (
      <InquiryDialog />
    );

  return (
    <>
      <PageHeader
        title="お問い合わせ"
        description={viewDescriptions[view]}
        backLink={{ href: '/', label: 'ホームに戻る' }}
        actions={
          <div className="flex flex-col gap-2 items-end">
            {headerControls}
            <div className="flex items-center gap-2">{otherActions}</div>
          </div>
        }
      />

      <Container>
        {view === 'list' ? (
          <>
            <div className="hidden sm:block">
              <InquiriesTable
                inquiries={currentInquiries}
                getStatusDetails={getStatusDetails}
                getPriorityDetails={getPriorityDetails}
                adminUsers={adminUsers}
              />
            </div>
            <div className="block sm:hidden">
              <InquiriesMobileList
                inquiries={currentInquiries}
                getStatusDetails={getStatusDetails}
                getPriorityDetails={getPriorityDetails}
              />
            </div>
          </>
        ) : view === 'cards' ? (
          <InquiriesCards
            inquiries={currentInquiries}
            getStatusDetails={getStatusDetails}
            getPriorityDetails={getPriorityDetails}
          />
        ) : view === 'kanban' ? (
          <InquiriesKanban columns={kanbanColumns} />
        ) : view === 'calendar' ? (
          <InquiriesCalendar inquiries={currentInquiries} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ReportStats stats={stats} />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>分析レポート</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="trends">
                  <TabsList>
                    <TabsTrigger value="trends">傾向分析</TabsTrigger>
                    <TabsTrigger value="types">種類別分析</TabsTrigger>
                    <TabsTrigger value="response">対応時間分析</TabsTrigger>
                    <TabsTrigger value="distribution">分布</TabsTrigger>
                  </TabsList>
                  <TabsContent value="trends">
                    <InquiryTrends />
                  </TabsContent>
                  <TabsContent value="types">
                    <InquiryTypeAnalysis />
                  </TabsContent>
                  <TabsContent value="response">
                    <ResponseTimeAnalysis />
                  </TabsContent>
                  <TabsContent value="distribution">
                    <InquiryDistribution />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </Container>
    </>
  );
}
