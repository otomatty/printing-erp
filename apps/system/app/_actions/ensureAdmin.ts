'use server';

/**
 * 管理者かどうかを確認する共通関数
 */
export async function ensureAdmin() {
  // プロトタイプ用: 認証を常に成功とする
  return { isAdmin: true, userId: 'admin-mock', error: null };
}
