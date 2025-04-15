'use client';

import type React from 'react';
import Link from 'next/link';
import type { BasePackageProps } from './types';

/**
 * ベースパッケージカードコンポーネント
 * サービスの基本プランを表示するためのカード
 */
const BasePackageCard: React.FC<BasePackageProps> = ({
  title,
  startingPrice,
  description,
  features,
  monthlyPayment,
}) => {
  return (
    <div className="flex flex-col justify-between bg-card rounded-lg shadow-lg border border-primary overflow-hidden h-full">
      <div>
        <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
          ベースパッケージ
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-center mb-2">{title}</h3>

          <div className="text-center mb-6">
            {/* 価格表示エリア */}
            <div className="bg-primary/10 rounded-lg p-4 shadow-sm mb-3">
              {/* 通常価格（打ち消し線付き） */}
              <div className="mb-1 text-muted-foreground">
                <span className="line-through text-lg">
                  通常価格: {startingPrice.standardPrice.value}
                  {startingPrice.standardPrice.unit}
                </span>
              </div>

              {/* メイン価格表示 */}
              <div className="flex justify-center items-baseline">
                <div className="text-4xl font-bold text-primary">
                  {startingPrice.value}
                </div>
                <div className="text-xl text-primary ml-1">
                  {startingPrice.unit}
                </div>
                <div className="text-muted-foreground ml-2 text-lg">〜</div>
              </div>

              {/* 割引率表示 */}
              <div className="mt-2 inline-block bg-background rounded-full py-1 px-4 shadow-sm border border-border">
                <p className="text-sm font-medium text-foreground">
                  <span className="text-destructive font-bold">
                    {startingPrice.discount}
                  </span>
                </p>
              </div>

              {/* 分割払い情報の表示 */}
              {monthlyPayment && (
                <div className="mt-3 bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                  <p className="text-base font-medium text-yellow-800">
                    <span className="font-bold">分割払い可能</span>: 月々{' '}
                    <span className="text-lg font-bold">
                      {monthlyPayment.value}
                    </span>
                    {monthlyPayment.unit} × {monthlyPayment.duration}
                  </p>
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {/* 2カラムのfeatures表示 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-6">
            {features.map((feature, index) => {
              const featureKey = `${title}-${feature.replace(/\s+/g, '-').toLowerCase()}-${index}`;
              return (
                <div key={featureKey} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
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
                  <span className="text-sm">{feature}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-primary/5 p-3 text-center text-sm text-primary">
        <p>お客様の要件に合わせてカスタマイズ可能</p>
      </div>
    </div>
  );
};

export default BasePackageCard;
