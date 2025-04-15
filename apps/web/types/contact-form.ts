import type { ChangeEvent } from 'react';

// フォームのステップを表す型
export type FormStep =
  | 'inquiry-type'
  | 'user-info'
  | 'details'
  | 'confirmation'
  | 'complete';

// 問い合わせタイプの型定義
export type InquiryType =
  | 'print-services'
  | 'digital-services'
  | 'general-inquiry';

// ユーザー情報の型定義
export type UserInfoData = {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  preferredContact: string;
};

// 各フォームデータの基本型
export interface BaseFormData {
  inquiryType: InquiryType;
}

// 印刷サービスに関するお問い合わせタイプ
export type PrintInquiryType = 'estimate' | 'order' | 'question' | 'none';

// 印刷サービスに関するお問い合わせフォーム
export interface PrintServicesFormData extends BaseFormData {
  printingType: string; // 印刷物の種類（名刺・カード類、封筒、チラシなど）
  printInquiryType: PrintInquiryType; // 見積もり依頼、注文・発注、相談・質問
  contents: string; // 印刷物の詳細情報やその他要望を含む自由記述欄
  deadline: string; // 希望納期
  hasDesignData: boolean; // デザインデータの有無
}

// IT・デジタルサービスに関するお問い合わせフォーム
export interface DigitalServicesFormData extends BaseFormData {
  serviceType: string; // ウェブサイト制作、アプリ開発、システム開発など
  projectDescription: string;
  deadline: string;
  budget: string;
  otherRequests: string;
}

// その他のお問い合わせ・ご質問フォーム
export interface GeneralInquiryFormData extends BaseFormData {
  inquiryContent: string;
  preferredContactMethod: 'phone' | 'email' | 'either';
  preferredContactTime: string;
}

// 統合されたフォームデータ型
export type ContactFormData = UserInfoData &
  (PrintServicesFormData | DigitalServicesFormData | GeneralInquiryFormData);

// イベントハンドラ型
export type InputChangeHandler = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => void;

export type RadioChangeHandler = (name: string, value: string) => void;
