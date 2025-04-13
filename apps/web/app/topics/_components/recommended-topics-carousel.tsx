'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@kit/ui/card'; // Shadcn Cardを使用
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@kit/ui/carousel'; // Shadcn Carouselを使用

// page.tsxから日付フォーマット関数をコピー
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return `${year}年${month}月${day}日`;
  } catch {
    return dateString;
  }
};

// page.tsxからTopic型をコピー (共有化推奨)
interface Topic {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  tags: string[];
  category: string;
}

interface RecommendedTopicsCarouselProps {
  topics: Topic[];
}

export function RecommendedTopicsCarousel({
  topics,
}: RecommendedTopicsCarouselProps) {
  if (!topics || topics.length === 0) {
    return null; // 表示する記事がない場合は何も表示しない
  }

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-yellow-300 text-yellow-800">
        おすすめ記事
      </h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true, // ループ表示を有効化
        }}
        className="w-full max-w-full" // コンテナ幅いっぱいに広げる
      >
        <CarouselContent>
          {topics.map((topic) => (
            <CarouselItem
              key={topic.slug}
              className="md:basis-1/1 lg:basis-1/1"
            >
              {' '}
              {/* 基本は1項目ずつ表示 */}
              <div className="p-1">
                {/* カード形式 (上画像、下テキスト) */}
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col group">
                  {/* 画像エリア */}
                  {topic.imageUrl && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Link
                        href={`/topics/${topic.slug}`}
                        className="block h-full w-full"
                      >
                        <Image
                          src={topic.imageUrl}
                          alt={topic.title}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                      </Link>
                    </div>
                  )}
                  {/* テキストエリア */}
                  <CardContent className="p-6 flex flex-col flex-grow">
                    {topic.tags && topic.tags.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {topic.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block bg-yellow-400 text-yellow-900 rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link href={`/topics/${topic.slug}`} className="block mb-2">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-yellow-700 transition-colors duration-200 line-clamp-2">
                        {topic.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-3">
                      {formatDate(topic.date)}
                    </p>
                    <p className="text-gray-700 mb-4 flex-grow line-clamp-3">
                      {topic.excerpt}
                    </p>
                    <Link
                      href={`/topics/${topic.slug}`}
                      className="inline-flex items-center text-yellow-700 hover:text-yellow-900 font-semibold mt-auto self-start transition-colors duration-200 group"
                    >
                      詳しく見る
                      <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-[-10px] md:left-[-20px]" />{' '}
        {/* ボタン位置調整 */}
        <CarouselNext className="right-[-10px] md:right-[-20px]" />{' '}
        {/* ボタン位置調整 */}
      </Carousel>
    </section>
  );
}
