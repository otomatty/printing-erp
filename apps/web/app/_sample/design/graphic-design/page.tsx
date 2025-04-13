import React from 'react';
import PageHero from '~/components/custom/page-hero';
import type { Metadata } from 'next';

// 共通コンポーネントのインポート
import DeliveryInfo from '~/components/services/delivery-info';
// import SubmissionGuide from "@/components/services/SubmissionGuide"; // デザイン専用のコンポーネントを実装する
import OrderFlow from '~/components/services/order-flow';
import FAQSection from '~/components/custom/faq/faq-section'; // FAQコンポーネントをインポート
import RelatedServices from '~/components/services/related-services';
import CtaSection from '~/components/custom/cta-section'; // CTAセクションをインポート
import ServiceIntroduction from '../../../services/_components/service-introduction'; // データ渡しに変更
import WorkSamples from '../../../services/_components/work-samples'; // データ渡しに変更

// このページ固有のコンポーネント (今後作成)
import DesignItems from './_components/DesignItems'; // TODO: 実装・データ渡し検討

// --- データファイルのインポートを追加 ---
// TODO: 以下のデータファイルを _data ディレクトリに作成する
import {
  title as serviceIntroTitle,
  description as serviceIntroDesc,
} from './_data/serviceIntroductionData'; // 仮のパス
import {
  sectionTitle as workShowcaseTitle,
  sampleItems as workShowcaseItems,
  note as workShowcaseNote,
} from './_data/workSampleData'; // 仮のパス
import {
  faqTitle as designFaqTitle,
  graphicDesignFaqData,
} from './_data/faqData'; // 仮のパス
// --- データファイルのインポートを追加 ---

// --- ここから FAQ データ定義を削除 ---
/*
const graphicDesignFaqData = [
	// ... (省略) ...
];
*/
// --- ここまで FAQ データ定義を削除 ---

export const metadata: Metadata = {
  title: 'グラフィックデザイン | サービス | ニイヌマ企画印刷',
  description:
    'パンフレット・チラシ・名刺・ポスターなど各種印刷物のデザイン制作。企画から印刷までトータルサポート。伝わるデザインをご提案します。',
};

// グラフィックデザインページで表示する関連サービスID
const graphicDesignRelatedIds = [
  'print-item-4', // チラシ・ポスター
  'design-item-2', // ロゴデザイン
  'design-item-4', // イラスト制作
];

const GraphicDesignPage = () => {
  return (
    <div>
      <PageHero
        title="グラフィックデザイン"
        subtitle="情報を整理し、想いを伝える。効果的なデザインを追求"
      />
      {/* データファイルを渡す形に変更 */}
      <ServiceIntroduction
        title={serviceIntroTitle}
        description={serviceIntroDesc}
      />
      <WorkSamples
        sectionTitle={workShowcaseTitle}
        sampleItems={workShowcaseItems}
        note={workShowcaseNote}
      />
      <DesignItems />
      <DeliveryInfo /> {/* TODO: デザイン＋印刷の場合の内容調整 */}
      {/* <SubmissionGuide /> TODO: デザイン＋印刷の場合の内容調整 */}
      <OrderFlow />
      {/* FAQSection を使用し、データファイルから渡す */}
      <FAQSection
        faqs={graphicDesignFaqData}
        title={designFaqTitle}
        withQAStyle={true}
      />
      <RelatedServices relatedServiceIds={graphicDesignRelatedIds} />
      {/* CtaSection を使用 */}
      <CtaSection />
    </div>
  );
};

export default GraphicDesignPage;
