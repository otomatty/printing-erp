import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@kit/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';
import { InquiryStats } from './_components/InquiryStats';
import { InquiryTrends } from './_components/InquiryTrends';
import { InquiryTypeAnalysis } from './_components/InquiryTypeAnalysis';
import { ResponseTimeAnalysis } from './_components/ResponseTimeAnalysis';
import { InquiryDistribution } from './_components/InquiryDistribution';
import { Download, Printer, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function InquiryReportsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">問い合わせレポート</h1>
          <p className="text-muted-foreground">
            問い合わせデータの分析と統計情報
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            期間設定
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            印刷
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            エクスポート
          </Button>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InquiryStats />
      </div>

      {/* グラフと分析 */}
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

      {/* 戻るボタン */}
      <div className="mt-6">
        <Link href="/system/inquiries">
          <Button variant="outline">問い合わせ管理へ戻る</Button>
        </Link>
      </div>
    </div>
  );
}
