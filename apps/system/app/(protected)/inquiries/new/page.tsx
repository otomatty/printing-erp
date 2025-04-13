import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@kit/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { InquiryForm } from './_components/InquiryForm';

export default function NewInquiryPage() {
  return (
    <div className="p-6 space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-2">
        <Link href="/system/inquiries">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">新規お問い合わせ登録</h1>
      </div>

      {/* メインコンテンツ */}
      <Card>
        <CardHeader>
          <CardTitle>お問い合わせ情報入力</CardTitle>
        </CardHeader>
        <CardContent>
          <InquiryForm />
        </CardContent>
      </Card>
    </div>
  );
}
