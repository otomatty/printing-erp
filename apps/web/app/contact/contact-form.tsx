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
} from '~/store/contact-form';
import type { FormStep } from '~/types/contact-form';

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
  const [userInfo] = useAtom(userInfoAtom);
  const [isFormValid] = useAtom(isFormValidAtom);
  const [isUserInfoValid] = useAtom(isUserInfoValidAtom);

  const handleChangeStep = (step: FormStep) => {
    setCurrentStep(step);
  };

  // 次へボタンの処理
  const handleNext = () => {
    if (currentStep === 'inquiry-type') setCurrentStep('user-info');
    else if (currentStep === 'user-info') setCurrentStep('details');
    else if (currentStep === 'details') setCurrentStep('confirmation');
    else if (currentStep === 'confirmation') {
      // ここでフォームを送信する処理を実装
      // 実際の実装ではAPI呼び出しなどを行う
      console.log('Form submitted:', { userInfo });
      setCurrentStep('complete');
    }
  };

  // 戻るボタンの処理
  const handleBack = () => {
    if (currentStep === 'user-info') setCurrentStep('inquiry-type');
    else if (currentStep === 'details') setCurrentStep('user-info');
    else if (currentStep === 'confirmation') setCurrentStep('details');
  };

  return (
    <div>
      {/* 進行状況インジケーター */}
      {currentStep !== 'complete' && (
        <ContactFormProgressIndicator currentStep={currentStep} />
      )}

      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        {/* STEP 1: お問い合わせ種別選択 */}
        {currentStep === 'inquiry-type' && <StepInquiryType />}

        {/* STEP 2: お客様情報 */}
        {currentStep === 'user-info' && <StepUserInfo />}

        {/* STEP 3: お問い合わせ内容 */}
        {currentStep === 'details' && <StepDetails />}

        {/* STEP 4: 確認 */}
        {currentStep === 'confirmation' && (
          <StepConfirmation
            userInfo={userInfo}
            onChangeStep={(step: FormStep) => handleChangeStep(step)}
          />
        )}

        {/* 完了画面 */}
        {currentStep === 'complete' && <StepComplete userInfo={userInfo} />}

        {/* ナビゲーションボタン */}
        {currentStep !== 'complete' && (
          <FormNavigation
            currentStep={currentStep}
            handleBack={handleBack}
            handleNext={handleNext}
            isNextDisabled={
              currentStep === 'inquiry-type' ||
              (currentStep === 'user-info' && !isUserInfoValid) ||
              (currentStep === 'details' && !isFormValid)
            }
          />
        )}
      </div>
    </div>
  );
}
