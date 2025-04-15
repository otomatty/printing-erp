import type React from 'react';

/**
 * ベースパッケージのプロパティ型定義
 */
export type BasePackageProps = {
  /** パッケージのタイトル */
  title: string;
  /** 初期価格情報 */
  startingPrice: {
    /** 価格の値 */
    value: number;
    /** 価格の単位（例: '万円'） */
    unit: string;
    /** 標準価格（割引前価格） */
    standardPrice: {
      value: number;
      unit: string;
    };
    /** 割引率（例: '30%オフ'） */
    discount: string;
  };
  /** パッケージの説明文 */
  description: string;
  /** パッケージの機能リスト */
  features: string[];
  /** 分割払い情報（オプション） */
  monthlyPayment?: {
    /** 月額価格 */
    value: number;
    /** 価格単位 */
    unit: string;
    /** 分割期間 */
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

/**
 * 見積もり機能の特徴型定義
 */
export type EstimateFeature = {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'blue' | 'indigo' | 'purple' | 'green';
};

/**
 * 支払い情報の型定義
 */
export type PaymentInfo = {
  title: string;
  description: React.ReactNode;
};

/**
 * 料金セクションのプロパティ型定義
 */
export type PricingSectionProps = {
  /** セクションタイトル */
  title?: string;
  /** 強調するテキスト部分 */
  highlightedText?: string;
  /** 強調テキスト後のテキスト */
  afterHighlightedText?: string;
  /** セクション説明 */
  description?: React.ReactNode;
  /** メリットテキスト */
  benefitText?: string;
  /** サービスデータ */
  serviceData: {
    basePackage: BasePackageProps;
  };
  /** 見積もり機能プロパティ（オプション） */
  estimateProps?: {
    title: string;
    description: string;
    features: EstimateFeature[];
    cta: {
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
      /** サービスの種類（AI見積もりフォームで使用） */
      service?: string;
      disclaimer?: string;
    };
  };
  /** 支払い情報（オプション） */
  paymentInfo?: PaymentInfo;
  /** 注釈リスト */
  notes?: string[];
  /** セクションID */
  id?: string;
};
