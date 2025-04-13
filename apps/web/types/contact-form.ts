import type { ChangeEvent } from 'react';

// フォームのステップを表す型
export type FormStep =
  | 'inquiry-type'
  | 'user-info'
  | 'details'
  | 'confirmation'
  | 'complete';

// 問い合わせタイプの型定義
export type InquiryType = 'estimate' | 'order' | 'question' | 'other';

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

// 見積もり依頼フォーム
export interface EstimateFormData extends BaseFormData {
  product: string;
  size: string;
  quantity: string;
  paper: string;
  deadline: string;
  otherRequests: string;
}

// 注文フォーム
export interface OrderFormData extends BaseFormData {
  orderContent: string;
  size: string;
  quantity: string;
  paper: string;
  deadline: string;
  hasDesignData: boolean;
  otherRequests: string;
}

// 質問フォーム
export interface QuestionFormData extends BaseFormData {
  questionContent: string;
  preferredContactMethod: 'phone' | 'email' | '';
  preferredContactTime: string;
}

// その他問い合わせフォーム
export interface OtherFormData extends BaseFormData {
  content: string;
}

// 統合されたフォームデータ型
export type ContactFormData = UserInfoData &
  (EstimateFormData | OrderFormData | QuestionFormData | OtherFormData);

// イベントハンドラ型
export type InputChangeHandler = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => void;

export type RadioChangeHandler = (name: string, value: string) => void;
