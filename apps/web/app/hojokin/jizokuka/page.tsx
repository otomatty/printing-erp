import React from 'react';
import Link from 'next/link';
import PageHero from '~/components/custom/page-hero';
import Container from '~/components/custom/container';
import { Alert, AlertDescription, AlertTitle } from '@kit/ui/alert';
import { ExternalLink } from 'lucide-react';

// TODO: CtaSectionコンポーネントが存在すればインポート
// import CtaSection from '@/components/CtaSection';

// --- 仮の補助金データ (2024年7月情報ベース) ---
// !! 注意: このデータは古くなっている可能性があります !!
// !! 実際の公開前には必ず最新情報を確認・更新してください !!
const subsidyData = {
  name: '小規模事業者持続化補助金',
  officialName: '小規模事業者持続化補助金',
  officialUrl: 'https://s23.jizokukahojokin.info/', // 仮のURL (商工会議所地区の例)
  summary:
    '小規模事業者が持続的な経営に向けて、商工会・商工会議所の支援を受けながら販路開拓や業務効率化に取り組む費用の一部を支援する補助金です。Webサイト関連費や、小規模なシステム開発費も対象となる場合があります。',
  targetAudience: [
    '常時使用する従業員数が少ない小規模事業者（商業・サービス業（宿泊・娯楽除く）: 5人以下、宿泊・娯楽業: 20人以下、製造業その他: 20人以下）',
    '特定の要件を満たす特定非営利活動法人',
  ],
  targetExpenses: [
    '機械装置等費',
    '広報費（チラシ作成、広告掲載など）',
    'ウェブサイト関連費（Webサイト制作、改修、Web広告、SEO対策など。補助対象経費総額の1/4上限）',
    '展示会等出展費',
    '旅費',
    '開発費（新商品の試作開発費など）',
    '資料購入費',
    '雑役務費',
    '借料',
    '設備処分費',
    '委託・外注費（業務効率化のためのシステム開発外注など）',
  ],
  subsidyAmount: {
    regularFrame: {
      name: '通常枠',
      amount: '〜50万円',
      rate: '2/3',
      note: '',
    },
    specialFrames: [
      {
        name: '賃金引上げ枠',
        amount: '〜200万円',
        rate: '2/3 (赤字事業者は3/4)',
      },
      { name: '卒業枠', amount: '〜200万円', rate: '2/3' },
      { name: '後継者支援枠', amount: '〜200万円', rate: '2/3' },
      { name: '創業枠', amount: '〜200万円', rate: '2/3' },
    ],
    invoiceFrame: {
      name: 'インボイス特例',
      amount: '上記各枠の上限に+50万円',
      rate: '同上',
      note: '免税事業者からインボイス発行事業者に転換する場合',
    },
  },
  applicationFlow: [
    '公募開始',
    'GビズIDプライムアカウント取得',
    '経営計画書・補助事業計画書の作成',
    '地域の商工会・商工会議所で「事業支援計画書」の作成・交付依頼',
    '電子申請（または郵送申請）',
    '審査・採択発表',
    '交付決定',
    '補助事業実施',
    '実績報告',
    '確定検査・補助金額確定',
    '補助金請求・受領',
    '事業効果および賃金引上げ等状況報告（該当者のみ）',
  ],
  scheduleExample:
    '年間を通じて複数回の公募が行われます。申請締切から採択発表まで2〜3ヶ月程度かかることが多いです。',
  points: [
    '地域の商工会・商工会議所との連携が必須です。早めに相談しましょう。',
    '経営計画書と補助事業計画書の具体性が重要です。',
    '販路開拓や業務効率化への具体的な取り組みと効果を示す必要があります。',
    'ウェブサイト関連費は補助対象経費総額の1/4が上限です。',
    '申請する枠（通常枠、特別枠）の要件を確認しましょう。',
  ],
};
// --- 仮の補助金データここまで ---

export const metadata = {
  title: `${subsidyData.name} | 補助金活用 | ニイヌマ企画印刷`,
  description: `小規模事業者の販路開拓や業務効率化を支援する${subsidyData.name}の詳細。対象経費や申請の流れを解説。`,
};

export default function JizokukaSubsidyPage() {
  return (
    <div>
      <PageHero title={subsidyData.name} subtitle="補助金詳細" />

      <Container className="py-12">
        {/* --- 最新情報の確認喚起 --- */}
        <Alert variant="destructive" className="mb-12 bg-red-50 border-red-200">
          <AlertTitle className="font-bold text-red-800">
            【重要】必ず最新情報をご確認ください
          </AlertTitle>
          <AlertDescription className="text-red-700">
            補助金の内容は頻繁に変更されます。申請をご検討の際は、必ずご自身の地域の
            <Link
              href={subsidyData.officialUrl} // TODO: 商工会議所地区と商工会地区でURLが異なる場合があるため注意
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-red-900 font-medium"
            >
              {subsidyData.officialName} 公式サイト
              <ExternalLink className="inline-block w-4 h-4 ml-1" />
            </Link>
            や、管轄の商工会・商工会議所のウェブサイトで最新の公募要領をご確認ください。本ページの情報は参考情報です。（本情報は
            {new Date().getFullYear()}年{new Date().getMonth() + 1}
            月時点のものです）
          </AlertDescription>
        </Alert>

        {/* --- 概要 --- */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">この補助金について</h2>
          <p className="text-lg leading-relaxed">{subsidyData.summary}</p>
        </section>

        {/* --- 対象となる方 --- */}
        <section className="mb-12 p-6 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">対象となる方</h2>
          <ul className="list-disc list-inside space-y-1">
            {subsidyData.targetAudience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            ※業種によって従業員数の要件が異なります。詳細は公募要領をご確認ください。
          </p>
        </section>

        {/* --- 対象となる開発・経費 --- */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">対象となる開発・経費</h2>
          <p className="mb-4">
            販路開拓や業務効率化に関する幅広い経費が対象です。Webサイト制作や小規模なシステム開発の外注費も含まれる可能性があります。
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 list-disc list-inside">
            {subsidyData.targetExpenses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            ※「ウェブサイト関連費」は補助対象経費総額の1/4が上限です。対象外経費もありますので、詳細は公募要領をご確認ください。
          </p>
        </section>

        {/* --- 補助金額と補助率 --- */}
        <section className="mb-12 p-6 bg-blue-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">
            補助金額と補助率
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">
                {subsidyData.subsidyAmount.regularFrame.name}
              </h3>
              <p>補助上限: {subsidyData.subsidyAmount.regularFrame.amount}</p>
              <p>補助率: {subsidyData.subsidyAmount.regularFrame.rate}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">特別枠</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                {subsidyData.subsidyAmount.specialFrames.map((frame) => (
                  <p key={frame.name}>
                    <strong>{frame.name}:</strong> 上限 {frame.amount} (補助率{' '}
                    {frame.rate})
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">
                {subsidyData.subsidyAmount.invoiceFrame.name}
              </h3>
              <p>{subsidyData.subsidyAmount.invoiceFrame.note}</p>
              <p>
                補助上限: 各枠の上限額に<strong>+50万円</strong>
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            ※申請する枠や要件によって補助上限額・補助率が異なります。最新情報をご確認ください。
          </p>
        </section>

        {/* --- 申請の流れとスケジュール --- */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            申請の流れとスケジュール
          </h2>
          <ol className="list-decimal list-inside space-y-2 border p-4 rounded bg-gray-50">
            {subsidyData.applicationFlow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-4">{subsidyData.scheduleExample}</p>
          <p className="mt-4 text-sm text-gray-600">
            ※「事業支援計画書」の交付には時間がかかる場合があります。締切に余裕をもって、早めに商工会・商工会議所に相談しましょう。
          </p>
        </section>

        {/* --- 申請のポイント・注意点 --- */}
        <section className="mb-12 p-6 bg-yellow-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-800">
            申請のポイント・注意点
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {subsidyData.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        {/* --- 公式情報・相談 --- */}
        <section className="text-center border-t pt-12 mt-12">
          <h2 className="text-xl font-semibold mb-4">
            詳細・最新情報は公式サイト・商工会/会議所へ
          </h2>
          <Link
            href={subsidyData.officialUrl} // TODO: 正しいURLか要確認
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 mb-4"
          >
            {subsidyData.officialName} 公式サイト（例）
            <ExternalLink className="inline-block w-5 h-5 ml-2" />
          </Link>
          <p className="mb-6 text-gray-600">
            申請にあたっては、まず貴社の所在地を管轄する
            <br className="sm:hidden" />
            商工会・商工会議所にご相談ください。
          </p>

          {/* TODO: 実際のCtaSectionコンポーネントに置き換える */}
          <div className="mt-12 bg-gray-100 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">
              補助金活用・Webサイト制作のご相談
            </h3>
            <p className="mb-6 text-lg">
              持続化補助金を活用したWebサイト制作や業務効率化について、ニイヌマ企画印刷がお手伝いします。
            </p>
            <Link
              href="/contact" // TODO: 正しい問い合わせページパスに修正
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              無料で相談する
            </Link>
          </div>
          {/* <CtaSection /> */}
        </section>
      </Container>
    </div>
  );
}
