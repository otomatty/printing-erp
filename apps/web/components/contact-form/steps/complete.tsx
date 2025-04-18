import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { useAtom } from 'jotai';
import { inquiryTypeAtom, currentFormDataAtom } from '~/store/contact-form';
import type {
  UserInfo,
  PrintServicesFormData,
  InquiryType,
  PrintServicesDetails,
  DigitalServicesDetails,
  GeneralInquiryDetails,
} from '~/types/contact-form';

type StepCompleteProps = {
  userInfo: UserInfo;
  inquiryType: InquiryType;
  formDetails:
    | PrintServicesDetails
    | DigitalServicesDetails
    | GeneralInquiryDetails
    | Record<string, never>;
};

/**
 * 送信完了画面コンポーネント
 * お問い合わせ送信後の完了メッセージを表示する
 */
export default function StepComplete({
  userInfo,
  inquiryType,
  formDetails,
}: StepCompleteProps) {
  // const [inquiryType] = useAtom(inquiryTypeAtom);
  // const [currentFormData] = useAtom(currentFormDataAtom);

  // 会社名と氏名から表示名を生成
  const displayName = userInfo.companyName
    ? `${userInfo.companyName} ${userInfo.name}`
    : userInfo.name;

  // 問い合わせ種別に応じたメッセージを取得
  const getInquiryTypeMessage = () => {
    switch (inquiryType) {
      case 'print-services': {
        // currentFormDataを取得して、printInquiryTypeに基づいたメッセージを返す
        const formData = formDetails as PrintServicesDetails;
        if (formData.printInquiryType === 'estimate') {
          return '印刷サービスに関する見積もりのご依頼';
        }
        if (formData.printInquiryType === 'order') {
          return '印刷サービスに関するご注文・発注';
        }
        if (formData.printInquiryType === 'question') {
          return '印刷サービスに関するご相談・質問';
        }
        return '印刷サービスに関するお問い合わせ';
      }
      case 'digital-services':
        return 'IT・デジタルサービスに関するお問い合わせ';
      case 'general-inquiry':
        return 'お問い合わせ';
      default:
        return 'お問い合わせ';
    }
  };

  return (
    <div className="text-center py-8">
      <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
        <Check className="text-green-600" size={32} />
      </div>
      <h2 className="text-2xl font-bold mb-2">送信完了</h2>
      <div className="text-gray-600 space-y-4 mb-6">
        <p className="font-medium">{displayName} 様</p>
        <p>{getInquiryTypeMessage()}をいただき、ありがとうございます。</p>
        <p>
          ご入力いただいたメールアドレス宛に確認メールをお送りしました。
          <br />
          内容を確認次第、担当者より回答させていただきます。
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center text-primary hover:text-primary/90 font-medium"
      >
        <ArrowLeft className="mr-2" size={16} />
        トップページに戻る
      </Link>
    </div>
  );
}
