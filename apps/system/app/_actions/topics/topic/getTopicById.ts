'use server';

import type { Topic } from '../../../../types/topics';

/**
 * 特定のトピックを取得する
 */
export async function getTopicById(id: string) {
  // プロトタイプ用: 5 件の具体的なモック特集記事データを用意し、ID で選択して返却
  const mockTopics: Topic[] = [
    {
      id: '1',
      title: '特集記事1: ERPシステムの導入',
      slug: 'erp-introduction',
      excerpt: 'ERPシステム導入のメリットと手順を解説します。',
      content:
        'ここに詳細なコンテンツが入ります。ERPシステムの基礎から応用まで。',
      thumbnail_url: 'https://placehold.co/600x400?text=ERP+Intro',
      status: 'published',
      published_at: '2024-01-01T10:00:00Z',
      created_at: '2023-12-15T09:00:00Z',
      updated_at: '2024-01-02T12:00:00Z',
      category_id: 'category-1',
      tags: [
        { id: 'tag-feature', name: '特集', slug: 'feature' },
        { id: 'tag-erp', name: 'ERP', slug: 'erp' },
      ],
    },
    {
      id: '2',
      title: '特集記事2: 印刷業界の未来',
      slug: 'future-of-printing',
      excerpt: '印刷業界が今後どのように進化していくかを展望します。',
      content: 'デジタル化とプリントテクノロジーの融合について議論します。',
      thumbnail_url: 'https://placehold.co/600x400?text=Printing+Future',
      status: 'published',
      published_at: '2024-02-15T08:30:00Z',
      created_at: '2024-01-20T11:15:00Z',
      updated_at: '2024-02-16T09:45:00Z',
      category_id: 'category-2',
      tags: [{ id: 'tag-future', name: '未来', slug: 'future' }],
    },
    {
      id: '3',
      title: '特集記事3: 在庫管理の最適化',
      slug: 'inventory-optimization',
      excerpt: '在庫管理を自動化し、コストを削減する方法を紹介。',
      content: 'バーコード・RFID・IoTを活用した最適化手法を解説します。',
      thumbnail_url: 'https://placehold.co/600x400?text=Inventory',
      status: 'draft',
      published_at: null,
      created_at: '2024-03-10T14:00:00Z',
      updated_at: '2024-03-12T16:20:00Z',
      category_id: 'category-3',
      tags: [{ id: 'tag-inventory', name: '在庫', slug: 'inventory' }],
    },
    {
      id: '4',
      title: '特集記事4: 生産計画とスケジューリング',
      slug: 'production-planning',
      excerpt: '効果的な生産計画を立てるためのポイントを解説。',
      content:
        'リソース配分・キャパシティプランニングのベストプラクティスを紹介。',
      thumbnail_url: 'https://placehold.co/600x400?text=Planning',
      status: 'published',
      published_at: '2024-04-05T09:15:00Z',
      created_at: '2024-03-25T10:00:00Z',
      updated_at: '2024-04-06T12:30:00Z',
      category_id: 'category-4',
      tags: [{ id: 'tag-production', name: '生産', slug: 'production' }],
    },
    {
      id: '5',
      title: '特集記事5: 品質管理の最新トレンド',
      slug: 'quality-control-trends',
      excerpt: '品質管理(QC)で注目される最新の技術と手法をまとめました。',
      content: 'AI・機械学習を用いた品質検査の導入事例を紹介。',
      thumbnail_url: 'https://placehold.co/600x400?text=Quality+Control',
      status: 'archived',
      published_at: '2023-11-30T13:45:00Z',
      created_at: '2023-11-01T08:00:00Z',
      updated_at: '2023-12-01T10:10:00Z',
      category_id: 'category-5',
      tags: [{ id: 'tag-quality', name: '品質', slug: 'quality' }],
    },
  ];
  const topic = mockTopics.find((t) => t.id === id) ?? mockTopics[0];
  return { topic, error: null };
}
