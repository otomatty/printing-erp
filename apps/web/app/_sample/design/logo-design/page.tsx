import React from 'react';
import PageHero from '~/components/custom/page-hero';
import type { Metadata } from 'next';

// 共通コンポーネント
import DeliveryInfo from '@/components/services/DeliveryInfo';
import SubmissionGuide from '@/components/services/SubmissionGuide';
import OrderFlow from '@/components/services/OrderFlow';
// import Faq from "@/components/services/Faq";
import RelatedServices from '@/components/services/RelatedServices';
// import EnhancedCTA from "@/components/services/EnhancedCTA";

// このページ固有のコンポーネント (今後作成)
import ServiceIntroduction from './_components/ServiceIntroduction';
import LogoConcepts from './_components/LogoConcepts'; // 例: ロゴタイプの種類、コンセプトメイキング
import Portfolio from './_components/Portfolio'; // 制作実績

// このページ固有のFAQデータ
const logoDesignFaqData = [
  {
    question: 'ロゴデザインにはどのくらいの期間がかかりますか？',
    answer: (
      <p>
        ヒアリングから初回デザイン案のご提案まで〇週間程度、修正や調整を含めて最終納品までは〇～〇週間程度が目安となります。お急ぎの場合はご相談ください。
        {/* TODO: 具体的な標準期間を記載 */}
      </p>
    ),
  },
  {
    question: 'ロゴの著作権はどうなりますか？',
    answer: (
      <p>
        最終的に納品されたロゴデザインの著作権（著作財産権）は、原則としてお客様に譲渡いたします。契約書にて明記いたしますのでご安心ください。
      </p>
    ),
  },
  {
    question: 'デザイン案はいくつ提案してもらえますか？',
    answer: (
      <p>
        通常、〇～〇案のデザインをご提案させていただき、その中から方向性を絞ってブラッシュアップしていきます。プランによって提案数は異なります。
        {/* TODO: 具体的な提案数を記載、またはプランへのリンク */}
      </p>
    ),
  },
  {
    question: '名刺や封筒など、他のツールへの展開もお願いできますか？',
    answer: (
      <p>
        はい、承っております。ロゴデザインを基にした名刺、封筒、会社案内、Webサイトなどの各種ツールデザイン、および印刷までワンストップで対応可能です。ロゴガイドラインの作成も承ります。
      </p>
    ),
  },
  // TODO: ロゴデザイン固有の質問を追加 (例: 商標登録の相談、修正回数など)
];

export const metadata: Metadata = {
  title: 'ロゴデザイン | サービス | ニイヌマ企画印刷',
  description:
    '企業の顔となるロゴマーク・ロゴタイプをデザイン。コンセプトメイキングから丁寧にヒアリングし、想いを形にします。名刺やツール展開も。',
};

// ロゴデザインページで表示する関連サービスID
const logoDesignRelatedIds = [
  'design-item-1', // グラフィックデザイン
  'print-item-1', // 名刺・ハガキ・カード類
  'it-item-1', // ホームページ制作
];

const LogoDesignPage = () => {
  return (
    <div>
      <PageHero
        title="ロゴデザイン"
        subtitle="企業の理念と未来を象徴する、唯一無二のシンボルを"
      />
      {/* 新しいコンポーネント構成 */}
      <ServiceIntroduction /> {/* TODO: 実装 */}
      <LogoConcepts /> {/* TODO: 実装 */}
      <Portfolio /> {/* TODO: 実装 */}
      <DeliveryInfo /> {/* TODO: データ納品中心の場合の調整 */}
      <SubmissionGuide /> {/* TODO: 不要か、内容を調整 */}
      <OrderFlow />
      {/* <Faq faqItems={logoDesignFaqData} /> */}
      <RelatedServices relatedServiceIds={logoDesignRelatedIds} />{' '}
      {/* Propsを渡す */}
      {/* <EnhancedCTA /> */}
    </div>
  );
};

export default LogoDesignPage;
