'use client';

import React from 'react';
import TimelineFlow from '~/components/custom/timeline-flow'; // 共通コンポーネントをインポート

// 制作の流れデータ (TimelineFlowが要求する形式)
const workflowSteps = [
  {
    id: 'step-1',
    step: '01',
    title: 'ご相談・お問い合わせ',
    description:
      'お電話・メール・フォームよりお問い合わせください。ご要望やご予算などをお聞かせください。',
  },
  {
    id: 'step-2',
    step: '02',
    title: 'ヒアリング・お見積り',
    description:
      '詳細なヒアリングを行い、ご要望に沿ったプランとお見積りをご提案いたします。',
  },
  {
    id: 'step-3',
    step: '03',
    title: 'ご発注・制作開始',
    description:
      'お見積りにご納得いただけましたら、正式なご発注をいただき、制作を開始します。',
  },
  {
    id: 'step-4',
    step: '04',
    title: 'デザイン制作・校正',
    description:
      'デザイン案をご提示し、ご要望に応じて修正を行います。内容を確認いただき、最終校正を行います。',
  },
  {
    id: 'step-5',
    step: '05',
    title: '印刷・製作',
    description:
      '最終確認後、印刷・製作作業に入ります。品質を細部までチェックし、納品準備を整えます。',
  },
  {
    id: 'step-6',
    step: '06',
    title: '納品・アフターフォロー',
    description:
      '完成した製品を納品いたします。納品後も安心のアフターフォローを提供しています。',
  },
];

// 元々のアニメーション設定はTimelineFlow内に移動済み

export default function WorkflowSteps() {
  return (
    <TimelineFlow
      title="制作の流れ"
      stepsData={workflowSteps}
      // backgroundColor はデフォルトの 'bg-gray-50' を使用
    />
  );
}
