'use server';

import type { PageFormData, FaqFormData, Page, FaqItem } from '../../types/faq';

// --- モックデータ ---
const mockPages: Page[] = [
  {
    id: 'page-1',
    slug: '/faq',
    title: 'よくある質問',
    description: 'システムに関するよくある質問と回答',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'page-2',
    slug: '/support',
    title: 'サポート',
    description: 'サポートに関する問い合わせと回答',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const mockFaqItems: FaqItem[] = [
  {
    id: 'faq-1',
    page_id: 'page-1',
    question: 'システムのログイン方法は？',
    answer: 'ユーザー名とパスワードを入力してログインしてください。',
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq-2',
    page_id: 'page-1',
    question: 'パスワードを忘れた場合は？',
    answer: 'パスワード再設定ページからリセットしてください。',
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq-3',
    page_id: 'page-2',
    question: '問い合わせ先はどこですか？',
    answer: 'support@example.comまでご連絡ください。',
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// 通知
function notify(message: string) {
  alert(message);
}

// --- サーバーアクション ---

/** ページ一覧を取得 */
export async function getPages(): Promise<{ pages: Page[]; error: null }> {
  return { pages: mockPages, error: null };
}

/** ページを作成 */
export async function createPage(
  data: PageFormData
): Promise<{ success: boolean; error?: string }> {
  const now = new Date().toISOString();
  const newPage: Page = {
    id: `page-${Date.now()}`,
    slug: data.slug.startsWith('/') ? data.slug : `/${data.slug}`,
    title: data.title ?? null,
    description: data.description ?? null,
    created_at: now,
    updated_at: now,
  };
  mockPages.push(newPage);
  notify('ページを作成しました');
  return { success: true };
}

/** ページを更新 */
export async function updatePage(
  id: string,
  data: PageFormData
): Promise<{ success: boolean; error?: string }> {
  const page = mockPages.find((p) => p.id === id);
  if (page) {
    page.slug = data.slug.startsWith('/') ? data.slug : `/${data.slug}`;
    page.title = data.title ?? null;
    page.description = data.description ?? null;
    page.updated_at = new Date().toISOString();
  }
  notify('ページを更新しました');
  return { success: true };
}

/** ページを削除 */
export async function deletePage(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const remaining = mockPages.filter((p) => p.id !== id);
  mockPages.length = 0;
  mockPages.push(...remaining);
  // 関連するFAQ項目も削除
  const filteredFaq = mockFaqItems.filter((f) => f.page_id !== id);
  mockFaqItems.length = 0;
  mockFaqItems.push(...filteredFaq);
  notify('ページを削除しました');
  return { success: true };
}

/** 指定ページのFAQを取得 */
export async function getFaqItems(
  pageId: string
): Promise<{ faqItems: FaqItem[]; error: null }> {
  const items = mockFaqItems.filter((f) => f.page_id === pageId);
  return { faqItems: items, error: null };
}

/** FAQ項目を作成 */
export async function createFaqItem(
  data: FaqFormData
): Promise<{ success: boolean; error?: string }> {
  const now = new Date().toISOString();
  const itemsForPage = mockFaqItems.filter((f) => f.page_id === data.page_id);
  const newItem: FaqItem = {
    id: `faq-${Date.now()}`,
    page_id: data.page_id,
    question: data.question,
    answer: data.answer,
    sort_order: data.sort_order ?? itemsForPage.length + 1,
    is_active: data.is_active ?? true,
    created_at: now,
    updated_at: now,
  };
  mockFaqItems.push(newItem);
  notify('FAQ項目を作成しました');
  return { success: true };
}

/** FAQ項目を更新 */
export async function updateFaqItem(
  id: string,
  data: FaqFormData
): Promise<{ success: boolean; error?: string }> {
  const item = mockFaqItems.find((f) => f.id === id);
  if (item) {
    item.page_id = data.page_id;
    item.question = data.question;
    item.answer = data.answer;
    item.sort_order = data.sort_order ?? item.sort_order;
    item.is_active = data.is_active ?? item.is_active;
    item.updated_at = new Date().toISOString();
  }
  notify('FAQ項目を更新しました');
  return { success: true };
}

/** FAQ項目を削除 */
export async function deleteFaqItem(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const remaining = mockFaqItems.filter((f) => f.id !== id);
  mockFaqItems.length = 0;
  mockFaqItems.push(...remaining);
  notify('FAQ項目を削除しました');
  return { success: true };
}

/** スラッグからページを取得 */
export async function getPageBySlug(
  slug: string
): Promise<{ page: Page | null; error: null }> {
  const filterSlug = slug.startsWith('/') ? slug : `/${slug}`;
  const page = mockPages.find((p) => p.slug === filterSlug) ?? null;
  return { page, error: null };
}

/** FAQ項目をIDから取得 */
export async function getFaqItemById(
  id: string
): Promise<{ faq: FaqItem | null; error: null }> {
  const item = mockFaqItems.find((f) => f.id === id) ?? null;
  return { faq: item, error: null };
}

/** ページをIDから取得 */
export async function getPageById(
  id: string
): Promise<{ page: Page | null; error: null }> {
  const page = mockPages.find((p) => p.id === id) ?? null;
  return { page, error: null };
}
