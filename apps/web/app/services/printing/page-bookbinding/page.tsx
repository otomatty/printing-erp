import React from 'react';
import PageHero from '~/components/custom/page-hero';
import type { Metadata } from 'next';

// 共通コンポーネント
import DeliveryInfo from '~/components/services/delivery-info';
import SubmissionGuide from '~/components/services/submission-guide';
import OrderFlow from '~/components/services/order-flow';
import RelatedServices from '~/components/services/related-services';
import FAQSection from '~/components/custom/faq/faq-section'; // FAQSection をインポート
import CtaSection from '~/components/custom/cta-section'; // CtaSection をインポート

// --- 共通コンポーネントをインポート --- ※変更
import ServiceIntroduction from '../../_components/service-introduction'; // パス修正
import WorkSamples from '../../_components/work-samples'; // パス修正
// --- 共通コンポーネントをインポート --- ※変更

// このページ固有のコンポーネント
// import ServiceIntroduction from "./_components/ServiceIntroduction"; // 削除
import ProductTypes from './_components/product-types';
import PrintingSeihonOptions from './_components/printing-seihon-options';
import EditingSupport from './_components/editing-support';
// import WorkSamples from "./_components/WorkSamples"; // 削除

// --- データファイルのインポートを追加 --- ※追加
import {
  title as serviceIntroTitle,
  description as serviceIntroDesc,
} from './_data/serviceIntroductionData';
import {
  sectionTitle as workSamplesTitle,
  sampleItems as workSamplesItems,
  note as workSamplesNote,
} from './_data/workSamplesData';
import { faqTitle as pageMonoFaqTitle, pageMonoFaqData } from './_data/faqData'; // FAQ データをインポート ※変更
// --- データファイルのインポートを追加 --- ※追加

export const metadata: Metadata = {
  title: 'ページ物・冊子印刷・製本 | サービス | ニイヌマ企画印刷', // タイトル微修正
  description:
    '報告書、マニュアル、文集、論文、記念誌などのページ物・冊子の印刷・製本サービス。デザイン・編集から、持ち込み原稿の製本まで対応。', // description 微修正
};

// ページ物・製本等ページで表示する関連サービスID
const pageMonoSeihonRelatedIds = [
  'print-item-1', // 名刺・ハガキ・カード類
  'print-item-2', // 封筒印刷
  'print-item-3', // 伝票印刷・製本
];

const PageBookBindingPage = () => {
  return (
    <div>
      <PageHero
        title="ページ物・冊子印刷・製本" // タイトル修正
        subtitle="大切な記録や情報を、読みやすく美しい冊子に仕上げます" // subtitle 修正
      />
      {/* --- ServiceIntroduction にデータ渡し --- ※変更 */}
      <ServiceIntroduction
        title={serviceIntroTitle}
        description={serviceIntroDesc}
      />
      <WorkSamples
        sectionTitle={workSamplesTitle}
        sampleItems={workSamplesItems}
        note={workSamplesNote}
      />
      <ProductTypes />
      <PrintingSeihonOptions />
      <EditingSupport />
      {/* --- WorkSamples にデータ渡し --- ※変更 */}

      {/* --- WorkSamples にデータ渡し --- ※変更 */}
      <DeliveryInfo />
      <SubmissionGuide />
      <OrderFlow />
      <FAQSection
        faqs={pageMonoFaqData} // データファイルからインポートしたデータを使用 ※変更
        title={pageMonoFaqTitle} // データファイルからインポートしたタイトルを使用 ※変更
        withQAStyle={true} // 指示通り true に設定
      />
      <RelatedServices relatedServiceIds={pageMonoSeihonRelatedIds} />
      <CtaSection
        title="ページ物・冊子印刷・製本のご相談はこちら"
        message="報告書、マニュアル、記念誌など、各種冊子の印刷・製本について、お気軽にご相談ください。"
        buttons={[{ text: 'お問い合わせ・お見積り', href: '/contact' }]}
      />
    </div>
  );
};

export default PageBookBindingPage;
