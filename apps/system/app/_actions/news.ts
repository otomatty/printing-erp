'use server';

import 'server-only';
import type {
  NewsFormData,
  NewsSearchParams,
  CategoryFormData,
  AttachmentMetadata,
} from '~/types/news';

// ニューステーブルRow型
export interface NewsRecord {
  id: string;
  title: string;
  summary: string | null;
  slug: string;
  content: string;
  published_at: string | null;
  publish_end_date: string | null;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  category_id: string | null;
  thumbnail_url: string | null;
  author_id: string | null;
}

// フロント用ニュース型
export interface News extends NewsRecord {
  category?: CategoryRecord;
  attachments: AttachmentMetadata[];
}

// カテゴリテーブルRow型
export interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  display_order: number;
}

// --- モックデータ ---
const mockNews: NewsRecord[] = [
  {
    id: '1',
    title: 'テストニュース',
    summary: 'テストニュースの概要',
    slug: 'test-news',
    content: '<p>これはテストニュースです</p>',
    published_at: new Date().toISOString(),
    publish_end_date: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: 'published',
    is_featured: false,
    category_id: 'c1',
    thumbnail_url: null,
    author_id: null,
  },
  {
    id: '2',
    title: '新製品リリースのお知らせ',
    summary: '弊社の新製品「AwesomeProduct」リリースのお知らせ',
    slug: 'release-awesomeproduct',
    content: '<p>AwesomeProduct の詳細は公式サイトをご覧ください。</p>',
    published_at: '2024-06-01T10:00:00Z',
    publish_end_date: '2025-05-31T23:59:59Z',
    created_at: '2024-05-25T09:30:00Z',
    updated_at: '2024-05-28T14:15:00Z',
    status: 'published',
    is_featured: true,
    category_id: 'c2',
    thumbnail_url: 'https://example.com/thumbnails/awesome.jpg',
    author_id: 'author-1',
  },
  {
    id: '3',
    title: 'メンテナンス作業のお知らせ',
    summary: 'システムメンテナンスに伴うサービス停止のお知らせ',
    slug: 'maintenance-2023-07',
    content: '<p>2023年7月10日 01:00～05:00 の間、サービスが停止します。</p>',
    published_at: '2024-06-20T12:00:00Z',
    publish_end_date: null,
    created_at: '2024-06-18T08:00:00Z',
    updated_at: '2024-06-18T08:00:00Z',
    status: 'draft',
    is_featured: false,
    category_id: 'c1',
    thumbnail_url: 'https://example.com/thumbnails/maintenance.png',
    author_id: 'author-2',
  },
  {
    id: '4',
    title: 'TechTalk 2023 イベント開催',
    summary: 'オンラインイベント「TechTalk 2023」開催決定のお知らせ',
    slug: 'techtalk-2023',
    content: '<p>参加登録はイベントページからお願いいたします。</p>',
    published_at: '2024-05-01T08:00:00Z',
    publish_end_date: '2024-05-31T23:59:59Z',
    created_at: '2024-04-15T10:00:00Z',
    updated_at: '2024-04-15T10:00:00Z',
    status: 'archived',
    is_featured: false,
    category_id: 'c3',
    thumbnail_url: null,
    author_id: 'author-3',
  },
];

let mockCategories: CategoryRecord[] = [
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

let mockAttachments: AttachmentMetadata[] = [];

// 通知
function notify(message: string) {
  alert(message);
}

// --- サーバーアクション ---

/** お知らせ詳細を取得 */
export async function getNewsById(
  id: string
): Promise<{ news: News | null; error: null }> {
  const record = mockNews.find((n) => n.id === id) ?? null;
  if (!record) return { news: null, error: null };
  const category = mockCategories.find((c) => c.id === record.category_id);
  const attachments = mockAttachments.filter((a) => a.news_id === id);
  return { news: { ...record, category, attachments }, error: null };
}

/** お知らせ一覧を取得 */
export async function searchNews(
  params: NewsSearchParams
): Promise<{ news: News[]; total: number; error: null }> {
  const { page = 1, limit = 10, status, categoryId, query } = params;
  let list = [...mockNews];
  if (status && status !== 'all')
    list = list.filter((n) => n.status === status);
  if (categoryId) list = list.filter((n) => n.category_id === categoryId);
  if (query) {
    const q = query.toLowerCase();
    list = list.filter(
      (n) =>
        n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }
  const total = list.length;
  const start = (page - 1) * limit;
  const slice = list.slice(start, start + limit);
  const news = slice.map((r) => {
    const category = mockCategories.find((c) => c.id === r.category_id);
    const attachments = mockAttachments.filter((a) => a.news_id === r.id);
    return { ...r, category, attachments };
  });
  return { news, total, error: null };
}

/** カテゴリ一覧を取得 */
export async function getCategories(): Promise<{
  categories: CategoryRecord[];
  error: null;
}> {
  return { categories: mockCategories, error: null };
}

/** お知らせを作成 */
export async function createNews(
  data: NewsFormData
): Promise<{ success: boolean; error?: string }> {
  const now = new Date().toISOString();
  mockNews.unshift({
    id: `news-${Date.now()}`,
    author_id: null,
    title: data.title,
    content: data.content,
    slug: data.slug,
    summary: data.summary ?? null,
    published_at: data.published_at ?? null,
    publish_end_date: data.publish_end_date ?? null,
    status: data.status,
    is_featured: data.is_featured,
    category_id: data.category_id,
    thumbnail_url: data.thumbnail_url ?? null,
    created_at: now,
    updated_at: now,
  });
  notify('お知らせを作成しました');
  return { success: true };
}

/** お知らせを更新 */
export async function updateNews(
  id: string,
  data: NewsFormData
): Promise<{ success: boolean; error?: string }> {
  const idx = mockNews.findIndex((n) => n.id === id);
  if (idx !== -1) {
    const current = mockNews[idx];
    if (!current) {
      return { success: false, error: 'News not found' };
    }
    mockNews[idx] = {
      ...current,
      title: data.title,
      content: data.content,
      slug: data.slug,
      summary: data.summary ?? null,
      published_at: data.published_at ?? null,
      publish_end_date: data.publish_end_date ?? null,
      status: data.status,
      is_featured: data.is_featured,
      category_id: data.category_id,
      thumbnail_url: data.thumbnail_url ?? null,
      updated_at: new Date().toISOString(),
    };
  }
  notify('お知らせを更新しました');
  return { success: true };
}

/** お知らせを削除 */
export async function deleteNews(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const remaining = mockNews.filter((n) => n.id !== id);
  mockNews.length = 0;
  mockNews.push(...remaining);
  mockAttachments = mockAttachments.filter((a) => a.news_id !== id);
  notify('お知らせを削除しました');
  return { success: true };
}

/** お知らせを公開 */
export async function publishNews(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const item = mockNews.find((n) => n.id === id);
  if (item) {
    item.status = 'published';
    item.published_at = item.published_at || new Date().toISOString();
    item.updated_at = new Date().toISOString();
  }
  notify('お知らせを公開しました');
  return { success: true };
}

/** お知らせを下書きに戻す */
export async function unpublishNews(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const item = mockNews.find((n) => n.id === id);
  if (item) {
    item.status = 'draft';
    item.updated_at = new Date().toISOString();
  }
  notify('お知らせを下書きに戻しました');
  return { success: true };
}

/** 添付ファイルのメタデータを保存 */
export async function saveAttachmentMetadata(
  newsId: string,
  fileMetadata: {
    file_name: string;
    file_path: string;
    file_type: string;
    file_size: number;
  }
): Promise<{ success: boolean; data?: AttachmentMetadata; error?: string }> {
  const newAtt: AttachmentMetadata = {
    id: `att-${Date.now()}`,
    news_id: newsId,
    ...fileMetadata,
    created_at: new Date().toISOString(),
  };
  mockAttachments.push(newAtt);
  notify('添付ファイルのメタデータを保存しました');
  return { success: true, data: newAtt };
}

/** アップロードURLを取得 */
export async function getAttachmentUploadUrl(
  newsId: string,
  fileName: string,
  fileType: string
): Promise<{
  uploadUrl: string;
  filePath: string;
  fileId: string;
  error?: string;
}> {
  const id = `upl-${Date.now()}`;
  notify('アップロードURLを取得しました');
  return {
    uploadUrl: `https://example.com/upload/${id}`,
    filePath: `/uploads/${fileName}`,
    fileId: id,
  };
}

/** 添付ファイルを削除 */
export async function deleteAttachment(
  attachmentId: string
): Promise<{ success: boolean; error?: string }> {
  mockAttachments = mockAttachments.filter((a) => a.id !== attachmentId);
  notify('添付ファイルを削除しました');
  return { success: true };
}

/** カテゴリを作成 */
export async function createCategory(
  data: CategoryFormData
): Promise<{ success: boolean; error?: string }> {
  const now = new Date().toISOString();
  mockCategories.push({
    id: `cat-${Date.now()}`,
    name: data.name,
    slug: data.slug,
    description: data.description ?? null,
    created_at: now,
    updated_at: now,
    display_order: mockCategories.length + 1,
  });
  notify('カテゴリを作成しました');
  return { success: true };
}

/** カテゴリを更新 */
export async function updateCategory(
  id: string,
  data: CategoryFormData
): Promise<{ success: boolean; error?: string }> {
  const idx = mockCategories.findIndex((c) => c.id === id);
  if (idx !== -1) {
    const current = mockCategories[idx];
    if (!current) {
      return { success: false, error: 'Category not found' };
    }
    mockCategories[idx] = {
      ...current,
      name: data.name,
      slug: data.slug,
      description: data.description ?? null,
      updated_at: new Date().toISOString(),
    };
  }
  notify('カテゴリを更新しました');
  return { success: true };
}

/** カテゴリを削除 */
export async function deleteCategory(
  id: string
): Promise<{ success: boolean; error?: string }> {
  mockCategories = mockCategories.filter((c) => c.id !== id);
  notify('カテゴリを削除しました');
  return { success: true };
}

/** カテゴリの順序を更新 */
export async function updateCategoryOrder(
  orders: { id: string; display_order: number }[]
): Promise<{ success: boolean; error?: string }> {
  for (const { id, display_order } of orders) {
    const idx = mockCategories.findIndex((c) => c.id === id);
    if (idx !== -1) {
      const current = mockCategories[idx];
      if (!current) {
        return { success: false, error: 'Category not found' };
      }
      current.display_order = display_order;
    }
  }
  notify('カテゴリの順序を更新しました');
  return { success: true };
}
