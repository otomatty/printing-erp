import Link from 'next/link';
import PageHero from '~/components/custom/page-hero';
import Container from '~/components/custom/container';
import TopicSections from './_components/topic-list-client';
import { RecommendedTopicsCarousel } from './_components/recommended-topics-carousel';

// カテゴリ定義
const categories = [
  { slug: 'all', name: 'すべて' },
  { slug: 'dx', name: 'DX・IT' },
  { slug: 'printing', name: '印刷' },
  // 必要に応じてカテゴリを追加
];

// 今後、記事ページを追加するたびに手動でここに追加します
export const topics = [
  {
    slug: 'hojokin-scratch-dev',
    title: '補助金活用によるスクラッチ開発', // タイトルも実態に合わせて更新
    date: '2025-04-04', // 仮の日付
    excerpt: '各種補助金を活用したオーダーメイド開発について解説します。', // 抜粋も実態に合わせて更新
    imageUrl: '/images/topics/hojokin-thumbnail.webp', // 仮の画像パス
    tags: ['補助金', 'スクラッチ開発', 'DX'],
    category: 'dx', // カテゴリ設定
  },
  // { slug: "another-topic", title: "別のトピック", ... },
  {
    slug: 'offset-printing-guide',
    title: '高品質な印刷を実現するオフセット印刷',
    date: '2024-08-15',
    excerpt: 'オフセット印刷の仕組みやメリット、活用事例について解説します。',
    imageUrl: '/images/topics/offset-printing.webp', // 仮のパス
    tags: ['印刷技術', '品質'],
    category: 'printing',
  },
  {
    slug: 'web-design-trends',
    title: '2024年後半のWebデザイントレンド',
    date: '2024-09-01',
    excerpt:
      '最新のWebデザイントレンドを取り入れて、魅力的なサイトを構築しましょう。',
    imageUrl: '/images/topics/web-design.webp', // 仮のパス
    tags: ['Webデザイン', 'トレンド'],
    category: 'dx',
  },
  {
    slug: 'flyer-design-tips',
    title: '効果的なチラシデザインのコツ',
    date: '2024-07-30',
    excerpt: 'ターゲットに響くチラシデザインのポイントを解説します。',
    imageUrl: '/images/topics/flyer-design.webp', // 仮のパス
    tags: ['デザイン', '販促'],
    category: 'printing',
  },
];

export const metadata = {
  title: '特集 | ニイヌマ企画印刷',
  description:
    'ニイヌマ企画印刷がお届けする、DX・IT、印刷に関する特集記事一覧です。', // description更新
};

export default function TopicsPage() {
  const recommendedTopics = [...topics]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        title="特集"
        subtitle="ニイヌマ企画印刷がお届けする、印刷、IT・デジタルなどビジネスのヒントになる特集記事一覧です。"
      />

      <Container className="py-16">
        {/* --- おすすめ記事カルーセル (コンテナ幅いっぱい) --- */}
        <RecommendedTopicsCarousel topics={recommendedTopics} />

        {/* --- 2カラムレイアウト (カテゴリ別記事とバナー) --- */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          {/* --- 左カラム (カテゴリ別記事) --- */}
          <div className="lg:col-span-8">
            {/* TopicSectionsコンポーネントを呼び出し */}
            <TopicSections topics={topics} categories={categories} />
          </div>

          {/* --- 右カラム (サンプルバナー) --- */}
          <aside className="lg:col-span-4 mt-12 lg:mt-0">
            {/* stickyを削除し、直接space-y-8を適用 */}
            <div className="space-y-8">
              {/* サンプルバナー 1 */}
              <Link href="/services/printing" className="block group">
                <section className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="p-6 text-center">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      高品質な印刷サービス
                    </h3>
                    <p className="text-sm text-gray-600">
                      チラシ・パンフレットから特殊印刷まで
                    </p>
                  </div>
                </section>
              </Link>

              {/* サンプルバナー 2 */}
              <Link href="/contact" className="block group">
                <section className="border border-green-300 rounded-lg p-6 text-center hover:bg-green-50 transition-colors duration-300">
                  <h3 className="font-semibold text-lg text-green-800 mb-2">
                    お見積もり・ご相談
                  </h3>
                  <p className="text-sm text-green-700">
                    お気軽にお問い合わせください
                  </p>
                </section>
              </Link>
            </div>
          </aside>
        </div>

        {/* --- DX推進バナー (変更なし、ページ下部) --- */}
        <div className="mt-16">
          <Link href="/hojokin" className="block group">
            <section className="bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out py-10 px-6 rounded-xl shadow-lg">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">
                  【特集】DX推進のための補助金活用
                </h2>
                <p className="text-base md:text-lg text-indigo-100 group-hover:text-white transition-colors duration-300">
                  業務効率化、新サービス開発、競争力強化へ。DX実現に役立つ補助金の詳細はこちら
                  &rarr;
                </p>
              </div>
            </section>
          </Link>
        </div>
      </Container>
    </div>
  );
}
