'use client';

import type React from 'react';
import Image from 'next/image';

type PartnershipSectionProps = {
  accentColor: 'indigo' | 'blue';
  serviceType: string;
  titlePrefix: string;
  metrics: Array<{ metric: string; value: string }>;
  hasPadding?: boolean;
};

const PartnershipSection: React.FC<PartnershipSectionProps> = ({
  accentColor,
  serviceType,
  titlePrefix,
  metrics,
  hasPadding = false,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg mb-16 p-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold mb-4">
            <span className="text-primary">{titlePrefix}ではなく</span>
            <br />
            気軽に相談できるパートナー
          </h3>
          <p className="text-gray-700 mb-6">
            「{serviceType}
            のことはよくわからない」というお客様でも安心して相談できる関係づくりを大切にしています。
            専門用語を使わず、わかりやすく説明し、
            {serviceType === 'ホームページ' ? '制作後も' : '導入後も'}
            困ったときにすぐ対応します。
          </p>
          <ul className="space-y-3">
            {metrics.map((metric) => (
              <li key={`metric-${metric.metric}`} className="flex items-start">
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
        <div className="w-full md:w-1/2 relative h-60 md:h-80 rounded-lg md:rounded-none md:rounded-tr-lg md:rounded-br-lg overflow-hidden">
          <Image
            src="/images/it-digital/partnership.webp"
            alt="顧客との長期的なパートナーシップ"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PartnershipSection;
