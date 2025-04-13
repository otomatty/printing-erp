import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import type { Inquiry, InquiryResponse } from '../../_data/types';
import { Avatar, AvatarFallback, AvatarImage } from '@kit/ui/avatar';
import { Badge } from '@kit/ui/badge';
import { Paperclip } from 'lucide-react';

interface InquiryResponsesProps {
  inquiry: Inquiry;
}

export function InquiryResponses({ inquiry }: InquiryResponsesProps) {
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
        <CardTitle>問い合わせ内容・対応履歴</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 問い合わせ内容 */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage
                src={`/avatars/${inquiry.customer_id}.jpg`}
                alt={inquiry.customer_name}
              />
              <AvatarFallback>
                {inquiry.customer_name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold">{inquiry.customer_name}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {formatDate(inquiry.created_at)}
                  </span>
                </div>
                <Badge variant="secondary">問い合わせ内容</Badge>
              </div>
              <div className="text-sm space-y-4">
                <p className="font-semibold">{inquiry.subject}</p>
                <p className="whitespace-pre-wrap">{inquiry.content}</p>
              </div>
            </div>
          </div>
        </div>

        {/* レスポンス履歴 */}
        <div className="space-y-4">
          {inquiry.responses.map((response: InquiryResponse) => (
            <div key={response.id} className="flex items-start gap-4">
              <Avatar>
                <AvatarImage
                  src={
                    response.is_internal
                      ? '/avatars/staff.jpg'
                      : `/avatars/${inquiry.customer_id}.jpg`
                  }
                  alt={response.created_by}
                />
                <AvatarFallback>
                  {response.created_by.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold">{response.created_by}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {formatDate(response.created_at)}
                    </span>
                  </div>
                  {response.is_internal && (
                    <Badge variant="secondary">内部メモ</Badge>
                  )}
                </div>
                <div className="text-sm space-y-2">
                  <p className="whitespace-pre-wrap">{response.content}</p>
                  {response.attachments && response.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {response.attachments.map((attachment, index) => (
                        <a
                          key={index}
                          href={attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                        >
                          <Paperclip className="h-4 w-4" />
                          添付ファイル {index + 1}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
