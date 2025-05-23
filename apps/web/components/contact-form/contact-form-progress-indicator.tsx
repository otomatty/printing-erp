import React from 'react';

type FormStep =
  | 'inquiry-type'
  | 'user-info'
  | 'details'
  | 'confirmation'
  | 'complete';

type ContactFormProgressIndicatorProps = {
  currentStep: FormStep;
};

export default function ContactFormProgressIndicator({
  currentStep,
}: ContactFormProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        <div className="text-center w-1/4">
          <div
            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
              currentStep === 'inquiry-type'
                ? 'bg-primary text-white'
                : 'bg-primary text-white'
            }`}
          >
            1
          </div>
          <div className="text-xs mt-1 hidden sm:block">お問い合わせの種類</div>
        </div>
        <div className="text-center w-1/4">
          <div
            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
              currentStep === 'details' ||
              currentStep === 'user-info' ||
              currentStep === 'confirmation'
                ? 'bg-primary text-white'
                : 'bg-gray-300 text-gray-600'
            }`}
          >
            2
          </div>
          <div className="text-xs mt-1 hidden sm:block">お問い合わせの内容</div>
        </div>
        <div className="text-center w-1/4">
          <div
            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
              currentStep === 'user-info' || currentStep === 'confirmation'
                ? 'bg-primary text-white'
                : 'bg-gray-300 text-gray-600'
            }`}
          >
            3
          </div>
          <div className="text-xs mt-1 hidden sm:block">お客様の情報</div>
        </div>
        <div className="text-center w-1/4">
          <div
            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
              currentStep === 'confirmation'
                ? 'bg-primary text-white'
                : 'bg-gray-300 text-gray-600'
            }`}
          >
            4
          </div>
          <div className="text-xs mt-1 hidden sm:block">内容の確認</div>
        </div>
      </div>
      <div className="relative mt-2">
        <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full" />
        <div
          className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300"
          style={{
            width:
              currentStep === 'inquiry-type'
                ? '25%'
                : currentStep === 'details'
                  ? '50%'
                  : currentStep === 'user-info'
                    ? '75%'
                    : '100%',
          }}
        />
      </div>
    </div>
  );
}
