'use client';
import { useAtom } from 'jotai';
import {
  ContactFormProgressIndicator,
  StepInquiryType,
  StepUserInfo,
  StepDetails,
  StepConfirmation,
  StepComplete,
  FormNavigation,
} from '~/components/contact-form';
import {
  isFormValidAtom,
  currentStepAtom,
  userInfoAtom,
  isUserInfoValidAtom,
  inquiryTypeAtom,
} from '~/store/contact-form';
import type { FormStep } from '~/types/contact-form';
// 新しいatomをインポート - AI見積もりフォームの表示状態を管理
import { atom } from 'jotai';

// AI見積もりフォームの表示状態を追跡するためのatom
export const isAIEstimateShownAtom = atom(false);

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
  const [userInfo] = useAtom(userInfoAtom);
  const [isFormValid] = useAtom(isFormValidAtom);
  const [isUserInfoValid] = useAtom(isUserInfoValidAtom);
  const [inquiryType] = useAtom(inquiryTypeAtom);
  const [isAIEstimateShown, setIsAIEstimateShown] = useAtom(
    isAIEstimateShownAtom
  );

  const handleChangeStep = (step: FormStep) => {
    setCurrentStep(step);

    // 詳細ステップに入る前にAI見積もり表示状態をリセット
    if (step !== 'details') {
      setIsAIEstimateShown(false);
    }
  };

  // 次へボタンの処理
  const handleNext = () => {
    if (currentStep === 'inquiry-type') setCurrentStep('details');
    else if (currentStep === 'details') setCurrentStep('user-info');
    else if (currentStep === 'user-info') setCurrentStep('confirmation');
    else if (currentStep === 'confirmation') {
      // ここでフォームを送信する処理を実装
      // 実際の実装ではAPI呼び出しなどを行う
      console.log('Form submitted:', { userInfo });
      setCurrentStep('complete');
    }
  };

  // 戻るボタンの処理
  const handleBack = () => {
    if (currentStep === 'details') setCurrentStep('inquiry-type');
    else if (currentStep === 'user-info') setCurrentStep('details');
    else if (currentStep === 'confirmation') setCurrentStep('user-info');
  };

  // AI自動見積もりが表示されている場合はナビゲーションを非表示にする
  const shouldHideNavigation =
    inquiryType === 'digital-services' &&
    currentStep === 'details' &&
    isAIEstimateShown;

  return (
    <div>
      {/* 進行状況インジケーター */}
      {currentStep !== 'complete' && (
        <ContactFormProgressIndicator currentStep={currentStep} />
      )}

      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        {/* STEP 1: お問い合わせ種別選択 */}
        {currentStep === 'inquiry-type' && <StepInquiryType />}

        {/* STEP 2: お問い合わせ内容 */}
        {currentStep === 'details' && (
          <StepDetails onAIEstimateSelect={() => setIsAIEstimateShown(true)} />
        )}

        {/* STEP 3: お客様情報 */}
        {currentStep === 'user-info' && <StepUserInfo />}

        {/* STEP 4: 確認 */}
        {currentStep === 'confirmation' && (
          <StepConfirmation
            userInfo={userInfo}
            onChangeStep={(step: FormStep) => handleChangeStep(step)}
          />
        )}

        {/* 完了画面 */}
        {currentStep === 'complete' && <StepComplete userInfo={userInfo} />}

        {/* ナビゲーションボタン - AI自動見積もりの場合は非表示 */}
        {currentStep !== 'complete' && !shouldHideNavigation && (
          <FormNavigation
            currentStep={currentStep}
            handleBack={handleBack}
            handleNext={handleNext}
            isNextDisabled={
              currentStep === 'inquiry-type' ||
              (currentStep === 'details' && !isFormValid) ||
              (currentStep === 'user-info' && !isUserInfoValid)
            }
          />
        )}
      </div>
    </div>
  );
}
