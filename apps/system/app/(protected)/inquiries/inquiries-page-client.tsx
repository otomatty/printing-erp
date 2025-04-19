'use client';

import { useState } from 'react';
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
import { PlusCircle, Printer, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@kit/ui/tabs';
import { InquiryStats as ReportStats } from './_components/inquiry-stats';
import { InquiryTrends } from './_components/inquiry-trends';
import { InquiryTypeAnalysis } from './_components/inquiry-type-analysis';
import { ResponseTimeAnalysis } from './_components/response-time-analysis';
import { InquiryDistribution } from './_components/inquiry-distribution';
import { InquiryDialog } from './_components/inquiry-dialog';
import { InquiriesMobileList } from './_components/inquiries-mobile-list';

interface InquiriesPageClientProps {
  inquiries: Inquiry[];
  stats: InquiryStats;
}

/**
 * クライアント側のページコンポーネント
 * SegmentedControl と動的なアクションボタンを含む
 */
export default function InquiriesPageClient({
  inquiries,
  stats,
}: InquiriesPageClientProps) {
  const [view, setView] = useState<'list' | 'report'>('list');

  // SegmentedControl を含むヘッダーアクション
  const headerControls = (
    <SegmentedControl
      value={view}
      onValueChange={(value) => setView(value as 'list' | 'report')}
    >
      <SegmentedControlIndicator />
      <SegmentedControlItem value="list">一覧</SegmentedControlItem>
      <SegmentedControlItem value="report">レポート</SegmentedControlItem>
    </SegmentedControl>
  );

  // View に応じて切替えるその他アクションボタン
  const otherActions =
    view === 'list' ? (
      <InquiryDialog />
    ) : (
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
    );

  return (
    <>
      <PageHeader
        title="お問い合わせ"
        description="お問い合わせを管理することができます。"
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
                inquiries={inquiries}
                getStatusDetails={getStatusDetails}
                getPriorityDetails={getPriorityDetails}
              />
            </div>
            <div className="block sm:hidden">
              <InquiriesMobileList
                inquiries={inquiries}
                getStatusDetails={getStatusDetails}
                getPriorityDetails={getPriorityDetails}
              />
            </div>
          </>
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
