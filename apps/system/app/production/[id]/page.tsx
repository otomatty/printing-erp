import { ArrowLeft, Printer, Share, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@kit/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';
import { ProductionInfo } from './_components/ProductionInfo';
import { ProcessTimeline } from './_components/ProcessTimeline';
import { ProductionNotes } from './_components/ProductionNotes';
import { ProductionFiles } from './_components/ProductionFiles';
import type { ProductionJob } from '../_data';
import { fetchProductionJobById } from '../_data';

export const dynamic = 'force-dynamic';

export default async function ProductionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const productionJob = await fetchProductionJobById(resolvedParams.id);

  if (!productionJob) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">エラー</h1>
        <p>製造案件が見つかりませんでした。</p>
        <Link
          href="/system/production"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          製造管理へ戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/system/production">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">
            製造案件詳細: {productionJob.title}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            印刷
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            共有
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            レポート
          </Button>
          <Button size="sm">編集</Button>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左カラム - 案件情報 */}
        <div className="lg:col-span-1 space-y-6">
          <ProductionInfo job={productionJob} />
          <ProductionFiles jobId={productionJob.id} />
        </div>

        {/* 右カラム - タブコンテンツ */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="timeline">工程タイムライン</TabsTrigger>
              <TabsTrigger value="notes">メモ・指示</TabsTrigger>
            </TabsList>
            <TabsContent value="timeline">
              <ProcessTimeline job={productionJob} />
            </TabsContent>
            <TabsContent value="notes">
              <ProductionNotes jobId={productionJob.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
