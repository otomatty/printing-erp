import { ArrowLeft, Printer, Share } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@kit/ui/button';
import { InquiryInfo } from './_components/InquiryInfo';
import { InquiryResponses } from './_components/InquiryResponses';
import { fetchInquiryById } from '../_data';

export const dynamic = 'force-dynamic';

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const inquiry = await fetchInquiryById(resolvedParams.id);

  if (!inquiry) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">エラー</h1>
        <p>お問い合わせが見つかりませんでした。</p>
        <Link
          href="/system/inquiries"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          お問い合わせ一覧へ戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/system/inquiries">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">お問い合わせ詳細: {inquiry.id}</h1>
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
          <Button size="sm">編集</Button>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左カラム - 問い合わせ情報 */}
        <div className="lg:col-span-1 space-y-6">
          <InquiryInfo inquiry={inquiry} />
        </div>

        {/* 右カラム - 問い合わせ内容・対応履歴 */}
        <div className="lg:col-span-2">
          <InquiryResponses inquiry={inquiry} />
        </div>
      </div>
    </div>
  );
}
