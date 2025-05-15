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
  name: '中小企業新事業進出促進補助金（仮称）', // 正式名称は未定の可能性
  officialName: '中小企業新事業進出促進補助金（仮称）',
  officialUrl: '#', // まだ公式サイトがない or 不明
  summary:
    '事業再構築補助金の後継とされ、中小企業の国内市場における新事業展開や事業転換を支援する補助金です。新事業に必要なシステム開発費用も対象となる可能性がありますが、詳細は公募開始後に確定します。',
  targetAudience: [
    '新市場への進出、事業転換、国内回帰などに取り組む中小企業等',
    '（事業再構築補助金の要件を踏襲する可能性あり）',
  ],
  targetExpenses: [
    '建物費、機械装置・システム構築費（新事業向けスクラッチ開発費用を含む可能性）',
    '技術導入費、専門家経費',
    '広告宣伝・販売促進費など',
    '（対象経費の詳細は公募要領で確定）',
  ],
  subsidyAmount: {
    growthFrame: {
      // 枠名称は仮
      name: '成長枠（仮）',
      employeeScale: [
        { scale: '20人以下', amount: '〜2,000万円' }, // 補助上限額は全て仮
        { scale: '21～50人', amount: '〜4,000万円' },
        { scale: '51人以上', amount: '〜7,000万円' },
      ],
      rate: '1/2 (中小), 2/3 (中堅)', // 補助率も仮
      note: '卒業促進や賃上げで上限額引き上げの可能性。',
    },
    // 他の枠（供給力確保枠など）も設定される可能性あり
  },
  applicationFlow: [
    '公募開始（時期未定）',
    'GビズIDプライムアカウント取得',
    '認定支援機関との事業計画策定',
    '交付申請（電子申請）',
    '審査・採択発表',
    '交付決定',
    '補助事業実施',
    '実績報告',
    '補助金受領',
  ],
  scheduleExample:
    '2024年度中に公募開始予定とされていますが、具体的な時期は未定です。',
  points: [
    '事業再構築補助金からの変更点に注意が必要です。',
    '認定経営革新等支援機関との連携が必須となる見込みです。',
    '付加価値額の増加など、具体的な成長目標を示す計画が重要です。',
    '新事業の市場性や実現可能性を明確に示す必要があります。',
  ],
};
// --- 仮の補助金データここまで ---

export const metadata = {
  title: `${subsidyData.name} | 補助金活用 | 印刷会社`,
  description: `新事業展開を支援する${subsidyData.name}（事業再構築補助金後継）の詳細。対象、要件、申請見込み。`,
};

export default function ShinjigyoSubsidyPage() {
  return (
    <div>
      <PageHero title={subsidyData.name} subtitle="補助金詳細" />

      <Container className="py-12">
        {/* --- 最新情報の確認喚起 --- */}
        <Alert variant="destructive" className="mb-12 bg-red-50 border-red-200">
          <AlertTitle className="font-bold text-red-800">
            【重要】公募開始前・情報は不確定です
          </AlertTitle>
          <AlertDescription className="text-red-700">
            この補助金は事業再構築補助金の後継として予定されていますが、
            {new Date().getFullYear()}年{new Date().getMonth() + 1}
            月現在、公募は開始されておらず、詳細情報は未確定です。
            <br />
            最新情報は経済産業省や中小企業庁の発表をご確認ください。
            {subsidyData.officialUrl !== '#' && (
              <>
                <br />
                <Link
                  href={subsidyData.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-red-900 font-medium"
                >
                  関連情報ページ（仮）
                  <ExternalLink className="inline-block w-4 h-4 ml-1" />
                </Link>
              </>
            )}
          </AlertDescription>
        </Alert>

        {/* --- 概要 --- */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            この補助金について（予定）
          </h2>
          <p className="text-lg leading-relaxed">{subsidyData.summary}</p>
        </section>

        {/* --- 対象となる方（見込み） --- */}
        <section className="mb-12 p-6 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            対象となる方（見込み）
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {subsidyData.targetAudience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            ※公募開始時に正式な要件が発表されます。
          </p>
        </section>

        {/* --- 対象となる開発・経費（見込み） --- */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            対象となる開発・経費（見込み）
          </h2>
          <p className="mb-4">
            新事業に必要な以下の経費が対象となる可能性があります。
          </p>
          <ul className="list-disc list-inside space-y-1">
            {subsidyData.targetExpenses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            ※対象経費の詳細は公募要領で確定します。
          </p>
        </section>

        {/* --- 補助金額と補助率（見込み） --- */}
        <section className="mb-12 p-6 bg-blue-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">
            補助金額と補助率（成長枠の見込み例）
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border p-3">従業員規模</th>
                  <th className="border p-3">補助上限額（見込み）</th>
                </tr>
              </thead>
              <tbody>
                {subsidyData.subsidyAmount.growthFrame.employeeScale.map(
                  (item) => (
                    <tr key={item.scale} className="hover:bg-blue-100/50">
                      <td className="border p-3">{item.scale}</td>
                      <td className="border p-3">{item.amount}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-semibold">
            補助率（見込み）: {subsidyData.subsidyAmount.growthFrame.rate}
          </p>
          <p className="mt-2 text-sm text-blue-700">
            ※{subsidyData.subsidyAmount.growthFrame.note}
          </p>
          <p className="mt-4 text-sm text-gray-600">
            ※上記はあくまで見込み情報です。公募開始時に正式な情報が発表されます。
          </p>
        </section>

        {/* --- 申請の流れとスケジュール（見込み） --- */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            申請の流れとスケジュール（見込み）
          </h2>
          <ol className="list-decimal list-inside space-y-2 border p-4 rounded bg-gray-50">
            {subsidyData.applicationFlow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-4 font-bold text-orange-600">
            {subsidyData.scheduleExample}
          </p>
          <p className="mt-4 text-sm text-gray-600">
            ※最新情報は経済産業省等の発表を注視してください。
          </p>
        </section>

        {/* --- 申請のポイント・注意点（見込み） --- */}
        <section className="mb-12 p-6 bg-yellow-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-800">
            申請のポイント・注意点（見込み）
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
            詳細情報は公募開始後に発表されます
          </h2>
          <p className="mb-6 text-gray-600">
            現時点では詳細未定のため、公式サイト等のリンクはありません。
            <br />
            公募開始が近づきましたら、経済産業省や中小企業庁のホームページをご確認ください。
          </p>

          {/* TODO: 実際のCtaSectionコンポーネントに置き換える */}
          <div className="mt-12 bg-gray-100 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">
              新事業展開・補助金活用のご相談
            </h3>
            <p className="mb-6 text-lg">
              新事業のためのシステム開発や、補助金の最新情報について、印刷会社ください。
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
