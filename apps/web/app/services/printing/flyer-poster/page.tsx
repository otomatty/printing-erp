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
import ServiceIntroduction from '../../_components/service-introduction';
import WorkSamples from '../../_components/work-samples';
// --- 共通コンポーネントをインポート --- ※変更

// このページ固有のコンポーネント
// import ServiceIntroduction from "./_components/ServiceIntroduction"; // 削除
// import WorkSamples from "./_components/WorkSamples"; // 削除
import ProductTypes from './_components/product-types';
import PrintingOptions from './_components/printing-options';
import PaperOptions from './_components/paper-options';

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
import { faqTitle as flyerFaqTitle, flyerPosterFaqData } from './_data/faqData'; // FAQ データをインポート ※変更
// --- データファイルのインポートを追加 --- ※追加

export const metadata: Metadata = {
  title: 'チラシ・ポスター印刷 | サービス | ニイヌマ企画印刷', // タイトル微修正
  description:
    'イベント告知、商品宣伝、店舗案内などに効果的なチラシ、ポスター、リーフレット、パンフレット等のデザイン・印刷サービス。',
};

// チラシ・ポスター等ページで表示する関連サービスID
const flyerPosterRelatedIds = [
  'print-item-1', // 名刺・ハガキ・カード類
  'print-item-2', // 封筒印刷
  'print-item-5', // ページ物・製本
];

const FlyerPosterPage = () => {
  return (
    <div>
      <PageHero
        title="チラシ・ポスター印刷"
        subtitle="効果的なデザインと印刷で、伝えたい情報を届けます"
      />

      {/* --- 新しいコンポーネント構成 (データ渡し) --- ※変更 */}
      <ServiceIntroduction
        title={serviceIntroTitle}
        description={serviceIntroDesc}
      />
      <WorkSamples
        sectionTitle={workSamplesTitle}
        sampleItems={workSamplesItems}
        note={workSamplesNote}
      />
      {/* --- 新しいコンポーネント構成 (データ渡し) --- ※変更 */}
      <ProductTypes />
      <PrintingOptions />
      <PaperOptions />
      <DeliveryInfo />
      <SubmissionGuide />
      <OrderFlow />
      <FAQSection
        faqs={flyerPosterFaqData} // データファイルからインポートしたデータを使用 ※変更
        title={flyerFaqTitle} // データファイルからインポートしたタイトルを使用 ※変更
        withQAStyle={true} // シンプルスタイル
      />
      <RelatedServices relatedServiceIds={flyerPosterRelatedIds} />
      <CtaSection
        title="チラシ・ポスター印刷のご相談"
        message="デザイン制作から印刷、加工まで、チラシ・ポスターに関するご要望をお聞かせください。"
        buttons={[{ text: 'お問い合わせ・お見積り', href: '/contact' }]}
      />
    </div>
  );
};

export default FlyerPosterPage;
