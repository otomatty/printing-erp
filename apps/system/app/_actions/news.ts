// モック用サーバーアクション
'use client';

// モックデータ定義
interface NewsRecord {
  id: string;
  title: string;
  content: string;
  summary: string;
  slug: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  category_id: string | null;
  thumbnail_url: string | null;
  author_id: string | null;
  publish_end_date: string | null;
}

const mockNews: NewsRecord[] = [
  {
    id: '1',
    title: 'テストニュース',
    content: '<p>これはテストニュースです</p>',
    summary: 'テストニュースの概要',
    slug: 'test-news',
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: 'published',
    is_featured: false,
    category_id: null,
    thumbnail_url: null,
    author_id: null,
    publish_end_date: null,
  },
];

interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  display_order: number;
}

const mockCategories: CategoryRecord[] = [
  {
    id: 'c1',
    name: '会社情報・ニュース',
    slug: 'company',
    description: '当社に関する重要なお知らせや最新情報',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    display_order: 1,
  },
  {
    id: 'c2',
    name: '新サービス・新製品',
    slug: 'new-services',
    description: '新しく追加されたサービスや製品の案内',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    display_order: 2,
  },
  {
    id: 'c3',
    name: 'キャンペーン・イベント',
    slug: 'campaigns',
    description: '期間限定のキャンペーンやイベント情報',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    display_order: 3,
  },
];

// 取得系モック
export async function getNewsById(id: string) {
  const news = mockNews.find((n) => n.id === id) ?? null;
  return { news, error: null };
}

export async function searchNews({
  page = 1,
  limit = 10,
}: { page?: number; limit?: number }) {
  return { news: mockNews, total: mockNews.length, error: null };
}

export async function getCategories() {
  return { categories: mockCategories, error: null };
}

// 送信系モック通知関数
function notify(message: string) {
  alert(message);
}

export async function createNews() {
  notify('お知らせを作成しました');
  return { success: true };
}

export async function updateNews() {
  notify('お知らせを更新しました');
  return { success: true };
}

export async function deleteNews() {
  notify('お知らせを削除しました');
  return { success: true };
}

export async function publishNews() {
  notify('お知らせを公開しました');
  return { success: true };
}

export async function unpublishNews() {
  notify('お知らせを下書きに戻しました');
  return { success: true };
}

export async function saveAttachmentMetadata() {
  notify('添付ファイルのメタデータを保存しました');
  return { success: true };
}

export async function getAttachmentUploadUrl() {
  notify('アップロードURLを取得しました');
  return { success: true, uploadUrl: '', filePath: '', fileId: '' };
}

export async function deleteAttachment() {
  notify('添付ファイルを削除しました');
  return { success: true };
}

export async function createCategory() {
  notify('カテゴリを作成しました');
  return { success: true };
}

export async function updateCategory() {
  notify('カテゴリを更新しました');
  return { success: true };
}

export async function deleteCategory() {
  notify('カテゴリを削除しました');
  return { success: true };
}

export async function updateCategoryOrder() {
  notify('カテゴリの順序を更新しました');
  return { success: true };
}
