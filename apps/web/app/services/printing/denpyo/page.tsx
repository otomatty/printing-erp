import React from 'react';
import PageHero from '~/components/custom/page-hero';
import type { Metadata } from 'next';

// 共通コンポーネント
import DeliveryInfo from '~/components/services/delivery-info';
import SubmissionGuide from '~/components/services/submission-guide';
import OrderFlow from '~/components/services/order-flow';
import RelatedServices from '~/components/services/related-services';
import FAQSection from '~/components/custom/faq/faq-section'; // 新しい FAQSection をインポート
import CtaSection from '~/components/custom/cta-section'; // CtaSection をインポート

// このページ固有のコンポーネント
import ServiceIntroduction from '../../_components/service-introduction';
import DenpyoDetails from './_components/denpyo-details';
import WorkSamples from '../../_components/work-samples';

// このページ固有のコンポーネント
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

export const metadata: Metadata = {
  title: '伝票印刷・製本 | サービス | ニイヌマ企画印刷', // タイトルを少し修正
  description:
    '納品書、請求書、領収書などの各種伝票印刷や、資料・文集などの製本サービス。オリジナルデザイン、ナンバリング、複写伝票にも対応。', // description も修正
};

// 伝票印刷・製本ページで表示する関連サービスID
const denpyoSeihonRelatedIds = [
  'print-item-1', // 名刺・ハガキ・カード類
  'print-item-4', // チラシ・ポスター
  'print-item-5', // ページ物・冊子
];

const DenpyoSeihonPage = async () => {
  const { faqs, error } = await getFaqItemsByPageSlug(
    '/services/printing/denpyo'
  );
  if (error) console.error('Error fetching FAQs:', error);

  return (
    <div>
      <PageHero
        title="伝票印刷・製本" // タイトルを修正
        subtitle="納品書、請求書、領収書などの各種伝票印刷や、資料・文集などの製本を承ります。" // subtitle も修正
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
      <DenpyoDetails />
      <DeliveryInfo />
      <SubmissionGuide />
      <OrderFlow />
      <FAQSection faqs={faqs} title="よくあるご質問" withQAStyle={true} />
      <RelatedServices relatedServiceIds={denpyoSeihonRelatedIds} />
      <CtaSection
        title="伝票印刷・製本のご相談はこちら"
        message="オリジナルの伝票作成や、各種製本について、お気軽にお問い合わせください。"
        buttons={[{ text: 'お問い合わせ・お見積り', href: '/contact' }]}
      />
    </div>
  );
};

export default DenpyoSeihonPage;
