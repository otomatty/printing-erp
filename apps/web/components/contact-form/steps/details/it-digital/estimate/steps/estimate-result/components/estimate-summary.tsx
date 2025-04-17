'use client';

import { Card } from '@kit/ui/card';
import type { ProjectType, Deadline } from '~/types/estimate';

interface EstimateSummaryProps {
  projectType: ProjectType;
  deadline: Deadline;
  description: string;
}

/**
 * 見積もり概要を表示するコンポーネント
 */
export function EstimateSummary({
  projectType,
  deadline,
  description,
}: EstimateSummaryProps) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">見積もり概要</h3>
      <Card className="p-4 space-y-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">
            プロジェクトの種類
          </div>
          <div className="font-medium">
            {projectType === 'website'
              ? 'Webサイト'
              : projectType === 'business_system'
                ? '業務システム'
                : projectType === 'application'
                  ? 'Webアプリケーション'
                  : 'その他'}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">開発期間</div>
          <div className="font-medium">
            {deadline === 'asap'
              ? 'できるだけ早く'
              : deadline === '1month'
                ? '1ヶ月以内'
                : deadline === '3months'
                  ? '3ヶ月以内'
                  : deadline === '6months'
                    ? '6ヶ月以内'
                    : '柔軟に対応可能'}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">
            プロジェクトの概要
          </div>
          <div className="font-medium whitespace-pre-wrap">{description}</div>
        </div>
      </Card>
    </div>
  );
}
