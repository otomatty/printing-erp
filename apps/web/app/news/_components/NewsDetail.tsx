import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import type { News } from '~/types/news';
import parse from 'html-react-parser';

/**
 * お知らせ詳細ページのプロパティ
 */
type NewsDetailProps = {
  news: News;
  relatedNews: News[];
};

/**
 * お知らせ詳細ページのコンポーネント
 * データベースから取得した記事データを表示する
 */
export default function NewsDetail({ news, relatedNews }: NewsDetailProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* ニュース詳細 */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gray-500 text-sm">
                {format(parseISO(news.published_at || ''), 'yyyy年MM月dd日', {
                  locale: ja,
                })}
              </span>
              {news.category && (
                <span className="bg-gray-100 text-primary text-xs px-3 py-1 rounded-full">
                  {news.category.name}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              {news.title}
            </h1>

            {/* 記事内容 - HTMLとして表示 */}
            <div className="prose max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-p:text-gray-600 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800">
              {parse(news.content)}
            </div>

            {/* 添付ファイルがある場合は表示 */}
            {news.attachments && news.attachments.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3">添付ファイル</h3>
                <ul className="space-y-2">
                  {news.attachments.map((attachment) => (
                    <li key={attachment.id}>
                      <Link
                        href={`/api/news/attachment/${attachment.id}`}
                        className="inline-flex items-center text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 mr-1"
                          aria-hidden="true"
                        >
                          <title>添付ファイル</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg>
                        {attachment.file_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ニュース一覧に戻るリンク */}
          <div className="flex justify-center mb-12">
            <Link
              href="/news"
              className="inline-flex items-center px-5 py-2 border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              ニュース一覧に戻る
            </Link>
          </div>

          {/* 関連ニュース */}
          {relatedNews.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                最新のお知らせ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNews.map((item) => (
                  <Link
                    href={`/news/${item.slug}`}
                    key={item.id}
                    className="block bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-500 text-xs">
                        {format(
                          parseISO(item.published_at || ''),
                          'yyyy年MM月dd日',
                          {
                            locale: ja,
                          }
                        )}
                      </span>
                      {item.category && (
                        <span className="bg-gray-100 text-primary text-xs px-2 py-0.5 rounded-full">
                          {item.category.name}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {item.summary || item.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
