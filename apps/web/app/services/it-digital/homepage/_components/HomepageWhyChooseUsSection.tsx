'use client';

import type React from 'react';
import Container from '~/components/custom/container';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kit/ui/tooltip';
import ReasonCard from '../../_common/ReasonCard';
import DevelopmentPrinciple from '../../_common/DevelopmentPrinciple';
import {
  reasonCards,
  developmentPrinciples,
  relationshipMetrics,
} from '../_data/whyChooseUsData';
import { comparisonData } from '../_data/homepageComparisonData';

const HomepageWhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-indigo-50">
      <Container>
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-2">
          ニイヌマ企画印刷が
          <span className="text-indigo-600">選ばれる理由</span>
        </h2>

        <p className="text-lg text-center text-gray-700 mb-12 max-w-3xl mx-auto">
          私たちはただホームページを作るだけでなく、お客様の事業の成功を
          <span className="font-semibold">一緒に考えるパートナー</span>
          として選ばれ続けています
        </p>

        {/* 選ばれる理由カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reasonCards.map((card) => (
            <ReasonCard key={`reason-card-${card.title}`} data={card} />
          ))}
        </div>

        {/* 比較表セクション */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-xl font-semibold text-center mb-6">
            ホームページ制作方法の比較
          </h3>
          <div className="relative overflow-hidden">
            <div className="overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
              <div className="md:hidden text-gray-500 text-xs text-center mb-2 animate-pulse">
                ← 左右にスワイプして比較できます →
              </div>
              <table className="w-full text-sm min-w-[640px] border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-center w-[25%] sticky left-0 z-10 border-r shadow-sm">
                      比較ポイント
                    </th>
                    <th className="px-4 py-3 text-center w-[25%]">
                      従来型制作会社
                    </th>
                    <th className="px-4 py-3 text-center w-[25%]">
                      テンプレート型サービス
                    </th>
                    <th className="px-4 py-3 text-center w-[25%]">
                      ニイヌマ企画印刷
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {comparisonData.map((item, index) => (
                    <tr
                      key={item.item.id}
                      className={
                        index < comparisonData.length - 1 ? 'border-b' : ''
                      }
                    >
                      <td className="px-4 py-3 font-medium bg-white sticky left-0 z-10 border-r shadow-sm">
                        <div className="flex items-center">
                          <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                            <span className="text-gray-600">
                              {item.item.name.charAt(0)}
                            </span>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help">
                                  {item.item.name}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                {item.item.description}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </td>

                      {/* 従来型 */}
                      <td className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className={`
																	flex items-center justify-center
																	w-8 h-8 mb-1 rounded-full cursor-help
																	${
                                    item.traditional.rating === '◎'
                                      ? 'bg-indigo-100 text-indigo-600'
                                      : item.traditional.rating === '○'
                                        ? 'bg-green-100 text-green-600'
                                        : item.traditional.rating === '△'
                                          ? 'bg-yellow-100 text-yellow-600'
                                          : 'bg-red-100 text-red-600'
                                  }
																`}
                                >
                                  <span className="text-lg font-bold">
                                    {item.traditional.rating}
                                  </span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                {item.traditional.description}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </td>

                      {/* テンプレート型 */}
                      <td className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className={`
																	flex items-center justify-center
																	w-8 h-8 mb-1 rounded-full cursor-help
																	${
                                    item.template.rating === '◎'
                                      ? 'bg-indigo-100 text-indigo-600'
                                      : item.template.rating === '○'
                                        ? 'bg-green-100 text-green-600'
                                        : item.template.rating === '△'
                                          ? 'bg-yellow-100 text-yellow-600'
                                          : 'bg-red-100 text-red-600'
                                  }
																`}
                                >
                                  <span className="text-lg font-bold">
                                    {item.template.rating}
                                  </span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                {item.template.description}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </td>

                      {/* ニイヌマ企画印刷 */}
                      <td className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className={`
																	flex items-center justify-center
																	w-8 h-8 mb-1 rounded-full cursor-help
																	${
                                    item.ninuma.rating === '◎'
                                      ? 'bg-indigo-200 text-indigo-700 border-2 border-indigo-400'
                                      : item.ninuma.rating === '○'
                                        ? 'bg-green-100 text-green-600'
                                        : item.ninuma.rating === '△'
                                          ? 'bg-yellow-100 text-yellow-600'
                                          : 'bg-red-100 text-red-600'
                                  }
																`}
                                >
                                  <span className="text-lg font-bold">
                                    {item.ninuma.rating}
                                  </span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                {item.ninuma.description}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="absolute top-[40%] -left-2 md:hidden pointer-events-none opacity-40">
              <div className="w-6 h-12 bg-gray-300 rounded-r-full flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>左スクロール</title>
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </div>
            </div>
            <div className="absolute top-[40%] -right-2 md:hidden pointer-events-none opacity-40">
              <div className="w-6 h-12 bg-gray-300 rounded-l-full flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>右スクロール</title>
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center mt-4 gap-3 text-sm">
            <div className="flex items-center m-1">
              <div className="bg-indigo-100 text-indigo-600 w-6 h-6 flex items-center justify-center rounded-full border-2 border-indigo-400 mr-1">
                <span className="font-bold">◎</span>
              </div>
              <span>とても良い</span>
            </div>
            <div className="flex items-center m-1">
              <div className="bg-green-100 text-green-600 w-6 h-6 flex items-center justify-center rounded-full mr-1">
                <span className="font-bold">○</span>
              </div>
              <span>良い</span>
            </div>
            <div className="flex items-center m-1">
              <div className="bg-yellow-100 text-yellow-600 w-6 h-6 flex items-center justify-center rounded-full mr-1">
                <span className="font-bold">△</span>
              </div>
              <span>普通</span>
            </div>
            <div className="flex items-center m-1">
              <div className="bg-red-100 text-red-600 w-6 h-6 flex items-center justify-center rounded-full mr-1">
                <span className="font-bold">×</span>
              </div>
              <span>あまり良くない</span>
            </div>
          </div>
        </div>

        {/* 顧客との関係性を表現するセクション */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-indigo-600">制作会社ではなく</span>
                <br />
                気軽に相談できる身近なパートナー
              </h3>
              <p className="text-gray-700 mb-6">
                「ホームページのことはよくわからない」というお客様でも安心して相談できる関係づくりを大切にしています。
                専門用語を使わず、わかりやすく説明し、制作後も困ったときにすぐ対応します。
              </p>
              <ul className="space-y-3">
                {relationshipMetrics.map((metric) => (
                  <li
                    key={`metric-${metric.metric}`}
                    className="flex items-start"
                  >
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>チェックマーク</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      {metric.metric}{' '}
                      <span className="font-semibold">{metric.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 relative h-64 md:h-80 rounded-lg overflow-hidden">
              <Image
                src="/images/partnership.jpg" // 実際の画像に置き換える必要があります
                alt="顧客との長期的なパートナーシップ"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 開発思想や原則を示すコールアウト */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">
            ニイヌマ企画印刷の制作5つの約束
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            {developmentPrinciples.map((principle) => (
              <DevelopmentPrinciple
                key={`principle-${principle.number}`}
                data={principle}
                total={developmentPrinciples.length}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomepageWhyChooseUsSection;
