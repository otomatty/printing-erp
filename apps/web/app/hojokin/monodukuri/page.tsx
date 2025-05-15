import React from 'react';
import Link from 'next/link';
import PageHero from '~/components/custom/page-hero';
import Container from '~/components/custom/container';
import { Alert, AlertDescription, AlertTitle } from '@kit/ui/alert'; // 注意喚起用
import { ExternalLink } from 'lucide-react'; // 外部リンクアイコン

// TODO: CtaSectionコンポーネントが存在すればインポート
// import CtaSection from '@/components/CtaSection';

// --- 仮の補助金データ (2024年7月情報ベース) ---
// !! 注意: このデータは古くなっている可能性があります !!
// !! 実際の公開前には必ず最新情報を確認・更新してください !!
const subsidyData = {
  name: 'ものづくり補助金（ものづくり・商業・サービス生産性向上促進補助金）',
  officialName: 'ものづくり・商業・サービス生産性向上促進補助金',
  officialUrl: 'https://portal.monodukuri-hojo.jp/', // 仮のURL
  summary:
    '中小企業・小規模事業者等が取り組む革新的な製品・サービスの開発、生産プロセス等の省力化に必要な設備投資等を支援する補助金です。オーダーメイドのシステム開発も対象となる可能性があります。',
  targetAudience: [
    '中小企業者（製造業、建設業、運輸業、卸売業、サービス業、小売業など）',
    '小規模事業者',
    '特定非営利活動法人',
    '社会福祉法人など',
  ],
  targetExpenses: [
    '機械装置・システム構築費（スクラッチ開発費用を含む）',
    '技術導入費',
    '専門家経費',
    '運搬費',
    'クラウドサービス利用費',
    '原材料費',
    '外注費',
    '知的財産権等関連経費',
  ],
  subsidyAmount: {
    // 申請枠ごとに異なる (例: 省力化オーダーメイド枠)
    orderMadeFrame: {
      name: '省力化（オーダーメイド）枠',
      employeeScale: [
        { scale: '5人以下', amount: '〜1,000万円' }, // 補助上限額は仮
        { scale: '6〜20人', amount: '〜1,500万円' },
        { scale: '21人以上', amount: '〜8,000万円' }, // 大幅賃上げで最大1億円
      ],
      rate: '1/2 (小規模: 2/3)',
      note: '大幅な賃上げを行う場合は補助上限額が増加します。',
    },
    // 他の枠も必要なら追加
  },
  applicationFlow: [
    '公募開始',
    'GビズIDプライムアカウント取得',
    '申請準備（事業計画書作成など）',
    '電子申請',
    '審査・採択発表',
    '交付申請・決定',
    '補助事業実施',
    '実績報告',
    '確定検査・補助金額確定',
    '補助金請求・受領',
    '事業化状況報告',
  ],
  scheduleExample:
    '年間を通じて複数回の公募が行われることが多いです（例：2〜3ヶ月ごと）。',
  points: [
    '革新性・新規性が高い事業計画が求められます。',
    '生産性向上や賃上げ目標の達成が重要視されます。',
    '加点項目（賃上げ、事業継続力強化計画認定など）を意識しましょう。',
    '専門家（認定支援機関など）との連携も有効です。',
  ],
};
// --- 仮の補助金データここまで ---

export const metadata = {
  title: `${subsidyData.name} | 補助金活用 | 印刷会社`,
  description: `${subsidyData.summary}`,
};

export default function MonodukuriSubsidyPage() {
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
            補助金の内容は頻繁に変更されます。申請をご検討の際は、必ず
            <Link
              href={subsidyData.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-red-900 font-medium"
            >
              ものづくり補助金公式サイト
              <ExternalLink className="inline-block w-4 h-4 ml-1" />
            </Link>
            で最新の公募要領をご確認ください。本ページの情報は参考情報であり、最新性を保証するものではありません。（本情報は
            {new Date().getFullYear()}年{new Date().getMonth() + 1}
            月時点のものです）
          </AlertDescription>
        </Alert>

        {/* --- 概要 --- */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">この補助金について</h2>
          <p className="text-lg leading-relaxed">{subsidyData.summary}</p>
          <p className="mt-4">
            貴社の課題解決に最適なオーダーメイドシステムの開発費用を、この補助金で一部カバーできる可能性があります。
          </p>
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
            ※資本金や従業員数などの詳細な要件は、最新の公募要領をご確認ください。
          </p>
        </section>

        {/* --- 対象となる開発・経費 --- */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">対象となる開発・経費</h2>
          <p className="mb-4">
            スクラッチでのシステム開発費用を含む、以下のような経費が対象となり得ます。
          </p>
          <ul className="list-disc list-inside space-y-1">
            {subsidyData.targetExpenses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            ※開発内容が補助金の趣旨（生産性向上など）に合致している必要があります。補助対象外となる経費もありますので、詳細は公募要領をご確認ください。
          </p>
        </section>

        {/* --- 補助金額と補助率 --- */}
        <section className="mb-12 p-6 bg-blue-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">
            補助金額と補助率（省力化オーダーメイド枠の例）
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border p-3">従業員規模</th>
                  <th className="border p-3">補助上限額</th>
                </tr>
              </thead>
              <tbody>
                {subsidyData.subsidyAmount.orderMadeFrame.employeeScale.map(
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
            補助率: {subsidyData.subsidyAmount.orderMadeFrame.rate}
          </p>
          <p className="mt-2 text-sm text-blue-700">
            ※{subsidyData.subsidyAmount.orderMadeFrame.note}
          </p>
          <p className="mt-4 text-sm text-gray-600">
            ※上記は「省力化（オーダーメイド）枠」の一例です。申請する枠や賃上げ目標達成度などにより、補助上限額や補助率は異なります。最新情報を必ずご確認ください。
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
            ※公募期間は限られています。申請準備には時間がかかるため、早めの情報収集と準備をおすすめします。
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
            詳細・最新情報は公式サイトをご確認ください
          </h2>
          <Link
            href={subsidyData.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            ものづくり補助金 公式サイト
            <ExternalLink className="inline-block w-5 h-5 ml-2" />
          </Link>

          {/* TODO: 実際のCtaSectionコンポーネントに置き換える */}
          <div className="mt-12 bg-gray-100 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">
              補助金申請・システム開発のご相談
            </h3>
            <p className="mb-6 text-lg">
              「この補助金は使える？」「どんなシステムが作れる？」など、補助金活用やスクラッチ開発に関するご相談は、印刷会社ください。
            </p>
            <Link
              href="/contact" // TODO: 正しい問い合わせページパスに修正
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              無料で相談する
            </Link>
          </div>
          {/* <CtaSection
            heading="補助金申請・システム開発のご相談"
            description="「この補助金は使える？」「どんなシステムが作れる？」など、補助金活用やスクラッチ開発に関するご相談は、印刷会社ください。"
            buttonText="無料で相談する"
            buttonLink="/contact" // TODO: 正しい問い合わせページパスに修正
          /> */}
        </section>
      </Container>
    </div>
  );
}
