import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@kit/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Container } from '~/components/custom/container'; // ← インポート追加
import { PageHeader } from '~/components/custom/page-header'; // ← インポート追加
import { InquiryForm } from './_components/InquiryForm';

export default function NewInquiryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="新規お問い合わせ登録"
        description="新しいお問い合わせ情報を入力します。"
        backLink={{
          href: '/inquiries',
          label: 'お問い合わせ一覧に戻る',
        }}
      />
      {/* メインコンテンツ */}
      <Container>
        <Card>
          <CardHeader>
            <CardTitle>お問い合わせ情報入力</CardTitle>
          </CardHeader>
          <CardContent>
            <InquiryForm />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
