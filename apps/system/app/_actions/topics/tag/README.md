# Topic Tag Server Actions

このディレクトリには、トピックタグに関するサーバーアクションがまとめられています。
以下のファイルで、各操作の目的と仕様を確認してください。

## ファイル一覧と概要

- **createTag.ts**
  - トピックタグの新規作成を行います。
  - 引数: `formData: TopicTagFormData`
  - 主な処理:
    1. 管理者権限チェック (`ensureAdmin`)
    2. 入力バリデーション (`topicTagFormSchema`)
    3. slug の一意性チェック
    4. データベースへの挿入
    5. キャッシュ再検証 (`revalidatePath('/website/topics')`)

- **listTags.ts**
  - トピックタグ一覧を取得します。
  - 引数: なし
  - 主な処理:
    1. 管理者権限チェック (`ensureAdmin`)
    2. 全タグ取得 (`topics_tags` テーブル)
    3. `created_at` 順ソート

- **updateTag.ts**
  - トピックタグの更新を行います。
  - 引数: `id: string, formData: TopicTagFormData`
  - 主な処理:
    1. 管理者権限チェック (`ensureAdmin`)
    2. 入力バリデーション (`topicTagFormSchema`)
    3. slug 変更時の一意性チェック
    4. データベース更新
    5. キャッシュ再検証 (`revalidatePath('/website/topics')`)

- **deleteTag.ts**
  - トピックタグの削除を行います。
  - 引数: `id: string`
  - 主な処理:
    1. 管理者権限チェック (`ensureAdmin`)
    2. タグ使用トピック数チェック
    3. タグ削除
    4. キャッシュ再検証 (`revalidatePath('/website/topics')`)

## 共通仕様

- 全ファイル先頭に `'use server'` を記述
- 管理者チェック: `ensureAdmin()`
- Supabase クライアント: `getSupabaseServerClient()`
- エラーハンドリング: `try/catch` + `console.error`
- キャッシュ再検証: `revalidatePath()`
