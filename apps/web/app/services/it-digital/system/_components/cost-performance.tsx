'use client';

import type React from 'react';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Container from '~/components/custom/container';
import { Button } from '@kit/ui/button';
import { Card, CardContent } from '@kit/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
} from 'recharts';
import Link from 'next/link';
import { plans } from '../_data/pricingData';
import {
  calculateRoiData,
  defaultRoiParams,
  type RoiPeriod,
  getRoiRecoveryData,
} from '~/utils/roi-calculation';

// 従来との比較データを変更 - 実際の数値を表示
const comparisonData = [
  {
    item: '初期費用',
    traditional: 100,
    traditionalLabel: '300〜1,000万円',
    ninuma: 45,
    ninumaLabel: '68〜200万円',
    trendText: '初期費用55%削減',
    description:
      '必要な機能だけに絞り、無駄のない開発をすることで大幅にコストダウン',
    saving: '55%削減',
  },
  {
    item: '開発期間',
    traditional: 100,
    traditionalLabel: '6〜12ヶ月',
    ninuma: 22,
    ninumaLabel: '1〜3ヶ月',
    trendText: '開発期間78%短縮',
    description:
      '最新の開発ツールと効率的な開発手法により、従来より短期間での納品が可能',
    saving: '78%短縮',
  },
  {
    item: '投資回収期間',
    traditional: 100,
    traditionalLabel: '2〜3年',
    ninuma: 40,
    ninumaLabel: '約1年',
    trendText: '投資回収60%短縮',
    description:
      '効果の高い機能から段階的に開発し、早期から投資効果を実感できる方式を採用',
    saving: '60%短縮',
  },
];

// 技術スタックとアプローチのデータを改良版に修正
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

const SystemCostPerformanceSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [roiPeriod, setRoiPeriod] = useState<RoiPeriod>('18m'); // ROI表示期間の状態

  // ROIデータを期間に応じてメモ化
  const currentRoiData = useMemo(
    () => calculateRoiData(roiPeriod, defaultRoiParams),
    [roiPeriod]
  );

  // ROIグラフのY軸ドメインを動的に計算
  const yAxisDomain = useMemo(() => {
    const allValues = currentRoiData.flatMap((d) => [d.traditional, d.ninuma]);
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const buffer = Math.max(Math.abs(min), Math.abs(max)) * 0.1; // 10%のバッファ
    return [
      Math.floor((min - buffer) / 50) * 50, // 50単位で切り捨て
      Math.ceil((max + buffer) / 50) * 50, // 50単位で切り上げ
    ];
  }, [currentRoiData]);

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

  // 期間に応じた結論テキストを生成
  const getRoiConclusion = () => {
    const recoveryData = getRoiRecoveryData(currentRoiData);
    if (!recoveryData) return null;

    const {
      lastData,
      traditionalRecoveryMonthData,
      ninumaRecoveryMonthData,
      lastTraditionalBalance,
      lastNinumaBalance,
    } = recoveryData;

    return (
      <>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2" />
          <span>
            従来型：
            {lastTraditionalBalance < 0 ? (
              <>
                <strong>{lastData.month}後も投資回収できず</strong> (
                {Math.round(lastTraditionalBalance)}万円)
              </>
            ) : traditionalRecoveryMonthData ? (
              <>
                <strong>
                  {traditionalRecoveryMonthData.month}頃に投資回収
                </strong>{' '}
                ({lastData.month}時点: {Math.round(lastTraditionalBalance)}万円)
              </>
            ) : (
              'データが不足しています'
            )}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-600 rounded-full mr-2" />
          <span>
            ニイヌマ企画印刷：
            {lastNinumaBalance < 0 ? (
              <>
                <strong>{lastData.month}後も投資回収できず</strong> (
                {Math.round(lastNinumaBalance)}万円)
              </>
            ) : ninumaRecoveryMonthData ? (
              <>
                <strong>{ninumaRecoveryMonthData.month}頃に投資回収</strong>し、
                {lastData.month}時点では{Math.round(lastNinumaBalance)}
                万円の利益
              </>
            ) : (
              'データが不足しています'
            )}
          </span>
        </div>
      </>
    );
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            最大<span className="text-blue-600">55%お得</span>なシステム開発
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            従来の業務システム開発と比較して、より短期間で、より低コストで、
            より高い投資対効果を実現します
          </p>
        </div>

        {/* 従来の開発との比較 - 棒グラフ版 */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">
              従来のシステム開発と比較
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              一般的な業務システム開発よりも圧倒的なコスト効率を実現
            </p>
          </div>

          {/* カードデザイン - モバイルとデスクトップ共通 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparisonData.map((item) => (
              <div
                key={item.item}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-5 border-b">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold">{item.item}</h4>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>上昇トレンド</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      {item.trendText}
                    </div>
                  </div>
                </div>

                <div className="p-1">
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[item]}
                        layout="horizontal"
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 10,
                        }}
                        barGap={12}
                        barSize={40}
                      >
                        <CartesianGrid
                          vertical={false}
                          strokeDasharray="3 3"
                          opacity={0.3}
                        />
                        <XAxis hide />
                        <YAxis hide />
                        <Bar dataKey="traditional" name="従来型" fill="#ef4444">
                          <LabelList
                            dataKey="traditionalLabel"
                            position="top"
                            style={{ fill: '#666', fontSize: 12 }}
                          />
                        </Bar>
                        <Bar
                          dataKey="ninuma"
                          name="ニイヌマ企画印刷"
                          fill="#2563eb"
                        >
                          <LabelList
                            dataKey="ninumaLabel"
                            position="top"
                            style={{
                              fill: '#2563eb',
                              fontSize: 12,
                              fontWeight: 'bold',
                            }}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="px-5 py-4 bg-gray-50">
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none text-green-600">
                      {item.saving}
                    </div>
                    <div className="leading-snug text-gray-600">
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROIグラフ */}
        <div className="mb-16">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold mb-2">投資対効果（ROI）の比較</h3>
            <p className="text-gray-600">
              初期開発費と月額運用費を含めた投資回収シミュレーション
            </p>
          </div>

          {/* 期間切り替えボタン */}
          <div className="flex justify-center gap-2 mb-4">
            <Button
              variant={roiPeriod === '18m' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setRoiPeriod('18m')}
            >
              18ヶ月
            </Button>
            <Button
              variant={roiPeriod === '3y' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setRoiPeriod('3y')}
            >
              3年
            </Button>
            <Button
              variant={roiPeriod === '5y' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setRoiPeriod('5y')}
            >
              5年
            </Button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={currentRoiData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis
                    tickFormatter={(value) =>
                      `${value > 0 ? '+' : ''}${value}万円`
                    }
                    domain={yAxisDomain} // 動的ドメインを使用
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => {
                      const formattedValue = value.toFixed(1); // 小数点第一位まで表示
                      const numericValue = Number.parseFloat(formattedValue); // 数値に変換
                      const label =
                        name === 'traditional' ? '従来型' : 'ニイヌマ企画印刷';
                      return [
                        `${numericValue > 0 ? '+' : ''}${formattedValue}万円`,
                        label,
                      ];
                    }}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Legend
                    payload={[
                      {
                        value: '従来型開発',
                        type: 'line',
                        color: '#ef4444',
                      },
                      {
                        value: 'ニイヌマ企画印刷',
                        type: 'line',
                        color: '#2563eb',
                      },
                    ]}
                  />
                  <ReferenceLine
                    y={0}
                    stroke="#059669"
                    strokeWidth={2}
                    strokeDasharray="0 0"
                    label={{
                      value: '投資回収ライン',
                      position: 'insideTopRight',
                      fill: '#059669',
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="traditional"
                    stroke="#ef4444"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                    name="traditional" // nameをdataKeyと一致させる
                  />
                  <Line
                    type="monotone"
                    dataKey="ninuma"
                    stroke="#2563eb"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                    name="ninuma" // nameをdataKeyと一致させる
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 動的に更新される結論部分 */}
            <div className="mt-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-8 flex-wrap">
                {getRoiConclusion()}
              </div>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                <p className="mb-2 font-medium">※試算条件</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    初期投資: 従来型{defaultRoiParams.traditional.initialCost}
                    万円 vs ニイヌマ企画印刷
                    {defaultRoiParams.ninuma.initialCost}万円（
                    {Math.round(
                      (1 -
                        defaultRoiParams.ninuma.initialCost /
                          defaultRoiParams.traditional.initialCost) *
                        100
                    )}
                    %削減）
                  </li>
                  <li>
                    月額運用費: 従来型{defaultRoiParams.traditional.monthlyCost}
                    万円/月 vs ニイヌマ企画印刷
                    {defaultRoiParams.ninuma.monthlyCost}万円/月
                  </li>
                  <li>月間効果（業務効率化・売上増加）:</li>
                  <ul className="list-disc pl-5 mt-1">
                    <li>両社とも初月から効果が発生し、徐々に増加</li>
                    <li>
                      従来型: 初期{defaultRoiParams.traditional.initialEffect}
                      万円/月から最大
                      {defaultRoiParams.traditional.maxEffect}万円/月まで増加
                    </li>
                    <li>
                      ニイヌマ企画印刷: 初期
                      {defaultRoiParams.ninuma.initialEffect}万円/月から最大
                      {defaultRoiParams.ninuma.maxEffect}
                      万円/月まで増加（継続的改善により）
                    </li>
                  </ul>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 技術スタックとアプローチ */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">
              なぜこの価格が実現できるのか？
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              私たちは最新の方法で開発コストを大幅に削減し、お客様に還元しています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <h4 className="text-lg font-semibold mb-2">
                      {approach.title}
                    </h4>
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
        </div>

        {/* 簡易的な料金プラン表示 */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">わかりやすい料金プラン</h3>
            <p className="text-gray-600">
              お客様の規模やニーズに合わせた3つのプランをご用意しています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <div
                key={plan.title}
                className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4"
                style={{ borderTopColor: `var(--${plan.color}-500)` }}
              >
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-1">
                    {plan.targetAudience}
                  </p>
                  <h4 className="text-xl font-bold mb-4">{plan.title}</h4>

                  <div className="mb-4">
                    <div className="text-gray-400 line-through text-sm">
                      {plan.originalPrice}
                    </div>
                    <div className="text-2xl font-bold">
                      {plan.price}
                      <span className="text-green-500 text-sm font-normal ml-1">
                        ({plan.discountPercentage}OFF)
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm">
                      {plan.monthlyPrice}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">主な機能：</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {plan.features.slice(0, 2).map((feature, index) => (
                        <li
                          key={`${plan.title}-feature-${index}`}
                          className="flex items-start"
                        >
                          <svg
                            className="h-5 w-5 text-green-500 mr-1 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <title>チェックマークアイコン</title>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="#pricing">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                詳しい料金プランを見る
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SystemCostPerformanceSection;
