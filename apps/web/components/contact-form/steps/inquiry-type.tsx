import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { inquiryTypeAtom, currentStepAtom } from '~/store/contact-form';
import { useSearchParams } from 'next/navigation';

export default function StepInquiryType() {
  const [inquiryType, setInquiryType] = useAtom(inquiryTypeAtom);
  const [_, setCurrentStep] = useAtom(currentStepAtom);
  const searchParams = useSearchParams();

  // URLパラメータをチェックして印刷タイプが指定されていれば自動設定
  useEffect(() => {
    const printingType = searchParams.get('printingType');

    if (printingType === 'envelope') {
      // 印刷サービスを選択
      setInquiryType('print-services');

      // 詳細ステップに自動的に進む
      setTimeout(() => {
        setCurrentStep('details');
      }, 500); // 少し遅延させて状態の更新が反映されるようにする
    }
  }, [searchParams, setInquiryType, setCurrentStep]);

  const handleInquiryTypeChange = (
    type: 'print-services' | 'digital-services' | 'general-inquiry'
  ) => {
    setInquiryType(type);
  };

  const inquiryTypes = [
    {
      id: 'print-services',
      title: '印刷サービス',
      description: '印刷物のお見積り、ご注文、制作依頼など',
      icon: '🖨️',
    },
    {
      id: 'digital-services',
      title: 'IT・デジタルサービス',
      description: 'ホームページ制作、デジタルコンテンツ、システム開発など',
      icon: '💻',
    },
    {
      id: 'general-inquiry',
      title: 'その他',
      description: '会社情報、採用情報、サービス全般に関するご質問など',
      icon: '❓',
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">お問い合わせの種類</h2>
      <p className="text-gray-600 mb-6">
        お問い合わせの内容に最も近いものをお選びください。
      </p>

      <div className="grid grid-cols-1 gap-4">
        {inquiryTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            className={`bg-white border rounded-lg p-4 cursor-pointer transition-all text-left w-full ${
              inquiryType === type.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() =>
              handleInquiryTypeChange(
                type.id as
                  | 'print-services'
                  | 'digital-services'
                  | 'general-inquiry'
              )
            }
            aria-pressed={inquiryType === type.id}
          >
            <div className="flex items-start">
              <div className="mr-3 text-2xl">{type.icon}</div>
              <div>
                <h3 className="font-bold">{type.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{type.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
