import React from 'react';
import PageHero from '~/components/custom/page-hero';
import type { Metadata } from 'next';

import EnvelopeTypes from './_components/envelope-types';
import PrintingOptions from './_components/printing-options';
import PaperOptions from './_components/paper-options';
import DeliveryInfo from '~/components/services/delivery-info';
import SubmissionGuide from '~/components/services/submission-guide';
import OrderFlow from '~/components/services/order-flow';
import RelatedServices from '~/components/services/related-services';
import FAQSection from '~/components/custom/faq/faq-section'; // FAQSection をインポート
import CtaSection from '~/components/custom/cta-section'; // CtaSection をインポート

// --- 共通コンポーネントをインポート --- ※追加
import ServiceIntroduction from '../../_components/service-introduction';
import WorkSamples from '../../_components/work-samples';
// --- 共通コンポーネントをインポート --- ※追加

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
import { getFaqItemsByPageSlug } from '~/actions/faq';
// --- データファイルのインポートを追加 --- ※追加

export const metadata: Metadata = {
  title: '封筒印刷 | サービス | 印刷会社',
  description:
    '長3、角2などの定型封筒から特殊な不定型封筒まで、高品質な封筒印刷サービス。ロゴやデザインの印刷も可能です。',
};

// 封筒印刷ページで表示する関連サービスID
const envelopeRelatedIds = [
  'print-item-3', // 伝票印刷・製本
  'print-item-4', // チラシ・ポスター
  'print-item-5', // ページ物・冊子
];

const EnvelopePage = async () => {
  const { faqs, error } = await getFaqItemsByPageSlug(
    '/services/printing/envelope'
  );
  if (error) console.error('Error fetching FAQs:', error);

  return (
    <div>
      <PageHero
        title="封筒印刷"
        subtitle="ビジネスの信頼性を高めるオリジナル封筒を作成します"
      />

      {/* --- ServiceIntroduction, WorkSamples にデータ渡し --- ※変更 */}
      <ServiceIntroduction
        title={serviceIntroTitle}
        description={serviceIntroDesc}
      />
      <WorkSamples
        sectionTitle={workSamplesTitle}
        sampleItems={workSamplesItems}
        note={workSamplesNote}
      />
      {/* --- ServiceIntroduction, WorkSamples にデータ渡し --- ※変更 */}

      <EnvelopeTypes />

      <PrintingOptions />

      <PaperOptions />

      <DeliveryInfo />

      <SubmissionGuide />

      <OrderFlow />

      <FAQSection faqs={faqs} title="よくあるご質問" withQAStyle={true} />

      <RelatedServices relatedServiceIds={envelopeRelatedIds} />

      <CtaSection
        title="封筒印刷のご相談・お見積り"
        message="オリジナル封筒の作成、印刷仕様についてなど、お気軽にお問い合わせください。"
        buttons={[{ text: 'お問い合わせはこちら', href: '/contact' }]}
      />
    </div>
  );
};

export default EnvelopePage;
