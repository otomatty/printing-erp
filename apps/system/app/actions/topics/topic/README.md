# Topic Server Actions

このディレクトリには、特集記事（トピック）に関するサーバーアクションがまとめられています。
以下のファイルで、各操作の目的と仕様を確認してください。

## ファイル一覧と概要

- **createTopic.ts**
  - トピックの新規作成を行います。
  - 引数: `formData: TopicFormData`
  - 主な処理:
    1. 管理者権限チェック (`ensureAdmin`)
    2. 入力バリデーション (`topicFormSchema`)
    3. slugの一意性チェック
    4. データベースへの挿入
    5. キャッシュ再検証 (`revalidatePath('/website/topics')`)

- **listTopics.ts**
  - トピック一覧の取得（フィルタ・ページネーション対応）を行います。
  - 引数: `params: TopicSearchParams`
  - 主な処理:
    1. パラメータバリデーション (`topicSearchParamsSchema`)
    2. status / categoryId / queryによるフィルタ
    3. 固定limit=10でのページネーション
    4. データ取得と総件数取得

- **getTopicById.ts**
  - 指定IDのトピック詳細を取得します。
  - 引数: `id: string`
  - 主な処理:
    1. 管理者権限チェック
    2. topics, topics_categories, topics_tagsテーブル結合による詳細取得

- **updateTopic.ts**
  - トピック情報の更新を行います。
  - 引数: `id: string, formData: TopicFormData`
  - 主な処理:
    1. 管理者権限チェック
    2. 入力バリデーション
    3. 既存データ取得とslug変更時の一意性チェック
    4. published_atの調整
    5. データベース更新
    6. キャッシュ再検証

- **deleteTopic.ts**
  - トピックの削除を行います。
  - 引数: `id: string`
  - 主な処理:
    1. 管理者権限チェック
    2. 削除前にslug取得（キャッシュ無効化用）
    3. データ削除（CASCADE想定）
    4. キャッシュ再検証

- **publishTopic.ts**
  - トピックを公開状態に変更します。
  - 引数: `id: string, publishDate?: Date`
  - 主な処理:
    1. 管理者権限チェック
    2. statusを`published`に更新
    3. published_atの設定
    4. キャッシュ再検証

- **unpublishTopic.ts**
  - トピックを下書き状態に戻します。
  - 引数: `id: string`
  - 主な処理:
    1. 管理者権限チェック
    2. statusを`draft`に更新
    3. キャッシュ再検証


## 共通仕様

- 全ファイル先頭に `'use server'` を記述
- 管理者チェック: `ensureAdmin()`
- Supabaseクライアント: `getSupabaseServerClient()`
- エラーハンドリング: `try/catch` + `console.error` + エラー情報返却
- キャッシュ再検証: `revalidatePath()` を利用
