'use client';

import React from 'react';
import TimelineFlow from '~/components/custom/timeline-flow';

// ホームページ制作の流れデータ
const homepageWorkflowSteps = [
  {
    id: 'step-1',
    step: '01',
    title: 'お問い合わせ・簡単見積もり',
    description:
      'サイト上の見積りツールで手軽に費用の目安を確認、または電話・メール・フォームからお問い合わせいただけます。初めての相談は無料です。',
    duration: 'はじめの一歩',
  },
  {
    id: 'step-2',
    step: '02',
    title: 'ヒアリング・目的の明確化',
    description:
      'お客様のビジネスや競合状況、ターゲットユーザー、サイトに求める成果を丁寧にお聞きします。何のためのサイトか、どんな成果を期待するかを明確にします。',
    duration: '1〜3日目',
  },
  {
    id: 'step-3',
    step: '03',
    title: '提案書・お見積り',
    description:
      'お聞きした内容をもとに、最適なサイト構成と費用をご提案。一度にすべて作るのではなく、必要に応じて段階的に制作するプランもご提示します。',
    duration: '4〜5日目',
  },
  {
    id: 'step-4',
    step: '04',
    title: 'デザイン案の作成',
    description:
      'ご契約後、まずはトップページとサブページのデザイン案をご提示。「思っていたのと違う」というミスマッチを防ぎ、ご要望に応じて修正を重ねます。',
    duration: '6〜12日目',
  },
  {
    id: 'step-5',
    step: '05',
    title: 'コーディング・CMS実装',
    description:
      '確定したデザインをもとに、実際のサイトを構築していきます。レスポンシブデザイン対応やSEO対策を施し、必要に応じてCMSも実装して管理しやすいサイトに仕上げます。',
    duration: '13〜24日目',
  },
  {
    id: 'step-6',
    step: '06',
    title: 'テスト・検証',
    description:
      '完成したサイトを様々な環境（ブラウザ・デバイス）で表示確認し、動作テストを行います。SEO対策や表示速度の最適化も行い、高品質なサイトをお届けします。',
    duration: '25〜29日目',
  },
  {
    id: 'step-7',
    step: '07',
    title: '公開・運用サポート',
    description:
      'サイト公開後も、更新方法のレクチャーや定期的なメンテナンス、アクセス解析に基づく改善提案を行います。サイトの効果を最大化するための継続的なサポートを提供します。',
    duration: '30日目〜継続',
  },
];

export default function HomepageWorkflowSection() {
  return (
    <div className="bg-white">
      <TimelineFlow
        title="ホームページ制作の流れ"
        stepsData={homepageWorkflowSteps}
        backgroundColor="bg-white"
        cumulativeDuration={false}
      />
    </div>
  );
}
