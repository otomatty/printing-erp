'use client';

import { useState } from 'react';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';

interface MilestoneItem {
  id: number;
  title: string;
  date: string;
}

export default function MilestonesPageClient() {
  const [milestones] = useState<MilestoneItem[]>([
    { id: 1, title: 'MVPリリース', date: '2024-07-10' },
    { id: 2, title: '機能X完了', date: '2024-08-01' },
  ]);

  return (
    <>
      <PageHeader
        title="マイルストーン"
        description="開発マイルストーンの予定を時系列で表示しています。"
        backLink={{ href: '/', label: 'ホームに戻る' }}
      />
      <Container>
        <ul className="space-y-2">
          {milestones.map((ms) => (
            <li key={ms.id} className="p-4 border-l-4 border-primary">
              <div className="flex justify-between">
                <span className="font-medium">{ms.title}</span>
                <span className="text-sm text-gray-600">{ms.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
