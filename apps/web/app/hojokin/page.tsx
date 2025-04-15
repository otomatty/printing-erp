import Link from 'next/link';
import Container from '~/components/custom/container';
import PageHero from '~/components/custom/page-hero'; // 必要に応じて汎用的なヒーローコンポーネントを使用
import { topics as allTopics } from '../topics/page'; // topicsデータをインポートし、別名をつける
import { CheckCircle, ArrowRight } from 'lucide-react'; // メリット表示用アイコンとArrowRightを追加

// topics配列の要素の型を定義 (topics/page.tsx の内容から推測)
interface Topic {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl?: string; // imageUrlはオプショナルかもしれない
  tags?: string[];
  category?: string;
}

// TODO: 補助金データや事例データは将来的には別ファイルやAPIから取得する
const subsidies = [
  {
    slug: 'jizokuka',
    name: '小規模事業者持続化補助金',
    description:
      '販路開拓や業務効率化の取り組みを支援。Webサイト関連費も対象に。',
    target: '広報費、ウェブサイト関連費、開発費、委託・外注費など',
    link: '/hojokin/jizokuka',
  },
  {
    slug: 'monodukuri',
    name: 'ものづくり補助金',
    description:
      '革新的な製品・サービス開発、生産プロセス省力化の設備投資等を支援。',
    target: '機械装置・システム構築費（スクラッチ開発含む）、技術導入費など',
    link: '/hojokin/monodukuri',
  },
  {
    slug: 'shoryokuka',
    name: '中小企業省力化投資補助金',
    description: '人手不足解消のため、IoTやロボット等の汎用製品導入を支援。',
    target: 'カタログ掲載の省力化製品導入費、関連費用など',
    link: '/hojokin/shoryokuka',
  },
  {
    slug: 'shinjigyo',
    name: '中小企業新事業進出促進補助金（仮称）',
    description:
      '【公募開始前】新市場進出や事業転換など、国内の新事業展開を支援予定。',
    target: '機械装置・システム構築費、広告宣伝費など（見込み）',
    link: '/hojokin/shinjigyo',
  },
];

// --- 仮の活用事例データ (構造化) ---
// 実際の事例に合わせて内容を更新してください
const caseStudies = [
  {
    id: 1,
    category: '製造業', // 例: 業種
    companyName: 'A社', // 例: 企業名（伏せる場合あり）
    title: 'IT導入補助金で生産管理システムを刷新',
    image: '/images/case-studies/sample1.webp', // 仮の画像パス
    challenge: '手書き管理による非効率な生産体制、リードタイムの長さ。',
    solution:
      '生産計画から実績管理までを一元化するカスタムシステムを開発・導入。',
    result: '生産性が30%向上し、リードタイムを2週間短縮。管理コストも削減。',
    detailLink: '/case-studies/manufacturing-a', // 仮の詳細ページリンク
  },
  {
    id: 2,
    category: '小売業',
    companyName: 'B社',
    title: '事業再構築補助金でECと店舗の連携システム構築',
    image: '/images/case-studies/sample2.webp', // 仮の画像パス
    challenge: 'コロナ禍での来店客減少、オンライン販売のノウハウ不足。',
    solution:
      'ECサイトを新規構築し、実店舗の在庫・顧客情報とリアルタイム連携するシステムを導入。',
    result:
      'オンライン売上が200%増加。新たな顧客層を獲得し、在庫管理も効率化。',
    detailLink: '/case-studies/retail-b', // 仮の詳細ページリンク
  },
];

// 関連特集記事をフィルタリング (型を指定)
const relatedTopics: Topic[] = allTopics.filter((topic: Topic) =>
  topic.tags?.includes('補助金')
);

export const metadata = {
  title: '補助金活用支援 | ニイヌマ企画印刷',
  description:
    '各種補助金（持続化・ものづくり・省力化投資・新事業進出(仮)等）を活用したIT導入・DX推進、Webサイト制作などを支援します。申請サポートから開発・導入までお任せください。',
};

// --- メリットリスト ---
const merits = [
  'コスト削減：導入費用や開発費用の負担を大幅に軽減できます。',
  'リスク低減：新しい技術やシステム導入への挑戦を資金面で後押しします。',
  '生産性向上：業務効率化ツールやシステムの導入で競争力を高めます。',
  '事業拡大：新規事業やサービスの展開を加速させるきっかけになります。',
];

// --- サポート内容リスト ---
const supportDetails = [
  '無料相談：お客様の課題や目標に合った補助金をご提案します。',
  '計画策定支援：補助金の要件を満たす事業計画作りをお手伝いします。',
  '申請サポート：複雑な申請書類の作成や手続きをサポートします。',
  '開発・導入：Webサイト制作、システム開発、ITツール導入を実行します。',
  '導入後フォロー：補助金の実績報告やシステムの運用も支援します。',
];

export default function HojokinTopPage() {
  return (
    <div className="bg-white">
      {/* --- 1. ヒーローセクション --- */}
      {/* TODO: 課題提起型のキャッチコピー、共感を呼ぶメッセージ、メインCTAを配置 */}
      <PageHero
        title="IT化・DXのコストにお悩みですか？"
        subtitle="補助金を活用して、賢くビジネスをアップデートしませんか？ニイヌマ企画印刷が最適な補助金選びから申請、導入までトータルサポートします。"
        // TODO: CTAボタンを追加 (例: 無料相談へ)
      />

      <Container className="py-16 space-y-16">
        {/* --- 2. よくある課題の提示セクション --- */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            こんなお悩みありませんか？
          </h2>
          {/* TODO: ターゲットが共感する具体的な課題リストを表示 */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* 例 */}
            <div className="bg-slate-50 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">ITツール導入コスト</h3>
              <p className="text-sm text-gray-600">
                導入したいシステムはあるが、初期費用や月額費用が負担に...
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">DXの進め方</h3>
              <p className="text-sm text-gray-600">
                何から手をつければ良いかわからない。専門知識もない...
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">補助金申請の複雑さ</h3>
              <p className="text-sm text-gray-600">
                種類が多くてどれを使えばいいか不明。申請手続きが難しそう...
              </p>
            </div>
          </div>
        </section>

        {/* --- 3. 補助金活用による解決策の提示セクション --- */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-8 rounded-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            そのお悩み、<span className="text-primary">ニイヌマ企画印刷</span>
            が解決いたしますpt-2 bg-white border border-gray-100 rounded-lg
            shadow-sm p-6 hover:shadow-md transition-shadow duration-300！
          </h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-10">
            国や自治体の補助金制度を活用すれば、IT導入やDX推進にかかるコスト負担を軽減し、事業成長を加速できます。
          </p>
          {/* メリットリストの表示 */}
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto">
            {merits.map((merit) => (
              <div key={merit} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{merit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- 4. 代表的な補助金の紹介セクション --- */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            活用できる補助金の例
          </h2>
          {/* subsidiesデータを使って補助金カードリストを表示 */}
          <div className="grid md:grid-cols-2 gap-8">
            {subsidies.map((subsidy) => (
              <Link
                href={subsidy.link}
                key={subsidy.slug}
                className="block border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-primary transition-all duration-300"
              >
                <h3 className="font-semibold text-xl text-primary mb-3 group-hover:text-primary-hover">
                  {subsidy.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {subsidy.description}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  <span className="font-medium">対象経費例:</span>{' '}
                  {subsidy.target}
                </p>
                <p className="text-sm text-primary group-hover:underline font-medium">
                  詳細を見る &rarr;
                </p>
              </Link>
            ))}
          </div>
          <p className="text-center mt-6 text-sm text-gray-500">
            ※上記は一例です。お客様の状況に合わせて最適な補助金をご提案します。最新情報は各詳細ページや公式サイトをご確認ください。
          </p>
        </section>

        {/* --- 5. 貴社サービスによる具体的な解決プラン提示セクション --- */}
        <section className="bg-slate-100 py-12 px-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            ニイヌマ企画印刷の
            <span className="text-green-600">補助金活用サポート</span>
          </h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-10">
            印刷業で培った課題解決力とIT知識を活かし、補助金活用を前提とした最適なITソリューションをご提案。専門家とも連携し、申請から導入、その後のフォローまでワンストップでサポートします。
          </p>
          {/* サポート内容リストの表示 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {supportDetails.map((detail) => (
              <div
                key={detail}
                className="bg-white p-4 rounded-md shadow-sm border border-gray-200"
              >
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <p className="text-sm font-medium text-gray-700">{detail}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/contact"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              まずは無料で相談する
            </Link>
          </div>
        </section>

        {/* --- 6. 活用事例セクション --- */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            補助金活用事例
          </h2>
          {/* caseStudiesデータを使って事例カードを表示 */}
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
              >
                {/* 事例画像 */}
                {study.image ? (
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full md:w-1/3 h-48 md:h-full object-cover"
                  />
                ) : (
                  <div className="w-full md:w-1/3 h-48 md:h-auto bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                {/* 事例内容 */}
                <div className="p-6 flex flex-col justify-between w-full md:w-2/3">
                  <div>
                    <p className="text-sm font-medium text-primary mb-1">
                      {study.category} {study.companyName}
                    </p>
                    <h3 className="font-semibold text-lg mb-3">
                      {study.title}
                    </h3>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="font-semibold text-gray-700">課題:</dt>
                        <dd className="text-gray-600">{study.challenge}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-gray-700">
                          導入内容:
                        </dt>
                        <dd className="text-gray-600">{study.solution}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-gray-700">成果:</dt>
                        <dd className="font-medium text-green-700">
                          {study.result}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  {/* 詳細リンク */}
                  {study.detailLink && (
                    <div className="mt-4 text-right">
                      <Link
                        href={study.detailLink}
                        className="text-sm text-primary hover:underline inline-flex items-center"
                      >
                        事例詳細を見る
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* 事例一覧ページへのリンク */}
          <div className="text-center mt-10">
            <Link href="/case-studies" className="text-primary hover:underline">
              {' '}
              {/* 仮のパス */}
              その他の活用事例を見る &rarr;
            </Link>
          </div>
        </section>

        {/* --- 7. 関連特集記事セクション --- */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            関連特集記事
          </h2>
          {/* relatedTopicsデータを使って記事カードを表示 */}
          {relatedTopics.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {relatedTopics.map((topic: Topic) => (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="block group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* 画像表示 */}
                  {topic.imageUrl ? (
                    <img
                      src={topic.imageUrl}
                      alt={topic.title}
                      className="w-full h-32 object-cover"
                    />
                  ) : (
                    <div className="aspect-video bg-gray-100" />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-md mb-1 group-hover:text-primary">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">{topic.date}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {topic.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              関連する特集記事はまだありません。
            </p>
          )}
          <div className="text-center mt-8">
            <Link href="/topics" className="text-primary hover:underline">
              特集記事一覧へ &rarr;
            </Link>
          </div>
        </section>

        {/* --- 8. 問い合わせCTAセクション --- */}
        <section className="bg-gradient-to-r from-green-500 to-teal-600 py-12 px-6 rounded-xl text-center shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-4">
            補助金を活用したIT導入・DXをご検討の方へ
          </h2>
          <p className="text-lg text-green-100 mb-6">
            まずはお気軽にご相談ください。貴社に最適なプランをご提案します。
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white hover:bg-gray-100 text-green-700 font-bold py-3 px-10 rounded-lg transition-colors text-lg"
          >
            無料相談・お問い合わせ
          </Link>
        </section>
      </Container>
    </div>
  );
}
