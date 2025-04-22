'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@kit/ui/card';
import type { Inquiry } from '~/types/inquiries';

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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {inquiries.map((inquiry) => {
        const status = getStatusDetails(inquiry.status);
        const priority = getPriorityDetails(inquiry.priority);
        return (
          <Card key={inquiry.id}>
            <CardHeader>
              <CardTitle className="text-sm">
                {`${inquiry.id.slice(0, 8)}...`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`${status.color} mb-1`}>{status.label}</p>
              <p className={`${priority.color} mb-1`}>{priority.label}</p>
              <p className="text-xs text-gray-500">
                {new Date(inquiry.created_at).toLocaleDateString('ja-JP')}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
