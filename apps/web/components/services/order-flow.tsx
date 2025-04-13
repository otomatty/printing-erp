import type React from 'react';
import TimelineFlow from '~/components/custom/timeline-flow'; // 作成した共通コンポーネントをインポート

// ステップデータをTimelineFlowの形式に合わせて整形
// idとstep("01"形式)を追加、iconは削除
const orderFlowSteps = [
  {
    id: 'order-step-1',
    step: '01',
    title: 'お問い合わせ・お見積もり',
    description:
      'Webフォーム、お電話、メールにてお気軽にお問い合わせください。仕様や部数をお伺いし、お見積もりを提出します。',
  },
  {
    id: 'order-step-2',
    step: '02',
    title: 'ご注文・データ入稿',
    description:
      'お見積もりにご納得いただけましたら、ご注文ください。印刷データをご入稿いただきます。（データ作成も承ります）',
  },
  {
    id: 'order-step-3',
    step: '03',
    title: 'データチェック・校正',
    description:
      'ご入稿いただいたデータを確認します。必要に応じて修正や確認（校正）を行います。', // TODO: 校正の有無や方法について追記
  },
  {
    id: 'order-step-4',
    step: '04',
    title: '印刷・加工',
    description:
      'データ確定後、印刷および必要な加工（箔押し、窓付けなど）を行います。',
  },
  {
    id: 'order-step-5',
    step: '05',
    title: '発送・納品',
    description: '完成した製品を梱包し、ご指定の場所へ発送いたします。',
  },
];

// OrderFlowコンポーネントはTimelineFlowを呼び出すラッパーとして機能
const OrderFlow: React.FC = () => {
  return (
    <TimelineFlow
      title="ご注文の流れ"
      stepsData={orderFlowSteps}
      backgroundColor="bg-white" // このセクションの背景色を指定
    />
  );
};

export default OrderFlow;
