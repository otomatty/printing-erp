'use client';

import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { Button } from '@kit/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  currentStepAtom,
  formDataAtom,
  aiQuestionsAtom,
  aiAnswersAtom,
  proposedFeaturesAtom,
  selectedFeatureIdsAtom,
  workflowResultAtom,
  workflowRunIdAtom,
  estimationLoadingAtom,
} from '~/store/estimate';
import { executeEstimation } from '~/actions/estimate/executeEstimation';
import type { QuestionAnswer, FeatureProposal, StepId } from '~/types/estimate';
import { ProjectTypeStep } from './steps/project-type';
import { DeadlineStep } from './steps/deadline';
import { DescriptionStep } from './steps/description';
import { AIQuestionsStep } from './steps/ai-questions';
import { FeatureSelectionStep } from './steps/feature-selection';
import { EstimateResultStep } from './steps/estimate-result';
import { ImplementationRequirementsStep } from './steps/implementation-requirements';
import { ModernEstimateStep } from './steps/modern-estimate';
import { UserInfoStep } from './steps/user-info';
import { StepIndicator } from './step-indicator';

const steps = [
  {
    id: 'project-type',
    title: 'プロジェクトの種類',
    component: ProjectTypeStep,
  },
  {
    id: 'description',
    title: 'プロジェクトの概要',
    component: DescriptionStep,
  },
  {
    id: 'deadline',
    title: '開発期間',
    component: DeadlineStep,
  },
  {
    id: 'ai-questions',
    title: '追加質問',
    component: AIQuestionsStep,
  },
  {
    id: 'feature-selection',
    title: '機能選択',
    component: FeatureSelectionStep,
  },
  {
    id: 'implementation-requirements',
    title: '実装要件',
    component: ImplementationRequirementsStep,
  },
  {
    id: 'modern-estimate',
    title: 'コスト最適化',
    component: ModernEstimateStep,
  },
  {
    id: 'user-info',
    title: 'お客様情報',
    component: UserInfoStep,
  },
  {
    id: 'estimate-result',
    title: '見積もり結果',
    component: EstimateResultStep,
  },
] as const;

interface EstimateFormProps {
  onBackToSelection?: () => void;
}

export function EstimateForm({ onBackToSelection }: EstimateFormProps) {
  const [currentStep, setCurrentStep] = useAtom<StepId>(currentStepAtom);
  const [formData, setFormData] = useAtom(formDataAtom);
  const [aiQuestions, setAiQuestions] = useAtom(aiQuestionsAtom);
  const [answers, setAnswers] = useAtom(aiAnswersAtom);
  const [, setProposedFeatures] = useAtom(proposedFeaturesAtom);
  const [, setSelectedFeatureIds] = useAtom(selectedFeatureIdsAtom);
  const [, setWorkflowResult] = useAtom(workflowResultAtom);
  const [, setWorkflowRunId] = useAtom(workflowRunIdAtom);
  const [, setEstimationLoading] = useAtom(estimationLoadingAtom);
  const formRef = useRef<HTMLDivElement>(null);

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const step = steps[currentStepIndex];
  if (!step) {
    setCurrentStep('project-type');
    return null;
  }

  const CurrentStepComponent = step.component;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const scrollToTop = () => {
    if (formRef.current) {
      const yOffset = -200; // 上に200px余分にスクロールするオフセット
      const y =
        formRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const executeEstimationWorkflow = async () => {
    // 送信データを準備
    const answersToSubmit: QuestionAnswer[] = aiQuestions.map((q) => {
      let answer: string | string[] | number | null = null;

      if (q.isAnswered && q.questionId in answers) {
        const value = answers[q.questionId];
        if (value !== undefined) {
          answer = value;
        }
      }

      return {
        questionId: q.questionId,
        isAnswered: q.isAnswered,
        skipped: q.skipped,
        answer: answer,
      };
    });

    try {
      setEstimationLoading(true);

      // リクエストデータを構築
      const requestData = {
        userInput: formData.description,
        projectType: formData.projectType,
        hourlyRates: {
          website: 5000,
          business_system: 8000,
          application: 8000,
          other: 5000,
        },
        similarProjects: [],
        followUpQuestions: aiQuestions.map((q) => ({
          questionId: q.questionId,
          questionText: q.questionText,
          type: q.type,
          options: q.options,
          validationRules: q.validationRules,
        })),
        answers: answersToSubmit,
      };
      // サーバーサイドのアクションを呼び出し
      const result = await executeEstimation(requestData);

      const features: FeatureProposal[] = result.result.breakdown.map(
        (item, index) => ({
          id: `feature-${index}`,
          name: item.feature,
          description: item.reason || '詳細情報なし',
          price: item.cost || 0,
          duration: (item.estimatedHours || 0) / 8,
          isRequired: item.isNecessary,
          category: getCategoryFromFeature(item.feature),
          reason: item.reason || undefined,
          difficulty: getDifficultyFromCost(item.cost),
          dailyRate: Math.round((result.result.usedHourlyRate || 5000) * 8),
        })
      );

      setProposedFeatures(features);

      setFormData((prev) => ({
        ...prev,
        baseCost: result.result.requiredCost,
        totalCost: result.result.grandTotalCost,
      }));
    } catch (error) {
      console.error('見積もり計算失敗:', error);
      alert(
        `見積もり計算に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`
      );
    } finally {
      setEstimationLoading(false);
    }
  };

  const handleNext = async () => {
    if (!isLastStep) {
      if (currentStep === 'ai-questions') {
        const nextStep = steps[currentStepIndex + 1] as (typeof steps)[number];
        setCurrentStep(nextStep.id);

        // ステップ変更後にスクロール
        setTimeout(scrollToTop, 100);

        // 別プロセスとしてワークフロー実行
        executeEstimationWorkflow();
      } else {
        const nextStep = steps[currentStepIndex + 1] as (typeof steps)[number];
        setCurrentStep(nextStep.id);

        // ステップ変更後にスクロール
        setTimeout(scrollToTop, 100);
      }
    }
  };

  const handleBack = () => {
    if (isFirstStep) {
      // 最初のステップで戻るボタンが押された場合は選択画面に戻る
      if (onBackToSelection) {
        onBackToSelection();
      }
    } else {
      // それ以外は前のステップに戻る
      const prevStep = steps[currentStepIndex - 1] as (typeof steps)[number];
      setCurrentStep(prevStep.id);

      // ステップ変更後にスクロール
      setTimeout(scrollToTop, 100);
    }
  };

  const handleReset = () => {
    setCurrentStep('project-type');
    setFormData({
      projectType: 'website',
      description: '',
      deadline: 'flexible',
      features: [],
      baseCost: 0,
      rushFee: 0,
      totalCost: 0,
    });
    setAiQuestions([]);
    setAnswers({});
    setProposedFeatures([]);
    setSelectedFeatureIds([]);
    setWorkflowResult(null);
    setWorkflowRunId(null);
    setEstimationLoading(false);
    localStorage.removeItem('estimateFormData');

    // リセット後にスクロール
    setTimeout(scrollToTop, 100);
  };

  useEffect(() => {
    localStorage.setItem('estimateFormData', JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="space-y-4" ref={formRef}>
      <div className="mb-8">
        <StepIndicator steps={steps} currentStepIndex={currentStepIndex} />

        <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
        <CurrentStepComponent />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={false}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          戻る
        </Button>
        {currentStep !== 'user-info' && (
          <Button
            onClick={handleNext}
            disabled={currentStep === 'estimate-result'}
          >
            次へ
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
      <div className="text-center">
        <button
          type="button"
          onClick={handleReset}
          className="text-sm text-muted-foreground hover:text-primary hover:underline"
        >
          見積もりを最初からやり直す
        </button>
      </div>
    </div>
  );
}

function getCategoryFromFeature(
  featureName: string
): FeatureProposal['category'] {
  const lowerName = featureName.toLowerCase();
  if (lowerName.includes('ユーザー') || lowerName.includes('user'))
    return 'user';
  if (lowerName.includes('認証') || lowerName.includes('auth')) return 'auth';
  if (lowerName.includes('コンテンツ') || lowerName.includes('content'))
    return 'content';
  if (lowerName.includes('決済') || lowerName.includes('payment'))
    return 'payment';
  if (lowerName.includes('コア') || lowerName.includes('core')) return 'core';
  return 'other';
}

function getDifficultyFromCost(cost: number | null): number {
  if (!cost) return 3;
  if (cost < 50000) return 1;
  if (cost < 100000) return 2;
  if (cost < 200000) return 3;
  if (cost < 400000) return 4;
  return 5;
}
