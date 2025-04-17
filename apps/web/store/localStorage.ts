/**
 * ローカルストレージに保存されるjotaiアトムの値のキャッシュ
 * サーバーサイドでの初期値取得に使用される
 */
export const localStorageAtomCache: Record<string, unknown> = {};

// デフォルト値の設定例
// formDataAtomのデフォルト値
localStorageAtomCache.jotai_formDataAtom = {
  projectType: 'website',
  description: '',
  deadline: 'flexible',
  features: [],
  baseCost: 0,
  rushFee: 0,
  totalCost: 0,
};

// proposedFeaturesAtomのデフォルト値
localStorageAtomCache.jotai_proposedFeaturesAtom = [];

// selectedFeatureIdsAtomのデフォルト値
localStorageAtomCache.jotai_selectedFeatureIdsAtom = [];
