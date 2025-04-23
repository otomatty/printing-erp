'use client';

import { useState } from 'react';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';

interface CostItem {
  id: number;
  title: string;
  cost: string;
  benefit: string;
}

export default function CostsPageClient() {
  const [items] = useState<CostItem[]>([
    { id: 1, title: 'ダッシュボード実装', cost: '100h', benefit: '売上+5%' },
    { id: 2, title: '認証強化', cost: '50h', benefit: 'バグ低減' },
  ]);

  return (
    <>
      <PageHeader
        title="コストと効果"
        description="開発工数とその効果を一覧で表示しています。"
        backLink={{ href: '/', label: 'ホームに戻る' }}
      />
      <Container>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="p-4 border rounded">
              <h2 className="font-medium">{item.title}</h2>
              <p className="text-sm text-gray-600">工数: {item.cost}</p>
              <p className="text-sm text-gray-600">効果: {item.benefit}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
