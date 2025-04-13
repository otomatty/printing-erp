'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import {
  type NewsFormData,
  newsFormSchema,
  type CategoryFormData,
  categoryFormSchema,
  type NewsSearchParams,
  AttachmentMetadata,
} from '~/types/news';

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

  // check_is_admin RPCを呼び出して管理者かどうかを確認
  const { data, error } = await supabase.rpc('check_is_admin');

  if (error) {
    console.error('管理者確認中にエラーが発生しました:', error);
    return {
      isAdmin: false,
      error: '管理者権限の確認中にエラーが発生しました',
    };
  }

  if (!data) {
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
 * 添付ファイルのメタデータを保存する
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
 * 添付ファイルのアップロードURLを取得する
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

    // 現在の最大表示順を取得
    const { data: categories, error: orderError } = await supabase
      .from('news_categories')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1);

    if (orderError) {
      console.error('Error fetching max display order:', orderError);
      return { success: false, error: orderError.message };
    }

    // 最大表示順 + 1 を新しいカテゴリの表示順とする
    const maxDisplayOrder =
      categories &&
      categories.length > 0 &&
      categories[0]?.display_order !== null
        ? categories[0]?.display_order
        : -1;
    const newDisplayOrder = (maxDisplayOrder ?? -1) + 1;

    // カテゴリ作成（表示順を自動設定）
    const { data, error } = await supabase
      .from('news_categories')
      .insert({
        ...validatedData,
        display_order: newDisplayOrder,
      })
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
 * お知らせを検索する
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
 * カテゴリ一覧を取得する
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
 * お知らせを取得する
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

/**
 * カテゴリの表示順を更新する
 */
export async function updateCategoryOrder(
  categoryOrders: { id: string; display_order: number }[]
) {
  // 管理者確認
  const { isAdmin, error: authError } = await ensureAdmin();
  if (!isAdmin) {
    return { success: false, error: authError };
  }

  try {
    const supabase = await getSupabaseServerClient();

    // 一括更新用の処理
    const updates = categoryOrders.map(({ id, display_order }) => ({
      id,
      display_order,
    }));

    for (const update of updates) {
      const { error } = await supabase
        .from('news_categories')
        .update({ display_order: update.display_order })
        .eq('id', update.id);

      if (error) {
        console.error('Error updating category order:', error);
        return { success: false, error: error.message };
      }
    }

    // キャッシュを更新
    revalidatePath('/website/news');
    revalidatePath('/website/news/categories');

    return { success: true };
  } catch (error) {
    console.error('Error updating category order:', error);
    return {
      success: false,
      error: 'カテゴリの順序更新中にエラーが発生しました',
    };
  }
}
