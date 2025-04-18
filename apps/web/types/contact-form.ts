import type { ChangeEvent } from 'react';
import type { Json } from '@kit/supabase/database';

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
  | 'general-inquiry'
  | 'meeting-reservation';

// サーバーアクション用にユーザー情報型を拡張
export interface UserInfo {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  preferredContact: string;
  address?: string;
  postalCode?: string;
}

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

// デジタルサービス問い合わせ種別
export type DigitalServiceType = 'standard' | 'meeting';

// デジタルサービス問い合わせフォーム（auto-estimateは除外）
export type DigitalServicesFormData =
  | {
      inquiryType: 'digital-services';
      digitalServiceType: 'standard';
      projectDescription: string;
    }
  | {
      inquiryType: 'digital-services';
      digitalServiceType: 'meeting';
      meetingDatetime: string; // ISO8601
      meetingMethod: string; // オンライン/対面等
      notes?: string;
    };

// その他のお問い合わせ・ご質問フォーム
export interface GeneralInquiryFormData extends BaseFormData {
  inquiryContent: string;
  preferredContactMethod: 'phone' | 'email' | 'either';
  preferredContactTime: string;
}

// 統合されたフォームデータ型
export type ContactFormData = UserInfo &
  (PrintServicesFormData | DigitalServicesFormData | GeneralInquiryFormData);

// イベントハンドラ型
export type InputChangeHandler = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => void;

export type RadioChangeHandler = (name: string, value: string) => void;

// 詳細データの型定義
export interface PrintServicesDetails {
  printingType?: string; // 印刷物の種類
  printInquiryType?: 'estimate' | 'order' | 'question' | string; // 見積もり/注文/質問など
  contents?: string; // 詳細・要望
  deadline?: string; // 希望納期 (YYYY-MM-DD or text)
  hasDesignData?: boolean; // デザインデータ有無
}

export interface DigitalServicesDetails {
  digitalServiceType: 'ai-estimate' | 'standard-form' | 'meeting' | string; // サービス種別
  estimateParams?: Json | null; // AI見積もり用パラメータ (JSONB) - anyに変更
  projectDescription?: string; // 通常問い合わせ/ミーティング依頼の内容
}

export interface GeneralInquiryDetails {
  inquiryContent: string; // 問い合わせ内容 (NOT NULL想定)
}

export interface MeetingReservationDetails {
  // contact_inquiries テーブルへの参照 (inquiry_id) はサーバー側で処理するため、
  // フロントエンドのフォームデータとしては不要な場合が多い
  meetingDatetime?: string | Date | null; // ミーティング日時 (ISO string or Date)
  meetingMethod?: 'online' | 'offline' | string; // ミーティング方法
  meetingUrl?: string | null; // オンラインミーティングURL
  notes?: string | null; // 備考
}
