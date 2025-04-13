import React from 'react';
import { useAtom } from 'jotai';
import { inquiryTypeAtom } from '~/store/contact-form';

export default function StepInquiryType() {
  const [inquiryType, setInquiryType] = useAtom(inquiryTypeAtom);

  const handleInquiryTypeChange = (
    type: 'estimate' | 'order' | 'question' | 'other'
  ) => {
    setInquiryType(type);
  };

  const inquiryTypes = [
    {
      id: 'estimate',
      title: 'お見積り依頼',
      description: '印刷物や各種サービスの見積りが必要な方',
      icon: '💰',
    },
    {
      id: 'order',
      title: 'ご注文・制作依頼',
      description: '印刷物の発注や制作の依頼をされる方',
      icon: '📝',
    },
    {
      id: 'question',
      title: 'サービスに関するご質問',
      description: '当社のサービスについて詳しく知りたい方',
      icon: '❓',
    },
    {
      id: 'other',
      title: 'その他のお問い合わせ',
      description: '上記に当てはまらないお問い合わせ',
      icon: '📋',
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">お問い合わせ種別</h2>
      <p className="text-gray-600 mb-6">
        お問い合わせの内容に最も近いものをお選びください。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inquiryTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            className={`border rounded-lg p-4 cursor-pointer transition-all text-left w-full ${
              inquiryType === type.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() =>
              handleInquiryTypeChange(
                type.id as 'estimate' | 'order' | 'question' | 'other'
              )
            }
            aria-pressed={inquiryType === type.id}
          >
            <div className="flex items-start">
              <div className="mr-3 text-2xl">{type.icon}</div>
              <div>
                <h3 className="font-medium">{type.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{type.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
