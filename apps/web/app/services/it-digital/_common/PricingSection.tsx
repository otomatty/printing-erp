'use client';

import type React from 'react';
import Container from '~/components/custom/container';
import Link from 'next/link';

export type PlanCardProps = {
  color: 'teal' | 'blue' | 'purple';
  targetAudience: string;
  title: string;
  originalPrice: string;
  price: string;
  discountPercentage: string;
  monthlyPrice: string;
  features: string[];
  deliveryPeriod: string;
};

const PlanCard: React.FC<PlanCardProps> = ({
  color,
  targetAudience,
  title,
  originalPrice,
  price,
  discountPercentage,
  monthlyPrice,
  features,
  deliveryPeriod,
}) => {
  // 色に基づいたクラス名を定義
  const colorClasses = {
    teal: {
      bg: 'bg-teal-500',
      border: 'border-teal-500',
    },
    blue: {
      bg: 'bg-blue-500',
      border: 'border-blue-500',
    },
    purple: {
      bg: 'bg-purple-500',
      border: 'border-purple-500',
    },
  };

  // 選択された色のクラスを取得
  const selectedColor = colorClasses[color];

  return (
    <div
      className={` flex flex-col justify-between bg-white rounded-lg shadow-lg border-2 ${selectedColor.border} overflow-hidden transform transition duration-300 ${color === 'blue' ? 'relative z-10' : ''}`}
    >
      <div>
        <div
          className={`${selectedColor.bg} text-white text-center py-1 text-sm font-medium`}
        >
          {targetAudience}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
          <div className="text-center mb-4">
            <div className="flex justify-center items-center">
              <div className="text-gray-400 line-through mr-2">
                {originalPrice}
              </div>
              <div className="text-3xl font-bold text-blue-600">{price}</div>
            </div>
            <p className="text-sm text-green-600 font-medium">
              従来比 {discountPercentage}お得
            </p>
            <div className="mt-2 bg-blue-50 px-3 py-1 rounded-full inline-block">
              <span className="text-blue-800 font-bold">{monthlyPrice}</span>
              <span className="text-xs text-gray-600">（12回分割時）</span>
            </div>
          </div>
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => {
              // 一意のキーを生成するためにfeatureとindexを組み合わせる
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
            href="/contact"
            className="inline-block w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-md transition-all duration-200 hover:from-blue-600 hover:to-blue-800"
          >
            お問い合わせ
          </Link>
        </div>
        <div className="bg-blue-50 p-3 text-center text-sm text-blue-700">
          <p>{deliveryPeriod}</p>
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

type PaymentOption = {
  title: string;
  description: string;
  isHighlighted?: boolean;
};

export type PricingSectionProps = {
  title?: string;
  description?: React.ReactNode;
  benefitText?: string;
  plans: PlanCardProps[];
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
  paymentOptions?: PaymentOption[];
  notes?: string[];
  id?: string;
};

const PricingSection: React.FC<PricingSectionProps> = ({
  title = '料金プラン',
  description,
  benefitText = '納品までの修正回数無制限・明確な料金体系・運用コスト40%削減',
  plans,
  estimateProps,
  paymentOptions = [
    {
      title: '一括払い',
      description: '一括払いで5%割引',
    },
    {
      title: '分割払い（最大12回）',
      description: '金利0%の分割払い',
      isHighlighted: true,
    },
  ],
  notes = [
    '料金は一般的な目安です。実際のプロジェクト内容により変動する場合があります。',
    '修正対応は「納品までの修正」と「納品後の修正」で区分され、納品前の修正は事前の仕様確認内容に基づく範囲で対応いたします。',
    '納品後の修正については、各プランの規定によります。スタンダード・ビジネスプランは納品後1ヶ月間、プレミアムプランは3ヶ月間の無料修正期間がございます。',
    '運用サポートは別途ご契約いただけます。',
  ],
  id,
}) => {
  // カラーマッピング
  const colorMappings = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-800',
      iconColor: 'text-blue-600',
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
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>

        <div className="max-w-4xl mx-auto mb-8">
          {description && (
            <div className="text-center text-lg mb-2">{description}</div>
          )}
          <p className="text-center text-base bg-green-50 p-2 rounded-md text-green-800 font-medium">
            {benefitText}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
          {plans.map((plan) => (
            <PlanCard key={plan.title} {...plan} />
          ))}
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
                    className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-4 px-6 rounded-lg inline-block text-center transition-all duration-200 transform hover:scale-105 shadow-lg relative z-10"
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

        {paymentOptions && paymentOptions.length > 0 && (
          <div className="max-w-5xl mx-auto mt-10">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-center">
                お支払いオプション
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentOptions.map((option, index) => {
                  const optionKey = `payment-option-${option.title.toLowerCase().replace(/\s+/g, '-')}`;
                  return (
                    <div
                      key={optionKey}
                      className={`${
                        option.isHighlighted
                          ? 'border-2 border-blue-500 bg-blue-50'
                          : 'border'
                      } rounded-lg p-4 text-center`}
                    >
                      <div className="font-medium text-lg mb-2">
                        {option.title}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {option.description.includes('5%割引') ? (
                          <>
                            一括払いで
                            <span className="text-blue-600 font-medium">
                              5%割引
                            </span>
                          </>
                        ) : option.description.includes('金利0%') ? (
                          <>
                            <span className="text-blue-600 font-medium">
                              金利0%
                            </span>
                            の分割払い
                          </>
                        ) : (
                          option.description
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {notes && notes.length > 0 && (
              <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
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
          </div>
        )}
      </Container>
    </section>
  );
};

export default PricingSection;
