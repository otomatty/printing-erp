'use client';

import type React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// 日付フォーマット関数 (page.tsxからコピー)
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

// Propsの型定義
interface Topic {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  tags: string[];
  category: string;
}

interface Category {
  slug: string;
  name: string;
}

interface TopicListClientProps {
  topics: Topic[];
  categories: Category[];
}

// カテゴリごとの配色定義
const categoryStyles: {
  [key: string]: {
    border: string;
    text: string;
    tagBg: string;
    tagText: string;
    hoverBg: string;
    hoverText: string;
  };
} = {
  printing: {
    border: 'border-green-300',
    text: 'text-green-800',
    tagBg: 'bg-green-500',
    tagText: 'text-white',
    hoverBg: 'hover:bg-green-50',
    hoverText: 'group-hover:text-green-700',
  },
  dx: {
    border: 'border-blue-300', // IndigoからBlueに変更
    text: 'text-blue-800',
    tagBg: 'bg-blue-500', // IndigoからBlueに変更
    tagText: 'text-white',
    hoverBg: 'hover:bg-blue-50', // IndigoからBlueに変更
    hoverText: 'group-hover:text-blue-700', // IndigoからBlueに変更
  },
  // 他のカテゴリを追加する場合
};

const TopicSections: React.FC<TopicListClientProps> = ({
  topics,
  categories,
}) => {
  const router = useRouter();

  // 表示順序を指定 (printingを先に)
  const orderedCategorySlugs = ['printing', 'dx']; // 表示したいカテゴリ順

  // カテゴリデータから表示対象をフィルタリングし、指定順にソート
  const displayCategories = categories
    .filter((cat) => orderedCategorySlugs.includes(cat.slug))
    .sort(
      (a, b) =>
        orderedCategorySlugs.indexOf(a.slug) -
        orderedCategorySlugs.indexOf(b.slug)
    );

  return (
    <div className="space-y-16">
      {displayCategories.map((category) => {
        const categoryTopics = topics.filter(
          (topic) => topic.category === category.slug
        );
        if (categoryTopics.length === 0) {
          return null;
        }
        const displayedTopics = categoryTopics.slice(0, 5);
        const styles = categoryStyles[category.slug] || categoryStyles.dx; // デフォルトはdxスタイル

        return (
          <section key={category.slug}>
            {/* カテゴリ見出し + 一覧リンク */}
            <div
              className={`mb-8 pb-2 border-b ${styles?.border} flex justify-between items-center`}
            >
              <h2 className={`text-3xl font-bold ${styles?.text}`}>
                {category.name}
              </h2>
              <Link
                href={`/topics/category/${category.slug}`}
                className={`text-sm font-medium ${styles?.text?.replace('text-', 'hover:text-').replace('800', '600')} transition-colors`}
              >
                {category.name}一覧を見る &rarr;
              </Link>
            </div>

            {/* 記事リスト (スタイル変更) */}
            <div className="space-y-0">
              {' '}
              {/* 記事間のデフォルトスペース削除 */}
              {displayedTopics.map((topic) => (
                // 記事カード全体をdivにし、内部にLinkを配置する方式に変更。groupクラスをここに。
                // ホバーエフェクト、ボーダー（下線）を追加
                <div
                  key={topic.slug}
                  className={`relative group border-b border-slate-100 transition-colors duration-200 ${styles?.hoverBg}`}
                  // クリックイベントでページ遷移（Linkコンポーネントと役割分担）
                  // onClick={() => router.push(`/topics/${topic.slug}`)}
                  // style={{ cursor: 'pointer' }} // クリック可能を示すカーソル
                >
                  {/* カード全体を覆うリンク (スクリーンリーダー向けテキストも考慮) */}
                  <Link
                    href={`/topics/${topic.slug}`}
                    className="absolute inset-0 z-10"
                    aria-label={`${topic.title}の詳細を見る`}
                  />

                  {/* メディアコンテンツ (position relativeでリンクより手前に) */}
                  <div className="relative z-0 flex flex-col md:flex-row">
                    {/* 左側: テキスト情報 */}
                    <div className="p-6 flex flex-col flex-grow md:w-2/3">
                      {topic.tags && topic.tags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          {topic.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`inline-block ${styles?.tagBg} ${styles?.tagText} rounded-full px-3 py-1 text-xs font-semibold tracking-wide`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {/* タイトルへの個別リンクは削除し、h3にする */}
                      <h3
                        className={`text-xl font-bold text-gray-800 ${styles?.hoverText} transition-colors duration-200 mb-2 line-clamp-2`}
                      >
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {formatDate(topic.date)}
                      </p>
                      <p className="text-gray-700 mb-4 flex-grow line-clamp-3 md:line-clamp-2">
                        {topic.excerpt}
                      </p>{' '}
                      {/* PCでも省略するように */}
                      {/* 「詳しく見る」リンクは削除。カード全体でリンクするため */}
                    </div>

                    {/* 右側: 画像 */}
                    {topic.imageUrl && (
                      <div className="relative w-full md:w-1/3 h-40 md:h-auto overflow-hidden">
                        {' '}
                        {/* 高さを少し調整 */}
                        <Image
                          src={topic.imageUrl}
                          alt=""
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 ease-in-out group-hover:scale-105 md:scale-100" // モバイルでの拡大は維持、PCでは拡大しない
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* もっと見るリンク (記事が6件以上ある場合) */}
            {categoryTopics.length > 5 && (
              <div className="mt-8 text-center">
                {' '}
                {/* 上マージン追加 */}
                <Link
                  href={`/topics/category/${category.slug}`}
                  className={`text-base font-semibold ${styles?.text?.replace('text-', 'hover:text-').replace('800', '600')} transition-colors`}
                >
                  {category.name}の記事をもっと見る &rarr;
                </Link>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default TopicSections;
