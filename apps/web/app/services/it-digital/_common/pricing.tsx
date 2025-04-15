'use client';

import type React from 'react';
import Container from '../../../../components/custom/container';
import Link from 'next/link';
import SectionTitle from './section-title';

export type BasePackageProps = {
  title: string;
  startingPrice: {
    value: number;
    unit: string;
    standardPrice: {
      value: number;
      unit: string;
    };
    discount: string;
  };
  description: string;
  features: string[];
  color: 'teal' | 'blue' | 'purple';
  cta: {
    text: string;
    link: string;
  };
  monthlyPayment?: {
    value: number;
    unit: string;
    duration: string;
  };
};

export type OptionProps = {
  title: string;
  price: {
    value: number;
    unit: string;
    standardPrice: {
      value: number;
      unit: string;
    };
  };
  description: string;
  recommended?: boolean;
};

export type CaseStudyProps = {
  title: string;
  description: string;
  basePrice: {
    value: number;
    unit: string;
  };
  options: Array<{
    name: string;
    value: number;
    unit: string;
  }>;
  totalPrice: {
    value: number;
    unit: string;
    standardPrice: {
      value: number;
      unit: string;
    };
    discount: string;
  };
};

const BasePackageCard: React.FC<BasePackageProps> = ({
  title,
  startingPrice,
  description,
  features,
  color,
  cta,
  monthlyPayment,
}) => {
  // 色に基づいたクラス名を定義
  const colorClasses = {
    teal: {
      bg: 'bg-teal-500',
      border: 'border-teal-500',
      gradient: 'from-teal-500 to-teal-700',
      hoverGradient: 'hover:from-teal-600 hover:to-teal-800',
      priceBg: 'bg-teal-50',
      priceText: 'text-teal-800',
    },
    blue: {
      bg: 'bg-blue-500',
      border: 'border-blue-500',
      gradient: 'from-blue-500 to-blue-700',
      hoverGradient: 'hover:from-blue-600 hover:to-blue-800',
      priceBg: 'bg-blue-50',
      priceText: 'text-blue-800',
    },
    purple: {
      bg: 'bg-purple-500',
      border: 'border-purple-500',
      gradient: 'from-purple-500 to-purple-700',
      hoverGradient: 'hover:from-purple-600 hover:to-purple-800',
      priceBg: 'bg-purple-50',
      priceText: 'text-purple-800',
    },
  };

  // 選択された色のクラスを取得
  const selectedColor = colorClasses[color];

  return (
    <div
      className={`flex flex-col justify-between bg-white rounded-lg shadow-lg border-2 ${selectedColor.border} overflow-hidden h-full`}
    >
      <div>
        <div
          className={`${selectedColor.bg} text-white text-center py-2 text-sm font-medium`}
        >
          ベースパッケージ
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-center mb-2">{title}</h3>

          <div className="text-center mb-6">
            {/* 価格表示エリア - 洗練されたデザイン */}
            <div
              className={`${selectedColor.priceBg} rounded-lg p-4 shadow-sm mb-3`}
            >
              {/* 通常価格（打ち消し線付き） */}
              <div className="mb-1 text-gray-500">
                <span className="line-through text-lg">
                  通常価格: {startingPrice.standardPrice.value}
                  {startingPrice.standardPrice.unit}
                </span>
              </div>

              {/* メイン価格表示 - 大きく目立つように */}
              <div className="flex justify-center items-baseline">
                <div
                  className={`text-4xl font-bold ${selectedColor.priceText}`}
                >
                  {startingPrice.value}
                </div>
                <div className={`text-xl ${selectedColor.priceText} ml-1`}>
                  {startingPrice.unit}
                </div>
                <div className="text-gray-500 ml-2 text-lg">〜</div>
              </div>

              {/* 割引率表示 - 洗練された形で */}
              <div className="mt-2 inline-block bg-white rounded-full py-1 px-4 shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-700">
                  <span className="text-red-600 font-bold">
                    {startingPrice.discount}
                  </span>
                </p>
              </div>

              {/* 分割払い情報の表示 - 強調 */}
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

            <p className="text-sm text-gray-600">{description}</p>
          </div>

          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => {
              const featureKey = `${title}-${feature.replace(/\s+/g, '-').toLowerCase()}-${index}`;
              return (
                <li key={featureKey} className="flex items-start">
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
                  <span>{feature}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <div className="text-center pb-6 px-6">
          <Link
            href={cta.link}
            className={`inline-block w-full py-2 px-4 bg-gradient-to-r ${selectedColor.gradient} text-white font-medium rounded-md transition-all duration-200 ${selectedColor.hoverGradient}`}
          >
            {cta.text}
          </Link>
        </div>
        <div className="bg-blue-50 p-3 text-center text-sm text-blue-700">
          <p>お客様の要件に合わせてカスタマイズ可能</p>
        </div>
      </div>
    </div>
  );
};

type EstimateFeature = {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'blue' | 'indigo' | 'purple' | 'green';
};

type PaymentInfo = {
  title: string;
  description: React.ReactNode;
};

export type PricingSectionProps = {
  title?: string;
  highlightedText?: string;
  afterHighlightedText?: string;
  description?: React.ReactNode;
  benefitText?: string;
  serviceData: {
    basePackage: BasePackageProps;
  };
  estimateProps?: {
    title: string;
    description: string;
    features: EstimateFeature[];
    cta: {
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
      disclaimer?: string;
    };
  };
  paymentInfo?: PaymentInfo;
  notes?: string[];
  id?: string;
};

const PricingSection: React.FC<PricingSectionProps> = ({
  title = '料金プラン',
  highlightedText,
  afterHighlightedText,
  description,
  benefitText = 'Next.js × Supabase × AI駆動開発による40%以上のコスト削減・明確な料金体系・短納期',
  serviceData,
  estimateProps,
  paymentInfo,
  notes = [
    '表示価格はベースとなる最低料金です。実際のプロジェクト要件により変動します。',
    '修正対応は初期要件定義の範囲内であれば無制限で対応いたします。',
    '納品後のサポートや保守契約は別途ご相談ください。',
    '詳細な見積もりは自動見積もりシステムをご利用いただくか、お問い合わせください。',
  ],
  id,
}) => {
  // カラーマッピング
  const colorMappings = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-800',
      iconColor: 'text-primary',
    },
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-500',
      text: 'text-indigo-800',
      iconColor: 'text-indigo-600',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-500',
      text: 'text-purple-800',
      iconColor: 'text-purple-600',
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-800',
      iconColor: 'text-green-600',
    },
  };

  return (
    <section id={id} className="py-16 lg:py-32 bg-gray-50">
      <Container>
        <SectionTitle
          title={title}
          highlightedText={highlightedText}
          afterHighlightedText={afterHighlightedText}
          description={
            typeof description === 'string' ? description : undefined
          }
          className="mb-8"
        />

        {typeof description !== 'string' && description && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="text-center text-lg mb-2">{description}</div>
          </div>
        )}

        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-center text-base bg-green-50 p-2 rounded-md text-green-800 font-medium">
            {benefitText}
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-10">
          <div className="space-y-10">
            {/* ベースパッケージのみを表示 */}
            <BasePackageCard {...serviceData.basePackage} />

            {/* オプション機能と導入事例のセクションは削除されました */}
          </div>
        </div>

        {estimateProps && (
          <div className="max-w-5xl mx-auto my-16 relative overflow-visible">
            {/* メインカード */}
            <div className="bg-white rounded-xl shadow-lg relative z-10 overflow-hidden border border-gray-100">
              <div className="grid md:grid-cols-5 items-stretch">
                <div className="md:col-span-3 p-8 md:p-10">
                  <div className="mb-3 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>AI見積もりアイコン</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                      {estimateProps.title}
                    </h3>
                  </div>

                  <p className="text-gray-700 mb-6 text-lg">
                    {estimateProps.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {estimateProps.features.map((feature, index) => {
                      const colors = colorMappings[feature.color];
                      const featureKey = `estimate-feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}-${index}`;
                      return (
                        <div
                          key={featureKey}
                          className={`flex items-start ${colors.bg} p-4 rounded-lg border-l-4 ${colors.border}`}
                        >
                          <div
                            className={`w-6 h-6 ${colors.iconColor} mr-3 mt-0.5`}
                          >
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className={`font-semibold ${colors.text}`}>
                              {feature.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-10 text-white flex flex-col justify-center relative overflow-hidden">
                  <h4 className="text-xl md:text-2xl font-bold mb-4 relative z-10">
                    {estimateProps.cta.title}
                  </h4>
                  <p className="font-medium mb-6 text-blue-100 relative z-10">
                    {estimateProps.cta.description}
                  </p>
                  <Link
                    href={estimateProps.cta.buttonLink}
                    className="bg-white text-primary hover:bg-blue-50 font-medium py-4 px-6 rounded-lg inline-block text-center transition-all duration-200 transform hover:scale-105 shadow-lg relative z-10"
                  >
                    {estimateProps.cta.buttonText}
                  </Link>
                  {estimateProps.cta.disclaimer && (
                    <p className="text-xs text-blue-200 mt-3 relative z-10">
                      {estimateProps.cta.disclaimer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx global>{`
          @keyframes blob {
            0% { transform: scale(1); }
            33% { transform: scale(1.1); }
            66% { transform: scale(0.9); }
            100% { transform: scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>

        {/* 分割払い情報を表示するセクション */}
        {paymentInfo && (
          <div className="max-w-5xl mx-auto mt-10 mb-10">
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg shadow-md p-6 border border-yellow-400">
              <h3 className="text-xl font-bold mb-4 text-center text-amber-800">
                {paymentInfo.title}
              </h3>
              <div className="text-center text-amber-900">
                {paymentInfo.description}
              </div>
            </div>
          </div>
        )}

        {notes && notes.length > 0 && (
          <div className="max-w-5xl mx-auto bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
            {notes.map((note, index) => {
              const noteKey = `note-${note.substring(0, 15).replace(/\s+/g, '-')}-${index}`;
              return (
                <p key={noteKey} className="mb-2 last:mb-0">
                  ※{note}
                </p>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
};

export default PricingSection;
