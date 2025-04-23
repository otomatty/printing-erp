'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@kit/ui/card';
import { Badge } from '@kit/ui/badge';
import { Mail, Phone, Eye, Trash2, MoreVertical } from 'lucide-react';
import type { Inquiry } from '~/types/inquiries';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@kit/ui/dropdown-menu';
import { InquiriesDeleteDialog } from './inquiries-delete-dialog';
import { format } from 'date-fns';

/**
 * カード形式でお問い合わせを表示するコンポーネント
 */
export function InquiriesCards({
  inquiries,
  getStatusDetails,
  getPriorityDetails,
}: {
  inquiries: Inquiry[];
  getStatusDetails: (status: string) => { label: string; color: string };
  getPriorityDetails: (priority: string) => { label: string; color: string };
}) {
  // 1ヶ月ごとにお問い合わせをグループ化
  const grouped = React.useMemo(() => {
    return inquiries.reduce<Record<string, Inquiry[]>>((acc, inquiry) => {
      const monthKey = format(new Date(inquiry.created_at), 'yyyy-MM');
      if (!acc[monthKey]) acc[monthKey] = [];
      acc[monthKey].push(inquiry);
      return acc;
    }, {});
  }, [inquiries]);

  // 月キーを降順でソート
  const sortedMonths = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <>
      {sortedMonths.map((month) => (
        <section key={month} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {format(new Date(`${month}-01`), 'yyyy年MM月')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {grouped[month]?.map((inquiry) => {
              const status = getStatusDetails(inquiry.status);
              const priority = getPriorityDetails(inquiry.priority);
              return (
                <Card key={inquiry.id} className="relative">
                  {/* アクションメニュー */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/inquiries/${inquiry.id}`}
                          className="flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          詳細
                        </Link>
                      </DropdownMenuItem>
                      <InquiriesDeleteDialog inquiryId={inquiry.id}>
                        <DropdownMenuItem className="text-destructive flex items-center">
                          <Trash2 className="h-4 w-4 mr-2" />
                          削除
                        </DropdownMenuItem>
                      </InquiriesDeleteDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold mb-1">
                      {inquiry.company_name || inquiry.customer_name}
                    </p>
                    <p className="text-xs text-gray-700 mb-1">
                      顧客: {inquiry.customer_name}
                    </p>
                    <p className="text-xs text-gray-500 mb-1">
                      <span className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-1 text-gray-500" />
                        {inquiry.customer_email}
                      </span>
                    </p>
                    {inquiry.customer_phone && (
                      <p className="flex items-center text-sm text-gray-500 mb-1">
                        <Phone className="w-4 h-4 mr-1 text-gray-500" />
                        {inquiry.customer_phone}
                      </p>
                    )}
                    {inquiry.assigned_to_name && (
                      <p className="text-xs text-gray-700 mb-1">
                        担当: {inquiry.assigned_to_name}
                      </p>
                    )}
                    {inquiry.tags?.length ? (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {inquiry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] bg-gray-200 p-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Badge variant="outline" className={`${status.color}`}>
                        {status.label}
                      </Badge>
                      <Badge variant="outline" className={`${priority.color}`}>
                        {priority.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      作成日:{' '}
                      {new Date(inquiry.created_at).toLocaleDateString('ja-JP')}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}
