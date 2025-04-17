'use client';

import type React from 'react';
import { Card, CardContent } from '@kit/ui/card';

// コスト削減アプローチのデータ
const costSavingApproaches = [
  {
    title: '最新フレームワーク活用',
    description:
      'ゼロから作るのではなく、高品質なフレームワークをベースに構築することで、開発期間を最大70%短縮',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>最新フレームワーク活用アイコン</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    benefit: '制作期間70%短縮',
    explanation: 'フルスクラッチ制作の4ヶ月→当社なら1ヶ月で完成',
  },
  {
    title: '段階的な機能拡張',
    description:
      'まずは最低限必要な機能だけでリリースし、効果測定をしながら徐々に機能を拡張していく方式',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>段階的な機能拡張アイコン</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
    benefit: '初期費用55%削減',
    explanation: '従来の予算300万円→当社なら130万円から開始可能',
  },
  {
    title: 'コンテンツ管理システム採用',
    description:
      '専門知識がなくても更新できるCMS導入により、更新作業の内製化を実現し、運用コストを大幅に削減',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-purple-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>コンテンツ管理システムアイコン</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    benefit: '運用コスト60%削減',
    explanation: '外注型の月額10万円→当社なら月額4万円に削減可能',
  },
];

const ApproachSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center">
        コストを<span className="text-primary">削減</span>する3つのアプローチ
      </h3>
      <p className="text-center mb-8 text-gray-600">
        私たちは最新の技術と効率的な制作方法を取り入れ、無駄を省いた制作工程で
        <br />
        高品質なホームページを低コストで実現します。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {costSavingApproaches.map((approach) => (
          <Card
            key={approach.title}
            className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="mr-4">{approach.icon}</div>
                <h4 className="text-xl font-semibold">{approach.title}</h4>
              </div>
              <p className="text-gray-600 mb-4">{approach.description}</p>
              <div className="bg-primary/5 p-3 rounded-lg">
                <div className="flex items-center">
                  <span className="font-bold text-primary">
                    {approach.benefit}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{approach.explanation}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 bg-primary/5 border border-primary/30 p-6 rounded-lg">
        <h4 className="text-xl font-bold mb-3 text-center">
          コスト削減の秘訣は「
          <span className="text-primary">本当に必要なもの</span>」に絞ること
        </h4>
        <p className="text-gray-700">
          多くの制作会社が「これも念のため」「将来的にこれもあった方が良い」と必要以上の機能を盛り込み、
          コストが膨らみがちです。当社では制作前のヒアリングを徹底し、本当に効果のある機能に絞り込むことで、
          コストを抑えながらも目的を達成するホームページを実現します。
        </p>
      </div>
    </div>
  );
};

export default ApproachSection;
