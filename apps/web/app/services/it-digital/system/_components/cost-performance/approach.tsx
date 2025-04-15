import type React from 'react';
import { Card, CardContent } from '@kit/ui/card';
import Link from 'next/link';
import { Button } from '@kit/ui/button';

const costSavingApproaches = [
  {
    title: '最新技術の組み合わせ',
    description:
      '1から全て作るのではなく、すでに実績のある技術を組み合わせて、開発期間を最大70%短縮',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>最新技術の組み合わせアイコン</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    benefit: '開発期間70%短縮',
    explanation: 'フルスクラッチ開発の10ヶ月→当社なら3ヶ月で完成',
  },
  {
    title: '最小限からスタート',
    description:
      'まずは本当に必要な機能だけに絞り、素早く導入。効果が確認できてから追加投資で機能を拡張',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>最小限からスタートアイコン</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
    benefit: '初期費用55%削減',
    explanation: '従来の予算1,000万円→当社なら450万円から開始可能',
  },
  {
    title: 'AI活用による生産性向上',
    description:
      '単純作業や定型業務をAIが支援し、1人の開発者が従来の3〜5人分の作業をこなせる体制を構築',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-purple-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>AI活用アイコン</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    benefit: '開発コスト65%削減',
    explanation: '開発者5人必要な作業→当社なら2人で対応可能',
  },
];

const ApproachSection: React.FC = () => {
  return (
    <>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">
          なぜこの価格が実現できるのか？
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto">
          私たちは最新の方法で開発コストを大幅に削減し、お客様に還元しています
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {costSavingApproaches.map((approach) => (
          <Card
            key={approach.title}
            className="border-none shadow-lg hover:shadow-xl transition-shadow"
          >
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 bg-blue-50 p-4 rounded-full">
                  {approach.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{approach.title}</h4>
                <p className="text-gray-600 text-sm mb-4">
                  {approach.description}
                </p>
                <div className="mt-auto">
                  <div className="bg-green-50 py-2 px-4 rounded-full">
                    <span className="text-green-700 font-semibold">
                      {approach.benefit}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {approach.explanation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center">
        <Link href="#pricing">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/80 text-lg font-semibold"
          >
            詳しい料金プランを見る
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ApproachSection;
