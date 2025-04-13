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
import RetouchDetails from './_components/RetouchDetails';
import BeforeAfterExamples from './_components/BeforeAfterExamples';

// このページ固有のFAQデータ
const photoRetouchFaqData = [
  {
    question: 'どのような種類の写真加工に対応していますか？',
    answer: (
      <p>
        人物写真の肌補正、背景の切り抜き、色調補正、不要物の除去、古い写真の修復など、幅広いレタッチに対応しております。具体的なご要望をお聞かせください。
      </p>
    ),
  },
  {
    question: '料金はどのくらいかかりますか？',
    answer: (
      <p>
        加工内容の複雑さや作業時間によって異なります。お見積もりは無料ですので、加工したい写真とご希望の内容をお送りいただければ、概算料金をご提示いたします。
        {/* TODO: 目安となる料金体系を記載 */}
      </p>
    ),
  },
  {
    question: '納品形式は選べますか？',
    answer: (
      <p>
        はい、JPEG、PNG、TIFF、PSDなど、ご希望のファイル形式で納品可能です。Web用、印刷用など用途に合わせて最適化いたします。
      </p>
    ),
  },
  // TODO: 写真レタッチ固有の質問を追加 (例: 修正回数、大量依頼の割引など)
];

export const metadata: Metadata = {
  title: '写真加工・レタッチ | サービス | ニイヌマ企画印刷',
  description:
    '写真の魅力を最大限に引き出すプロのレタッチサービス。人物、商品、風景写真の修正、色調補正、切り抜き、合成など幅広く対応。',
};

// 写真加工・レタッチページで表示する関連サービスID
const photoRetouchRelatedIds = [
  'design-item-1', // グラフィックデザイン
  'design-item-4', // イラスト制作
  'it-item-1', // ホームページ制作
];

const PhotoRetouchPage = () => {
  return (
    <div>
      <PageHero
        title="写真加工・レタッチ"
        subtitle="思い出の写真も、ビジネスに使う一枚も、より美しく魅力的に"
      />
      {/* 新しいコンポーネント構成 */}
      <ServiceIntroduction /> {/* TODO: 実装 */}
      <RetouchDetails /> {/* TODO: 実装 */}
      <BeforeAfterExamples /> {/* TODO: 実装 */}
      <DeliveryInfo />{' '}
      {/* TODO: デザインサービス向けに内容を調整する必要があるか確認 */}
      <SubmissionGuide />{' '}
      {/* TODO: デザインサービス向けに内容を調整する必要があるか確認 */}
      <OrderFlow />
      {/* <Faq faqItems={photoRetouchFaqData} /> */}
      <RelatedServices relatedServiceIds={photoRetouchRelatedIds} />{' '}
      {/* Propsを渡す */}
      {/* <EnhancedCTA /> */}
    </div>
  );
};

export default PhotoRetouchPage;
