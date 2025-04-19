import { Mail, Phone, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Badge } from '@kit/ui/badge';
import type { Inquiry } from '../../../../../types/inquiries';
import { getStatusColor, getPriorityColor } from '../../_data/utils';

interface InquiryInfoProps {
  inquiry: Inquiry;
}

export function InquiryInfo({ inquiry }: InquiryInfoProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>問い合わせ情報</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 基本情報 */}
        <div className="space-y-2">
          <h3 className="font-semibold">基本情報</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="font-medium min-w-[8rem]">問い合わせ番号:</span>
              <span>{inquiry.id}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium min-w-[8rem]">ステータス:</span>
              <Badge
                variant="outline"
                className={getStatusColor(inquiry.status)}
              >
                {inquiry.status}
              </Badge>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium min-w-[8rem]">優先度:</span>
              <Badge
                variant="outline"
                className={getPriorityColor(inquiry.priority)}
              >
                {inquiry.priority}
              </Badge>
            </div>
          </div>
        </div>

        {/* 顧客情報 */}
        <div className="space-y-2">
          <h3 className="font-semibold">顧客情報</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{inquiry.customer_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{inquiry.customer_email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{inquiry.customer_phone}</span>
            </div>
          </div>
        </div>

        {/* 担当者情報 */}
        <div className="space-y-2">
          <h3 className="font-semibold">担当者情報</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{inquiry.assigned_to_name || '未割り当て'}</span>
            </div>
          </div>
        </div>

        {/* 日時情報 */}
        <div className="space-y-2">
          <h3 className="font-semibold">日時情報</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="grid gap-1">
                <div>
                  <span className="font-medium">受付日時: </span>
                  <span>{formatDate(inquiry.created_at)}</span>
                </div>
                <div>
                  <span className="font-medium">更新日時: </span>
                  <span>{formatDate(inquiry.updated_at)}</span>
                </div>
                {inquiry.follow_up_date && (
                  <div>
                    <span className="font-medium">フォローアップ予定: </span>
                    <span>{formatDate(inquiry.follow_up_date)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* タグ */}
        {inquiry.tags && inquiry.tags.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">タグ</h3>
            <div className="flex flex-wrap gap-2">
              {inquiry.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
