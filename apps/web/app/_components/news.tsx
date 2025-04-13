'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import { motion } from 'framer-motion';
import Container from '~/components/custom/container';
import type { News } from '~/types/news';

/**
 * お知らせセクションのプロパティ
 */
interface NewsSectionProps {
  latestNews: News[];
  featuredNews?: News[];
}

/**
 * ホームページのお知らせセクション
 * データベースから取得した最新記事を表示
 */
export default function NewsSection({
  latestNews,
  featuredNews,
}: NewsSectionProps) {
  // 表示用の記事データ（最大4件）
  const displayNews = latestNews.slice(0, 4);

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

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // 表示するものがなければセクションを表示しない
  if (displayNews.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <Container>
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold">お知らせ</h2>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Link
                href="/news"
                className="text-primary hover:text-primary/90 flex items-center transition-colors"
              >
                一覧を見る <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="overflow-hidden"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="divide-y divide-gray-200">
              {displayNews.map((news) => (
                <motion.div
                  key={news.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                  variants={item}
                  whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.7)' }}
                >
                  <Link
                    href={`/news/${news.slug}`}
                    className="flex flex-col md:flex-row md:items-center gap-2"
                  >
                    <span className="text-gray-500 md:w-32">
                      {format(parseISO(news.published_at || ''), 'yyyy.MM.dd', {
                        locale: ja,
                      })}
                    </span>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md md:w-28 inline-block text-center">
                      {news.category?.name || '未分類'}
                    </span>
                    <span className="font-medium">{news.title}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
