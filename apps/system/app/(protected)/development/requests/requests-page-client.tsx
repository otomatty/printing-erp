'use client';

import { useState } from 'react';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';

interface RequestItem {
  id: number;
  title: string;
  user: string;
  status: string;
}

export default function RequestsPageClient() {
  const [requests] = useState<RequestItem[]>([
    { id: 1, title: 'ダークモード対応', user: 'User1', status: 'Open' },
    { id: 2, title: 'レポート機能', user: 'User2', status: 'In Progress' },
  ]);

  return (
    <>
      <PageHeader
        title="要望"
        description="ユーザーからの要望一覧を表示しています。"
        backLink={{ href: '/', label: 'ホームに戻る' }}
      />
      <Container>
        <div className="space-y-2">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-4 border rounded flex justify-between"
            >
              <div>
                <h2 className="font-medium">{req.title}</h2>
                <p className="text-sm text-gray-600">報告者: {req.user}</p>
              </div>
              <span className="px-2 py-1 bg-gray-200 rounded text-sm">
                {req.status}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
