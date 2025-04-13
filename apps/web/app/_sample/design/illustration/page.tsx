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
import IllustrationTypes from './_components/IllustrationTypes';
import Portfolio from './_components/Portfolio';

// このページ固有のFAQデータ
const illustrationFaqData = [
  {
    question: 'どのようなタッチのイラストが描けますか？',
    answer: (
      <p>
        シンプルで親しみやすいタッチ、リアルな描写、アニメ風、水彩風など、お客様のご希望や用途に合わせて様々なタッチに対応可能です。ポートフォリオをご覧いただくか、具体的なイメージをお伝えください。
      </p>
    ),
  },
  {
    question: 'イラストの著作権はどうなりますか？',
    answer: (
      <p>
        基本的に制作したイラストの著作権は制作者（弊社）に帰属しますが、使用権はお客様に譲渡いたします。ご契約内容により著作権譲渡も可能ですので、ご希望の場合はご相談ください。
        {/* TODO: 著作権に関するポリシーを明確化 */}
      </p>
    ),
  },
  {
    question: '修正はどのくらい可能ですか？',
    answer: (
      <p>
        ラフ案の段階で〇回まで、線画・着色後に〇回までなど、工程ごとに修正回数の目安を設けております。大幅な変更は追加料金が発生する場合がございますので、ラフ段階でのご確認をお願いしております。
        {/* TODO: 具体的な修正回数やルールを記載 */}
      </p>
    ),
  },
  // TODO: イラスト制作固有の質問を追加 (例: キャラクターデザイン、納品形式、実績公開についてなど)
];

export const metadata: Metadata = {
  title: 'イラスト制作 | サービス | ニイヌマ企画印刷',
  description:
    'Webサイト、広告、資料、キャラクターデザインなど、様々な用途に合わせたオリジナルイラストを制作。親しみやすいタッチからリアルな描写まで対応。',
};

// イラスト制作ページで表示する関連サービスID
const illustrationRelatedIds = [
  'design-item-1', // グラフィックデザイン
  'design-item-2', // ロゴデザイン
  'design-item-3', // パッケージデザイン
];

const IllustrationPage = () => {
  return (
    <div>
      <PageHero
        title="イラスト制作"
        subtitle="想いを形にする、伝わるオリジナルイラスト"
      />
      {/* 新しいコンポーネント構成 */}
      <ServiceIntroduction /> {/* TODO: 実装 */}
      <IllustrationTypes /> {/* TODO: 実装 */}
      <Portfolio /> {/* TODO: 実装 */}
      <DeliveryInfo />{' '}
      {/* TODO: デザインサービス向けに内容を調整する必要があるか確認 */}
      <SubmissionGuide />{' '}
      {/* TODO: デザインサービス向けに内容を調整する必要があるか確認 */}
      <OrderFlow />
      {/* <Faq faqItems={illustrationFaqData} /> */}
      <RelatedServices relatedServiceIds={illustrationRelatedIds} />{' '}
      {/* Propsを渡す */}
      {/* <EnhancedCTA /> */}
    </div>
  );
};

export default IllustrationPage;
