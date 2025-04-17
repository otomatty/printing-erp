'use client';

import { Card } from '@kit/ui/card';
import type { ImplementationCosts } from '~/types/estimate';

interface ImplementationRequirementsProps {
  costs: ImplementationCosts | null;
}

/**
 * 実装要件による追加コストを表示するコンポーネント
 */
export function ImplementationRequirements({
  costs,
}: ImplementationRequirementsProps) {
  if (
    !costs ||
    (costs.designCost.amount === 0 &&
      costs.assetsCost.amount === 0 &&
      costs.contentCost.amount === 0)
  ) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">追加実装要件</h3>
      <div className="grid gap-4">
        {costs.designCost.amount > 0 && (
          <Card className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-medium">デザイン関連</div>
                <p className="text-sm text-muted-foreground">
                  {costs.designCost.reason}
                </p>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {costs.designCost.amount.toLocaleString()}円
                  <span className="text-xs text-muted-foreground">
                    {' '}
                    (割引対象外)
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}
        {costs.assetsCost.amount > 0 && (
          <Card className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-medium">アセット関連</div>
                <p className="text-sm text-muted-foreground">
                  {costs.assetsCost.reason}
                </p>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {costs.assetsCost.amount.toLocaleString()}円
                  <span className="text-xs text-muted-foreground">
                    {' '}
                    (割引対象外)
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}
        {costs.contentCost.amount > 0 && (
          <Card className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-medium">コンテンツ関連</div>
                <p className="text-sm text-muted-foreground">
                  {costs.contentCost.reason}
                </p>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {costs.contentCost.amount.toLocaleString()}円
                  <span className="text-xs text-muted-foreground">
                    {' '}
                    (割引対象外)
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
