'use client';

import type React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kit/ui/tooltip';
import { comparisonData } from '../../_data/homepageComparisonData';

const HomepageComparisonTable: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
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
                                    ? 'bg-primary/20 text-primary'
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
                                    ? 'bg-primary/20 text-primary'
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
                                    ? 'bg-primary/20 text-primary border border-primary/40'
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
          <div className="bg-primary/20 text-primary w-6 h-6 flex items-center justify-center rounded-full border border-primary/40 mr-1">
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
  );
};

export default HomepageComparisonTable;
