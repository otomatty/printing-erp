# 印刷会社ホームページ実装状況

## プロジェクト概要

このプロジェクトは印刷会社のコーポレートサイトとして、Next.js 15.2.4（App Router）を使用して実装されています。最新の技術スタックを活用し、パフォーマンスと開発効率を両立させたモダンなウェブアプリケーションです。

## 技術スタック

- **フロントエンド**
  - [Next.js](https://nextjs.org/) 15.2.4 (App Router)
  - [React](https://react.dev/) 19.0.0
  - [TypeScript](https://www.typescriptlang.org/) 5.x
  - [Tailwind CSS](https://tailwindcss.com/) 4.x
  - [shadcn/ui](https://ui.shadcn.com/)
  - [Framer Motion](https://www.framer.com/motion/) - アニメーション実装

- **バックエンド**
  - [Supabase](https://supabase.io/) - データベース、認証、ストレージ
  - Server Actions - フォーム処理、データ更新

- **ビルド・デプロイ**
  - [OpenNext](https://opennextjs.com/) - Cloudflare対応ビルド
  - [Wrangler](https://developers.cloudflare.com/workers/wrangler/) - Cloudflareデプロイ

## 実装済み機能

### コアページ
- ホームページ (`app/page.tsx`)
  - ヒーローセクション
  - サービス紹介
  - 最新ニュース表示
  - CTAセクション
- サービス紹介ページ (`app/services/`)
- 会社概要ページ (`app/about/`)
- お問い合わせページ (`app/contact/`)
- お知らせ一覧・詳細ページ (`app/news/`)
- 見積もりページ (`app/estimate/`)
- プライバシーポリシーページ (`app/privacy-policy/`)
- 補助金情報ページ (`app/hojokin/`)

### コンポーネント
- サービス詳細表示 (`components/services/service-details.tsx`)
  - モーションアニメーション対応
  - レスポンシブデザイン
- お問い合わせフォーム (`components/contact-form/`)
- カスタムレイアウトコンポーネント (`components/layout/`)
- 見積もり計算機能 (`components/calculator/`)

### データ連携
- ニュース記事取得・表示機能 (`actions/news.ts`)
  - 一覧取得
  - 詳細取得
  - カテゴリ別フィルタリング
  - 特集記事表示
- 認証機能 (`actions/auth.ts`)

## データモデル

### ニュース関連
- 記事データ (タイトル、内容、スラッグ、公開日、状態など)
- カテゴリデータ
- 添付ファイル

### サービス関連
- サービスカテゴリ
- サービス詳細
- サービス機能

## 開発環境セットアップ

```bash
# 依存関係インストール
bun install

# 開発サーバー起動 (ポート2120)
bun dev

# ビルド
bun build

# プレビュー（Cloudflare対応ビルド + Wranglerプレビュー）
bun preview

# デプロイ
bun deploy
```

## 今後の実装予定

- ユーザー認証システムの強化
- 検索機能の実装
- パフォーマンス最適化
- A/Bテスト実装
- アクセシビリティ対応強化

## メンテナンス・貢献ガイド

コードの変更や貢献を行う際は、以下のガイドラインに従ってください：

1. 型定義を厳密に行い、コードの安全性を確保
2. コンポーネントは小さく保ち、再利用性を高める
3. Server Actionsを活用してデータ更新を効率化
4. パフォーマンスを意識した実装を心がける
