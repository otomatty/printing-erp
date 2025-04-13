'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

/**
 * お知らせフォームデータのバリデーションスキーマ
 */
export const newsFormSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  content: z.string().min(1, '本文は必須です'),
  summary: z.string().optional(),
  slug: z
    .string()
    .min(1, 'スラッグは必須です')
    .regex(/^[a-z0-9-]+$/, 'スラッグは小文字英数字とハイフンのみ使用可能です'),
  published_at: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  is_featured: z.boolean().default(false),
  category_id: z.string().uuid().nullable(),
  thumbnail_url: z.string().nullable().optional(),
  publish_end_date: z.string().nullable().optional(),
});

/**
 * お知らせフォームデータの型
 */
export type NewsFormData = z.infer<typeof newsFormSchema>;

/**
 * カテゴリフォームデータのバリデーションスキーマ
 */
export const categoryFormSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  slug: z
    .string()
    .min(1, 'スラッグは必須です')
    .regex(/^[a-z0-9-]+$/, 'スラッグは小文字英数字とハイフンのみ使用可能です'),
  description: z.string().optional(),
  display_order: z.number().int().default(0),
});

/**
 * カテゴリフォームデータの型
 */
export type CategoryFormData = z.infer<typeof categoryFormSchema>;

/**
 * 添付ファイルのメタデータ型
 */
export interface AttachmentMetadata {
  id: string;
  news_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

/**
 * お知らせ検索パラメータの型
 */
export interface NewsSearchParams {
  page?: number;
  limit?: number;
  status?: 'draft' | 'published' | 'archived' | 'all';
  categoryId?: string;
  query?: string;
  orderBy?: 'created_at' | 'updated_at' | 'published_at';
  order?: 'asc' | 'desc';
}

/**
 * 管理者かどうかを確認する
 * セキュリティのために各アクションで呼び出す
 */
async function ensureAdmin() {
  const supabase = await getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { isAdmin: false, error: 'ログインが必要です' };
  }

  const { data: adminUser, error } = await supabase
    .schema('system')
    .from('admin_users')
    .select('is_active')
    .eq('id', user.id)
    .single();

  if (error || !adminUser || !adminUser.is_active) {
    return { isAdmin: false, error: '管理者権限がありません' };
  }

  return { isAdmin: true, userId: user.id, error: null };
}

/**
 * お知らせを作成する
 */
export async function createNews(formData: NewsFormData) {
  // 管理者確認
  const { isAdmin, userId, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    // バリデーション
    const validatedData = newsFormSchema.parse(formData);

    const supabase = await getSupabaseServerClient();

    // スラッグの一意性チェック
    const { data: existingSlug } = await supabase
      .from('news')
      .select('id')
      .eq('slug', validatedData.slug)
      .maybeSingle();

    if (existingSlug) {
      return {
        success: false,
        error: 'このスラッグは既に使用されています',
      };
    }

    // 公開状態に応じた処理
    const isPublished = validatedData.status === 'published';
    const now = new Date().toISOString();

    // データ作成
    const newsData = {
      ...validatedData,
      published_at:
        isPublished && !validatedData.published_at
          ? now
          : validatedData.published_at,
      author_id: userId,
    };

    const { data, error } = await supabase
      .from('news')
      .insert(newsData)
      .select()
      .single();

    if (error) {
      console.error('Error creating news:', error);
      return { success: false, error: error.message };
    }

    // キャッシュを更新
    revalidatePath('/website/news');

    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'バリデーションエラー',
        validationErrors: error.errors,
      };
    }

    console.error('Error creating news:', error);
    return {
      success: false,
      error: 'お知らせの作成中にエラーが発生しました',
    };
  }
}

/**
 * お知らせを更新する
 */
export async function updateNews(id: string, formData: NewsFormData) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    // バリデーション
    const validatedData = newsFormSchema.parse(formData);

    const supabase = await getSupabaseServerClient();

    // 既存のお知らせを取得
    const { data: existingNews, error: fetchError } = await supabase
      .from('news')
      .select('status, published_at, slug')
      .eq('id', id)
      .single();

    if (fetchError) {
      return {
        success: false,
        error: 'お知らせが見つかりませんでした',
      };
    }

    // スラッグが変更された場合、一意性チェック
    if (existingNews.slug !== validatedData.slug) {
      const { data: existingSlug } = await supabase
        .from('news')
        .select('id')
        .eq('slug', validatedData.slug)
        .maybeSingle();

      if (existingSlug) {
        return {
          success: false,
          error: 'このスラッグは既に使用されています',
        };
      }
    }

    // 公開ステータス変更の処理
    const wasPublished = existingNews.status === 'published';
    const isPublished = validatedData.status === 'published';
    const now = new Date().toISOString();

    // 公開日時の調整
    let publishedAt = validatedData.published_at;
    if (!wasPublished && isPublished && !publishedAt) {
      publishedAt = now; // 新規公開時、公開日時が未設定なら現在時刻
    }

    // データ更新
    const { data, error } = await supabase
      .from('news')
      .update({
        ...validatedData,
        published_at: publishedAt,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating news:', error);
      return { success: false, error: error.message };
    }

    // キャッシュを更新
    revalidatePath('/website/news');
    revalidatePath(`/website/news/${data.slug}`);

    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'バリデーションエラー',
        validationErrors: error.errors,
      };
    }

    console.error('Error updating news:', error);
    return {
      success: false,
      error: 'お知らせの更新中にエラーが発生しました',
    };
  }
}

/**
 * お知らせを削除する
 */
export async function deleteNews(id: string) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    // 削除前にスラッグを取得（パスの無効化用）
    const { data: newsData, error: fetchError } = await supabase
      .from('news')
      .select('slug')
      .eq('id', id)
      .single();

    if (fetchError) {
      return { success: false, error: 'お知らせが見つかりませんでした' };
    }

    // お知らせの削除（添付ファイルはカスケード削除される）
    const { error } = await supabase.from('news').delete().eq('id', id);

    if (error) {
      console.error('Error deleting news:', error);
      return { success: false, error: error.message };
    }

    // キャッシュを更新
    revalidatePath('/website/news');
    revalidatePath(`/website/news/${newsData.slug}`);

    return { success: true };
  } catch (error) {
    console.error('Error deleting news:', error);
    return {
      success: false,
      error: 'お知らせの削除中にエラーが発生しました',
    };
  }
}

/**
 * お知らせを公開する
 */
export async function publishNews(id: string, publishDate?: Date) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    const publishedAt = publishDate
      ? publishDate.toISOString()
      : new Date().toISOString();

    // 公開状態に更新
    const { data, error } = await supabase
      .from('news')
      .update({
        status: 'published',
        published_at: publishedAt,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error publishing news:', error);
      return { success: false, error: error.message };
    }

    // キャッシュを更新
    revalidatePath('/website/news');
    revalidatePath(`/website/news/${data.slug}`);

    return { success: true, data };
  } catch (error) {
    console.error('Error publishing news:', error);
    return {
      success: false,
      error: 'お知らせの公開中にエラーが発生しました',
    };
  }
}

/**
 * お知らせを非公開にする
 */
export async function unpublishNews(id: string) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    // 下書き状態に更新
    const { data, error } = await supabase
      .from('news')
      .update({
        status: 'draft',
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error unpublishing news:', error);
      return { success: false, error: error.message };
    }

    // キャッシュを更新
    revalidatePath('/website/news');
    revalidatePath(`/website/news/${data.slug}`);

    return { success: true, data };
  } catch (error) {
    console.error('Error unpublishing news:', error);
    return {
      success: false,
      error: 'お知らせの非公開設定中にエラーが発生しました',
    };
  }
}

/**
 * 添付ファイルをアップロードする
 * 注：Server Actionでのファイルアップロードは直接処理できないため、
 * APIルートと併用するか、クライアントコンポーネントでのアップロード後に
 * このアクションでメタデータを保存する形が適切
 */
export async function saveAttachmentMetadata(
  newsId: string,
  fileMetadata: {
    file_name: string;
    file_path: string;
    file_type: string;
    file_size: number;
  }
) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    // 添付ファイルメタデータを保存
    const { data, error } = await supabase
      .from('news_attachments')
      .insert({
        news_id: newsId,
        ...fileMetadata,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving attachment metadata:', error);
      return { success: false, error: error.message };
    }

    // キャッシュを更新
    revalidatePath('/website/news');

    return { success: true, data };
  } catch (error) {
    console.error('Error saving attachment metadata:', error);
    return {
      success: false,
      error: '添付ファイルの保存中にエラーが発生しました',
    };
  }
}

/**
 * 添付ファイルのアップロードURLを生成する
 * クライアント側でこのURLに直接アップロードする
 */
export async function getAttachmentUploadUrl(
  newsId: string,
  fileName: string,
  fileType: string
) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    // お知らせの存在確認
    const { data: newsExists } = await supabase
      .from('news')
      .select('id')
      .eq('id', newsId)
      .maybeSingle();

    if (!newsExists) {
      return {
        success: false,
        error: 'お知らせが見つかりませんでした',
      };
    }

    // アップロードパスを生成
    const fileId = uuidv4();
    const filePath = `news/${newsId}/${fileId}-${fileName}`;

    // アップロードURLを取得
    const { data, error } = await supabase.storage
      .from('news-attachments')
      .createSignedUploadUrl(filePath);

    if (error) {
      console.error('Error generating upload URL:', error);
      return { success: false, error: error.message };
    }

    return {
      success: true,
      uploadUrl: data.signedUrl,
      filePath: filePath,
      fileId: fileId,
    };
  } catch (error) {
    console.error('Error generating upload URL:', error);
    return {
      success: false,
      error: 'アップロードURL生成中にエラーが発生しました',
    };
  }
}

/**
 * 添付ファイルを削除する
 */
export async function deleteAttachment(attachmentId: string) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    // 添付ファイル情報を取得
    const { data: attachment, error: fetchError } = await supabase
      .from('news_attachments')
      .select('file_path, news_id')
      .eq('id', attachmentId)
      .single();

    if (fetchError) {
      return { success: false, error: '添付ファイルが見つかりませんでした' };
    }

    // ストレージから削除
    const { error: storageError } = await supabase.storage
      .from('news-attachments')
      .remove([attachment.file_path]);

    if (storageError) {
      console.error('Error removing file from storage:', storageError);
      // ストレージエラーでも続行（DBレコードは削除する）
    }

    // メタデータを削除
    const { error } = await supabase
      .from('news_attachments')
      .delete()
      .eq('id', attachmentId);

    if (error) {
      console.error('Error deleting attachment metadata:', error);
      return { success: false, error: error.message };
    }

    // キャッシュを更新
    revalidatePath('/website/news');
    revalidatePath(`/website/news/${attachment.news_id}`);

    return { success: true };
  } catch (error) {
    console.error('Error deleting attachment:', error);
    return {
      success: false,
      error: '添付ファイルの削除中にエラーが発生しました',
    };
  }
}

/**
 * カテゴリを作成する
 */
export async function createCategory(formData: CategoryFormData) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    // バリデーション
    const validatedData = categoryFormSchema.parse(formData);

    const supabase = await getSupabaseServerClient();

    // スラッグの一意性チェック
    const { data: existingSlug } = await supabase
      .from('news_categories')
      .select('id')
      .eq('slug', validatedData.slug)
      .maybeSingle();

    if (existingSlug) {
      return {
        success: false,
        error: 'このスラッグは既に使用されています',
      };
    }

    // カテゴリ作成
    const { data, error } = await supabase
      .from('news_categories')
      .insert(validatedData)
      .select()
      .single();

    if (error) {
      console.error('Error creating category:', error);
      return { success: false, error: error.message };
    }

    // キャッシュを更新
    revalidatePath('/website/news');

    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'バリデーションエラー',
        validationErrors: error.errors,
      };
    }

    console.error('Error creating category:', error);
    return {
      success: false,
      error: 'カテゴリの作成中にエラーが発生しました',
    };
  }
}

/**
 * カテゴリを更新する
 */
export async function updateCategory(id: string, formData: CategoryFormData) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    // バリデーション
    const validatedData = categoryFormSchema.parse(formData);

    const supabase = await getSupabaseServerClient();

    // 既存のカテゴリを取得
    const { data: existingCategory, error: fetchError } = await supabase
      .from('news_categories')
      .select('slug')
      .eq('id', id)
      .single();

    if (fetchError) {
      return {
        success: false,
        error: 'カテゴリが見つかりませんでした',
      };
    }

    // スラッグが変更された場合、一意性チェック
    if (existingCategory.slug !== validatedData.slug) {
      const { data: existingSlug } = await supabase
        .from('news_categories')
        .select('id')
        .eq('slug', validatedData.slug)
        .maybeSingle();

      if (existingSlug) {
        return {
          success: false,
          error: 'このスラッグは既に使用されています',
        };
      }
    }

    // カテゴリ更新
    const { data, error } = await supabase
      .from('news_categories')
      .update(validatedData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating category:', error);
      return { success: false, error: error.message };
    }

    // キャッシュを更新
    revalidatePath('/website/news');

    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'バリデーションエラー',
        validationErrors: error.errors,
      };
    }

    console.error('Error updating category:', error);
    return {
      success: false,
      error: 'カテゴリの更新中にエラーが発生しました',
    };
  }
}

/**
 * カテゴリを削除する
 */
export async function deleteCategory(id: string) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    // そのカテゴリを使用しているお知らせが存在するか確認
    const { count, error: countError } = await supabase
      .from('news')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', id);

    if (countError) {
      console.error('Error checking category usage:', countError);
      return { success: false, error: countError.message };
    }

    if (count && count > 0) {
      return {
        success: false,
        error: 'このカテゴリを使用しているお知らせがあるため削除できません',
        newsCount: count,
      };
    }

    // カテゴリ削除
    const { error } = await supabase
      .from('news_categories')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting category:', error);
      return { success: false, error: error.message };
    }

    // キャッシュを更新
    revalidatePath('/website/news');

    return { success: true };
  } catch (error) {
    console.error('Error deleting category:', error);
    return {
      success: false,
      error: 'カテゴリの削除中にエラーが発生しました',
    };
  }
}

/**
 * お知らせ検索（管理者用、すべてのステータスを含む）
 */
export async function searchNews({
  page = 1,
  limit = 10,
  status = 'all',
  categoryId,
  query,
  orderBy = 'updated_at',
  order = 'desc',
}: NewsSearchParams) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { news: [], total: 0, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    // 開始位置を計算
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // クエリを構築
    let dbQuery = supabase.from('news').select(
      `
        *,
        category:news_categories(name, slug)
      `,
      { count: 'exact' }
    );

    // ステータスフィルタ
    if (status !== 'all') {
      dbQuery = dbQuery.eq('status', status);
    }

    // カテゴリフィルタ
    if (categoryId) {
      dbQuery = dbQuery.eq('category_id', categoryId);
    }

    // テキスト検索
    if (query?.trim()) {
      dbQuery = dbQuery.or(
        `title.ilike.%${query}%,content.ilike.%${query}%,summary.ilike.%${query}%`
      );
    }

    // 並び順
    dbQuery = dbQuery.order(orderBy, { ascending: order === 'asc' });

    // ページネーション
    dbQuery = dbQuery.range(from, to);

    // クエリ実行
    const { data, error, count } = await dbQuery;

    if (error) {
      console.error('Error searching news:', error);
      return { news: [], total: 0, error: error.message };
    }

    return {
      news: data || [],
      total: count || 0,
      error: null,
    };
  } catch (error) {
    console.error('Error searching news:', error);
    return {
      news: [],
      total: 0,
      error: 'お知らせの検索中にエラーが発生しました',
    };
  }
}

/**
 * カテゴリ一覧を取得する（管理者用）
 */
export async function getCategories() {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { categories: [], error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase
      .from('news_categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return { categories: [], error: error.message };
    }

    return { categories: data || [], error: null };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      categories: [],
      error: 'カテゴリの取得中にエラーが発生しました',
    };
  }
}

/**
 * お知らせ詳細を取得する（管理者用、すべてのステータスを含む）
 */
export async function getNewsById(id: string) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { news: null, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase
      .from('news')
      .select(`
        *,
        category:news_categories(*),
        attachments:news_attachments(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching news with ID ${id}:`, error);
      return { news: null, error: 'お知らせが見つかりませんでした' };
    }

    return { news: data, error: null };
  } catch (error) {
    console.error(`Error fetching news with ID ${id}:`, error);
    return {
      news: null,
      error: 'お知らせの取得中にエラーが発生しました',
    };
  }
}
