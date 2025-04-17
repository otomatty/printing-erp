import { z } from 'zod';

const steps = [
  {
    id: 'project-type',
    title: 'プロジェクトの種類',
  },
  {
    id: 'description',
    title: 'プロジェクトの概要',
  },
  {
    id: 'deadline',
    title: '開発期間',
  },
  {
    id: 'ai-questions',
    title: '追加質問',
  },
  {
    id: 'feature-selection',
    title: '機能選択',
  },
  {
    id: 'implementation-requirements',
    title: '実装要件',
  },
  {
    id: 'modern-estimate',
    title: '最新開発手法',
  },
  {
    id: 'user-info',
    title: 'お客様情報',
  },
  {
    id: 'estimate-result',
    title: '見積もり結果',
  },
] as const;

export type StepId = (typeof steps)[number]['id'];

// プロジェクトの種類
export type ProjectType =
  | 'website'
  | 'business_system'
  | 'application'
  | 'other';

// 開発期間
export type Deadline = 'asap' | '1month' | '3months' | '6months' | 'flexible';

// 開発期間の日数マッピング
export const DEADLINE_TO_DAYS: Record<Deadline, number> = {
  asap: 14, // 2週間以内
  '1month': 30, // 1ヶ月以内
  '3months': 90, // 3ヶ月以内
  '6months': 180, // 6ヶ月以内
  flexible: 0, // 柔軟（追加料金なし）
};

// 特急料金の割増率
export const RUSH_FEE_RATES = {
  critical: 0.5, // 乖離率が-0.5以下 = 50%増
  high: 0.3, // 乖離率が-0.3以下 = 30%増
  medium: 0.2, // 乖離率が-0.2以下 = 20%増
  low: 0.1, // 乖離率が-0.1以下 = 10%増
  none: 0, // それ以外 = 追加なし
} as const;

// 特急料金の計算結果の型
export interface RushFeeCalculation {
  basePrice: number;
  rushFee: number;
  totalPrice: number;
  divergenceRate: number;
  appliedRate: number;
  reason: string;
  isTimelineDangerous?: boolean;
}

// デザイン提供形式
export type DesignFormat =
  | 'figma'
  | 'xd'
  | 'photoshop'
  | 'sketch'
  | 'other'
  | 'none';

// 実装要件の型
export interface ImplementationRequirements {
  // デザイン関連
  hasDesign: boolean | 'entrust' | 'collaborate';
  designFormat?: DesignFormat;
  hasBrandGuidelines: boolean | 'entrust' | 'collaborate';

  // アセット関連
  hasLogo: boolean | 'entrust' | 'collaborate';
  hasImages: boolean | 'entrust' | 'collaborate';
  hasIcons: boolean | 'entrust' | 'collaborate';
  hasCustomFonts: boolean | 'entrust' | 'collaborate';

  // コンテンツ関連
  hasContent: boolean | 'entrust' | 'collaborate';

  // コスト計算結果（PDFレンダリング用）
  designCost?: {
    amount: number;
    duration: number;
  };
  assetsCost?: {
    amount: number;
    duration: number;
  };
  contentCost?: {
    amount: number;
    duration: number;
  };
  totalAdditionalCost?: number;
  additionalDuration?: number;
}

// 実装要件による追加コストの計算結果
export interface ImplementationCosts {
  // デザイン関連
  designCost: {
    amount: number;
    reason: string;
    duration: number;
  };
  // アセット関連
  assetsCost: {
    amount: number;
    reason: string;
    duration: number;
  };
  // コンテンツ関連
  contentCost: {
    amount: number;
    reason: string;
    duration: number;
  };
  // 合計
  totalAdditionalCost: number;
  // 開発期間への影響（日数）
  additionalDuration: number;
}

// フォームデータの型を拡張
export interface EstimateFormData {
  projectType: ProjectType;
  description: string;
  deadline: Deadline;
  implementationRequirements?: ImplementationRequirements & {
    // 実装要件のコスト計算結果を保持するプロパティ
    designCost?: {
      amount: number;
      duration: number;
    };
    assetsCost?: {
      amount: number;
      duration: number;
    };
    contentCost?: {
      amount: number;
      duration: number;
    };
    totalAdditionalCost?: number;
    additionalDuration?: number;
  };
  features: string[];
  baseCost: number;
  rushFee: number;
  totalCost: number;
  // 最新開発手法関連のデータ
  modernCost?: number;
  installments?: number;
  monthlyPayment?: number;
  // 顧客情報
  customerName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  postalCode?: string;
  address?: string;
  preferredContact?: 'email' | 'phone' | 'either';
}

// AIが生成する質問の型 - フロントエンドでの管理用
export interface AIQuestion {
  questionId: string;
  questionText: string;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'number';
  options: string[] | null;
  validationRules: Record<string, unknown> | null;
  isAnswered: boolean; // ★ 回答済みかどうかのフラグ
  answer?: string | string[] | number; // ★ 回答内容 (optional)
  skipped: boolean; // ★ 明示的にスキップされたかどうか
  description?: string;
}

// AIQuestion インターフェースに対応する Zod スキーマ - フロントエンドでの利用想定
export const AIQuestionSchema = z.object({
  questionId: z.string().uuid(),
  questionText: z.string(),
  type: z.enum(['text', 'textarea', 'select', 'radio', 'checkbox', 'number']),
  options: z.array(z.string()).nullable(),
  validationRules: z.record(z.any()).nullable(),
  isAnswered: z.boolean().default(false), // ★ デフォルトは未回答
  answer: z.union([z.string(), z.array(z.string()), z.number()]).optional(), // ★ optionalに変更
  skipped: z.boolean().default(false), // ★ デフォルトはスキップされていない
  description: z.string().optional(),
});

// バックエンドから受け取る質問データの型 - Mastraワークフローの出力に合わせる
export const FollowUpQuestionResponseSchema = z.object({
  followUpQuestions: z.array(
    z.object({
      questionId: z.string().uuid(),
      questionText: z.string(),
      type: z.string(),
      options: z.any().nullable(),
      validationRules: z.any().nullable(),
    })
  ),
});

export type FollowUpQuestionResponse = z.infer<
  typeof FollowUpQuestionResponseSchema
>;

// ★ 質問の回答を送信する際の型 - Mastraの AnswerSchema と一致させる
export const QuestionAnswerSchema = z.object({
  questionId: z.string().uuid().describe('対応する質問のID'),
  answer: z
    .union([
      z.string().describe('テキスト回答、単一選択肢の選択値'),
      z.array(z.string()).describe('複数選択肢の選択値リスト'),
      z.number().describe('数値回答'),
    ])
    .nullable() // ★ nullableに変更
    .describe(
      '質問タイプに応じたユーザーの回答 (型は union)。未回答またはスキップの場合は null。'
    ),
  isAnswered: z.boolean().describe('ユーザーがこの質問に回答したかどうか'),
  skipped: z
    .boolean()
    .describe('ユーザーが明示的にこの質問をスキップしたかどうか'),
});

export type QuestionAnswer = z.infer<typeof QuestionAnswerSchema>;

// AIが提案する機能の型
export interface FeatureProposal {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isRequired: boolean;
  category: 'core' | 'user' | 'auth' | 'content' | 'payment' | 'other';
  dependencies?: string[];
  reason?: string; // 必須/任意の判断理由
  difficulty?: number; // 実装難易度（1-5）
  dailyRate?: number; // 1日あたりの単価
  difficultyReason?: string; // 難易度の判断理由
}

// --- Mastra Workflow (estimate-system) から持ってきたスキーマ定義 ---

// プロジェクトタイプ (Mastra側と合わせる)
export const ProjectTypeSchema = z.union([
  z.literal('website'),
  z.literal('business_system'),
  z.literal('application'),
  z.literal('other'),
]);

// 時間単価 (Mastra側と合わせる)
export const HourlyRatesSchema = z
  .object({
    website: z.number().positive().optional(),
    business_system: z.number().positive().optional(),
    application: z.number().positive().optional(),
    other: z.number().positive().optional(),
  })
  .optional();

// 類似プロジェクト (Mastra側と合わせる)
export const ProjectTemplateWithSimilaritySchema = z.object({
  id: z.string(),
  user_id: z.string().nullable().optional(),
  name: z.string(),
  category_id: z.string(),
  description: z.string().nullable().optional(),
  actual_hours: z.number().nullable().optional(),
  actual_cost: z.number().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  content_embedding: z.array(z.number()).nullable().optional(),
  similarity: z.number(),
});

export type ProjectTemplateWithSimilarity = z.infer<
  typeof ProjectTemplateWithSimilaritySchema
>;

// --- ここまで Mastra Workflow から持ってきたスキーマ定義 ---

// 見積明細アイテムの型定義
export interface EstimateItem {
  id: string;
  name: string;
  description?: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  note?: string;
  duration?: number; // 工数（日数）
}

// 見積書データの型定義
export interface EstimateWithItems {
  id: string;
  estimateNumber: string;
  issueDate: string | Date;
  customerName: string;
  customerDepartment?: string;
  customerAddress?: string;
  projectName?: string;
  projectType?: ProjectType;
  deadline?: Deadline;
  description?: string;
  deliveryDate?: string | Date;
  validUntil?: string | Date;
  paymentTerms?: string;
  salesPerson?: string;
  totalAmount: number;
  originalPrice?: number; // 従来の開発手法での価格（割引前）
  totalDuration?: number;
  rushFee?: number;
  rushFeeNote?: string;
  notes?: string[] | string;
  items: EstimateItem[];

  // 実装要件情報（オプショナル）
  implementationRequirements?: ImplementationRequirements;
}
