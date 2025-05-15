'use server';

import type { SampleFormData, SampleItem } from '../../types/sample';
import type { PageFormData, Page } from '../../types/faq';

// --- モックデータ ---
const mockPages: Page[] = [
  {
    id: 'page-1',
    slug: '/sample',
    title: 'サンプルページ',
    description: 'サンプル項目の一覧ページ',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'page-2',
    slug: '/examples',
    title: '事例ページ',
    description: 'サンプル事例の紹介',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const mockSampleItems: SampleItem[] = [
  {
    id: 'sample-1',
    page_id: 'page-1',
    name: 'サンプルA',
    description: 'これはサンプルAの説明です',
    image_url: null,
    material: null,
    thickness: null,
    color_count: null,
    color_mode: null,
    size_width: null,
    size_height: null,
    file_url: null,
    cost_estimate: null,
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    page_id: 'page-1',
    name: 'サンプルB',
    description: 'これはサンプルBの説明です',
    image_url: null,
    material: null,
    thickness: null,
    color_count: null,
    color_mode: null,
    size_width: null,
    size_height: null,
    file_url: null,
    cost_estimate: null,
    sort_order: 2,
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

/** サンプル項目一覧を取得 */
export async function getSampleItems(
  pageId: string
): Promise<{ sampleItems: SampleItem[]; error: null }> {
  return {
    sampleItems: mockSampleItems.filter((i) => i.page_id === pageId),
    error: null,
  };
}

/** サンプル項目を作成 */
export async function createSampleItem(
  data: SampleFormData
): Promise<{ success: boolean; error?: string }> {
  const now = new Date().toISOString();
  const itemsForPage = mockSampleItems.filter(
    (i) => i.page_id === data.page_id
  );
  const newItem: SampleItem = {
    id: `sample-${Date.now()}`,
    page_id: data.page_id,
    name: data.name,
    description: data.description ?? null,
    image_url: data.image_url ?? null,
    material: data.material ?? null,
    thickness: data.thickness ?? null,
    color_count: data.color_count ?? null,
    color_mode: data.color_mode ?? null,
    size_width: data.size_width ?? null,
    size_height: data.size_height ?? null,
    file_url: data.file_url ?? null,
    cost_estimate: data.cost_estimate ?? null,
    sort_order: data.sort_order ?? itemsForPage.length + 1,
    is_active: data.is_active ?? true,
    created_at: now,
    updated_at: now,
  };
  mockSampleItems.push(newItem);
  notify('サンプル項目を作成しました');
  return { success: true };
}

/** サンプル項目を更新 */
export async function updateSampleItem(
  id: string,
  data: SampleFormData
): Promise<{ success: boolean; error?: string }> {
  const item = mockSampleItems.find((i) => i.id === id);
  if (item) {
    item.page_id = data.page_id;
    item.name = data.name;
    item.description = data.description ?? null;
    item.image_url = data.image_url ?? null;
    item.material = data.material ?? null;
    item.thickness = data.thickness ?? null;
    item.color_count = data.color_count ?? null;
    item.color_mode = data.color_mode ?? null;
    item.size_width = data.size_width ?? null;
    item.size_height = data.size_height ?? null;
    item.file_url = data.file_url ?? null;
    item.cost_estimate = data.cost_estimate ?? null;
    item.sort_order = data.sort_order ?? item.sort_order;
    item.is_active = data.is_active ?? item.is_active;
    item.updated_at = new Date().toISOString();
  }
  notify('サンプル項目を更新しました');
  return { success: true };
}

/** サンプル項目を削除 */
export async function deleteSampleItem(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const remaining = mockSampleItems.filter((i) => i.id !== id);
  mockSampleItems.length = 0;
  mockSampleItems.push(...remaining);
  notify('サンプル項目を削除しました');
  return { success: true };
}

/** サンプル項目をIDから取得 */
export async function getSampleItemById(
  id: string
): Promise<{ sample: SampleItem | null; error: null }> {
  const sample = mockSampleItems.find((i) => i.id === id) ?? null;
  return { sample, error: null };
}

/** サンプルページ一覧を取得 */
export async function getSamplePages(): Promise<{
  pages: Page[];
  error: null;
}> {
  return { pages: mockPages, error: null };
}

/** サンプルページを作成 */
export async function createSamplePage(
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
  notify('サンプルページを作成しました');
  return { success: true };
}

/** サンプルページを更新 */
export async function updateSamplePage(
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
  notify('サンプルページを更新しました');
  return { success: true };
}

/** サンプルページを削除 */
export async function deleteSamplePage(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const remaining = mockPages.filter((p) => p.id !== id);
  mockPages.length = 0;
  mockPages.push(...remaining);
  notify('サンプルページを削除しました');
  return { success: true };
}

/** サンプルページをスラッグから取得 */
export async function getSamplePageBySlug(
  slug: string
): Promise<{ page: Page | null; error: null }> {
  const s = slug.startsWith('/') ? slug : `/${slug}`;
  const page = mockPages.find((p) => p.slug === s) ?? null;
  return { page, error: null };
}

/** サンプルページをIDから取得 */
export async function getSamplePageById(
  id: string
): Promise<{ page: Page | null; error: null }> {
  const page = mockPages.find((p) => p.id === id) ?? null;
  return { page, error: null };
}
