import React from 'react';
import PageHero from '~/components/custom/page-hero';
import type { Metadata } from 'next';

// 共通コンポーネントのインポート
import DeliveryInfo from '~/components/services/delivery-info';
import SubmissionGuide from '~/components/services/submission-guide';
import OrderFlow from '~/components/services/order-flow';
import FAQSection from '~/components/custom/faq/faq-section'; // 新しいコンポーネントをインポート
import RelatedServices from '~/components/services/related-services';
import CtaSection from '~/components/custom/cta-section'; // CtaSection は使うのでインポートを残す
import ServiceIntroduction from '../../_components/service-introduction'; // データ渡しに変更
import WorkSamples from '../../_components/work-samples'; // データ渡しに変更

// このページ固有のコンポーネントのインポート
import ProductTypes from './_components/product-types';
import PrintingOptions from './_components/printing-options';
import PaperOptions from './_components/paper-options';

// --- データファイルのインポートを追加 ---
import {
  title as serviceIntroTitle,
  description as serviceIntroDesc,
} from './_data/serviceIntroductionData';
import {
  sectionTitle as workSamplesTitle,
  sampleItems as workSamplesItems,
  note as workSamplesNote,
} from './_data/workSamplesData';
import {
  faqTitle as meishiFaqTitle,
  meishiHagakiCardFaqData,
} from './_data/faqData';
// --- データファイルのインポートを追加 ---

export const metadata: Metadata = {
  title: '名刺・ハガキ・カード類 | サービス | ニイヌマ企画印刷',
  description:
    '高品質な名刺、年賀状や挨拶状などの各種ハガキ、ショップカードなどの印刷サービス。',
};

// 名刺・ハガキ・カード類ページで表示する関連サービスID
const meishiHagakiCardRelatedIds = [
  'print-item-2', // 封筒印刷
  'print-item-3', // 名刺・ハガキ・カード類
  'print-item-4', // チラシ・ポスター
];

const MeishiHagakiCardPage = () => {
  return (
    <div>
      <PageHero
        title="名刺・ハガキ・カード類"
        subtitle="ビジネスやプライベートに必須のアイテムを高品質に印刷します"
      />

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
      <PrintingOptions />
      <PaperOptions />
      <DeliveryInfo />
      <SubmissionGuide />
      <OrderFlow />
      <FAQSection
        faqs={meishiHagakiCardFaqData}
        title={meishiFaqTitle} // データファイルからタイトルを渡す
        withQAStyle={true}
      />
      <RelatedServices relatedServiceIds={meishiHagakiCardRelatedIds} />
      <CtaSection />
    </div>
  );
};

export default MeishiHagakiCardPage;
