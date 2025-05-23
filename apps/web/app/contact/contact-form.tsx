'use client';
import { useAtom, useSetAtom } from 'jotai';
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
  indicatorStepAtom,
  userInfoAtom,
  isUserInfoValidAtom,
  inquiryTypeAtom,
  digitalServicesFormAtom,
  printServicesFormAtom,
  generalInquiryFormAtom,
  resetFormAtom,
} from '~/store/contact-form';
import type {
  FormStep,
  InquiryType,
  PrintServicesDetails,
  DigitalServicesDetails,
  GeneralInquiryDetails,
} from '~/types/contact-form';
import { submitContactForm } from '~/actions/contact';
import { atom } from 'jotai';

// AI見積もりフォームの表示状態を追跡するためのatom
export const isAIEstimateShownAtom = atom(false);

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
  const [indicatorStep, setIndicatorStep] = useAtom(indicatorStepAtom);
  const [userInfo] = useAtom(userInfoAtom);
  const [isFormValid] = useAtom(isFormValidAtom);
  const [isUserInfoValid] = useAtom(isUserInfoValidAtom);
  const [inquiryType, setInquiryType] = useAtom(inquiryTypeAtom);
  const [isAIEstimateShown, setIsAIEstimateShown] = useAtom(
    isAIEstimateShownAtom
  );
  // フォームリセット用の setter
  const resetForm = useSetAtom(resetFormAtom);

  // 通常フォーム遷移時にプログレスインジケーター用ステップを同期
  useEffect(() => {
    if (!isAIEstimateShown) {
      setIndicatorStep(currentStep);
    }
  }, [currentStep, isAIEstimateShown, setIndicatorStep]);

  // フォーム送信状態管理
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitWarning, setSubmitWarning] = useState<string | null>(null);

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

  // currentStep変更時に画面の上部にスクロールする
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    window.scrollTo({ top: 400, behavior: 'smooth' });
  }, [currentStep]);

  // コンポーネントアンマウント時に、完了ステップだったらフォームをリセット
  useEffect(() => {
    return () => {
      if (currentStep === 'complete') {
        resetForm();
      }
    };
  }, [currentStep, resetForm]);

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
      // フォームを送信する処理 (Server Actionを使用)
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitWarning(null); // 警告もリセット

      try {
        // 問い合わせタイプに応じたフォームデータを取得
        let formDetails:
          | DigitalServicesDetails
          | PrintServicesDetails
          | GeneralInquiryDetails
          | Record<string, never>;
        switch (inquiryType) {
          case 'digital-services':
            formDetails = digitalServicesForm;
            break;
          case 'print-services':
            formDetails = printServicesForm;
            break;
          case 'general-inquiry':
            formDetails = generalInquiryForm;
            break;
          default:
            formDetails = {};
        }

        // Server Action に渡すデータを作成 (userInfoとformDetailsをネスト)
        const requestBody = {
          userInfo,
          inquiryType,
          formDetails,
        };

        // Server Action を呼び出し
        const result = await submitContactForm(requestBody);

        if (result.success) {
          // 送信成功
          if (result.warning) {
            // 警告がある場合は表示
            setSubmitWarning(result.warning);
          }
          setCurrentStep('complete');
        } else {
          // エラーメッセージを設定
          const errorMessage = result.error || '送信に失敗しました。';
          setSubmitError(errorMessage);
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
        <ContactFormProgressIndicator currentStep={indicatorStep} />
      )}

      <div>
        {/* エラーメッセージ表示 */}
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            <p className="font-medium">エラーが発生しました</p>
            <p className="text-sm">{submitError}</p>
          </div>
        )}
        {/* 警告メッセージ表示 */}
        {submitWarning && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-600">
            <p className="font-medium">お知らせ</p>
            <p className="text-sm">{submitWarning}</p>
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
        {currentStep === 'complete' && (
          <StepComplete
            userInfo={userInfo}
            inquiryType={inquiryType}
            formDetails={
              inquiryType === 'digital-services'
                ? digitalServicesForm
                : inquiryType === 'print-services'
                  ? printServicesForm
                  : inquiryType === 'general-inquiry'
                    ? generalInquiryForm
                    : {}
            }
          />
        )}

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
