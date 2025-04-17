import type { PricingSectionProps } from '../../_common/pricing';
import type React from 'react';

// 説明文
export const description = (
  <>
    ニーズや予算に合わせて、最適な
    <span className="font-semibold text-primary">ホームページ制作プラン</span>
    をご用意しています
  </>
);

// 分割払い情報
export const paymentInfo = {
  title: '分割払いで導入しやすく',
  description: (
    <>
      <p className="text-lg mb-3">
        <span className="font-bold text-red-600 text-xl">金利0%</span>
        の分割払いで、初期投資の負担を軽減できます
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="font-bold text-center mb-2">12回払いの場合</p>
          <p className="text-center text-lg">
            月々<span className="font-bold text-xl">2.5万円</span>から
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="font-bold text-center mb-2">一括払いの場合</p>
          <p className="text-center">
            <span className="font-bold text-lg">5%割引</span>特典あり
          </p>
        </div>
      </div>
    </>
  ),
};

export const homepagePricingData: Omit<PricingSectionProps, 'id'> = {
  title: '料金プラン',
  description,
  benefitText:
    'Next.js × Supabase × AI駆動開発による40%以上のコスト削減・明確な料金体系・短納期',
  serviceData: {
    basePackage: {
      title: 'ホームページベースパッケージ',
      startingPrice: {
        value: 30,
        unit: '万円',
        standardPrice: {
          value: 50,
          unit: '万円',
        },
        discount: '40%OFF',
      },
      description:
        '高速・高パフォーマンスなNext.jsコーポレートサイトの基本パッケージ',
      features: [
        'レスポンシブデザイン',
        '5ページ構成',
        'SEO対策',
        'お問い合わせフォーム',
        'Google Analytics連携',
        '月1回の更新サポート（3ヶ月間）',
      ],
      monthlyPayment: {
        value: 2.5,
        unit: '万円',
        duration: '12回',
      },
    },
  },
  notes: [
    '表示価格はベースとなる最低料金です。実際のプロジェクト要件により変動します。',
    '各オプションの価格は標準的な実装の場合の参考価格です。複雑さにより変動する場合があります。',
    '修正対応は初期要件定義の範囲内であれば無制限で対応いたします。',
    '納品後のサポートや保守契約は別途ご相談ください。',
    '詳細な見積もりは自動見積もりシステムをご利用いただくか、お問い合わせください。',
  ],
  estimateProps: {
    title: '無料お見積り・ご相談',
    description:
      'ホームページ制作に関するご質問や具体的なお見積りをご希望の方は、お気軽にご相談ください。',
    features: [
      {
        title: 'スピーディーな対応',
        description: 'お問い合わせから最短1営業日以内にご連絡いたします。',
        icon: (
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
            <title>迅速な対応を表す時計アイコン</title>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        ),
        color: 'blue',
      },
      {
        title: '無料相談・お見積り',
        description: '初回のご相談とお見積りは完全無料です。',
        icon: (
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
            <title>お見積りを表す書類アイコン</title>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        ),
        color: 'indigo',
      },
      {
        title: 'プロのアドバイス',
        description: 'Web制作の専門家が最適なプランをご提案します。',
        icon: (
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
            <title>プロのアドバイスを表すチームアイコン</title>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
        color: 'purple',
      },
      {
        title: '明確な料金提示',
        description: '追加費用が発生しない明朗会計で安心です。',
        icon: (
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
            <title>明確な料金を表す円マークアイコン</title>
            <circle cx="12" cy="12" r="10" />
            <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
            <line x1="12" y1="18" x2="12" y2="21" />
            <line x1="12" y1="3" x2="12" y2="6" />
          </svg>
        ),
        color: 'green',
      },
    ],
    cta: {
      title: 'まずはお気軽にご相談ください',
      description: 'お電話またはメールフォームよりお問い合わせいただけます。',
      buttonText: '無料相談する',
      buttonLink: '/contact',
      disclaimer: '※ご相談は完全無料・営業の強要はありません',
    },
  },
  paymentInfo,
};
