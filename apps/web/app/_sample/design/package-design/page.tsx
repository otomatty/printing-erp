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
import PackageTypes from './_components/PackageTypes'; // 例: 商品箱、ラベル、包装紙など
import WorkExamples from './_components/WorkExamples'; // 制作実績

// このページ固有のFAQデータ
const packageDesignFaqData = [
  {
    question: 'どのような商品のパッケージデザインが可能ですか？',
    answer: (
      <p>
        食品、化粧品、雑貨、アパレル、工業製品など、様々なジャンルの商品パッケージデザインに対応しております。箱、袋、ラベル、包装紙、POPなど形状も問いません。
      </p>
    ),
  },
  {
    question: 'デザインだけでなく印刷までお願いできますか？',
    answer: (
      <p>
        はい、弊社は印刷会社ですので、デザインから印刷、加工（表面加工、箔押しなど）まで一貫して承ることが可能です。ご希望の仕様やロット数に合わせて最適な印刷方法をご提案します。
      </p>
    ),
  },
  {
    question: 'デザインの修正は可能ですか？',
    answer: (
      <p>
        デザイン案ご提案後、〇回程度の修正に対応いたします。お客様にご納得いただけるまで、細部の調整を行います。
        {/* TODO: 具体的な修正回数やルールを記載 */}
      </p>
    ),
  },
  {
    question: '容器や箱の形状から相談できますか？',
    answer: (
      <p>
        はい、可能です。商品の特性やターゲット層、コストなどを考慮し、最適なパッケージ形状や素材のご提案も行います。既成品の箱へのデザインはもちろん、オリジナルの箱設計もご相談ください。
      </p>
    ),
  },
  // TODO: パッケージデザイン固有の質問を追加 (例: 法規表示、デザインのみ依頼の場合のデータ形式など)
];

export const metadata: Metadata = {
  title: 'パッケージデザイン | サービス | ニイヌマ企画印刷',
  description:
    '商品の魅力を最大限に引き出すパッケージデザインをご提案。食品、化粧品、雑貨など多様な実績。デザインから印刷までワンストップで対応。',
};

// パッケージデザインページで表示する関連サービスID
const packageDesignRelatedIds = [
  'design-item-1', // グラフィックデザイン
  'design-item-2', // ロゴデザイン
  'print-item-1', // 名刺・ハガキ・カード類 (シール・ラベルの代替)
];

const PackageDesignPage = () => {
  return (
    <div>
      <PageHero
        title="パッケージデザイン"
        subtitle="商品の価値を高め、消費者の心を掴むデザイン"
      />
      {/* 新しいコンポーネント構成 */}
      <ServiceIntroduction /> {/* TODO: 実装 */}
      <PackageTypes /> {/* TODO: 実装 */}
      <WorkExamples /> {/* TODO: 実装 */}
      <DeliveryInfo /> {/* TODO: デザイン＋印刷の場合の内容調整 */}
      <SubmissionGuide /> {/* TODO: デザイン＋印刷の場合の内容調整 */}
      <OrderFlow />
      {/* <Faq faqItems={packageDesignFaqData} /> */}
      <RelatedServices relatedServiceIds={packageDesignRelatedIds} />{' '}
      {/* Propsを渡す */}
      {/* <EnhancedCTA /> */}
    </div>
  );
};

export default PackageDesignPage;
