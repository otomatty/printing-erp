'use client';

import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import { motion } from 'framer-motion';
import type { News, NewsCategory } from '~/types/news';
import Container from '~/components/custom/container';

/**
 * お知らせ一覧コンポーネントのプロパティ
 */
interface NewsListProps {
  news: News[];
  total: number;
  currentPage: number;
  categories: NewsCategory[];
  currentCategory?: string;
}

/**
 * 1ページあたりの表示件数
 */
const ITEMS_PER_PAGE = 10;

/**
 * お知らせ一覧コンポーネント
 */
export default function NewsList({
  news,
  total,
  currentPage,
  categories,
  currentCategory,
}: NewsListProps) {
  // 総ページ数
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // アニメーション設定
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // カテゴリフィルターのURL生成
  const getCategoryUrl = (slug?: string) => {
    if (!slug) return '/news';
    return `/news?categorySlug=${slug}`;
  };

  // ページネーションのURL生成
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (currentCategory) {
      params.set('categorySlug', currentCategory);
    }
    params.set('page', page.toString());
    return `/news?${params.toString()}`;
  };

  return (
    <section className="py-16">
      <Container>
        {/* カテゴリフィルター */}
        {categories.length > 0 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-bold mb-3">カテゴリで絞り込む</h2>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/news"
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  !currentCategory
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                すべて
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={getCategoryUrl(category.slug)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    currentCategory === category.slug
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* お知らせがない場合 */}
        {news.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            お知らせが見つかりませんでした。
          </div>
        ) : (
          <>
            {/* お知らせ一覧 */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mb-10"
            >
              <div className="rounded-lg overflow-hidden border border-gray-200 divide-y divide-gray-200">
                {news.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemAnimation}
                    className="bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Link
                      href={`/news/${item.slug}`}
                      className="block p-4 md:p-6"
                    >
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4 mb-2">
                        <span className="text-gray-500 text-sm">
                          {format(
                            parseISO(item.published_at || ''),
                            'yyyy年MM月dd日',
                            {
                              locale: ja,
                            }
                          )}
                        </span>
                        {item.category && (
                          <span className="inline-block bg-gray-100 text-primary text-xs px-3 py-1 rounded-full">
                            {item.category.name}
                          </span>
                        )}
                        {item.is_featured && (
                          <span className="inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full">
                            特集
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                        {item.title}
                      </h3>
                      {item.summary && (
                        <p className="text-gray-600 line-clamp-2">
                          {item.summary}
                        </p>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ページネーション */}
            {totalPages > 1 && (
              <motion.div
                className="flex justify-center gap-2 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Link
                      key={page}
                      href={getPageUrl(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-md ${
                        currentPage === page
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </Link>
                  )
                )}
              </motion.div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
