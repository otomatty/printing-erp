import { Button } from '@kit/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import type { FormStep } from '~/types/contact-form';

interface FormNavigationProps {
  currentStep: FormStep;
  handleBack: () => void;
  handleNext: () => void;
  isNextDisabled: boolean;
  isSubmitting?: boolean;
}

export default function FormNavigation({
  currentStep,
  handleBack,
  handleNext,
  isNextDisabled,
  isSubmitting = false,
}: FormNavigationProps) {
  // 次へボタンのテキスト
  const nextButtonText = () => {
    if (currentStep === 'inquiry-type') return '次へ';
    if (currentStep === 'details') return '次へ';
    if (currentStep === 'user-info') return '内容確認';
    if (currentStep === 'confirmation')
      return isSubmitting ? '送信中...' : '送信する';
    return '次へ';
  };

  return (
    <div className="flex justify-between mt-8">
      {/* 戻るボタン（初期ステップでは表示しない） */}
      {currentStep !== 'inquiry-type' ? (
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          className="px-5"
          disabled={isSubmitting}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          戻る
        </Button>
      ) : (
        <div />
      )}

      {/* 次へ進むボタン */}
      <Button
        type="button"
        onClick={handleNext}
        className="px-5"
        disabled={isNextDisabled}
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <ArrowRight className="w-4 h-4 ml-2 order-last" />
        )}
        {nextButtonText()}
      </Button>
    </div>
  );
}
