/**
 * 業務カテゴリの設定ファイル
 * システム全体で統一して使用するカテゴリ定義と色スタイル設定
 * @module category.config
 */

/**
 * カテゴリIDの型定義
 * 新しいカテゴリを追加する場合はここに追加する
 */
export type CategoryId =
  | 'sales'
  | 'design'
  | 'production'
  | 'shipping'
  | 'website'
  | 'admin'
  | 'google'
  | 'tools';

/**
 * カテゴリ情報の型定義
 */
export interface CategoryInfo {
  id: CategoryId;
  name: string;
  bg: string;
  icon: string;
  hover: string;
}

/**
 * カテゴリごとの表示名と色スタイル設定
 * 各カテゴリの背景色、アイコン色、ホバー時の背景色を定義
 */
export const categories: Record<CategoryId, CategoryInfo> = {
  sales: {
    id: 'sales',
    name: '営業受注',
    bg: 'bg-blue-100',
    icon: 'text-primary',
    hover: 'hover:bg-blue-200',
  },
  design: {
    id: 'design',
    name: '制作デザイン',
    bg: 'bg-purple-100',
    icon: 'text-purple-600',
    hover: 'hover:bg-purple-200',
  },
  production: {
    id: 'production',
    name: '製造印刷',
    bg: 'bg-green-100',
    icon: 'text-green-600',
    hover: 'hover:bg-green-200',
  },
  shipping: {
    id: 'shipping',
    name: '出荷請求',
    bg: 'bg-amber-100',
    icon: 'text-amber-600',
    hover: 'hover:bg-amber-200',
  },
  website: {
    id: 'website',
    name: 'ホームページ管理',
    bg: 'bg-indigo-100',
    icon: 'text-indigo-600',
    hover: 'hover:bg-indigo-200',
  },
  admin: {
    id: 'admin',
    name: '管理',
    bg: 'bg-gray-200',
    icon: 'text-gray-700',
    hover: 'hover:bg-gray-300',
  },
  google: {
    id: 'google',
    name: 'Google',
    bg: 'bg-white',
    icon: 'text-gray-700',
    hover: 'hover:bg-gray-100',
  },
  tools: {
    id: 'tools',
    name: 'ツール',
    bg: 'bg-orange-100',
    icon: 'text-orange-600',
    hover: 'hover:bg-orange-200',
  },
};

/**
 * カテゴリの順序配列
 * 表示順序を維持するために使用する
 */
export const categoryOrder: CategoryId[] = [
  'sales',
  'design',
  'production',
  'shipping',
  'website',
  'google',
  'tools',
  'admin',
];

/**
 * 下位互換性のために残しておく古い形式のカテゴリカラー
 * @deprecated 新しいコードでは categories を使用してください
 */
export const categoryColors: Record<
  string,
  { bg: string; icon: string; hover: string }
> = {
  営業受注: categories.sales,
  制作デザイン: categories.design,
  製造印刷: categories.production,
  出荷請求: categories.shipping,
  ホームページ管理: categories.website,
  管理: categories.admin,
};
