'use client';

import { useState } from 'react';
import { Card } from '@kit/ui/card';
import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { FeatureProposal } from '~/types/estimate';

interface FeatureListProps {
  features: FeatureProposal[];
}

/**
 * 選択された機能一覧を表示するコンポーネント
 */
export function FeatureList({ features }: FeatureListProps) {
  const [showFeatures, setShowFeatures] = useState(false);

  // 機能一覧の折りたたみを切り替える関数
  const toggleFeatures = () => {
    setShowFeatures((prev) => !prev);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">
          選択された機能 ({features.length})
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleFeatures}
          className="flex items-center gap-1"
        >
          {showFeatures ? (
            <>
              <span>折りたたむ</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>展開する</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      {showFeatures && (
        <div className="grid gap-4">
          {features.map((feature) => (
            <Card key={feature.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-medium">{feature.name}</div>
                    {feature.isRequired && <Badge>必須</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {feature.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm line-through text-muted-foreground">
                    {feature.price.toLocaleString()}円
                  </div>
                  <div className="font-medium">
                    {Math.round(feature.price * 0.5 * 0.95).toLocaleString()}円
                    <span className="text-xs text-green-600"> (52.5%オフ)</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    約{feature.duration.toFixed(1)}日
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {!showFeatures && features.length > 0 && (
        <Card className="p-4 text-center text-muted-foreground">
          <p>
            {features.length}
            個の機能が選択されています。展開ボタンをクリックして詳細を確認できます。
          </p>
        </Card>
      )}
    </div>
  );
}
