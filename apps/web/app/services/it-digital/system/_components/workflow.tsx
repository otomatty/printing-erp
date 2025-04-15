'use client';

import React from 'react';
import TimelineFlow from '~/components/custom/timeline-flow';
import Container from '~/components/custom/container';

// システム開発の流れデータ
const systemWorkflowSteps = [
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
    title: '業務の流れを聞き取り',
    description:
      '実際にお客様の会社を訪問し、普段の仕事の流れや困りごとを丁寧にお聞きします。現場で働く方の生の声を直接聞くことで、本当に必要な機能を見極めます。',
    duration: '1〜5日目',
  },
  {
    id: 'step-3',
    step: '03',
    title: '提案書・お見積り',
    description:
      'お聞きした内容をもとに、最適なシステムの内容と費用をご提案。一度にすべて作るのではなく、段階的に少しずつ作る計画をご提示します。',
    duration: '6〜7日目',
  },
  {
    id: 'step-4',
    step: '04',
    title: '設計・画面の試作',
    description:
      'ご契約後、早い段階で実際の画面イメージをお見せします。「思っていたのと違う」というミスマッチを防ぎ、使いやすさや機能を一緒に確認しながら進めます。',
    duration: '8〜15日目',
  },
  {
    id: 'step-5',
    step: '05',
    title: '開発・動作確認',
    description:
      '少しずつ機能を作り、その都度確認しながらシステムを組み立てていきます。定期的に進み具合をご報告し、実際に操作していただきながら品質を高めていきます。',
    duration: '16〜30日目',
  },
  {
    id: 'step-6',
    step: '06',
    title: '導入・使い方レクチャー',
    description:
      '完成したシステムの使い方を丁寧にご説明します。スムーズに新しいシステムに切り替えられるようサポートし、初期のお困りごとにも迅速に対応します。',
    duration: '31〜35日目',
  },
  {
    id: 'step-7',
    step: '07',
    title: 'サポート・改善提案',
    description:
      '導入後も定期的に利用状況を確認し、さらに便利になる改善案をご提案します。会社の成長に合わせてシステムも一緒に成長させていきます。',
    duration: '導入後も継続',
  },
];

export default function SystemWorkflowSection() {
  return (
    <div className="bg-white">
      <TimelineFlow
        title="システム開発の流れ"
        stepsData={systemWorkflowSteps}
        backgroundColor="bg-white"
        cumulativeDuration={false}
      />
      {/* <div className="mt-16 bg-primary/5 rounded-lg p-8 max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">
          <span className="text-primary">
            小さく始めて
            <br className="sm:hidden" />
            素早く改善する方法
          </span>
          を採用
        </h3>
        <p className="text-gray-700 mb-4">
          当社では、「まずは必要最小限の機能から始める」「小さく区切って少しずつ作る」という方法で、
          短期間で目に見える成果をお届けします。この方法には以下のメリットがあります：
        </p>
        <ul className="space-y-2 text-gray-700 ml-5 list-disc">
          <li>
            <span className="font-medium">すぐに効果を実感</span>
            ：最短7〜10日で最初の機能が使えるようになります
          </li>
          <li>
            <span className="font-medium">こまめな修正が可能</span>
            ：毎日〜毎週の確認で「ちょっと違う」を早めに修正できます
          </li>
          <li>
            <span className="font-medium">確実な成果</span>
            ：重要な機能から先に作るので、投資効果が高いです
          </li>
          <li>
            <span className="font-medium">少しずつ形になる</span>
            ：必要な機能から順に作り、約1ヶ月で基本システムが完成します
          </li>
        </ul>
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          ※
          上記の期間はシステムの規模や複雑さによって変わります。シンプルなシステムなら約1ヶ月で使い始められます。
        </p>
      </div> */}
    </div>
  );
}
