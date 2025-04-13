// ROIシミュレーション用のパラメータ型定義
export type RoiSystemParams = {
  initialCost: number; // 初期費用 (万円)
  monthlyCost: number; // 月額運用費 (万円/月)
  initialEffect: number; // 初期効果 (万円/月)
  maxEffect: number; // 最大効果 (万円/月)
  growthPeriod: number; // 成長が緩やかになるまでの期間（月）
};

export type RoiParams = {
  traditional: RoiSystemParams;
  ninuma: RoiSystemParams;
};

export type RoiPeriod = '18m' | '3y' | '5y';

export type RoiDataPoint = {
  month: string;
  traditional: number;
  ninuma: number;
  traditionalLabel: string;
  ninumaLabel: string;
};

// デフォルトのROIパラメータ
export const defaultRoiParams: RoiParams = {
  traditional: {
    initialCost: 400, // 初期費用 (万円)
    monthlyCost: 20, // 月額運用費 (万円/月)
    initialEffect: 20, // 初期効果 (万円/月)
    maxEffect: 40, // 最大効果 (万円/月)
    growthPeriod: 12, // 成長が緩やかになるまでの期間（月）
  },
  ninuma: {
    initialCost: 200, // 初期費用 (万円)
    monthlyCost: 10, // 月額運用費 (万円/月)
    initialEffect: 20, // 初期効果 (万円/月)
    maxEffect: 50, // 最大効果 (万円/月)
    growthPeriod: 12, // 成長が緩やかになるまでの期間（月）
  },
};

// 期間ごとの月とラベルの取得
export function getMonthsAndLabels(period: RoiPeriod): {
  months: number[];
  monthLabels: string[];
} {
  switch (period) {
    case '3y':
      return {
        months: [0, 6, 12, 18, 24, 30, 36],
        monthLabels: [
          '導入時',
          '6ヶ月後',
          '1年後',
          '1年半後',
          '2年後',
          '2年半後',
          '3年後',
        ],
      };
    case '5y':
      return {
        months: [0, 12, 24, 36, 48, 60],
        monthLabels: ['導入時', '1年後', '2年後', '3年後', '4年後', '5年後'],
      };
    default: // "18m"
      return {
        months: [0, 3, 6, 9, 12, 15, 18],
        monthLabels: [
          '導入時',
          '3ヶ月後',
          '6ヶ月後',
          '9ヶ月後',
          '12ヶ月後',
          '15ヶ月後',
          '18ヶ月後',
        ],
      };
  }
}

// S字カーブの効果計算関数（ロジスティック関数ベース）
export function calculateMonthlyEffect(
  initialEffect: number,
  maxEffect: number,
  growthPeriod: number,
  month: number
): number {
  if (month === 0) return 0; // 導入時は効果ゼロ

  // ロジスティック成長曲線のパラメータ調整
  const growthRate = 5 / growthPeriod; // 成長率パラメータ
  const midpoint = growthPeriod / 2; // 成長の変曲点（最も急成長する時点）

  // ロジスティック関数: y = min + (max-min)/(1 + e^(-k(x-midpoint)))
  const effect =
    initialEffect +
    (maxEffect - initialEffect) /
      (1 + Math.exp(-growthRate * (month - midpoint)));

  return Math.min(maxEffect, effect); // 最大効果を超えないようにする
}

// ROIグラフデータを計算する関数
export function calculateRoiData(
  period: RoiPeriod,
  params: RoiParams = defaultRoiParams
): RoiDataPoint[] {
  const { months, monthLabels } = getMonthsAndLabels(period);

  return months.map((month, index) => {
    // 従来型の計算
    let traditionalCumulativeCost = params.traditional.initialCost; // 初期費用
    let traditionalCumulativeEffect = 0;

    // ニイヌマ型の計算
    let ninumaCumulativeCost = params.ninuma.initialCost; // 初期費用
    let ninumaCumulativeEffect = 0;

    // 月ごとの累積を計算
    if (month > 0) {
      for (let m = 1; m <= month; m++) {
        // 従来型
        traditionalCumulativeCost += params.traditional.monthlyCost;
        const traditionalMonthEffect = calculateMonthlyEffect(
          params.traditional.initialEffect,
          params.traditional.maxEffect,
          params.traditional.growthPeriod,
          m
        );
        traditionalCumulativeEffect += traditionalMonthEffect;

        // ニイヌマ型
        ninumaCumulativeCost += params.ninuma.monthlyCost;
        const ninumaMonthEffect = calculateMonthlyEffect(
          params.ninuma.initialEffect,
          params.ninuma.maxEffect,
          params.ninuma.growthPeriod,
          m
        );
        ninumaCumulativeEffect += ninumaMonthEffect;
      }
    }

    // 収支計算(効果 - コスト)
    const traditionalBalance =
      traditionalCumulativeEffect - traditionalCumulativeCost;
    const ninumaBalance = ninumaCumulativeEffect - ninumaCumulativeCost;

    // ラベル作成 (表示用)
    const traditionalLabel =
      month === 0
        ? '初期投資'
        : `${traditionalBalance > 0 ? '+' : ''}${Math.round(traditionalBalance)}万円`;
    const ninumaLabel =
      month === 0
        ? '初期投資'
        : `${ninumaBalance > 0 ? '+' : ''}${Math.round(ninumaBalance)}万円`;

    return {
      month: monthLabels[index] ?? `${month}ヶ月後`,
      traditional: traditionalBalance, // グラフ用生データ
      ninuma: ninumaBalance, // グラフ用生データ
      traditionalLabel, // 表示用ラベル
      ninumaLabel, // 表示用ラベル
    };
  });
}

// 投資回収状況の判定を行い、結論テキストのコンポーネントに必要なデータを生成
export function getRoiRecoveryData(roiData: RoiDataPoint[]) {
  if (!roiData || roiData.length === 0) return null;

  const lastData = roiData[roiData.length - 1];
  if (!lastData) return null;

  // 投資回収状況の判定（数値で比較）
  const traditionalRecoveryMonthData = roiData.find(
    (d) => typeof d.traditional === 'number' && d.traditional >= 0
  );
  const ninumaRecoveryMonthData = roiData.find(
    (d) => typeof d.ninuma === 'number' && d.ninuma >= 0
  );

  const lastTraditionalBalance =
    typeof lastData.traditional === 'number'
      ? lastData.traditional
      : Number.NEGATIVE_INFINITY;
  const lastNinumaBalance =
    typeof lastData.ninuma === 'number'
      ? lastData.ninuma
      : Number.NEGATIVE_INFINITY;

  return {
    lastData,
    traditionalRecoveryMonthData,
    ninumaRecoveryMonthData,
    lastTraditionalBalance,
    lastNinumaBalance,
  };
}
