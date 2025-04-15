'use client';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  digitalServicesFormAtom,
  printServicesFormAtom,
  generalInquiryFormAtom,
} from '~/store/contact-form';
import type { FormStep, InquiryType } from '~/types/contact-form';
// 新しいatomをインポート - AI見積もりフォームの表示状態を管理
import { atom } from 'jotai';
import { submitContactForm } from '~/actions/contact';

// AI見積もりフォームの表示状態を追跡するためのatom
export const isAIEstimateShownAtom = atom(false);

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
  const [userInfo] = useAtom(userInfoAtom);
  const [isFormValid] = useAtom(isFormValidAtom);
  const [isUserInfoValid] = useAtom(isUserInfoValidAtom);
  const [inquiryType, setInquiryType] = useAtom(inquiryTypeAtom);
  const [isAIEstimateShown, setIsAIEstimateShown] = useAtom(
    isAIEstimateShownAtom
  );

  // フォーム送信状態管理
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 各フォームの状態を取得
  const [digitalServicesForm] = useAtom(digitalServicesFormAtom);
  const [printServicesForm] = useAtom(printServicesFormAtom);
  const [generalInquiryForm] = useAtom(generalInquiryFormAtom);

  // URLパラメータを取得
  const searchParams = useSearchParams();

  // URLパラメータに基づいて初期設定を行う
  useEffect(() => {
    const mode = searchParams.get('mode');
    const type = searchParams.get('type') as InquiryType | null;
    const service = searchParams.get('service');

    // 問い合わせタイプがURLパラメータで指定されていれば設定
    if (
      type &&
      ['digital-services', 'print-services', 'general-inquiry'].includes(type)
    ) {
      setInquiryType(type);

      // もし詳細ステップに進む前なら詳細ステップに移動
      if (currentStep === 'inquiry-type') {
        setCurrentStep('details');
      }

      // AI見積もりモードが指定されている場合
      if (mode === 'ai-estimate' && type === 'digital-services') {
        setIsAIEstimateShown(true);
      }
    }
  }, [
    searchParams,
    setInquiryType,
    setCurrentStep,
    setIsAIEstimateShown,
    currentStep,
  ]);

  const handleChangeStep = (step: FormStep) => {
    setCurrentStep(step);

    // 詳細ステップに入る前にAI見積もり表示状態をリセット
    if (step !== 'details') {
      setIsAIEstimateShown(false);
    }
  };

  // 次へボタンの処理
  const handleNext = async () => {
    if (currentStep === 'inquiry-type') setCurrentStep('details');
    else if (currentStep === 'details') setCurrentStep('user-info');
    else if (currentStep === 'user-info') setCurrentStep('confirmation');
    else if (currentStep === 'confirmation') {
      // フォームを送信する処理
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        // 問い合わせタイプに応じたフォームデータを取得
        let formDetails: Record<string, unknown>;
        switch (inquiryType) {
          case 'digital-services':
            formDetails = digitalServicesForm as unknown as Record<
              string,
              unknown
            >;
            break;
          case 'print-services':
            formDetails = printServicesForm as unknown as Record<
              string,
              unknown
            >;
            break;
          case 'general-inquiry':
            formDetails = generalInquiryForm as unknown as Record<
              string,
              unknown
            >;
            break;
          default:
            formDetails = {};
        }

        // サーバーアクションでフォームを送信
        const result = await submitContactForm({
          userInfo,
          inquiryType,
          formDetails,
        });

        if (result.success) {
          // 送信成功
          setCurrentStep('complete');
        } else {
          // エラーメッセージを設定
          setSubmitError(
            result.error || '送信に失敗しました。もう一度お試しください。'
          );
        }
      } catch (error) {
        console.error('送信エラー:', error);
        setSubmitError(
          '予期せぬエラーが発生しました。もう一度お試しください。'
        );
      } finally {
        setIsSubmitting(false);
      }
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
        {/* エラーメッセージ表示 */}
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            <p className="font-medium">エラーが発生しました</p>
            <p className="text-sm">{submitError}</p>
          </div>
        )}

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
              // inquiry-typeステップでは次へボタンを常に有効にする
              (currentStep === 'details' && !isFormValid) ||
              (currentStep === 'user-info' && !isUserInfoValid) ||
              isSubmitting
            }
            isSubmitting={isSubmitting && currentStep === 'confirmation'}
          />
        )}
      </div>
    </div>
  );
}
