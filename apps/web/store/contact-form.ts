import { atom } from 'jotai';
import type {
  EstimateFormData,
  OrderFormData,
  QuestionFormData,
  OtherFormData,
  UserInfoData,
  InquiryType,
  FormStep,
} from '~/types/contact-form';

// フォームデータの初期値
// ユーザー情報の初期値
const initialUserInfo: UserInfoData = {
  name: '',
  companyName: '',
  email: '',
  phone: '',
  preferredContact: 'email',
};

const initialEstimateData: EstimateFormData = {
  inquiryType: 'estimate',
  product: '',
  size: '',
  quantity: '',
  paper: '',
  deadline: '',
  otherRequests: '',
};

const initialOrderData: OrderFormData = {
  inquiryType: 'order',
  orderContent: '',
  size: '',
  quantity: '',
  paper: '',
  deadline: '',
  hasDesignData: false,
  otherRequests: '',
};

const initialQuestionData: QuestionFormData = {
  inquiryType: 'question',
  questionContent: '',
  preferredContactMethod: '',
  preferredContactTime: '',
};

const initialOtherData: OtherFormData = {
  inquiryType: 'other',
  content: '',
};

// 問い合わせタイプのアトム
export const inquiryTypeAtom = atom<InquiryType>('estimate');

// 各タイプごとのフォームデータアトム
export const estimateFormAtom = atom<EstimateFormData>(initialEstimateData);
export const orderFormAtom = atom<OrderFormData>(initialOrderData);
export const questionFormAtom = atom<QuestionFormData>(initialQuestionData);
export const otherFormAtom = atom<OtherFormData>(initialOtherData);

// 現在のフォームデータを取得するための派生アトム
export const currentFormDataAtom = atom((get) => {
  const inquiryType = get(inquiryTypeAtom);

  switch (inquiryType) {
    case 'estimate':
      return get(estimateFormAtom);
    case 'order':
      return get(orderFormAtom);
    case 'question':
      return get(questionFormAtom);
    case 'other':
      return get(otherFormAtom);
    default:
      return get(estimateFormAtom);
  }
});

// ユーザー情報を管理するアトム
export const userInfoAtom = atom<UserInfoData>(initialUserInfo);

// ユーザー情報が有効かどうかを判断するアトム
export const isUserInfoValidAtom = atom((get) => {
  const userInfo = get(userInfoAtom);
  return !!userInfo.name && !!userInfo.email; // 名前とメールアドレスは必須
});

// ステップを管理するアトム
export const currentStepAtom = atom<FormStep>('inquiry-type');

// リセットアトム（コンポーネント内でuseSetAtomを使ってリセットするために使用）
export const resetFormAtom = atom(null, (_, set) => {
  set(estimateFormAtom, initialEstimateData);
  set(orderFormAtom, initialOrderData);
  set(questionFormAtom, initialQuestionData);
  set(otherFormAtom, initialOtherData);
});

// フォームが有効かどうかを判断する派生アトム
export const isFormValidAtom = atom((get) => {
  const inquiryType = get(inquiryTypeAtom);

  switch (inquiryType) {
    case 'estimate': {
      const data = get(estimateFormAtom);
      return !!data.product && !!data.quantity; // 製品と部数は必須
    }
    case 'order': {
      const data = get(orderFormAtom);
      return !!data.orderContent && !!data.quantity; // 発注内容と部数は必須
    }
    case 'question': {
      const data = get(questionFormAtom);
      return !!data.questionContent; // 質問内容は必須
    }
    case 'other': {
      const data = get(otherFormAtom);
      return !!data.content; // お問い合わせ内容は必須
    }
    default:
      return false;
  }
});
