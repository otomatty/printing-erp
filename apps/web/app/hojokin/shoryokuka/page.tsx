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
  name: '中小企業省力化投資補助金',
  officialName: '中小企業省力化投資補助金',
  officialUrl: 'https://shoryokuka.smrj.go.jp/', // 仮の公式URL
  summary:
    '人手不足に悩む中小企業等に対し、IoTやロボット等の汎用製品の導入を支援し、企業の生産性向上を図る補助金です。カタログに掲載された製品の導入が基本ですが、オーダーメイドのシステム開発も対象となる可能性があります（要確認）。',
  targetAudience: [
    '人手不足の状態にある中小企業・小規模事業者等',
    '（業種や事業内容による特定の制限は少ない傾向）',
  ],
  targetExpenses: [
    '補助金事務局のカタログに掲載された省力化製品（IoT、ロボット等）の導入費用',
    '導入に関連する設置費用や運搬費など',
    'オーダーメイドのシステム開発費用（カタログ製品と連携する場合など、要件や可否を事務局に確認）',
  ],
  subsidyAmount: {
    generalFrame: {
      name: '一般枠（仮）', // 正式な枠名称は要確認
      employeeScale: [
        { scale: '5人以下', amount: '〜200万円 (300万円)' }, // 補助上限額は仮
        { scale: '6〜20人', amount: '〜500万円 (750万円)' },
        { scale: '21人以上', amount: '〜1,000万円 (1,500万円)' },
      ],
      rate: '1/2',
      note: '（）内は大幅な賃上げを行う場合の補助上限額。補助率は一律1/2。',
    },
  },
  applicationFlow: [
    '公募開始',
    'GビズIDプライムアカウント取得',
    '省力化診断・省力化計画の策定',
    '販売事業者との共同申請（カタログ製品の場合）',
    '交付申請（電子申請）',
    '審査・採択発表',
    '交付決定・契約',
    '補助事業実施（製品導入・支払い）',
    '実績報告',
    '確定検査・補助金額確定',
    '補助金請求・受領',
  ],
  scheduleExample: '年間を通じて複数回の公募が予定されています。',
  points: [
    'カタログに掲載された製品の導入が原則です。',
    '販売事業者や省力化診断を行う支援機関との連携が必要です。',
    '明確な省力化効果（生産性向上）を示す事業計画が重要です。',
    'オーダーメイド開発が対象となるかは、事前に事務局への確認が推奨されます。',
  ],
};
// --- 仮の補助金データここまで ---

export const metadata = {
  title: `${subsidyData.name} | 補助金活用 | ニイヌマ企画印刷`,
  description: `人手不足解消に貢献する${subsidyData.name}の詳細。対象者、補助額、申請方法を解説。`,
};

export default function ShoryokukaSubsidyPage() {
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
              {subsidyData.officialName} 公式サイト
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
            ※詳細な従業員数や資本金の要件は最新の公募要領をご確認ください。
          </p>
        </section>

        {/* --- 対象となる開発・経費 --- */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">対象となる開発・経費</h2>
          <p className="mb-4">
            主に以下の経費が対象となります。スクラッチ開発の可否は要件確認が必要です。
          </p>
          <ul className="list-disc list-inside space-y-1">
            {subsidyData.targetExpenses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            ※補助対象外となる経費もあります。必ず公募要領をご確認ください。
          </p>
        </section>

        {/* --- 補助金額と補助率 --- */}
        <section className="mb-12 p-6 bg-blue-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">
            補助金額と補助率
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
                {subsidyData.subsidyAmount.generalFrame.employeeScale.map(
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
            補助率: {subsidyData.subsidyAmount.generalFrame.rate}
          </p>
          <p className="mt-2 text-sm text-blue-700">
            ※{subsidyData.subsidyAmount.generalFrame.note}
          </p>
          <p className="mt-4 text-sm text-gray-600">
            ※賃上げ目標達成度により補助上限額が変動します。最新情報をご確認ください。
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
            ※公募期間は限られています。計画策定や連携事業者との調整に時間が必要なため、早めの準備が重要です。
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
            {subsidyData.officialName} 公式サイト
            <ExternalLink className="inline-block w-5 h-5 ml-2" />
          </Link>

          {/* TODO: 実際のCtaSectionコンポーネントに置き換える */}
          <div className="mt-12 bg-gray-100 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">
              補助金申請・システム開発のご相談
            </h3>
            <p className="mb-6 text-lg">
              省力化投資補助金の活用や、貴社の課題に合わせたシステム開発について、お気軽にご相談ください。
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
