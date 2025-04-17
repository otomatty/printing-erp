import type { ProjectType } from '~/types/estimate';

// 基準となる単価設定
export const IMPLEMENTATION_COST_FACTORS = {
  // デザイン関連
  design: {
    base: 100000, // デザイン基本料金
    formatFactors: {
      // デザインツールごとの係数
      figma: 0.8, // Figma提供の場合は20%割引
      xd: 0.8, // XD提供の場合は20%割引
      photoshop: 1.2, // PSD提供の場合は20%割増（変換作業）
      sketch: 1.1, // Sketch提供の場合は10%割増
      other: 1.3, // その他形式は30%割増
      none: 1.0, // デザイン提供なしの場合
    },
    brandGuide: 50000, // ブランドガイドライン作成
  },

  // アセット関連
  assets: {
    logo: {
      base: 100000, // ロゴ制作基本料金
      simple: 50000, // シンプルなロゴ
      complex: 150000, // 複雑なロゴ
    },
    icons: {
      base: 3000, // 1アイコンあたりの制作費用
      set: 30000, // アイコンセット（10個程度）
    },
    images: {
      processing: 1000, // 1枚あたりの画像処理費用
    },
    fonts: {
      license: 50000, // フォントライセンス費用（年間）
    },
  },

  // コンテンツ関連
  content: {
    writing: {
      base: 10000, // 1ページあたりの文章制作費用
      technical: 20000, // 技術文書1ページあたり
    },
  },
};

// 開発期間への影響（日数）
export const IMPLEMENTATION_DURATION_FACTORS = {
  design: {
    creation: {
      base: 10, // デザイン作成基本日数
      perPage: 2, // 1ページあたりの追加日数
    },
    conversion: 2, // デザインデータ変換
    brandGuide: 5, // ブランドガイドライン作成
  },
  assets: {
    logo: {
      simple: 3, // シンプルなロゴ
      complex: 7, // 複雑なロゴ
    },
    icons: {
      perIcon: 0.5, // 1アイコンあたり
      set: 3, // アイコンセット（10個程度）
    },
    images: {
      perImage: 0.2, // 1枚あたりの画像処理
    },
  },
  content: {
    writing: {
      perPage: 1, // 1ページあたりの文章制作
      technical: 2, // 技術文書1ページあたり
    },
  },
};

/**
 * プロジェクトタイプごとのデザイン基本コスト
 */
export function getDesignBaseCost(projectType: ProjectType): number {
  switch (projectType) {
    case 'website':
      return 200000; // Webサイトのデザイン基本料金
    case 'business_system':
      return 300000; // 業務システムのデザイン基本料金
    case 'application':
      return 400000; // Webアプリケーションのデザイン基本料金
    case 'other':
      return 300000; // その他のデザイン基本料金
  }
}

/**
 * プロジェクトタイプごとのブランドガイドライン作成コスト
 */
export function getBrandGuidelinesCost(projectType: ProjectType): number {
  switch (projectType) {
    case 'website':
      return 200000; // Webサイトのブランドガイドライン作成費
    case 'business_system':
      return 150000; // 業務システムのブランドガイドライン作成費
    case 'application':
      return 250000; // Webアプリケーションのブランドガイドライン作成費
    case 'other':
      return 200000; // その他のブランドガイドライン作成費
  }
}

/**
 * プロジェクトタイプごとのロゴ作成コスト
 */
export function getLogoCost(projectType: ProjectType): number {
  switch (projectType) {
    case 'website':
      return 150000; // Webサイトのロゴデザイン費
    case 'business_system':
      return 100000; // 業務システムのロゴデザイン費
    case 'application':
      return 200000; // Webアプリケーションのロゴデザイン費
    case 'other':
      return 150000; // その他のロゴデザイン費
  }
}

/**
 * プロジェクトタイプごとの画像素材コスト
 */
export function getImagesCost(projectType: ProjectType): number {
  switch (projectType) {
    case 'website':
      return 200000; // Webサイトの画像素材費
    case 'business_system':
      return 100000; // 業務システムの画像素材費
    case 'application':
      return 150000; // Webアプリケーションの画像素材費
    case 'other':
      return 120000; // その他の画像素材費
  }
}

/**
 * プロジェクトタイプごとのアイコン素材コスト
 */
export function getIconsCost(projectType: ProjectType): number {
  switch (projectType) {
    case 'website':
      return 60000; // Webサイトのアイコン素材費
    case 'business_system':
      return 100000; // 業務システムのアイコン素材費
    case 'application':
      return 80000; // Webアプリケーションのアイコン素材費
    case 'other':
      return 80000; // その他のアイコン素材費
  }
}

/**
 * プロジェクトタイプごとのコンテンツ作成コスト
 */
export function getContentBaseCost(projectType: ProjectType): number {
  switch (projectType) {
    case 'website':
      return 250000; // Webサイトのコンテンツ作成費
    case 'business_system':
      return 200000; // 業務システムのコンテンツ作成費
    case 'application':
      return 300000; // Webアプリケーションのコンテンツ作成費
    case 'other':
      return 200000; // その他のコンテンツ作成費
  }
}

/**
 * プロジェクト規模係数を算出
 * 基本価格に応じた係数を返す
 */
export function getProjectSizeFactor(basePrice: number): number {
  if (basePrice < 500000) return 0.8; // 小規模
  if (basePrice < 2000000) return 1.0; // 中規模
  if (basePrice < 5000000) return 1.2; // 大規模
  return 1.5; // 超大規模
}

/**
 * 金額を表示用にフォーマット
 */
export function formatPrice(price: number): string {
  return `${Math.round(price).toLocaleString()}円`;
}
