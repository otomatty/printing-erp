# Topic Category Server Actions

このディレクトリには、トピックカテゴリに関するサーバーアクションがまとめられています。
以下のファイルで、各操作の目的と仕様を確認してください。

## ファイル一覧と概要

- **createCategory.ts**
  - トピックカテゴリの新規作成を行います。
  - 引数: `formData: TopicCategoryFormData`
  - 主な処理:
    1. 管理者権限チェック (`ensureAdmin`)
    2. 入力バリデーション (`topicCategoryFormSchema`)
    3. slug の一意性チェック
    4. データベースへの挿入
    5. キャッシュ再検証 (`revalidatePath('/website/topics')`)

- **listCategories.ts**
  - トピックカテゴリ一覧を取得します。
  - 引数: なし
  - 主な処理:
    1. 管理者権限チェック
    2. 全カテゴリ取得 (`topics_categories` テーブル)
    3. `created_at` 順ソート

- **updateCategory.ts**
  - トピックカテゴリの更新を行います。
  - 引数: `id: string, formData: TopicCategoryFormData`
  - 主な処理:
    1. 管理者権限チェック
    2. 入力バリデーション
    3. slug 変更時の一意性チェック
    4. データベース更新
    5. キャッシュ再検証

- **deleteCategory.ts**
  - トピックカテゴリの削除を行います。
  - 引数: `id: string`
  - 主な処理:
    1. 管理者権限チェック
    2. カテゴリ使用トピック数チェック
    3. カテゴリ削除
    4. キャッシュ再検証

- **updateCategoryOrder.ts**
  - カテゴリの表示順を更新します。
  - 引数: `categoryOrders: { id: string; display_order: number }[]`
  - 主な処理:
    1. 管理者権限チェック
    2. 各カテゴリの `display_order` 更新
    3. キャッシュ再検証 (`revalidatePath('/website/topics')`)

## 共通仕様

- 全ファイル先頭に `'use server'` を記述
- 管理者チェック: `ensureAdmin()`
- Supabase クライアント: `getSupabaseServerClient()`
- エラーハンドリング: `try/catch` + `console.error`
- キャッシュ再検証: `revalidatePath()`
