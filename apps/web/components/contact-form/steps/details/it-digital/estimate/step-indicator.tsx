'use client';

import { FileText } from 'lucide-react';
import { Progress } from '@kit/ui/progress';
import type { StepId } from '~/types/estimate';

// ステップの型定義
export type Step = {
  id: StepId;
  title: string;
  component: React.ComponentType<Record<string, unknown>>;
};

// プロパティの型定義
interface StepIndicatorProps {
  steps: readonly Step[];
  currentStepIndex: number;
}

export function StepIndicator({ steps, currentStepIndex }: StepIndicatorProps) {
  // 進捗率を計算 (0-100%)
  const progressPercentage = Math.round(
    (currentStepIndex / (steps.length - 1)) * 100
  );
  const currentStep = steps[currentStepIndex];
  const totalSteps = steps.length;
  const isLastStep = currentStepIndex === totalSteps - 1;

  return (
    <div className="mb-8 space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div>
          <span className="font-medium">
            ステップ {currentStepIndex + 1}/{totalSteps}
          </span>
          <span className="text-muted-foreground ml-2">
            {progressPercentage}% 完了
          </span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <FileText className="w-4 h-4 mr-1" />
          <span className="text-xs">見積書作成</span>
        </div>
      </div>

      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
}
