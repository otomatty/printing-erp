'use client';

import React from 'react';
import TimelineFlow from '~/components/custom/timeline-flow';
import Container from '~/components/custom/container';

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
    <section className="py-16 lg:py-32 bg-white">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            ホームページ制作の<span className="text-indigo-600">進め方</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            お客様と常に対話しながら、進み具合を見える化して
            <span className="font-semibold">確実に成果をお届けする</span>
            制作の流れをご紹介します
          </p>
        </div>
        <TimelineFlow
          title=""
          stepsData={homepageWorkflowSteps}
          backgroundColor="bg-white"
          cumulativeDuration={false}
        />
        <div className="mt-16 bg-primary/5 rounded-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">
            <span className="text-primary">
              目的に合わせた
              <br className="sm:hidden" />
              段階的な制作
            </span>
            を採用
          </h3>
          <p className="text-gray-700 mb-4">
            当社では、「まずは必要最小限の機能から始める」「小さく区切って少しずつ作る」という方法で、
            短期間で目に見える成果をお届けします。この方法には以下のメリットがあります：
          </p>
          <ul className="space-y-2 text-gray-700 ml-5 list-disc">
            <li>
              <span className="font-medium">早期公開が可能</span>
              ：コアページから先に制作し、最短2週間で公開できます
            </li>
            <li>
              <span className="font-medium">デザイン修正の柔軟性</span>
              ：制作過程で細かい修正を反映しやすく、イメージ通りのサイトが実現します
            </li>
            <li>
              <span className="font-medium">費用対効果の検証</span>
              ：重要なページから公開することで、効果を見ながら追加投資を検討できます
            </li>
            <li>
              <span className="font-medium">成長に合わせた拡張</span>
              ：基本サイト完成後も、ニーズに応じて機能やページを追加できます
            </li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            ※
            上記の期間はサイトの規模や複雑さによって変わります。シンプルなサイトなら約1ヶ月、大規模サイトは2〜3ヶ月を目安にご検討ください。
          </p>
        </div>
      </Container>
    </section>
  );
}
