import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation'; // notFoundをインポート
import PageHero from '~/components/custom/page-hero';
import Container from '~/components/custom/container';

// --- データ定義 (topics/page.tsxからコピー/共有化が必要) ---
// 本来はこれらのデータは共有の場所(例: lib/topics.ts)に定義するのが望ましい
const categories = [
  { slug: 'all', name: 'すべて' },
  { slug: 'dx', name: 'DX・IT' },
  { slug: 'printing', name: '印刷' },
];

const topics = [
  {
    slug: 'hojokin-scratch-dev',
    title: '補助金活用によるスクラッチ開発',
    date: '2025-04-04',
    excerpt: '各種補助金を活用したオーダーメイド開発について解説します。',
    imageUrl: '/images/topics/hojokin-thumbnail.webp',
    tags: ['補助金', 'スクラッチ開発', 'DX'],
    category: 'dx',
  },
  // ... 他の記事
];
// --- データ定義ここまで ---

// 日付フォーマット関数
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

// generateStaticParams: ビルド時に静的なパスを生成する (任意だが推奨)
export async function generateStaticParams() {
  // 'all'を除いたカテゴリのスラッグを返す
  return categories
    .filter((cat) => cat.slug !== 'all')
    .map((category) => ({
      categorySlug: category.slug,
    }));
}

// generateMetadata: 動的にメタデータを生成
export async function generateMetadata({
  params,
}: { params: Promise<{ categorySlug: string }> }) {
  const resolvedParams = await params; // await で解決する
  const category = categories.find(
    (cat) => cat.slug === resolvedParams.categorySlug
  ); // 解決した値を使う
  if (!category) {
    return { title: 'カテゴリが見つかりません' };
  }
  return {
    title: `${category.name} | 特集 | ニイヌマ企画印刷`,
    description: `ニイヌマ企画印刷がお届けする「${category.name}」カテゴリの特集記事一覧です。`,
  };
}

// ページコンポーネントのProps型を定義
type Props = {
  params: Promise<{ categorySlug: string }>; // Promise
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>; // こっちもPromiseにする
};

// ページコンポーネント
export default async function TopicCategoryPage({ params }: Props) {
  // searchParamsが必要なら { params, searchParams } と受け取る
  const resolvedParams = await params; // paramsをawaitで解決する
  const { categorySlug } = resolvedParams; // 解決したオブジェクトから取得

  // カテゴリ情報を取得
  const category = categories.find((cat) => cat.slug === categorySlug);

  // 該当カテゴリの記事をフィルタリング
  const categoryTopics = topics.filter(
    (topic) => topic.category === categorySlug
  );

  // カテゴリが見つからないか、'all'の場合は404
  if (!category || category.slug === 'all') {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* カテゴリ名をPageHeroに表示 */}
      <PageHero title={category.name} subtitle="カテゴリ別 特集記事一覧" />

      <Container className="py-16">
        {categoryTopics.length > 0 ? (
          <div className="space-y-10">
            {categoryTopics.map((topic) => (
              // メディア形式で記事を表示 (TopicSectionsと同様)
              <article
                key={topic.slug}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col md:flex-row group"
              >
                {/* 左側: テキスト情報 */}
                <div className="p-6 flex flex-col flex-grow md:w-2/3">
                  {topic.tags && topic.tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {topic.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-indigo-500 text-white rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link href={`/topics/${topic.slug}`} className="block mb-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
                      {topic.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-3">
                    {formatDate(topic.date)}
                  </p>
                  <p className="text-gray-700 mb-4 flex-grow line-clamp-3 md:line-clamp-none">
                    {topic.excerpt}
                  </p>
                  <Link
                    href={`/topics/${topic.slug}`}
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold mt-auto self-start transition-colors duration-200 group"
                  >
                    詳しく見る
                    <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                </div>

                {/* 右側: 画像 */}
                {topic.imageUrl && (
                  <div className="relative w-full md:w-1/3 h-48 md:h-auto overflow-hidden md:rounded-r-lg md:rounded-l-none rounded-b-lg">
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
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">
            このカテゴリの特集記事はまだありません。
          </p>
        )}

        {/* 特集一覧への戻るリンク */}
        <div className="mt-16 text-center">
          <Link
            href="/topics"
            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            &larr; 特集一覧に戻る
          </Link>
        </div>
      </Container>
    </div>
  );
}
