'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Container from '~/components/custom/container';
import { Button } from '@kit/ui/button';
import { Card, CardContent } from '@kit/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import Link from 'next/link';

// 従来との比較データ
const comparisonData = [
  {
    item: '初期費用',
    traditional: 100,
    traditionalLabel: '150〜500万円',
    ninuma: 45,
    ninumaLabel: '35〜150万円',
    trendText: '初期費用55%削減',
    description:
      '必要な機能だけに絞り、テンプレートをベースにした効率的な開発で大幅にコストダウン',
    saving: '55%削減',
  },
  {
    item: '制作期間',
    traditional: 100,
    traditionalLabel: '3〜6ヶ月',
    ninuma: 30,
    ninumaLabel: '1〜2ヶ月',
    trendText: '制作期間70%短縮',
    description:
      '最新のツールと効率的な制作フローにより、従来より短期間での納品が可能',
    saving: '70%短縮',
  },
  {
    item: '運用コスト',
    traditional: 100,
    traditionalLabel: '月5〜15万円',
    ninuma: 40,
    ninumaLabel: '月2〜6万円',
    trendText: '運用コスト60%削減',
    description:
      '更新・管理しやすいCMSの導入と保守費用の最適化により運用負担を大幅に軽減',
    saving: '60%削減',
  },
];

// コスト削減アプローチのデータ
const costSavingApproaches = [
  {
    title: '最新フレームワーク活用',
    description:
      'ゼロから作るのではなく、高品質なフレームワークをベースに構築することで、開発期間を最大70%短縮',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-indigo-500"
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

const HomepageCostPerformanceSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  // 画面幅を監視してモバイルかどうかを判定
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // md ブレークポイント
    };

    // 初期チェック
    checkIfMobile();

    // リサイズイベントでのチェック
    window.addEventListener('resize', checkIfMobile);

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <section id="cost-performance" className="py-16 lg:py-24 bg-white">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            コストを抑えた<span className="text-indigo-600">高品質</span>な
            <br className="hidden sm:inline" />
            ホームページ制作
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-gray-600">
            「良いホームページは高い」は、もう古い常識です。
            最新の技術と効率的な制作フローで、コストと品質を両立したホームページ制作を実現します。
          </p>
        </div>

        {/* 比較チャート */}
        <div className="mb-20">
          <div className="bg-gray-50 p-6 lg:p-10 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-center">
              一般的な制作会社との<span className="text-indigo-600">比較</span>
            </h3>

            <div className="mb-8">
              <ResponsiveContainer width="100%" height={isMobile ? 350 : 300}>
                <BarChart
                  data={comparisonData}
                  layout={isMobile ? 'vertical' : 'horizontal'}
                  margin={{
                    top: 5,
                    right: 30,
                    left: isMobile ? 100 : 20,
                    bottom: isMobile ? 5 : 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  {isMobile ? (
                    <XAxis type="number" domain={[0, 100]} />
                  ) : (
                    <XAxis dataKey="item" />
                  )}
                  {isMobile ? (
                    <YAxis
                      dataKey="item"
                      type="category"
                      tick={{ fontSize: 14 }}
                    />
                  ) : (
                    <YAxis domain={[0, 100]} />
                  )}
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === 'traditional') {
                        const item = comparisonData.find(
                          (d) => d.traditional === value
                        );
                        return [
                          item?.traditionalLabel || value,
                          '一般的な制作会社',
                        ];
                      }
                      if (name === 'ninuma') {
                        const item = comparisonData.find(
                          (d) => d.ninuma === value
                        );
                        return [item?.ninumaLabel || value, '当社'];
                      }
                      return [value, name];
                    }}
                  />
                  <Legend
                    payload={[
                      {
                        value: '一般的な制作会社',
                        type: 'square',
                        color: '#CBD5E1', // text-slate-300
                      },
                      {
                        value: '当社',
                        type: 'square',
                        color: '#6366F1', // text-indigo-500
                      },
                    ]}
                  />
                  <Bar
                    dataKey="traditional"
                    fill="#CBD5E1"
                    name="一般的な制作会社"
                    radius={[4, 4, 4, 4]}
                  >
                    <LabelList
                      dataKey="traditionalLabel"
                      position={isMobile ? 'right' : 'top'}
                      style={{ fontSize: '12px', fill: '#64748B' }}
                    />
                  </Bar>
                  <Bar
                    dataKey="ninuma"
                    fill="#6366F1"
                    name="当社"
                    radius={[4, 4, 4, 4]}
                  >
                    <LabelList
                      dataKey="ninumaLabel"
                      position={isMobile ? 'right' : 'top'}
                      style={{ fontSize: '12px', fill: '#4F46E5' }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparisonData.map((item) => (
                <div
                  key={item.item}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex items-center mb-2">
                    <h4 className="text-lg font-semibold mr-2">{item.item}</h4>
                    <span className="bg-indigo-100 text-indigo-600 text-sm px-2 py-1 rounded-full">
                      {item.saving}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 費用を抑える3つのアプローチ */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">
            コストを<span className="text-indigo-600">削減</span>
            する3つのアプローチ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {costSavingApproaches.map((approach, index) => (
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
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <span className="font-bold text-indigo-700">
                        {approach.benefit}
                      </span>
                    </div>
                    <p className="text-sm text-indigo-700">
                      {approach.explanation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTAセクション */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white text-center shadow-xl">
          <h3 className="text-2xl font-bold mb-4">
            費用対効果の高いホームページを作りませんか？
          </h3>
          <p className="mb-6">
            お客様のビジネスに必要な機能を見極め、無駄のないホームページ制作でコストを最適化します。
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/estimate?service=homepage">
              無料見積もりを依頼する
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default HomepageCostPerformanceSection;
