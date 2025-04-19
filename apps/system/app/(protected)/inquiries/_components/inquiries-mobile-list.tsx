'use client';

import React from 'react';
import { Card, CardContent } from '@kit/ui/card';
import type { Inquiry } from '../_data';

interface InquiriesMobileListProps {
  inquiries: Inquiry[];
  getStatusDetails: (status: string) => { label: string; color: string };
  getPriorityDetails: (priority: string) => { label: string; color: string };
}

export function InquiriesMobileList({
  inquiries,
  getStatusDetails,
  getPriorityDetails,
}: InquiriesMobileListProps) {
  if (!inquiries.length) {
    return (
      <p className="text-center py-4 text-muted-foreground">
        お問い合わせはありません。
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {inquiries.map((inq) => {
        const status = getStatusDetails(inq.status);
        const priority = getPriorityDetails(inq.priority);
        return (
          <Card key={inq.id} className="p-4">
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-base">
                    {inq.subject || '（件名なし）'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {inq.customer_name}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <span
                    className={`${status.color} px-2 py-1 rounded-full text-xs`}
                  >
                    {status.label}
                  </span>
                  <span
                    className={`${priority.color} px-2 py-1 rounded-full text-xs`}
                  >
                    {priority.label}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
