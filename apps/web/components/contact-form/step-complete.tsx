import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { useAtom } from 'jotai';
import { inquiryTypeAtom } from '~/store/contact-form';
import type { UserInfoData } from '~/types/contact-form';

type StepCompleteProps = {
  userInfo: UserInfoData;
};

export default function StepComplete({ userInfo }: StepCompleteProps) {
  const [inquiryType] = useAtom(inquiryTypeAtom);

  // 会社名と氏名から表示名を生成
  const displayName = userInfo.companyName
    ? `${userInfo.companyName} ${userInfo.name}`
    : userInfo.name;

  // 問い合わせ種別に応じたメッセージを取得
  const getInquiryTypeMessage = () => {
    switch (inquiryType) {
      case 'estimate':
        return 'お見積りのご依頼';
      case 'order':
        return 'ご注文・制作のご依頼';
      case 'question':
        return 'サービスに関するお問い合わせ';
      case 'other':
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
