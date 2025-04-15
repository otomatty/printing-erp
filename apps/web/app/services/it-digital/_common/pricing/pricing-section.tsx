'use client';

import type React from 'react';
import Link from 'next/link';
import Container from '~/components/custom/container';
import SectionTitle from '../section-title';
import BasePackageCard from './base-package-card';
import { type PricingSectionProps, EstimateFeature } from './types';

/**
 * 料金プランを表示するセクションコンポーネント
 */
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
  // 見積もり機能のカラーマッピング
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

  // AI見積もりリンクを生成するヘルパー関数
  const getEstimateLink = (service?: string) => {
    // サービスに基づいてプロジェクトタイプを設定
    let projectType = 'website';

    if (service === 'system') {
      projectType = 'business_system';
    } else if (service === 'app') {
      projectType = 'application';
    }

    return `/contact?mode=ai-estimate&type=digital-services&service=${service || 'homepage'}&pre_selected=${projectType}`;
  };

  return (
    <section id={id} className="py-16 lg:py-32 bg-muted/30">
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
          <p className="text-center text-base bg-primary/10 p-2 rounded-md text-primary font-medium">
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
            <div className="bg-card rounded-xl shadow-lg relative z-10 overflow-hidden border border-border">
              <div className="grid md:grid-cols-5 items-stretch">
                <div className="md:col-span-3 p-8 md:p-10">
                  <div className="mb-3 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-primary-foreground"
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
                    <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                      {estimateProps.title}
                    </h3>
                  </div>

                  <p className="text-foreground mb-6 text-lg">
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
                            <p className="text-sm text-muted-foreground">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="md:col-span-2 bg-gradient-to-br from-primary to-secondary p-8 md:p-10 text-primary-foreground flex flex-col justify-center relative overflow-hidden">
                  <h4 className="text-xl md:text-2xl font-bold mb-4 relative z-10">
                    {estimateProps.cta.title}
                  </h4>
                  <p className="font-medium mb-6 text-primary-foreground/90 relative z-10">
                    {estimateProps.cta.description}
                  </p>
                  <Link
                    href={getEstimateLink(estimateProps.cta.service)}
                    className="bg-background text-primary font-medium py-4 px-6 rounded-lg inline-block text-center transition-all duration-200 transform hover:scale-105 shadow-lg relative z-10"
                  >
                    {estimateProps.cta.buttonText}
                  </Link>
                  {estimateProps.cta.disclaimer && (
                    <p className="text-xs text-primary-foreground/80 mt-3 relative z-10">
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
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg shadow-md p-6 border border-amber-300">
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
          <div className="max-w-5xl mx-auto bg-muted rounded-lg p-4 text-sm text-muted-foreground">
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
