'use server';

import { z } from 'zod';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { revalidatePath } from 'next/cache';
import type { Database } from '@kit/supabase/database';

// DBのテーブル型 (Supabaseから生成された型を使うのが理想)
type NotificationSetting =
  Database['system']['Tables']['contact_notification_settings']['Row'];

// 新規作成時の入力スキーマ
const CreateSettingSchema = z.object({
  name: z.string().min(1, '設定名は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  // inquiryType は string または null。空文字列は許容しない方が良いため trim し、空なら null に変換
  inquiryType: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === '' ? null : val)),
  isActive: z.boolean().default(true),
});

// 更新時の入力スキーマ (IDが必要、全フィールドオプショナル)
const UpdateSettingSchema = z.object({
  id: z.string().uuid('無効なIDです'),
  name: z.string().min(1, '設定名は必須です').optional(),
  email: z.string().email('有効なメールアドレスを入力してください').optional(),
  inquiryType: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === '' ? null : val))
    .nullable(), // 更新時も NULL を許容
  isActive: z.boolean().optional(),
});

// 結果返却用の型
type ActionResponse<T = undefined> = Promise<
  | { success: true; data?: T; message?: string }
  | { success: false; error: string }
>;

const ADMIN_SETTINGS_PATH = '/settings/inquiries/general'; // 設定画面のパス (適宜変更)

/**
 * 通知設定をすべて取得する
 * @returns {ActionResponse<NotificationSetting[]>}
 */
export async function getNotificationSettings(): ActionResponse<
  NotificationSetting[]
> {
  try {
    const client = getSupabaseServerClient();
    const { data, error } = await client
      .schema('system')
      .from('contact_notification_settings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('通知設定取得エラー:', error);
      return { success: false, error: '設定の取得に失敗しました。' };
    }

    return { success: true, data };
  } catch (e) {
    console.error('予期せぬエラー (getNotificationSettings):', e);
    return { success: false, error: '予期せぬエラーが発生しました。' };
  }
}

/**
 * 新しい通知設定を追加する
 * @param formData - フォームデータ
 * @returns {ActionResponse<NotificationSetting>}
 */
export async function addNotificationSetting(
  formData: FormData
): ActionResponse<NotificationSetting> {
  const rawData = Object.fromEntries(formData.entries());
  // isActive を boolean に変換
  const isActiveValue = rawData.isActive === 'on';

  // バリデーション用のデータを作成 (isActive を boolean に置き換え)
  const dataToValidate = { ...rawData, isActive: isActiveValue };

  const validatedFields = CreateSettingSchema.safeParse(dataToValidate);

  if (!validatedFields.success) {
    console.error(
      'バリデーションエラー(Create):',
      validatedFields.error.flatten()
    );
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors.toString(), // 簡単なエラー表示
    };
  }

  try {
    const client = getSupabaseServerClient();
    const { data, error } = await client
      .schema('system')
      .from('contact_notification_settings')
      .insert({
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        inquiry_type: validatedFields.data.inquiryType,
        is_active: validatedFields.data.isActive,
      })
      .select()
      .single();

    if (error) {
      console.error('通知設定追加エラー:', error);
      // UNIQUE制約違反などの可能性
      if (error.code === '23505') {
        return {
          success: false,
          error: '同じメールアドレスが既に登録されています。',
        };
      }
      return { success: false, error: '設定の追加に失敗しました。' };
    }

    revalidatePath(ADMIN_SETTINGS_PATH);
    return { success: true, data, message: '通知設定を追加しました。' };
  } catch (e) {
    console.error('予期せぬエラー (addNotificationSetting):', e);
    return { success: false, error: '予期せぬエラーが発生しました。' };
  }
}

/**
 * 既存の通知設定を更新する
 * @param formData - フォームデータ (id を含む)
 * @returns {ActionResponse<NotificationSetting>}
 */
export async function updateNotificationSetting(
  formData: FormData
): ActionResponse<NotificationSetting> {
  const rawData = Object.fromEntries(formData.entries());
  // isActive を boolean に変換 (存在する場合のみ)
  const isActiveValue =
    rawData.isActive !== undefined ? rawData.isActive === 'on' : undefined;

  // バリデーション用のデータを作成
  const dataToValidate: Record<
    string,
    FormDataEntryValue | boolean | undefined
  > = { ...rawData };
  if (isActiveValue !== undefined) {
    dataToValidate.isActive = isActiveValue;
  }

  // 更新データのみを抽出する (Zod スキーマが optional なのでこれで良い)
  const validatedFields = UpdateSettingSchema.safeParse(dataToValidate);

  if (!validatedFields.success) {
    console.error(
      'バリデーションエラー(Update):',
      validatedFields.error.flatten()
    );
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors.toString(),
    };
  }

  const { id, ...updateData } = validatedFields.data;

  // 更新データがない場合は何もしない
  if (Object.keys(updateData).length === 0) {
    return { success: true, message: '更新するデータがありませんでした。' };
  }

  try {
    const client = getSupabaseServerClient();
    const { data, error } = await client
      .schema('system')
      .from('contact_notification_settings')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('通知設定更新エラー:', error);
      if (error.code === '23505') {
        return {
          success: false,
          error: '同じメールアドレスが既に登録されています。',
        };
      }
      return { success: false, error: '設定の更新に失敗しました。' };
    }

    if (!data) {
      return { success: false, error: '更新対象の設定が見つかりません。' };
    }

    revalidatePath(ADMIN_SETTINGS_PATH);
    return { success: true, data, message: '通知設定を更新しました。' };
  } catch (e) {
    console.error('予期せぬエラー (updateNotificationSetting):', e);
    return { success: false, error: '予期せぬエラーが発生しました。' };
  }
}

/**
 * 通知設定を削除する
 * @param id - 削除する設定のID
 * @returns {ActionResponse}
 */
export async function deleteNotificationSetting(id: string): ActionResponse {
  // ID のバリデーション
  if (!id || !z.string().uuid().safeParse(id).success) {
    return { success: false, error: '無効なIDです。' };
  }

  try {
    const client = getSupabaseServerClient();
    const { error } = await client
      .schema('system')
      .from('contact_notification_settings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('通知設定削除エラー:', error);
      return { success: false, error: '設定の削除に失敗しました。' };
    }

    revalidatePath(ADMIN_SETTINGS_PATH);
    return { success: true, message: '通知設定を削除しました。' };
  } catch (e) {
    console.error('予期せぬエラー (deleteNotificationSetting):', e);
    return { success: false, error: '予期せぬエラーが発生しました。' };
  }
}
