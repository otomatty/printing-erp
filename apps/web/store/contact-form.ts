'use client';

import { atom } from 'jotai';
import type {
  PrintServicesFormData,
  DigitalServicesFormData,
  GeneralInquiryFormData,
  UserInfo,
  InquiryType,
  FormStep,
} from '~/types/contact-form';

// フォームデータの初期値
// ユーザー情報の初期値
const initialUserInfo: UserInfo = {
  name: '',
  companyName: '',
  email: '',
  phone: '',
  preferredContact: 'email',
  address: '',
  postalCode: '',
};

// 印刷サービスフォームの初期値
const initialPrintServicesData: PrintServicesFormData = {
  inquiryType: 'print-services',
  printingType: '', // 印刷物の種類
  printInquiryType: 'estimate', // 印刷サービスの問い合わせ種類（見積もり、注文、質問）
  contents: '', // 印刷物の詳細情報や要望
  deadline: '',
  hasDesignData: false,
};

// デジタルサービスフォームの初期値
const initialDigitalServicesData: DigitalServicesFormData = {
  inquiryType: 'digital-services',
  digitalServiceType: 'standard',
  projectDescription: '',
};

// 一般的な問い合わせフォームの初期値
const initialGeneralInquiryData: GeneralInquiryFormData = {
  inquiryType: 'general-inquiry',
  inquiryContent: '',
  preferredContactMethod: 'email', // デフォルト値は必要だがユーザーからの入力は不要
  preferredContactTime: '',
};

// 問い合わせタイプのアトム
export const inquiryTypeAtom = atom<InquiryType>('print-services');

// 各タイプごとのフォームデータアトム
export const printServicesFormAtom = atom<PrintServicesFormData>(
  initialPrintServicesData
);
export const digitalServicesFormAtom = atom<DigitalServicesFormData>(
  initialDigitalServicesData
);
export const generalInquiryFormAtom = atom<GeneralInquiryFormData>(
  initialGeneralInquiryData
);

// 現在のフォームデータを取得するための派生アトム
export const currentFormDataAtom = atom((get) => {
  const inquiryType = get(inquiryTypeAtom);

  switch (inquiryType) {
    case 'print-services':
      return get(printServicesFormAtom);
    case 'digital-services':
      return get(digitalServicesFormAtom);
    case 'general-inquiry':
      return get(generalInquiryFormAtom);
    default:
      return get(printServicesFormAtom);
  }
});

// ユーザー情報を管理するアトム
export const userInfoAtom = atom<UserInfo>(initialUserInfo);

// ユーザー情報が有効かどうかを判断するアトム（書き込み可能）
export const isUserInfoValidAtom = atom(
  (get) => {
    const userInfo = get(userInfoAtom);
    // 「電話」または「どちらでも」を選択している場合は電話番号も必須
    const isPhoneRequired =
      userInfo.preferredContact === 'phone' ||
      userInfo.preferredContact === 'either';

    return (
      !!userInfo.name &&
      !!userInfo.email &&
      (!isPhoneRequired || !!userInfo.phone)
    );
  },
  (_get, set, value: boolean) => {
    // 外部から書き込みを可能にする
    // 主にテスト用や特殊なケース用
    set(isUserInfoValidAtom, value);
  }
);

// ステップを管理するアトム
export const currentStepAtom = atom<FormStep>('inquiry-type');

// フォームが有効かどうかを判断するアトム (書き込み可能)
export const isFormValidAtom = atom<boolean>(false);

// リセットアトム（コンポーネント内でuseSetAtomを使ってリセットするために使用）
export const resetFormAtom = atom(null, (_, set) => {
  // フォーム全体の状態を初期化
  set(currentStepAtom, 'inquiry-type');
  set(userInfoAtom, initialUserInfo);
  set(inquiryTypeAtom, 'print-services');
  set(printServicesFormAtom, initialPrintServicesData);
  set(digitalServicesFormAtom, initialDigitalServicesData);
  set(generalInquiryFormAtom, initialGeneralInquiryData);
  set(isFormValidAtom, false);
});
