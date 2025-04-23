'use client';

import { useState } from 'react';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';

interface LogItem {
  id: number;
  title: string;
  date: string;
  author: string;
}

export default function TaskLogsPageClient() {
  const [logs] = useState<LogItem[]>([
    { id: 1, title: '認証機能実装', date: '2024-07-02', author: 'Developer A' },
    {
      id: 2,
      title: 'ダッシュボードUI修正',
      date: '2024-07-03',
      author: 'Developer B',
    },
  ]);

  return (
    <>
      <PageHeader
        title="作業記録"
        description="作業記録の一覧を表示しています。"
        backLink={{ href: '/', label: 'ホームに戻る' }}
      />
      <Container>
        <div className="space-y-2">
          {logs.map((log) => (
            <div key={log.id} className="p-4 border rounded">
              <h2 className="font-medium">{log.title}</h2>
              <p className="text-sm text-gray-600">
                {log.date} - {log.author}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
