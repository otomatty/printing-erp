import React from 'react';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { useAtom } from 'jotai';
import { inquiryTypeAtom, isFormValidAtom } from '~/store/contact-form';

type FormStep =
  | 'inquiry-type'
  | 'user-info'
  | 'details'
  | 'confirmation'
  | 'complete';

type FormNavigationProps = {
  currentStep: FormStep;
  handleBack: () => void;
  handleNext: () => void;
  isNextDisabled?: boolean;
};

export default function FormNavigation({
  currentStep,
  handleBack,
  handleNext,
  isNextDisabled,
}: FormNavigationProps) {
  const [inquiryType] = useAtom(inquiryTypeAtom);
  const [isFormValid] = useAtom(isFormValidAtom);

  const isDisabled = () => {
    switch (currentStep) {
      case 'inquiry-type':
        return !inquiryType;
      case 'details':
        return !isFormValid;
      default:
        return isNextDisabled;
    }
  };

  return (
    <div className="mt-8 flex justify-between">
      {currentStep !== 'inquiry-type' ? (
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          戻る
        </button>
      ) : (
        <div />
      )}

      <button
        type="button"
        onClick={handleNext}
        disabled={isDisabled()}
        className={`bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-md transition-colors flex items-center ${
          isDisabled() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {currentStep === 'confirmation' ? (
          <>
            送信する
            <Send size={16} className="ml-2" />
          </>
        ) : (
          <>
            次へ
            <ArrowRight size={16} className="ml-2" />
          </>
        )}
      </button>
    </div>
  );
}
