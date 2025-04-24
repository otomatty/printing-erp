'use client';

import { useAtom } from 'jotai';
import { Card } from '@kit/ui/card';
import { Label } from '@kit/ui/label';
import { RadioGroup, RadioGroupItem } from '@kit/ui/radio-group';
import {
  LayoutTemplate,
  SquarePen,
  Image,
  Diamond,
  HelpCircle,
  Minus,
  Check,
  X,
} from 'lucide-react';
import { formDataAtom, currentStepAtom } from '~/store/estimate';
import type {
  DesignFormat,
  ImplementationRequirements,
  EstimateFormData,
} from '~/types/estimate';
import { cn } from '@kit/ui/utils';
import { SummaryCard } from '../_components/summary-card';
import { calculateImplementationCosts } from '~/components/contact-form/steps/details/it-digital/estimate/_utils/calculateImplementationCosts';
import { useEffect, useState, useMemo, useCallback } from 'react';
import type { ImplementationCosts } from '~/types/estimate';

const designFormats: {
  value: DesignFormat;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: 'figma', label: 'Figma', icon: LayoutTemplate },
  { value: 'xd', label: 'Adobe XD', icon: SquarePen },
  { value: 'photoshop', label: 'Photoshop', icon: Image },
  { value: 'sketch', label: 'Sketch', icon: Diamond },
  { value: 'other', label: 'その他', icon: HelpCircle },
  { value: 'none', label: '指定なし', icon: Minus },
];

/**
 * 実装要件ステップコンポーネント
 * クライアントから提供されるデザイン、アセット、コンテンツに関する情報を収集します。
 * これらの情報は見積もり計算で追加コストとして反映されます。
 */
export function ImplementationRequirementsStep() {
  const [formData, setFormData] = useAtom(formDataAtom);
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
  const [implementationCosts, setImplementationCosts] =
    useState<ImplementationCosts | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 要件データをメモ化して不要な再計算を防ぐ
  const requirements = useMemo(
    () =>
      formData.implementationRequirements || {
        hasDesign: 'entrust' as const,
        designFormat: 'none' as DesignFormat,
        hasBrandGuidelines: 'entrust' as const,
        hasLogo: 'entrust' as const,
        hasImages: 'entrust' as const,
        hasIcons: 'entrust' as const,
        hasCustomFonts: 'entrust' as const,
        hasContent: 'entrust' as const,
      },
    [formData.implementationRequirements]
  );

  /**
   * boolean値をラジオボタン用の文字列値に変換
   */
  const getRadioValue = useCallback(
    (value: string | boolean | undefined): string => {
      if (value === true || value === 'yes') return 'yes';
      if (value === 'entrust') return 'entrust';
      if (value === 'collaborate') return 'collaborate';
      if (value === false || value === 'no') return 'no';
      return 'no';
    },
    []
  );

  /**
   * ラジオボタン値から実装要件の状態値を取得
   */
  const getRequirementState = useCallback(
    (value: string): boolean | 'entrust' | 'collaborate' => {
      if (value === 'yes') return true;
      if (value === 'entrust') return 'entrust';
      if (value === 'collaborate') return 'collaborate';
      return false;
    },
    []
  );

  /**
   * 実装要件オブジェクトを更新
   */
  const updateRequirements = useCallback(
    (updates: Partial<ImplementationRequirements>) => {
      setFormData((prev: EstimateFormData) => {
        const prevRequirements = prev.implementationRequirements || {
          hasDesign: 'entrust' as const,
          designFormat: 'none' as DesignFormat,
          hasBrandGuidelines: 'entrust' as const,
          hasLogo: 'entrust' as const,
          hasImages: 'entrust' as const,
          hasIcons: 'entrust' as const,
          hasCustomFonts: 'entrust' as const,
          hasContent: 'entrust' as const,
        };

        let newRequirements: ImplementationRequirements = {
          hasDesign: updates.hasDesign ?? prevRequirements.hasDesign,
          designFormat: updates.designFormat ?? prevRequirements.designFormat,
          hasBrandGuidelines:
            updates.hasBrandGuidelines ?? prevRequirements.hasBrandGuidelines,
          hasLogo: updates.hasLogo ?? prevRequirements.hasLogo,
          hasImages: updates.hasImages ?? prevRequirements.hasImages,
          hasIcons: updates.hasIcons ?? prevRequirements.hasIcons,
          hasCustomFonts:
            updates.hasCustomFonts ?? prevRequirements.hasCustomFonts,
          hasContent: updates.hasContent ?? prevRequirements.hasContent,
        };

        if (newRequirements.hasDesign === false) {
          newRequirements = {
            ...newRequirements,
            designFormat: 'none' as DesignFormat,
          };
        }

        // 実質的に同じオブジェクトなら更新しない
        if (
          JSON.stringify(prevRequirements) === JSON.stringify(newRequirements)
        ) {
          return prev;
        }

        return {
          ...prev,
          implementationRequirements: newRequirements,
        };
      });
    },
    [setFormData]
  );

  /**
   * デザイン形式の日本語表示を取得
   */
  const getDesignFormatLabel = useCallback((format: DesignFormat): string => {
    const formatMap: Record<DesignFormat, string> = {
      figma: 'Figma',
      xd: 'Adobe XD',
      photoshop: 'Photoshop',
      sketch: 'Sketch',
      other: 'その他',
      none: '提供なし',
    };
    return formatMap[format] || '不明';
  }, []);

  // 計算に必要なパラメータをメモ化
  const calculationParams = useMemo(
    () => ({
      requirements: requirements as ImplementationRequirements,
      projectType: formData.projectType,
      basePrice: formData.baseCost || 1000000,
    }),
    [requirements, formData.projectType, formData.baseCost]
  );

  // 実装要件に基づく追加コストを計算
  useEffect(() => {
    const calculateCosts = () => {
      setIsLoading(true);
      try {
        // メモ化したパラメータを使用
        const costs = calculateImplementationCosts(
          calculationParams.requirements,
          calculationParams.projectType,
          calculationParams.basePrice
        );
        setImplementationCosts(costs);

        // 費用計算結果が変わった場合のみformDataを更新
        setFormData((prev) => {
          if (!prev.implementationRequirements) return prev;

          const newData = {
            ...prev,
            implementationRequirements: {
              ...prev.implementationRequirements,
              // コスト計算結果を追加
              designCost: {
                amount: costs.designCost.amount,
                duration: costs.designCost.duration,
              },
              assetsCost: {
                amount: costs.assetsCost.amount,
                duration: costs.assetsCost.duration,
              },
              contentCost: {
                amount: costs.contentCost.amount,
                duration: costs.contentCost.duration,
              },
              totalAdditionalCost: costs.totalAdditionalCost,
              additionalDuration: costs.additionalDuration,
            },
          };

          // 費用に変更がない場合は前の状態を返す
          if (
            prev.implementationRequirements.totalAdditionalCost ===
              costs.totalAdditionalCost &&
            prev.implementationRequirements.additionalDuration ===
              costs.additionalDuration
          ) {
            return prev;
          }

          return newData;
        });
      } catch (error) {
        console.error('実装要件コスト計算エラー:', error);
      } finally {
        setIsLoading(false);
      }
    };

    calculateCosts();
  }, [
    calculationParams.requirements,
    calculationParams.projectType,
    calculationParams.basePrice,
    setFormData,
  ]);

  const handleNext = useCallback(() => {
    setCurrentStep('modern-estimate');
  }, [setCurrentStep]);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          ホームページ/アプリケーション開発に必要な素材やデータについてお聞かせください。
          提供できないものについては制作費用が追加で発生します。
        </p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <Card className="p-4 bg-white">
          <Label className="text-base font-medium block mb-2">
            デザインデータはありますか？
          </Label>
          <p className="text-sm text-muted-foreground mb-4">
            Figma、Adobe
            XD、Sketchなどで作成された画面デザインデータがあれば、より忠実な再現と効率的な開発が可能になります。
          </p>
          <RadioGroup
            value={getRadioValue(requirements.hasDesign)}
            onValueChange={(value) => {
              const requirementState = getRequirementState(value);
              // 前の値と同じなら更新しない
              if (requirementState === requirements.hasDesign) return;
              updateRequirements({
                hasDesign: requirementState,
                designFormat:
                  requirementState === true
                    ? requirements.designFormat
                    : ('none' as DesignFormat),
              });
            }}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="hasDesign-yes" />
              <Label htmlFor="hasDesign-yes">はい、提供できます</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="entrust" id="hasDesign-entrust" />
              <Label htmlFor="hasDesign-entrust">
                全てお任せします（お得な料金で承ります）
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="collaborate" id="hasDesign-collaborate" />
              <Label htmlFor="hasDesign-collaborate">
                一緒に考えたいです（ヒアリングを重視します）
              </Label>
            </div>
          </RadioGroup>

          {requirements.hasDesign === true && (
            <div className="mt-4 pt-4 border-t border-muted">
              <Label className="text-base font-medium block mb-4">
                デザインデータの形式を選択してください
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {designFormats.map((format) => (
                  <Card
                    key={format.value}
                    className={cn(
                      'p-4 flex flex-col items-center justify-center cursor-pointer transition-colors border-2',
                      {
                        'border-primary bg-primary/5':
                          requirements.designFormat === format.value,
                        'border-transparent hover:border-muted-foreground/50':
                          requirements.designFormat !== format.value,
                      }
                    )}
                    onClick={() => {
                      // 同じ値を選択する場合は更新しない
                      if (requirements.designFormat === format.value) return;
                      updateRequirements({ designFormat: format.value });
                    }}
                  >
                    <div className="mb-2 flex items-center justify-center text-muted-foreground">
                      <format.icon className="w-8 h-8" />
                    </div>
                    <span className="text-sm text-center">{format.label}</span>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Card>

        <Card className="p-4 bg-white">
          <Label className="text-base font-medium block mb-2">
            ブランドガイドラインはありますか？
          </Label>
          <p className="text-sm text-muted-foreground mb-4">
            色、フォント、ロゴの使用ルールなどが定められたガイドラインがあれば、デザインの一貫性を保ちやすくなります。
          </p>
          <RadioGroup
            value={getRadioValue(requirements.hasBrandGuidelines)}
            onValueChange={(value) => {
              const requirementState = getRequirementState(value);
              // 前の値と同じなら更新しない
              if (requirementState === requirements.hasBrandGuidelines) return;
              updateRequirements({ hasBrandGuidelines: requirementState });
            }}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="hasBrandGuidelines-yes" />
              <Label htmlFor="hasBrandGuidelines-yes">はい、提供できます</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="entrust" id="hasBrandGuidelines-entrust" />
              <Label htmlFor="hasBrandGuidelines-entrust">
                全てお任せします（お得な料金で承ります）
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="collaborate"
                id="hasBrandGuidelines-collaborate"
              />
              <Label htmlFor="hasBrandGuidelines-collaborate">
                一緒に考えたいです（ヒアリングを重視します）
              </Label>
            </div>
          </RadioGroup>
        </Card>

        <Card className="p-4">
          <Label className="text-base font-medium block mb-2">
            ロゴデータはありますか？
          </Label>
          <p className="text-sm text-muted-foreground mb-4">
            ホームページやアプリで使用するロゴのデータ（SVG,
            PNGなど）を提供いただけますか？
          </p>
          <RadioGroup
            value={getRadioValue(requirements.hasLogo)}
            onValueChange={(value) => {
              const requirementState = getRequirementState(value);
              // 前の値と同じなら更新しない
              if (requirementState === requirements.hasLogo) return;
              updateRequirements({ hasLogo: requirementState });
            }}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="hasLogo-yes" />
              <Label htmlFor="hasLogo-yes">はい、提供できます</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="entrust" id="hasLogo-entrust" />
              <Label htmlFor="hasLogo-entrust">
                全てお任せします（お得な料金で承ります）
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="collaborate" id="hasLogo-collaborate" />
              <Label htmlFor="hasLogo-collaborate">
                一緒に考えたいです（ヒアリングを重視します）
              </Label>
            </div>
          </RadioGroup>
        </Card>

        <Card className="p-4">
          <Label className="text-base font-medium block mb-2">
            アイコンデータはありますか？
          </Label>
          <p className="text-sm text-muted-foreground mb-4">
            メニューやボタンなどで使用するアイコンのデータを提供いただけますか？
          </p>
          <RadioGroup
            value={getRadioValue(requirements.hasIcons)}
            onValueChange={(value) => {
              const requirementState = getRequirementState(value);
              // 前の値と同じなら更新しない
              if (requirementState === requirements.hasIcons) return;
              updateRequirements({ hasIcons: requirementState });
            }}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="hasIcons-yes" />
              <Label htmlFor="hasIcons-yes">はい、提供できます</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="entrust" id="hasIcons-entrust" />
              <Label htmlFor="hasIcons-entrust">
                全てお任せします（お得な料金で承ります）
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="collaborate" id="hasIcons-collaborate" />
              <Label htmlFor="hasIcons-collaborate">
                一緒に考えたいです（ヒアリングを重視します）
              </Label>
            </div>
          </RadioGroup>
        </Card>

        <Card className="p-4">
          <Label className="text-base font-medium block mb-2">
            画像素材はありますか？
          </Label>
          <p className="text-sm text-muted-foreground mb-4">
            ホームページやアプリ内で使用する写真やイラストなどの画像素材を提供いただけますか？
          </p>
          <RadioGroup
            value={getRadioValue(requirements.hasImages)}
            onValueChange={(value) => {
              const requirementState = getRequirementState(value);
              // 前の値と同じなら更新しない
              if (requirementState === requirements.hasImages) return;
              updateRequirements({ hasImages: requirementState });
            }}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="hasImages-yes" />
              <Label htmlFor="hasImages-yes">はい、提供できます</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="entrust" id="hasImages-entrust" />
              <Label htmlFor="hasImages-entrust">
                全てお任せします（お得な料金で承ります）
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="collaborate" id="hasImages-collaborate" />
              <Label htmlFor="hasImages-collaborate">
                一緒に考えたいです（ヒアリングを重視します）
              </Label>
            </div>
          </RadioGroup>
        </Card>

        <Card className="p-4">
          <Label className="text-base font-medium block mb-2">
            使用したいカスタムフォントはありますか？
          </Label>
          <p className="text-sm text-muted-foreground mb-4">
            特定のフォント（有料フォントや特殊なフォント）を使用したい場合、ライセンス情報と合わせてご指定ください。
          </p>
          <RadioGroup
            value={getRadioValue(requirements.hasCustomFonts)}
            onValueChange={(value) => {
              const requirementState = getRequirementState(value);
              // 前の値と同じなら更新しない
              if (requirementState === requirements.hasCustomFonts) return;
              updateRequirements({ hasCustomFonts: requirementState });
            }}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="hasCustomFonts-yes" />
              <Label htmlFor="hasCustomFonts-yes">はい、あります</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="entrust" id="hasCustomFonts-entrust" />
              <Label htmlFor="hasCustomFonts-entrust">
                全てお任せします（標準フォントで構いません）
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="collaborate"
                id="hasCustomFonts-collaborate"
              />
              <Label htmlFor="hasCustomFonts-collaborate">
                一緒に選びたいです（フォント選定にこだわりたい）
              </Label>
            </div>
          </RadioGroup>
        </Card>

        <Card className="p-4">
          <Label className="text-base font-medium block mb-2">
            掲載するコンテンツ（文章など）は用意されていますか？
          </Label>
          <p className="text-sm text-muted-foreground mb-4">
            ホームページやアプリに掲載するテキスト、説明文などのコンテンツは作成済みですか？
          </p>
          <RadioGroup
            value={getRadioValue(requirements.hasContent)}
            onValueChange={(value) => {
              const requirementState = getRequirementState(value);
              // 前の値と同じなら更新しない
              if (requirementState === requirements.hasContent) return;
              updateRequirements({ hasContent: requirementState });
            }}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="hasContent-yes" />
              <Label htmlFor="hasContent-yes">はい、用意があります</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="entrust" id="hasContent-entrust" />
              <Label htmlFor="hasContent-entrust">
                全てお任せします（必要な情報は提供します）
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="collaborate" id="hasContent-collaborate" />
              <Label htmlFor="hasContent-collaborate">
                一緒に作成したいです（打ち合わせを重視します）
              </Label>
            </div>
          </RadioGroup>
        </Card>
      </div>

      <SummaryCard
        onNext={handleNext}
        title="実装要件サマリー"
        subtitle="お客様側で用意できない項目は弊社で作成します"
        buttonText="最新の開発手法で見積もりを出す"
        showModernOption={false}
        useCustomPrice={true}
        totalPrice={implementationCosts?.totalAdditionalCost || 0}
        useCustomDuration={true}
        totalDuration={implementationCosts?.additionalDuration || 0}
      >
        <div className="space-y-3 text-sm">
          <div>
            <h4 className="font-medium mb-2">デザイン関連</h4>
            <ul className="space-y-1">
              <li className="flex items-center">
                {requirements.hasDesign ? (
                  <Check className="w-4 h-4 mr-2 text-green-500 shrink-0" />
                ) : (
                  <X className="w-4 h-4 mr-2 text-red-500 shrink-0" />
                )}
                <span>
                  デザインデータ (
                  {getDesignFormatLabel(
                    (requirements.designFormat || 'none') as DesignFormat
                  )}
                  )
                </span>
              </li>
              <li className="flex items-center">
                {requirements.hasBrandGuidelines ? (
                  <Check className="w-4 h-4 mr-2 text-green-500 shrink-0" />
                ) : (
                  <X className="w-4 h-4 mr-2 text-red-500 shrink-0" />
                )}
                <span>ブランドガイドライン</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">アセット関連</h4>
            <ul className="space-y-1">
              <li className="flex items-center">
                {requirements.hasLogo ? (
                  <Check className="w-4 h-4 mr-2 text-green-500 shrink-0" />
                ) : (
                  <X className="w-4 h-4 mr-2 text-red-500 shrink-0" />
                )}
                <span>ロゴデータ</span>
              </li>
              <li className="flex items-center">
                {requirements.hasImages ? (
                  <Check className="w-4 h-4 mr-2 text-green-500 shrink-0" />
                ) : (
                  <X className="w-4 h-4 mr-2 text-red-500 shrink-0" />
                )}
                <span>画像素材</span>
              </li>
              <li className="flex items-center">
                {requirements.hasIcons ? (
                  <Check className="w-4 h-4 mr-2 text-green-500 shrink-0" />
                ) : (
                  <X className="w-4 h-4 mr-2 text-red-500 shrink-0" />
                )}
                <span>アイコン素材</span>
              </li>
              <li className="flex items-center">
                {requirements.hasCustomFonts ? (
                  <Check className="w-4 h-4 mr-2 text-green-500 shrink-0" />
                ) : (
                  <span className="w-4 h-4 mr-2" />
                )}
                <span>
                  カスタムフォント{' '}
                  {requirements.hasCustomFonts ? '(あり)' : '(なし)'}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">コンテンツ関連</h4>
            <ul className="space-y-1">
              <li className="flex items-center">
                {requirements.hasContent ? (
                  <Check className="w-4 h-4 mr-2 text-green-500 shrink-0" />
                ) : (
                  <X className="w-4 h-4 mr-2 text-red-500 shrink-0" />
                )}
                <span>コンテンツ (文章・説明文等)</span>
              </li>
            </ul>
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            ✓: お客様側で用意可能 / ✗: 弊社で作成（追加費用あり）
          </p>

          {!isLoading &&
            implementationCosts &&
            implementationCosts.totalAdditionalCost > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="font-medium mb-2">追加費用内訳</h4>
                {implementationCosts.designCost.amount > 0 && (
                  <div className="flex justify-between text-xs mb-1">
                    <span>デザイン関連：</span>
                    <span>
                      {implementationCosts.designCost.amount.toLocaleString()}円
                    </span>
                  </div>
                )}
                {implementationCosts.assetsCost.amount > 0 && (
                  <div className="flex justify-between text-xs mb-1">
                    <span>アセット関連：</span>
                    <span>
                      {implementationCosts.assetsCost.amount.toLocaleString()}円
                    </span>
                  </div>
                )}
                {implementationCosts.contentCost.amount > 0 && (
                  <div className="flex justify-between text-xs mb-1">
                    <span>コンテンツ関連：</span>
                    <span>
                      {implementationCosts.contentCost.amount.toLocaleString()}
                      円
                    </span>
                  </div>
                )}
              </div>
            )}
        </div>
      </SummaryCard>
    </div>
  );
}
