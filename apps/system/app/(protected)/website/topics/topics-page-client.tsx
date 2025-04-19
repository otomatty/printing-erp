'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';
import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlIndicator,
} from '~/components/custom/segmented-controle';
import { Button } from '@kit/ui/button';
import { Plus } from 'lucide-react';
import CategoryTable from './_components/categories/category-table';
import TagTable from './_components/tags/tag-table';
import TopicCard from './_components/topic-card';
import type {
  TopicCategoryFormData,
  TopicTagFormData,
  Topic,
} from '~/types/topics';

interface TopicsPageClientProps {
  categories: { id: string; name: string; slug: string }[];
  tags: { id: string; name: string; slug: string }[];
  topics: Topic[];
}

export default function TopicsPageClient({
  categories,
  tags,
  topics,
}: TopicsPageClientProps) {
  const [view, setView] = useState<'articles' | 'categories' | 'tags'>(
    'articles'
  );

  // SegmentedControl for switching views
  const headerControls = (
    <SegmentedControl
      value={view}
      onValueChange={(v) => setView(v as 'articles' | 'categories' | 'tags')}
    >
      <SegmentedControlIndicator />
      <SegmentedControlItem value="articles">記事一覧</SegmentedControlItem>
      <SegmentedControlItem value="categories">カテゴリ</SegmentedControlItem>
      <SegmentedControlItem value="tags">タグ</SegmentedControlItem>
    </SegmentedControl>
  );

  // Action button for creating new category or tag
  const createAction = (
    <Button asChild>
      <Link
        href={`/website/topics/${view === 'categories' ? 'category' : view === 'tags' ? 'tag' : 'article'}/create`}
      >
        <Plus className="h-4 w-4 mr-1" /> 新規
        {view === 'categories' ? 'カテゴリ' : view === 'tags' ? 'タグ' : '記事'}
      </Link>
    </Button>
  );

  return (
    <>
      <PageHeader
        title="トピックス管理"
        description="ホームページのトピックスを管理します"
        backLink={{ href: '/', label: 'ホームに戻る' }}
        actions={
          <div className="flex flex-col gap-2 items-end">
            {headerControls}
            <div className="flex gap-2">{createAction}</div>
          </div>
        }
      />
      <Container>
        <div className="space-y-6">
          {view === 'articles' ? (
            <div className="space-y-4">
              {topics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  id={topic.id}
                  title={topic.title}
                  excerpt={topic.excerpt}
                  slug={topic.slug}
                  status={topic.status}
                  publishedAt={topic.published_at}
                  updatedAt={topic.updated_at}
                  categoryName={
                    categories.find((c) => c.id === topic.category_id)?.name ||
                    null
                  }
                  tags={topic.tags}
                />
              ))}
            </div>
          ) : view === 'categories' ? (
            <CategoryTable categories={categories} />
          ) : (
            <TagTable tags={tags} />
          )}
        </div>
      </Container>
    </>
  );
}
