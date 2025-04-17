import type {
  ImplementationRequirements,
  ImplementationCosts,
  EstimateFormData,
  ProjectType,
} from '~/types/estimate';
import {
  getDesignBaseCost,
  getBrandGuidelinesCost,
  getLogoCost,
  getImagesCost,
  getIconsCost,
  getContentBaseCost,
  getProjectSizeFactor,
  formatPrice,
} from './implementationCostFactors';

/**
 * EstimateFormDataからImplementationRequirementsを抽出する
 */
function extractRequirementsFromFormData(
  formData: EstimateFormData
): ImplementationRequirements {
  return (
    formData.implementationRequirements || {
      hasDesign: 'entrust',
      designFormat: 'none',
      hasBrandGuidelines: 'entrust',
      hasLogo: 'entrust',
      hasImages: 'entrust',
      hasIcons: 'entrust',
      hasCustomFonts: 'entrust',
      hasContent: 'entrust',
    }
  );
}

/**
 * 実装要件に基づいて追加コストを計算する
 * 各項目ごとに、クライアントが提供できない場合の追加費用を算出する
 *
 * @param formDataOrRequirements 実装要件データまたはフォームデータ全体
 * @param projectType プロジェクトタイプ
 * @param basePrice 基本価格
 * @returns 追加コストの計算結果
 */
export function calculateImplementationCosts(
  formDataOrRequirements: EstimateFormData | ImplementationRequirements,
  projectType?: ProjectType,
  basePrice?: number
): ImplementationCosts {
  // フォームデータが渡された場合は実装要件を抽出
  let requirements: ImplementationRequirements;
  let actualProjectType: ProjectType = 'website';
  let actualBasePrice = 1000000;

  if ('implementationRequirements' in formDataOrRequirements) {
    // EstimateFormDataの場合
    const formData = formDataOrRequirements as EstimateFormData;
    requirements = extractRequirementsFromFormData(formData);
    actualProjectType = projectType || formData.projectType;
    actualBasePrice = basePrice || formData.baseCost || 1000000;
  } else {
    // ImplementationRequirementsの場合
    requirements = formDataOrRequirements as ImplementationRequirements;
    actualProjectType = projectType || 'website';
    actualBasePrice = basePrice || 1000000;
  }

  // プロジェクト規模係数を計算（大きなプロジェクトほど資産の重要性も高くなる）
  const projectSizeFactor = getProjectSizeFactor(actualBasePrice);

  // デザインコスト計算
  const designCost = calculateDesignCost(
    requirements,
    actualProjectType,
    actualBasePrice,
    projectSizeFactor
  );

  // アセットコスト計算
  const assetsCost = calculateAssetsCost(
    requirements,
    actualProjectType,
    actualBasePrice,
    projectSizeFactor
  );

  // コンテンツコスト計算
  const contentCost = calculateContentCost(
    requirements,
    actualProjectType,
    actualBasePrice,
    projectSizeFactor
  );

  // 追加開発期間を計算
  const additionalDuration = calculateAdditionalDuration(
    designCost.amount,
    assetsCost.amount,
    contentCost.amount,
    actualBasePrice
  );

  // 合計コスト
  const totalAdditionalCost =
    designCost.amount + assetsCost.amount + contentCost.amount;

  return {
    designCost: {
      amount: designCost.amount,
      reason: designCost.reason,
      duration: designCost.duration,
    },
    assetsCost: {
      amount: assetsCost.amount,
      reason: assetsCost.reason,
      duration: assetsCost.duration,
    },
    contentCost: {
      amount: contentCost.amount,
      reason: contentCost.reason,
      duration: contentCost.duration,
    },
    totalAdditionalCost,
    additionalDuration,
  };
}

/**
 * デザイン関連の追加コストを計算
 */
function calculateDesignCost(
  requirements: ImplementationRequirements,
  projectType: ProjectType,
  basePrice: number,
  sizeFactor: number
): { amount: number; reason: string; duration: number } {
  let amount = 0;
  let duration = 0;
  const reasons: string[] = [];

  // デザインがない場合または提供方法による分岐
  if (requirements.hasDesign === 'entrust') {
    // 「全てお任せ」の場合 - 基本料金の20%
    const designBaseCost = getDesignBaseCost(projectType) * 0.2;
    amount += designBaseCost * sizeFactor;
    duration += 3; // デザイン作成の日数も短縮
    reasons.push(
      `デザインデータの作成（お任せプラン：${formatPrice(designBaseCost * sizeFactor)}）`
    );
  } else if (requirements.hasDesign === 'collaborate') {
    // 「一緒に考えたい」の場合 - 通常料金で協働作業
    const designBaseCost = getDesignBaseCost(projectType);
    amount += designBaseCost * sizeFactor;
    duration += 15; // 協働作業のため日数は増加
    reasons.push(
      `デザインデータの協働作成（${formatPrice(designBaseCost * sizeFactor)}）`
    );
  } else if (requirements.hasDesign === false) {
    // 「いいえ」の場合 - 通常の料金体系
    const designBaseCost = getDesignBaseCost(projectType);
    amount += designBaseCost * sizeFactor;
    duration += 10; // デザイン作成の基本日数
    reasons.push(
      `デザインデータの作成（${formatPrice(designBaseCost * sizeFactor)}）`
    );
  }

  // ブランドガイドラインがない場合または提供方法による分岐
  if (requirements.hasBrandGuidelines === 'entrust') {
    // 「全てお任せ」の場合 - 基本料金の20%
    const guidelinesCost = getBrandGuidelinesCost(projectType) * 0.2;
    amount += guidelinesCost * sizeFactor;
    duration += 2; // ブランドガイドライン作成の日数も短縮
    reasons.push(
      `ブランドガイドライン作成（お任せプラン：${formatPrice(guidelinesCost * sizeFactor)}）`
    );
  } else if (requirements.hasBrandGuidelines === 'collaborate') {
    // 「一緒に考えたい」の場合 - 通常料金で協働作業
    const guidelinesCost = getBrandGuidelinesCost(projectType);
    amount += guidelinesCost * sizeFactor;
    duration += 8; // 協働作業のため日数は増加
    reasons.push(
      `ブランドガイドラインの協働作成（${formatPrice(guidelinesCost * sizeFactor)}）`
    );
  } else if (requirements.hasBrandGuidelines === false) {
    // 「いいえ」の場合 - 通常の料金体系
    const guidelinesCost = getBrandGuidelinesCost(projectType);
    amount += guidelinesCost * sizeFactor;
    duration += 5; // ブランドガイドライン作成の日数
    reasons.push(
      `ブランドガイドライン作成（${formatPrice(guidelinesCost * sizeFactor)}）`
    );
  }

  // デザインは提供されるが、形式変換が必要な場合
  if (
    requirements.hasDesign === true &&
    requirements.designFormat !== 'figma'
  ) {
    const conversionCost = 50000; // 形式変換の追加コスト
    amount += conversionCost;
    duration += 2; // 変換作業の日数
    reasons.push(`デザインデータ変換作業（${formatPrice(conversionCost)}）`);
  }

  return {
    amount: Math.round(amount),
    reason:
      reasons.length > 0
        ? reasons.join('、')
        : 'デザイン関連の追加コストはありません',
    duration,
  };
}

/**
 * アセット関連の追加コストを計算
 */
function calculateAssetsCost(
  requirements: ImplementationRequirements,
  projectType: ProjectType,
  basePrice: number,
  sizeFactor: number
): { amount: number; reason: string; duration: number } {
  let amount = 0;
  let duration = 0;
  const reasons: string[] = [];

  // ロゴがない場合または提供方法による分岐
  if (requirements.hasLogo === 'entrust') {
    // 「全てお任せ」の場合 - 基本料金の20%
    const logoCost = getLogoCost(projectType) * 0.2;
    amount += logoCost * sizeFactor;
    duration += 2; // ロゴ作成の日数も短縮
    reasons.push(
      `ロゴデザイン作成（お任せプラン：${formatPrice(logoCost * sizeFactor)}）`
    );
  } else if (requirements.hasLogo === 'collaborate') {
    // 「一緒に考えたい」の場合 - 通常料金で協働作業
    const logoCost = getLogoCost(projectType);
    amount += logoCost * sizeFactor;
    duration += 7; // 協働作業のため日数は増加
    reasons.push(
      `ロゴデザインの協働作成（${formatPrice(logoCost * sizeFactor)}）`
    );
  } else if (requirements.hasLogo === false) {
    // 「いいえ」の場合 - 通常の料金体系
    const logoCost = getLogoCost(projectType);
    amount += logoCost * sizeFactor;
    duration += 5; // ロゴ作成の日数
    reasons.push(`ロゴデザイン作成（${formatPrice(logoCost * sizeFactor)}）`);
  }

  // 画像素材がない場合または提供方法による分岐
  if (requirements.hasImages === 'entrust') {
    // 「全てお任せ」の場合 - 基本料金の20%
    const imagesCost = getImagesCost(projectType) * 0.2;
    amount += imagesCost * sizeFactor;
    duration += 1; // 画像素材作成の日数も短縮
    reasons.push(
      `画像素材の調達・作成（お任せプラン：${formatPrice(imagesCost * sizeFactor)}）`
    );
  } else if (requirements.hasImages === 'collaborate') {
    // 「一緒に考えたい」の場合 - 通常料金で協働作業
    const imagesCost = getImagesCost(projectType);
    amount += imagesCost * sizeFactor;
    duration += 5; // 協働作業のため日数は増加
    reasons.push(
      `画像素材の協働選定・作成（${formatPrice(imagesCost * sizeFactor)}）`
    );
  } else if (requirements.hasImages === false) {
    // 「いいえ」の場合 - 通常の料金体系
    const imagesCost = getImagesCost(projectType);
    amount += imagesCost * sizeFactor;
    duration += 3; // 画像素材作成の日数
    reasons.push(
      `画像素材の調達・作成（${formatPrice(imagesCost * sizeFactor)}）`
    );
  }

  // アイコンがない場合または提供方法による分岐
  if (requirements.hasIcons === 'entrust') {
    // 「全てお任せ」の場合 - 基本料金の20%
    const iconsCost = getIconsCost(projectType) * 0.2;
    amount += iconsCost * sizeFactor;
    duration += 1; // アイコン作成の日数も短縮
    reasons.push(
      `アイコン素材の作成（お任せプラン：${formatPrice(iconsCost * sizeFactor)}）`
    );
  } else if (requirements.hasIcons === 'collaborate') {
    // 「一緒に考えたい」の場合 - 通常料金で協働作業
    const iconsCost = getIconsCost(projectType);
    amount += iconsCost * sizeFactor;
    duration += 5; // 協働作業のため日数は増加
    reasons.push(
      `アイコン素材の協働作成（${formatPrice(iconsCost * sizeFactor)}）`
    );
  } else if (requirements.hasIcons === false) {
    // 「いいえ」の場合 - 通常の料金体系
    const iconsCost = getIconsCost(projectType);
    amount += iconsCost * sizeFactor;
    duration += 3; // アイコン作成の日数
    reasons.push(
      `アイコン素材の作成（${formatPrice(iconsCost * sizeFactor)}）`
    );
  }

  // カスタムフォントがある場合（ライセンス費用）
  if (requirements.hasCustomFonts === true) {
    const fontsCost = 50000; // フォントライセンスの平均コスト
    amount += fontsCost;
    duration += 1; // フォント設定の日数
    reasons.push(
      `カスタムフォントのライセンス費用（${formatPrice(fontsCost)}）`
    );
  } else if (requirements.hasCustomFonts === 'collaborate') {
    // 一緒に選びたい場合はフォント選定費用が追加
    const fontSelectionCost = 30000;
    amount += fontSelectionCost;
    duration += 2; // フォント選定の日数
    reasons.push(`フォント選定サポート（${formatPrice(fontSelectionCost)}）`);
  }

  return {
    amount: Math.round(amount),
    reason:
      reasons.length > 0
        ? reasons.join('、')
        : 'アセット関連の追加コストはありません',
    duration,
  };
}

/**
 * コンテンツ関連の追加コストを計算
 */
function calculateContentCost(
  requirements: ImplementationRequirements,
  projectType: ProjectType,
  basePrice: number,
  sizeFactor: number
): { amount: number; reason: string; duration: number } {
  let amount = 0;
  let duration = 0;
  const reasons: string[] = [];

  // コンテンツがない場合または提供方法による分岐
  if (requirements.hasContent === 'entrust') {
    // 「全てお任せ」の場合 - 基本料金の20%
    const contentBaseCost = getContentBaseCost(projectType) * 0.2;
    amount += contentBaseCost * sizeFactor;
    duration += 3; // コンテンツ作成の日数も短縮
    reasons.push(
      `コンテンツ作成（お任せプラン：${formatPrice(contentBaseCost * sizeFactor)}）`
    );
  } else if (requirements.hasContent === 'collaborate') {
    // 「一緒に考えたい」の場合 - 通常料金で協働作業
    const contentBaseCost = getContentBaseCost(projectType);
    amount += contentBaseCost * sizeFactor;
    duration += 10; // 協働作業のため日数は増加
    reasons.push(
      `コンテンツの協働作成（${formatPrice(contentBaseCost * sizeFactor)}）`
    );
  } else if (requirements.hasContent === false) {
    // 「いいえ」の場合 - 通常の料金体系
    const contentBaseCost = getContentBaseCost(projectType);
    amount += contentBaseCost * sizeFactor;
    duration += 7; // コンテンツ作成の日数
    reasons.push(
      `コンテンツ作成（${formatPrice(contentBaseCost * sizeFactor)}）`
    );
  }

  return {
    amount: Math.round(amount),
    reason:
      reasons.length > 0
        ? reasons.join('、')
        : 'コンテンツ関連の追加コストはありません',
    duration,
  };
}

/**
 * 追加開発期間（日数）を計算
 */
function calculateAdditionalDuration(
  designCost: number,
  assetsCost: number,
  contentCost: number,
  basePrice: number
): number {
  // コストを基準に必要な日数を概算
  const totalAdditionalCost = designCost + assetsCost + contentCost;

  // 追加コストが基本価格に対して占める割合に応じて日数を計算
  const ratio = totalAdditionalCost / basePrice;

  if (ratio < 0.1) return 5; // 10%未満なら5日
  if (ratio < 0.2) return 10; // 20%未満なら10日
  if (ratio < 0.3) return 15; // 30%未満なら15日
  if (ratio < 0.5) return 20; // 50%未満なら20日
  return 30; // それ以上なら30日
}
